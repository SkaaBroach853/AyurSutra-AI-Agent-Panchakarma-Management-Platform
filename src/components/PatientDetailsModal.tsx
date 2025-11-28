import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Heart, Activity, Clock } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  time: string;
  therapy: string;
  session: string;
  risk: string;
  notes: string;
  constitution: string;
}

interface PatientDetailsModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high": return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium": return "bg-accent/10 text-accent border-accent/20";
    case "low": return "bg-healing/10 text-healing border-healing/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export const PatientDetailsModal = ({ patient, isOpen, onClose }: PatientDetailsModalProps) => {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <User className="w-5 h-5 text-primary" />
            Patient Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Patient Info */}
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                <Badge className={`${getRiskColor(patient.risk)} font-ayur-body text-xs`}>
                  {patient.risk} risk
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-ayur-body mb-2">
                Constitution: {patient.constitution}
              </p>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card className="bg-healing/5 border-healing/10">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-healing" />
                <span className="font-semibold text-foreground">Therapy Details</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-ayur-body">Therapy:</span>
                  <span className="font-semibold text-foreground">{patient.therapy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-ayur-body">Progress:</span>
                  <span className="font-semibold text-primary">Session {patient.session}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-ayur-body">Time:</span>
                  <span className="font-semibold text-foreground">{patient.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Notes */}
          <Card className="bg-accent/5 border-accent/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-accent" />
                <span className="font-semibold text-foreground">Clinical Notes</span>
              </div>
              <p className="text-sm text-muted-foreground font-ayur-body">{patient.notes}</p>
            </CardContent>
          </Card>

          {/* Vital Stats (Mock Data) */}
          <Card className="bg-muted/5 border-muted/10">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-3">Recent Vitals</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground font-ayur-body">Blood Pressure:</span>
                  <p className="font-semibold text-foreground">120/80</p>
                </div>
                <div>
                  <span className="text-muted-foreground font-ayur-body">Pulse:</span>
                  <p className="font-semibold text-foreground">72 bpm</p>
                </div>
                <div>
                  <span className="text-muted-foreground font-ayur-body">Temperature:</span>
                  <p className="font-semibold text-foreground">98.6°F</p>
                </div>
                <div>
                  <span className="text-muted-foreground font-ayur-body">Weight:</span>
                  <p className="font-semibold text-foreground">65 kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary-light text-primary-foreground">
            Close Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};