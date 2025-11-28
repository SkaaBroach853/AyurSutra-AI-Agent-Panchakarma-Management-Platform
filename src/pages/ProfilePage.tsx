import { User, Edit, Settings, Heart, Calendar, Award, Shield, Bell, X, Check, Eye, EyeOff, Download, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  
  // Preferences state
  const [wellnessAlerts, setWellnessAlerts] = useState(true);
  const [progressInsights, setProgressInsights] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);

  // User info state
  const [userInfo, setUserInfo] = useState({
    name: "Priya Sharma",
    age: "32 years",
    constitution: "Vata-Pitta",
    primaryConcern: "Stress & Digestion",
    doctor: "Dr. Sharma"
  });

  const handleConfirmation = (message: string) => {
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{userInfo.name}</h1>
            <p className="text-primary-foreground/80 text-sm font-ayur-body">{userInfo.constitution} Constitution</p>
            <Badge className="bg-accent text-accent-foreground font-ayur-body text-xs mt-1">
              Active Treatment
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setShowEditModal(true)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Tabs defaultValue="profile" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="alerts" className="relative">
              Alerts
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
        {/* Health Journey */}
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-healing" />
              Your Wellness Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-xl">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">14</p>
                <p className="text-sm text-muted-foreground font-ayur-body">Treatment Days</p>
              </div>
              <div className="text-center p-3 bg-healing/5 rounded-xl">
                <Award className="w-6 h-6 text-healing mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">7</p>
                <p className="text-sm text-muted-foreground font-ayur-body">Sessions Completed</p>
              </div>
            </div>
            
            <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
              <h4 className="font-semibold text-foreground mb-2">Current Treatment Plan</h4>
              <p className="text-sm text-muted-foreground font-ayur-body">
                Panchakarma Detoxification Program - Session 3 of 7 completed
              </p>
              <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground font-ayur-body">Age</p>
                <p className="font-semibold text-foreground">{userInfo.age}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-ayur-body">Constitution</p>
                <p className="font-semibold text-foreground">{userInfo.constitution}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-ayur-body">Primary Concern</p>
                <p className="font-semibold text-foreground">{userInfo.primaryConcern}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-ayur-body">Assigned Doctor</p>
                <p className="font-semibold text-foreground">{userInfo.doctor}</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full text-primary hover:text-primary-light hover:bg-primary/5"
              onClick={() => setShowUpdateInfoModal(true)}
            >
              Update Information
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Settings className="w-5 h-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Wellness Alerts</p>
                  <p className="text-sm text-muted-foreground font-ayur-body">Receive gentle reminders</p>
                </div>
              </div>
              <Switch 
                checked={wellnessAlerts} 
                onCheckedChange={(checked) => {
                  setWellnessAlerts(checked);
                  handleConfirmation(checked ? "Wellness Alerts enabled" : "Wellness Alerts disabled");
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Progress Insights</p>
                  <p className="text-sm text-muted-foreground font-ayur-body">Daily wellness updates</p>
                </div>
              </div>
              <Switch 
                checked={progressInsights}
                onCheckedChange={(checked) => {
                  setProgressInsights(checked);
                  handleConfirmation(checked ? "Progress Insights enabled" : "Progress Insights disabled");
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Session Reminders</p>
                  <p className="text-sm text-muted-foreground font-ayur-body">30 minutes before sessions</p>
                </div>
              </div>
              <Switch 
                checked={sessionReminders}
                onCheckedChange={(checked) => {
                  setSessionReminders(checked);
                  handleConfirmation(checked ? "Session Reminders enabled" : "Session Reminders disabled");
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security - Fixed hover visibility */}
        <Card className="shadow-card border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setShowPasswordModal(true)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setShowExportModal(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Health Data
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground hover:bg-primary/10 hover:text-primary"
              onClick={() => setShowPrivacyModal(true)}
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="shadow-card border-primary/10">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-foreground mb-2">AyurSutra</h3>
            <p className="text-sm text-muted-foreground font-ayur-body mb-2">
              Version 1.0.0 • SIH 2025 Demo
            </p>
            <p className="text-xs text-muted-foreground font-ayur-body">
              Bringing ancient Ayurvedic wisdom to modern wellness
            </p>
          </CardContent>
        </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
            <Card className="shadow-card border-primary/10 mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Bell className="w-5 h-5 text-accent" />
                  Notifications & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recent Alerts */}
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Upcoming Session Reminder</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your Abhyanga therapy session is scheduled for tomorrow at 10:00 AM
                        </p>
                        <p className="text-xs text-primary mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                        <Heart className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Daily Wellness Tip</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Try incorporating warm ginger tea into your morning routine to support digestion
                        </p>
                        <p className="text-xs text-primary mt-2">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/10 rounded-lg border border-muted/20">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground flex-shrink-0">
                        <Award className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Treatment Milestone</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          You've completed 50% of your Panchakarma treatment plan!
                        </p>
                        <p className="text-xs text-primary mt-2">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[110] bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-bounce flex items-center gap-2">
          <Check className="w-4 h-4" />
          {confirmationMessage}
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-gradient-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                <input 
                  type="text" 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Age</label>
                <input 
                  type="text" 
                  value={userInfo.age}
                  onChange={(e) => setUserInfo({...userInfo, age: e.target.value})}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button 
                onClick={() => {
                  setShowEditModal(false);
                  handleConfirmation("Profile updated successfully!");
                }}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Info Modal */}
      {showUpdateInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-gradient-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Update Information</h2>
              <button
                onClick={() => setShowUpdateInfoModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Primary Concern</label>
                <input 
                  type="text" 
                  value={userInfo.primaryConcern}
                  onChange={(e) => setUserInfo({...userInfo, primaryConcern: e.target.value})}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button 
                onClick={() => {
                  setShowUpdateInfoModal(false);
                  handleConfirmation("Information updated successfully!");
                }}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-gradient-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Current Password</label>
                <input 
                  type="password" 
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">New Password</label>
                <input 
                  type="password" 
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button 
                onClick={() => {
                  setShowPasswordModal(false);
                  handleConfirmation("Password changed successfully!");
                }}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Health Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="sticky top-0 bg-gradient-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Export Health Data</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Download your complete health records, treatment history, and wellness data in a secure format.
              </p>
              
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <h4 className="font-semibold text-foreground mb-2">What's included:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Treatment history and session logs</li>
                  <li>✓ Wellness metrics and progress</li>
                  <li>✓ Dosha assessment results</li>
                  <li>✓ Prescription and therapy details</li>
                </ul>
              </div>

              <Button 
                onClick={() => {
                  setShowExportModal(false);
                  handleConfirmation("Health data exported successfully!");
                }}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Data (PDF)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-primary text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-semibold">Privacy Settings</h2>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Share progress with doctor</p>
                  <p className="text-sm text-muted-foreground">Allow doctor to view your wellness metrics</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Anonymous analytics</p>
                  <p className="text-sm text-muted-foreground">Help improve AyurSutra</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Marketing communications</p>
                  <p className="text-sm text-muted-foreground">Receive wellness tips and offers</p>
                </div>
                <Switch />
              </div>

              <Button 
                onClick={() => {
                  setShowPrivacyModal(false);
                  handleConfirmation("Privacy settings updated!");
                }}
                className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};