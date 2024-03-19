import {WebSocketServer} from 'ws';
//https://blog.postman.com/set-up-a-websockets-server-in-node-js-postman/

//const wss = new WebSocketServer({port:808});
const wss = new WebSocketServer();

var gpu_client = {};

var clients = [];
wss.on('connection', function connection(ws) {
  console.log("connected");
  clients.push(ws);
  ws.on('message', function message(data) {
    
    //console.log(data);

    if (data == "GPU-1234"){
      gpu_client = ws;
    }

    if (data.toString().startsWith("classify")){
      console.log("cliente " + data);
      clients[0].send(data);
    }

    console.log('received: %s', data);
  });

  ws.send('something');

  
  const intervalID = setInterval(myCallback, 3000, "Parameter 1");
  function myCallback(p){
    ws.send(p);
  }
  



  /*
  clients.foreach(client => {
    client.send("new something");
  }
  );
  */


  /*

  for var i = 0; i< clients.length; i++{
    clients[i].send('new something' + i);  
  }
  */

});
