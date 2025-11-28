import { useState } from "react";
import { Calendar, Heart, Droplets, Leaf, Sun, Plus, X, Clock, User, Info, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookSessionModal } from "@/components/BookSessionModal";
import AyurBot from "@/components/AyurBot";

export const PatientDashboard = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSessionDetailsModal, setShowSessionDetailsModal] = useState(false);
  const [showPreTherapyModal, setShowPreTherapyModal] = useState(false);
  const [showWellnessModal, setShowWellnessModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'stress' | 'energy' | 'hydration' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const currentUserId = "patient-123";

  const handleWellnessCardClick = (metric: 'stress' | 'energy' | 'hydration') => {
    setSelectedMetric(metric);
    setShowWellnessModal(true);
  };

  const handleConfirmAttendance = () => {
    setShowSessionDetailsModal(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleReschedule = () => {
    setShowSessionDetailsModal(false);
    setShowReschedule(true);
  };

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Namaste, Priya</h1>
            <p className="text-primary-foreground/80 text-sm font-ayur-body">Your healing journey continues</p>
          </div>
        </div>
        
        {/* Today's Inspiration */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-ayur-body text-primary-foreground/90">
                  "Balance is not something you find, it's something you create."
                </p>
                <p className="text-xs text-primary-foreground/70 mt-1">— Ancient Ayurvedic Wisdom</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 space-y-6">
        {/* Today's Session */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Healing Sessions</h2>
          <Button 
            onClick={() => setShowBookingModal(true)}
            size="sm" 
            className="bg-primary hover:bg-primary-light text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Book Session
          </Button>
        </div>
        
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Healing Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-healing/10 p-4 rounded-xl border border-healing/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Virechana Therapy</h3>
                <Badge variant="secondary" className="bg-accent/10 text-accent font-ayur-body">
                  Session 3 of 7
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-ayur-body">
                <span>🕘 2:00 PM - 3:30 PM</span>
                <span>👨‍⚕️ Dr. Sharma</span>
              </div>
              <Button 
                onClick={() => setShowSessionDetailsModal(true)}
                className="w-full mt-4 bg-primary hover:bg-primary-light text-primary-foreground"
              >
                View Session Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wellness Insights */}
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-healing" />
              Your Wellness Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleWellnessCardClick('stress')}
                className="text-center p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground font-ayur-body">Stress Level</p>
                <p className="font-semibold text-primary">Low</p>
              </button>
              <button
                onClick={() => handleWellnessCardClick('energy')}
                className="text-center p-3 bg-healing/5 rounded-xl hover:bg-healing/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-healing/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sun className="w-4 h-4 text-healing" />
                </div>
                <p className="text-xs text-muted-foreground font-ayur-body">Energy</p>
                <p className="font-semibold text-healing">High</p>
              </button>
              <button
                onClick={() => handleWellnessCardClick('hydration')}
                className="text-center p-3 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Droplets className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-muted-foreground font-ayur-body">Hydration</p>
                <p className="font-semibold text-accent">Good</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* AI Wellness Alert */}
        <Card className="shadow-gentle border-accent/20 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Droplets className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Gentle Reminder</h4>
                <p className="text-sm text-muted-foreground font-ayur-body">
                  Your body heals best with hydration. Sip warm water with a pinch of rock salt 30 minutes before today's therapy.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowPreTherapyModal(true)}
                  className="mt-2 p-0 h-auto text-accent hover:text-accent-light"
                >
                  Learn more about pre-therapy care →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <AyurBot userRole="patient" userId={currentUserId} />
      </div>

      {/* Booking Modal */}
      <BookSessionModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      {/* Session Details Modal - Fixed z-index to be above navbar */}
      {showSessionDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Session Details</h2>
              <button
                onClick={() => setShowSessionDetailsModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Session Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Virechana Therapy</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">2:00 PM - 3:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Practitioner</p>
                      <p className="font-medium">Dr. Rajesh Sharma</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="font-medium">Session 3 of 7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Therapy */}
              <div className="bg-healing/10 p-4 rounded-xl border border-healing/20">
                <h4 className="font-semibold text-foreground mb-2">About Virechana</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Virechana is a medicated purgation therapy which removes Pitta toxins from the body that are accumulated in the liver and gallbladder. It completely cleanses the gastro-intestinal tract.
                </p>
              </div>

              {/* Pre-therapy Instructions */}
              <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" />
                  Before Your Session
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>Drink warm water 30 minutes before</li>
                  <li>Wear comfortable, loose clothing</li>
                  <li>Avoid heavy meals 2 hours prior</li>
                  <li>Arrive 10 minutes early</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  onClick={handleConfirmAttendance}
                  className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
                >
                  Confirm Attendance
                </Button>
                <Button 
                  onClick={handleReschedule}
                  variant="outline" 
                  className="w-full"
                >
                  Reschedule Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[110] bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✓ Attendance Confirmed! See you at 2:00 PM
        </div>
      )}

      {/* Reschedule Modal */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Reschedule Session</h2>
              <button
                onClick={() => setShowReschedule(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select a new date and time for your Virechana Therapy session.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">New Date</label>
                <input 
                  type="date" 
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">New Time</label>
                <select className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>9:00 AM - 10:30 AM</option>
                  <option>11:00 AM - 12:30 PM</option>
                  <option>2:00 PM - 3:30 PM</option>
                  <option>4:00 PM - 5:30 PM</option>
                </select>
              </div>
              <Button 
                onClick={() => {
                  setShowReschedule(false);
                  setShowConfirmation(true);
                  setTimeout(() => setShowConfirmation(false), 3000);
                }}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
              >
                Confirm Reschedule
              </Button>
              <Button 
                onClick={() => setShowReschedule(false)}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Wellness Details Modal */}
      {showWellnessModal && selectedMetric && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className={`sticky top-0 p-6 rounded-t-2xl flex items-center justify-between ${
              selectedMetric === 'stress' ? 'bg-gradient-to-r from-primary to-primary-light' :
              selectedMetric === 'energy' ? 'bg-gradient-to-r from-healing to-healing-light' :
              'bg-gradient-to-r from-accent to-accent-light'
            } text-primary-foreground`}>
              <h2 className="text-xl font-semibold">
                {selectedMetric === 'stress' ? 'Stress Level' :
                 selectedMetric === 'energy' ? 'Energy Level' : 'Hydration'}
              </h2>
              <button
                onClick={() => {
                  setShowWellnessModal(false);
                  setSelectedMetric(null);
                }}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  selectedMetric === 'stress' ? 'bg-primary/10' :
                  selectedMetric === 'energy' ? 'bg-healing/10' : 'bg-accent/10'
                }`}>
                  {selectedMetric === 'stress' && <Heart className="w-10 h-10 text-primary" />}
                  {selectedMetric === 'energy' && <Sun className="w-10 h-10 text-healing" />}
                  {selectedMetric === 'hydration' && <Droplets className="w-10 h-10 text-accent" />}
                </div>
                <h3 className={`text-2xl font-bold ${
                  selectedMetric === 'stress' ? 'text-primary' :
                  selectedMetric === 'energy' ? 'text-healing' : 'text-accent'
                }`}>
                  {selectedMetric === 'stress' ? 'Low' :
                   selectedMetric === 'energy' ? 'High' : 'Good'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Current Status</p>
              </div>

              {/* Weekly Trend */}
              <div className={`p-4 rounded-xl border ${
                selectedMetric === 'stress' ? 'bg-primary/5 border-primary/20' :
                selectedMetric === 'energy' ? 'bg-healing/5 border-healing/20' : 'bg-accent/5 border-accent/20'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className={`w-4 h-4 ${
                    selectedMetric === 'stress' ? 'text-primary' :
                    selectedMetric === 'energy' ? 'text-healing' : 'text-accent'
                  }`} />
                  <h4 className="font-semibold text-foreground">7-Day Trend</h4>
                </div>
                <div className="flex items-end gap-1.5 h-32 px-2">
                  {[
                    { value: 60, label: 'Mon' },
                    { value: 50, label: 'Tue' },
                    { value: 55, label: 'Wed' },
                    { value: 45, label: 'Thu' },
                    { value: 65, label: 'Fri' },
                    { value: 70, label: 'Sat' },
                    { value: 75, label: 'Sun' }
                  ].map((day, i) => {
                    const displayValue = selectedMetric === 'stress' ? 100 - day.value : day.value;
                    const heightPercentage = (displayValue / 100) * 100;
                    
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end group">
                        <div className="relative w-full flex items-end justify-center mb-1">
                          <span className={`text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 ${
                            selectedMetric === 'stress' ? 'text-primary' :
                            selectedMetric === 'energy' ? 'text-healing' : 'text-accent'
                          }`}>
                            {displayValue}%
                          </span>
                        </div>
                        <div 
                          className={`w-full rounded-t-lg shadow-sm hover:shadow-md transition-all duration-300 ${
                            selectedMetric === 'stress' ? 'bg-gradient-to-t from-primary to-primary-light hover:from-primary-light hover:to-primary' :
                            selectedMetric === 'energy' ? 'bg-gradient-to-t from-healing to-healing-light hover:from-healing-light hover:to-healing' : 
                            'bg-gradient-to-t from-accent to-accent-light hover:from-accent-light hover:to-accent'
                          }`}
                          style={{ 
                            height: `${heightPercentage}%`,
                            minHeight: `${heightPercentage}px`
                          }}
                        />
                        <span className="text-xs text-muted-foreground mt-2 font-medium">
                          {day.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Insights & Tips */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Ayurvedic Insights
                </h4>
                <div className="space-y-3">
                  {selectedMetric === 'stress' && (
                    <>
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <p className="text-sm text-foreground">🧘‍♀️ Your stress levels are well-managed. Continue your meditation practice.</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <p className="text-sm text-foreground">🌿 Try Ashwagandha tea before bed to maintain calmness.</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <p className="text-sm text-foreground">💆‍♀️ Schedule a Shirodhara session for deeper relaxation.</p>
                      </div>
                    </>
                  )}
                  {selectedMetric === 'energy' && (
                    <>
                      <div className="bg-healing/5 p-3 rounded-lg border border-healing/10">
                        <p className="text-sm text-foreground">⚡ Excellent energy levels! Your Panchakarma is working well.</p>
                      </div>
                      <div className="bg-healing/5 p-3 rounded-lg border border-healing/10">
                        <p className="text-sm text-foreground">🌅 Morning yoga and pranayama are enhancing your vitality.</p>
                      </div>
                      <div className="bg-healing/5 p-3 rounded-lg border border-healing/10">
                        <p className="text-sm text-foreground">🍵 Continue with warm meals and herbal teas.</p>
                      </div>
                    </>
                  )}
                  {selectedMetric === 'hydration' && (
                    <>
                      <div className="bg-accent/5 p-3 rounded-lg border border-accent/10">
                        <p className="text-sm text-foreground">💧 You're drinking 6-7 glasses daily. Aim for 8 glasses.</p>
                      </div>
                      <div className="bg-accent/5 p-3 rounded-lg border border-accent/10">
                        <p className="text-sm text-foreground">🌡️ Warm water with cumin seeds aids digestion.</p>
                      </div>
                      <div className="bg-accent/5 p-3 rounded-lg border border-accent/10">
                        <p className="text-sm text-foreground">⏰ Set reminders to sip water every hour.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => {
                  setShowWellnessModal(false);
                  setSelectedMetric(null);
                }}
                className={`w-full ${
                  selectedMetric === 'stress' ? 'bg-primary hover:bg-primary-light' :
                  selectedMetric === 'energy' ? 'bg-healing hover:bg-healing-light' : 'bg-accent hover:bg-accent-light'
                } text-primary-foreground`}
              >
                Got It!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pre-therapy Care Modal */}
      {showPreTherapyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-accent to-accent-light text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pre-Therapy Care</h2>
              <button
                onClick={() => setShowPreTherapyModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Hydration Section */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Hydration Protocol</h3>
                </div>
                <div className="bg-accent/10 p-4 rounded-xl space-y-3 border border-accent/20">
                  <p className="text-sm text-foreground">
                    Proper hydration prepares your body for optimal therapy results and helps eliminate toxins effectively.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <p className="text-sm text-muted-foreground">Drink 1 glass of warm water with a pinch of rock salt (Sendha Namak) 30 minutes before therapy</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <p className="text-sm text-muted-foreground">Avoid cold water - room temperature or warm water is best</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <p className="text-sm text-muted-foreground">Continue sipping water throughout the day (6-8 glasses total)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diet Guidelines */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-healing" />
                  Dietary Guidelines
                </h4>
                <div className="space-y-3">
                  <div className="bg-healing/10 p-3 rounded-lg border border-healing/20">
                    <p className="text-xs text-healing font-medium mb-1">RECOMMENDED</p>
                    <p className="text-sm text-foreground">Light, easily digestible foods like khichdi, steamed vegetables, fruits</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-xs text-red-700 font-medium mb-1">AVOID</p>
                    <p className="text-sm text-foreground">Heavy, oily, spicy foods, dairy products, cold drinks</p>
                  </div>
                </div>
              </div>

              {/* Rest & Preparation */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-accent" />
                  Rest & Preparation
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Get adequate sleep (7-8 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Wear comfortable, loose-fitting clothes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Arrive with a calm, relaxed mind</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Empty your bladder before the session</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => setShowPreTherapyModal(false)}
                className="w-full bg-accent hover:bg-accent-light text-primary-foreground"
              >
                Got It, Thank You!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};