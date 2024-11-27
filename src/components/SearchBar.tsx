import React, { memo } from 'react';
import { SearchBarProps } from '../types/types';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-[50%] md:w-[65%]"
    />
  );
};

export default memo(SearchBar);
