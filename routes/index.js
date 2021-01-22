const router = require('express').Router();


router.get('/home', (req, res) => {
    res.send('Hello world');
});

module.exports = router;