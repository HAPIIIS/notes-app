import React, { useState } from 'react';
import { Archive, Trash } from 'lucide-react';

const NoteCard = ({ title, body, createdAt, archived, onArchiveToggle, onDeleteToggle,id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("No date provided for formatDate.");
      return "Date Unavailable";
    }
    
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
  
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/');
  };

  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  };

  const handleIconClick = (e, callback) => {
    e.stopPropagation();
    callback(id);
  };

  return (
    <div onClick={() => setIsExpanded(!isExpanded)} className={`w-full p-4 bg-white rounded-lg shadow-md relative mb-4 cursor-pointer border border-gray-100 transition-all duration-200 ${isExpanded ? 'border-solid border-orange-500 border-2' : 'hover:shadow-sm'}`}>
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center gap-2">
          {isToday(createdAt) && (
            <div className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              New
            </div>
          )}
          <button onClick={(e) => handleIconClick(e, onArchiveToggle)} className="hover:scale-110 transition-transform">
            <Archive size={18} className={archived ? 'fill-yellow-500' : 'text-gray-400'}/>
          </button>
          <button onClick={(e) => handleIconClick(e, onDeleteToggle)} className="hover:scale-110 transition-transform">
            <Trash size={18} className="text-red-500"/>
          </button>
        </div>
      </div>

      {isExpanded ? (
        <p className="mt-4 text-gray-600 text-sm">{body}</p>
      ) : (
        <p className="mt-2 text-gray-600 text-sm truncate">{body}</p>
      )}

      <div className="flex items-center gap-2 mt-4">
        <span className="text-gray-400 text-xs">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;