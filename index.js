require('dotenv').config();
let express = require('express');
let path = require('path');
let pug = require('pug');
let app = express();

let { appName, port } = require('./server/config');

app.get('/', function(req, res) {res.render('index')});

//app.get('/get_metadata', require('./server/routes/get_metadata'))
app.get('/bucket_details', require('./server/routes/bucket_details')) 
app.get('/public_token', require('./server/routes/publictoken'));
app.get('/buckets', require('./server/routes/buckets'));

app.set('views', path.join( __dirname,'views')); 
app.set('view engine', 'pug');

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Это не работает');
});

app.listen(port, console.log(`Приложение ${appName}" работает на порту "${port}"`));

