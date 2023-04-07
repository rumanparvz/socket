const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    //get all online users 
    const getUsers = async ()=>{
        const activeUserSocket = io.sockets.sockets;
         const sids = io.sockets.adapter.sids;
         const ActiveuserArray = [...sids.keys()]; 
         const ActiveUser = []
         ActiveuserArray.forEach(userId=>{
          const UserSocket = activeUserSocket.get(userId);
          if(!UserSocket.name) return
            ActiveUser.push({
                id:UserSocket.id,
                name:UserSocket.name,
            })
         })

         return ActiveUser;

    }
    socket.on('setName',async(name,cb)=>{
        socket.name = name;
        cb();
      const ActiveUsers = await getUsers();
     console.log(ActiveUsers)
    })

   socket.on('disconnect',async()=>{
        const ActiveUsers = await getUsers();
        console.log(ActiveUsers)
   })
        
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});

