import React from 'react';

const TabbedNavigation = ({ activeTab, onTabChange }) => {
  
  const tabs = [
    { id: 'notes', label: 'Notes' },
    { id: 'archived', label: 'Archived' },
  ];
  
  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="max-w-md bg-gray-100 p-1 rounded-lg">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabbedNavigation;