# To-Do List Api

API RESTful para gerenciamento de tarefas (To-Do List), desenvolvida com **Node.js + Express + MongoDB**, seguindo
os princípios do **TDD (Test Driven Development) e **BDD (Behavior Driven Development)**.

---

## Tecnologias

- Node.js
- Express
- Docker (Containerização)
- MongoDB + Mongoose
- Jest (Testes unitários)
- Supertest (Testes de integração)
- Swagger (Documentação)
- Zod ou Joi (Validação de dados)
- EsLint + Prettier (Padronização de código)
- Dotenv (Gerenciamento de Variáveis de ambiente)
- Swagger (Documentação da API)

## Arquitetura do Projeto

/src <br>
├── app.js // Configuração principal do Express <br>
├── server.js // Inicialização do servidor <br>
├── __tests__ // Testes <br>
├── config // Configurações gerais <br>
├── controllers // Camada de entrada (HTTP -> Controller) <br>
├── middlewares // Middlewares (validações, autenticação, etc.) <br>
├── models // Modelos de dados <br>
├── routes // Rotas da API <br>
├── services // Lógica de negócio (Controller -> Service) <br>

--- 

## Funcionalidades

- Criar uma tarefa
- Listar todas as tarefas
- Atualizar uma tarefa
- Marcar uma tarefa como concluída ou pendente
- Deletar uma tarefa
- Validalção de dados
- Tratamento de erros
- Testes unitários e de integração
- Documentação dos cenários de BDD
- Documentação da API com Swagger

--- Behavior Driven Development (BDD) - Cenários

| Cenário                               | Descrição                                                       |
|----------------------------------------|------------------------------------------------------------------|
| Criar tarefa com sucesso               | POST `/tasks` com dados válidos retorna 201                     |
| Erro ao criar tarefa sem título        | POST `/tasks` sem título retorna 400                            |
| Listar tarefas                         | GET `/tasks` retorna uma lista de tarefas                       |
| Atualizar tarefa                       | PUT `/tasks/:id` atualiza título, descrição ou status           |
| Marcar como concluída                  | PATCH `/tasks/:id` atualiza o status para concluído             |
| Deletar tarefa                         | DELETE `/tasks/:id` remove a tarefa       <br/>                      |


---


### Como rodar localmente

#### Pré-requisitos
- Node.js (Versão 18 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

#### Passo a passo

```bash

    # Clone o projeto
    git clone https://github.com/seu-usuario/todo-api.git
    
    # Acesse o diretório do projeto
    cd todo-api
    
    # Instale as dependências
    npm install
    
    # Crie um arquivo .env com as variáveis de ambiente
    
    # Rode a aplicação 
    npm run dev
    
    # accesse em http://localhost:3000
```

Licença: <br/>
Este projeto está sob a licença MIT. <br/>
Feito por Jonas Alves
