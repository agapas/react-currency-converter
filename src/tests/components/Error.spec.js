import React from "react";
import { shallow } from "enzyme";
import { Error } from "components/Error";

describe("Error", () => {
  const getComp = (message) => shallow(
    <Error message={message} />
  );

  it ("should render successfully with minimum settings", () => {
    expect(getComp().hasClass("error")).toBe(true);
  });

  it ("should render default error message when message is undefined", () => {
    const comp = getComp();
    expect(comp.text()).toEqual("Oops! Something went wrong. Please try again later.");
  });

  it ("should render given error message", () => {
    const comp = getComp("Some message.");
    expect(comp.text()).toEqual("Oops! Some message.");
  });
});
