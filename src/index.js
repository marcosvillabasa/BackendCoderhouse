const express = require('express');
const app = express();
const path = require('path');
const handlebars = require ('express-handlebars');

const PORT = 8080;

const routesProducts = require('./routes/products');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

//routes
app.use('/api/products', routesProducts);
  

const server = app.listen(8080, () => {
	console.log(`Server on: ${PORT}`);
});

server.on('error', () => {
	console.log('Error detectado');
});
