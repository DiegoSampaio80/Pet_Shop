const connection = require('../../config/database');
const path = require('path');


function editarCadastroTutor(req, res) {
  const id = req.params.id;

  const sql = 'SELECT * FROM cadastro_tutor WHERE id_tutor = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error(error);
      req.flash('error_msg', 'Erro na  busca do tutor.');
      res.render('/listar-tutor');
    } else {
      const registro = results[0];
      res.render('atualizar-tutor', { editarTutor: registro });
    }
  });
}

function atualizarCadastroTutor(req, res) {
  const id = req.params.id;
  const nome_tutor = req.body.nome_tutor;
  const email_tutor = req.body.email_tutor;
  const contato_tutor = req.body.contato_tutor;
  const contato_tutor_2 = req.body.contato_tutor_2;
  const endereco_tutor = req.body.endereco_tutor;
  const numero = req.body.numero;
  const complemento = req.body.complemento;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const estado = req.body.estado;
  const cep = req.body.cep;
  const documento_tutor = req.body.documento_tutor;
  const tipo_doc_tutor = req.body.tipo_doc_tutor;
  const status = req.body.status;

  const sql = 'UPDATE cadastro_tutor SET nome_tutor= ?, email_tutor= ?, contato_tutor= ?, contato_tutor_2= ?,endereco_tutor= ?, numero= ?, complemento= ?, bairro= ?, cidade= ?, estado= ?, cep= ?, documento_tutor= ?, tipo_doc_tutor= ?, status = ? WHERE id_tutor = ?';
  const values = [nome_tutor, email_tutor, contato_tutor, contato_tutor_2, endereco_tutor, numero, complemento, bairro, cidade, estado, cep, documento_tutor, tipo_doc_tutor, status, id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      //res.status(500).json({ error: 'Erro ao atualizar tutor' });
      req.flash('error_msg', 'Erro no processo de edição. Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/listar-tutor');
    } else {
      req.flash('success_msg', 'Editado com sucesso!');
      res.redirect('/listar-tutor');
    }
  });
}
function cadastrarTutor(req, res) {

  const nome_tutor = req.body.nome_tutor;
  const email_tutor = req.body.email_tutor;
  const contato_tutor = req.body.contato_tutor;
  const contato_tutor_2 = req.body.contato_tutor_2;
  const endereco_tutor = req.body.endereco_tutor;
  const numero = req.body.numero;
  const complemento = req.body.complemento;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const estado = req.body.estado;
  const cep = req.body.cep;
  const documento_tutor = req.body.documento_tutor;
  const tipo_doc_tutor = req.body.tipo_doc_tutor;
  const status = req.body.status;

  const sql = 'INSERT INTO `pet-shop`.`cadastro_tutor` (`nome_tutor`, `email_tutor`, `contato_tutor`, `contato_tutor_2`, `endereco_tutor`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`,`documento_tutor`,`tipo_doc_tutor`,`status`)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [nome_tutor, email_tutor, contato_tutor, contato_tutor_2, endereco_tutor, numero, complemento, bairro, cidade, estado, cep, documento_tutor, tipo_doc_tutor, status];

  connection.query(sql, values, (error, results) => {
    if (error) {
      //console.error(error);
      req.flash('error_msg', 'Erro no cadastramento! Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/cadastrar-tutor');
    } else {
      req.flash('success_msg', 'Cadastrado com sucesso!');
      res.redirect('/cadastrar-tutor');
    }
  });
}

function listarCadastroTutor(req, res) {
  const sql = 'SELECT * FROM cadastro_tutor ORDER BY nome_tutor ASC';
  connection.query(sql, (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro no processo de listagem do tutor.');
      res.redirect('/listar-tutor');
    } else {
      //req.flash('success_msg', 'Listado com sucesso!');
      res.render('listar-tutor', { resultados: results });
    }
  });
}

function excluirCadastroTutor(req, res) {
  const id_tutor = req.params.id;

  const query = `DELETE FROM cadastro_tutor WHERE id_tutor = ${id_tutor}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      req.flash('error_msg', 'Erro no processo de exclusão do tutor.');
      res.redirect('/listar-tutor');
      //res.status(500).send('Erro ao excluir tutor.');
    } else {
      req.flash('success_msg', 'Excluído com sucesso!');
      res.redirect('/listar-tutor');
    }
  });
}

module.exports = {
  listarCadastroTutor,
  cadastrarTutor,
  editarCadastroTutor,
  excluirCadastroTutor,
  atualizarCadastroTutor
};