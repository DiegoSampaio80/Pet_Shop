const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const servicoVeterinarioController = require('./controllers/servicos/servicoVeterinarioController');
const tutorController = require('./controllers/tutor/tutorController');
const petController = require('./controllers/pet/petController');
const categoriaController = require('./controllers/categorias/categoriaController');
const connection = require('./config/database');
const axios = require('axios');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');


/* Configuração ================================================= */
app.set('view engine', 'ejs');
/* usa a engine de template EJS (Embedded JavaScript) para renderizar as views da aplicação. */
app.set('views', path.join(__dirname, 'views'));
/* define o diretório onde as views serão armazenadas, no caso o subdiretório "views" */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({ 
  secret: "pet-shop",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());

app.use(flash());
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
/* Middleware monitora as mudanças no sistema, e, neste caso, é usada para inserir as mensagens de erro e 
sucesso das entradas do input, via biblioteca Flash */

app.get('/', function (req, res) { res.render('index', { navbar: 'navbar' });});
/*  rota para a raiz do aplicativo ("/"), que renderiza a view "index.js" com a engine de template EJS além do 
componente "navbar" - padrão para todos*/
/* Configuração ================================================= */


/* Login ================================================= */

app.get('/login', (req, res)=>{ res.render('login')});

app.post('/login', (req, res) => {
  const usuario = req.body.usuario
  const senha = req.body.senha
  connection.query('SELECT email_funcionario FROM `pet-shop`.cadastro_funcionario WHERE email_funcionario = ? AND senha_funcionario = ?',[usuario, senha], function (error, results, fields) {
    if (results == false) {
      console.error(error);
      req.flash('error_msg', 'Erro no processo de login. Senha ou usuário inválido.');
      res.redirect('/login');
    } 
    
    if (results.length > 0) {
      // Cria a sessão do usuário e define o cookie do ID de sessão exclusivo
      req.session.usuario = {
        id: results[0].id_cadastro_funcionario,
        nome: results[0].nome_funcionario,
        email: results[0].email_funcionario
      };
      res.cookie('usuarioSessionId', req.sessionID);
      // Redireciona o usuário para a página de destino após o login bem-sucedido
      //res.redirect('/dashboard');
      res.render('area-administrativa', { dados: results });
    } else {
      // Exibe uma mensagem de erro caso o e-mail ou a senha estejam incorretos
      res.render('login');
    }
  });
});

const verificarSessao = (req, res, next) => {
  if (req.session.usuario && req.cookies.usuarioSessionId) {
    // Se o usuário estiver logado, permitir que a solicitação continue para a próxima função de middleware ou rota
    next();
  } else {
    // Se o usuário não estiver logado, redirecionar para a página de login
    res.redirect('/login');
  }
};

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

/* Login ================================================= */
/* CRUD Categoria ================================================= */

app.get('/cadastrar-categoria',verificarSessao, function (req, res) { res.render('cadastrar-categoria')});
/* Renderiza a tela "cadastrar categoria" com formulário para o cadastramento */
app.post('/cadastrar-categoria',verificarSessao, categoriaController.cadastrarCategoria);
//Manda os dados via "req.body..." para executar o insert na tabela de categoria"

app.get('/listar-categoria',verificarSessao, categoriaController.listarCategoria);
//Faz um select de todos os dados dos registros da categoria, e lista na tela

/* app.get('/atualizar-categoria', function(req, res) {res.render('/atualizar-categoria');}); */

app.get('/atualizar-categoria/:id',verificarSessao, categoriaController.editarCadastroCategoria);
/* Renderiza a tela "atualizar categoria" com formulário já preenchidos com os dados recuperados do banco
para atualização através do id que é passado como variável via url por meio de um buttom */

app.post('/atualizar-categoria/:id',verificarSessao, categoriaController.atualizarCadastroCategoria);
/* Recebo os dados do formulário "editarCadastroCategoria" e faz um update na categoria selecionada*/

app.post('/servico/:id',verificarSessao, categoriaController.excluirCadastroCadastro);
//Exclue um registro definido pelo id enviado via url por um buttom

/* CRUD Categoria ================================================= */

/* CRUD Serviços Cliente ================================================= */
app.get('/veterinario-serv-cliente', (req, res)=>{
  connection.query('SELECT * FROM servico_veterinario GROUP BY serv_veterinario ASC', (error, results, fields) => {
    if (error) {
      //console.log(error);
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/');
    } else {
      res.render('veterinario-serv-cliente', { resultados: results });
    }
  })
});

app.get('/veterinario-serv-cliente/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM servico_veterinario WHERE serv_categoria = ? ORDER BY serv_veterinario ASC', [id], (error, results, fields) => {
    if (error) {
      //console.log(error);
      //res.status(500).send('Erro ao consultar o registro.');
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/veterinario-serv-cliente');
    } else {
      res.render('veterinario-serv-cliente', { resultados: results });
    }
  });
});
/* CRUD Serviços Cliente ================================================= */

