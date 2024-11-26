import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OSSelector } from './components/OSSelector';
import { OperationsMenu } from './components/OperationsMenu';
import { OperationGuide } from './components/OperationGuide';
import { Shield } from 'lucide-react';
import { OS, Operation } from './types';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [selectedOS, setSelectedOS] = useState<OS | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-gray-900">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 px-6 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="flex items-center gap-4">
          <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Akama SOG
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Security Operations Guide
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedOS ? (
            <OSSelector onSelect={setSelectedOS} />
          ) : !selectedOperation ? (
            <OperationsMenu
              os={selectedOS}
              onSelect={setSelectedOperation}
              onBack={() => setSelectedOS(null)}
            />
          ) : (
            <OperationGuide
              operation={selectedOperation}
              os={selectedOS}
              onBack={() => setSelectedOperation(null)}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto border-t py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Akama SOG. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;