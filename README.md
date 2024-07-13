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

