
let express = require('express');
let router = express.Router();
let {internalClient, internalToken} = require('../config');
let ForgeSDK = require('forge-apis');

function utf8_to_b64(str) { str.split(':')
    encodeURIComponent(str); return
}

router.get('/bucket_details', async (req, res, next) => {
    try { let ObjectsApi = new ForgeSDK.ObjectsApi();
        //"warestore2";
        bucket_details = await ObjectsApi.getObjects(req.query.bucketKey, '', internalClient, await internalToken);
        res.json(/*bucket_details*/ bucket_details.body.items[1].objectId)
    }
    catch (err) {
        next(err);
    }
})
module.exports = router;
