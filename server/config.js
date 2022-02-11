let ForgeSDK = require('forge-apis');
let appName = process.env.APP_NAME;
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let autoRefresh = true;
let scopesPublic = ['viewables:read'];
let scopesInternal = ['data:read', 'bucket:read'];
let port = process.env.PORT;
let getClient = function (scopes) { return new ForgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes, autoRefresh);}
let internalClient = getClient(scopesInternal);
let publicClient = getClient(scopesPublic);
let internalToken = internalClient.authenticate();
let publicToken = publicClient.authenticate();
module.exports = {appName, port, internalToken, publicToken, internalClient, publicClient,}

  