/* 
*Это приложени просматривает 2d и 3d  контент проекта и файлов из data storage Forge Autodesk 
*/
// Используемые модули
require('dotenv').config();
const express = require('express');
const ForgeSDK = require('forge-apis');
const pug = require('pug')
const path = require('path');
//Переменные
let app = express();
var {appName, port, client_id, client_secret, autoRefresh, scopesExternal, scopesInternal} = require('./server/config');
//Функции
function getClient(scopes) { return new ForgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes, autoRefresh);}
/*
* Маршрутизация
*/
//Главная страница ++++++++++...Это роутинг
app.get('/', function(req, res) {
        res.render('index')
});
// URL для перечня бакетов...Это роутинг
app.get('/buckets', async (req, res, next) => {
    try {
       tokenInternal = await getClient(scopesInternal).authenticate();
       let BucketsApi = new ForgeSDK.BucketsApi();
       let buckets = await BucketsApi.getBuckets({}, getClient(scopesInternal), tokenInternal)
     res.send(buckets)
    } catch (err) {next(err)}});
// Генерируем URL для публичного токена...Это роутинг
app.get('/publictoken', async (req, res, next) => {
    try {
       tokenExternal = await getClient(scopesExternal).authenticate();
       res.send(tokenExternal)
    } catch (err) {next(err)}}); 
// Пробуем GET buckets/:bucketKey/details API
app.get('/bucket_details', async (req, res, next) => {
    try{
    tokenInternal = await getClient(scopesInternal).authenticate();
    let BucketsApi = new ForgeSDK.BucketsApi();
    let bucketDetails = await BucketsApi.getBucketDetails("warestore2", getClient(scopesInternal), tokenInternal);
    res.send(bucketDetails);
    console.log(bucketDetails);
}catch (err) {next(err)}
    //"warestore2"
    //getBucketDetails(bucketKey, oauth2client, credentials)
})
//Шаблонизация ...Это middleware
app.set('views', path.join(__dirname,'./views') ); 
app.set('view engine', 'pug')
//Слушаем порт.... Это middleware
app.listen(port, console.log(`Приложение ${appName}" работает на порту "${port}"`));


