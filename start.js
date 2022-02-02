/* 
*Это приложени просматривает 2d и 3d  контент проекта и файлов из data storage Forge Autodesk 
*/
// dependencies
require('dotenv').config();
const express = require('express');
const ForgeSDK = require('forge-apis');
const pug = require('pug')
const path = require('path');
//declare variables
const app = express();
var {appName, client_id, client_secret, autoRefresh, scopesExternal, scopesInternal, port} = require('./config');
const BucketsApi = new ForgeSDK.BucketsApi(); 
//Authentication 
function oAuth2TwoLegged(scopes) {return  new ForgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes, autoRefresh)};
var oAuth2TwoLeggedInternal = new ForgeSDK.AuthClientTwoLegged(client_id, client_secret, scopesInternal, autoRefresh);
var internalToken = oAuth2TwoLeggedInternal.authenticate().then(function(credentials){return credentials})
/*
*
*/
//Маршрутизация
app.get('/', function(req, res) {
    res.send('<h2>Это главная страница приложения<h2>')
});
app.get('/model_viewer', (req, res) => {
    res.render('viewer')
})
app.get('/buckets', async (req, res, next) => {
    try { 
        BucketsApi.getBuckets({}, oAuth2TwoLegged, await internalToken).then(function(buckets){
            res.send(buckets);return buckets}, function(err){
            console.error(err);
        });      
    } catch(err) {next(err)}
    })
//Шаблонизация
app.set('views', path.join(__dirname,'views') );
app.set('view engine', 'pug')
//Слушаем порт.
app.listen(port, console.log(`Приложение ${appName}" работает на порту "${port}"`));

