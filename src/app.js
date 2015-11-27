var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose,
	config = require( './config.js' );

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://" + config.dbUser + ":" + config.dbPassword + "@" + config.dbServer + ":" + config.dbPort + "/"+ config.dbName );

var reportSchema = {
	dateTime : String,
	origin : String,
	url : String,
	report : String
};
var Report = app.report = restful.model('report', mongoose.Schema( reportSchema ))
  .methods(['get', 'post', 'put', 'delete']);

app.use('/', express.static('public'));
Report.register(app, '/reports');

app.listen(80);
