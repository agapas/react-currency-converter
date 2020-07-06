import React from "react";

export const CurrencySelector = ({ label, options, value, onChange }) => {
  return (
    <label>
      {`${label}:`}
      <select value={value} onChange={onChange}>
        {options.map((option) =>
          <option key={option} data-content={`<i className="currency-flag-${option.toLowerCase()}"></i>`}>
            {option}
          </option>
        )}
      </select>
    </label>
  );
};

// TODO:
// - investigate how to display icon inside option