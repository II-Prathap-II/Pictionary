const express = require("express");
// const http = require("http")
// const ws = require("ws")

// const app = express()
// const server = http.createServer(app)

// app.use(express.static("static"))



// const wss = new WebSocket.Server({server : server})

// app.get('/',function(req,res){
    
//     res.sendFile(__dirname+"/index.html")

// })

// server.listen("3000")

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const WebSocket = require('ws');



const server = express()
  .use(express.static("static"))
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({server})

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));

    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });


  });


