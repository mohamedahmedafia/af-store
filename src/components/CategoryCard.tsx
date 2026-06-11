import React from 'react';
import { ProductSVG } from './ProductSVG';

interface CategoryCardProps {
  onSelectProduct: (productId: string) => void;
  onExploreCategory: (categoryName: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ onSelectProduct, onExploreCategory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4 bg-transparent relatived select-none rtl" dir="rtl" id="afia-bento-grids">
      
      {/* CARD 1: تسوق حسب الفئة */}
      <div className="bg-white p-5 rounded-sm shadow-md flex flex-col justify-between border border-gray-100 group transition-all duration-200 hover:shadow-lg" id="card-shop-by-category">
        <div>
          <h2 className="text-[21px] font-extrabold text-gray-900 leading-6 tracking-tight mb-4">تسوق حسب الفئة</h2>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            
            {/* 1. أجهزة الكمبيوتر وملحقاتها */}
            <div 
              onClick={() => onSelectProduct('pc-1')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-sky-50 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="gaming-laptop" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">أجهزة الكمبيوتر وملحقاتها</span>
            </div>

            {/* 2. ألعاب الفيديو */}
            <div 
              onClick={() => onSelectProduct('console-1')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-sky-50 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="ps4-console" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">ألعاب الفيديو</span>
            </div>

            {/* 3. الأطفال */}
            <div 
              onClick={() => onSelectProduct('baby-1')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-sky-50 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="baby-monitor" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">الأطفال</span>
            </div>

            {/* 4. لعب الأطفال والألعاب */}
            <div 
              onClick={() => onSelectProduct('toy-1')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-sky-50 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="lol-toy" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">لعب الأطفال والألعاب</span>
            </div>

          </div>
        </div>

        <button 
          onClick={() => onExploreCategory('أجهزة الكمبيوتر وملحقاتها')}
          className="text-xs font-bold text-cyan-700 text-right mt-6 hover:text-amber-600 hover:underline border-0 bg-transparent cursor-pointer self-start"
        >
          تسوق الآن وكل الفئات
        </button>
      </div>

      {/* CARD 2: إكسسوارات الألعاب */}
      <div className="bg-white p-5 rounded-sm shadow-md flex flex-col justify-between border border-gray-100 group transition-all duration-200 hover:shadow-lg" id="card-gaming-accessories">
        <div>
          <h2 className="text-[21px] font-extrabold text-gray-900 leading-6 tracking-tight mb-4">إكسسوارات الألعاب</h2>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            
            {/* 1. السماعات */}
            <div 
              onClick={() => onSelectProduct('key-1')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-[#fff9f3] rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="gaming-headset" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">السماعات</span>
            </div>

            {/* 2. لوحات المفاتيح */}
            <div 
              onClick={() => onSelectProduct('key-2')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-[#fff9f3] rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="gaming-keyboard" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">لوحات المفاتيح</span>
            </div>

            {/* 3. ماوسات الكمبيوتر */}
            <div 
              onClick={() => onSelectProduct('key-3')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-[#fff9f3] rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="gaming-mouse" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">ماوسات الكمبيوتر</span>
            </div>

            {/* 4. الكراسي */}
            <div 
              onClick={() => onSelectProduct('key-4')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-[#fff9f3] rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="gaming-chair" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">الكراسي</span>
            </div>

          </div>
        </div>

        <button 
          onClick={() => onExploreCategory('إكسسوارات الألعاب')}
          className="text-xs font-bold text-cyan-700 text-right mt-6 hover:text-amber-600 hover:underline border-0 bg-transparent cursor-pointer self-start"
        >
          شاهد المزيد من مستلزمات الجيمينج
        </button>
      </div>

      {/* CARD 3: ألعاب أطفال من فائض تخزين المصانع */}
      <div className="bg-white p-5 rounded-sm shadow-md flex flex-col justify-between border border-gray-100 group transition-all duration-200 hover:shadow-lg" id="card-surplus-toys">
        <div 
          className="cursor-pointer flex flex-col h-full justify-between"
          onClick={() => onSelectProduct('surplus-1')}
        >
          <div>
            <h2 className="text-[21px] font-extrabold text-gray-900 leading-6 tracking-tight mb-4">ألعاب أطفال من فائض تخزين المصانع</h2>
            
            {/* The multi-stacked adorable penguins shown in the screenshot */}
            <div className="w-full h-56 bg-[#fcfeff] rounded-md p-4 flex items-center justify-center border border-gray-50 hover:bg-sky-50/50 transition-colors">
              <ProductSVG type="stacked-penguins" className="w-full h-full max-h-[190px] transition-transform duration-350 hover:scale-[1.03]" />
            </div>
            
            <p className="text-xs text-gray-500 mt-2 font-normal leading-relaxed text-right">
              سلسلة الدمى الدافئة ومجسّمات الطيور المكدسة من المصنع مباشرة بجودة فائقة وخامات قطنية ممتازة للأطفال الرضع.
            </p>
          </div>

          <span className="text-xs font-bold text-cyan-700 text-right mt-6 hover:text-amber-600 hover:underline block">
            اطلب الآن بخصم ٤٠٪ من الفائض
          </span>
        </div>
      </div>

      {/* CARD 4: الأدوات الضرورية للشواء للآباء */}
      <div className="bg-white p-5 rounded-sm shadow-md flex flex-col justify-between border border-gray-100 group transition-all duration-200 hover:shadow-lg" id="card-grill-essentials">
        <div>
          <h2 className="text-[21px] font-extrabold text-gray-900 leading-6 tracking-tight mb-4 text-right">الأدوات الضرورية للشواء للآباء</h2>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            
            {/* 1. مآزر */}
            <div 
              onClick={() => onSelectProduct('grill-1')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-amber-50/30 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="grill-apron" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">مآزر للشواء</span>
            </div>

            {/* 2. صواني الشواء */}
            <div 
              onClick={() => onSelectProduct('grill-2')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-amber-50/30 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="grill-pan" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">صواني الشواء</span>
            </div>

            {/* 3. قفازات */}
            <div 
              onClick={() => onSelectProduct('grill-3')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-amber-50/30 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="grill-gloves" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">قفازات حرارية</span>
            </div>

            {/* 4. أدوات الشواء */}
            <div 
              onClick={() => onSelectProduct('grill-4')}
              className="flex flex-col cursor-pointer hover:opacity-90 group/item"
            >
              <div className="w-full aspect-square bg-[#f5f7fa] hover:bg-amber-50/30 rounded-md p-2 flex items-center justify-center border border-gray-100 transition-colors">
                <ProductSVG type="grill-tools" className="w-[85px] h-[85px] transition-transform duration-200 group-hover/item:scale-105" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 mt-1 hover:text-amber-600 transition-all text-right">أدوات الشواء</span>
            </div>

          </div>
        </div>

        <button 
          onClick={() => onExploreCategory('الأدوات الضرورية للشواء للآباء')}
          className="text-xs font-bold text-cyan-700 text-right mt-6 hover:text-amber-600 hover:underline border-0 bg-transparent cursor-pointer self-start"
        >
          شاهد كامل مستلزمات الحفلة
        </button>
      </div>

    </div>
  );
};
