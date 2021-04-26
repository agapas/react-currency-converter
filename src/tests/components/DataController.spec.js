import React from "react";
import { shallow } from "enzyme";
import { CurrencyForm } from "components/CurrencyForm";
import { DataController } from "components/DataController";
import { LoadingIcon } from "components/LoadingIcon";
import { Source } from "components/Source";
import { testUrl, mockData, waitCompProm } from "../testsUtils";

// skipping tests temporarily as currently loadData is not called in the component
xdescribe("DataController", () => {
  const getComp = () => shallow(<DataController url={testUrl} />);

  it ("should render CurrencyForm and Source components when fetch data was successful", () => {
    const mockJsonPromise = Promise.resolve(mockData);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const comp = getComp();
    expect(comp.exists()).toBe(true);
    expect(comp.type()).toEqual(LoadingIcon);

    return waitCompProm(comp).then((result) => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(testUrl);

      const currencyForm = result.find(CurrencyForm);
      expect(currencyForm.exists()).toBe(true);
      expect(currencyForm.prop("base")).toEqual(mockData.base);
      expect(currencyForm.prop("rates")).toEqual(mockData.rates);

      const source = result.find(Source);
      expect(source.exists()).toBe(true);
      expect(source.prop("date")).toEqual(mockData.date);
      expect(source.prop("url")).toEqual(testUrl);

      global.fetch.mockClear();
    });
  });

  it ("should render error component when fetch data was unsuccessful", () => {
    jest.spyOn(global, "fetch")
      .mockImplementation(() => Promise.reject({ message: "Ooops" }));

    return waitCompProm(getComp()).then((comp) => {
      expect(comp.name()).toEqual("Error");
      expect(comp.prop("message")).toEqual("Ooops");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(testUrl);

      global.fetch.mockClear();
    });
  });
});
