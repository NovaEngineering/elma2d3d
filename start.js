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
//Главная страница 
app.get('/', function(req, res) {
        res.render('index')
});
// URL для перечня бакетов
app.get('/buckets', async (req, res, next) => {
    try {
       tokenInternal = await getClient(scopesInternal).authenticate();
       let BucketsApi = new ForgeSDK.BucketsApi();
       let buckets = await BucketsApi.getBuckets({}, getClient(scopesInternal), tokenInternal)
     res.send(buckets)
     console.log(req.hostname, req.method )
    } catch (err) {next(err)}});
// Генерируем URL для публичного токена
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
    sampleBucketDetails = await BucketsApi.getBucketDetails("warestore2", getClient(scopesInternal), tokenInternal);
    res.send(sampleBucketDetails)
} catch (err) {next(err)}
})

// Пробуем buckets/:bucketKey/objects/:objectName/details 

// Пробуем получить перечень форматов getFormats(opts, oauth2client, credentials)
app.get('/formats', async (req, res, next) => {
    try{
    tokenInternal = await getClient(scopesInternal).authenticate();
    var DerivativesApi = new ForgeSDK.DerivativesApi();
    let formats =await  DerivativesApi.getFormats( '', getClient(scopesInternal), tokenInternal);
    res.send(formats);
   
} catch (err) {next(err)}
})

// 	buckets/:bucketKey/objects пробуем получить urn = bucket ID
// line 227 of readme.md forge-apus*ForgeSdk.ObjectsApi* | [**getObjects**](docs/ObjectsApi.md#getObjects) | **GET** /oss/v2/buckets/{bucketKey}/objects |
// line 201 of Objects API forge-apis getObjects(bucketKey, opts, oauth2client, credentials)
app.get('/bucketId', async (req, res, next) => {
    try{
    tokenInternal = await getClient(scopesInternal).authenticate();
    let ObjectsApi = new ForgeSDK.ObjectsApi();
    let bucketId = await  ObjectsApi.getObjects( "warestore2", '' , getClient(scopesInternal), tokenInternal);
    res.send(bucketId);
    
} catch (err) {next(err)}
})



////Middleware
//Шаблонизация
app.set('views', path.join(__dirname,'./views') );
app.set('view engine', 'pug')
//

//Слушаем порт.
app.listen(port, console.log(`Приложение ${appName}" работает на порту "${port}"`));


