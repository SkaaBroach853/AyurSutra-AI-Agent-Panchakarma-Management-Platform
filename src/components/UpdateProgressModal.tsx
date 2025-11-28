import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface UpdateProgressModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (patientId: number, updates: any) => void;
}

export const UpdateProgressModal = ({ patient, isOpen, onClose, onUpdate }: UpdateProgressModalProps) => {
  const [progressNotes, setProgressNotes] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [nextTherapy, setNextTherapy] = useState("");
  const { toast } = useToast();

  if (!patient) return null;

  const handleSubmit = () => {
    const updates = {
      notes: progressNotes || patient.notes,
      risk: riskLevel || patient.risk,
      nextTherapy: nextTherapy
    };

    // Store in localStorage
    const existingData = JSON.parse(localStorage.getItem('patientUpdates') || '{}');
    existingData[patient.id] = {
      ...existingData[patient.id],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('patientUpdates', JSON.stringify(existingData));

    onUpdate(patient.id, updates);
    
    toast({
      title: "Progress Updated",
      description: `Updated treatment progress for ${patient.name}`,
    });
    
    // Reset form
    setProgressNotes("");
    setRiskLevel("");
    setNextTherapy("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            Update Progress - {patient.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Session Info */}
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-3">
              <p className="text-sm font-ayur-body text-muted-foreground">
                Current: {patient.therapy} | Session {patient.session}
              </p>
            </CardContent>
          </Card>

          {/* Progress Notes */}
          <div className="space-y-2">
            <Label htmlFor="progress-notes" className="text-sm font-semibold text-foreground">
              Clinical Observations
            </Label>
            <Textarea
              id="progress-notes"
              placeholder="Enter detailed observations about patient's response to therapy..."
              value={progressNotes}
              onChange={(e) => setProgressNotes(e.target.value)}
              className="min-h-[80px] border-primary/10 focus:border-primary/30"
            />
          </div>

          {/* Risk Assessment */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              Risk Assessment
            </Label>
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger className="border-primary/10 focus:border-primary/30">
                <SelectValue placeholder="Update risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Next Therapy Recommendation */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-healing" />
              Next Session Recommendation
            </Label>
            <Select value={nextTherapy} onValueChange={setNextTherapy}>
              <SelectTrigger className="border-primary/10 focus:border-primary/30">
                <SelectValue placeholder="Recommend next therapy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="continue">Continue Current Therapy</SelectItem>
                <SelectItem value="abhyanga">Switch to Abhyanga</SelectItem>
                <SelectItem value="virechana">Continue Virechana</SelectItem>
                <SelectItem value="shirodhara">Add Shirodhara</SelectItem>
                <SelectItem value="nasya">Add Nasya Therapy</SelectItem>
                <SelectItem value="basti">Proceed to Basti</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1 border-primary/20 hover:bg-primary/5">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary-light text-primary-foreground">
              Update Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};