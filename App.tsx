
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Sender, ChatState } from './types';
import { STORAGE_KEY, BOT_RESPONSES } from './constants';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on initial mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved messages", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    // Explicitly update localStorage, even if array is empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      // Use setTimeout to ensure the DOM has updated with the new message
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  };

  const handleSendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  }, []);

  const handleClearChat = useCallback(() => {
    if (window.confirm("Khatam? (Are you sure you want to clear this GupShup?)")) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-white shadow-2xl relative overflow-hidden sm:rounded-[2.5rem] sm:my-4 sm:h-[calc(100vh-2rem)] border border-slate-100">
      <ChatHeader onClear={handleClearChat} />
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-2 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px] hide-scrollbar"
      >
        <MessageList messages={messages} />
        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold italic message-fade-in pl-2 py-2">
            <div className="flex space-x-1.5 bg-white px-3 py-2 rounded-2xl shadow-sm border border-slate-100">
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-duration:0.6s]"></span>
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></span>
            </div>
            <span className="text-slate-400 uppercase tracking-widest text-[10px]">GupShup Bot is typing...</span>
          </div>
        )}
      </div>

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default App;
