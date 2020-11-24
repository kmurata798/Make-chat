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
//We'll store our online users here
let onlineUsers = {};
let channels = {"General" : []}

io.on("connection", (socket) => {
  // Make sure to send the channels to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels);
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