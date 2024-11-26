import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal } from 'lucide-react';
import { Operation, OS } from '../types';

interface OperationGuideProps {
  operation: Operation;
  os: OS;
  onBack: () => void;
}

export const OperationGuide: React.FC<OperationGuideProps> = ({
  operation,
  os,
  onBack
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold dark:text-white">{operation.title}</h2>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold dark:text-white">Description</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {operation.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold dark:text-white">Installation</h3>
            <div className="mt-2 rounded-lg bg-gray-900 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Terminal size={16} />
                <span>{os === 'mac' ? 'Terminal' : os === 'windows' ? 'PowerShell' : 'Shell'}</span>
              </div>
              <pre className="mt-2 overflow-x-auto text-sm text-gray-100">
                <code>{operation.installation[os]}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold dark:text-white">Usage Guide</h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
              {operation.usage.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold dark:text-white">Example Commands</h3>
            <div className="mt-2 space-y-2">
              {operation.examples.map((example, index) => (
                <div key={index} className="rounded-lg bg-gray-900 p-4">
                  <pre className="overflow-x-auto text-sm text-gray-100">
                    <code>{example}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};