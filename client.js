var net = require('net');

var client = net.connect({port:6969,host:'localhost'}, function(){

  client.on('data',function(data){
    console.log(data.toString());
  });

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(data){
    client.write(data);
  });



});