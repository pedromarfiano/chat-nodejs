const express = require('express');
const path = require('path');
//const mysql = require('mysql');
//const db = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'chat'
//});
//
//db.connect((err) => {
//    if(err) throw err;
//    console.log("Connected!");
//})


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req,res) =>{
    res.render('index.html');
})

io.on('connection', socket =>{
    console.log(`Socket connected:  ${socket.id}`);

    //db.query("SELECT * FROM tbmessages ORDER BY msg_id", (err, result) => {
    //    if (err) throw err;
    //
    //    socket.emit('UploadListMessage', result);
    //})

    socket.on('disconnect', () => {
        console.log(`Disconnected ${socket.id}`);
    })

    socket.on('sendMessage', data =>{
        console.log(data);
        socket.broadcast.emit('receivedMessage', data);

        //db.query("INSERT INTO tbmessages(msg_remetente, msg) VALUES(?, ?)", [data.author, data.message], (err, result) =>{ if(err) throw err })
    })


})

server.listen(3000);