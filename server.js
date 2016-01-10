var net = require('net');
var server = net.createServer(connect);

//this will go off when a client connects to the server
function connect(client){




}





// this will go off when the server is turn on
server.listen({port:8080,host:'localhost'},function(){
  address = server.address();
  console.log('opened server on %j', address);
});