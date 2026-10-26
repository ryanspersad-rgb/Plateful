import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Package, ArrowRight, ArrowLeft, Search, Home as HomeIcon, Tag, ShoppingCart, User, ChevronDown, Check, X, Share2, ChefHat, Flame, Star, ExternalLink, Copy, MapPin, Sparkles, TrendingUp, Utensils, CalendarDays, Plus, Trash2, ListChecks } from 'lucide-react';
import { RECIPES, CATEGORIES } from '@/lib/constants';
import { CALGARY_DEALS } from '@/lib/flyerService';
import type { Recipe, Screen, MealPlanDay } from '@/lib/types';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663052907846/EC4NaNf76xTdSycyU7L9ru/plateful-logo_c6c931a1.png';
const HERO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663052907846/EC4NaNf76xTdSycyU7L9ru/plateful-hero-warm-TRKBXPuk7q3ZeWURYZEnvw.webp';
const DEALS_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663052907846/EC4NaNf76xTdSycyU7L9ru/plateful-deals-fresh-BsL4S6pJ8Sm2Fci2kpqwD9.webp';
const ONBOARDING_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663052907846/EC4NaNf76xTdSycyU7L9ru/plateful-onboarding-kitchen-XDVT9pSAXbujq2UwBypXew.webp';
const PANTRY_BG_URL = 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=800&auto=format&fit=crop';
const PLAN_BG_URL = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop';
const PROFILE_BG_URL = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop';

const CUISINE_OPTIONS = [
  'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'Korean', 'French',
  'Mediterranean', 'Vietnamese', 'Caribbean', 'Brazilian', 'Ethiopian', 'Moroccan',
  'Greek', 'Turkish', 'Lebanese', 'Peruvian', 'Filipino', 'Canadian', 'Spanish'
];

// Dynamic header images per cuisine / category
const HEADER_IMAGES: Record<string, string> = {
  all: HERO_URL,
  vegetarian: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
  quick: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
  meat: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop',
  healthy: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
  comfort: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&auto=format&fit=crop',
  seafood: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&auto=format&fit=crop',
  italian: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&auto=format&fit=crop',
  mexican: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop',
  chinese: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop',
  japanese: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&auto=format&fit=crop',
  indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop',
  thai: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&auto=format&fit=crop',
  korean: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop',
  french: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
  mediterranean: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
  vietnamese: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop',
  caribbean: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop',
  brazilian: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop',
  ethiopian: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&auto=format&fit=crop',
  moroccan: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop',
  greek: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
  turkish: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop',
  lebanese: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop',
  peruvian: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&auto=format&fit=crop',
  filipino: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop',
  canadian: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&auto=format&fit=crop',
  spanish: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&auto=format&fit=crop',
};

const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Halal', 'Kosher', 'Nut-Free'];

