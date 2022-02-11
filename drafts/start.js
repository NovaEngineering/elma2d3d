//Это приложени просматривает 2d и 3d  контент проекта и файлов из data storage Forge Autodesk 
// Используемые модули

let express = require('express');
let ForgeSDK = require('forge-apis');
let pug = require('pug')
let path = require('path');
//Переменные
let app = express();
//Импорт переменных
let {appName, port, client_id, client_secret, autoRefresh, scopesExternal, scopesInternal} = require('./server/config')
//Функции
//function getClient(scopes) { return new ForgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes, autoRefresh);}
//Главная страница 
app.get('/', function(req, res) {
    res.render('index')
});
//Данные проекта
app.get('/project_data', function (req, res) { 
    // Данные проекта
    let projectData = {
        name: "Проектирование склада Элма",
        stage: "стадия П (проектная документация)",
    };
    res.json(projectData);
})
// URL для перечня бакетов
app.get('/buckets', async (req, res, next) => {
    try {
        let BucketsApi = new ForgeSDK.BucketsApi();
        res.send(await BucketsApi.getBuckets({}, getClient(scopesInternal), await getClient(scopesInternal).authenticate() ))
         } catch (err) {next(err)}});
app.get('/buckets4tree', async (req, res, next) => {
    try {
        let BucketsApi = new ForgeSDK.BucketsApi();
        res.send(await BucketsApi.getBuckets({}, getClient(scopesInternal), await getClient(scopesInternal).authenticate()))
        } catch (err) {next(err)}});         
// Генерируем URL для публичного токена...Это роутинг
/*app.get('/publictoken', async (req, res, next) => {
    try {
        res.send(await getClient(scopesExternal).authenticate())
    } catch (err) {next(err)}}); 
*/

// Пробуем GET buckets/:bucketKey/details API
app.get('/bucket_details', async (req, res, next) => {
    try{
    //tokenInternal = await getClient(scopesInternal).authenticate();
    let BucketsApi = new ForgeSDK.BucketsApi();
    res.send(await BucketsApi.getBucketDetails("warestore2", getClient(scopesInternal), await getClient(scopesInternal).authenticate()));
   }catch (err) {next(err)}
})
//Шаблонизация ...Это middleware
app.set('views', path.join(__dirname,'views') ); 
app.set('view engine', 'pug')
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
app.get('/bucketId', async (req, res, next) => {
    try{
    let ObjectsApi = new ForgeSDK.ObjectsApi();
    let bucketId = await  ObjectsApi.getObjects("warestore2", '' , getClient(scopesInternal), await getClient(scopesInternal).authenticate());
    res.send(bucketId);
    } catch (err) {next(err)}
})
//Шаблонизация
app.set('views', path.join(__dirname,'./views') );
app.set('view engine', 'pug')
//Слушаем порт.
app.listen(port, console.log(`Приложение ${appName}" работает на порту "${port}"`));
//Error handling - не пойму, зачем
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Это не работает')
})

app.get('/hello', require('./server/routes/sample'))
app.get('/publictoken', require('./server/routes/publictoken'))
//Используй Linters!!! Task runners gulp and grunt