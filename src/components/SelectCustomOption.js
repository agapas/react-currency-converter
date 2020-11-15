import React from "react";

export const SelectCustomOption = (props = {}) => {
  const { label, value } = props;
  return (
    <div className="currency-option">
      {value ? <i className={`currency-flag currency-flag-${value}`} /> : null}
      {label ?? ""}
    </div>
  );
};
