var net = require('net');
var fs = require('fs');
var server = net.createServer(connect);
var clientManager = [];
var date = new Date();


//this will go off when a client connects to the server
function connect(client){
  //client.username = alert('What is your username?');



  client.setEncoding('utf-8');

  client.write('Please type in the word username\nfollowed by your your choice of username like so\nusername: your username');

  client.on('data',function(data){
    if(data.search(/username:/i) >= 0){
      var splitData = data.split(' ');

      if(splitData[1].toLowerCase()=== 'admin\n'){
        console.log('********   ADMIN REGISTRATION DENIED   ********');
        client.write("********   CAN'T USE THAT USERNAME!!!    ********");
      }
      else {
        for(var l = 0; l < clientManager.length ; l++){
          if(clientManager[l].username===splitData[1]){
            console.log('********    NAME REGISTRATION DENIED - ALREADY TAKEN    ********');
             return client.write('********     NAME ALREADY TAKEN      ********');
          }
          else {
            client.username = splitData[1];
            console.log(client.username);
            return client.write('Welcome to the Server '+client.username);
          }
        }
      }
    }
  });

  clientManager.push(client);

  console.log("CONNECTED: "+ address.address +":"+ client.remotePort);

  client.on('data',function(data){
    if(client.username !== undefined){
      console.log('SERVER BCAST FROM '+ client.username+": "+data.toString());
    } else {
      console.log('SERVER BCAST FROM '+ address.address +":"+client.remotePort+": "+data.toString());
    }
    for(var j=0 ; j< clientManager.length ; j++){
      if(client!==clientManager[j]){
        if(client.username !== undefined){
          clientManager[j].write(client.username+"==> "+ data.toString());
        } else{
          clientManager[j].write(address.address+':'+client.remotePort+"==> "+ data.toString());
        }
      }
    }
  });

  client.on('end', function(){
    console.log('CLOSED: '+address.address+":"+client.remotePort);
    for(var i = 0;i<clientManager.length;i++){
      console.log(client.remotePort);
      if(clientManager[i]===client){
        clientManager.splice(i,1);
        console.log('this is the amount '+ clientManager.length);
      }
    }
  });
}

process.stdin.on('data',function(data){
  var dataSplitter = data.toString().split(' ');

  if(dataSplitter[0]==="kick"){
    for(var k = 0 ; k<clientManager.length;k++){
      if(dataSplitter[1]===clientManager[k].username || dataSplitter[1]=== (address.address+':'+clientManager[k].remotePort).toString()+"\n"){
        clientManager[k].end();
      }
    }
  } else{
    for(var j=0 ; j< clientManager.length ; j++){
      clientManager[j].write("ADMIN ==> "+ data.toString());
    }
  }


});

// this will go off when the server is turn on
server.listen({port:6969,host:'localhost',address:'0.0.0.0'},function(){
  address = server.address();
  console.log('opened server on %j', address);
});


