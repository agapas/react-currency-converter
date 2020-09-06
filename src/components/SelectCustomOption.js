import React from "react";

export const SelectCustomOption = (props) => {
  return (
    <div className="currency-option">
      <i className={`currency-flag currency-flag-${props?.value}`} />
      {props?.label}
    </div>
  );
};
