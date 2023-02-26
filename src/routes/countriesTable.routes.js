const express = require("express");
const axios = require("axios");
let cc = require("currency-codes");

const router = express.Router();

router.post("/table", async (req, res) => {
  let exchangeNames = [];

  await axios
    .get("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
    .then((response) => {
      const rates = response.data[0].rates;
      for (let i = 0; i < rates.length; i++) {
        let exchangePricing = rates[i];

        const UNCode = cc.code(exchangePricing.code).number;

        exchangeNames.push({
          currency: exchangePricing.currency,
          code: exchangePricing.code,
          flagURL: `https://countryflagsapi.com/svg/${UNCode}`,
          price: exchangePricing.mid,
        });
      }

      exchangeNames.push({
        currency: "polski złoty",
        code: "PLN",
        flagURL: `https://countryflagsapi.com/svg/${616}`,
        price: 1,
      });
    })
    .catch((err) => {
      throw err;
    });

  res.status(200);
  res.send(JSON.stringify(exchangeNames));
  res.end();
});

exports.countries = router;
