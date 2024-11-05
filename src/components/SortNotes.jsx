import React from 'react';

const SortNotes = ({ sortOption, onSortChange }) => {
    return (
        <div className="flex justify-between items-center my-4">
            <h2 className="text-lg font-semibold">List Notes</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
                <label htmlFor="sort" className="font-medium">
                    All Notes
                </label>
                <select value={sortOption} onChange={(e) => onSortChange(e.target.value)} className="bg-transparent text-gray-600 text-sm focus:outline-none cursor-pointer font-semibold">
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default SortNotes;
