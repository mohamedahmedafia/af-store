import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, CheckCircle2 } from 'lucide-react';
import { ALL_PRODUCTS } from '../data';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onSearchProduct: (query: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchProduct,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: 'أهلاً بك يا فندم في منصة عافية (Afia.eg) للتسوق الذكي! 🌟 أنا مساعدك الشخصي المدعوم بالذكاء الاصطناعي.\n\nتقدر تسألني عن أي حاجة بتدور عليها، زي إكسسوارات الألعاب للشباب، ألعاب الأطفال فائضة المصانع، أو أدوات الشواء الاحترافية للآباء! كيف يمكنني إسعادك اليوم؟',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    '🚚 مواعيد التوصيل لمصر',
    '🎮 عروض لابتوب بريداتور والألعاب',
    '🥩 هدايا شواء مميزة للآباء',
    '🐧 دمى البطريق فائضة المصانع',
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    // 1. Delivery & Address
    if (text.includes('توصيل') || text.includes('شحن') || text.includes('مصر') || text.includes('محافظة') || text.includes('شوان')) {
      return 'يا فندم، عافية بتوفر شحن مجاني وسريع جداً لجميع محافظات جمهورية مصر العربية (القاهرة، الجيزة، الإسكندرية، المنصورة، طنطا، وحتى أسوان)! 🇪🇬\n\nالطلبات المؤكدة بيتم شحنها وبتوصيلها لباب بيتك غداً مباشرة مع ضمان الدفع عند الاستلام لمنع أي قلق!';
    }

    // 2. Headsets & Gaming Keyboards (Gaming accessories)
    if (text.includes('لعب') || text.includes('جيم') || text.includes('لابتوب') || text.includes('كمبيوتر') || text.includes('سماعة') || text.includes('كيبورد') || text.includes('ماوس') || text.includes('كرسي')) {
      return 'يا سلام! قسم الألعاب والجيمينج في عافية ملوش مثيل! 🔥\n\nعندنا حالياً عرض جبار على:\n1. كمبيوتر بريداتور المتطور بكرت شاشة RTX 4080 القوي.\n2. سماعة المحيطية 7.1 بإضاءة نيون بسعر 1,599 ج.م.\n3. لوحات مفاتيح ميكانيكية بنقرات Blue Switches زرقاء.\n\nحابب أعرضلك مواصفات أي حاجة منهم فوراً؟';
    }

    // 3. BBQ & Aprons & Grilling for dads
    if (text.includes('شواء') || text.includes('لحم') || text.includes('مريلة') || text.includes('صينية') || text.includes('قفاز') || text.includes('أدوات الشواء') || text.includes('شويه')) {
      return 'أوه، الأدوات الضرورية للشواء للآباء! 🥩 المفضل لدي!\n\nعندنا مريلة شواء متينة مقاومة للشرر مع جيوب ممتازة للوازم، وكمان صينية شواء ألومنيوم ثقيل بـ 780 ج.م. مع يد زان تمنع الحرارة.\n\nتقدر تضغط على صور الأدوات في الصفحة الرئيسية تحت بند "الأدوات الضرورية للشواء" وتاخد شرح مفصل عنها أو تضيفها فوراً للسلة لشواء عائلي دافئ!';
    }

    // 4. Stuffed penguins & toys
    if (text.includes('بطريق') || text.includes('فائض') || text.includes('لعبة') || text.includes('اطفال') || text.includes('أطفال') || text.includes('بنات')) {
      return 'يا فندم، البطاريق المكدسة فائضة المصنع مكسرة الدنيا عندنا! 🐧\n\nعبارة عن ٣ طبقات من طيور البطريق المحشوة بقطيفة ناعمة وقطن طبيعي مانع للحساسية بارتفاع 45 سم. ممتازة جداً للأطفال الرضع وملمسها ناعم زي الحرير بسعر خاص جداً (360 ج.م.) بدل 550 ج.م.\n\nاضغط عليها في الواجهة الرئيسية لمشاهدة التفاصيل وقراءة تقييمات الأمهات!';
    }

    // 5. General search and listings
    if (text.includes('عرض') || text.includes('خصم') || text.includes('تخفيض') || text.includes('رخيص')) {
      return 'عافية دايماً منبع الخصومات! 🎉\n\nعندنا خصومات تصل لـ ٥٠٪ على السلع الإلكترونية زي سماعة الأستوديو الاحترافية العازلة للصوت وعافية بريداتور لابتوب.\n\nاكتب اسم السلعة في مربع البحث فوق بالهيدر "بحث في Afia" وهيتم فلترة المنتجات المتاحة ليك فوراً بأقوى الأسعار!';
    }

    // 6. Generic welcome
    return 'تحت أمرك يا فندم! أنا هنا في خدمتكم دائماً. تقدر تسألني عن مواصفات المنتجات، الاسترجاع، الشحن، أو طريقة الدفع نقداً عند الاستلام. عافية بتتمنالك تسوق مبهج وسعيد! 🥰';
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 2. Generate bot response with timeout simulation
    setTimeout(() => {
      const responseText = getBotResponse(textToSend);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Perform helpful action in backend if matches keywords
      if (textToSend.includes('بريداتور') || textToSend.includes('لابتوب')) {
        onSearchProduct('بريداتور');
      } else if (textToSend.includes('بطريق')) {
        onSearchProduct('البطريق');
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 w-[92%] sm:w-[380px] bg-white rounded-lg shadow-2xl border border-teal-200 overflow-hidden flex flex-col font-sans rtl h-[500px]" dir="rtl" id="ai-assistant-card">
      
      {/* Bot Header (Ambient Teal Theme) */}
      <div className="bg-[#0d3230] p-3.5 text-white flex items-center justify-between border-b border-teal-800/30">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <Bot className="w-6 h-6 text-teal-300" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0d3230]"></span>
          </div>
          <div>
            <h3 className="text-xs font-black tracking-tight flex items-center gap-x-1">
              مُساعد عافية الذكي <Sparkles className="w-3.5 h-3.5 text-[#e9be64] animate-spin-slow" />
            </h3>
            <span className="text-[10px] text-teal-150 block">نشط حالياً بالذكاء الاصطناعي لمساعدتك ⚡</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full border-0 bg-transparent cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages scroll content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f8f9fc]" id="ai-assistant-messages">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div 
              key={msg.id}
              className={`flex items-start gap-x-2 max-w-[85%] ${isBot ? 'ml-auto' : 'mr-auto flex-row-reverse'}`}
            >
              {/* Avatar circle */}
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 text-[10px] font-bold ${
                  isBot ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {isBot ? <Bot className="w-3.5 h-3.5 text-teal-700" /> : <User className="w-3.5 h-3.5 text-amber-700" />}
              </div>

              {/* Message text block */}
              <div 
                className={`p-3 rounded-lg text-xs leading-relaxed font-medium whitespace-pre-line ${
                  isBot 
                    ? 'bg-white text-gray-800 rounded-tr-none border border-gray-150 shadow-xs' 
                    : 'bg-[#155e58] text-white rounded-tl-none shadow-xs'
                }`}
              >
                {msg.text}
                <span className={`block text-[8px] mt-1 text-left ${isBot ? 'text-gray-400' : 'text-teal-200'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing simulator indicator */}
        {isTyping && (
          <div className="flex items-start gap-x-2 max-w-[85%] ml-auto">
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-teal-700" />
            </div>
            <div className="bg-white p-3 rounded-lg rounded-tr-none border border-gray-150 flex items-center gap-x-1 py-4">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce1"></span>
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce2"></span>
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce3"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips list */}
      <div className="px-3 py-1.5 bg-gray-50 border-t border-b border-gray-100 overflow-x-auto whitespace-nowrap gap-x-1.5 flex select-none scrollbar-none">
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.substring(2))}
            className="inline-block bg-white text-gray-700 hover:text-teal-750 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-full px-2.5 py-1 text-[10px] font-black tracking-tight transition-colors cursor-pointer shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-2 border-t border-gray-100 flex items-center gap-x-1.5 bg-white"
      >
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب رسالتك للمساعد الذكي..."
          className="flex-1 border border-gray-300 focus:border-teal-500 rounded px-3 py-2 text-xs outline-none text-right bg-white"
          dir="rtl"
          required
        />
        <button 
          type="submit"
          className="bg-teal-750 hover:bg-[#0f766e] text-white rounded p-1.5 flex items-center justify-center cursor-pointer border-0 shrink-0"
        >
          <Send className="w-4 h-4 transform rotate-180" />
        </button>
      </form>

    </div>
  );
};
