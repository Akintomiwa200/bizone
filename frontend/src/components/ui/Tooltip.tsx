import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-black',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-black',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-black',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-black'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={cn(
          'absolute z-50 px-2 py-1 text-xs text-white bg-black rounded shadow-lg whitespace-nowrap',
          positionStyles[position],
          className
        )}>
          {content}
          <div className={cn(
            'absolute w-0 h-0 border-4 border-transparent',
            arrowStyles[position]
          )} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;