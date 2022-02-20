let express = require('express');
let router = express.Router();
let {internalClient, internalToken} = require('../config');
let ForgeSDK = require('forge-apis');

router.get('/buckets_raw',async (req, res, next) => {
    //const bucketList = req.query.id
    try {   let BucketsApi = new ForgeSDK.BucketsApi();
            bucketList =await BucketsApi.getBuckets({}, internalClient, await internalToken);
            res.json( bucketList )
    } 
    catch (err) {
        next(err)
    }
});
module.exports = router


