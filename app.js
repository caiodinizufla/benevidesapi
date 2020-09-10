const app = require('./config/server');

const port = process.env.PORT;

app.listen(port, function(){
	console.log('Running port ' + port)
});