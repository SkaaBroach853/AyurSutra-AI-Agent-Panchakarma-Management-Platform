// src/data/ayurvedaTopics.ts

export type AyurvedaTopic = {
  title: string;
  icon: string;
  category: string;
  readTime?: string;
  content?: string; // HTML string
};

export const ayurvedaTopics: AyurvedaTopic[] = [
  { 
    title: "Understanding Your Dosha", 
    icon: "⚖️", 
    category: "Fundamentals",
    readTime: "8 min read",
    content: `
      <h3>What Are Doshas?</h3>
      <p>Doshas are the three fundamental energies that govern all biological processes...</p>

      <h4>The Three Doshas Explained</h4>

      <div class="dosha-section">
        <h5>🔥 Pitta - The Fire Energy</h5>
        <p><strong>Elements:</strong> Fire and Water</p>
        <p><strong>Primary Functions:</strong> Digestion, metabolism, transformation</p>
        <p><strong>When Balanced:</strong> Strong digestion, radiant skin, confident leadership</p>
        <p><strong>When Imbalanced:</strong> Acidity, anger, perfectionism</p>
      </div>

      <div class="dosha-section">
        <h5>💨 Vata - The Air Energy</h5>
        <p><strong>Elements:</strong> Air and Space</p>
        <p><strong>Primary Functions:</strong> Movement, circulation, breathing</p>
        <p><strong>When Balanced:</strong> Creativity, joyful energy, flexibility</p>
        <p><strong>When Imbalanced:</strong> Anxiety, insomnia, scattered thoughts</p>
      </div>

      <div class="dosha-section">
        <h5>🌍 Kapha - The Earth Energy</h5>
        <p><strong>Elements:</strong> Earth and Water</p>
        <p><strong>Primary Functions:</strong> Structure, immunity, emotional stability</p>
        <p><strong>When Balanced:</strong> Calm, patient, strong immunity</p>
        <p><strong>When Imbalanced:</strong> Lethargy, congestion, depression</p>
      </div>

      <h4>Living According to Your Dosha</h4>
      <p>Once you understand your constitution, you can make informed choices about diet, exercise, and lifestyle.</p>
    `
  },
  {
    title: "Meditation Techniques",
    icon: "🕯️",
    category: "Mindfulness",
    readTime: "10 min read",
    content: `
      <h3>Ayurvedic Meditation Practices</h3>
      <p>Meditation is tailored in Ayurveda according to your dominant dosha...</p>

      <h5>For Anxiety/Restlessness (High Vata):</h5>
      <ul>
        <li>Grounding breathwork</li>
        <li>Warm oil self-massage before meditation</li>
        <li>Visualization of stability (mountains, trees)</li>
      </ul>

      <h5>For Anger/Stress (High Pitta):</h5>
      <ul>
        <li>Cooling pranayama</li>
        <li>Loving-kindness meditation</li>
        <li>Candle gazing in cool, quiet environment</li>
      </ul>

      <h5>For Depression/Lethargy (High Kapha):</h5>
      <ul>
        <li>Energizing breathing techniques</li>
        <li>Walking meditation</li>
        <li>Group meditation for motivation</li>
      </ul>

      <h4>Signs of Progress</h4>
      <ul>
        <li>Improved emotional stability</li>
        <li>Deeper sleep</li>
        <li>Greater compassion and patience</li>
      </ul>
    `
  }
  // 📝 Add more topics here by copy-pasting the same structure
];
