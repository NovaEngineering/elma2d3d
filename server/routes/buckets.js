let express = require('express');
let router = express.Router();
let {internalClient, internalToken} = require('../config');
let ForgeSDK = require('forge-apis');

router.get('/buckets',async (req, res, next) => {
    //const bucketList = req.query.id
    try {   let BucketsApi = new ForgeSDK.BucketsApi();
            bucketList =await BucketsApi.getBuckets({}, internalClient, await internalToken);
            res.json( bucketList.body.items.map((x) => {
                return{
                    id: bucketList.body.items.indexOf(x),
                    text: x.bucketKey,
              }
           })
        )
    } 
    catch (err) {
        next(err)
    }
});
module.exports = router


