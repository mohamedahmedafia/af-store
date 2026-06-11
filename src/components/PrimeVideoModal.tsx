import React, { useState } from 'react';
import { X, Play, Pause, Tv, Film, Flame, Star, Volume2, Maximize, Clock } from 'lucide-react';

interface PrimeVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Movie {
  id: string;
  title: string;
  duration: string;
  category: string;
  rating: number;
  year: string;
  desc: string;
  thumbnail: string;
  embedSrc?: string;
}

export const PrimeVideoModal: React.FC<PrimeVideoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [playerProgress, setPlayerProgress] = useState(35);

  if (!isOpen) return null;

  const movies: Movie[] = [
    {
      id: 'm-1',
      title: 'أسرار المشويات وعالم الفحم مع المعلمين 🍖',
      duration: 'ساعة و ٢٤ دقيقة',
      category: 'طهي وشواء الآباء',
      rating: 4.9,
      year: '2026',
      desc: 'دوار شامل وتوجيهات عملية خطوة بخطوة للتحكم التام في نيران الفحم ونوع اللحم وتتبيله للحصول على أفضل مذاق شواء في عطلات الصيف العائلية.',
      thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'm-2',
      title: 'رحلة في أعماق العقل والوعي الصحي والنفسي 🧠',
      duration: '٤٨ دقيقة',
      category: 'الصحة والطب المعاصر',
      rating: 4.8,
      year: '2025',
      desc: 'فيلم وثائقي يستكشف تأثير الحياة الحديثة على النوم وجودة التركيز، ويقدم حلول ممتازة من خبراء علم الأعصاب لتحقيق التوازن العقلي والبدني.',
      thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'm-3',
      title: 'أبطال الغابة الصغار ومغامرة البحث عن الكنز المفقود 🧸',
      duration: 'ساعة و ١٢ دقيقة',
      category: 'أفلام أطفال وعائلة',
      rating: 4.7,
      year: '2026',
      desc: 'فيلم رسوم متحركة ممتع وتربوي يروي قصة مجموعة من الحيوانات اللطيفة التي تتعاون معاً لحل الألغاز وإنقاذ غابتهم الجميلة من المخاطر.',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'm-4',
      title: 'بريداتور وأقوى بطاقات الرسوميات في العصر الرقمي 💻',
      duration: '٣٥ دقيقة',
      category: 'إلكترونيات والمستقبل',
      rating: 4.9,
      year: '2026',
      desc: 'استعراض دقيق وخاص للجيل القادم من تقنيات الذكاء الاصطناعي وبطاقات RTX 4080 ومستقبل عوالم الألعاب والميتافيرس ثلاثي الأبعاد.',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    }
  ];

  const handleMoviePick = (movie: Movie) => {
    setActiveMovie(movie);
    setIsPlaying(true);
    setPlayerProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl" id="prime-video-modal-wrapper">
      <div className="bg-[#090d16] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative border border-gray-800 max-h-[92vh] flex flex-col text-white animate-fade-in">
        
        {/* Top Header Row */}
        <div className="bg-[#111827] px-6 py-4 flex items-center justify-between border-b border-gray-850 shrink-0">
          <div className="flex items-center gap-x-2.5">
            <Tv className="w-6 h-6 text-[#0d9488] animate-pulse" />
            <div className="flex flex-col text-right">
              <span className="text-base font-black text-white flex items-center gap-x-1.5">
                برايم فيديو عافية <span className="bg-[#0d9488] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Prime</span>
              </span>
              <span className="text-[9px] text-gray-400 font-bold -mt-0.5">البث الترفيهي والصحي الموثوق وبدون إعلانات</span>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-transparent border-0 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Outer scroll box split */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Active Video Player View (Top section if movie selected) */}
          {activeMovie ? (
            <div className="bg-black/90 p-4 rounded-xl border border-teal-900/40 shadow-inner space-y-4 animate-scale-up">
              
              {/* Fake Interactive Screen player */}
              <div className="relative w-full aspect-video bg-gray-950 rounded-lg overflow-hidden flex flex-col items-center justify-center border border-gray-900">
                
                {/* Background image preview dimmed */}
                <img 
                  src={activeMovie.thumbnail}
                  alt={activeMovie.title}
                  className={`absolute inset-0 w-full h-full object-cover opacity-35 filter blur-xs ${isPlaying ? 'animate-pulse' : ''}`}
                />

                {/* Status indicators */}
                <div className="absolute top-3 right-3 bg-black/60 px-2.5 py-1 rounded text-[10px] font-bold text-[#e9be64] border border-amber-500/20 z-10">
                  بث مباشر بجودة UltraHD HDR 4K 📺
                </div>

                {/* Center Control / Play states */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#115e59]/90 hover:bg-[#0d4f4b] text-white flex items-center justify-center border-0 cursor-pointer shadow-2xl relative z-10 transition-transform hover:scale-110 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white fill-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Overlay text in player bottom */}
                <div className="absolute bottom-12 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-3 text-right z-10">
                  <h4 className="text-sm font-black text-white">{activeMovie.title}</h4>
                  <p className="text-[10px] text-gray-300 mt-0.5 line-clamp-1">{activeMovie.desc}</p>
                </div>

                {/* Custom Responsive Video Player Bar Controllers */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#111827]/95 p-3 flex items-center justify-between gap-x-4 border-t border-gray-800 z-15">
                  <button 
                    type="button"
                    onClick={togglePlay}
                    className="p-1 rounded hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer border-0 bg-transparent shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Range timeline */}
                  <div className="flex-1 flex items-center gap-x-2">
                    <span className="text-[9px] font-mono text-gray-400">03:15</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full relative cursor-pointer group">
                      <div 
                        className="h-full bg-[#0d9488] rounded-full relative"
                        style={{ width: `${playerProgress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow"></div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-gray-400">12:45</span>
                  </div>

                  {/* Volume Slider */}
                  <div className="hidden sm:flex items-center gap-x-2 shrink-0">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="w-16 h-1 bg-gray-700 accent-[#0d9488] cursor-pointer"
                    />
                  </div>

                  <button 
                    type="button"
                    className="p-1 rounded hover:bg-gray-800 text-gray-300 hover:text-white cursor-pointer border-0 bg-transparent shrink-0"
                    title="ملء الشاشة"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Under details */}
              <div className="text-right border-b border-gray-800 pb-3">
                <div className="flex items-center gap-x-3 text-xs text-gray-400 mt-1">
                  <span className="font-extrabold text-[#e9be64]">{activeMovie.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-x-0.5"><Clock className="w-3.5 h-3.5" /> {activeMovie.duration}</span>
                  <span>•</span>
                  <span>إصدار {activeMovie.year}</span>
                  <span>•</span>
                  <span className="flex items-center gap-x-0.5 text-amber-400 font-bold"><Star className="w-3.5 h-3.5 fill-amber-400" /> {activeMovie.rating}</span>
                </div>
                <h3 className="text-base font-black text-white mt-2">{activeMovie.title}</h3>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">{activeMovie.desc}</p>
              </div>

            </div>
          ) : (
            // Landing Trailer promo banner
            <div className="bg-gradient-to-l from-slate-900 to-[#121c2e] p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg text-right order-2 md:order-1">
                <span className="text-[10px] text-[#e9be64] font-black uppercase tracking-widest flex items-center gap-x-1">
                  <Tv className="w-3.5 h-3.5" /> البث المتنقل المتميز للأعضاء
                </span>
                <h3 className="text-base md:text-lg font-black text-white">شاهد أقوى المسلسلات والأفلام والوثائقيات الصحية مجاناً بالكامل!</h3>
                <p className="text-xs text-gray-300 leading-normal">
                  بصفتك ضيفاً أو عضواً مسجلاً في عائلة عافية بمصر، يمكنك الآن الاستمتاع ببث فوري غير محدود لمئات الساعات من مقاطع الطهي العائلي للأمهات والآباء بالإضافة لوثائقيات الصحة العامة والتمارين.
                </p>
                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => handleMoviePick(movies[0])}
                    className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-5 py-2.5 rounded-lg text-xs font-black cursor-pointer border-0 shadow-lg flex items-center gap-x-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> ابدأ تشغيل أهم الموصى به الآن
                  </button>
                </div>
              </div>
              <div className="w-full md:w-64 aspect-video md:aspect-auto md:h-36 rounded-lg overflow-hidden border border-slate-700 shadow-2xl shrink-0 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=350&q=80" 
                  alt="BBQ Master"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Media Slider Library Section */}
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-x-1">
              <Film className="w-4 h-4 text-gray-400" /> مكتبة البث المباشر المتاحة حالياً:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => handleMoviePick(movie)}
                  className="group bg-[#111827] hover:bg-[#1f2937] rounded-lg overflow-hidden border border-gray-800 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full bg-gray-950 overflow-hidden">
                    <img 
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-75"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-[#0d9488]/90 text-white flex items-center justify-center shadow">
                        <Play className="w-5 h-5 fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 text-right">
                    <span className="text-[9px] text-[#e9be64] font-black">{movie.category}</span>
                    <h5 className="text-xs font-black text-white line-clamp-2 mt-1 leading-tight group-hover:text-[#0d9488] transition-colors">{movie.title}</h5>
                    <div className="flex items-center gap-x-1.5 text-[9px] text-gray-400 mt-2">
                      <span className="font-extrabold">{movie.duration}</span>
                      <span>•</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#111827] border-t border-gray-850 px-6 py-4 flex items-center justify-between shrink-0 text-xs text-gray-500">
          <p>© 2026 عافية ميديا المحدودة. جميع الحقوق حصرية ومحمية لمالكيها.</p>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold px-4 py-1.5 rounded text-xs select-none cursor-pointer border-0"
          >
            إغلاق التلفاز برايم
          </button>
        </div>

      </div>
    </div>
  );
};
