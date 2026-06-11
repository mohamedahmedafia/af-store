import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { CartItem, Product } from '../types';
import { ProductSVG } from './ProductSVG';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (shippingDetails: { name: string; city: string; address: string; phone: string }) => void;
  selectedCity: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  selectedCity,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingName, setShippingName] = useState('');
  const [shippingCity, setShippingCity] = useState(selectedCity);
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName.trim() || !shippingAddress.trim() || !shippingPhone.trim()) return;

    onCheckout({
      name: shippingName,
      city: shippingCity,
      address: shippingAddress,
      phone: shippingPhone,
    });

    // Reset checkout form and close
    setIsCheckingOut(false);
    setShippingName('');
    setShippingAddress('');
    setShippingPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans rtl" dir="rtl" id="cart-drawer-backdrop">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content right slide */}
      <div className="relative w-full max-w-md bg-[#fcfdfd] h-full shadow-2xl z-10 flex flex-col justify-between animate-slide-left border-r border-gray-200">
        
        {/* Top Header */}
        <div className="bg-[#0d3230] text-white px-5 py-4 flex items-center justify-between border-b border-teal-850">
          <div className="flex items-center gap-x-2">
            <ShoppingBag className="w-5 h-5 text-[#e9be64]" />
            <span className="text-base font-extrabold text-white">عربة تسوق عافية ({totalCount})</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 hover:bg-white/10 rounded-full border-0 bg-transparent cursor-pointer"
            aria-label="إغلاق العربة"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Inner Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Checkout views overlay */}
          {isCheckingOut ? (
            <div className="space-y-4 text-right animate-fade-in" id="checkout-form-container">
              <button 
                onClick={() => setIsCheckingOut(false)}
                className="flex items-center gap-x-1.5 text-xs font-black text-[#0d9488] hover:text-[#e9be64] border-0 bg-transparent cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" /> العودة لمراجعة المنتجات في العربة
              </button>

              <h3 className="text-base font-bold text-gray-900 border-b border-gray-150 pb-2">عنوان شحن وتوصيل الطلبية</h3>
              
              <form onSubmit={handleSubmitCheckout} className="space-y-3 pt-1">
                {/* Name */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">اسم المستلم رباعي:</label>
                  <input 
                    type="text"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="امثلة: محمد عفية عيسى"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500"
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">المحافظة / المدينة:</label>
                  <select 
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs outline-none focus:border-teal-500 cursor-pointer"
                  >
                    <option value="القاهرة">القاهرة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="المنصورة">المنصورة / الدقهلية</option>
                    <option value="أسوان">أسوان</option>
                    <option value="بورسعيد">بورسعيد</option>
                    <option value="طنطا">طنطا / الغربية</option>
                    <option value="الإسماعيلية">الإسماعيلية</option>
                    <option value="الفيوم">الفيوم</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">العنوان التفصيلي بالتفصيل:</label>
                  <input 
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="رقم الشارع، المبنى، الدور، رقم الشقة"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">رقم الهاتف للتواصل الفوري:</label>
                  <input 
                    type="tel"
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="مثال: 01012345678"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-teal-500"
                    required
                  />
                </div>

                {/* Pricing totals review */}
                <div className="bg-gray-50 rounded p-3 border border-gray-150 text-xs mt-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span>مجموع المنتجات:</span>
                    <span className="font-sans font-bold">{subtotal.toLocaleString()} ج.م.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مصاريف الشحن والتوصيل غداً:</span>
                    <span className="text-green-700 font-extrabold text-xs">مـجـانـي (عرض عافية)</span>
                  </div>
                  <div className="border-t border-gray-200 my-1 pt-1.5 flex justify-between text-sm font-extrabold">
                    <span>المبلغ الكلي المستحق:</span>
                    <span className="text-rose-600 font-sans">{subtotal.toLocaleString()} ج.م.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-[#e9be64] hover:bg-[#d8a846] text-white font-extrabold py-2 px-4 rounded-sm text-xs text-center border-0 cursor-pointer shadow flex items-center justify-center gap-x-2 select-none"
                    id="submit-order-btn"
                  >
                    <CreditCard className="w-4 h-4" /> تأكيد الدفع نقداً عند الاستلام وشحن الطلب
                  </button>
                  <span className="text-[10px] text-gray-400 text-center block mt-2">
                    🛡️ معاملة مشفرة وآمنة بنسبة 100%. الدفع عند الاستلام متاح في كافة أنحاء مصر.
                  </span>
                </div>
              </form>
            </div>
          ) : (
            // Cart items view
            <>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-80 text-center text-gray-500 space-y-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm">عربتك فارغة تماماً حالياً</p>
                    <p className="text-xs">تصفح أقسام عافية وأضف منتجاتك المفضلة لبدء التسوق!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="mt-3 bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold py-1.5 px-4 rounded-sm cursor-pointer border-0"
                  >
                    تصفح المنتجات الآن
                  </button>
                </div>
              ) : (
                <div className="space-y-3" id="cart-drawer-items-list">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="bg-white p-3 rounded-md border border-gray-150 flex gap-x-3 text-right"
                    >
                      {/* Product visualization thumbnail */}
                      <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded flex-shrink-0 p-1 flex items-center justify-center">
                        <ProductSVG type={item.product.image} className="w-full h-full object-contain" />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 
                            className="text-xs font-bold text-gray-950 line-clamp-2 leading-tight hover:text-[#0d9488] cursor-pointer"
                            onClick={() => onRemoveItem(item.product.id)}
                            title={item.product.title}
                          >
                            {item.product.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{item.product.category}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs font-black text-rose-600 font-sans">{(item.product.price * item.quantity).toLocaleString()} ج.م.</div>
                          
                          {/* Quantity control button layouts */}
                          <div className="flex items-center gap-x-2 bg-gray-50 rounded border border-gray-200">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-1.5 py-1 text-gray-600 hover:bg-gray-150 disabled:opacity-30 border-0 bg-transparent cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-extrabold text-gray-900 font-sans min-w-[12px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-1.5 py-1 text-gray-600 hover:bg-gray-150 border-0 bg-transparent cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Delete button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-650 border-0 bg-transparent cursor-pointer p-1"
                            title="حذف هذا البند"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

        {/* Bottom Subtotal & CTAs */}
        {cart.length > 0 && (
          <div className="bg-[#f0f2f2] border-t border-gray-200 p-4 space-y-3 text-right">
            {!isCheckingOut ? (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium font-sans">
                    المجموع الكلي ({totalCount} سلع):
                  </span>
                  <span className="text-lg font-black text-rose-600 font-sans">
                    {subtotal.toLocaleString()} ج.م.
                  </span>
                </div>

                <div className="bg-emerald-50 text-[11px] text-emerald-800 p-2.5 rounded border border-emerald-250 flex items-center gap-x-1.5 font-medium leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-emerald-605 mt-0.5 shrink-0" />
                  <span>مبروك! طلبيتك مؤهلة للـ <strong>توصيل والشحن المجاني</strong> بالكامل لباب المنزل! 🚚</span>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold py-2.5 px-4 rounded-full text-xs text-center border-0 cursor-pointer shadow transition-all duration-150 flex items-center justify-center gap-x-1.5"
                    id="trigger-checkout-form-btn"
                  >
                    إتمام الشراء والدفع عند الاستلام
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
};
