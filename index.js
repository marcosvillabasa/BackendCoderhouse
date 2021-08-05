const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

const routesProducts = require('./src/routes/products');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

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
