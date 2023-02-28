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

/* Configuração ================================================= */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({ 
  secret: "pet-shop",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.get('/', function (req, res) { res.render('index', { navbar: 'navbar' });});

/* Configuração ================================================= */


/* CRUD Categoria ================================================= */

app.get('/cadastrar-categoria', function (req, res) { res.render('cadastrar-categoria')});
app.post('/cadastrar-categoria', categoriaController.cadastrarCategoria);

app.get('/listar-categoria', categoriaController.listarCategoria);

app.get('/atualizar-categoria', function(req, res) {res.render('/atualizar-categoria');});
app.get('/atualizar-categoria/:id', categoriaController.editarCadastroCategoria);
app.post('/atualizar-categoria/:id', categoriaController.atualizarCadastroCategoria);

app.post('/servico/:id', categoriaController.excluirCadastroCadastro);
/* CRUD Categoria ================================================= */
/* CRUD Serviços ================================================= */

app.get('/veterinario-serv/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM servico_veterinario WHERE serv_categoria = ? ORDER BY serv_veterinario ASC', [id], (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao consultar o registro.');
    } else {
      res.render('veterinario-serv', { resultados: results });
    }
  });
});


app.get('/cadastrar-serv', function(req, res) {
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

app.post('/cadastrar-serv', servicoVeterinarioController.cadastrarServ);

app.get('/atualizar-serv', function(req, res) {res.render('atualizar-serv');});
app.get('/atualizar-serv/:id', servicoVeterinarioController.editarCadastroServ);
app.post('/atualizar-serv/:id', servicoVeterinarioController.atualizarCadastroServ);
app.post('/servico/:id', servicoVeterinarioController.excluirCadastroServ);

//app.get('/veterinario-serv', servicoVeterinarioController.listarCadastroServ);

/* CRUD Serviços ================================================= */


/* CRUD Tutor ================================================= */
app.get('/listar-tutor', tutorController.listarCadastroTutor);

app.get("/cadastrar-tutor", (req, res)=>{res.render('cadastrar-tutor')});
app.post('/cadastrar-tutor', tutorController.cadastrarTutor);

app.get('/atualizar-tutor', function(req, res) {res.render('atualizar-tutor');});
app.get('/atualizar-tutor/:id', tutorController.editarCadastroTutor);
app.post('/atualizar-tutor/:id', tutorController.atualizarCadastroTutor);

app.post('/servico/:id', tutorController.excluirCadastroTutor);

/* CRUD Tutor ================================================= */


/* CRUD Pet ================================================= */
app.get('/listar-pet', petController.listarCadastroPet);

app.get("/cadastrar-pet", (req, res)=>{res.render('cadastrar-pet')});
app.post('/cadastrar-pet', petController.cadastrarPet);

app.get('/atualizar-pet', function(req, res) {res.render('atualizar-pet');});
app.get('/atualizar-pet/:id', petController.editarCadastroPet);
app.post('/atualizar-pet/:id', petController.atualizarCadastroPet);

app.post('/servico/:id', petController.excluirCadastroPet);
/* CRUD Pet ================================================= */


app.use((req, res) => {
  res.status(404).render('erro-404', { navbar: 'navbar' });
});


/* Servidor ================================================= */
app.listen(port, () => {
  console.log(`Projeto rodando na porta http://localhost:${port}`);
});
/* Servidor ================================================= */
