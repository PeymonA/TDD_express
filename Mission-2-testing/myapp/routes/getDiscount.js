var express = require('express');
var router = express.Router();  

router.get('/', function(req, res, next) {
    const { age, experience } = req.query; 

    const check_age = Number(age);
    const check_experience = Number(experience);

    if (isNaN(check_age) || isNaN(check_experience)) {
        return res.status(400).send('Invalid input');
    }
    if (!age || !experience) {
        return res.status(400).send('Missing query parameters');
    }
    if (check_age < 0 || check_experience < 0) {
        return res.status(400).send('Invalid input');
    }
    let returnDiscount = 0;

    if (check_age >= 25) {
        returnDiscount += 5;
        if (check_age >= 40) {
            returnDiscount += 5;
        }
    }
    if (check_experience >= 5) {
        returnDiscount += 5;
        if (check_experience >= 10) {
            returnDiscount += 5;
        }
    }

    res.status(200).json({ discount : returnDiscount });
});

module.exports = router;