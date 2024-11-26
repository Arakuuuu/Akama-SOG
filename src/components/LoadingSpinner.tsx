import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Loading Akama AI...
        </p>
      </motion.div>
    </div>
  );
};