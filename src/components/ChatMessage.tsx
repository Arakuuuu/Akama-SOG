import React from 'react';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.sender === 'assistant';

  return (
    <div className={`flex gap-4 p-4 ${isAssistant ? 'bg-gray-50' : ''}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isAssistant ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {isAssistant ? <Bot size={20} /> : <User size={20} />}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {isAssistant ? 'Security Assistant' : 'You'}
          </span>
          <span className="text-sm text-gray-500">
            {format(message.timestamp, 'HH:mm')}
          </span>
        </div>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}