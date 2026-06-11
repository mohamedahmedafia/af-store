import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Check, Truck, ArrowLeftRight, MessageSquareCode, Heart, ListPlus } from 'lucide-react';
import { Product, Review, ShoppingList } from '../types';
import { ProductSVG } from './ProductSVG';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onAddReview: (productId: string, review: Review) => void;
  favorites?: string[];
  toggleFavorite?: (productId: string) => void;
  shoppingLists?: ShoppingList[];
  onAddToList?: (listId: string, productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onAddReview,
  favorites = [],
  toggleFavorite,
  shoppingLists = [],
  onAddToList,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [reviewerName, setReviewerName] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const discountAmount = product.oldPrice ? product.oldPrice - product.price : 0;
  const savingsPct = product.oldPrice ? Math.round((discountAmount / product.oldPrice) * 100) : 0;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !commentInput.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      username: reviewerName,
      rating: ratingInput,
      date: new Date().toISOString().split('T')[0],
      comment: commentInput,
    };

    onAddReview(product.id, newReview);
    setReviewSuccess(true);
    setReviewerName('');
    setCommentInput('');
    setRatingInput(5);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 md:p-4 overflow-y-auto font-sans rtl" dir="rtl" id="product-detail-backdrop">
      
      {/* Modal Card */}
      <div className="bg-[#fcfdfd] w-[95%] max-w-5xl rounded-lg shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col animate-fade-in" id="product-detail-card">
        
        {/* Top Header */}
        <div className="bg-[#154e4b] text-white px-5 py-3.5 flex items-center justify-between border-b border-gray-750">
          <div className="flex items-center gap-x-2 text-xs md:text-sm font-semibold text-teal-150">
            <span>عافية</span>
            <span>&raquo;</span>
            <span>{product.category}</span>
            {product.subCategoryName && (
              <>
                <span>&raquo;</span>
                <span className="text-[#e9be64]">{product.subCategoryName}</span>
              </>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
          
          {/* 1. Left Grid Element (Large Drawing Visualization) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-5 rounded-md border border-gray-100 min-h-[220px] md:min-h-[340px]">
            <div className="w-full max-w-[280px] h-full max-h-[300px]">
              <ProductSVG type={product.image} className="w-full h-full object-contain" />
            </div>
            <p className="text-[11px] text-gray-400 mt-4 text-center">
              * تم رسم هذا المنتج بدقة بمتجهات عافية الذكية لملاءمة تجربة الفحص المباشر ثلاثي الأبعاد
            </p>
          </div>

          {/* 2. Middle Grid Element (Title Description Specifications Features) */}
          <div className="lg:col-span-4 flex flex-col text-right">
            <h1 className="text-lg md:text-xl font-extrabold text-gray-900 leading-snug mb-2 font-sans">
              {product.title}
            </h1>

            {/* Simulated Reviews aggregate */}
            <div className="flex items-center gap-x-1.5 mb-4">
              <span className="text-sm font-bold text-gray-800">{product.rating}</span>
              <div className="flex items-center" id="aggregate-stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 stroke-amber-400' : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-cyan-700 hover:text-amber-600 hover:underline cursor-pointer">
                ({product.reviewsCount} تقييم المشتري)
              </span>
            </div>

            <hr className="border-gray-150 mb-4" />

            {/* Price details inside description middle */}
            <div className="mb-4">
              <div className="flex items-baseline gap-x-2">
                <span className="text-gray-500 text-sm">السعر:</span>
                <span className="text-2xl font-black text-rose-600 font-sans">{product.price.toLocaleString()} ج.م.</span>
                {product.oldPrice && (
                  <span className="text-gray-400 text-sm line-through font-sans">{product.oldPrice.toLocaleString()} ج.م.</span>
                )}
              </div>
              {product.oldPrice && (
                <div className="text-xs text-green-700 font-extrabold mt-1">
                  توفير {discountAmount.toLocaleString()} ج.م. ({savingsPct}%)
                </div>
              )}
              <span className="text-xs text-gray-500 block mt-1">الأسعار تشمل ضريبة القيمة المضافة بالكامل.</span>
            </div>

            {/* Specifications Details */}
            <div className="mb-5 bg-gray-50 p-3 rounded-md border border-gray-150">
              <span className="text-xs font-black text-gray-800 block mb-2 underline">المواصفات الفنية الحقيقية:</span>
              <table className="w-full text-xs text-gray-700 space-y-1 text-right">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-200 last:border-0 py-1 block">
                      <td className="font-extrabold text-gray-900 w-1/3 block sm:inline-block">{key} :</td>
                      <td className="w-2/3 block sm:inline-block">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bullet features */}
            <div className="mb-4">
              <span className="text-xs font-black text-gray-800 block mb-2">عن هذه السلعة الممتازة:</span>
              <ul className="text-xs text-gray-600 list-disc list-inside space-y-1 text-right pl-0 pr-1">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="leading-relaxed">{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Right Purchase Widget container */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-md p-4 flex flex-col justify-between shadow-xs text-right h-fit">
            <div>
              <div className="text-xl font-bold font-sans text-rose-600 mb-1">
                {product.price.toLocaleString()} ج.م.
              </div>
              <p className="text-xs text-[#007600] font-extrabold flex items-center gap-x-1 mb-2">
                <Check className="w-4 h-4 text-[#007600]" /> متوفر حالياً في المخزن
              </p>

              {/* Delivery info */}
              <div className="space-y-2 border-t border-b border-gray-100 py-3 my-3">
                <div className="flex items-start gap-x-2 text-xs text-gray-600">
                  <Truck className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    توصيل مجاني وسريع غداً <span className="font-bold text-gray-900">١٢ يونيو</span>
                  </div>
                </div>
                <div className="flex items-start gap-x-2 text-xs text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#007600] mt-0.5 shrink-0" />
                  <div>
                    سياسة إرجاع واسترجاع مرنة وآمنة لمدة ١٥ يوماً
                  </div>
                </div>
              </div>

              {/* Quantity dropdown picker */}
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs text-gray-650">الكمية المطلوبة:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs font-bold outline-none cursor-pointer"
                  id="quantity-picker"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="w-full bg-[#115e59] hover:bg-[#0d4f4b] text-white font-bold py-2 px-4 rounded-full text-xs text-center border-0 cursor-pointer shadow transition-all duration-150 flex items-center justify-center gap-x-1.5"
                id="modal-add-to-cart-btn"
              >
                <ShoppingCart className="w-4 h-4" /> إضافة إلى عربة عافية
              </button>

              <button
                onClick={() => {
                  onBuyNow(product, quantity);
                }}
                className="w-full bg-[#f0c14b] hover:bg-[#ebd07f] text-gray-900 font-bold py-2 px-4 rounded-full text-xs text-center border border-[#a88734] cursor-pointer shadow-xs transition-all duration-150"
                id="modal-buy-now-btn"
              >
                الشراء المباشر الآن
              </button>

              {/* Favorites & custom list buttons row */}
              <div className="flex gap-x-2 pt-1">
                {toggleFavorite && (
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-x-1.5 ${
                      favorites.includes(product.id)
                        ? 'bg-red-50 border-red-200 text-red-600 font-extrabold'
                        : 'bg-white border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {favorites.includes(product.id) ? 'بالمفضلة ❤️' : 'حفظ بالمفضلة'}
                  </button>
                )}

                {shoppingLists.length > 0 && onAddToList && (
                  <div className="relative group/modal-list flex-1">
                    <button
                      type="button"
                      className="w-full py-1.5 px-3 rounded-full text-xs font-bold border border-gray-200 bg-white text-gray-600 hover:text-teal-600 hover:border-teal-200 transition-all cursor-pointer flex items-center justify-center gap-x-1.5"
                    >
                      <ListPlus className="w-3.5 h-3.5" /> إضافة لقائمة تسوق
                    </button>
                    {/* List options flyout */}
                    <div className="hidden group-hover/modal-list:block absolute left-0 bottom-full mb-1.5 w-full bg-white border border-gray-200 rounded-md shadow-2xl p-1 text-right z-30">
                      <p className="text-[9px] text-gray-400 font-black px-2 py-1 border-b border-gray-100">اختر قائمة الشحن:</p>
                      {shoppingLists.map((list) => {
                        const inList = list.items.some((item) => item.id === product.id);
                        return (
                          <button
                            key={list.id}
                            onClick={() => onAddToList(list.id, product.id)}
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
            </div>
          </div>

        </div>

        {/* 4. Bottom section: Dynamic Reviews Module */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-5 overflow-y-auto max-h-[300px]">
          <h3 className="text-base font-extrabold text-gray-900 mb-4 text-right flex items-center gap-x-1.5">
            <MessageSquareCode className="w-5 h-5 text-[#e9be64]" /> تقييمات المشترين لهذه السلعة ({product.reviews.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Review Listings Columns */}
            <div className="md:col-span-7 space-y-4 text-right order-2 md:order-1">
              {product.reviews.length === 0 ? (
                <p className="text-xs text-gray-500">لا توجد تقييمات بعد لمشترين. كن أول من يقيم هذا المنتج العظيم!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-3 rounded-md border border-gray-150 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-1.5">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-[10px] font-black">
                          {rev.username.charAt(0)}
                        </div>
                        <span className="text-xs font-extrabold text-gray-800">{rev.username}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-sans">{rev.date}</span>
                    </div>
                    {/* Stars of single review */}
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 stroke-amber-400' : 'text-gray-200'
                          }`} 
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium pt-1">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Write a review Column Form */}
            <form onSubmit={handleReviewSubmit} className="md:col-span-5 bg-white p-4 rounded-md border border-gray-150 text-right order-1 md:order-2 space-y-3">
              <span className="text-xs font-black text-gray-800 block border-b border-gray-50 pb-1">أضف تقييمك الخاص للمنتج:</span>

              {reviewSuccess && (
                <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded border border-emerald-200">
                  تم إرسال ونشر تقييمك للمنتج وظهر أسفله بنجاح! شكراً لك.
                </div>
              )}

              {/* Name */}
              <div>
                <label className="text-[11px] text-gray-600 block mb-1">اسمك الكريم:</label>
                <input 
                  type="text" 
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="مثال: محمد عفية"
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-amber-500"
                  required
                />
              </div>

              {/* Star rating selection */}
              <div className="flex items-center gap-x-2">
                <span className="text-[11px] text-gray-600">اختر عدد النجوم:</span>
                <div className="flex items-center gap-x-0.5">
                  {[1, 2, 3, 4, 5].map((starNum) => (
                    <button
                      type="button"
                      key={starNum}
                      onClick={() => setRatingInput(starNum)}
                      className="p-0 border-0 bg-transparent cursor-pointer outline-none"
                    >
                      <Star 
                        className={`w-5 h-5 transition-transform hover:scale-110 ${
                          starNum <= ratingInput ? 'fill-amber-400 stroke-amber-400' : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text */}
              <div>
                <label className="text-[11px] text-gray-600 block mb-1">تعليقك وتجربتك للسلعة:</label>
                <textarea 
                  rows={2}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="اكتب هنا تجربتك الصريحة للمنتج لتساعد الكوادر الأخرى..."
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-amber-500 text-right"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f08804] hover:bg-[#ca8a04] text-white font-bold py-1.5 rounded text-xs select-none border-0 cursor-pointer transition-colors shadow-sm"
              >
                نشر مراجعتي الآن
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
