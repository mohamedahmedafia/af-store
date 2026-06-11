import React, { useState } from 'react';
import { X, Heart, Plus, ListPlus, Trash2, ShoppingCart, Calendar, Archive, FileEdit } from 'lucide-react';
import { Product, ShoppingList } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[]; // array of product IDs
  toggleFavorite: (productId: string) => void;
  shoppingLists: ShoppingList[];
  onCreateList: (name: string) => void;
  onDeleteList: (listId: string) => void;
  onAddToList: (listId: string, productId: string) => void;
  onRemoveFromList: (listId: string, productId: string) => void;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  favorites,
  toggleFavorite,
  shoppingLists,
  onCreateList,
  onDeleteList,
  onAddToList,
  onRemoveFromList,
  products,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'custom_lists'>('favorites');
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState<string | null>(
    shoppingLists.length > 0 ? shoppingLists[0].id : null
  );

  if (!isOpen) return null;

  // Resolve a product by ID
  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const handleCreateListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    onCreateList(newListName.trim());
    setNewListName('');
  };

  // Find active custom list
  const activeList = shoppingLists.find((l) => l.id === selectedListId) || shoppingLists[0];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl">
      <div 
        className="bg-[#fcfdfd] w-[95%] max-w-2xl rounded-lg shadow-2xl overflow-hidden relative max-h-[88vh] flex flex-col border border-gray-150 animate-fade-in"
        id="wishlist-modal-card"
      >
        {/* Top Header */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150">
          <div className="flex items-center gap-x-2">
            <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            <span className="text-sm md:text-base font-extrabold text-white">إدارة قوائم التسوق والمفضلات الشخصية</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Links */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 p-2 gap-x-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 flex items-center justify-center gap-x-1.5 py-2 px-3 rounded-md text-xs font-bold transition-all border cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-white border-gray-200 text-[#0d9488] shadow-xs'
                : 'bg-transparent border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> مفضلاتي الافتراضية ({favorites.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('custom_lists');
              if (shoppingLists.length > 0 && !selectedListId) {
                setSelectedListId(shoppingLists[0].id);
              }
            }}
            className={`flex-1 flex items-center justify-center gap-x-1.5 py-2 px-3 rounded-md text-xs font-bold transition-all border cursor-pointer ${
              activeTab === 'custom_lists'
                ? 'bg-white border-gray-200 text-[#0d9488] shadow-xs'
                : 'bg-transparent border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <ListPlus className="w-4 h-4 text-[#e9be64]" /> قوائم تسوق مخصصة ({shoppingLists.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 flex flex-col min-h-0 bg-white">
          
          {/* A. Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="flex-1 flex flex-col min-h-0">
              {favorites.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-gray-500 space-y-3">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-400">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800">قائمة مفضلاتك فارغة حالياً</p>
                    <p className="text-xs text-gray-400">اضغط على أيقونة القلب ❤️ على أي منتج لحفظه هنا للمراجعة والشراء اللاحق.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                  {favorites.map((itemId) => {
                    const prod = getProductById(itemId);
                    if (!prod) return null;
                    return (
                      <div 
                        key={itemId}
                        className="flex border border-gray-150 rounded-lg p-3 bg-white hover:shadow-md transition-all gap-x-3 text-right group relative"
                      >
                        <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center shrink-0">
                          {prod.image.startsWith('http') || prod.image.startsWith('data:') ? (
                            <img src={prod.image} alt={prod.title} className="w-14 h-14 object-contain" referrerPolicy="no-referrer" />
                          ) : (
                            <span className="text-xl">🎁</span>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 line-clamp-1 pb-1">{prod.title}</h4>
                            <span className="text-xs font-black text-[#0d9488] block">{prod.price.toLocaleString()} ج.م</span>
                          </div>

                          <div className="flex items-center gap-x-2 pt-2">
                            <button
                              onClick={() => onAddToCart(prod, 1)}
                              className="bg-teal-50 hover:bg-teal-100 text-[#0d9488] font-bold py-1 px-2.5 rounded text-[10px] cursor-pointer border-0 flex items-center gap-x-1"
                            >
                              <ShoppingCart className="w-3 h-3" /> نقل للعربة
                            </button>
                            <button
                              onClick={() => toggleFavorite(prod.id)}
                              className="text-gray-400 hover:text-red-500 bg-transparent border-0 cursor-pointer text-xs flex items-center gap-x-0.5"
                              title="إزالة من المفضلات"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> إزالة
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* B. Custom Lists Tab */}
          {activeTab === 'custom_lists' && (
            <div className="flex-1 flex flex-col md:flex-row gap-5 min-h-0">
              
              {/* Left Column: Create & Select List */}
              <div className="w-full md:w-56 space-y-4 shrink-0 flex flex-col border-b md:border-b-0 md:border-l border-gray-200 pb-4 md:pb-0 md:pl-4">
                {/* Form to create */}
                <form onSubmit={handleCreateListSubmit} className="space-y-2">
                  <label className="text-xs font-black text-gray-800 flex items-center gap-x-1">
                    <Plus className="w-4 h-4 text-[#0d9488]" /> قائمة جديدة
                  </label>
                  <div className="flex gap-x-1.5">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="اسم القائمة (مثال: مستلزمات الشواء)"
                      className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs outline-none focus:border-teal-500 bg-white"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold px-3 rounded text-xs cursor-pointer border-0 shadow-sm"
                    >
                      إضافة
                    </button>
                  </div>
                </form>

                {/* Lists array */}
                <div className="space-y-1.5 overflow-y-auto flex-1">
                  <span className="text-[10px] text-gray-400 block font-bold">قوائمك المحفوظة ({shoppingLists.length}):</span>
                  {shoppingLists.length === 0 ? (
                    <span className="text-xs text-gray-400 block text-center py-2">لا يوجد قوائم مخصصة.</span>
                  ) : (
                    shoppingLists.map((list) => {
                      const isSelected = activeList?.id === list.id;
                      return (
                        <div
                          key={list.id}
                          className={`flex items-center justify-between p-2 rounded text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50 border-teal-300 text-teal-900'
                              : 'bg-gray-50/50 hover:bg-gray-100 border-gray-200 text-gray-600'
                          }`}
                          onClick={() => setSelectedListId(list.id)}
                        >
                          <span className="truncate">{list.name}</span>
                          <div className="flex items-center gap-x-1 shrink-0">
                            <span className="text-[9px] bg-white border px-1 rounded-sm text-gray-500">
                              {list.items.length}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteList(list.id);
                                if (selectedListId === list.id) {
                                  setSelectedListId(shoppingLists.length > 1 ? shoppingLists[0].id : null);
                                }
                              }}
                              className="text-gray-400 hover:text-red-500 bg-transparent border-0 cursor-pointer"
                              title="حذف القائمة بالكامل"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Active List Item details */}
              <div className="flex-1 flex flex-col min-h-0 text-right">
                {activeList ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="border-b border-gray-150 pb-2 mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-black text-gray-900 flex items-center gap-x-1.5">
                        <Archive className="w-4 h-4 text-[#e9be64]" /> {activeList.name}
                      </h4>
                      <span className="text-xs text-gray-500">بها {activeList.items.length} سلع مضافة</span>
                    </div>

                    {activeList.items.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-10 text-center text-gray-400 space-y-2">
                        <Archive className="w-10 h-10 text-gray-200" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">هذه القائمة لا تحتوي على سلع ومشتريات</p>
                          <p className="text-[10px] text-gray-400">يمكنك إضافة أي منتج تصفحه في المعرض إلى هذه القائمة من نافذة تفاصيل السلعة.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                        {activeList.items.map((listItem) => {
                          const prod = getProductById(listItem.id);
                          if (!prod) return null;
                          return (
                            <div 
                              key={listItem.id}
                              className="flex items-center justify-between border border-gray-150 p-2.5 rounded-md text-xs bg-white text-right hover:border-gray-300 transition-all gap-x-2"
                            >
                              <div className="flex items-center gap-x-2.5 min-w-0">
                                <span className="text-base text-gray-300 shrink-0">📌</span>
                                <div className="min-w-0">
                                  <h5 className="font-extrabold text-gray-900 line-clamp-1">{prod.title}</h5>
                                  <div className="flex items-center gap-x-3 text-[10px] text-gray-400 mt-0.5">
                                    <span className="font-bold text-[#0d9488]">{prod.price.toLocaleString()} ج.م</span>
                                    <span>• أضيف بتاريخ: {listItem.addedAt}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-x-2 shrink-0">
                                <button
                                  onClick={() => onAddToCart(prod, 1)}
                                  className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-extrabold py-1 px-2 rounded-sm text-[10px] cursor-pointer border border-yellow-200"
                                >
                                  شراء السلعة
                                </button>
                                <button
                                  onClick={() => onRemoveFromList(activeList.id, prod.id)}
                                  className="text-gray-405 hover:text-red-500 bg-transparent border-0 cursor-pointer"
                                  title="إلغاء من القائمة"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-gray-400">
                    <ListPlus className="w-12 h-12 text-gray-200" />
                    <p className="text-xs font-bold mt-2">يرجى تحديد أو إنشاء قائمة شحن وتسوّق مخصصة باليمين</p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer info banner */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>شحن فوري ومؤمن على جميع العناصر المحفوظة لجميع مدن مصر 📦</span>
          <button 
            onClick={onClose}
            className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold py-1 px-4 rounded-sm cursor-pointer border-0"
          >
            العودة للمتجر
          </button>
        </div>

      </div>
    </div>
  );
};
