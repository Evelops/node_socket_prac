const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
let players = [];


//static root
app.use(express.static(__dirname+'/src'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

const socketio = require('socket.io'); // socket.io define
const ioServer = new socketio.Server(server);

// run socket server 
server.listen(7700,()=>{
    console.log('socket server run');
});

ioServer.on('connection',(socket)=>{
    players.push({posx:100, posy:450, id:socket.id});

    socket.on('updatePlayer',function(data){
        // console.log('updateData');
        for(player of players){
            if(player.id == socket.id){
                player.posx = data.posx;
                player.posy = data.posy;
            }
        }
        socket.emit("updatePlayer",players);

    }); 

});
