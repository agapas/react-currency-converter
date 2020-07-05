import React from "react";

export const Error = ({ message }) => {
  const defaultMessage = "Something went wrong. Please try again later.";
  return <div className="error">{`Oops! ${message || defaultMessage}`}</div>;
}
