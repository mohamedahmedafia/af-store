import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Sparkles, TrendingUp, DollarSign, Package, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductSVG } from './ProductSVG';

interface SellerItem {
  id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  salesCount: number;
  createdAt: string;
}

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
  onAddSellerProduct: (newProd: Product) => void;
  sellerProducts: Product[];
}

export const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  onClose,
  showToast,
  onAddSellerProduct,
  sellerProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'new_listing'>('dashboard');
  
  // New Listing States
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('أجهزة الكمبيوتر وملحقاتها');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('10');
  const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=350&q=80');

  if (!isOpen) return null;

  // Let's compute simulated seller statistics
  const totalSalesRevenue = sellerProducts.reduce((sum, p) => sum + (p.price * 3), 0); // let's say they sold a few copies already
  const totalSellerItemsCount = sellerProducts.length;

  const handleCreateListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || parseFloat(price) <= 0) {
      showToast('⚠️ يرجى تعبئة الحقول الأساسية بشكل صحيح لإدراج السلعة في عافية.');
      return;
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock, 10) || 1;

    // Build standard structure Product
    const newProduct: Product = {
      id: `sell-${Math.floor(100000 + Math.random() * 899999).toString()}`,
      title,
      category,
      categoryKey: 'general_deals',
      price: priceNum,
      oldPrice: priceNum * 1.15, // represent hypothetical old list price
      rating: 5.0,
      reviewsCount: 1,
      image: imgUrl || 'gaming-headset', // default visual placeholder key
      description: description.trim() || 'لا يتوافر وصف تفصيلي لهذه السلعة المقدمة من التاجر المستقل.',
      specifications: {
        'التاجر': 'حسابك كتاجر مستقل في عافية',
        'الضمان': 'ضمان عافية ضد عيوب الصناعة عدا سوء الاستخدام',
        'الحالة': 'جديد تماماً بغلاف شحن المصنع والمخزن'
      },
      features: [
        'منتج أصلي 100% تم فحصه ومطابقته من قبل فريق جودة عافية',
        'شحن سريع خلال 24 ساعة من مستودعات التاجر لعنوانك مباشرة',
        'استجابة فورية لأي طلبات إرجاع وتسهيلات الدفع نقداً عند الاستلام'
      ],
      reviews: [
        { id: '1', username: 'فريق معاينة عافية', rating: 5, date: '2026-06-11', comment: 'تم فحص جودة المنتج الحقيقية ونوصي بقوة لعملاء المتجر.' }
      ],
      inStock: stockNum > 0,
    };

    onAddSellerProduct(newProduct);
    showToast(`🎉 مبروك! تم إدراج سلعتك "${title}" بنجاح في كتالوج متجر عافية، وهي متاحة للبيع لجميع زوار موقعنا العظيم الآن!`);
    
    // Reset inputs
    setTitle('');
    setPrice('');
    setDescription('');
    
    // Switch to status list tab
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="sell-modal-wrapper">
      <div className="bg-[#fcfdfd] w-full max-w-3xl rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150 shrink-0">
          <div className="flex items-center gap-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-sm md:text-base font-extrabold text-white">مركز تجار وبائعي عافية (Afia Seller Board)</span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seller Navigation Menu Switcher */}
        <div className="flex border-b border-gray-150 bg-teal-50/10 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 text-center py-3 text-xs font-bold border-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'border-[#0d9488] text-[#0d9488] bg-white font-black' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            📈 لوحة التحكم والإحصاءات العامة
          </button>
          <button
            onClick={() => setActiveTab('new_listing')}
            className={`flex-1 text-center py-3 text-xs font-bold border-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'new_listing' 
                ? 'border-[#0d9488] text-[#0d9488] bg-white font-black' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            ➕ إدراج وعرض منتج جديد مباشر بالمتجر
          </button>
        </div>

        {/* Body content scrollable */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-right">

          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              
              {/* Marketing Banner */}
              <div className="bg-gradient-to-l from-teal-900 to-teal-800 text-white p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white">ابدأ تجارتك المستقلة والرابحة معنا اليوم!</h4>
                  <p className="text-[10px] text-teal-100 font-bold mt-1">نحن نهتم بالتوصيل والتحصيل، وأنت فقط تهتم بتوفير العروض الرائعة.</p>
                </div>
                <div className="bg-amber-400 text-teal-980 px-3 py-1 rounded font-black text-xs shadow-md">
                  عمولة صفر % 🌟
                </div>
              </div>

              {/* Stats widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 border rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">إجمالي المنتجات المدرجة:</span>
                    <span className="text-base font-black text-teal-950 mt-1 block">{totalSellerItemsCount} منتجات</span>
                  </div>
                  <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center text-[#0d9488]">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-3 border rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">أرباح ومبيعات مقدرة:</span>
                    <span className="text-base font-black text-emerald-600 mt-1 block">{(totalSalesRevenue).toLocaleString('ar-EG')} ج.م</span>
                  </div>
                  <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-3 border rounded-lg shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">معدل نمو حساب بائعِك:</span>
                    <span className="text-base font-black text-purple-650 mt-1 block">متزايد +24.5%</span>
                  </div>
                  <div className="w-9 h-9 bg-purple-50 rounded-full flex items-center justify-center text-purple-650 font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Listed Products */}
              <div>
                <h5 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2.5">منتجاتك المعروضة على المتجر للجمهور:</h5>
                
                {sellerProducts.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 border border-dashed rounded-lg">
                    <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-bold">ليس لديك أي منتجات مدرجة باسمك كتاجر حالياً.</p>
                    <p className="text-[10px] text-[#0d9488] font-bold mt-1 cursor-pointer hover:underline" onClick={() => setActiveTab('new_listing')}>اضغط هنا لإدراج منتجك الأول الآن!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sellerProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="bg-white p-3 border rounded-lg flex items-center justify-between text-right"
                      >
                        <div className="flex items-center gap-x-2.5">
                          <div className="w-11 h-11 bg-gray-50 rounded border flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                            <ProductSVG type={p.image} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-800 line-clamp-1">{p.title}</p>
                            <div className="flex items-center gap-x-1.5 text-[10px] text-gray-400 mt-0.5">
                              <span>الفئة: <strong className="text-teal-900">{p.category}</strong></span>
                              <span>•</span>
                              <span>السعر: <strong className="text-[#0d9488]">{p.price.toLocaleString('ar-EG')} ج.م</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left font-mono">
                          <span className="inline-flex items-center gap-x-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                            <Check className="w-3 h-3 text-emerald-600" /> نشط في المتجر
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            // NEW LISTING FORM TAB
            <form onSubmit={handleCreateListingSubmit} className="space-y-4">
              <div className="bg-amber-50/50 p-2.5 rounded border border-amber-200 text-[10px] text-amber-800 leading-normal">
                📌 بمجرد إدراجك للمنتج، سوف يكتبه برنامج عافية فوراً كسلعة حقيقية في كتالوج المنتجات. يمكنك أنت أو أي زائر تصفحه، تقييمه، وإضافته لعربة التسوق وتجربة الشحن بالكامل محلياً!
              </div>

              {/* Title Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">عنوان السلعة أو المنتج الكامل:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: لوحة كتابة ورقية مقاس A4 للآباء"
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price EGP */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">السعر المقترح للبيع (بالجنيه المصري):</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="مثال: 350"
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white text-right"
                    required
                  />
                </div>

                {/* Stock Quantity */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">الكمية المتوافرة للشحن في مخازنك:</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="مثال: 10"
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white text-right"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Categories selection */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">اختر الفئة الأساسية لعرضها بالمكان الصحيح:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white cursor-pointer"
                  >
                    <option value="أجهزة الكمبيوتر وملحقاتها">أجهزة الكمبيوتر وملحقاتها</option>
                    <option value="ألعاب الفيديو">ألعاب الفيديو</option>
                    <option value="الأطفال">الأطفال</option>
                    <option value="إكسسوارات الألعاب">إكسسوارات الألعاب</option>
                    <option value="ألعاب أطفال من فائض تخزين المصانع">ألعاب الفائض</option>
                    <option value="الأدوات الضرورية للشواء للآباء">أدوات الشواء للآباء</option>
                  </select>
                </div>

                {/* Image Upload Option */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1">صورة المنتج الحقيقية أو الرابط:</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Preview area */}
                    <div className="border border-dashed border-gray-300 rounded-lg p-2.5 flex flex-col items-center justify-center bg-gray-50 h-28 relative">
                      {imgUrl ? (
                        <>
                          <ProductSVG type={imgUrl} className="max-h-full max-w-full object-contain rounded" />
                          <button
                            type="button"
                            onClick={() => setImgUrl('')}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 border-0 hover:bg-red-650 cursor-pointer shadow-sm flex items-center justify-center w-5 h-5 z-10"
                            title="حذف الصورة"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <div className="text-center text-gray-400">
                          <span className="text-2xl block">📷</span>
                          <span className="text-[10px]">لا توجد صورة بعد</span>
                        </div>
                      )}
                    </div>

                    {/* Upload / URL control area */}
                    <div className="md:col-span-2 flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-16 border border-dashed border-gray-350 rounded-lg cursor-pointer bg-white hover:bg-teal-50/20 hover:border-[#0d9488] transition-colors relative">
                          <div className="flex flex-col items-center justify-center pt-2 pb-1.5 text-center">
                            <span className="text-xs font-black text-teal-800">📁 اضغط هنا واصنع تحميل صورة مباشرة من جهازك</span>
                            <span className="text-[9px] text-gray-400 mt-0.5">صيغ PNG، JPG، WebP، SVG مدعومة تماماً</span>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setImgUrl(event.target.result as string);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>

                      <div className="space-y-1">
                        <input
                          type="text"
                          value={imgUrl}
                          onChange={(e) => setImgUrl(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#0d9488] bg-white text-left font-mono"
                          placeholder="أو ضع رابط صورة خارجي مباشر هنا (https://...)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">وصف تفصيلي للسلعة وميزاتها ومواصفاتها:</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب تفاصيل منتجك هنا مثل الخامة والجودة ومحتويات العلبة لجذب المشتري..."
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs outline-none focus:border-[#115e59] bg-white"
                />
              </div>

              {/* Submit Listing Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#115e59] hover:bg-[#0d4f4b] text-white font-extrabold py-2.5 px-4 rounded text-xs select-none cursor-pointer border-0 shadow flex items-center justify-center gap-x-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" /> إدراج سلعتي في كتالوج متجر عافية فوراً
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between shrink-0 text-[10px] text-gray-400">
          <span>توقيع شروط البيع والسياسات الخاصة بوزارة التموين والتجارة المصرية لعام 2026.</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-750 font-bold px-4 py-1.5 rounded text-xs select-none cursor-pointer border-0"
          >
            إغلاق نافذة البائع
          </button>
        </div>

      </div>
    </div>
  );
};
