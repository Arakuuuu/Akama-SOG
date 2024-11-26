import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Apple, Terminal } from 'lucide-react';
import type { OS } from '../types';

interface OSSelectorProps {
  onSelect: (os: OS) => void;
}

export const OSSelector: React.FC<OSSelectorProps> = ({ onSelect }) => {
  const osOptions: Array<{ os: OS; icon: React.ReactNode; label: string }> = [
    { os: 'windows', icon: <Monitor size={32} />, label: 'Windows' },
    { os: 'mac', icon: <Apple size={32} />, label: 'macOS' },
    { os: 'linux', icon: <Terminal size={32} />, label: 'Linux' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center space-y-8"
    >
      <h2 className="text-2xl font-bold dark:text-white">Select Your Operating System</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {osOptions.map(({ os, icon, label }) => (
          <motion.button
            key={os}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(os)}
            className="flex w-48 flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <div className="text-blue-600 dark:text-blue-400">{icon}</div>
            <span className="font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};