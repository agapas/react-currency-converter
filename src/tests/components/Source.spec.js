import React from "react";
import { shallow } from "enzyme";
import { API_URL } from "App";
import { Source } from "components/Source";
import { mockData } from "../testsUtils";

describe("Source", () => {
  const getComp = (date) => shallow(
    <Source
      url={API_URL}
      date={date}
    />
  );

  it ("should display only source if date is not set", () => {
    const comp = getComp();
    expect(comp.find(".source").text())
      .toEqual("Rates: https://api.exchangeratesapi.io");
  });

  it ("should display the source with given date", () => {
    const { date } = mockData;
    const expected = `Rates: https://api.exchangeratesapi.io, ${date}`;

    const comp = getComp(date);
    expect(comp.find(".source").text()).toEqual(expected);
  });
});
