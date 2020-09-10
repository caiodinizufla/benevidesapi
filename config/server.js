var express = require('express'),
	consign = require('consign'),
	bodyParser = require('body-parser'),
	mongodb = require('mongodb'),
	expressValidator = require('express-validator'), 
	expressSession = require('express-session'),
	mongoose = require('mongoose');
	
	dotenv = require('dotenv').config({path: __dirname + '/../.env'});


mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.URL, { useNewUrlParser: true });


var app = express();

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*'); //ou * para habilitar para todos
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS'); //ou * para habilitar para todos
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); //ou * para habilitar para todos
	res.setHeader("Access-Control-Allow-Credentials", '*'); //ou * para habilitar para todos
	next();
});

/* configurar o middleware express-session */
app.use(expressSession({
	secret: 'fgjhdfgasdf',
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.json());


/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/controllers')
	.into(app);



/* exportar o objeto app */
module.exports = app;