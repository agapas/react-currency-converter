import React from "react";

export const CurrencySwitcher = ({ value = {}, onChange }) => {
  const { from , to } = value;
  return <button className="button switch-currency" onClick={onChange} disabled={!from || !to} >
    <i className="fa fa-arrow-down fa-fw" />
    <i className="fa fa-arrow-up fa-fw" />
  </button>;
};
