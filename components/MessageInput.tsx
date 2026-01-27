
import React, { useState, FormEvent, KeyboardEvent, useEffect, useRef } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
      <form onSubmit={handleSubmit} className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="flex-1 bg-slate-100/50 rounded-2xl border border-slate-200/60 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-200 transition-all overflow-hidden">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Kaho kya baat hai? (Type here...)"
            className="w-full px-5 py-3.5 bg-transparent text-slate-900 text-base outline-none resize-none placeholder:text-slate-400"
            style={{ minHeight: '52px', maxHeight: '150px' }}
          />
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all shrink-0 ${
            text.trim() 
              ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-200 active:scale-95' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <svg 
            className={`w-6 h-6 transition-transform ${text.trim() ? 'translate-x-0.5 -translate-y-0.5 rotate-12' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
