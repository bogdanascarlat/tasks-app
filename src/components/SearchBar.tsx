import React, { memo, useEffect, useState } from "react";
import { SearchBarProps } from "../types/types";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onChange(inputValue);
    }, 300); // Debounce delay of 300ms

    return () => clearTimeout(debounceTimer); // Cleanup on unmount or input change
  }, [inputValue, onChange]);

  return (
    <div className="relative w-[50%] md:w-[65%]">
      <input
        type="text"
        placeholder="Search tasks..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border rounded p-2 w-full pr-10"
      />

      {/* Clear button */}
      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default memo(SearchBar);
