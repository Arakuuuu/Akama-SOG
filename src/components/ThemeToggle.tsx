import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Theme } from '../types';

export const ThemeToggle: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={theme.toggle}
      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
    >
      {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}