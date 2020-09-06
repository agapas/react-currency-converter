import React from "react";

export const Result = ({ value }) => {
  return (
    <label className="result">
      <div className="label">Result:</div>
      <input type="text" value={value} disabled={true} />
    </label>
  );
};
