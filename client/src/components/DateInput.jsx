import React from "react";

export function DateInput({ value, onChange }) {
  return (
    <input
      type="date"
      value={value} // Uses YYYY-MM-DD format
      onChange={(e) => onChange(e.target.value)} 
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  );
}
