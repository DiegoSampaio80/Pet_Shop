const connection = require('../../config/database');
const path = require('path');

function listarServ(results) {
    res.render('veterinario-serv', { resultados: results });
}

function cadastrarServ(req, res) {
  const serv_veterinario = req.body.serv_veterinario;
  const unid_medida = req.body.unid_medida;
  const valor = req.body.valor;
  const serv_categoria = req.body.serv_categoria;

  const sql = 'INSERT INTO `pet-shop`.`servico_veterinario` (`serv_veterinario`, `unid_medida`, `valor`, `serv_categoria`) VALUES (?, ?, ?, ?)';
  const values = [serv_veterinario, unid_medida, valor, serv_categoria];

  connection.query(sql, values, (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro no cadastramento! Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/cadastrar-serv');
    } else {
      req.flash('success_msg', 'Cadastrado com sucesso!');
      res.redirect('/cadastrar-serv');
    }
  });
}

function editarCadastroServ(req, res) {
  const id = req.params.id;
  const sql = 'SELECT * FROM servico_veterinario WHERE id_serv_veterinario = ?';
  connection.query(sql, [id], (error, results) => {
    if (error) {
      req.flash('error_msg', 'Erro na  edição do serviço.');
      res.redirect('/veterinario-serv');
    } else {
      const registro = results[0];
      res.render('atualizar-serv', { servicoVeterinario: registro });
    }
  });
}

function atualizarCadastroServ(req, res) {
  const id = req.params.id;
  const serv_veterinario = req.body.serv_veterinario;
  const unid_medida = req.body.unid_medida;
  const valor = req.body.valor;
  const serv_categoria = req.body.serv_categoria;

  const sql = 'UPDATE servico_veterinario SET serv_veterinario = ?, unid_medida = ?, valor = ?, serv_categoria = ? WHERE id_serv_veterinario = ?';
  const values = [serv_veterinario, unid_medida, valor, serv_categoria, id];

  connection.query(sql, values, (error, results) => {
    if (error) {
       req.flash('error_msg', 'Erro no processo de edição. Provável duplicidade de cadastro ou algum campo não preenchido.');
      res.redirect('/listar-categoria');
    } else {
      req.flash('success_msg', 'Editado com sucesso!');
      res.redirect('/veterinario-serv/'+serv_categoria);
    }
  });
}

function excluirCadastroServ(req, res) {
  const idServicoVeterinario = req.params.id;

  const query = `DELETE FROM servico_veterinario WHERE id_serv_veterinario = ${idServicoVeterinario}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      req.flash('error_msg', 'Erro no processo de exclusão.');
      res.redirect('/veterinario-serv/:'+idServicoVeterinario);
    } else {
      req.flash('success_msg', 'Excluído com sucesso!');
      res.redirect('/veterinario-serv/:'+idServicoVeterinario);
    }
  });
}


module.exports = {
  listarServ,
  cadastrarServ,
  atualizarCadastroServ,
  editarCadastroServ,
  excluirCadastroServ
};
