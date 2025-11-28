import { Video, Calendar, Clock, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Ayurvedic Physician",
    image: "/placeholder.svg",
    availability: ["Mon", "Wed", "Fri"],
    rating: 4.9,
    experience: "15 years"
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    specialty: "Panchakarma Specialist",
    image: "/placeholder.svg",
    availability: ["Tue", "Thu", "Sat"],
    rating: 4.8,
    experience: "12 years"
  },
  {
    id: 3,
    name: "Dr. Meera Gupta",
    specialty: "Ayurvedic Nutritionist",
    image: "/placeholder.svg",
    availability: ["Mon", "Tue", "Thu"],
    rating: 4.7,
    experience: "10 years"
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    specialty: "Ayurvedic Dermatologist",
    image: "/placeholder.svg",
    availability: ["Wed", "Fri", "Sat"],
    rating: 4.6,
    experience: "8 years"
  }
];

// Sample upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Ananya Sharma",
    doctorImage: "/placeholder.svg",
    date: "Oct 15, 2023",
    time: "10:30 AM",
    status: "confirmed"
  }
];

const TeleConsultPage = () => {
  return (
    <div className="container px-4 py-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tele-Ayurveda</h1>
        <Button variant="outline" size="icon">
          <Video className="h-5 w-5" />
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Connect with Ayurvedic practitioners for post-therapy guidance and consultations
      </p>
      
      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search practitioners..." className="pl-8" />
      </div>
      
      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="practitioners">Practitioners</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
                        <AvatarFallback>{appointment.doctorName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{appointment.doctorName}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{appointment.date}</span>
                          <Clock className="h-3.5 w-3.5 ml-3 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-600">
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline">Reschedule</Button>
                    <Button>Join Call</Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Book New Consultation
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <Video className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-medium">No Upcoming Consultations</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Book a consultation with one of our practitioners
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="practitioners" className="mt-4">
          <div className="space-y-4">
            {doctors.map(doctor => (
              <Card key={doctor.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center text-xs mt-1">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="ml-1">{doctor.experience}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500 ml-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {doctor.availability.map(day => (
                          <Badge key={day} variant="outline" className="text-xs">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Book Consultation</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeleConsultPage;