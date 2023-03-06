# Projeto Integrado 

## Autor

- Diego de Souza Sampaio.

## Objetivo

Criar uma página web, tema livre, com os requisitos abaixo:

- Front-end;
- Back-end;
- Banco de Dados;
- Modelagem de Dados.

O tema escolhido foi uma área adminstrativa básica para um pet shop, onde o usuário poderá cadastrar, listar, atualizar, excluir e filtrar produtos, serviços, tutores (clientes) e pets. 
Além de divulgar a marca por meio da internet.

Futuramente haverá a implantação de:

- Carrinho de compras para vendas on-line, 
- Área para ligar adotantes e doadores por meio de anúncios e feiras, 
- Área para registro das experiências dos clientes.

## Linguagens Utilizadas

- HTML5;
- CSS3;
- Bootstrap 5.1;
- JavaScript;
- NodeJS;
- EJS (Embedded JavaScript).

Futuramente no front-end será refeito utilizando ReactJS.

## Arquitetura

A arquitetura escolhida foi MVC (Model-View-Controller).
Todavia, a parte do models e routes precisarão ser desmembradas do app em uma próxima versão.

## Bibliotecas 

- npm init -y: Este comando é usado para inicializar um projeto Node.js e criar um arquivo package.json padrão com as configurações básicas.

- npm install --save express: O Express é um framework Node.js para construir aplicativos da web. Ele oferece uma estrutura simples e flexível para criar aplicativos da web e APIs RESTful. Este comando instala o Express no projeto e adiciona uma entrada no arquivo package.json.

- npm install mysql2: O mysql2 é um pacote Node.js que fornece uma API para interagir com o banco de dados MySQL. Ele é uma alternativa mais rápida e compatível ao pacote mysql padrão. Este comando instala o mysql2 no projeto.

- npm install body-parser --save: O body-parser é um pacote Node.js que analisa o corpo das solicitações HTTP e extrai as informações relevantes (como JSON, URL codificado, texto simples, etc.) para que possam ser usadas facilmente em seu código. Este comando instala o body-parser no projeto.

- npm install axios: O axios é um cliente HTTP baseado em promessa para Node.js que faz solicitações HTTP para servidores web. Ele suporta várias plataformas e pode ser usado tanto do lado do cliente quanto do lado do servidor. Este comando instala o axios no projeto.

- npm install --save express-session: O express-session é um middleware Node.js que permite gerenciar sessões de usuários em aplicativos Express. Ele armazena as informações de sessão em cookies do navegador ou em um armazenamento externo, dependendo da configuração. Este comando instala o express-session no projeto.

- npm install --save connect-flash: O connect-flash é um middleware Node.js que permite enviar mensagens flash (mensagens de feedback) para o usuário após uma ação. Ele é usado em conjunto com o express-session para armazenar as mensagens na sessão do usuário. Este comando instala o connect-flash no projeto.

- npm install cookie-parser: é um middleware do Express.js que analisa e configura cookies em solicitações HTTP. Basicamente, ele faz a análise dos cookies enviados pelo cliente e os torna acessíveis para a aplicação, tornando mais fácil a manipulação de informações entre diferentes solicitações do mesmo usuário.

## API de Endereço

O projeto possui o consumo da API do ViaCep para facilitar o preenchimento do endereço pelo atendente.

## Comando para Rodar o Projeto

- nodemon server.js


## Porta do Projeto

- http://localhost:3000