
import React from 'react';

interface ChatHeaderProps {
  onClear: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClear }) => {
  return (
    <header className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg z-10 shrink-0 border-b border-white/10">
      <div className="flex items-center space-x-3">
        <div className="w-11 h-11 bg-white text-orange-500 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-inner rotate-3">
          G
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight leading-tight">GupShup</h1>
          <p className="text-[11px] font-medium text-rose-100 flex items-center mt-0.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5 inline-block animate-pulse"></span>
            Online
          </p>
        </div>
      </div>
      <button 
        onClick={onClear}
        className="text-xs font-semibold px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 active:scale-95 hover:shadow-lg backdrop-blur-md"
      >
        Clear Chat
      </button>
    </header>
  );
};

export default ChatHeader;
