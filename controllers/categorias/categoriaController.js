
const connection = require('../../config/database');
const path = require('path');


function cadastrarCategoria(req, res) {
  const nome_categoria_serv = req.body.nome_categoria_serv;
  const status = req.body.status;

  const sql = 'INSERT INTO `pet-shop`.`categoria_servico` (nome_categoria_serv, status) VALUES(?,?)';
  const values = [nome_categoria_serv, status];

  connection.query(sql, values, (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro no cadastramento! Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/cadastrar-categoria');
    } else {
      req.flash('success_msg', 'Cadastrado com sucesso!');
      res.redirect('/cadastrar-categoria');
    }
  })
}

function listarCategoria(req, res) {
  const sql = 'SELECT * FROM `pet-shop`.`categoria_servico`';
  connection.query(sql, (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/listar-categoria');
    } else {
      res.render('listar-categoria', { resultados: results });
    }
  });
}

function editarCadastroCategoria(req, res) {
  const id = req.params.id;
  const sql = 'SELECT * FROM `pet-shop`.categoria_servico WHERE id_categoria_serv = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro na  busca do categoria.');
      res.redirect('/listar-categoria');
    } else {
      const registro = results[0];
      res.render('atualizar-categoria', { editarCategoria: registro });
    }
  });
}

function atualizarCadastroCategoria(req, res) {
  const id = req.params.id;
  const nome_categoria_serv = req.body.nome_categoria_serv;
  const status = req.body.status;
  const sql = 'UPDATE `pet-shop`.categoria_servico SET nome_categoria_serv = ?, status = ? WHERE id_categoria_serv = ?';
  const values = [nome_categoria_serv, status, id];
  connection.query(sql, values, (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro no processo de edição. Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/listar-categoria');
    } else {
      req.flash('success_msg', 'Editado com sucesso!');
      res.redirect('/listar-categoria');
    }
  });
}

function excluirCadastroCadastro(req, res) {
  const id_categoria_serv = req.params.id;

  const query = `DELETE FROM categoria_servico WHERE id_categoria_serv = ${id_categoria_serv}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      req.flash('error_msg', 'Erro no processo de exclusão.');
      res.redirect('/listar-categoria');
    } else {
      req.flash('success_msg', 'Excluído com sucesso!');
      res.redirect('/listar-categoria');
    }
  });
}

module.exports = {
  cadastrarCategoria,
  listarCategoria,
  editarCadastroCategoria,
  atualizarCadastroCategoria,
  excluirCadastroCadastro
}
