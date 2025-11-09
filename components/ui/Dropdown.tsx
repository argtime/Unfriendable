import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  contentClasses?: string;
}

const Dropdown: React.FC<DropdownProps> & { Item: React.FC<ItemProps> } = ({ trigger, children, contentClasses = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="w-full">
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-700 ${contentClasses}`}
          // Add transition classes for smooth animation
          style={{ transition: 'opacity 150ms ease-in-out, transform 150ms ease-in-out' }}
          >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {React.Children.map(children, child => {
              // Fix: Provide a generic type to React.isValidElement to inform TypeScript
              // that the child element's props may include an onClick handler. This
              // resolves both the overload error on `React.cloneElement` and the
              // property access error for `child.props.onClick`.
              if (React.isValidElement<{ onClick?: (...args: any[]) => void }>(child)) {
                return React.cloneElement(child, { onClick: (...args: any[]) => {
                  child.props.onClick?.(...args);
                  setIsOpen(false);
                }});
              }
              return child;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Item: React.FC<ItemProps> = ({ children, className, ...props }) => {
    const baseClasses = "w-full text-left flex items-center px-4 py-3 text-sm text-light hover:bg-accent focus:bg-accent focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    return (
        <button
            className={`${baseClasses} ${className}`}
            role="menuitem"
            {...props}
        >
            {children}
        </button>
    )
};

Dropdown.Item = Item;

export default Dropdown;
