import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Edit, 
  Save, 
  X,
  GraduationCap,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialProfile = {
  name: "Dr. Raj Sharma",
  speciality: "Panchakarma Specialist",
  experience: "15+ years",
  qualification: "BAMS, MD (Ayurveda)",
  location: "Mumbai, Maharashtra",
  phone: "+91 98765 43210",
  email: "dr.rajsharma@ayursutra.com",
  bio: "Dedicated Ayurvedic practitioner with expertise in traditional Panchakarma therapies. Passionate about holistic healing and wellness.",
  consultations: "2,450+",
  successRate: "94%",
  languages: ["Hindi", "English", "Marathi"]
};

export const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [editedProfile, setEditedProfile] = useState(initialProfile);
  const { toast } = useToast();

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('doctorProfile', JSON.stringify(editedProfile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-primary/10 bg-gradient-subtle">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="w-5 h-5 text-primary" />
              Doctor Profile
            </CardTitle>
            <Button 
              variant={isEditing ? "ghost" : "outline"} 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              className="border-primary/20 hover:bg-primary/5"
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarFallback className="text-lg bg-primary/10 text-primary">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold text-foreground">Name</Label>
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      className="border-primary/10 focus:border-primary/30"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-foreground">Speciality</Label>
                    <Input
                      value={editedProfile.speciality}
                      onChange={(e) => setEditedProfile({...editedProfile, speciality: e.target.value})}
                      className="border-primary/10 focus:border-primary/30"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                  <p className="text-primary font-semibold">{profile.speciality}</p>
                  <p className="text-sm text-muted-foreground font-ayur-body">Experience: {profile.experience}</p>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-primary">{profile.consultations}</p>
              <p className="text-xs text-muted-foreground font-ayur-body">Consultations</p>
            </div>
            <div className="text-center p-3 bg-healing/5 rounded-xl">
              <div className="w-8 h-8 bg-healing/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-4 h-4 text-healing" />
              </div>
              <p className="text-lg font-bold text-healing">{profile.successRate}</p>
              <p className="text-xs text-muted-foreground font-ayur-body">Success Rate</p>
            </div>
            <div className="text-center p-3 bg-accent/5 rounded-xl">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-accent" />
              </div>
              <p className="text-lg font-bold text-accent">{profile.experience}</p>
              <p className="text-xs text-muted-foreground font-ayur-body">Experience</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Details */}
      <Card className="shadow-card border-primary/10">
        <CardContent className="p-4 space-y-4">
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                  className="flex-1 border-primary/10 focus:border-primary/30"
                />
              ) : (
                <span className="text-sm text-foreground">{profile.location}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  className="flex-1 border-primary/10 focus:border-primary/30"
                />
              ) : (
                <span className="text-sm text-foreground">{profile.phone}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  className="flex-1 border-primary/10 focus:border-primary/30"
                />
              ) : (
                <span className="text-sm text-foreground">{profile.email}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editedProfile.qualification}
                  onChange={(e) => setEditedProfile({...editedProfile, qualification: e.target.value})}
                  className="flex-1 border-primary/10 focus:border-primary/30"
                />
              ) : (
                <span className="text-sm text-foreground">{profile.qualification}</span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">About</Label>
            {isEditing ? (
              <Textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="min-h-[60px] border-primary/10 focus:border-primary/30"
              />
            ) : (
              <p className="text-sm text-muted-foreground font-ayur-body">{profile.bio}</p>
            )}
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">Languages</Label>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <Badge key={lang} variant="secondary" className="bg-primary/10 text-primary font-ayur-body text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleCancel} className="flex-1 border-primary/20 hover:bg-primary/5">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary-light text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};