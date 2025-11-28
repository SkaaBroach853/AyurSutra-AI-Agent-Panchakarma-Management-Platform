import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Video, User, ChevronRight, X, Info } from "lucide-react";
import { useState, useEffect } from "react";

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming": return "bg-accent/10 text-accent border-accent/20";
    case "scheduled": return "bg-primary/10 text-primary border-primary/20";
    case "completed": return "bg-healing/10 text-healing border-healing/20";
    case "confirmed": return "bg-primary/10 text-primary border-primary/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getTypeIcon = (therapy: string) => {
  if (therapy.includes("Abhyanga")) return "🌸";
  if (therapy.includes("Virechana")) return "🌿";
  if (therapy.includes("Shirodhara")) return "🧘";
  if (therapy.includes("Basti")) return "💧";
  if (therapy.includes("Nasya")) return "🌺";
  return "🌱";
};

// SessionCard component for displaying individual session information
const SessionCard = ({ session, onViewDetails }: { session: any; onViewDetails: (session: any) => void }) => {
  const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card key={session.id} className="shadow-card border-primary/10 hover:shadow-gentle transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">{getTypeIcon(session.therapy)}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{session.therapy}</h3>
            <Badge className={`text-xs font-ayur-body ${getStatusColor(session.status)}`}>
              {session.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground font-ayur-body">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{session.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{session.doctorName}</span>
          </div>
        </div>

        {session.status !== "completed" && (
          <Button 
            onClick={() => onViewDetails(session)}
            variant="ghost" 
            className="w-full mt-3 text-primary hover:text-primary-light hover:bg-primary/5"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const SessionsPage = () => {
  const [activeTab, setActiveTab] = useState("sessions");
  const [sessions, setSessions] = useState<any[]>([]);
  const [showSessionDetailsModal, setShowSessionDetailsModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showTeleConsultModal, setShowTeleConsultModal] = useState(false);
  const [selectedTeleConsult, setSelectedTeleConsult] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to load sessions
  const loadSessions = () => {
    const stored = localStorage.getItem('patientBookings');
    if (stored) {
      setSessions(JSON.parse(stored));
    }
  };

  // Load on mount and listen for updates
  useEffect(() => {
    loadSessions();
    
    const handleUpdate = () => {
      loadSessions();
    };
    
    window.addEventListener('bookingsUpdated', handleUpdate);
    return () => window.removeEventListener('bookingsUpdated', handleUpdate);
  }, []);

  const handleViewDetails = (session: any) => {
    setSelectedSession(session);
    setShowSessionDetailsModal(true);
  };

  const handleTeleConsult = (session: any) => {
    setSelectedTeleConsult(session);
    setShowTeleConsultModal(true);
  };

  const handleConfirmAttendance = () => {
    setShowSessionDetailsModal(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };
  
  // Filter completed sessions that are eligible for tele-consult (within 4 days of completion)
  const completedSessions = sessions.filter(session => session.status === "completed");
  const totalSessions = sessions.length;
  const completedCount = completedSessions.length;
  const progressPercentage = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 21;
  
  return (
    <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="text-2xl font-semibold mb-2">Your Healing Journey</h1>
        <p className="text-primary-foreground/80 font-ayur-body">
          Track your Panchakarma sessions with mindful awareness
        </p>
      </div>

      <div className="p-4 space-y-4">
        <Tabs defaultValue="sessions" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="teleconsult" className="relative">
              Tele-Consult
              {completedSessions.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {completedSessions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions">
            {/* Progress Overview */}
            <Card className="shadow-card border-primary/10 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Treatment Progress</h3>
                  <Badge variant="secondary" className="bg-accent/10 text-accent font-ayur-body">
                    {completedCount} of {totalSessions || 7} completed
                  </Badge>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2 mb-2">
                  <div className="bg-gradient-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground font-ayur-body">
                  You're making beautiful progress on your wellness journey
                </p>
              </CardContent>
            </Card>
            
            {/* Sessions List */}
            <div className="space-y-4">
              {sessions.length > 0 ? (
                sessions.map(session => (
                  <SessionCard key={session.id} session={session} onViewDetails={handleViewDetails} />
                ))
              ) : (
                <Card className="shadow-card border-primary/10">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No sessions booked yet. Book your first session from the dashboard!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="teleconsult">
            {completedSessions.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with your practitioner for post-therapy guidance (available for 4 days after session completion)
                </p>
                {completedSessions.map(session => (
                  <Card key={session.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Video className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{session.therapy}</h3>
                          <p className="text-sm text-muted-foreground">
                            {session.doctorName} • Completed on {new Date(session.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button onClick={() => handleTeleConsult(session)}>
                          Connect <Video className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 font-medium">No Eligible Sessions</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tele-consults are available for 4 days after completing a therapy session
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[110] bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✓ Attendance Confirmed!
        </div>
      )}

      {/* Session Details Modal */}
      {showSessionDetailsModal && selectedSession && (
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{getTypeIcon(selectedSession.therapy)}</div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedSession.therapy}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(selectedSession.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{selectedSession.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Practitioner</p>
                      <p className="font-medium">{selectedSession.doctorName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Therapy */}
              <div className="bg-healing/10 p-4 rounded-xl border border-healing/20">
                <h4 className="font-semibold text-foreground mb-2">About {selectedSession.therapy}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedSession.therapy.includes("Abhyanga") && "Abhyanga is a full-body warm oil massage that nourishes the skin, calms the nervous system, and promotes deep relaxation."}
                  {selectedSession.therapy.includes("Virechana") && "Virechana is a medicated purgation therapy which removes Pitta toxins from the body that are accumulated in the liver and gallbladder."}
                  {selectedSession.therapy.includes("Shirodhara") && "Shirodhara involves gently pouring warm herbal oil over the forehead to calm the mind and balance the nervous system."}
                  {selectedSession.therapy.includes("Basti") && "Basti is a therapeutic enema treatment that cleanses and nourishes the colon, balancing Vata dosha."}
                  {selectedSession.therapy.includes("Nasya") && "Nasya is the administration of herbal oils through the nasal passage to clear toxins and improve respiratory health."}
                  {!selectedSession.therapy.includes("Abhyanga") && 
                   !selectedSession.therapy.includes("Virechana") && 
                   !selectedSession.therapy.includes("Shirodhara") && 
                   !selectedSession.therapy.includes("Basti") && 
                   !selectedSession.therapy.includes("Nasya") && 
                   "This Ayurvedic therapy is designed to restore balance and promote healing in your body and mind."}
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
                  onClick={() => setShowSessionDetailsModal(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tele-Consult Modal */}
      {showTeleConsultModal && selectedTeleConsult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Start Tele-Consult</h2>
              <button
                onClick={() => setShowTeleConsultModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Session Info */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{selectedTeleConsult.therapy}</h3>
                <p className="text-sm text-muted-foreground">
                  Post-therapy consultation with {selectedTeleConsult.doctorName}
                </p>
              </div>

              {/* Info */}
              <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" />
                  What to Expect
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Review your therapy experience</li>
                  <li>• Discuss any post-therapy symptoms</li>
                  <li>• Get personalized dietary recommendations</li>
                  <li>• Plan next steps in your treatment</li>
                </ul>
              </div>

              <div className="bg-healing/10 p-3 rounded-lg border border-healing/20">
                <p className="text-sm text-foreground">
                  💡 <strong>Tip:</strong> Keep notes about how you've been feeling since your last session
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  onClick={() => {
                    setShowTeleConsultModal(false);
                    setShowConfirmation(true);
                    setTimeout(() => setShowConfirmation(false), 3000);
                  }}
                  className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Call
                </Button>
                <Button 
                  onClick={() => setShowTeleConsultModal(false)}
                  variant="outline" 
                  className="w-full"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};