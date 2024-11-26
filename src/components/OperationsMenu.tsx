import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Wifi, Globe, Key, Search, FileSearch, AlertTriangle, Network, Terminal, Eye, Bug, Radio, Database, Lock } from 'lucide-react';
import { Operation, OS, OPERATIONS, SecurityCategory } from '../types';
import { SearchBar } from './SearchBar';

interface OperationsMenuProps {
  os: OS;
  onSelect: (operation: Operation) => void;
  onBack: () => void;
}

const categories: Record<SecurityCategory, { icon: React.ComponentType; label: string }> = {
  network: { icon: Network, label: 'Network Operations' },
  wireless: { icon: Wifi, label: 'Wireless Security' },
  web: { icon: Globe, label: 'Web Security' },
  forensics: { icon: Search, label: 'Digital Forensics' },
  password: { icon: Key, label: 'Password Security' },
  vulnerability: { icon: AlertTriangle, label: 'Vulnerability Assessment' },
  log: { icon: FileSearch, label: 'Log Analysis' },
  threat: { icon: Shield, label: 'Threat Intelligence' },
  privilege: { icon: Terminal, label: 'Privilege Escalation' },
  incident: { icon: AlertTriangle, label: 'Incident Response' },
  social: { icon: Globe, label: 'Social Engineering' },
  container: { icon: Terminal, label: 'Container Security' },
  mobile: { icon: Shield, label: 'Mobile Security' },
  encryption: { icon: Key, label: 'Encryption Tools' },
  malware: { icon: Bug, label: 'Malware Analysis' },
  monitoring: { icon: Eye, label: 'Network Monitoring' },
  osint: { icon: Search, label: 'OSINT Gathering' },
  crypto: { icon: Lock, label: 'Cryptographic Analysis' }
};

export const OperationsMenu: React.FC<OperationsMenuProps> = ({
  os,
  onSelect,
  onBack
}) => {
  const groupedOperations = OPERATIONS.reduce((acc, operation) => {
    if (!acc[operation.category]) {
      acc[operation.category] = [];
    }
    acc[operation.category].push(operation);
    return acc;
  }, {} as Record<string, Operation[]>);

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
        <h2 className="text-2xl font-bold dark:text-white">Security Operations</h2>
      </div>

      <SearchBar operations={OPERATIONS} onSelect={onSelect} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedOperations).map(([category, operations]) => {
          const CategoryIcon = categories[category as SecurityCategory].icon;
          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold dark:text-white">
                <CategoryIcon className="text-blue-600 dark:text-blue-400" />
                <span>{categories[category as SecurityCategory].label}</span>
              </div>
              <div className="space-y-2">
                {operations.map(operation => (
                  <motion.button
                    key={operation.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(operation)}
                    className="w-full rounded-lg bg-white p-4 text-left shadow-md transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <h3 className="font-medium dark:text-white">{operation.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {operation.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};