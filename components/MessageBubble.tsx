
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(timestamp));
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} message-fade-in mb-4`}>
      <div className={`max-w-[85%] sm:max-w-[70%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`px-5 py-3 rounded-3xl shadow-sm text-sm sm:text-base font-medium leading-relaxed ${
            isUser 
              ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-tr-none shadow-rose-200 shadow-md' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-slate-100 shadow-md'
          }`}
        >
          {message.text}
        </div>
        <p className="text-[10px] mt-1.5 font-bold text-slate-400 px-1 uppercase tracking-widest">
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
