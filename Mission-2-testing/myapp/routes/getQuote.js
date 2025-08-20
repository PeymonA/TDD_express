var express = require('express');
var router = express.Router();         

router.get('/', function(req, res, next) { 
    let { car_value, risk_rating } = req.query; 
    const check_car_value = Number(car_value);
    const check_risk_rating = Number(risk_rating); 
    
    if (isNaN(check_car_value) || isNaN(check_risk_rating)) {
        return res.status(400).send('Invalid input');
    }
    if (!car_value || !risk_rating) {
        return res.status(400).send('Missing query parameters');
    }
    if (check_car_value < 0 || check_risk_rating < 0) {
        return res.status(400).send('Invalid input');
    }
    const returnYearlyPremium = Math.floor(check_car_value * check_risk_rating / 100);
    const returnMonthlyPremium = returnYearlyPremium / 12;

    res.status(200).json({ monthlyPremium: returnMonthlyPremium, yearlyPremium: returnYearlyPremium });
});

module.exports = router;