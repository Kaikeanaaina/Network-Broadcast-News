var net = require('net');
var server = net.createServer(connect);
var clientManager = [];


//this will go off when a client connects to the server
function connect(client){
  clientManager.push(client);

  //to tell the server who is connected
  console.log("CONNECTED: "+ address.address +":"+ client.remotePort);

  //goes to anyone who connects
  client.write('Welcome to the Server!!!');

  //when the person who connects sends data to the server
  client.on('data', function(data){
    console.log('SERVER BCAST FROM '+ address.address +":"+client.remotePort+": "+data.toString());
    client.write(address.address+':'+client.remotePort+": "+ data.toString());
  });

  //**** need to figure how to figure our which client is talking  if
  if(clientManager.length===2){
    clientManager[0].on('data',function(data){
      clientManager[1].write(address.address+":"+client.remotePort+": "+data.toString());
    });

    clientManager[1].on('data', function(data){
      clientManager[0].write(address.address+":"+client.remotePort+": "+data.toString());
    });
  }

  client.on('end', function(){
    console.log('CLOSED: '+address.address+":"+client.remotePort);
  });

}


// this will go off when the server is turn on
server.listen({port:6969,host:'localhost',address:'0.0.0.0'},function(){
  address = server.address();
  console.log('opened server on %j', address);
});


