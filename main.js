const https = require('https');
const fs = require('fs');
const options ={
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};
var express = require('express');

var app = express();
var port = process.env.port || 8080;
var psat = require("./third_party/ORNL_AMO_TOOL_SUITE/Release/psat.node");

var pumpheadtool = require('./src/pump/pumpheadtool.js');
var pump = require('./src/pump/pump.js');
var pumpachievableefficiency = require("./src/pump/pumpachievableefficiency.js");
var router = express.Router();




router.get('/pumpheadtool/suctionGaugeElevation', function(req, res)
{
	pumpheadtool.CalculateSuctionGaugeElevation(req, res);
});

router.get('/pumpachievableefficiency/pumpefficiency',function(req,res)
{
    pumpachievableefficiency.CalculatePumpEfficiency(req,res);
});

router.get('/pumpheadtool/suctionTankElevation', function(req, res)
{
	pumpheadtool.CalculateSuctionTankElevation(req, res);
});

router.get('/pump/assessment', function(req, res)
{
	pump.CalculateCurrentPumpEfficiency(req, res);
});

router.get('/pump/modifiedAssessment', function(req, res)
{
	pump.CalculateModifiedPumpEfficiency(req, res);
});

https.createServer(options, app).listen(port);
app.use('/', router);
console.log("Listening on port number: " + port +"!");
