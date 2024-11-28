import React, { memo } from "react";
import { SearchBarProps } from "../types/types";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-[50%] md:w-[65%]">
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 w-full pr-10"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange("")} 
          className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default memo(SearchBar);
