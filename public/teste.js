var socket;

function conectaServidorSockets (url)
{
     socket = new ReconnectingWebSocket(url);

    socket.onopen = function(evt) {
        console.log('Conectou no servidor');
        chatInvisivel();
    }
    socket.onclose = function(evt) {
              console.log(evt)
               console.log('foi desconectado do servidor'+evt);
                       chatInvisivel();


    }
    socket.onmessage = function(evt) {


       var tmp = evt.data;
		tmp  = JSON.parse(tmp);
        console.log(tmp)
        switch (tmp.tipo){

        case 'lista':
                console.log('um novo usuario se logou..');
                document.getElementById('lista-conectados').innerHTML=tmp.valor;
                console.log(tmp.valor);
                        chatVisivel();

            break;
        case 'texto':
               
                document.getElementById('texto').innerHTML=document.getElementById('texto').innerHTML+'<br>'+tmp.valor;
               

            break;
        }
     
    }

}
function enviaMSG()
{
    var conteudo = document.getElementById('valorMSG').value;
    var m = {tipo:'texto',valor:conteudo};
    socket.send(JSON.stringify(m));
}
function enviaCREDENCIAIS ()
{

    let meuID, minhaPASSWORD;
        meuID =  document.getElementById('valorID').value   ;
        minhaPASSWORD =  document.getElementById('valorPASSWORD').value   ;
        socket.send(JSON.stringify({tipo:'login',id:meuID,passwd:minhaPASSWORD}));

}

function chatVisivel()
{
document.getElementById('chat').style.display='block';
document.getElementById('login').style.display='none';

}
function chatInvisivel()
{
document.getElementById('chat').style.display='none';
document.getElementById('login').style.display='block';


}


document.addEventListener("DOMContentLoaded", function(event) {
  
  document.getElementById('botao').addEventListener('click',enviaMSG);
  document.getElementById('botaoCREDENCIAIS').addEventListener('click',enviaCREDENCIAIS);

      conectaServidorSockets('ws://localhost:8000');


});
