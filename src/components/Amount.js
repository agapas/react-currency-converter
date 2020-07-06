import React from "react";

export const Amount = ({ className, value = 1, onChange }) => {
  return (
    <label>
      Amount:
      <input
        className={`amount-input ${className}`}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
