'use client';

import { Select } from 'flowbite-react';
export default function SelectInput({
  options,
  value,
  onChange,
  className = '',
  name,
  defaultValue,
}) {
  return (
    <div className={`max-w-md ${className}`}>
      <Select
        id="countries"
        name={name}
        required
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select>
    </div>
  );
}
