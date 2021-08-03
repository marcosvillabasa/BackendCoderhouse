const express = require('express');
const app = express();
const PORT = 8080;

const routesProducts = require('./routes/products');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/api/products', routesProducts);

app.get('/api', (req, res) => {
	res.json({
		ok: true,
		msg: 'Api products',
	});
});

const server = app.listen(8080, () => {
	console.log(`Server on: ${PORT}`);
});

server.on('error', () => {
	console.log('Error detectado');
});
