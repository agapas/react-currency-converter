export const testUrl = "https://test/page/url";
export const mockData = {
  base: "EUR",
  date: "2020-07-03",
  rates: {
    GBP: 0.9012,
    USD: 1.1224,
  }
};

const waitProm = (timeout = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const waitCompProm = (comp) => waitProm().then(() => comp.update());
