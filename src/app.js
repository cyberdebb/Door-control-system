var express = require('express');
const webSocket = require('ws');
var bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');

var app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
const wss = new webSocket.Server({ port:8080 });

async function conecta() {
  var client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  db = await client.db("DOOR-CONTROL");
  teachers = await db.collection("teachers");
  doors = await db.collection("doors");
}

//Legal de utilizar:
//Assert() é uma função que verifica se uma expressão é verdadeira. Se a expressão for falsa, a função gera um erro que pode ser capturado e tratado. 
  //Ex: assert.equal(2, 1);Erro

//APP
app.get('/', function(req, res){
  //debs
});

app.get('/login', function(req, res)
{
  //debs
});

app.get('/lista', function(req,res)
{
  portas.forEach(function(porta, index){
    console.log("Porta: ${porta}");
  });

});

app.listen(3000, (error) =>{
  if(!error)
    console.log("Server running")
   else
    console.log("Error occurred, server can't start")
});
//END APP

//WEBSOCKET
wss.on('connection',(ws)=>{
  console.log("Client connected");

  ws.send("Bem vindo ao websocket");

  ws.on('message',(message)=>{
    console.log("Mensagem recebida: ${message}");

  });

  ws.on('close',()=>{
    console.log("Cliente desconectado");
  });
});
//END WEBSOCKET

