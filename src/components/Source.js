import React from "react";

export const Source = ({ url, date }) => {
  const source = url.split("/latest")[0];
  const dateText = date ? `, ${date}` : "";
  return (
    <div className="source">{`Rates: ${source}${dateText}`}</div>
  );
};
