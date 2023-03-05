const express = require("express");

const router = express.Router();

router.post("/calculation", (req, res) => {
  const rates = req.body.body.price;
  let input = req.body.body.inputs;

  for (let i = 0; i < input.length; i++) {
    if (input[i].message !== "" && !isNaN(parseInt(input[i].message))) {
      if (i === 0) {
        input[1].message = (
          parseFloat(input[i].message) * parseFloat(rates)
        ).toFixed(4);

        res.send({ inputs: input });
        break;
      } else {
        input[0].message = (
          parseFloat(input[i].message) / parseFloat(rates)
        ).toFixed(4);

        res.send({ inputs: input });
        break;
      }
    } else {
      res.end();
    }
  }
});

exports.calculation = router;
