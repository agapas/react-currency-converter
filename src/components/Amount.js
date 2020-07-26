import React from "react";

export const Amount = ({ className, value = 1, onChange }) => {
  return (
    <label>
      <div className="label">Amount:</div>
      <input
        className={`amount-input ${className}`}
        type="text"
        placeholder="Set Amount"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
