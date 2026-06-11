import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PRODUCTS } from './data';
import { Product, CartItem, Review, UserProfile, ShoppingList, SavedAddress } from './types';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryCard } from './components/CategoryCard';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrdersModal, Order } from './components/OrdersModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { AIAssistant } from './components/AIAssistant';
import { AuthModal } from './components/AuthModal';
import { WishlistModal } from './components/WishlistModal';
import { AddressesModal } from './components/AddressesModal';
import { DealsModal } from './components/DealsModal';
import { GiftCardsModal } from './components/GiftCardsModal';
import { SellModal } from './components/SellModal';
import { PrimeVideoModal } from './components/PrimeVideoModal';
import { HistoryModal } from './components/HistoryModal';
import { CustomerServiceModal } from './components/CustomerServiceModal';
import { ShieldCheck, Truck, HelpingHand, HelpCircle, ArrowUp, ShoppingBasket, CheckCircle2 } from 'lucide-react';

export default function App() {
  // --- Core Application States ---
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // --- Personalized Dynamic States (Customer Customization) ---
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    isLoggedIn: false,
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr-1',
      label: 'المنزل',
      recipientName: 'محمد عافية عيسى',
      city: 'القاهرة',
      address: 'شارع المعز، عمارة الياسمين، الدور الثاني شقة ٥',
      phone: '01012345678'
    },
    {
      id: 'addr-2',
      label: 'العمل',
      recipientName: 'مكتب شركة عافية للشحن',
      city: 'المنصورة',
      address: 'مجمع المحاكم، مبنى سيتي سنتر، مكتب رقم ٢٠١',
      phone: '01122334455'
    }
  ]);
  
  // --- Modals & Panels Visibility ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [citySelectorOpen, setCitySelectorOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistActiveTab, setWishlistActiveTab] = useState<'favorites' | 'custom_lists'>('favorites');
  const [addressesOpen, setAddressesOpen] = useState(false);

  // --- New Subheader Modal States ---
  const [dealsOpen, setDealsOpen] = useState(false);
  const [giftCardsOpen, setGiftCardsOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [primeVideoOpen, setPrimeVideoOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [customerServiceOpen, setCustomerServiceOpen] = useState(false);

  // --- Seller Self-Listed Products ---
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  
  // --- Location & Search Filters ---
  const [selectedCity, setSelectedCity] = useState('القاهرة');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  // --- Purchase Feedback notifications ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load sample content on startup (or restore cart/orders from localStorage for complete durability!)
  useEffect(() => {
    const savedCart = localStorage.getItem('afia_saved_cart');
    const savedOrders = localStorage.getItem('afia_saved_orders');
    const savedCity = localStorage.getItem('afia_saved_city');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedCity) setSelectedCity(savedCity);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Seed an initial demo order to make the mesh look inhabited & beautiful
      const initialSeedOrder: Order = {
        id: 'AF-71822',
        date: '2026-06-10',
        recipientName: 'مهندس علاء الشناوي',
        city: 'المنصورة',
        address: 'شارع المشاية السفلية، عمارة الأمل، الدور الثالث شقة ٩',
        phone: '01018273645',
        subtotal: 1599,
        status: 'pending',
        items: [
          {
            product: {
              id: 'key-1',
              title: 'سماعة ألعاب محيطية احترافية بصوت مجسم 7.1 مع ميكروفون وإضاءة LED زرقاء',
              image: 'gaming-headset',
              price: 1599
            },
            quantity: 1
          }
        ]
      };
      setOrders([initialSeedOrder]);
    }

    // Load custom security profile, favorites, shopping lists, and saved addresses
    const savedUser = localStorage.getItem('afia_saved_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedFavorites = localStorage.getItem('afia_saved_favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedLists = localStorage.getItem('afia_saved_lists');
    if (savedLists) {
      setShoppingLists(JSON.parse(savedLists));
    } else {
      // Seed initial starting list examples
      const defaultLists: ShoppingList[] = [
        { id: 'list-1', name: 'مستلزمات رمضان 🌙', items: [] },
        { id: 'list-2', name: 'أجهزة ألعاب للساحل 🎮', items: [] },
      ];
      setShoppingLists(defaultLists);
    }

    const savedAddressesLocal = localStorage.getItem('afia_saved_addresses');
    if (savedAddressesLocal) {
      setSavedAddresses(JSON.parse(savedAddressesLocal));
    }

    // Load Seller self-made products
    const savedSellerProds = localStorage.getItem('afia_seller_products');
    if (savedSellerProds) {
      try {
        const parsed = JSON.parse(savedSellerProds);
        setSellerProducts(parsed);
        setProducts((prev) => {
          const filtered = prev.filter((p) => !parsed.some((sp: Product) => sp.id === p.id));
          return [...parsed, ...filtered];
        });
      } catch (err) {}
    }
  }, []);

  // Save changes to localStorage on update
  useEffect(() => {
    localStorage.setItem('afia_saved_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('afia_saved_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('afia_saved_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('afia_saved_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('afia_saved_lists', JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  useEffect(() => {
    localStorage.setItem('afia_saved_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // Handle Toast feedback alert
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // --- Handlers & Functions ---

  // Increase or decrease quantity of a single card item
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove single item from cart completely
  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم إزالة السلعة من عربة التسوق بنجاح.');
  };

  // Add selected item product into cart
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`تم إضافة (${quantity}) عدد من "${product.title}" إلى عربتك بنجاح! 🛒`);
  };

  // Buying now (direct triggers checkout wizard bypass)
  const handleBuyNow = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  // Submitting detailed checkout order form convert
  const handleCheckoutComplete = (shippingDetails: {
    name: string;
    city: string;
    address: string;
    phone: string;
  }) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    // Convert cart items to order logs
    const newOrder: Order = {
      id: 'AF-' + Math.floor(10000 + Math.random() * 90000).toString(),
      date: new Date().toISOString().split('T')[0],
      recipientName: shippingDetails.name,
      city: shippingDetails.city,
      address: shippingDetails.address,
      phone: shippingDetails.phone,
      subtotal: subtotal,
      status: 'pending',
      items: cart.map((item) => ({
        product: {
          id: item.product.id,
          title: item.product.title,
          image: item.product.image,
          price: item.product.price,
        },
        quantity: item.quantity,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Reset Cart
    setCartOpen(false); // Close Cart Drawer
    
    // Open Orders modal to let them view
    setOrdersModalOpen(true);
    showToast(`🎉 شكراً لتسوقك! تم تأكيد طلبك برقم الشحنة ${newOrder.id} بنجاح.`);
  };

  // Adding dynamic reviews to product list memory
  const handleAddProductReview = (productId: string, newReview: Review) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [newReview, ...prod.reviews];
          const newRating = parseFloat(
            (
              updatedReviews.reduce((sum, rev) => sum + rev.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...prod,
            reviews: updatedReviews,
            rating: newRating,
            reviewsCount: updatedReviews.length,
          };
        }
        return prod;
      })
    );

    // If modal is currently inspecting this product, update its content too!
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prevProd) => {
        if (!prevProd) return null;
        const updatedReviews = [newReview, ...prevProd.reviews];
        const newRating = parseFloat(
          (
            updatedReviews.reduce((sum, rev) => sum + rev.rating, 0) /
            updatedReviews.length
          ).toFixed(1)
        );
        return {
          ...prevProd,
          reviews: updatedReviews,
          rating: newRating,
          reviewsCount: updatedReviews.length,
        };
      });
    }
  };

  // Action callback from Hero Slider banner buttons
  const handleBannerAction = (keyword: string) => {
    if (keyword === 'الكل') {
      const element = document.getElementById('afia-store-catalog');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSearchQuery(keyword);
      const element = document.getElementById('afia-store-catalog');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select city of child and save local
  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('afia_saved_city', city);
    showToast(`تم تغيير موقع التسليم الافتراضي إلى: ${city}.`);
  };

  // Back to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Custom Browsing History Tracking ---
  const addToBrowsingHistory = (productId: string) => {
    try {
      const saved = localStorage.getItem('afia_recently_viewed');
      let arr: string[] = [];
      if (saved) {
        arr = JSON.parse(saved);
      }
      arr = arr.filter((id) => id !== productId);
      arr.unshift(productId);
      arr = arr.slice(0, 10); // cap max 10
      localStorage.setItem('afia_recently_viewed', JSON.stringify(arr));
    } catch (err) {}
  };

  const handleSelectProduct = (productId: string) => {
    const matched = products.find((p) => p.id === productId);
    if (matched) {
      setSelectedProduct(matched);
      addToBrowsingHistory(productId);
    }
  };

  // --- Seller Self-Listing Product Handler ---
  const handleAddSellerProduct = (newProd: Product) => {
    // Add to actual list of seller listings state
    const updatedSellerList = [newProd, ...sellerProducts];
    setSellerProducts(updatedSellerList);
    localStorage.setItem('afia_seller_products', JSON.stringify(updatedSellerList));

    // Prepend to main store products state immediately to show up in storefront card list
    setProducts((prev) => [newProd, ...prev]);
  };

  // --- Dynamic Auth Handlers ---
  const handleLogin = (name: string, email: string) => {
    const newUser = { name, email, isLoggedIn: true };
    setUser(newUser);
    showToast(`مرحباً بك يا ${name}! تم تسجيل الدخول بأمان لخدمات عافية. 🔐`);
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', isLoggedIn: false });
    showToast('تم تسجيل الخروج بنجاح. نأمل رؤيتك قريباً!');
  };

  // --- Dynamic Favorites Handlers ---
  const handleToggleFavorite = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const title = product ? product.title : 'المنتج';
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`تم إزالة السلعة من مفضلاتك الشخصية. ❤️`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`تم حفظ "${title.substring(0, 25)}..." في مفضلاتك الشخصية بنجاح! ❤️`);
        return [...prev, productId];
      }
    });
  };

  // --- Custom Shopping Lists Handlers ---
  const handleCreateList = (name: string) => {
    const newList: ShoppingList = {
      id: 'list-' + Math.floor(1000 + Math.random() * 9000).toString(),
      name,
      items: [],
    };
    setShoppingLists((prev) => [...prev, newList]);
    showToast(`تم إنشاء قائمة تسوق مخصصة باسم "${name}" بنجاح! 📂`);
  };

  const handleDeleteList = (listId: string) => {
    setShoppingLists((prev) => prev.filter((l) => l.id !== listId));
    showToast('تم حذف قائمة التسوق بنجاح.');
  };

  const handleAddToList = (listId: string, productId: string) => {
    const product = products.find((p) => p.id === productId);
    const title = product ? product.title : 'السلعة';
    setShoppingLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          const alreadyExists = list.items.some((item) => item.id === productId);
          if (alreadyExists) {
            showToast(`سجل التنبيه: هذه السلعة مضافة بالفعل في "${list.name}".`);
            return list;
          }
          const newItems = [
            ...list.items,
            { id: productId, title, addedAt: new Date().toISOString().split('T')[0] },
          ];
          showToast(`تم إضافة "${title.substring(0, 25)}..." بنجاح إلى "${list.name}"! 📌`);
          return { ...list, items: newItems };
        }
        return list;
      })
    );
  };

  const handleRemoveFromList = (listId: string, productId: string) => {
    setShoppingLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          return { ...list, items: list.items.filter((item) => item.id !== productId) };
        }
        return list;
      })
    );
    showToast('تم إزالة السلعة من قائمة التسوق بنجاح.');
  };

  // --- Dynamic Addresses Handlers ---
  const handleAddAddress = (newAddr: Omit<SavedAddress, 'id'>) => {
    const finalAdd: SavedAddress = {
      ...newAddr,
      id: 'addr-' + Math.floor(1000 + Math.random() * 9000).toString(),
    };
    setSavedAddresses((prev) => [...prev, finalAdd]);
    showToast(`تم حفظ عنوان الشحن الجديد تحت تصنيف ("${newAddr.label}") بنجاح! 🏠`);
    handleSelectCity(newAddr.city); // automatically switch city representation
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('تم إزالة عنوان الشحن المحدد من حسابك.');
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col justify-between font-sans relative antialiased text-gray-800" id="afia-store-root">
      
      {/* 1. Header Navigation elements */}
      <Header
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          const element = document.getElementById('afia-store-catalog');
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery(''); // Reset search on direct cat switcher
          const element = document.getElementById('afia-store-catalog');
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        selectedCity={selectedCity}
        onOpenCitySelector={() => setAddressesOpen(true)}
        onOpenOrdersModal={() => setOrdersModalOpen(true)}
        user={user}
        onOpenAuthModal={() => setAuthOpen(true)}
        onOpenWishlistModal={(tab) => {
          setWishlistActiveTab(tab);
          setWishlistOpen(true);
        }}
        onOpenAddressesModal={() => setAddressesOpen(true)}
        onOpenDealsModal={() => setDealsOpen(true)}
        onOpenGiftCardsModal={() => setGiftCardsOpen(true)}
        onOpenSellModal={() => setSellOpen(true)}
        onOpenPrimeVideoModal={() => setPrimeVideoOpen(true)}
        onOpenHistoryModal={() => setHistoryOpen(true)}
        onOpenCustomerServiceModal={() => setCustomerServiceOpen(true)}
      />

      {/* 2. Primary layout body area */}
      <main className="w-full flex-1 pb-16">
        
        {/* Sliding Hero Banner */}
        <HeroCarousel onBannerAction={handleBannerAction} />

        {/* 4 Category grids - Absolute replica from the screenshot, nested in negative margin overlay exactly like Amazon */}
        <div className="relative -mt-10 sm:-mt-16 md:-mt-36 z-20 max-w-7xl mx-auto px-2 sm:px-4">
          <CategoryCard 
            onSelectProduct={handleSelectProduct}
            onExploreCategory={(catName) => {
              setActiveCategory(catName);
              const element = document.getElementById('afia-store-catalog');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* Informative service values row */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-right mt-6" id="afia-services-row">
          <div className="bg-white p-4 rounded-sm shadow-xs border border-gray-150 flex items-center gap-x-4">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-[#f08804] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">شحن مجاني وسريع في اليوم التالي</h4>
              <p className="text-xs text-gray-500 mt-0.5">شحن مجاني على كافة الطلبات المؤكدة لجميع أنحاء مصر بدون شروط.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-sm shadow-xs border border-gray-150 flex items-center gap-x-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">الدفع نقداً عند الاستلام بالكامل</h4>
              <p className="text-xs text-gray-500 mt-0.5">افحص المنتجات براحتك قبل الدفع واطلب الإرجاع في الحال إذا لم يعجبك.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-sm shadow-xs border border-gray-150 flex items-center gap-x-4">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 shrink-0">
              <HelpingHand className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#111827]">خدمة عملاء ٢٤ ساعة متميزة</h4>
              <p className="text-xs text-gray-500 mt-0.5">فريق دعم عافية جاهز لمساعدتكم بالاتصال أو من خلال مساعدنا الذكي.</p>
            </div>
          </div>
        </div>

        {/* Store Catalog display containing products */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-2">
          <ProductCatalog
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            favorites={favorites}
            toggleFavorite={handleToggleFavorite}
            shoppingLists={shoppingLists}
            onAddToList={handleAddToList}
          />
        </div>

      </main>

      {/* 3. Footer row */}
      <footer className="w-full bg-[#154e4b] text-white pt-8" id="afia-footer" dir="rtl">
        
        {/* Back to top button */}
        <button 
          onClick={scrollToTop}
          className="w-full bg-[#1a5f5c] hover:bg-[#20726f] text-xs font-extrabold text-white py-3.5 text-center border-0 cursor-pointer block transition-colors outline-none mb-8"
        >
          <div className="flex items-center justify-center gap-x-1">
            <ArrowUp className="w-4 h-4" /> العودة إلى أعلى الصفحة
          </div>
        </button>

        {/* Footer link directories */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-right pb-8 text-xs text-gray-300">
          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-sm border-b border-gray-700 pb-1.5">تعرف علينا</h5>
            <p className="hover:underline cursor-pointer">وظائف في عافية</p>
            <p className="hover:underline cursor-pointer">عن شركة عافية مصر</p>
            <p className="hover:underline cursor-pointer">أخبار ومستجدات عافية</p>
            <p className="hover:underline cursor-pointer">أجهزة عافية السحابية</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-sm border-b border-gray-700 pb-1.5">كسب المال معنا</h5>
            <p className="hover:underline cursor-pointer">بيع منتجاتك على عافية</p>
            <p className="hover:underline cursor-pointer">عرض البضائع فائضة المصانع</p>
            <p className="hover:underline cursor-pointer">التسويق بالعمولة للشباب</p>
            <p className="hover:underline cursor-pointer">الإعلان عن سلع مخصصة</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-sm border-b border-gray-700 pb-1.5">طرق الدفع والائتمان</h5>
            <p className="hover:underline cursor-pointer">الدفع عند استلام الطرود</p>
            <p className="hover:underline cursor-pointer">بطاقات الائتمان وبطاقات الخصم</p>
            <p className="hover:underline cursor-pointer">الأقساط الشهرية السهلة</p>
            <p className="hover:underline cursor-pointer">حساب عافية وجيفت كارد</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-sm border-b border-gray-700 pb-1.5">دعنا نساعدك</h5>
            <p className="hover:underline cursor-pointer" onClick={() => setOrdersModalOpen(true)}>تتبع الشحنات ومستحقاتك</p>
            <p className="hover:underline cursor-pointer">سياسات وإجراءات الإرجاع</p>
            <p className="hover:underline cursor-pointer">إدارة المحتوى والأجهزة</p>
            <p className="hover:underline cursor-pointer">مركز المساعدة والاتصال</p>
          </div>
        </div>

        {/* Final footer credit strip */}
        <div className="bg-[#0d3230] py-8 text-center text-xs text-gray-400 border-t border-teal-850 px-4 space-y-4">
          <div className="flex items-center justify-center gap-x-2">
            {/* Logo */}
            <span className="text-xl font-black text-white">Afia</span>
            <span className="text-gray-500">|</span>
            <span>بوابتك للتسوق المأمون والذكي في جمهورية مصر العربية 🇪🇬</span>
          </div>
          <div className="text-[11px] max-w-xl mx-auto leading-normal text-gray-500">
            العقود والشروط | سياسة الخصوصية | شروط الخدمة لعام ٢٠٢٦ عافية. كافة الحقوق محفوظة لشركة "عافية مصر المحدودة" وعلامة الابتسامة الصفراء مسجلة رسمياً.
          </div>
        </div>

      </footer>

      {/* --- MODAL WIZARDS Overlay Containers --- */}

      {/* A. Product Detailed Inspect modal component */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onAddReview={handleAddProductReview}
            favorites={favorites}
            toggleFavorite={handleToggleFavorite}
            shoppingLists={shoppingLists}
            onAddToList={handleAddToList}
          />
        )}
      </AnimatePresence>

      {/* G. Dynamic Security Auth portal */}
      <AnimatePresence>
        {authOpen && (
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>

      {/* H. Favorites & Shopping list details manager */}
      <AnimatePresence>
        {wishlistOpen && (
          <WishlistModal
            isOpen={wishlistOpen}
            onClose={() => setWishlistOpen(false)}
            favorites={favorites}
            toggleFavorite={handleToggleFavorite}
            shoppingLists={shoppingLists}
            onCreateList={handleCreateList}
            onDeleteList={handleDeleteList}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
            products={products}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* I. Addresses panel selector */}
      <AnimatePresence>
        {addressesOpen && (
          <AddressesModal
            isOpen={addressesOpen}
            onClose={() => setAddressesOpen(false)}
            savedAddresses={savedAddresses}
            onAddAddress={handleAddAddress}
            onDeleteAddress={handleDeleteAddress}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        )}
      </AnimatePresence>

      {/* B. Cart Sliding side Drawer component */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onCheckout={handleCheckoutComplete}
            selectedCity={selectedCity}
          />
        )}
      </AnimatePresence>

      {/* C. Orders logs history modal */}
      <AnimatePresence>
        {ordersModalOpen && (
          <OrdersModal
            isOpen={ordersModalOpen}
            onClose={() => setOrdersModalOpen(false)}
            orders={orders}
          />
        )}
      </AnimatePresence>

      {/* D. Egypt Governorates selectors modal */}
      <AnimatePresence>
        {citySelectorOpen && (
          <CitySelectorModal
            isOpen={citySelectorOpen}
            onClose={() => setCitySelectorOpen(false)}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        )}
      </AnimatePresence>

      {/* E. Smart Chat Assistant drawer anchor */}
      <AnimatePresence>
        {aiAssistantOpen && (
          <AIAssistant
            isOpen={aiAssistantOpen}
            onClose={() => setAiAssistantOpen(false)}
            onSelectProduct={handleSelectProduct}
            onSearchProduct={(keyword) => {
              setSearchQuery(keyword);
              const element = document.getElementById('afia-store-catalog');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>

      {/* J. Today's Deals interactive display */}
      <AnimatePresence>
        {dealsOpen && (
          <DealsModal
            isOpen={dealsOpen}
            onClose={() => setDealsOpen(false)}
            products={products}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </AnimatePresence>

      {/* K. Gift Cards creator and wallet balance charger */}
      <AnimatePresence>
        {giftCardsOpen && (
          <GiftCardsModal
            isOpen={giftCardsOpen}
            onClose={() => setGiftCardsOpen(false)}
            showToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* L. Sell on Afia independent merchant board */}
      <AnimatePresence>
        {sellOpen && (
          <SellModal
            isOpen={sellOpen}
            onClose={() => setSellOpen(false)}
            showToast={showToast}
            onAddSellerProduct={handleAddSellerProduct}
            sellerProducts={sellerProducts}
          />
        )}
      </AnimatePresence>

      {/* M. Immersive Prime Video player slider */}
      <AnimatePresence>
        {primeVideoOpen && (
          <PrimeVideoModal
            isOpen={primeVideoOpen}
            onClose={() => setPrimeVideoOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* N. Privacy activity browsing and search history logs */}
      <AnimatePresence>
        {historyOpen && (
          <HistoryModal
            isOpen={historyOpen}
            onClose={() => setHistoryOpen(false)}
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* O. Interactive FAQ ticketing customer service panel */}
      <AnimatePresence>
        {customerServiceOpen && (
          <CustomerServiceModal
            isOpen={customerServiceOpen}
            onClose={() => setCustomerServiceOpen(false)}
            onOpenAIAssistant={() => setAiAssistantOpen(true)}
            showToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* F. Toast Alert Pop notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 35, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 25, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-white px-5 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-x-2.5 font-sans rtl text-xs font-bold w-[90%] max-w-sm text-right"
            dir="rtl"
            id="toast-notification"
          >
            <div className="w-5 h-5 bg-[#0d9488] rounded-full flex items-center justify-center text-white shrink-0">
              ✔️
            </div>
            <span className="flex-1">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
