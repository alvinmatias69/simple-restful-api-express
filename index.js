var app = require('express')();
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'cijeruk'
});

connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/fields',function(req, res) {
	connection.query('select * from fields where deleted_at is null', function(error, result, fields) {
		if (error) {
			res.status(500).send(error);
		}

		let results = {
			'status': 'SUCCESS_GET',
			'message': 'OK',
			'data': result
		}

		res.status(200).json(results);
	})
});

app.get('/field/:id', function(req, res) {
	connection.query('select * from fields where id = ' + req.params.id + ' and deleted_at is null', function(error, result, fields) {
		if (error) {
			res.status(500).send(error);
		}

		let results = {
			'status': 'SUCCESS_GET',
			'message': 'OK',
			'data': result
		}

		res.status(200).json(results);	
	})
});

app.post('/field', function(req, res) {
	connection.query('insert into fields(lat, lng, dsc) values (' + req.body.lat + ', ' + req.body.lng + ', "' + req.body.dsc + '")', function(error, result, fields) {
		if (error) {
			res.status(500).send(error);
		}

		let results = {
			'status': 'SUCCESS_POST',
			'message': 'OK',
			'data': null	
		}

		res.status(200).json(results);
	})
});

app.put('/field/:id', function(req, res) {
	connection.query('update fields set lat = ' + req.body.lat + ', lng = ' + req.body.lng + ', dsc = "' + req.body.dsc + '" where id = ' + req.params.id, function(error, result, fields) {
		if (error) {
			res.status(500).send(error);
		}

		let results = {
			'status': 'SUCCESS_PUT',
			'message': 'OK',
			'data': null	
		}

		res.status(200).json(results);
	})
});

app.delete('/field/:id', function(req, res) {
	connection.query('update fields set deleted_at = ' + Date.now() + ' where id = ' + req.params.id, function(error, result, fields) {
		if (error) {
			res.status(500).send(error);
		}

		let results = {
			'status': 'SUCCESS_DELETE',
			'message': 'OK',
			'data': null	
		}

		res.status(200).json(results);
	})
});

app.listen(3000, function() {
	console.log('cool apps listening on port 3000');
});