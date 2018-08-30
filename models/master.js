var connection = require('../connection');

function master() {
	
	this. ListState = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `statemaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
}
module.exports = new master();