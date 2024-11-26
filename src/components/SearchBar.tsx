import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { Operation } from '../types';

interface SearchBarProps {
  operations: Operation[];
  onSelect: (operation: Operation) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ operations, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Operation[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fuse = new Fuse(operations, {
    keys: ['title', 'description', 'category', 'tool'],
    threshold: 0.4,
  });

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search security tools and operations..."
          className="w-full rounded-lg border bg-white px-4 py-2 pl-10 text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-800"
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full rounded-lg border bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {results.map((operation) => (
              <motion.button
                key={operation.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(operation);
                  setQuery('');
                  setIsOpen(false);
                }}
                className="w-full rounded-lg p-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {operation.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {operation.description}
                </p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};