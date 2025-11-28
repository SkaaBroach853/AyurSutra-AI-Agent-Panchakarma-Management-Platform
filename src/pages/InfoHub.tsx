import { useState } from "react";
import { BookOpen, Droplets, Sun, Heart, Search, X, Clock } from "lucide-react";

// ---------------------- DATA ----------------------

const therapyTypes = [
  {
    id: 1,
    name: "Virechana",
    description: "Gentle detoxification through herbal purgation",
    icon: "🌿",
    duration: "60-90 min",
    benefits: ["Removes toxins", "Balances Pitta", "Improves digestion"],
    precautions: ["Avoid cold water", "Rest after therapy", "Light meals only"]
  },
  {
    id: 2,
    name: "Abhyanga",
    description: "Nourishing full-body oil massage",
    icon: "🌸",
    duration: "45-60 min",
    benefits: ["Nourishes skin", "Calms mind", "Improves circulation"],
    precautions: ["Warm oil therapy", "No cold exposure", "Gentle movements"]
  },
  {
    id: 3,
    name: "Shirodhara",
    description: "Continuous oil pouring on forehead",
    icon: "🧘",
    duration: "30-45 min",
    benefits: ["Deep relaxation", "Mental clarity", "Stress relief"],
    precautions: ["Keep eyes closed", "Avoid sudden movements", "Rest afterwards"]
  },
  {
    id: 4,
    name: "Basti",
    description: "Medicated enema for deep cleansing",
    icon: "💧",
    duration: "30-60 min",
    benefits: ["Cleanses colon", "Balances Vata", "Strengthens immunity"],
    precautions: ["Empty stomach", "Proper preparation", "Post-therapy rest"]
  }
];

const ayurvedaTopics = [
  { 
    title: "Understanding Your Dosha", 
    icon: "⚖️", 
    category: "Fundamentals",
    readTime: "8 min read",
    content: "<h3>What Are Doshas?</h3><p>Doshas are the three fundamental energies that govern all biological processes in our body and mind.</p>"
  },
  { 
    title: "Seasonal Wellness Tips", 
    icon: "🍂", 
    category: "Lifestyle",
    readTime: "6 min read",
    content: "<h3>Ayurvedic Seasonal Living</h3><p>Living in harmony with nature's rhythms is essential for health.</p>"
  },
  { 
    title: "Panchakarma Benefits", 
    icon: "🌱", 
    category: "Treatments",
    readTime: "10 min read",
    content: "<h3>The Science of Panchakarma</h3><p>Ayurveda's most profound healing system for complete rejuvenation.</p>"
  },
  { 
    title: "Ayurvedic Diet Guidelines", 
    icon: "🥗", 
    category: "Nutrition",
    readTime: "12 min read",
    content: "<h3>Food as Medicine</h3><p>Every meal is an opportunity to nourish or disturb your doshas.</p>"
  },
  { 
    title: "Yoga for Your Constitution", 
    icon: "🧘‍♀️", 
    category: "Practice",
    readTime: "9 min read",
    content: "<h3>Doshic Yoga</h3><p>Aligning your yoga practice with your unique constitution.</p>"
  },
  { 
    title: "Meditation Techniques", 
    icon: "🕯️", 
    category: "Mindfulness",
    readTime: "11 min read",
    content: "<h3>Ayurvedic Meditation</h3><p>Meditation as medicine for the mind based on your dosha.</p>"
  }
];

// ---------------------- COMPONENTS ----------------------

const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg shadow border ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-4 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-block px-2 py-1 text-xs rounded ${className}`}>
    {children}
  </span>
);

const Button = ({ children, className = "", ...props }) => (
  <button className={`px-4 py-2 rounded transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input className={`w-full px-3 py-2 border rounded ${className}`} {...props} />
);

// ---------------------- POPUP COMPONENT ----------------------

