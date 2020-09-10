const Product = require('../models/productDAO');

module.exports.register = async function(application, req, res){
	const product = new Product(req.body);
	console.log(product);
	product
		.save()
		.then(newProduct => {
    		console.log('(200){Post} /api/register');
			res.status(200).json({message: "Sucesso ao registrar"});
		}).catch(err => {
			console.log(err);
    		console.log('(500){Post} /api/register');
			res.status(500).json({message: "Perda de conexão com servidor"});
		})
}

module.exports.get = async function(application, req, res){
	const formData = req.body;
	console.log(formData);
	let query = [];
	if(formData.markOk){
		query.push({'quantity': {$gt: 200}});
	}
	if(formData.markAlert){
		query.push({
			$and: [
				{'quantity': {$gte: 100}},
				{'quantity': {$lte: 200}}
			]
		});
	}
	if(formData.markCritical){
		query.push({'quantity': {$lt: 100}});
	}
	console.log(query);
	if(query.length > 0){
		query = {
			$or: query
		};
	}else{
		query = {}		
	}
	Product
		.find(query)
		.then(products => {
    		console.log(products);
    		const response = [];
    		products.map(item => {
    			if(item.quantity < 100){
    				situation = "Crítico"
    			}else if(item.quantity <= 200){
    				situation = "Alerta"    				
    			}else{
    				situation = "Ok"    				
    			}
    			response.push([
    				item._id,
    				item.name,
    				item.price,
    				item.quantity,
    				situation
    			]);
    		})
			res.status(200).json(response);
    		console.log('(200){Post} /api/getProducts');
		}).catch(err => {
			console.log(err);
    		console.log('(500){Post} /api/getProducts');
			res.status(500).json({message: "Perda de conexão com servidor"});
		})
}