# 🚀 API Transfer Money

Este projeto é uma API REST de simulação de transferência de dinheiro entre usuários, desenvolvida utilizando **NestJS**. Permite que usuários possam se cadastrar, autenticar e realizar transferências entre usuários.

---

## 🛠️ Tecnologias e ferramentas utilizadas

- **NestJS** — Framework backend
- **TypeORM** — ORM para integração com banco de dados
- **PostgreSQL** — Banco de dados relacional
- **JWT (JSON Web Token)** — Autenticação
- **Docker** — Ambiente local
- **Render** — Deploy da API e banco de dados postgres online

---

## 📜 Funcionalidades principais

- ✅ Cadastro de usuários — `POST /users/signup`
- ✅ Login de usuários — `POST /users/signin`
- ✅ Transferência de saldo — `POST /transfer` (requer token JWT)
- ✅ Listagem de usuários — `GET /users` (requer token JWT)

---

## 🌐 API em produção (Render)

A API está disponível publicamente através da URL hospedada no Render. É possível realizar requisições diretamente utilizando ferramentas como **Insomnia**, **Postman** ou **cURL**.
url: https://transfer-money-2b9o.onrender.com
---

## 🔧 Como rodar localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/DayanadGarcia/transfer-money.git
cd transfer-money
```

### 2️⃣ Instale as dependências

```
npm install
```

### 3️⃣ Configure o arquivo `.env`

Exemplo:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<dbname>
JWT_SECRET=<sua-chave-secreta>
JWT_EXPIRES_IN=3600s
```

### 4️⃣ Suba o banco de dados (se usar Docker)

```
docker-compose up -d
```

### 5️⃣ Execute a aplicação
```
npm run dev
```

### 🔑 Como testar a API

Utilize a URL pública fornecida pelo Render ou a url local

As rotas estão disponíveis para cadastro, login, listagem de usuários e transferências.

Para rotas protegidas (Bearer token), envie o token JWT retornado no login no cabeçalho Authorization:

```
Authorization: Bearer <seu-token>
```
#### 📌 PS: existe um arquivo no projeto chamado users.http, onde é possível testar o funcionamento da API pelo Vscode, basta instalar a extensão Rest Client


