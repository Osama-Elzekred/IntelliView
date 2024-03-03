'use client';

import { Label, Select } from 'flowbite-react';
function SelectInput({ options, value, onChange, className = '' }) {
  return (
    <div className={`max-w-md ${className}`}>
      <Select id="countries" required value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select>
    </div>
  );
}
export { SelectInput };
