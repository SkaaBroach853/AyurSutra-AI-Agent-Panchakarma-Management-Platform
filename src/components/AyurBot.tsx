import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Leaf, User, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from "react-markdown";

import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI client with API key from environment
const ai = new GoogleGenAI({
  apiKey: "AIzaSyDQ8yAwQQcQOdSBU-OSnNqEegkVlZijXIk"
});

// System prompts for different user roles
const getSystemPrompt = (userRole) => {
  const basePrompt = `You are AyurBot, the personal assistant inside AyurSutra – a Panchakarma Patient Management and Therapy Scheduling App. 
Your role is to act as a supportive Ayurveda-inspired guide for patients and doctors.`;

  const patientPrompt = `${basePrompt} 
For patients: explain Panchakarma therapies in simple and reassuring terms, provide pre- and post-procedure reminders, give lifestyle and wellness tips, and encourage them in a gentle, positive way. 
Use emojis like 🌿🌸🌱💫 to make responses warm and friendly. 
Tone: warm, calming, respectful, and empathetic. Use simple words, avoid medical jargon. 
Always emphasize Ayurveda's balance, healing, and wellness principles in your responses.
Keep responses conversational and supportive, like a caring wellness coach.`;

  const doctorPrompt = `${basePrompt}
For doctors: provide quick patient summaries, highlight risk alerts from patient history, assist in scheduling and therapy reminders.
Use professional medical terminology when appropriate but remain warm and supportive.
Format important information with bullet points and clear sections.
Tone: professional, concise, but still warm and helpful.
Focus on clinical efficiency while maintaining the Ayurvedic wellness approach.`;

  return userRole === 'patient' ? patientPrompt : doctorPrompt;
};

// Direct Gemini API call using official SDK with retry logic
const callGeminiDirectly = async (message, userRole, context = {}, retryCount = 0) => {
  const maxRetries = 2;
  
  try {
    const systemPrompt = getSystemPrompt(userRole);
    const fullPrompt = `${systemPrompt}\n\nUser Role: ${userRole}\nUser Message: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: fullPrompt,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    });

    return response.text;
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Handle quota/rate limit errors specifically
    if (error?.status === 'RESOURCE_EXHAUSTED' || error?.message?.includes('quota') || error?.message?.includes('429')) {
      if (retryCount < maxRetries) {
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, retryCount) * 2000; // 2s, 4s, 8s
        console.log(`Quota exceeded, retrying in ${waitTime/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return callGeminiDirectly(message, userRole, context, retryCount + 1);
      }
      
      // If retries exhausted, return helpful quota error message
      if (userRole === 'patient') {
        return "🌿 I apologize, but I've reached my conversation limit for now. This happens when many people are using the service.\n\n✨ **What you can do:**\n- Wait a few minutes and try again\n- Your question was: \"" + message + "\"\n- I'll be ready to help you soon!\n\n💚 Remember, your wellness journey is important, and I'm here for you.";
      } else {
        return "⚠️ **API Quota Exceeded**\n\nThe Gemini API has reached its rate limit. This typically resets within a few minutes.\n\n**Suggested Actions:**\n- Wait 2-3 minutes before retrying\n- Check your API quota at: https://ai.dev/usage\n- Consider upgrading your API plan for higher limits\n- Switch to a different API key if available\n\nYour query: \"" + message + "\"";
      }
    }
    
    // Handle other errors
    if (userRole === 'patient') {
      return "🌿 I apologize, but I'm having trouble connecting right now. Please try again in a moment, and remember - your wellness journey continues! 🌸\n\n💡 If this persists, please contact support.";
    } else {
      return "⚠️ **Connection Error**\n\nI'm experiencing connectivity issues. Please try your query again in a moment.\n\nError details: " + (error?.message || 'Unknown error');
    }
  }
};

const AyurBot = ({ userRole = 'patient', userId = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('normal'); // 'normal', 'warning', 'error'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = userRole === 'patient' 
        ? "🌸 Namaste! I'm AyurBot, your wellness companion. I'm here to guide you through your Panchakarma journey with care and support. How can I help you today? 🌿"
        : "Welcome, Doctor. I'm AyurBot, your clinical assistant. I can provide patient summaries, risk alerts, scheduling information, and therapy protocols. How may I assist you?";
      
      setMessages([{
        id: 1,
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, userRole, messages.length]);

  const callGeminiAPI = async (message) => {
    return callGeminiDirectly(message, userRole, { userId });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setApiStatus('normal');

    try {
      const botResponse = await callGeminiAPI(currentInput);
      
      // Check if response indicates quota/rate limit issue
      if (botResponse.includes('quota') || botResponse.includes('rate limit') || botResponse.includes('conversation limit')) {
        setApiStatus('warning');
      }
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setApiStatus('error');
      const errorMessage = {
        id: messages.length + 2,
        text: userRole === 'patient' 
          ? "🌿 I apologize, but I'm having trouble connecting right now. Please try again in a moment, and remember - your wellness journey continues! 🌸\n\n💡 Your question: \"" + currentInput + "\""
          : "⚠️ I'm experiencing connectivity issues. Please try your query again.\n\nYour query: \"" + currentInput + "\"",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = userRole === 'patient' ? [
    "What is Virechana?",
    "What should I do before therapy?",
    "Abhyanga benefits?",
    "What to expect during treatment?"
  ] : [
    "Show patient summary",
    "Any risk flags today?",
    "Today's schedule",
    "Therapy precautions"
  ];

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-105 group"
        >
          <div className="relative">
            <Leaf className="h-6 w-6" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 opacity-75 group-hover:opacity-100" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col border-2 border-green-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AyurBot</h3>
                <p className="text-sm opacity-90">
                  {userRole === 'patient' ? 'Your Wellness Companion' : 'Clinical Assistant'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* API Status Warning */}
          {apiStatus === 'warning' && (
            <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-800">
                Service is experiencing high demand. Responses may be delayed.
              </p>
            </div>
          )}
          
          {apiStatus === 'error' && (
            <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800">
                Connection issues detected. Please try again.
              </p>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white rounded-br-md'
                      : userRole === 'patient'
                      ? 'bg-white text-gray-800 border border-green-200 rounded-bl-md shadow-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed prose prose-sm max-w-none">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-green-200 rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-green-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-green-100">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(question);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded-full transition-colors"
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-green-100 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={userRole === 'patient' 
                  ? "Ask about therapies, preparation, or wellness tips..." 
                  : "Ask about patients, schedules, or protocols..."
                }
                className="flex-1 border border-green-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AyurBot;