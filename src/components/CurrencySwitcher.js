import React from "react";

export const CurrencySwitcher = ({ value, onChange }) =>
  <button className="button switch-currency" onClick={onChange} >
    <i className="fa fa-arrow-down fa-fw" />
    <i className="fa fa-arrow-up fa-fw" />
  </button>;