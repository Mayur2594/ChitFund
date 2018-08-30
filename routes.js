var  master = require('./models/master');
module.exports = {
    configure: function (app) {
        app.post('/api/user/auth/', function (req, res) {
            master.authuser(req.body, res);
        });
        app.get('/api/SendNotification/', function (req, res) {
            master.SendNotification(req, res);
        });
		app.delete('/api/DeleteArea/:areaid', function (req, res) {
			 master.DeleteArea(req.params.areaid,res);
        }); 	
    }
};