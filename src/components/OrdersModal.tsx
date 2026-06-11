import React from 'react';
import { X, Calendar, MapPin, Phone, Truck, DollarSign, PackageOpen } from 'lucide-react';
import { ProductSVG } from './ProductSVG';

export interface Order {
  id: string;
  date: string;
  recipientName: string;
  city: string;
  address: string;
  phone: string;
  subtotal: number;
  status: 'pending' | 'shipped' | 'delivered';
  items: {
    product: {
      id: string;
      title: string;
      image: string;
      price: number;
    };
    quantity: number;
  }[];
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 md:p-4 overflow-y-auto font-sans rtl" dir="rtl" id="orders-modal-backdrop">
      <div className="bg-[#fcfdfd] w-[95%] max-w-3xl rounded-lg shadow-2xl overflow-hidden relative max-h-[88vh] flex flex-col animate-fade-in" id="orders-modal-card">
        
        {/* Top Header */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-750">
          <div className="flex items-center gap-x-2">
            <PackageOpen className="w-5 h-5 text-[#e9be64]" />
            <span className="text-base font-extrabold text-white">سجل مشترياتك وطلباتك في عافية</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1.5 hover:bg-white/10 rounded-full border-0 bg-transparent cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Orders List */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 space-y-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-[#0d9488] shrink-0">
                <PackageOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-extrabold text-sm text-gray-900">سجل طلباتك فارغ حالياً</p>
                <p className="text-xs text-gray-500 max-w-sm">
                  أضف بعض السلع لعربتك، وقم بملء تفاصيل التوصيل واضغط "تأكيد الدفع" لتراها فوراً هنا قيد العمل والتسليم!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5" id="orders-list-view">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-right"
                >
                  {/* Order header row */}
                  <div className="bg-[#f6f6f6] px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-y-2">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <div>
                        <span className="text-gray-550 block font-normal text-[10px]">تاريخ الطلب:</span>
                        <span className="font-sans font-bold text-gray-900 flex items-center gap-x-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" /> {order.date}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-550 block font-normal text-[10px]">المجموع الكلي:</span>
                        <span className="font-sans font-extrabold text-rose-600 text-xs mt-0.5">
                          {order.subtotal.toLocaleString()} ج.م.
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-550 block font-normal text-[10px]">المرسل إليه:</span>
                        <span className="font-bold text-gray-900 block mt-0.5">{order.recipientName}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-550 block font-normal text-[10px] text-right">رقم شحنة عافية:</span>
                      <span className="font-mono text-gray-800 font-bold block mt-0.5">{order.id}</span>
                    </div>
                  </div>

                  {/* Order body detail row */}
                  <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    {/* Items on the right (6 cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <span className="text-xs font-black text-gray-500 block">السلع المشحونة:</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-x-3 items-center">
                          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded p-1 flex items-center justify-center flex-shrink-0">
                            <ProductSVG type={item.product.image} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-gray-900 line-clamp-1 leading-snug">{item.product.title}</h5>
                            <span className="text-[10px] text-gray-550">
                              الكمية: <strong className="text-gray-900 font-sans">{item.quantity}</strong> × {item.product.price.toLocaleString()} ج.م.
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address & Status (5 cols) */}
                    <div className="md:col-span-5 bg-gray-50/70 p-3 rounded-md text-xs space-y-2 border border-gray-150">
                      <div>
                        <span className="text-[10px] text-gray-550 block">حالة الشحنة الفورية:</span>
                        <span className="inline-flex items-center gap-x-1 mt-0.5 text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                          <Truck className="w-3.5 h-3.5 animate-pulse" /> جاري تجهيز الأوراق لشحنها غداً
                        </span>
                      </div>

                      <div className="pt-2 border-t border-gray-200 space-y-1 text-gray-700">
                        <div className="flex items-start gap-x-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <span>المحافظة: {order.city} - {order.address}</span>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>رقم الاتصال: {order.phone}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#f0f2f2] px-5 py-3 text-right flex justify-between items-center text-xs text-gray-500 border-t border-gray-200">
          <span>شحنات عافية مؤمنة ضد الضياع بالتعاون مع بريد مصر 🇪🇬</span>
          <button 
            onClick={onClose}
            className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-1 px-4 rounded-sm cursor-pointer border-0"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
