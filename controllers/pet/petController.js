const connection = require('../../config/database');
const path = require('path');

function cadastrarPet(req, res) {

  const nome_pet = req.body.nome_pet;
  const cod_tutor = req.body.cod_tutor;
  const dt_nasc_pet = req.body.dt_nasc_pet;
  const especie = req.body.especie;
  const raca = req.body.raca;
  const pelagem = req.body.pelagem;
  const observacao = req.body.observacao;


  const sql = 'INSERT INTO `pet-shop`.`cadastro_pet` (`nome_pet`, `cod_tutor`, `dt_nasc_pet`, `especie`,`raca`,`pelagem`,`observacao`)VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [nome_pet, cod_tutor, dt_nasc_pet, especie, raca, pelagem, observacao];

  connection.query(sql, values, (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro no cadastramento! Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/cadastrar-pet');
    } else {
      req.flash('success_msg', 'Cadastrado com sucesso!');
      res.redirect('/cadastrar-pet');
    }
  });
}

function listarCadastroPet(req, res) {
  const sql = 'SELECT * FROM `pet-shop`.cadastro_pet LEFT JOIN `pet-shop`.cadastro_tutor ON `pet-shop`.cadastro_pet.cod_tutor = `pet-shop`.cadastro_tutor.id_tutor ORDER BY nome_pet ASC';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      req.flash('error_msg', 'Erro no processo de listagem.');
      res.redirect('/listar-pet');
    } else {
      res.render('listar-pet', { resultados: results });
    }
  });
}

function editarCadastroPet(req, res) {
  const id = req.params.id;
  const sql = 'SELECT * FROM `pet-shop`.cadastro_pet LEFT JOIN `pet-shop`.cadastro_tutor ON `pet-shop`.cadastro_pet.cod_tutor = `pet-shop`.cadastro_tutor.id_tutor WHERE id_pet = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro na  edição do pet.');
      res.redirect('/listar-pet');
    } else {
      const registro = results[0];
      res.render('atualizar-pet', { editarPet: registro });
    }
  });
}


function atualizarCadastroPet(req, res) {
  const id = req.params.id;
  const nome_pet = req.body.nome_pet;
  const dt_nasc_pet = req.body.dt_nasc_pet;
  const especie = req.body.especie;
  const raca = req.body.raca;
  const pelagem = req.body.pelagem;
  const observacao = req.body.observacao;
  const cod_tutor = req.body.cod_tutor;

  const pesquisa_tutor = 'SELECT * FROM `pet-shop`.cadastro_tutor WHERE id_tutor = ?';
  connection.query(pesquisa_tutor, [cod_tutor], (error, resultados) => {
    if (resultados.length == 0 ) {
      console.log(resultados);
      req.flash('error_msg', 'Erro na edição do pet. Não há esse número de tutor cadastrado no sistema.');
      res.redirect('/listar-pet');
    } else {
      const sql = 'UPDATE cadastro_pet SET nome_pet = ?, dt_nasc_pet = ?, especie = ?, raca = ?, pelagem = ?, observacao = ?, cod_tutor = ? WHERE id_pet = ?';
      const values = [nome_pet, dt_nasc_pet, especie, raca, pelagem, observacao, cod_tutor, id];

      connection.query(sql, values, (error, results) => {
        if (error) {
          req.flash('error_msg', 'Erro no processo de edição. Provável duplicidade de cadastro ou algum campo não preenchido.');
          res.redirect('/listar-pet');
        } else {
          req.flash('success_msg', 'Editado com sucesso!')
          res.redirect('/listar-pet');
        }
      });
    }
  });
}

function excluirCadastroPet(req, res) {
  const idPet = req.params.id;

  const query = "DELETE FROM `pet-shop`.cadastro_pet WHERE id_pet = ?";
  connection.query(query, [idPet], (error, results, fields) => {
    if (error) {
      console.log(error)
      req.flash('error_msg', 'Erro no processo de exclusão.');
      res.redirect('/listar-pet');
    } else {
      req.flash('success_msg', 'Excluído com sucesso!');
      res.redirect('/listar-pet');
    }
  });
}

module.exports = {
  listarCadastroPet,
  cadastrarPet,
  editarCadastroPet,
  atualizarCadastroPet,
  excluirCadastroPet
};