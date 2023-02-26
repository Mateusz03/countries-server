const express = require("express");
const axios = require("axios");
let cc = require("currency-codes");

const router = express.Router();

router.post("/conversion", async (req, res) => {
  const currencies = req.body.body;
  let result = [];

  for (let i = 0; i < currencies.length; i++) {
    if (currencies[i].curr !== "PLN") {
      await axios
        .get(
          `http://api.nbp.pl/api/exchangerates/rates/a/${currencies[
            i
          ].curr.toLowerCase()}/?format=json`,
        )
        .then((response) => {
          result[i] = {
            currency: response.data.currency,
            code: response.data.code,
            flagURL: `https://countryflagsapi.com/svg/${
              cc.code(response.data.code).number
            }`,
            price: response.data.rates[0].mid,
          };
        })
        .catch((err) => {
          throw err;
        });
    } else {
      result[i] = {
        currency: "polski złoty",
        code: "PLN",
        flagURL: `https://countryflagsapi.com/svg/${616}`,
        price: 1,
      };
    }
  }

  res.status(200);
  res.send({
    currency: [
      { ...result[0], price: 1 },
      {
        ...result[1],
        price: parseFloat(result[0].price / result[1].price),
      },
    ],
  });
  res.end();
});

exports.conversion = router;
