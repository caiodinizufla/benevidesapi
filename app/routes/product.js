module.exports = function(application){
	application.post('/api/getProducts', function(req, res){
		application.app.controllers.product.get(application, req, res);
	});

	application.post('/api/register', function(req, res){
		application.app.controllers.product.register(application, req, res);
	});
}

