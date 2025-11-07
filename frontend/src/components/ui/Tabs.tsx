import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ----------------------------- Type Definitions ---------------------------- */
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: 'default' | 'pills' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onTabChange?: (tabId: string) => void;
}

/* ------------------------------ Basic Tabs UI ------------------------------ */
const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultTab, 
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  onTabChange 
}) => {

  // Safe initialization
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs?.[0]?.id ?? '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-sm',
    lg: 'py-4 px-6 text-base'
  };

  const variantClasses = {
    default: {
      active: 'bg-blue-50 text-blue-700 border-blue-500',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
    },
    pills: {
      active: 'bg-blue-600 text-white border-blue-600',
      inactive: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-transparent'
    },
    underlined: {
      active: 'text-blue-600 border-blue-500',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent'
    }
  };

  if (!tabs || tabs.length === 0) {
    return <div className="text-gray-500 text-sm">No tabs available</div>;
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Tabs Header */}
      <div
        className={cn(
          variant === 'underlined' ? 'border-b border-gray-200' : 'space-x-1',
          fullWidth ? 'flex' : 'inline-flex'
        )}
      >
        <nav
          className={cn(
            'flex',
            variant === 'underlined' ? '-mb-px space-x-8' : 'rounded-lg bg-gray-100/50 p-1',
            fullWidth && 'w-full'
          )}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center justify-center font-medium transition-all duration-200 relative',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'rounded-md border-2',
                sizeClasses[size],
                fullWidth && 'flex-1',
                variant === 'underlined'
                  ? 'whitespace-nowrap border-b-2'
                  : 'rounded-lg',
                activeTab === tab.id
                  ? variantClasses[variant].active
                  : variantClasses[variant].inactive
              )}
            >
              <div className="flex items-center gap-2">
                {tab.icon && (
                  <span
                    className={cn(
                      'flex-shrink-0',
                      activeTab === tab.id ? 'text-current' : 'text-gray-400'
                    )}
                  >
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={cn(
                      'inline-flex items-center justify-center min-w-5 h-5 text-xs font-medium rounded-full',
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Animated Active Indicator */}
              {variant === 'pills' && activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-blue-600 rounded-md -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {activeTabContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ---------------------------- Compound Components -------------------------- */
interface TabsContextProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  variant: 'default' | 'pills' | 'underlined';
}

const TabsContext = React.createContext<TabsContextProps | undefined>(undefined);

const TabsList: React.FC<{
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}> = ({ children, className, fullWidth = false }) => {
  return (
    <div
      className={cn(
        'inline-flex rounded-lg bg-gray-100/50 p-1',
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

const TabsTrigger: React.FC<{
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  className?: string;
}> = ({ value, children, icon, badge, className }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within AdvancedTabs');

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn(
        'flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-md border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        isActive
          ? 'bg-white text-blue-700 border-blue-200 shadow-sm'
          : 'text-gray-600 hover:text-gray-900 border-transparent',
        className
      )}
    >
      {icon && (
        <span
          className={cn(
            'flex-shrink-0 w-4 h-4',
            isActive ? 'text-blue-600' : 'text-gray-400'
          )}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge && (
        <span
          className={cn(
            'inline-flex items-center justify-center min-w-5 h-5 text-xs font-medium rounded-full',
            isActive
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-200 text-gray-600'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

const TabsContent: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within AdvancedTabs');

  if (context.activeTab !== value) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={cn('mt-6', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AdvancedTabs: React.FC<{
  defaultValue: string;
  children: React.ReactNode;
  variant?: 'default' | 'pills' | 'underlined';
  className?: string;
  onValueChange?: (value: string) => void;
}> = ({ defaultValue, children, variant = 'default', className, onValueChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, variant }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

/* ----------------------------- Final Exports ------------------------------- */
export { Tabs, AdvancedTabs, TabsList, TabsTrigger, TabsContent };