const RETAILERS = [
  { id: 'pcexpress', name: 'PC Express', subtitle: 'Loblaws / Superstore', color: '#E31837', url: 'https://www.pcexpress.ca' },
  { id: 'voila', name: 'Voilà', subtitle: 'Sobeys / Safeway', color: '#00A651', url: 'https://voila.ca' },
  { id: 'walmart', name: 'Walmart', subtitle: 'Walmart Canada', color: '#0071DC', url: 'https://www.walmart.ca/grocery' },
  { id: 'instacart', name: 'Instacart', subtitle: 'Multiple Stores', color: '#43B02A', url: 'https://www.instacart.ca' },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [householdSize, setHouseholdSize] = useState(2);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [pantryItems, setPantryItems] = useState<string[]>(['Onion', 'Garlic', 'Olive Oil', 'Rice', 'Soy Sauce', 'Chili Powder', 'Parmesan']);
  const [pantryInput, setPantryInput] = useState('');
  const [userName, setUserName] = useState('');
  const [showRetailerModal, setShowRetailerModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [cartSending, setCartSending] = useState(false);
  const [cartSuccess, setCartSuccess] = useState<string | null>(null);
  const [showDailyDeal, setShowDailyDeal] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [importPlatform, setImportPlatform] = useState<string | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importedRecipe, setImportedRecipe] = useState<Recipe | null>(null);
  const [recentImports, setRecentImports] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>([
    { day: 'Monday', recipes: [] },
    { day: 'Tuesday', recipes: [] },
    { day: 'Wednesday', recipes: [] },
    { day: 'Thursday', recipes: [] },
    { day: 'Friday', recipes: [] },
    { day: 'Saturday', recipes: [] },
    { day: 'Sunday', recipes: [] },
  ]);
  const [mealPlanDayPicker, setMealPlanDayPicker] = useState<string | null>(null);
  const [mealPlanView, setMealPlanView] = useState<'plan' | 'groceries'>('plan');

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('plateful_onboarded');
      if (saved) {
        const data = JSON.parse(saved);
        setUserName(data.name || 'Friend');
        setHouseholdSize(data.householdSize || 2);
        setSelectedDiets(data.diets || []);
        setSelectedCuisines(data.cuisines || []);
        setPantryItems(data.pantry || []);
        setFavorites(data.favorites || []);
        setScreen('home');
        // Show daily deal on first load of the day
        const lastDeal = localStorage.getItem('plateful_daily_deal');
        const today = new Date().toDateString();
        if (lastDeal !== today) {
          setShowDailyDeal(true);
          localStorage.setItem('plateful_daily_deal', today);
        }
      } else {
        setScreen('onboarding');
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    const saved = localStorage.getItem('plateful_onboarded');
    if (saved) {
      const data = JSON.parse(saved);
      data.favorites = favorites;
      localStorage.setItem('plateful_onboarded', JSON.stringify(data));
    }
  }, [favorites]);

  // Save meal plan to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('plateful_mealplan');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMealPlan(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (mealPlan.some(d => d.recipes.length > 0)) {
      localStorage.setItem('plateful_mealplan', JSON.stringify(mealPlan));
    }
  }, [mealPlan]);

  const addToMealPlan = (day: string, recipe: Recipe) => {
    setMealPlan(prev => prev.map(d =>
      d.day === day ? { ...d, recipes: [...d.recipes, recipe] } : d
    ));
    setMealPlanDayPicker(null);
  };

  const removeFromMealPlan = (day: string, recipeId: string) => {
    setMealPlan(prev => prev.map(d =>
      d.day === day ? { ...d, recipes: d.recipes.filter(r => r.id !== recipeId) } : d
    ));
  };

  const clearMealPlan = () => {
    setMealPlan(prev => prev.map(d => ({ ...d, recipes: [] })));
    localStorage.removeItem('plateful_mealplan');
  };

  const getMealPlanGroceries = () => {
    const allIngredients: Record<string, { name: string; amount: string; inPantry: boolean; onSale?: boolean; salePrice?: string; retailer?: string; count: number }> = {};
    mealPlan.forEach(day => {
      day.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
          const key = ing.name.toLowerCase();
          if (allIngredients[key]) {
            allIngredients[key].count += 1;
          } else {
            allIngredients[key] = { ...ing, count: 1 };
          }
        });
      });
    });
    return Object.values(allIngredients);
  };

  const getMealPlanStats = () => {
    const totalRecipes = mealPlan.reduce((sum, d) => sum + d.recipes.length, 0);
    const groceries = getMealPlanGroceries();
    const inPantry = groceries.filter(g => g.inPantry).length;
    const onSale = groceries.filter(g => g.onSale).length;
    const totalSavings = mealPlan.reduce((sum, d) => {
      return sum + d.recipes.reduce((s, r) => s + parseFloat((r.savings || '$0').replace('$', '')), 0);
    }, 0);
    const totalCost = mealPlan.reduce((sum, d) => {
      return sum + d.recipes.reduce((s, r) => s + parseFloat((r.totalCost || '$0').replace('$', '')), 0);
    }, 0);
    return { totalRecipes, groceries, inPantry, onSale, totalSavings, totalCost };
  };

  const completeOnboarding = () => {
    localStorage.setItem('plateful_onboarded', JSON.stringify({
      name: userName || 'Friend',
      householdSize,
      diets: selectedDiets,
      cuisines: selectedCuisines,
      pantry: pantryItems,
      favorites: []
    }));
    setScreen('home');
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setScreen('detail');
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const toggleDiet = (diet: string) => {
    setSelectedDiets(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]);
  };

  const addPantryItem = () => {
    if (pantryInput.trim() && !pantryItems.includes(pantryInput.trim())) {
      setPantryItems(prev => [...prev, pantryInput.trim()]);
      setPantryInput('');
    }
  };

  const removePantryItem = (item: string) => {
    setPantryItems(prev => prev.filter(p => p !== item));
  };

  // Dynamically score each recipe against the live pantry
  const scoredRecipes = RECIPES.map(r => {
    const pantryLower = pantryItems.map(p => p.toLowerCase());
    const hasCount = r.ingredients.filter(ing =>
      pantryLower.some(p => p.includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes(p))
    ).length;
    const total = r.ingredients.length;
    const liveScore = hasCount === total ? 3 : hasCount >= Math.ceil(total * 0.6) ? 2 : 1;
    const liveText = hasCount === total
      ? 'YOU HAVE EVERYTHING!'
      : `MISSING ${total - hasCount} ITEM${total - hasCount !== 1 ? 'S' : ''}`;
    return { ...r, matchScore: liveScore, matchText: liveText };
  });

  const filteredRecipes = scoredRecipes
    .filter(r => {
      // Match by category id against tags OR cuisine prefix in recipe id
      const matchesCategory = activeCategory === 'all'
        || r.tags.some(t => t.toLowerCase() === activeCategory)
        || r.id.startsWith(activeCategory + '-');
      // Search across name, tags, and ingredient names
      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery
        || r.name.toLowerCase().includes(q)
        || r.tags.some(t => t.toLowerCase().includes(q))
        || r.ingredients.some(ing => ing.name.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleAddToCart = (retailer: typeof RETAILERS[0]) => {
    setCartSending(true);
    setShowRetailerModal(false);
    setTimeout(() => {
      setCartSending(false);
      setCartSuccess(retailer.name);
      setTimeout(() => setCartSuccess(null), 4000);
    }, 2000);
  };

  const handleShare = (platform: string) => {
    if (!selectedRecipe) return;
    const text = `Check out this delicious ${selectedRecipe.name} recipe I found on Plateful! 🍽️`;
    const url = window.location.href;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      email: `mailto:?subject=${encodeURIComponent(`Recipe: ${selectedRecipe.name}`)}&body=${encodedText}%20${encodedUrl}`,
      copy: ''
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${text} ${url}`);
      setShowShareMenu(false);
      return;
    }

    window.open(links[platform], '_blank');
    setShowShareMenu(false);
  };

  // ─── SPLASH ───
  const renderSplash = () => (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F2EBE0 50%, #D8DFD0 100%)' }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="w-44 h-44 rounded-full overflow-hidden shadow-2xl border-4 border-white/60">
          <img src={LOGO_URL} alt="Plateful" className="w-full h-full object-cover" />
        </div>
        <motion.div
          className="absolute -inset-4 rounded-full border-2 border-sage/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>
      <motion.h1
        className="mt-8 font-serif text-3xl text-ink font-bold tracking-tight"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Plateful
      </motion.h1>
      <motion.p
        className="mt-2 text-sm text-muted-text tracking-[0.25em] uppercase font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        From Cart to Cuisine
      </motion.p>
      <motion.p
        className="mt-6 text-xs text-sage italic font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Be playful with your food.
      </motion.p>
    </motion.div>
  );

  // ─── ONBOARDING ───
  const renderOnboarding = () => {
    const steps = [
      // Step 0: Welcome
      <motion.div key="ob0" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="flex flex-col items-center text-center px-8">
        <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl border-4 border-white/60 mb-6">
          <img src={LOGO_URL} alt="Plateful" className="w-full h-full object-cover" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-ink mb-3">Welcome to Plateful</h2>
        <p className="text-muted-text text-sm leading-relaxed mb-2">Discover recipes that match your pantry, your taste, and the best local deals.</p>
        <p className="text-sage text-xs italic font-serif mb-8">Where every meal tells a story.</p>
        <input
          type="text"
          placeholder="What's your name?"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="w-full px-5 py-3.5 bg-white rounded-2xl border border-linen text-ink font-medium text-center focus:outline-none focus:ring-2 focus:ring-mustard/50 shadow-soft"
        />
      </motion.div>,

      // Step 1: Household Size
      <motion.div key="ob1" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="px-8">
        <h2 className="font-serif text-2xl font-bold text-ink mb-2">Household Size</h2>
        <p className="text-muted-text text-sm mb-8">How many people are you cooking for?</p>
        <div className="flex items-center justify-center gap-6 mb-8">
          <button onClick={() => setHouseholdSize(Math.max(1, householdSize - 1))} className="w-14 h-14 rounded-full bg-linen text-ink font-bold text-xl flex items-center justify-center shadow-soft active:scale-95 transition-transform">-</button>
          <div className="text-center">
            <span className="font-serif text-6xl font-bold text-ink">{householdSize}</span>
            <p className="text-xs text-muted-text mt-1">{householdSize === 1 ? 'person' : 'people'}</p>
          </div>
          <button onClick={() => setHouseholdSize(Math.min(10, householdSize + 1))} className="w-14 h-14 rounded-full bg-mustard text-white font-bold text-xl flex items-center justify-center shadow-soft active:scale-95 transition-transform">+</button>
        </div>
        <p className="text-center text-xs text-sage italic font-serif">We'll adjust serving sizes for you</p>
      </motion.div>,

      // Step 2: Dietary Preferences
      <motion.div key="ob2" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="px-8">
        <h2 className="font-serif text-2xl font-bold text-ink mb-2">Dietary Preferences</h2>
        <p className="text-muted-text text-sm mb-6">Select any that apply (optional)</p>
        <div className="flex flex-wrap gap-3">
          {DIETARY_OPTIONS.map(diet => (
            <button
              key={diet}
              onClick={() => toggleDiet(diet)}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all shadow-soft ${selectedDiets.includes(diet) ? 'bg-sage text-white scale-105' : 'bg-white text-ink border border-linen hover:border-sage/30'}`}
            >
              {diet}
            </button>
          ))}
        </div>
      </motion.div>,

      // Step 3: Cuisines
      <motion.div key="ob3" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="px-8">
        <h2 className="font-serif text-2xl font-bold text-ink mb-2">Favorite Cuisines</h2>
        <p className="text-muted-text text-sm mb-6">Pick at least 3 you love</p>
        <div className="flex flex-wrap gap-2.5 max-h-[50vh] overflow-y-auto no-scrollbar">
          {CUISINE_OPTIONS.map(c => (
            <button
              key={c}
              onClick={() => toggleCuisine(c)}
              className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-soft ${selectedCuisines.includes(c) ? 'bg-brick text-white scale-105' : 'bg-white text-ink border border-linen hover:border-brick/30'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>,

      // Step 4: Pantry
      <motion.div key="ob4" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="px-8">
        <h2 className="font-serif text-2xl font-bold text-ink mb-2">What's in Your Fridge?</h2>
        <p className="text-muted-text text-sm mb-6">Add items you have on hand</p>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add an ingredient..."
            value={pantryInput}
            onChange={e => setPantryInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPantryItem()}
            className="flex-1 px-4 py-3 bg-white rounded-xl border border-linen text-sm focus:outline-none focus:ring-2 focus:ring-mustard/50 shadow-soft"
          />
          <button onClick={addPantryItem} className="px-5 py-3 bg-mustard text-white rounded-xl font-bold text-sm shadow-soft active:scale-95 transition-transform">Add</button>
        </div>
        <div className="flex flex-wrap gap-2 max-h-[40vh] overflow-y-auto no-scrollbar">
          {pantryItems.map(item => (
            <span key={item} className="flex items-center gap-1.5 px-3 py-2 bg-sage-light text-sage-dark rounded-full text-xs font-semibold shadow-soft">
              <Check className="w-3 h-3" />
              {item}
              <button onClick={() => removePantryItem(item)} className="hover:text-brick ml-0.5"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      </motion.div>
    ];

    return (
      <motion.div
        key="onboarding"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex flex-col z-50"
        style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F7F3EC 100%)' }}
      >
        {/* Progress */}
        <div className="pt-14 px-8 pb-4">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= onboardingStep ? 'bg-mustard' : 'bg-linen'}`} />
            ))}
          </div>
          <p className="text-[10px] text-muted-text mt-2 text-right font-medium">{onboardingStep + 1} of 5</p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center overflow-y-auto">
          <AnimatePresence mode="wait">
            {steps[onboardingStep]}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-8 pb-10 flex gap-3">
          {onboardingStep > 0 && (
            <button onClick={() => setOnboardingStep(s => s - 1)} className="px-6 py-3.5 bg-white text-ink rounded-full font-bold text-sm border border-linen shadow-soft">
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (onboardingStep < 4) setOnboardingStep(s => s + 1);
              else completeOnboarding();
            }}
            className="flex-1 py-3.5 bg-mustard text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform"
          >
            {onboardingStep === 4 ? (
              <><Utensils className="w-4 h-4" /> Start Cooking</>
            ) : (
              <>Continue <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    );
  };

  // ─── HOME FEED ───
  const renderHome = () => (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-28"
    >
      {/* Daily Deal Alert */}
      <AnimatePresence>
        {showDailyDeal && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 max-w-lg mx-auto"
          >
            <div className="mx-4 mt-4 p-4 bg-brick rounded-2xl shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-0.5">Daily Deal Alert</p>
                  <p className="text-white text-sm font-bold">Chicken Breasts are 33% off at Safeway Calgary!</p>
                  <p className="text-white/70 text-xs mt-1">3 recipes match this deal</p>
                </div>
                <button onClick={() => setShowDailyDeal(false)} className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with dynamic food background */}
      <div className="relative overflow-hidden rounded-b-[28px] mb-2">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeCategory}
            src={HEADER_IMAGES[activeCategory] || HERO_URL}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="relative z-10 px-6 pt-14 pb-5 flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-text font-medium">{getGreeting()},</p>
            <h1 className="text-2xl font-serif font-bold text-ink">{userName || 'Friend'}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sage" />
                <span className="text-[10px] text-sage font-semibold">Calgary, AB</span>
              </div>
              <AnimatePresence mode="wait">
                {activeCategory !== 'all' && (
                  <motion.span
                    key={activeCategory}
                    initial={{ opacity: 0, x: -8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage/15 text-sage text-[10px] font-bold rounded-full"
                  >
                    <span>{CATEGORIES.find(c => c.id === activeCategory)?.icon}</span>
                    {CATEGORIES.find(c => c.id === activeCategory)?.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <button onClick={() => setScreen('profile')} className="w-13 h-13 rounded-full overflow-hidden shadow-lg border-3 border-white">
            <img src={LOGO_URL} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-5 mt-3">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-soft border border-linen/50">
          <Search className="w-5 h-5 text-muted-text" />
          <input
            type="text"
            placeholder="Search recipes, deals, or ingredients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted-text/60 focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* Deals Banner */}
      <div className="px-6 mb-7">
        <div
          className="relative rounded-3xl overflow-hidden h-40 cursor-pointer group"
          onClick={() => setScreen('deals')}
        >
          <img src={DEALS_URL} alt="Deals" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-dark/90 via-sage-dark/70 to-transparent" />
          <div className="relative z-10 p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-1.5 mb-2">
              <Tag className="w-3 h-3 text-sage-light" />
              <span className="text-[10px] font-bold text-sage-light uppercase tracking-widest">Calgary Flyer Matches</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-3 leading-tight">
              Save $12.40 on your<br />next grocery run
            </h3>
            <button className="self-start px-5 py-2 bg-mustard text-white rounded-full text-xs font-bold flex items-center gap-2 hover:bg-mustard/90 transition-colors shadow-lg">
              View Local Deals <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-5">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-ink text-cream shadow-lg' : 'bg-white text-ink border border-linen shadow-soft'}`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes For You */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-ink">
              {activeCategory === 'all' ? 'Recipes for You' : `${CATEGORIES.find(c => c.id === activeCategory)?.name || 'Filtered'} Recipes`}
            </h3>
            <p className="text-[10px] text-muted-text mt-0.5">
              {activeCategory === 'all' ? 'Based on your pantry & local deals' : `${filteredRecipes.length} recipes found`}
            </p>
          </div>
          <button className="text-xs font-bold text-mustard flex items-center gap-1">See All <ArrowRight className="w-3 h-3" /></button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {filteredRecipes.map(recipe => (
            <motion.div
              key={recipe.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRecipeClick(recipe)}
              className="min-w-[280px] bg-white rounded-[28px] overflow-hidden shadow-soft group cursor-pointer border border-linen/50"
            >
              <div className="h-48 relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <button
                    onClick={(e) => toggleFavorite(e, recipe.id)}
                    className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${favorites.includes(recipe.id) ? 'bg-brick text-white' : 'bg-black/20 text-white hover:bg-black/40'}`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(recipe.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                {recipe.savings && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-sage text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                    Save {recipe.savings}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-serif font-bold text-base text-ink mb-2 leading-tight">{recipe.name}</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i <= recipe.matchScore ? 'bg-sage' : 'bg-linen'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-sage uppercase tracking-wider">{recipe.matchText}</span>
                </div>
                <div className="flex justify-between items-center text-muted-text">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.prepTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Flame className="w-3.5 h-3.5" />
                    {recipe.calories} kcal
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brick" />
              Trending in Calgary
            </h3>
          </div>
          <button className="text-xs font-bold text-mustard flex items-center gap-1">See All <ArrowRight className="w-3 h-3" /></button>
        </div>
        <div className="space-y-3">
          {scoredRecipes.sort((a,b) => b.matchScore - a.matchScore).slice(0, 4).map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRecipeClick(recipe)}
              className="flex items-center gap-4 bg-white rounded-2xl p-3 shadow-soft border border-linen/50 cursor-pointer"
            >
              <div className="relative">
                <img src={recipe.image} alt={recipe.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <span className="absolute -top-1.5 -left-1.5 w-6 h-6 bg-brick text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {idx + 1}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-serif font-bold text-sm text-ink mb-1">{recipe.name}</h4>
                <div className="flex items-center gap-3 text-xs text-muted-text">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recipe.prepTime}</span>
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{recipe.calories} kcal</span>
                </div>
                {recipe.savings && (
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-sage/10 text-sage text-[10px] font-bold rounded-full">Save {recipe.savings}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Family Favorites */}
      <div className="px-6 mb-8">
        <div className="p-6 rounded-3xl border border-linen/50" style={{ background: 'linear-gradient(135deg, #D8DFD0 0%, #F2EBE0 100%)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-brick" />
            <h3 className="font-serif text-lg font-bold text-ink">Family Favorites</h3>
          </div>
          <p className="text-sm text-muted-text mb-4 leading-relaxed">
            The best meals are the ones shared with people you love. Here are recipes perfect for your household of {householdSize}.
          </p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-2 px-2">
            {scoredRecipes.filter(r => r.servings >= householdSize).slice(0, 3).map(recipe => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                className="min-w-[140px] cursor-pointer"
              >
                <img src={recipe.image} alt={recipe.name} className="w-full h-24 rounded-2xl object-cover shadow-soft mb-2" referrerPolicy="no-referrer" />
                <p className="text-xs font-bold text-ink leading-tight">{recipe.name}</p>
                <p className="text-[10px] text-muted-text mt-0.5">{recipe.servings} servings</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ─── RECIPE DETAIL ───
  const renderDetail = () => {
    if (!selectedRecipe) return null;
    const r = selectedRecipe;
    return (
      <motion.div
        key="detail"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="pb-28"
      >
        {/* Hero Image */}
        <div className="relative h-72">
          <img src={r.image} alt={r.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute top-12 left-6 right-6 flex justify-between">
            <button onClick={() => setScreen('home')} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={(e) => toggleFavorite(e, r.id)}
                className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center ${favorites.includes(r.id) ? 'bg-brick text-white' : 'bg-black/30 text-white'}`}
              >
                <Heart className={`w-5 h-5 ${favorites.includes(r.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setShowShareMenu(true)}
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="font-serif text-2xl font-bold text-white mb-2">{r.name}</h2>
            <div className="flex items-center gap-4 text-white/80 text-xs font-medium">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.prepTime}</span>
              <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" />{r.calories} kcal</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{r.servings} servings</span>
              <span className="px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-sm">{r.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="px-6 pt-5 pb-4 flex gap-2 flex-wrap">
          {r.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-linen text-ink text-xs font-semibold rounded-full">{tag}</span>
          ))}
        </div>

        {/* Savings Banner */}
        {r.savings && (
          <div className="mx-6 mb-6 p-4 rounded-2xl border border-sage/20" style={{ background: 'linear-gradient(135deg, rgba(107,127,90,0.08) 0%, rgba(200,166,50,0.08) 100%)' }}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-sage uppercase tracking-wider mb-1">Estimated Savings</p>
                <p className="font-serif text-2xl font-bold text-sage">{r.savings}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-text">Total Cost</p>
                <p className="font-serif text-lg font-bold text-ink">{r.totalCost}</p>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="px-6 mb-6">
          <h3 className="font-serif text-lg font-bold text-ink mb-4">Ingredients</h3>
          <div className="space-y-2.5">
            {r.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-linen/50 shadow-soft">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${ing.inPantry ? 'bg-sage text-white' : 'bg-linen text-muted-text'}`}>
                  {ing.inPantry ? <Check className="w-3.5 h-3.5" /> : '?'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{ing.name}</p>
                  <p className="text-xs text-muted-text">{ing.amount}</p>
                </div>
                {ing.onSale && (
                  <span className="px-2.5 py-0.5 bg-mustard/10 text-mustard text-[10px] font-bold rounded-full">ON SALE</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="px-6 mb-6">
          <h3 className="font-serif text-lg font-bold text-ink mb-4">Instructions</h3>
          <div className="space-y-4">
            {r.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-mustard text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-soft">
                  {idx + 1}
                </div>
                <p className="text-sm text-ink leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 mb-6 space-y-3">
          <button
            onClick={() => setMealPlanDayPicker(r.id)}
            className="w-full py-4 bg-mustard text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-mustard/90 transition-colors active:scale-[0.98]"
          >
            <CalendarDays className="w-5 h-5" />
            Add to Meal Plan
          </button>
          <button
            onClick={() => setShowRetailerModal(true)}
            className="w-full py-4 bg-sage text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-sage-dark transition-colors active:scale-[0.98]"
          >
            <ShoppingCart className="w-5 h-5" />
            Add Ingredients to Cart
          </button>
        </div>

        {/* Day Picker Modal */}
        <AnimatePresence>
          {mealPlanDayPicker === r.id && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center"
              onClick={() => setMealPlanDayPicker(null)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-cream rounded-t-3xl p-6 pb-10"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-10 h-1 bg-linen rounded-full mx-auto mb-6" />
                <h3 className="font-serif text-xl font-bold text-ink mb-2">Add to Meal Plan</h3>
                <p className="text-sm text-muted-text mb-6">Which day would you like to cook {r.name}?</p>
                <div className="grid grid-cols-2 gap-3">
                  {mealPlan.map(day => (
                    <button
                      key={day.day}
                      onClick={() => addToMealPlan(day.day, r)}
                      className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-linen/50 shadow-soft hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-mustard/10 flex items-center justify-center">
                        <CalendarDays className="w-5 h-5 text-mustard" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-ink">{day.day}</p>
                        <p className="text-[10px] text-muted-text">{day.recipes.length} {day.recipes.length === 1 ? 'recipe' : 'recipes'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Retailer Selection Modal */}
        <AnimatePresence>
          {showRetailerModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center"
              onClick={() => setShowRetailerModal(false)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-cream rounded-t-3xl p-6 pb-10"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-10 h-1 bg-linen rounded-full mx-auto mb-6" />
                <h3 className="font-serif text-xl font-bold text-ink mb-2">Choose Your Store</h3>
                <p className="text-sm text-muted-text mb-6">We'll add {r.ingredients.length} ingredients to your cart</p>
                <div className="space-y-3">
                  {RETAILERS.map(retailer => (
                    <button
                      key={retailer.id}
                      onClick={() => handleAddToCart(retailer)}
                      className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-linen/50 shadow-soft hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${retailer.color}15` }}>
                        <ShoppingCart className="w-5 h-5" style={{ color: retailer.color }} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-sm text-ink">{retailer.name}</p>
                        <p className="text-xs text-muted-text">{retailer.subtitle}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-text" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Menu */}
        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center"
              onClick={() => setShowShareMenu(false)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-cream rounded-t-3xl p-6 pb-10"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-10 h-1 bg-linen rounded-full mx-auto mb-6" />
                <h3 className="font-serif text-xl font-bold text-ink mb-6">Share Recipe</h3>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', bg: '#25D366' },
                    { id: 'facebook', label: 'Facebook', icon: '📘', bg: '#1877F2' },
                    { id: 'twitter', label: 'X', icon: '🐦', bg: '#1DA1F2' },
                    { id: 'email', label: 'Email', icon: '📧', bg: '#EA4335' },
                  ].map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => handleShare(platform.id)}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-soft" style={{ backgroundColor: `${platform.bg}15` }}>
                        {platform.icon}
                      </div>
                      <span className="text-[10px] font-bold text-ink">{platform.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-linen text-sm font-bold text-ink shadow-soft"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sending Overlay */}
        <AnimatePresence>
          {cartSending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <div className="bg-cream rounded-3xl p-8 text-center shadow-2xl max-w-xs mx-4">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <ShoppingCart className="w-8 h-8 text-sage" />
                </div>
                <p className="font-serif text-lg font-bold text-ink mb-2">Adding to Cart...</p>
                <p className="text-xs text-muted-text">Matching {r.ingredients.length} ingredients</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Success Toast */}
        <AnimatePresence>
          {cartSuccess && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-24 left-4 right-4 z-50 max-w-lg mx-auto"
            >
              <div className="bg-sage text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Added to {cartSuccess}!</p>
                  <p className="text-white/80 text-xs">{r.ingredients.length} items matched. Est. total: {r.totalCost}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // ─── MEAL PLAN ───
  const renderMealPlan = () => {
    const stats = getMealPlanStats();
    const groceries = getMealPlanGroceries();

    return (
      <motion.div
        key="mealplan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pb-28 relative"
      >
        {/* Subtle food background */}
        <div className="fixed inset-0 max-w-lg mx-auto pointer-events-none z-0">
          <img src={PLAN_BG_URL} alt="" className="w-full h-full object-cover opacity-[0.07]" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 px-6 pt-14 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-serif font-bold text-ink">Weekly Meal Plan</h1>
              <p className="text-sm text-muted-text mt-1">{stats.totalRecipes} {stats.totalRecipes === 1 ? 'recipe' : 'recipes'} planned</p>
            </div>
            {stats.totalRecipes > 0 && (
              <button
                onClick={clearMealPlan}
                className="px-3 py-2 text-xs font-bold text-brick bg-brick/10 rounded-xl"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {stats.totalRecipes > 0 && (
          <div className="relative z-10 px-6 mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(107,127,90,0.1) 0%, rgba(107,127,90,0.05) 100%)' }}>
                <p className="font-serif text-2xl font-bold text-sage">${stats.totalSavings.toFixed(2)}</p>
                <p className="text-[10px] text-muted-text font-bold uppercase tracking-wider mt-1">Total Savings</p>
              </div>
              <div className="p-4 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(200,166,50,0.1) 0%, rgba(200,166,50,0.05) 100%)' }}>
                <p className="font-serif text-2xl font-bold text-mustard">${stats.totalCost.toFixed(2)}</p>
                <p className="text-[10px] text-muted-text font-bold uppercase tracking-wider mt-1">Est. Cost</p>
              </div>
              <div className="p-4 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(163,82,60,0.1) 0%, rgba(163,82,60,0.05) 100%)' }}>
                <p className="font-serif text-2xl font-bold text-brick">{stats.onSale}</p>
                <p className="text-[10px] text-muted-text font-bold uppercase tracking-wider mt-1">On Sale</p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle: Plan / Groceries */}
        <div className="relative z-10 px-6 mb-6">
          <div className="flex bg-linen rounded-2xl p-1">
            <button
              onClick={() => setMealPlanView('plan')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mealPlanView === 'plan' ? 'bg-white text-ink shadow-soft' : 'text-muted-text'}`}
            >
              <CalendarDays className="w-4 h-4" />
              Meal Plan
            </button>
            <button
              onClick={() => setMealPlanView('groceries')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${mealPlanView === 'groceries' ? 'bg-white text-ink shadow-soft' : 'text-muted-text'}`}
            >
              <ListChecks className="w-4 h-4" />
              Grocery List ({groceries.length})
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mealPlanView === 'plan' ? (
            <motion.div key="plan-view" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative z-10 px-6">
              {/* Day-by-Day Plan */}
              <div className="space-y-4">
                {mealPlan.map(day => (
                  <div key={day.day} className="bg-white rounded-2xl shadow-soft border border-linen/50 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-linen/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-mustard/10 flex items-center justify-center">
                          <CalendarDays className="w-5 h-5 text-mustard" />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-ink">{day.day}</h4>
                          <p className="text-[10px] text-muted-text">{day.recipes.length} {day.recipes.length === 1 ? 'recipe' : 'recipes'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Quick add: navigate to home to pick a recipe
                          setScreen('home');
                        }}
                        className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage hover:bg-sage/20 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {day.recipes.length === 0 ? (
                      <div className="px-5 py-6 text-center">
                        <p className="text-xs text-muted-text italic">No recipes planned yet</p>
                        <p className="text-[10px] text-muted-text mt-1">Browse recipes and tap "Add to Meal Plan"</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-linen/50">
                        {day.recipes.map((recipe, idx) => (
                          <div key={`${recipe.id}-${idx}`} className="flex items-center gap-3 px-5 py-3">
                            <img src={recipe.image} alt={recipe.name} className="w-14 h-14 rounded-xl object-cover" referrerPolicy="no-referrer" />
                            <div className="flex-1">
                              <p className="text-sm font-bold text-ink">{recipe.name}</p>
                              <div className="flex items-center gap-3 text-[10px] text-muted-text mt-0.5">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recipe.prepTime}</span>
                                <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{recipe.calories} kcal</span>
                                {recipe.savings && <span className="text-sage font-bold">Save {recipe.savings}</span>}
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromMealPlan(day.day, recipe.id)}
                              className="w-8 h-8 rounded-full bg-brick/10 flex items-center justify-center text-brick hover:bg-brick/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="grocery-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative z-10 px-6">
              {/* Grocery List */}
              {groceries.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-12 h-12 text-linen mx-auto mb-4" />
                  <p className="font-serif text-lg font-bold text-ink mb-2">No Groceries Yet</p>
                  <p className="text-sm text-muted-text">Add recipes to your meal plan to generate a grocery list</p>
                </div>
              ) : (
                <>
                  {/* Summary */}
                  <div className="p-5 rounded-2xl border border-sage/20 mb-6" style={{ background: 'linear-gradient(135deg, rgba(107,127,90,0.08) 0%, rgba(200,166,50,0.08) 100%)' }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-sage uppercase tracking-wider mb-1">Weekly Savings</p>
                        <p className="font-serif text-3xl font-bold text-sage">${stats.totalSavings.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-text">In Pantry</p>
                        <p className="font-serif text-lg font-bold text-ink">{stats.inPantry} of {groceries.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Need to Buy */}
                  <h4 className="font-serif font-bold text-sm text-ink mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-brick" />
                    Need to Buy ({groceries.filter(g => !g.inPantry).length})
                  </h4>
                  <div className="space-y-2 mb-6">
                    {groceries.filter(g => !g.inPantry).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-linen/50 shadow-soft">
                        <div className="w-7 h-7 rounded-full bg-brick/10 flex items-center justify-center">
                          <ShoppingCart className="w-3.5 h-3.5 text-brick" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink">{item.name}{item.count > 1 ? ` (x${item.count})` : ''}</p>
                          <p className="text-xs text-muted-text">{item.amount}</p>
                        </div>
                        {item.onSale && (
                          <span className="px-2.5 py-0.5 bg-mustard/10 text-mustard text-[10px] font-bold rounded-full">ON SALE</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Already Have */}
                  <h4 className="font-serif font-bold text-sm text-ink mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-sage" />
                    Already in Pantry ({groceries.filter(g => g.inPantry).length})
                  </h4>
                  <div className="space-y-2 mb-6">
                    {groceries.filter(g => g.inPantry).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-sage/5 rounded-xl border border-sage/10">
                        <div className="w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-sage" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ink">{item.name}{item.count > 1 ? ` (x${item.count})` : ''}</p>
                          <p className="text-xs text-muted-text">{item.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Send to Cart */}
                  <button
                    onClick={() => setShowRetailerModal(true)}
                    className="w-full py-4 bg-sage text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-sage-dark transition-colors active:scale-[0.98] mb-4"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Send Full List to Store ({groceries.filter(g => !g.inPantry).length} items)
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Retailer Modal for Grocery List */}
        <AnimatePresence>
          {showRetailerModal && mealPlanView === 'groceries' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center"
              onClick={() => setShowRetailerModal(false)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-cream rounded-t-3xl p-6 pb-10"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-10 h-1 bg-linen rounded-full mx-auto mb-6" />
                <h3 className="font-serif text-xl font-bold text-ink mb-2">Send Grocery List</h3>
                <p className="text-sm text-muted-text mb-6">{groceries.filter(g => !g.inPantry).length} items to add to your cart</p>
                <div className="space-y-3">
                  {RETAILERS.map(retailer => (
                    <button
                      key={retailer.id}
                      onClick={() => handleAddToCart(retailer)}
                      className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-linen/50 shadow-soft hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${retailer.color}15` }}>
                        <ShoppingCart className="w-5 h-5" style={{ color: retailer.color }} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-sm text-ink">{retailer.name}</p>
                        <p className="text-xs text-muted-text">{retailer.subtitle}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-text" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // ─── DEALS ───
  const DEAL_IMAGES: Record<string, string> = {
    'Produce': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop',
    'Meat': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&auto=format&fit=crop',
    'Pantry': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop',
    'Dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop',
    'Seafood': 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&auto=format&fit=crop',
  };
  const DEAL_ITEM_IMAGES: Record<string, string> = {
    'Sweet Potatoes': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&auto=format&fit=crop',
    'Black Beans': 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&auto=format&fit=crop',
    'Chicken Breasts': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop',
    'Spaghetti': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&auto=format&fit=crop',
    'Avocados': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop',
    'Ground Beef': 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&auto=format&fit=crop',
    'Cherry Tomatoes': 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=400&auto=format&fit=crop',
    'Fresh Basil': 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&auto=format&fit=crop',
    'Olive Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop',
    'Broccoli': 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&auto=format&fit=crop',
  };
  const getDealSavings = (deal: typeof CALGARY_DEALS[0]) => {
    const p1 = parseFloat(deal.price.replace(/[^0-9.]/g, ''));
    const p2 = parseFloat(deal.originalPrice.replace(/[^0-9.]/g, ''));
    if (!isNaN(p1) && !isNaN(p2) && p2 > p1) return Math.round(((p2 - p1) / p2) * 100);
    return 30;
  };
  const renderDeals = () => (
    <motion.div
      key="deals"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-28 relative"
    >
      {/* Subtle food background */}
      <div className="fixed inset-0 max-w-lg mx-auto pointer-events-none z-0">
        <img src={DEALS_URL} alt="" className="w-full h-full object-cover opacity-[0.06]" referrerPolicy="no-referrer" />
      </div>
      <div className="relative z-10 px-6 pt-14 pb-2">
        <h1 className="text-2xl font-serif font-bold text-ink">Deals of the Week</h1>
        <p className="text-sm text-muted-text mt-1">Calgary's best grocery savings</p>
      </div>

      {/* Hero banner */}
      <div className="relative z-10 px-6 mt-4 mb-6">
        <div className="relative rounded-3xl overflow-hidden h-36">
          <img src={DEALS_URL} alt="Deals" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6">
            <div>
              <p className="text-mustard text-xs font-bold uppercase tracking-widest mb-1">This Week's Savings</p>
              <p className="font-serif text-2xl font-bold text-white">Save up to 56%</p>
              <p className="text-white/70 text-xs mt-1">{CALGARY_DEALS.length} items on sale near you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Bubbles Grid */}
      <div className="relative z-10 px-6">
        <div className="grid grid-cols-2 gap-4">
          {CALGARY_DEALS.map((deal, i) => {
            const savingsPct = getDealSavings(deal);
            const itemImg = DEAL_ITEM_IMAGES[deal.item] || DEAL_IMAGES[deal.category] || DEAL_IMAGES['Produce'];
            return (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-soft border border-linen/40 group"
              >
                {/* Savings badge */}
                <div className="absolute top-3 left-3 z-10 bg-brick text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  {savingsPct}% OFF
                </div>
                {/* Food image */}
                <div className="h-28 overflow-hidden">
                  <img
                    src={itemImg}
                    alt={deal.item}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Content */}
                <div className="p-3.5">
                  <h4 className="font-bold text-sm text-ink leading-tight">{deal.item}</h4>
                  <p className="text-[11px] text-muted-text mt-0.5 truncate">{deal.retailer}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-bold text-lg text-sage">{deal.price}</span>
                    <span className="text-xs text-muted-text line-through">{deal.originalPrice}</span>
                  </div>
                  <p className="text-[10px] text-muted-text mt-1">Expires {deal.expiry}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  // ─── PANTRY ───
  const renderPantry = () => (
    <motion.div
      key="pantry"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-28 relative"
    >
      {/* Subtle food background */}
      <div className="fixed inset-0 max-w-lg mx-auto pointer-events-none z-0">
        <img src={PANTRY_BG_URL} alt="" className="w-full h-full object-cover opacity-[0.07]" referrerPolicy="no-referrer" />
      </div>
      <div className="relative z-10 px-6 pt-14 pb-4">
        <h1 className="text-2xl font-serif font-bold text-ink mb-1">My Pantry</h1>
        <p className="text-sm text-muted-text">{pantryItems.length} items tracked</p>
      </div>

      <div className="relative z-10 px-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add an ingredient..."
            value={pantryInput}
            onChange={e => setPantryInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPantryItem()}
            className="flex-1 px-4 py-3 bg-white rounded-xl border border-linen text-sm focus:outline-none focus:ring-2 focus:ring-mustard/50 shadow-soft"
          />
          <button onClick={addPantryItem} className="px-5 py-3 bg-mustard text-white rounded-xl font-bold text-sm shadow-soft active:scale-95 transition-transform">Add</button>
        </div>
      </div>

      <div className="relative z-10 px-6">
        <div className="flex flex-wrap gap-2.5">
          {pantryItems.map(item => (
            <span key={item} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full text-sm font-semibold text-ink border border-linen shadow-soft">
              <Check className="w-3.5 h-3.5 text-sage" />
              {item}
              <button onClick={() => removePantryItem(item)} className="text-muted-text hover:text-brick"><X className="w-3.5 h-3.5" /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Pantry Tips */}
      <div className="relative z-10 px-6 mt-8">
        <div className="p-5 rounded-2xl border border-sage/20" style={{ background: 'linear-gradient(135deg, rgba(107,127,90,0.06) 0%, rgba(242,235,224,0.5) 100%)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-sage" />
            <h4 className="font-serif font-bold text-sm text-ink">Smart Tip</h4>
          </div>
          <p className="text-xs text-muted-text leading-relaxed">
            You have {pantryItems.length} items in your pantry. Based on what's on sale this week, you could make {filteredRecipes.filter(r => r.matchScore >= 2).length} recipes with minimal shopping!
          </p>
        </div>
      </div>
    </motion.div>
  );

  // ─── PROFILE ───
  const renderProfile = () => (
    <motion.div
      key="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-28 relative"
    >
      {/* Subtle food background */}
      <div className="fixed inset-0 max-w-lg mx-auto pointer-events-none z-0">
        <img src={PROFILE_BG_URL} alt="" className="w-full h-full object-cover opacity-[0.08]" referrerPolicy="no-referrer" />
      </div>
      <div className="relative z-10 px-6 pt-14 pb-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white mb-4">
          <img src={LOGO_URL} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-ink">{userName || 'Friend'}</h1>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-sage" />
          <span className="text-xs text-sage font-medium">Calgary, AB</span>
        </div>
      </div>

      <div className="relative z-10 px-6 space-y-3">
        <div className="p-5 bg-white rounded-2xl shadow-soft border border-linen/50">
          <h3 className="font-serif font-bold text-sm text-ink mb-3">Household</h3>
          <p className="text-sm text-muted-text">{householdSize} {householdSize === 1 ? 'person' : 'people'}</p>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-soft border border-linen/50">
          <h3 className="font-serif font-bold text-sm text-ink mb-3">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {selectedDiets.length > 0 ? selectedDiets.map(d => (
              <span key={d} className="px-3 py-1 bg-sage/10 text-sage text-xs font-semibold rounded-full">{d}</span>
            )) : <p className="text-xs text-muted-text italic">None selected</p>}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-soft border border-linen/50">
          <h3 className="font-serif font-bold text-sm text-ink mb-3">Favorite Cuisines</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCuisines.length > 0 ? selectedCuisines.map(c => (
              <span key={c} className="px-3 py-1 bg-brick/10 text-brick text-xs font-semibold rounded-full">{c}</span>
            )) : <p className="text-xs text-muted-text italic">None selected</p>}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-soft border border-linen/50">
          <h3 className="font-serif font-bold text-sm text-ink mb-3">Saved Recipes</h3>
          <p className="text-sm text-muted-text">{favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('plateful_onboarded');
            localStorage.removeItem('plateful_daily_deal');
            setOnboardingStep(0);
            setFavorites([]);
            setScreen('onboarding');
          }}
          className="w-full py-3.5 bg-linen text-ink rounded-2xl font-bold text-sm shadow-soft active:scale-[0.98] transition-transform"
        >
          Reset Preferences
        </button>
      </div>
    </motion.div>
  );

  // ─── IMPORT SCREEN ───
  const IMPORT_PLATFORMS = [
    { id: 'tiktok', label: 'TikTok', emoji: '🎵', color: '#010101' },
    { id: 'instagram', label: 'Instagram', emoji: '📸', color: '#E1306C' },
    { id: 'youtube', label: 'YouTube', emoji: '▶️', color: '#FF0000' },
    { id: 'pinterest', label: 'Pinterest', emoji: '📌', color: '#E60023' },
    { id: 'website', label: 'Website', emoji: '🌐', color: '#4A90D9' },
    { id: 'photo', label: 'Photo', emoji: '🍽️', color: '#6B7F5A' },
  ];

  // Simulated extracted recipes for demo
  const DEMO_RECIPES: Recipe[] = [
    {
      id: 'import-demo-1',
      name: 'Viral Smash Burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
      prepTime: '15 mins', calories: 620, difficulty: 'Easy', servings: 2,
      tags: ['Trending', 'Quick', 'Comfort'],
      matchScore: 2, matchText: 'MISSING 2 ITEMS',
      ingredients: [
        { name: 'Ground Beef', amount: '400g', inPantry: false, onSale: true },
        { name: 'Burger Buns', amount: '2', inPantry: false, onSale: false },
        { name: 'American Cheese', amount: '4 slices', inPantry: false, onSale: false },
        { name: 'Onion', amount: '1', inPantry: true, onSale: false },
        { name: 'Butter', amount: '1 tbsp', inPantry: true, onSale: false },
        { name: 'Salt', amount: '1 tsp', inPantry: true, onSale: false },
      ],
      instructions: [
        'Divide beef into 115g balls. Do not season yet.',
        'Heat a cast-iron skillet over the highest heat possible for 3 minutes.',
        'Place beef ball on skillet. Immediately smash flat with a spatula — press hard.',
        'Season with salt and pepper. Cook 2 minutes until edges are deeply browned.',
        'Add cheese. Flip once and cook 30 seconds more.',
        'Toast buns in butter. Stack with caramelised onions and your sauce of choice.',
      ],
      savings: '$3.20', totalCost: '$8.40',
    },
    {
      id: 'import-demo-2',
      name: 'TikTok Pasta Chips',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop',
      prepTime: '20 mins', calories: 380, difficulty: 'Easy', servings: 4,
      tags: ['Trending', 'Vegetarian', 'Quick', 'Snack'],
      matchScore: 3, matchText: 'YOU HAVE EVERYTHING!',
      ingredients: [
        { name: 'Bowtie Pasta', amount: '300g', inPantry: false, onSale: false },
        { name: 'Olive Oil', amount: '3 tbsp', inPantry: true, onSale: true },
        { name: 'Parmesan', amount: '60g', inPantry: true, onSale: false },
        { name: 'Garlic', amount: '2 cloves', inPantry: true, onSale: false },
        { name: 'Chili Powder', amount: '1 tsp', inPantry: true, onSale: false },
        { name: 'Salt', amount: '1 tsp', inPantry: true, onSale: false },
      ],
      instructions: [
        'Cook pasta al dente. Drain and dry completely on a baking sheet.',
        'Toss with olive oil, parmesan, garlic powder, chili flakes, and salt.',
        'Spread in a single layer on a baking sheet.',
        'Air fry at 200°C for 10–12 minutes, shaking halfway, until golden and crispy.',
        'Or bake at 220°C for 15–18 minutes.',
        'Serve immediately — they crisp up as they cool.',
      ],
      savings: '$1.80', totalCost: '$4.20',
    },
    {
      id: 'import-demo-3',
      name: 'Gochujang Butter Noodles',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop',
      prepTime: '10 mins', calories: 440, difficulty: 'Easy', servings: 2,
      tags: ['Trending', 'Quick', 'Korean'],
      matchScore: 2, matchText: 'MISSING 1 ITEM',
      ingredients: [
        { name: 'Ramen or Udon Noodles', amount: '200g', inPantry: false, onSale: false },
        { name: 'Butter', amount: '2 tbsp', inPantry: true, onSale: false },
        { name: 'Gochujang Paste', amount: '2 tbsp', inPantry: false, onSale: false },
        { name: 'Soy Sauce', amount: '1 tbsp', inPantry: true, onSale: false },
        { name: 'Garlic', amount: '3 cloves', inPantry: true, onSale: false },
        { name: 'Eggs', amount: '2', inPantry: true, onSale: false },
      ],
      instructions: [
        'Cook noodles according to package. Reserve ¼ cup noodle water.',
        'Melt butter in the same pan over medium heat.',
        'Add garlic and cook 1 minute until fragrant.',
        'Add gochujang and soy sauce. Stir into the butter.',
        'Add noodles and toss, adding noodle water to loosen.',
        'Top with a soft-boiled or fried egg and sesame seeds.',
      ],
      savings: '$0.00', totalCost: '$5.60',
    },
  ];

  const handleImport = () => {
    if (!importUrl.trim() && !importPlatform) return;
    setImportLoading(true);
    setImportedRecipe(null);
    setTimeout(() => {
      const recipe = DEMO_RECIPES[Math.floor(Math.random() * DEMO_RECIPES.length)];
      setImportedRecipe(recipe);
      setRecentImports(prev => [recipe, ...prev.filter(r => r.id !== recipe.id)].slice(0, 5));
      setImportLoading(false);
    }, 1800);
  };

  const renderImport = () => (
    <motion.div
      key="import"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-28"
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-mustard" />
          <p className="text-xs font-bold text-mustard uppercase tracking-widest">ReciMe Import</p>
        </div>
        <h1 className="font-serif text-3xl font-bold text-ink mb-2">Import Any Recipe</h1>
        <p className="text-sm text-muted-text leading-relaxed">
          Paste a link from TikTok, Instagram, YouTube or any website — Plateful extracts the ingredients and builds your grocery list instantly.
        </p>
      </div>

      {/* URL Input */}
      <div className="px-6 mb-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={importUrl}
            onChange={e => setImportUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleImport()}
            placeholder="Paste a recipe URL or describe a dish..."
            className="flex-1 px-4 py-3.5 rounded-2xl border border-linen bg-white text-sm text-ink placeholder:text-muted-text focus:outline-none focus:border-mustard transition-colors shadow-soft"
          />
          <button
            onClick={handleImport}
            disabled={importLoading}
            className="px-5 py-3.5 bg-mustard text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all disabled:opacity-60 flex items-center gap-2"
          >
            {importLoading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Platform pills */}
      <div className="px-6 mb-6">
        <p className="text-xs font-bold text-muted-text uppercase tracking-wider mb-3">Or import from</p>
        <div className="flex gap-2 flex-wrap">
          {IMPORT_PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setImportPlatform(importPlatform === p.id ? null : p.id);
                setTimeout(() => handleImport(), 100);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border-2 transition-all active:scale-95 ${
                importPlatform === p.id
                  ? 'border-mustard bg-mustard/10 text-ink'
                  : 'border-linen bg-white text-ink'
              }`}
            >
              <span>{p.emoji}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {importLoading && (
        <div className="mx-6 mb-6 p-6 bg-white rounded-3xl border border-linen shadow-soft flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-linen border-t-mustard rounded-full animate-spin" />
          <div className="text-center">
            <p className="font-serif font-bold text-ink mb-1">Extracting recipe...</p>
            <p className="text-xs text-muted-text">Analysing ingredients & building your grocery list</p>
          </div>
        </div>
      )}

      {/* Recently imported */}
      {recentImports.length > 0 && !importLoading && !importedRecipe && (
        <div className="px-6 mb-6">
          <p className="text-xs font-bold text-muted-text uppercase tracking-wider mb-3">Recently Imported</p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6">
            {recentImports.map(r => (
              <div
                key={r.id}
                onClick={() => setImportedRecipe(r)}
                className="min-w-[140px] cursor-pointer flex-shrink-0"
              >
                <div className="relative mb-2">
                  <img src={r.image} alt={r.name} className="w-full h-24 rounded-2xl object-cover shadow-soft" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink/40 to-transparent" />
                </div>
                <p className="text-xs font-bold text-ink leading-tight line-clamp-2">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extracted recipe card */}
      {importedRecipe && !importLoading && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6"
        >
          {/* Deal alert banner */}
          {importedRecipe.ingredients.some(i => i.onSale) && (
            <div
              onClick={() => setScreen('deals')}
              className="flex items-center gap-3 p-3 mb-4 rounded-2xl cursor-pointer active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #6B7F5A 0%, #4A5C3A 100%)' }}
            >
              <span className="text-xl">🏷️</span>
              <div className="flex-1">
                <p className="text-white text-xs font-bold">Sale items in this recipe!</p>
                <p className="text-white/70 text-[10px]">Tap to see this week's deals →</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-linen shadow-soft overflow-hidden mb-6">
            {/* Hero image */}
            <div className="relative h-52">
              <img src={importedRecipe.image} alt={importedRecipe.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-mustard text-white text-[10px] font-bold rounded-full uppercase tracking-wide">Imported Recipe</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">{importedRecipe.name}</h3>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex divide-x divide-linen border-b border-linen">
              {[
                { icon: <Clock className="w-3.5 h-3.5" />, val: importedRecipe.prepTime },
                { icon: <Flame className="w-3.5 h-3.5" />, val: `${importedRecipe.calories} kcal` },
                { icon: <Utensils className="w-3.5 h-3.5" />, val: importedRecipe.difficulty },
              ].map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 py-3 text-muted-text">
                  {s.icon}
                  <span className="text-[10px] font-bold text-ink">{s.val}</span>
                </div>
              ))}
            </div>

            {/* Match score */}
            <div className="px-4 py-3 border-b border-linen flex items-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= importedRecipe.matchScore ? 'bg-sage' : 'bg-linen'}`} />
                ))}
              </div>
              <span className="text-[10px] font-bold text-sage uppercase tracking-wider">{importedRecipe.matchText}</span>
              {importedRecipe.savings && importedRecipe.savings !== '$0.00' && (
                <span className="ml-auto text-xs font-bold text-mustard">Save {importedRecipe.savings}</span>
              )}
            </div>

            {/* Ingredients with emoji */}
            <div className="px-4 py-4 border-b border-linen">
              <p className="text-xs font-bold text-muted-text uppercase tracking-wider mb-3">Ingredients</p>
              <div className="space-y-2">
                {importedRecipe.ingredients.map((ing, idx) => {
                  const emojiMap: Record<string, string> = {
                    beef: '🥩', chicken: '🍗', butter: '🧈', egg: '🥚', garlic: '🧄',
                    onion: '🧅', pasta: '🍝', noodle: '🍜', cheese: '🧀', olive: '🫙',
                    tomato: '🍅', rice: '🍚', salt: '🧂', soy: '🥢', chili: '🌶️',
                    bun: '🍞', bread: '🍞', parmesan: '🧀', gochujang: '🌶️',
                  };
                  const emoji = Object.entries(emojiMap).find(([k]) =>
                    ing.name.toLowerCase().includes(k)
                  )?.[1] ?? '🥄';

                  return (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-cream/60">
                      <span className="text-lg w-7 text-center">{emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">{ing.name}</p>
                        <p className="text-xs text-muted-text">{ing.amount}</p>
                      </div>
                      {ing.inPantry && (
                        <span className="text-[10px] font-bold text-sage bg-sage/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Pantry
                        </span>
                      )}
                      {ing.onSale && !ing.inPantry && (
                        <span className="text-[10px] font-bold text-mustard bg-mustard/10 px-2 py-0.5 rounded-full">ON SALE</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-2.5">
              <button
                onClick={() => { setSelectedRecipe(importedRecipe); setScreen('detail'); }}
                className="w-full py-3.5 bg-mustard text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
              >
                <ChefHat className="w-4 h-4" /> View Full Recipe
              </button>
              <button
                onClick={() => setMealPlanDayPicker(importedRecipe.id)}
                className="w-full py-3.5 bg-cream text-ink rounded-2xl font-bold text-sm border border-linen flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <CalendarDays className="w-4 h-4" /> Add to Meal Plan
              </button>
            </div>
          </div>

          {/* Try another */}
          <button
            onClick={() => { setImportedRecipe(null); setImportUrl(''); setImportPlatform(null); }}
            className="w-full py-3 text-muted-text text-sm font-bold flex items-center justify-center gap-2 mb-4"
          >
            <Plus className="w-4 h-4 rotate-45" /> Import another recipe
          </button>
        </motion.div>
      )}

      {/* Empty state */}
      {!importedRecipe && !importLoading && recentImports.length === 0 && (
        <div className="mx-6 p-8 bg-white rounded-3xl border border-linen text-center">
          <div className="text-5xl mb-4">📲</div>
          <h3 className="font-serif font-bold text-ink mb-2">Paste any recipe link</h3>
          <p className="text-sm text-muted-text leading-relaxed">
            From TikTok to grandma's blog — Plateful extracts the recipe, maps ingredients to local deals, and builds your grocery list in seconds.
          </p>
        </div>
      )}
    </motion.div>
  );

  // ─── BOTTOM NAV ───
  const renderNav = () => {
    if (screen === 'splash' || screen === 'onboarding') return null;
    const tabs: { id: Screen; icon: React.ReactNode; label: string }[] = [
      { id: 'home', icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
      { id: 'mealplan', icon: <CalendarDays className="w-5 h-5" />, label: 'Plan' },
      { id: 'import', icon: <Sparkles className="w-5 h-5" />, label: 'Import' },
      { id: 'deals', icon: <Tag className="w-5 h-5" />, label: 'Deals' },
      { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto">
        <div className="mx-4 mb-4 glass rounded-2xl shadow-lg">
          <div className="flex justify-around py-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setScreen(tab.id);
                  setShowRetailerModal(false);
                  setShowShareMenu(false);
                }}
                className={`flex flex-col items-center gap-1 px-4 py-1 transition-all ${screen === tab.id ? 'text-mustard scale-105' : 'text-muted-text'}`}
              >
                {tab.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream max-w-lg mx-auto relative">
      <AnimatePresence mode="wait">
        {screen === 'splash' && renderSplash()}
        {screen === 'onboarding' && renderOnboarding()}
        {screen === 'home' && renderHome()}
        {screen === 'detail' && renderDetail()}
        {screen === 'mealplan' && renderMealPlan()}
        {screen === 'deals' && renderDeals()}
        {screen === 'pantry' && renderPantry()}
        {screen === 'profile' && renderProfile()}
        {screen === 'import' && renderImport()}
      </AnimatePresence>
      {renderNav()}
    </div>
  );
}
