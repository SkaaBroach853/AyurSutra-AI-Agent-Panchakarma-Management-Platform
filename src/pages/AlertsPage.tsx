import { Bell, Droplets, Heart, Sun, Leaf, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    type: "hydration",
    icon: Droplets,
    title: "Gentle Hydration Reminder",
    message: "Your body heals best with proper hydration. Sip warm water with a pinch of rock salt 30 minutes before today's therapy.",
    time: "30 minutes ago",
    priority: "medium",
    category: "Pre-therapy Care",
    action: "Set Reminder",
    isRead: false
  },
  {
    id: 2,
    type: "wellness",
    icon: Heart,
    title: "Post-Therapy Rest",
    message: "Take time to rest and allow your body to integrate the healing benefits. Avoid strenuous activities for the next 2 hours.",
    time: "2 hours ago",
    priority: "high",
    category: "Recovery",
    action: "View Guidelines",
    isRead: false
  },
  {
    id: 3,
    type: "nutrition",
    icon: Leaf,
    title: "Mindful Eating Suggestion",
    message: "Consider warm, easily digestible foods today. Kitchari (rice and lentil) with ghee would be perfect for your constitution.",
    time: "4 hours ago",
    priority: "low",
    category: "Nutrition",
    action: "View Recipe",
    isRead: true
  },
  {
    id: 4,
    type: "schedule",
    icon: Clock,
    title: "Tomorrow's Preparation",
    message: "Your Abhyanga massage is scheduled for 10 AM tomorrow. Please arrive 15 minutes early for consultation.",
    time: "Yesterday",
    priority: "medium",
    category: "Schedule",
    action: "View Details",
    isRead: true
  },
  {
    id: 5,
    type: "seasonal",
    icon: Sun,
    title: "Seasonal Wellness Tip",
    message: "As spring approaches, support your liver's natural detox with warm lemon water and gentle morning walks.",
    time: "2 days ago",
    priority: "low",
    category: "Seasonal Care",
    action: "Learn More",
    isRead: true
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-accent/10 text-accent border-accent/20";
    case "medium": return "bg-primary/10 text-primary border-primary/20";
    case "low": return "bg-healing/10 text-healing border-healing/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case "hydration": return "text-healing";
    case "wellness": return "text-accent";
    case "nutrition": return "text-primary";
    case "schedule": return "text-warm";
    case "seasonal": return "text-accent";
    default: return "text-muted-foreground";
  }
};

export const AlertsPage = () => {
  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold">Wellness Alerts</h1>
          {unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground font-ayur-body">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <p className="text-primary-foreground/80 font-ayur-body">
          Personalized guidance for your healing journey
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Actions */}
        <Card className="shadow-card border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Alert Settings</h3>
                  <p className="text-sm text-muted-foreground font-ayur-body">Customize your notifications</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary-light">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            
            return (
              <Card 
                key={alert.id} 
                className={`shadow-card border-primary/10 transition-all ${
                  !alert.isRead ? 'bg-card ring-1 ring-primary/10' : 'bg-card/50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(alert.type)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{alert.title}</h3>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground font-ayur-body mb-3 leading-relaxed">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={`${getPriorityColor(alert.priority)} font-ayur-body text-xs`}
                          >
                            {alert.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-ayur-body">
                            {alert.time}
                          </span>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-primary-light hover:bg-primary/5"
                        >
                          {alert.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mark All Read */}
        {unreadCount > 0 && (
          <Card className="shadow-card border-healing/20 bg-healing/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-healing" />
                  <span className="font-semibold text-foreground">Mark all as read</span>
                </div>
                <Button variant="ghost" size="sm" className="text-healing hover:text-healing/80">
                  Mark Read
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};