/* CRUD Serviços ================================================= */

app.get('/veterinario-serv/:id',verificarSessao, (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM servico_veterinario WHERE serv_categoria = ? ORDER BY serv_veterinario ASC', [id], (error, results, fields) => {
    if (error) {
      //console.log(error);
      //res.status(500).send('Erro ao consultar o registro.');
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/veterinario-serv');
    } else {
      res.render('veterinario-serv', { resultados: results });
    }
  });
});


app.get('/cadastrar-serv', verificarSessao, (req, res) => {
  connection.query('SELECT id_categoria_serv, nome_categoria_serv FROM categoria_servico', function (error, results, fields) {
    if (error) {
      console.error(error);
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/cadastrar-serv');
    } else {
      res.render('cadastrar-serv', { categorias: results });
    }
  });
});

app.post('/cadastrar-serv', verificarSessao, servicoVeterinarioController.cadastrarServ);

app.get('/atualizar-serv', verificarSessao, function(req, res) {res.render('atualizar-serv');});
app.get('/atualizar-serv/:id', verificarSessao, servicoVeterinarioController.editarCadastroServ);
app.post('/atualizar-serv/:id', verificarSessao, servicoVeterinarioController.atualizarCadastroServ);
app.post('/veterinario-serv/:id', verificarSessao, servicoVeterinarioController.excluirCadastroServ);

app.get('/veterinario-serv', verificarSessao, (req, res)=>{
  connection.query('SELECT * FROM servico_veterinario GROUP BY serv_veterinario ASC', (error, results, fields) => {
    if (error) {
      //console.log(error);
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/veterinario-serv');
    } else {
      res.render('veterinario-serv', { resultados: results });
    }
  })
});

/* CRUD Serviços ================================================= */


/* CRUD Tutor ================================================= */
app.get('/listar-tutor',verificarSessao, tutorController.listarCadastroTutor);

//app.get("/cadastrar-tutor", (req, res)=>{res.render('cadastrar-tutor')});
app.post('/cadastrar-tutor',verificarSessao, tutorController.cadastrarTutor);

app.get('/atualizar-tutor',verificarSessao, function(req, res) {res.render('atualizar-tutor');});
app.get('/atualizar-tutor/:id', verificarSessao, tutorController.editarCadastroTutor);
app.post('/atualizar-tutor/:id',verificarSessao, tutorController.atualizarCadastroTutor);

app.post('/listar-tutor/:id',verificarSessao, tutorController.excluirCadastroTutor);

app.get('/cadastrar-tutor',verificarSessao, function(req, res) {
  connection.query('SELECT * FROM status', function (error, results) {
    if (error) {
      console.error(error);
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/cadastrar-tutor');
    } else {
      //res.sendFile('cadastrar-tutor', { situacao: results });
      connection.query('SELECT * FROM tipo_documento', function (error, results1) {
        if (error) {
          console.error(error);
          req.flash('error_msg', 'Erro no processo de listagem.');
          res.redirect('/cadastrar-tutor');
        } else {
          const testeSql = Array.from(results);
          const testeSql1 = Array.from(results1);
          console.log(testeSql);
          console.log(testeSql1);
          res.render('cadastrar-tutor', { tipoDocumentos: testeSql1, situacao: testeSql });
        }
      });
    }
  });
  
});

/* CRUD Tutor ================================================= */


/* CRUD Pet ================================================= */
app.get('/listar-pet',verificarSessao, petController.listarCadastroPet);

app.get("/cadastrar-pet",verificarSessao, (req, res)=>{res.render('cadastrar-pet')});
app.post('/cadastrar-pet',verificarSessao, petController.cadastrarPet);

app.get('/atualizar-pet',verificarSessao, function(req, res) {res.render('atualizar-pet');});
app.get('/atualizar-pet/:id',verificarSessao, petController.editarCadastroPet);
app.post('/atualizar-pet/:id',verificarSessao, petController.atualizarCadastroPet);

app.post('/listar-pet/:id',verificarSessao, petController.excluirCadastroPet);
/* CRUD Pet ================================================= */


app.use((req, res) => {
  res.status(404).render('erro-404', { navbar: 'navbar' });
});


/* Servidor ================================================= */
app.listen(port, () => {
  console.log(`Projeto rodando na porta http://localhost:${port}`);
});
/* Servidor ================================================= */
