import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options = [], startIcon, ...props }, ref) => {
    // Safe default for options
    const safeOptions = Array.isArray(options) ? options : [];

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}
          <select
            className={cn(
              'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              'hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
              'appearance-none cursor-pointer',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              startIcon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          >
            {/* Safe mapping with fallback */}
            {safeOptions.length > 0 ? (
              safeOptions.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value}
                  className="py-2"
                >
                  {option.label}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No options available
              </option>
            )}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-red-600" : "text-gray-500"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Select Components for compound usage
interface SelectContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextProps | undefined>(undefined);

// Main compound Select component
interface CompoundSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const SelectRoot: React.FC<CompoundSelectProps> = ({ value, onValueChange, children }) => {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="w-full space-y-2">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
SelectGroup.displayName = "SelectGroup";

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  { placeholder?: string } & React.HTMLAttributes<HTMLSpanElement>
>(({ placeholder, className, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  return (
    <span
      ref={ref}
      className={cn("block truncate", !context?.value && "text-gray-500", className)}
      {...props}
    >
      {context?.value ? context.value : placeholder}
    </span>
  );
});
SelectValue.displayName = "SelectValue";

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    startIcon?: React.ReactNode;
  }
>(({ className, children, startIcon, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      "hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      {startIcon && <span className="text-gray-400">{startIcon}</span>}
      {children}
    </div>
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg",
      "animate-in fade-in-80",
      className
    )}
    {...props}
  />
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  { value: string } & React.HTMLAttributes<HTMLDivElement>
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  const isSelected = context?.value === value;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 px-2 text-sm",
        "outline-none focus:bg-gray-100 hover:bg-gray-100",
        "transition-colors duration-200",
        isSelected && "bg-blue-50 text-blue-600",
        className
      )}
      onClick={() => context?.onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-1.5 px-2 text-sm font-semibold text-gray-900", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

// Export both simple and compound components
export { 
  Select, 
  SelectRoot,
  SelectGroup, 
  SelectValue, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectLabel, 
  SelectSeparator 
};