const axios = require("axios");

test("Countries Table", async () => {
  const res = await axios.post("http://localhost:3002/countries/table");
  expect(Array.isArray(res.data)).toBe(true);
});

test("Conversion", async () => {
  const body = [{ curr: "PLN" }, { curr: "GBP" }]; // this its mock for

  const res = await axios.post("http://localhost:3002/price/conversion", {
    body: body,
  });

  expect(typeof res.data === "object").toBe(true);
});

test("Calculation", async () => {
  const body1 = { price: 0.59, inputs: [{ message: 32 }, { message: "" }] }; // this its mock for
  const body2 = {
    price: 0.59,
    inputs: [{ message: "" }, { message: "18.8800" }],
  };

  const res1 = await axios.post("http://localhost:3002/price/calculation", {
    body: body1,
  });

  const res2 = await axios.post("http://localhost:3002/price/calculation", {
    body: body2,
  });

  expect(JSON.stringify(res1.data) == JSON.stringify(res2.data)).toEqual(true);
});
