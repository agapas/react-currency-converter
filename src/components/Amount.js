import React from "react";

export const Amount = ({ className, error, value, onChange }) => {
  return (
    <label className={className}>
      <div className="label">Amount to convert:</div>
      <input
        type="text"
        placeholder="Set Amount"
        value={value}
        onChange={onChange}
      />
      <div className="error-hint">{error}</div>
    </label>
  );
};
