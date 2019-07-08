var express = require('express');
var app = express();
app.use(express.static('public'));
var path = require('path');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/index.html'));
});
app.get('/style.css', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/style/style.css'));
});
app.get('/sketch.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/js/sketch.js'));
});
app.get('/dft.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/js/dft.js'));
});
app.get('/neal_mcbeal.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/js/neal_mcbeal.js'));
});

app.listen(8080);
