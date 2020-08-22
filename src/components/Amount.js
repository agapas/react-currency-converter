import React from "react";

export const Amount = ({ error, value, onChange }) => {
  const errorClass = error ? "has-error" : "";
  return (
    <label className={errorClass}>
      <div className="label">Amount to convert:</div>
      <input
        type="text"
        placeholder="Set Amount"
        value={value}
        onChange={onChange}
      />
      {error && <div className="error-hint">{error}</div>}
    </label>
  );
};
