-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28-Fev-2023 às 03:48
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pet-shop`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastro_pet`
--

CREATE TABLE `cadastro_pet` (
  `id_pet` int(11) NOT NULL,
  `nome_pet` varchar(45) NOT NULL,
  `dt_nasc_pet` varchar(10) NOT NULL,
  `especie` varchar(45) NOT NULL,
  `raca` varchar(45) NOT NULL,
  `pelagem` varchar(45) NOT NULL,
  `observacao` text DEFAULT NULL,
  `cod_tutor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cadastro_pet`
--

INSERT INTO `cadastro_pet` (`id_pet`, `nome_pet`, `dt_nasc_pet`, `especie`, `raca`, `pelagem`, `observacao`, `cod_tutor`) VALUES
(1, 'Salem Saladino', '01/01/2021', 'Gato', 'SRD', 'Rajado de preto e cinza....', 'Alergia a dipirona. Não castrado.', 1),
(4, 'Gamora', '2018-12-01', 'Gato', 'SRD', 'Laranja e branco', 'Castrada.', 1),
(6, 'Elvis', '01/01/2021', 'Gato', 'SRD', 'Branco e rajado de cinza e verde', 'Nada consta', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastro_tutor`
--

CREATE TABLE `cadastro_tutor` (
  `id_tutor` int(11) NOT NULL,
  `nome_tutor` varchar(60) NOT NULL,
  `email_tutor` varchar(45) NOT NULL,
  `contato_tutor` varchar(14) DEFAULT NULL,
  `contato_tutor_2` varchar(14) DEFAULT NULL,
  `endereco_tutor` varchar(150) NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `cep` varchar(45) NOT NULL,
  `documento_tutor` varchar(45) NOT NULL,
  `tipo_doc_tutor` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cadastro_tutor`
--

INSERT INTO `cadastro_tutor` (`id_tutor`, `nome_tutor`, `email_tutor`, `contato_tutor`, `contato_tutor_2`, `endereco_tutor`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`, `documento_tutor`, `tipo_doc_tutor`, `status`) VALUES
(1, 'Diego de Souza Sampaio', 'sd80@gmail.com', '19 9 9999-9991', '', 'Dom José Paulo da Câmara', 654, '', 'Jd.Guarani', 'Campinas', 'São Paulo', '13100-024', '3333333', 'RG', 'Ativo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria_servico`
--

CREATE TABLE `categoria_servico` (
  `id_categoria_serv` int(11) NOT NULL,
  `nome_categoria_serv` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categoria_servico`
--

INSERT INTO `categoria_servico` (`id_categoria_serv`, `nome_categoria_serv`, `status`) VALUES
(1, 'Serviços Veterinários', 'Ativo'),
(2, 'Serviços de Higiene', 'Ativo'),
(3, 'Serviço de Hotelaria', 'Ativo'),
(4, 'Serviço de Creche', 'Ativo'),
(5, 'Serviço de Transporte', 'Ativo'),
(6, 'Venda de Mercadoria', 'Ativo'),
(7, 'Venda de Medicamentos', 'Ativo'),
(8, 'Serviço Funerário', 'Ativo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `servico_veterinario`
--

CREATE TABLE `servico_veterinario` (
  `id_serv_veterinario` int(11) NOT NULL,
  `serv_veterinario` varchar(50) NOT NULL,
  `valor` varchar(10) NOT NULL,
  `serv_categoria` int(2) NOT NULL,
  `unid_medida` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `servico_veterinario`
--

INSERT INTO `servico_veterinario` (`id_serv_veterinario`, `serv_veterinario`, `valor`, `serv_categoria`, `unid_medida`) VALUES
(1, 'Consulta Veterinária', '120,00', 1, 'procedimento'),
(2, 'Aplicação Vacina V10', '81,00', 1, 'procedimento'),
(6, 'Aplicação Vacina Antirrábica', '40,00', 1, 'procedimento'),
(7, 'Cirurgia de Castração', '300,00', 1, 'procedimento'),
(11, 'Banho porte Pequeno', '60,00', 2, 'und'),
(12, 'Vermífugo Bayer 1 comprimido 250gr', '55,89', 7, 'cx'),
(14, 'Táxi Pet', '60,00', 3, 'km'),
(15, 'Tosa porte Pequeno', '60,00', 2, 'und'),
(16, 'Tosa porte Médio', '90,00', 2, 'und'),
(17, 'Tosa porte Grande', '120,00', 2, 'und'),
(18, 'Banho porte Médio', '90,00', 2, 'und'),
(19, 'Banho porte Grande', '120,00', 2, 'und'),
(20, 'Anti-pulgas - pipeta de 05ml - até 8KG', '67,33', 7, 'und'),
(21, 'Creche Integral', '45,00', 4, 'diaria'),
(22, 'Creche Meia Diária', '30,00', 4, 'diaria'),
(23, 'Hotel', '73,90', 5, 'diaria'),
(24, 'Curativo', '50,00', 1, 'procedimento'),
(25, 'Hemograma Completo', '180,00', 1, 'procedimento'),
(26, 'Ultrassonografia', '150,00', 1, 'procedimento');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cadastro_pet`
--
ALTER TABLE `cadastro_pet`
  ADD PRIMARY KEY (`id_pet`);

--
-- Índices para tabela `cadastro_tutor`
--
ALTER TABLE `cadastro_tutor`
  ADD PRIMARY KEY (`id_tutor`),
  ADD UNIQUE KEY `email_tutor_UNIQUE` (`email_tutor`),
  ADD UNIQUE KEY `documento_tutor_UNIQUE` (`documento_tutor`);

--
-- Índices para tabela `categoria_servico`
--
ALTER TABLE `categoria_servico`
  ADD PRIMARY KEY (`id_categoria_serv`),
  ADD UNIQUE KEY `nome_categoria_serv_UNIQUE` (`nome_categoria_serv`);

--
-- Índices para tabela `servico_veterinario`
--
ALTER TABLE `servico_veterinario`
  ADD PRIMARY KEY (`id_serv_veterinario`),
  ADD UNIQUE KEY `serv_veterinario_UNIQUE` (`serv_veterinario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastro_pet`
--
ALTER TABLE `cadastro_pet`
  MODIFY `id_pet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `cadastro_tutor`
--
ALTER TABLE `cadastro_tutor`
  MODIFY `id_tutor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `categoria_servico`
--
ALTER TABLE `categoria_servico`
  MODIFY `id_categoria_serv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `servico_veterinario`
--
ALTER TABLE `servico_veterinario`
  MODIFY `id_serv_veterinario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
