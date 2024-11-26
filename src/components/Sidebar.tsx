import React from 'react';
import { ChatHistory } from '../types';
import { MessageSquare, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface SidebarProps {
  histories: ChatHistory[];
  activeChat: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  histories,
  activeChat,
  onSelectChat,
  onNewChat,
}) => {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-50">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {histories.map((history) => (
          <button
            key={history.id}
            onClick={() => onSelectChat(history.id)}
            className={`mb-2 flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
              activeChat === history.id
                ? 'bg-blue-100 text-blue-900'
                : 'hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={18} />
            <div className="flex-1 truncate">
              <div className="font-medium">{history.title}</div>
              <div className="text-sm text-gray-500">
                {format(history.updatedAt, 'MMM d, yyyy')}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}