import React, { useState } from 'react';
import { ShieldCheck, User, Mail, LogOut, Check, X, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
}) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى إدخال اسمك بالكامل لغرض التوصيل');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    
    setError('');
    onLogin(name, email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans rtl" dir="rtl">
      <div 
        className="bg-[#fcfdfd] w-full max-w-md rounded-lg shadow-2xl overflow-hidden relative border border-gray-150 animate-fade-in"
        id="auth-modal-card"
      >
        {/* Header */}
        <div className="bg-[#154e4b] text-white px-5 py-4 flex items-center justify-between border-b border-gray-150">
          <div className="flex items-center gap-x-2">
            <KeyRound className="w-5 h-5 text-[#e9be64]" />
            <span className="text-sm md:text-base font-extrabold text-white">تسجيل الدخول الآمن وبوابة عافية</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white bg-transparent border-0 cursor-pointer text-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {user.isLoggedIn ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-[#0d9488] mx-auto border-2 border-teal-200">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900">مرحباً بك مجدداً يا {user.name}!</h3>
                <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                <div className="mt-3 inline-flex items-center gap-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4" /> حساب مؤمن وموثق بـ عافية
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-x-2.5">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-150 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded text-xs cursor-pointer border-0"
                >
                  العودة للتسوق
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setName('');
                    setEmail('');
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2 px-4 rounded text-xs flex items-center justify-center gap-x-1.5 cursor-pointer border border-red-200"
                >
                  <LogOut className="w-4 h-4" /> تسجيل الخروج
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center space-y-1 pb-2">
                <span className="text-xs text-[#0d9488] font-black tracking-widest uppercase">AFIA SMART SECURITY</span>
                <h3 className="text-sm font-extrabold text-gray-700">توصيل وحساب آمن بضغطة واحدة</h3>
                <p className="text-[11px] text-gray-400">سجل بياناتك لحفظ المفضلة، سلال التسوق، وعناوين الشحن تلقائياً.</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs py-2 px-3 rounded text-right font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">الاسم الكامل لعنوان الشحن</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: محمد عافية عيسى"
                    className="w-full border border-gray-300 rounded pr-9 pl-3 py-2 text-xs outline-none focus:border-teal-500 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-gray-700 block">البريد الإلكتروني للتوثيق</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="مثال: custom@afia.eg"
                    className="w-full border border-gray-300 rounded pr-9 pl-3 py-2 text-xs outline-none focus:border-teal-500 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Informational bullet */}
              <div className="bg-teal-50/50 p-2.5 rounded border border-teal-100 text-[10px] text-teal-800 leading-normal">
                🔒 خصوصيتك محمية. نحن لا نشارك بريدك الإلكتروني مع أي جهة خارجية. بياناتك تستخدم بهدف إدارة وعرض فواتير ومرتجعات مشترياتك في مصر.
              </div>

              {/* Footer row buttons */}
              <div className="pt-2 flex items-center gap-x-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 px-4 rounded text-xs cursor-pointer border-0"
                >
                  إلغاء المعاملة
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold py-2.5 px-4 rounded text-xs cursor-pointer border-0 shadow flex items-center justify-center gap-x-1"
                >
                  <ShieldCheck className="w-4 h-4 text-[#e9be64]" /> دخول آمن للخدمات
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
