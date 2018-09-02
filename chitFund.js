var path = require('path');
var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var connection = require('./connection');
var routes = require('./routes');
var multer = require('multer');
var fs = require('fs');

var app = express();
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb'}));
app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.static(path.join(__dirname, './www')));

app.get('/', function (req, res) {
    res.send('Hello! The API is up and running');
});
connection.init();
routes.configure(app);


var server = app.listen(8852, function () {
    console.log('Server listening on port ' + server.address().port);
}); 