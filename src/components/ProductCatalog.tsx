import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Sparkles, Heart, ListPlus } from 'lucide-react';
import { ALL_PRODUCTS } from '../data';
import { Product, ShoppingList } from '../types';
import { ProductSVG } from './ProductSVG';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  // Optional wishlist/favorites integration
  favorites?: string[];
  toggleFavorite?: (productId: string) => void;
  shoppingLists?: ShoppingList[];
  onAddToList?: (listId: string, productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  favorites = [],
  toggleFavorite,
  shoppingLists = [],
  onAddToList,
}) => {
  const [selectedTab, setSelectedTab] = useState('الكل');

  // Categories mapping for easy Egyptian tags
  const categoriesTabs = [
    { label: 'الكل', value: 'الكل' },
    { label: 'الكمبيوتر والألعاب', value: 'أجهزة الكمبيوتر وملحقاتها' },
    { label: 'إكسسوارات ألعاب', value: 'إكسسوارات الألعاب' },
    { label: 'ألعاب أطفال والفائض', value: 'ألعاب أطفال من فائض تخزين المصانع' },
    { label: 'مستلزمات الشواية', value: 'الأدوات الضرورية للشواء للآباء' },
    { label: 'عروض الإلكترونيات', value: 'الإلكترونيات والتقنية' }
  ];

  const handleTabChange = (val: string) => {
    setSelectedTab(val);
    onSelectCategory(val);
  };

  const filteredProducts = products.filter((prod) => {
    // Filter by tab category
    const matchesTab = selectedTab === 'الكل' || prod.category === selectedTab;
    
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.subCategoryName && prod.subCategoryName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6 bg-[#f7f9fa] border-t border-gray-150 select-none rtl" dir="rtl" id="afia-store-catalog">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-5 text-right">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-905 tracking-tight flex items-center gap-x-1.5 justify-start">
            <Sparkles className="w-5 h-5 text-amber-500" /> أفضل صفقات وعروض عافية المتفردة لليوم
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-1">توصيل سريع ومجاني لباب منزلك مع ضمان الدفع عند الاستلام</p>
        </div>

        {/* Clear query indicator if search active */}
        {searchQuery && (
          <div className="mt-2 md:mt-0 bg-[#fff3ec] border border-[#fbd8b4] rounded px-3 py-1 text-xs text-[#c45500] font-bold flex items-center gap-x-2">
            <span>نتائج البحث عن: "{searchQuery}" ({filteredProducts.length} منتج)</span>
            <button 
              onClick={onClearSearch}
              className="text-[#007185] hover:text-[#c45500] border-0 bg-transparent font-black cursor-pointer text-xs"
            >
              عرض الكل &times;
            </button>
          </div>
        )}
      </div>

      {/* Tabs list filter bar */}
      <div className="flex items-center gap-x-2 overflow-x-auto whitespace-nowrap mb-6 pb-2 border-b border-gray-200 scrollbar-none">
        {categoriesTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer border-0 ${
              selectedTab === tab.value
                ? 'bg-gradient-to-r from-[#232f3e] to-[#131920] text-white shadow-sm'
                : 'bg-white hover:bg-gray-150 text-gray-700 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products rendering grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-md border border-gray-200 py-16 text-center text-gray-500 space-y-2 flex flex-col items-center justify-center">
          <p className="font-extrabold text-sm text-gray-900">عذراً! لم نجد أي تطابقات لطلبك</p>
          <p className="text-xs text-gray-400">حاول البحث بكلمة أخرى مثل "لابتوب"، "سماعات"، "مريلة" أو "بطريق" لمشاهدة صفقات عافية.</p>
          <button 
            onClick={() => {
              setSelectedTab('الكل');
              onClearSearch();
            }}
            className="mt-3 bg-[#115e59] hover:bg-[#0d4f4b] text-white text-xs font-bold py-1.5 px-4 rounded-sm border-0 cursor-pointer"
          >
            عرض جميع المنتجات المتاحة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="product-list-grid">
          {filteredProducts.map((prod) => {
            const savings = prod.oldPrice ? prod.oldPrice - prod.price : null;
            return (
              <div 
                key={prod.id}
                className="bg-white rounded-sm border border-gray-150 p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-right relative"
              >
                {/* Favorites and lists quick-adder overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-y-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                  {toggleFavorite && (
                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border bg-white shadow-xs hover:scale-105 transition-all cursor-pointer ${
                        favorites.includes(prod.id) 
                          ? 'text-red-500 fill-red-500 border-red-200' 
                          : 'text-gray-400 hover:text-red-550 border-gray-150'
                      }`}
                      title={favorites.includes(prod.id) ? 'إزالة من المفضلات' : 'حفظ في المفضلات'}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  )}
                  {shoppingLists.length > 0 && onAddToList && (
                    <div className="relative group/list">
                      <button
                        type="button"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-150 bg-white shadow-xs hover:scale-105 text-gray-400 hover:text-teal-600 transition-all cursor-pointer"
                        title="إضافة لقائمة تسوق مخصصة"
                      >
                        <ListPlus className="w-4 h-4" />
                      </button>
                      {/* Hover Dropdown of lists */}
                      <div className="hidden group-hover/list:block absolute left-0 mt-0.5 w-40 bg-white border border-gray-150 rounded shadow-lg p-1 text-right z-30">
                        <p className="text-[9px] text-gray-400 font-extrabold px-2 py-1 border-b border-gray-100">إضافة لقائمة:</p>
                        {shoppingLists.map((list) => {
                          const inList = list.items.some((item) => item.id === prod.id);
                          return (
                            <button
                              key={list.id}
                              onClick={() => onAddToList(list.id, prod.id)}
                              className="w-full text-right block px-2.5 py-1 text-[10px] font-bold text-gray-700 hover:text-teal-900 border-0 bg-transparent hover:bg-teal-50 cursor-pointer truncate"
                            >
                              {inList ? `✔️ ${list.name}` : `+ ${list.name}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Category badge */}
                  <span className="text-[10px] text-[#007185] font-extrabold tracking-wide uppercase block mb-1">
                    {prod.category}
                  </span>

                  {/* Visual SVG Box */}
                  <div 
                    onClick={() => onSelectProduct(prod.id)}
                    className="w-full h-40 bg-gray-50 hover:bg-sky-50/20 rounded flex items-center justify-center p-3 border border-gray-50 cursor-pointer overflow-hidden transition-colors"
                  >
                    <ProductSVG type={prod.image} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectProduct(prod.id)}
                    className="text-xs font-extrabold text-gray-900 mt-3 line-clamp-2 leading-relaxed cursor-pointer hover:text-amber-600 transition-colors"
                    title={prod.title}
                  >
                    {prod.title}
                  </h3>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-x-1 mt-1.5 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(prod.rating) ? 'fill-amber-400 stroke-amber-400' : 'text-gray-200'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-sans mt-0.5 font-semibold">({prod.reviewsCount})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-x-1.5 flex-wrap">
                      <span className="text-lg font-black text-rose-600 font-sans">{prod.price.toLocaleString()} ج.م.</span>
                      {prod.oldPrice && (
                        <span className="text-xs text-gray-400 line-through font-sans">{prod.oldPrice.toLocaleString()} ج.م.</span>
                      )}
                    </div>
                    {savings && (
                      <span className="inline-block text-[10px] bg-teal-50 text-teal-800 border border-teal-100 font-black px-1.5 rounded-sm mt-0.5">
                        وفر {savings.toLocaleString()} ج.م.
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid CTAs */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => onSelectProduct(prod.id)}
                    className="w-full bg-[#f7f9fa] hover:bg-[#ebedee] text-gray-800 font-extrabold py-1.5 px-3 rounded-sm text-xs text-center border border-gray-300 cursor-pointer transition-colors flex items-center justify-center gap-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> التفاصيل الفنية والتعليقات
                  </button>

                  <button
                    onClick={() => onAddToCart(prod, 1)}
                    className="w-full bg-[#115e59] hover:bg-[#0d4f4b] text-white font-extrabold py-1.5 px-3 rounded-sm text-xs text-center border-0 cursor-pointer shadow transition-all duration-150 flex items-center justify-center gap-x-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> أضف إلى السلة
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
