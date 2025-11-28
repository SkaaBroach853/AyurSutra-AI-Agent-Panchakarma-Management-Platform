import { ShoppingBag, Star, Filter, Search, X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data
const products = [
  {
    id: 1,
    name: "Ashwagandha Root Powder",
    price: 1999,
    image: "/ashwagandha.png",
    category: "supplements",
    rating: 4.8,
    verified: true,
    description: "Organic Ashwagandha root powder for stress relief and immunity support."
  },
  {
    id: 2,
    name: "Triphala Tablets",
    price: 1599,
    image: "/triphala.png",
    category: "supplements",
    rating: 4.5,
    verified: true,
    description: "Traditional Ayurvedic formula for digestive health."
  },
  {
    id: 3,
    name: "Ayurvedic Massage Oil",
    price: 2499,
    image: "/massage-oil.png",
    category: "bodycare",
    rating: 4.7,
    verified: true,
    description: "Herbal massage oil blend for relaxation and rejuvenation."
  },
  {
    id: 4,
    name: "Neem Face Wash",
    price: 1299,
    image: "/neem-face-wash.png",
    category: "skincare",
    rating: 4.6,
    verified: true,
    description: "Purifying face wash with neem extract for clear skin."
  },
  {
    id: 5,
    name: "Tulsi Tea",
    price: 999,
    image: "/tulsi-tea.png",
    category: "teas",
    rating: 4.9,
    verified: true,
    description: "Organic holy basil tea for stress relief and immunity."
  },
  {
    id: 6,
    name: "Chyawanprash",
    price: 2199,
    image: "/chyawanprash.png",
    category: "supplements",
    rating: 4.7,
    verified: true,
    description: "Traditional Ayurvedic jam for immunity and vitality."
  }
];

const EShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    priceRange: "all",
    rating: "all",
    verified: false
  });
  const [showAddedToast, setShowAddedToast] = useState(false);

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const applyFilters = (productsList: any[]) => {
    let filtered = productsList;

    // Price filter
    if (filters.priceRange === "under1000") {
      filtered = filtered.filter(p => p.price < 1000);
    } else if (filters.priceRange === "1000-2000") {
      filtered = filtered.filter(p => p.price >= 1000 && p.price < 2000);
    } else if (filters.priceRange === "above2000") {
      filtered = filtered.filter(p => p.price >= 2000);
    }

    // Rating filter
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Verified filter
    if (filters.verified) {
      filtered = filtered.filter(p => p.verified);
    }

    return filtered;
  };

  const filteredProducts = applyFilters(
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <div className="container px-4 py-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Extended Care E-Shop</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowCart(true)}
          className="relative"
        >
          <ShoppingBag className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Authentic Ayurvedic products verified and recommended by our practitioners
      </p>
      
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="supplements">Supplements</TabsTrigger>
          <TabsTrigger value="bodycare">Body Care</TabsTrigger>
          <TabsTrigger value="skincare">Skin Care</TabsTrigger>
          <TabsTrigger value="teas">Teas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No products found
              </div>
            )}
          </div>
        </TabsContent>
        
        {["supplements", "bodycare", "skincare", "teas"].map(category => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts
                .filter(product => product.category === category)
                .map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))
              }
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Added to Cart Toast */}
      {showAddedToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[110] bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✓ Added to cart!
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[100]">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button 
                    onClick={() => setShowCart(false)}
                    variant="outline"
                    className="mt-4"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 pb-4 border-b">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-sm text-primary font-semibold">₹{item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">₹{getTotalPrice()}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
                    onClick={() => {
                      setShowCart(false);
                      setShowAddedToast(true);
                      setTimeout(() => setShowAddedToast(false), 2000);
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[100]">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "under1000", label: "Under ₹1,000" },
                    { value: "1000-2000", label: "₹1,000 - ₹2,000" },
                    { value: "above2000", label: "Above ₹2,000" }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.value}
                        checked={filters.priceRange === option.value}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Ratings" },
                    { value: "4.5", label: "4.5 ★ & above" },
                    { value: "4.7", label: "4.7 ★ & above" },
                    { value: "4.8", label: "4.8 ★ & above" }
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={option.value}
                        checked={filters.rating === option.value}
                        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Filter */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm font-medium">Show only verified products</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button 
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-primary hover:bg-primary-light text-primary-foreground"
                >
                  Apply Filters
                </Button>
                <Button 
                  onClick={() => {
                    setFilters({
                      priceRange: "all",
                      rating: "all",
                      verified: false
                    });
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: any; onAddToCart: (product: any) => void }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-32 bg-muted">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.verified && (
            <Badge className="absolute top-2 right-2 bg-green-600">
              Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs ml-1">{product.rating}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <span className="font-medium">₹{product.price}</span>
        <Button size="sm" onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default EShopPage;