var net = require('net');

var client = net.connect({port:6969,host:'localhost'}, function(){
  process.stdin.setEncoding('utf8');

  client.on('data',function(data){
    console.log(data.toString());
  });


  process.stdin.on('data', function(data){
    console.log('you said '+ data);
    client.write(data);
  });



});