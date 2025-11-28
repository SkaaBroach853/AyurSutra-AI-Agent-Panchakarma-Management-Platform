import { useState } from "react";
import { Users, Calendar, AlertTriangle, TrendingUp, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PatientDetailsModal } from "@/components/PatientDetailsModal";
import { UpdateProgressModal } from "@/components/UpdateProgressModal";
import { DoctorProfile } from "@/components/DoctorProfile";
import AyurBot from "@/components/AyurBot";

const todayPatients = [
  {
    id: 1,
    name: "Priya Sharma",
    time: "10:00 AM",
    therapy: "Abhyanga",
    session: "4/7",
    risk: "low",
    notes: "Responding well to treatment, energy levels improving",
    constitution: "Vata-Pitta"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    time: "2:00 PM",
    therapy: "Virechana",
    session: "3/7",
    risk: "medium",
    notes: "Monitor blood pressure during therapy",
    constitution: "Pitta-Kapha"
  },
  {
    id: 3,
    name: "Meera Gupta",
    time: "4:00 PM",
    therapy: "Shirodhara",
    session: "2/7",
    risk: "low",
    notes: "Excellent progress with stress levels",
    constitution: "Vata"
  }
];

const alerts = [
  {
    id: 1,
    type: "risk",
    patient: "Rajesh Kumar",
    message: "Hypertension levels elevated. Monitor closely during Virechana therapy.",
    priority: "high"
  },
  {
    id: 2,
    type: "progress",
    patient: "Priya Sharma",
    message: "Excellent response to treatment. Consider adjusting therapy intensity.",
    priority: "medium"
  }
];

const currentUserId = "doctor-456"; // This would typically come from auth context or similar

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high": return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium": return "bg-accent/10 text-accent border-accent/20";
    case "low": return "bg-healing/10 text-healing border-healing/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [patients, setPatients] = useState(todayPatients);

  const handleViewDetails = (patient: any) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleUpdateProgress = (patient: any) => {
    setSelectedPatient(patient);
    setShowProgressModal(true);
  };

  const handlePatientUpdate = (patientId: number, updates: any) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId ? { ...p, ...updates } : p
    ));
  };

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
        {/* Header */}
        <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Doctor Profile</h1>
                <p className="text-primary-foreground/80 text-sm font-ayur-body">Manage your professional details</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowProfile(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="p-4">
          <DoctorProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-xl font-semibold">Welcome, Dr. Sharma</h1>
                <p className="text-primary-foreground/80 text-sm font-ayur-body">Guide healing with ancient wisdom</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowProfile(true)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                My Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Today's Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-card border-primary/10">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground font-ayur-body">Today's Patients</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/10">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-healing/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-healing" />
              </div>
              <p className="text-2xl font-bold text-foreground">94%</p>
              <p className="text-sm text-muted-foreground font-ayur-body">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Alerts for Doctor */}
        <Card className="shadow-gentle border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Clinical Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-card rounded-lg border border-accent/10">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{alert.patient}</h4>
                  <Badge className={`${getRiskColor(alert.priority)} font-ayur-body text-xs`}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-ayur-body">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Healing Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="p-4 bg-muted/5 rounded-xl border border-muted/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground font-ayur-body">{patient.constitution} Constitution</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-ayur-body">
                      <Clock className="w-4 h-4" />
                      {patient.time}
                    </div>
                    <Badge className={`${getRiskColor(patient.risk)} font-ayur-body text-xs mt-1`}>
                      {patient.risk} risk
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-ayur-body">Therapy:</span>
                    <span className="font-semibold text-foreground">{patient.therapy}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-ayur-body">Progress:</span>
                    <span className="font-semibold text-primary">Session {patient.session}</span>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-healing/5 rounded-lg border border-healing/10">
                  <p className="text-sm text-muted-foreground font-ayur-body">
                    <span className="font-semibold text-foreground">Clinical Notes:</span> {patient.notes}
                  </p>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-primary hover:text-primary-light hover:bg-primary/5"
                    onClick={() => handleViewDetails(patient)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-healing hover:text-healing/80 hover:bg-healing/5"
                    onClick={() => handleUpdateProgress(patient)}
                  >
                    Update Progress
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <AyurBot userRole="patient" userId={currentUserId} />
      </div>

      {/* Modals */}
      <PatientDetailsModal
        patient={selectedPatient}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
      <UpdateProgressModal
        patient={selectedPatient}
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
        onUpdate={handlePatientUpdate}
      />
    </div>
  );
};