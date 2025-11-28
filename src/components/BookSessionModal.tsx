import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, User, Clock, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const doctors = [
  {
    id: 1,
    name: "Dr. Raj Sharma",
    speciality: "Panchakarma Specialist",
    experience: "15+ years",
    constitution: "Vata-Pitta Expert"
  },
  {
    id: 2,
    name: "Dr. Priya Gupta",
    speciality: "Ayurvedic Physician",
    experience: "12+ years",
    constitution: "Kapha-Pitta Expert"
  },
  {
    id: 3,
    name: "Dr. Suresh Kumar",
    speciality: "Wellness Consultant",
    experience: "10+ years",
    constitution: "All Constitutions"
  }
];

const therapies = [
  "Abhyanga (Oil Massage)",
  "Virechana (Therapeutic Purgation)",
  "Shirodhara (Oil Pouring)",
  "Nasya (Nasal Therapy)",
  "Basti (Medicated Enema)",
  "Consultation Only"
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export const BookSessionModal = ({ isOpen, onClose }: BookSessionModalProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTherapy, setSelectedTherapy] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();

  const handleBooking = () => {
    if (!selectedDoctor || !selectedTherapy || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields to book your session",
        variant: "destructive"
      });
      return;
    }

    const booking = {
      id: Date.now(),
      doctorId: selectedDoctor,
      doctorName: doctors.find(d => d.id.toString() === selectedDoctor)?.name,
      therapy: selectedTherapy,
      date: selectedDate.toISOString(),
      time: selectedTime,
      status: "confirmed",
      bookedAt: new Date().toISOString()
    };

    // Store in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('patientBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('patientBookings', JSON.stringify(existingBookings));

    // ADDED: Trigger custom event so SessionsPage knows to refresh
    window.dispatchEvent(new Event('bookingsUpdated'));

    toast({
      title: "Session Booked Successfully! 🌿",
      description: `Your ${selectedTherapy} session with ${booking.doctorName} is confirmed`,
    });

    // Reset form
    setSelectedDoctor("");
    setSelectedTherapy("");
    setSelectedDate(undefined);
    setSelectedTime("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-card border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <CalendarDays className="w-5 h-5 text-primary" />
            Book Your Healing Session
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Select Doctor */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Choose Your Practitioner
            </Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger className="border-primary/10 focus:border-primary/30">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    <div className="flex flex-col">
                      <span className="font-semibold">{doctor.name}</span>
                      <span className="text-xs text-muted-foreground">{doctor.speciality} • {doctor.experience}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Therapy */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Leaf className="w-4 h-4 text-healing" />
              Choose Therapy
            </Label>
            <Select value={selectedTherapy} onValueChange={setSelectedTherapy}>
              <SelectTrigger className="border-primary/10 focus:border-primary/30">
                <SelectValue placeholder="Select therapy type" />
              </SelectTrigger>
              <SelectContent>
                {therapies.map((therapy) => (
                  <SelectItem key={therapy} value={therapy}>
                    {therapy}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Date */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              Choose Date
            </Label>
            <Card className="border-primary/10">
              <CardContent className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Select Time */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              Choose Time
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`text-sm ${
                    selectedTime === time 
                      ? "bg-primary text-primary-foreground" 
                      : "border-primary/20 hover:bg-primary/5"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-primary/20 hover:bg-primary/5">
              Cancel
            </Button>
            <Button onClick={handleBooking} className="flex-1 bg-primary hover:bg-primary-light text-primary-foreground">
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};