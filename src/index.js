// const express = require('express');
// const path = require('path');
// const http = require('http');
// const io = require('socket.io');


// //express inicializar
// const app = express();
// const PORT = 8080;

// const routesProducts = require('./routes/products');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const publicPath = path.resolve(__dirname, './public');
// app.use(express.static(publicPath));

// // const publicPath = path.resolve(__dirname, '../public');
// // app.use(express.static(publicPath));

// app.set('view engine', 'ejs');
// const viewsPath = path.resolve(__dirname, '../views');
// app.set('views', viewsPath);

// //routes
// // app.use('/api/products', routesProducts);

// app.get('/hola', (req, res) => {
// 	res.json({ msg: 'hola' });
//   });
  
// const server = http.createServer(app);
// server.listen(PORT, () => {
// 	console.log(`Server on: ${PORT}`);
// });

// // socket
// const WSserver = io(server)
// const messages = []

// WSserver.on('connection', function (socket) {
// 	console.log('Un cliente se ha conectado');
  
// 	// socket.on('new-message', function (data) {
// 	//   messages.push(data);
// 	//   socket.emit('messages', messages);
// 	// });
//   });

const express = require('express');
const path = require('path');
const http = require('http');
const io = require('socket.io');
const routesProducts = require('./routes/products');

const app = express();
const PORT = 8080;

//routes
app.use('/api/products', routesProducts);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

const myServer = http.Server(app);

myServer.listen(PORT, () => console.log('Server up en PORT', PORT));

app.get('/hola', (req, res) => {
  res.json({ msg: 'hola' });
});

const myWSServer = io(myServer);

const messages = [];

myWSServer.on('connection', function (socket) {

  socket.on('new-message', function (data) {
    messages.push(data);
    socket.emit('messages', messages);
  });
});
