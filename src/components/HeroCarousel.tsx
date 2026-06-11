import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface HeroCarouselProps {
  onBannerAction: (searchKeyword: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onBannerAction }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'ابدأ رحلتك هنا',
      subtitle: 'اكتشف ملايين المنتجات الحصرية بأسعار خيالية وسرعة توصيل فائقة من عافية',
      bgType: 'neon-space',
      buttonText: 'تسوق أفضل العروض اليوم',
      keyword: 'الكل'
    },
    {
      id: 2,
      title: 'بوابة الجيمرز المحترفين',
      subtitle: 'إكسسوارات الألعاب الاحترافية وسماعات محيطية وشواش لابتوب RTX ترفع مستواك',
      bgType: 'cyber-gaming',
      buttonText: 'اكتشف إكسسوارات اللعب',
      keyword: 'إكسسوارات الألعاب'
    },
    {
      id: 3,
      title: 'مستلزمات شواء الآباء الفخمة',
      subtitle: 'كل ما تحتاجه لحفلة شواء خارجية لا تنسى من ملاقط الفولاذ والمريليات الواقية',
      bgType: 'warm-barbeque',
      buttonText: 'تجهيزات الشواء الكاملة',
      keyword: 'الشواء'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] overflow-hidden select-none bg-[#090b11] rtl" dir="rtl" id="afia-hero-carousel">
      
      {/* Slides view container */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;

        // Custom high-quality CSS gradient backdrops reflecting the requested visual formats
        let bgStyle = 'linear-gradient(135deg, #091326 0%, #112240 50%, #1d335a 100%)';
        if (slide.bgType === 'neon-space') {
          // Dark space cyber trailing neon lines (like in the user screenshot)
          bgStyle = 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(13, 148, 136, 0.15) 35%, rgba(6, 182, 212, 0.2) 75%, rgba(15, 23, 42, 0.95) 100%), radial-gradient(circle at 10% 20%, #030712 0%, #0c1524 100%)';
        } else if (slide.bgType === 'cyber-gaming') {
          bgStyle = 'linear-gradient(120deg, rgba(168, 85, 247, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(15, 17, 26, 0.95) 100%), #020408';
        } else if (slide.bgType === 'warm-barbeque') {
          bgStyle = 'linear-gradient(120deg, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.15) 60%, rgba(15, 23, 42, 0.95) 100%), #090302';
        }

        return (
          <div
            key={slide.id}
            style={{ backgroundImage: bgStyle }}
            className={`absolute inset-0 w-full h-full xl:justify-center flex flex-col justify-start pt-12 md:pt-16 pb-20 px-8 md:px-20 transition-all duration-700 ease-in-out ${
              isActive ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-12 scale-[1.01] pointer-events-none'
            }`}
          >
            {/* Ambient visual overlay accents */}
            {slide.bgType === 'neon-space' && (
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Horizontal glowing neon light streaks */}
                <div className="absolute top-[25%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-sm"></div>
                <div className="absolute top-[50%] left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent blur-sm animate-pulse-slow"></div>
                <div className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-xs"></div>
              </div>
            )}

            {/* Slide Content Box */}
            <div className="max-w-2xl text-right z-20" id={`slide-content-${slide.id}`}>
              <h1 
                className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 md:mb-4 tracking-tight drop-shadow-lg animate-fade-in"
                style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}
              >
                {slide.title}
              </h1>
              <p className="text-gray-200 text-sm md:text-lg mb-4 md:mb-6 max-w-xl font-medium drop-shadow-md leading-relaxed hidden sm:block">
                {slide.subtitle}
              </p>
              <button
                onClick={() => onBannerAction(slide.keyword)}
                className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold text-[12px] md:text-[14px] py-1.5 md:py-2.5 px-4 md:px-7 rounded-sm shadow-md transition-all duration-150 hover:scale-[1.02] border-0 cursor-pointer"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Arrow Buttons */}
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/10 hover:bg-black/35 rounded text-white border-0 cursor-pointer z-20 outline-none hover:scale-105 transition-all"
        aria-label="الصفحة التالية"
        id="hero-btn-next"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/10 hover:bg-black/35 rounded text-white border-0 cursor-pointer z-20 outline-none hover:scale-105 transition-all"
        aria-label="الصفحة السابقة"
        id="hero-btn-prev"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Position dots indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-x-2 z-25">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-150 border-0 outline-none ${
              idx === currentSlide ? 'bg-[#e9be64] w-6' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>

      {/* Decorative gradient overlay fading out bottom of the hero carousel */}
      <div className="absolute bottom-0 left-0 w-full h-[85px] bg-gradient-to-t from-[#eaeded] via-[#eaeded]/50 to-transparent z-15 pointer-events-none"></div>
    </div>
  );
};
