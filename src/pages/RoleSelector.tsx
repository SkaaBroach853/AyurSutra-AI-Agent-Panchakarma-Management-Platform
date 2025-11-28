import { User, Stethoscope, Leaf, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    if (role === "patient") {
      navigate("/patient");
    } else {
      navigate("/doctor");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-wellness flex items-center justify-center p-4 font-ayur">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AyurSutra</h1>
          <p className="text-muted-foreground font-ayur-body">
            Experience personalized Ayurveda wellness
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground text-center mb-6">
            Choose Your Journey
          </h2>
          
          {/* Patient Role */}
          <Card 
            className="shadow-card border-primary/20 hover:shadow-gentle transition-all hover:border-primary/40 cursor-pointer"
            onClick={() => handleRoleSelect("patient")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-healing/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-healing" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Patient</h3>
                  <p className="text-sm text-muted-foreground font-ayur-body">
                    Track your Panchakarma sessions and receive personalized wellness guidance
                  </p>
                </div>
                <Heart className="w-5 h-5 text-accent" />
              </div>
            </CardContent>
          </Card>

          {/* Doctor Role */}
          <Card 
            className="shadow-card border-primary/20 hover:shadow-gentle transition-all hover:border-primary/40 cursor-pointer"
            onClick={() => handleRoleSelect("doctor")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Doctor/Practitioner</h3>
                  <p className="text-sm text-muted-foreground font-ayur-body">
                    Manage patients with AI insights and traditional Ayurvedic wisdom
                  </p>
                </div>
                <Leaf className="w-5 h-5 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground font-ayur-body">
            SIH 2025 Demo • Bringing ancient wisdom to modern healthcare
          </p>
        </div>
      </div>
    </div>
  );
};