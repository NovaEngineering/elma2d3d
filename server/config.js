require('dotenv').config();
const appName = process.env.APP_NAME;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const autoRefresh = true;
const scopesExternal = ['viewables:read'];
const scopesInternal = ['data:read', 'bucket:read'];
const port = process.env.PORT;
module.exports = {appName, client_id, client_secret, autoRefresh, scopesExternal, scopesInternal, port}