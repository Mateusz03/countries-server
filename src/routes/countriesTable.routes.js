const express = require("express");
const request = require("request");
let cc = require("currency-codes");

const router = express.Router();

router.post("/table", (req, res) => {
  try {
    request(
      "https://api.nbp.pl/api/exchangerates/tables/a/?format=json",
      (error, response, body) => {
        if (error) {
          throw error;
        } else {
          let exchangeNames = [];

          for (let i = 0; i < JSON.parse(body)[0].rates.length; i++) {
            let exchangePricing = JSON.parse(body)[0].rates[i];

            const UNCode = cc.code(exchangePricing.code).number;
            exchangeNames.push({
              currency: exchangePricing.currency,
              code: exchangePricing.code,
              flagURL: `https://countryflagsapi.com/svg/${UNCode}`,
              price: exchangePricing.mid.toFixed(2),
            });
          }

          exchangeNames.push({
            currency: "polski złoty",
            code: "PLN",
            flagURL: `https://countryflagsapi.com/svg/${616}`,
            price: 1,
          });

          res.status(200);
          res.send(JSON.stringify(exchangeNames));
          res.end();
        }
      },
    );
  } catch {
    res.status(500);
    res.end();
  }
});

exports.countries = router;
