const express = require('express');
const app = express();
const server = require('http').Server(app);
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: null
}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'))
//Socket.io
const io = require('socket.io')(server);
io.on("connection", (socket) => {
  // This file will be read on new socket connections
  require('./sockets/chat.js')(io, socket);
})
io.on("connection", (socket) => {
  console.log("🔌 New user connected! 🔌");
})



app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})