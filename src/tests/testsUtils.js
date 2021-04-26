export const testUrl = "https://test/page/url";
export const mockData = {
  success: true,
  timestamp: 1619432343,
  base: "EUR",
  date: "2021-04-26",
  rates: {
    EUR: 1,
    GBP: 0.9012,
    USD: 1.1224,
  }
};

const waitProm = (timeout = 0) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const waitCompProm = (comp) => waitProm().then(() => comp.update());
