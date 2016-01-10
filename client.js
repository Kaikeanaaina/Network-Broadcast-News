var net = require('net');

var client = net.connect({port:8080,host:'localhost'}, function(){

  client.on('data',function(data){
    console.log(data.toString());
  });

  process.stdin.setEncoding('utf8');



});