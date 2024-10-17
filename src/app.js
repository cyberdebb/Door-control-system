var express = require('express');
const webSocket = require('ws');
const { conecta, salasDisponiveis, hashSenha, populaProfessores, populaSalas, login } = require('models/database');
const { createHmac } = require('node:crypto');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const wss = new webSocket.Server({ port:8080 });


//APP
app.get('/', function(req, res) {
  res.redirect('/login.html');
});


app.post('/login', async function(req, res) {
  const idUFSC = req.body.idUFSC;
  const senha = req.body.senha;

  const hash = hashSenha(senha);

  try {
    let professor = await login({id:idUFSC, senha:hash});

    if (professor) {
      res.redirect('/menu.html');
    } 
    else {
      res.send("Login inválido");
    }
  } 
  catch (error) {
    console.log("Erro ao fazer o login", error);
    res.status(500).json({error: error.message});
  }
});


app.get('/lista', async function(req,res) {
  const idUFSC = req.params.idUFSC;  // Email do professor passado na URL

  try{
    const portas = await salasDisponiveis(idUFSC);
    //for each portas?
  } catch(error){
    res.status(500).json({error: error.message});
  }
});


app.get('/abre',function(req,res) {
  //Recebe id da porta que é pra abrir
  //
  let idPorta;

});


app.get(/^(.+)$/, function(req, res) {
  try {
      res.write("A página que vc busca não existe")
      res.end();
  } catch (e) {
      res.end();
  }
});


async function iniciaServidor() {
  try {
    await conecta();
    await populaProfessores();
    await populaSalas();

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } 
  catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

iniciaServidor();
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

