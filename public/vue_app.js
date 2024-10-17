const { createApp } = Vue;

var vm = createApp({
  data() {
    return {
      idUFSC: '',  // Campo do formulário
      senha: '',   // Campo do formulário
      alunos: []   // Dados dos alunos
    };
  },
  created() {
    // Você pode carregar os alunos aqui, se quiser
    this.carregarAlunos();
  },
  methods: {
    carregarAlunos() {
      fetch('http://localhost:3000/listaAlunos')
        .then(response => response.json())
        .then(data => {
          this.alunos = data;
        })
        .catch(error => {
          console.error('Erro ao buscar alunos:', error);
        });
    },
    handleLogin() {
      // Lógica de autenticação (você pode integrar aqui com a API)
      console.log(`Tentando login com ID UFSC: ${this.idUFSC} e senha: ${this.senha}`);

      // Exemplo de redirecionamento após o login bem-sucedido:
      // window.location.href = '/menu.html';
    }
  }
}).mount('#vue_app');
