# Meu Projeto

API para gerenciamento de uma biblioteca. Inclui funcionalidades para gerenciar autores, livros, clientes e empréstimos de livros.

# requisitos para rodar o projeto 
O node.js deve estar em uma versão atual e o npm install ser rodado após o git clone do projeto 
Talvez o modulo do token JWT não seja instalado por algum tipo de problema nos modulos, basta instalar o mesmo npm install jsonwebtoken

#Para criar um token 
basta encaminhar um POST para localhost:3000/login 
lhe retornara um token, que deve se usado para conseguir realizar as requisições do sistema. 


## Tecnologias Utilizadas
- Node.js
- Express
- JWT para autenticação
- Swagger para documentação

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gustalicht/biblioteca-api.git
```
2. Navegue até o repositorio
```bash
cd biblioteca-api 
```
instale as dependências:
```bash 
npm install
 ```

## EXECUÇÃO
para iniciar o servidor: 
```bash
 npm start
```
O servidor estará disponível em http://localhost:3000.

## Documentação da API 
A documentação Swagger está disponível em http://localhost:3000/api-docs.

## Testes
para executar os testes: 
```bash 
npm test
```


## Endpoints
POST /login - Gera um token JWT para autenticação

GET /authors - Retorna todos os autores (requer autenticação)

GET /authors/:id - Retorna um autor pelo ID (requer autenticação)

POST /authors - Cria um novo autor (requer autenticação)

PUT /authors/:id - Atualiza um autor pelo ID (requer autenticação)

DELETE /authors/:id - Deleta um autor pelo ID (requer autenticação)

Similar endpoints para clientes, livros e empréstimos.

## Configuração do JWT

A chave secreta para o JWT está atualmente hardcoded no código (secret). Para um ambiente de produção, considere usar variáveis de ambiente para gerenciar a chave secreta.

## Contribuição
Sinta-se à vontade para contribuir com este projeto abrindo uma pull request ou relatando problemas.


## Atualização para banco De dados

## Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript server-side.
Express: Framework para construção de APIs.
Sequelize: ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL.
PostgreSQL: Sistema de gerenciamento de banco de dados relacional.
JWT (JSON Web Token): Tecnologia para autenticação e geração de tokens.
Swagger: Ferramenta para documentar a API.

## Configuração do Projeto
Instalação de Dependências:

Execute o comando abaixo para instalar todas as dependências necessárias:

npm install

## Configuração do Banco de Dados:

Certifique-se de ter um banco de dados PostgreSQL rodando.
Configure o arquivo config/config.json com as credenciais do seu banco de dados.
Execute as migrações para criar as tabelas no banco de dados:

npx sequelize-cli db:migrate

## Alterações Feitas
Conexão com o Banco de Dados:

Utilizamos o Sequelize para conectar o banco de dados PostgreSQL com a aplicação.
Configuração da conexão no arquivo config/connection.js.
Modelos:

Definição dos modelos Cliente, Livro, e Emprestimo no diretório models.
Controladores:

Adição de validações e lógica de negócios nos controladores.
Os controladores agora utilizam os métodos do Sequelize como findByPk e create.
Rotas:

As rotas para criação, atualização, e deleção de empréstimos foram definidas no arquivo routes/emprestimoRoutes.js.
## Autenticação:

A geração de tokens JWT foi integrada ao banco de dados, verificando as credenciais do usuário antes de gerar o token.
A lógica de autenticação está definida no controlador authController.
## Swagger:

A documentação da API foi configurada utilizando Swagger.
Endpoints documentados para facilitar os testes e integração.
Endpoints da API
Clientes:

POST /clientes: Cria um novo cliente.
GET /clientes/:id: Retorna um cliente pelo ID.
PUT /clientes/:id: Atualiza um cliente pelo ID.
DELETE /clientes/:id: Deleta um cliente pelo ID.
Livros:

POST /livros: Cria um novo livro.
GET /livros/:id: Retorna um livro pelo ID.
PUT /livros/:id: Atualiza um livro pelo ID.
DELETE /livros/:id: Deleta um livro pelo ID.
Empréstimos:

POST /emprestimos: Cria um novo empréstimo.
GET /emprestimos/:id: Retorna um empréstimo pelo ID.
PUT /emprestimos/:id: Atualiza um empréstimo pelo ID.
DELETE /emprestimos/:id: Deleta um empréstimo pelo ID.
Autenticação:

POST /login: Realiza o login e gera um token JWT.
Testando a Aplicação
Iniciar o Servidor:

## Execute o comando abaixo para iniciar o servidor:

npm start

## Testar Endpoints com Postman:

Obter o Token JWT:

Faça uma requisição POST para http://localhost:3111/login com as credenciais de usuário.
Exemplo de Body:
json

{
  "username": "user",
  "password": "password"
}
Copie o token JWT retornado na resposta.
Autenticar as Requisições:

Adicione o token JWT no cabeçalho Authorization das suas requisições.
No Postman, vá para a aba "Authorization", selecione "Bearer Token" e cole o token JWT.
Exemplo de Requisição Autenticada:

GET /clientes/1:
URL: http://localhost:3111/clientes/1
Cabeçalhos:
Authorization: Bearer seu_token_jwt_aqui
Documentação Swagger:

Acesse a documentação da API gerada pelo Swagger no navegador:
URL: http://localhost:3111/api-docs
Utilize a interface do Swagger para testar os endpoints diretamente pelo navegador.
Exemplo de Configuração do Banco de Dados