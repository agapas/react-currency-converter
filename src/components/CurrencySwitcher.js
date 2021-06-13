import React from "react";

export const CurrencySwitcher = ({ disabled, onSwitch }) => {
  return <button
    type="button"
    className="button switch-currency"
    disabled={!!disabled}
    onClick={onSwitch}
  >
    <i className="fa fa-arrow-down fa-fw" />
    <i className="fa fa-arrow-up fa-fw" />
  </button>;
};
