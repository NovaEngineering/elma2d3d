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
let app = express();
var {appName, port, client_id, client_secret, autoRefresh, scopesExternal, scopesInternal} = require('./server/config');
//Функции
function getClient(scopes) { return new ForgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes, autoRefresh);}
/*
* Маршрутизация
*/
//Главная страница ++++++++++
app.get('/', function(req, res) {
        res.render('main')
});
//Страница вьера. Здесь смотрится модель и выводятся бакеты
app.get('/models', function (req, res, next) {res.render('viewer')});
     
    
//Вызываем через Фордж апи список моделей

    //res.render('viewer')

app.get('/getbuckets', async (req, res, next) => {
    try {
       tokenInternal = await getClient(scopesInternal).authenticate();
       let BucketsApi = new ForgeSDK.BucketsApi();
       let buckets = await BucketsApi.getBuckets({}, getClient(scopesInternal), tokenInternal)
     res.send(buckets)
     
    } catch (err) {next(err)}});

//Шаблонизация
app.set('views', path.join(__dirname,'views') );
app.set('view engine', 'pug')
//Слушаем порт.
app.listen(port, console.log(`Приложение ${appName}" работает на порту "${port}"`));


