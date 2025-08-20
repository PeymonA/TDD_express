var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    const paragraph = req.body.input;

    if (typeof paragraph !== 'string') {
        return res.status(400).json({ message: 'Input must be a string' });
    }
    
    const keywords = ["collide", "crash", "scratch", "bump", "", "smash"];
    const paragraphList = paragraph.split(" ");
    let returnRiskRating = 0;

    paragraphList.forEach((word) => {
        if (keywords.includes(word)) {
            returnRiskRating++;
        }
    });

    res.status(200).json({ riskRating: returnRiskRating });
});

module.exports = router;