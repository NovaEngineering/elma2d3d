let express = require('express');
let router = express.Router();
let {publicToken} = require('../config');
router.get('/public_token', async (req, res, next) => {
    try {
        res.send(await publicToken)
    } catch (err) {next(err)}}); 
module.exports = router;