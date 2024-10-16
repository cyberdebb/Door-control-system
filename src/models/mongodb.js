const {MongoClient} = require('mongodb');
var db, professores, salas;

async function conecta() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  db = await client.db("DOOR-CONTROL");
  
  professores = await db.collection("professores");
  salas = await db.collection("salas");

  await populaProfessores();
  await populaSalas();

  return {db, professores, salas};
}

async function portasDisponiveis(professores, idUFSC){
  const professor = await professores.findOne({id: idUFSC });

  if(professor){
    return professor.portasDisponiveis;
  } 
  else{
    throw new Error(`Professor com ID ${idUFSC} não encontrado!`);
  }
}

// Função para popular o banco com os professores do JSON
async function populaProfessores() {
  try {
    // Lê o arquivo JSON contendo os professores
    const data = await fs.readFile('professores.json', 'utf8');
    const professores_dados = JSON.parse(data);

    // Insere os professores no banco de dados
    await professores.insertMany(professores_dados);
    console.log('Professores inseridos com sucesso!');
  } 
  catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
}

async function populaSalas() {
  try {
    // Lê o arquivo JSON contendo as portas
    const data = await fs.readFile('salas.json', 'utf8');
    const salas_dados = JSON.parse(data);

    // Insere as salas no banco de dados
    await salas.insertMany(salas_dados);
    console.log('Salas inseridas com sucesso!');
  } 
  catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
}


module.exports
{
  conecta,
  portasDisponiveis,
  populaProfessores,
  populaSalas;
}