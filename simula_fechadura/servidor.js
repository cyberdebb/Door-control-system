var express = require('express')
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/teste',function (req,resp){
  resp.send('oii mundo')
});


app.listen(10000, function() {
    console.log("servidor no ar");
  
});


// -----------------------------------

const WebSocket = require('ws');
var vetor_conexoes=[];


function broadcast (msg)
{
  for (var a=0;a<vetor_conexoes.length;a++)
  {
 
    vetor_conexoes[a].send(msg);

  
  }
}
const wss = new WebSocket.Server({ port: 8000 },function (){
	console.log('rodando');
});

function getListaLogados()
{
  var lista=[];

  for (var a=0;a<vetor_conexoes.length;a++)
  {
   
         lista.push(vetor_conexoes[a].id);

  
  }
  return lista;
}
function broadcastLista()
{
 
  broadcast (JSON.stringify({tipo:'lista',valor:getListaLogados()}));

}

wss.on('connection', function connection(ws) {






  ws.on('close',function (){
      for (let a=0;a<vetor_conexoes.length;a++)
      {
        if (vetor_conexoes[a]==ws) {
          vetor_conexoes.splice(a,1);
                    broadcastLista();

          return;
        }
      }
  });
  ws.on('message', function incoming(message) {
   var m = JSON.parse(message)
    
    console.log(m)
    switch  (m.tipo)
    {
      case 'login':
            console.log(m)

          console.log('recebeu: id='+m.id+'   password'+m.passwd);
          ws.id = m.id;
          vetor_conexoes.push(ws);
          broadcastLista();

          break;
      case 'texto':
          let s = JSON.stringify({tipo:'texto',valor:`<b>${ws.id}</b>:${m.valor}`});
          broadcast(s);

          break;


    }
    

    
  });

});
