const express = require("express");

const router = express.Router();

router.post("/calculation", (req, res) => {
  const rates = req.body.body.price;
  let input = req.body.body.inputs;

  for (let i = 0; i < input.length; i++) {
    if (input[i].message !== "") {
      switch (i) {
        case 0:
          input[1].message = (
            parseFloat(input[i].message) * parseFloat(rates)
          ).toFixed(2);
          break;
        case 1:
          input[0].message = (
            parseFloat(input[i].message) / parseFloat(rates)
          ).toFixed(2);
          break;
        default:
          break;
      }
    }
  }
  res.send({ inputs: input });
});

exports.calculation = router;