const PopupModal = ({ item, onClose }) => {
  if (!item) return null;

  const isTherapy = item.hasOwnProperty('duration');
  const isTopic = item.hasOwnProperty('content');

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex justify-center items-start overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 md:p-8 my-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">{item.icon}</div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title || item.name}</h2>
            {isTherapy && (
              <Badge className="bg-healing/10 text-healing mt-2">
                Duration: {item.duration}
              </Badge>
            )}
            {isTopic && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{item.readTime}</span>
                <Badge className="bg-primary/10 text-primary ml-2">{item.category}</Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          {isTherapy && (
            <>
              <div>
                <p className="text-gray-700 text-lg">{item.description}</p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-healing" />
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  {item.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-healing mt-1 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-accent" />
                  Important Care Guidelines
                </h3>
                <ul className="space-y-2">
                  {item.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-accent mt-1 font-bold">•</span>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Therapy</h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.name} is one of the fundamental Panchakarma treatments in Ayurveda, 
                  designed to restore balance and promote healing at a deep level. This therapy 
                  should be performed under the guidance of qualified Ayurvedic practitioners 
                  who can customize the treatment according to your individual constitution and 
                  current state of health.
                </p>
              </div>
            </>
          )}

          {isTopic && (
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-200">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This is a brief overview. Complete detailed content with comprehensive 
                  Ayurvedic principles, practices, and guidelines is available in our full knowledge base.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t">
          <Button 
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

// ---------------------- MAIN COMPONENT ----------------------

export const InfoHub = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filterItems = (items) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  };

  const filteredTherapies = filterItems(therapyTypes);
  const filteredTopics = filterItems(ayurvedaTopics);

  return (
    <div className="min-h-screen bg-gradient-wellness pb-20 font-ayur">
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="text-2xl font-semibold mb-2">Knowledge Hub</h1>
        <p className="text-primary-foreground/80 font-ayur-body">
          Explore the wisdom of Ayurveda at your own pace
        </p>
        
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
          <Input 
            placeholder="Search for treatments, tips, or wisdom..."
            className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {filteredTherapies.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Panchakarma Therapies
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredTherapies.map((therapy) => (
                <Card key={therapy.id} className="shadow-card border-primary/10 hover:shadow-gentle transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{therapy.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-foreground">{therapy.name}</CardTitle>
                        <p className="text-sm text-muted-foreground font-ayur-body">
                          {therapy.description}
                        </p>
                      </div>
                      <Badge className="bg-healing/10 text-healing font-ayur-body">
                        {therapy.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1">
                        <Heart className="w-4 h-4 text-healing" />
                        Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {therapy.benefits.map((benefit, index) => (
                          <Badge key={index} className="bg-healing/5 text-healing font-ayur-body text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1">
                        <Sun className="w-4 h-4 text-accent" />
                        Care Guidelines
                      </h4>
                      <ul className="space-y-1">
                        {therapy.precautions.map((precaution, index) => (
                          <li key={index} className="text-sm text-muted-foreground font-ayur-body flex items-center gap-2">
                            <div className="w-1 h-1 bg-accent rounded-full"></div>
                            {precaution}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full text-primary hover:text-primary-light hover:bg-primary/5" 
                      onClick={() => setSelectedItem(therapy)}
                    >
                      Learn More About {therapy.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredTopics.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Ayurveda Wisdom
            </h2>
            
            <div className="grid grid-cols-1 gap-3">
              {filteredTopics.map((topic, index) => (
                <Card key={index} className="shadow-card border-primary/10 hover:shadow-gentle transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{topic.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{topic.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-primary/5 text-primary font-ayur-body text-xs">
                            {topic.category}
                          </Badge>
                          {topic.readTime && (
                            <span className="text-xs text-muted-foreground">{topic.readTime}</span>
                          )}
                        </div>
                      </div>
                      <Button 
                        className="text-primary hover:text-primary-light"
                        onClick={() => setSelectedItem(topic)}
                      >
                        Read →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredTherapies.length === 0 && filteredTopics.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            <Button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-primary hover:bg-primary/5"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {selectedItem && <PopupModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};