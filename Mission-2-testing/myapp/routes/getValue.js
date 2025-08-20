var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let { model, year } = req.query;

    if (typeof model !== "string" || typeof year !== "string") {
        return res.status(400).json({ message: "Invalid input" });
    }

    const yearNum = Number(year);
    if (isNaN(yearNum) || yearNum < 0) {
        return res.status(400).json({ message: "Invalid year" });
    }

    const valuesOfAlphabet = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];

    model = model.toLowerCase();
    let carValue = 0;
    for (let i = 0; i < model.length; i++) {
        carValue += valuesOfAlphabet.indexOf(model[i]) + 1;
    }

    const returnCarValue = carValue * 100 + yearNum;

    res.status(200).json({ carValue: returnCarValue });
});

module.exports = router;