# Movies API - Backend

API REST para gerenciamento de filmes desenvolvida com Node.js, TypeScript, Express e PostgreSQL.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Autenticação
- **AWS S3** - Armazenamento de imagens
- **Nodemailer** - Envio de e-mails
- **Node-cron** - Agendamento de tarefas
- **Zod** - Validação de dados
- **Bcrypt** - Hash de senhas

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── config/                # Configurações (database, multer)
│   ├── controllers/           # Controllers da aplicação
│   ├── jobs/                  # Cron jobs (lembretes de e-mail)
│   ├── middlewares/           # Middlewares (auth, error handler)
│   ├── routes/                # Definição de rotas
│   ├── services/              # Lógica de negócio
│   ├── utils/                 # Utilitários
│   ├── validators/            # Schemas de validação (Zod)
│   └── server.ts              # Entry point
├── .env.example               # Exemplo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

## 🔧 Instalação

1. **Clone o repositório e entre na pasta do backend:**
```bash
cd backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
- `DATABASE_URL`: URL de conexão com PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT
- `AWS_*`: Credenciais da AWS S3
- `SMTP_*`: Configurações de e-mail

4. **Configure o banco de dados:**
```bash
# Gera o Prisma Client
npm run prisma:generate

# Executa as migrations
npm run prisma:migrate

# (Opcional) Abre o Prisma Studio para visualizar o banco
npm run prisma:studio
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário autenticado

### Filmes (requer autenticação)
- `GET /api/movies` - Listar filmes (com paginação e filtros)
- `GET /api/movies/:id` - Detalhes de um filme
- `POST /api/movies` - Criar filme (com upload de imagens)
- `PUT /api/movies/:id` - Atualizar filme
- `DELETE /api/movies/:id` - Deletar filme

### Usuário (requer autenticação)
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

### Filtros disponíveis (GET /api/movies)
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10, máx: 50)
- `search` - Busca por título, título original ou descrição
- `genre` - Filtro por gênero
- `minDuration` / `maxDuration` - Filtro por duração (em minutos)
- `startDate` / `endDate` - Filtro por período de lançamento

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Após o login, inclua o token no header:

```
Authorization: Bearer <seu-token>
```

## 📧 Sistema de E-mails

O sistema envia e-mails de lembrete automaticamente para filmes com data de lançamento futura:
- Um cron job roda diariamente às 9h
- Verifica filmes com data de lançamento no dia atual
- Envia e-mail para o usuário que cadastrou o filme
- Marca o lembrete como enviado para evitar duplicatas

### Configuração de E-mail para Desenvolvimento

Para testes, recomendo usar o **Ethereal Email**:

1. Acesse https://ethereal.email/
2. Clique em "Create Ethereal Account"
3. Copie as credenciais SMTP para o `.env`

## 🖼️ Upload de Imagens

As imagens são armazenadas no AWS S3:
- Suporta poster e backdrop para cada filme
- Validação de tipo (JPEG, PNG, WebP)
- Limite de 5MB por arquivo
- URLs públicas geradas automaticamente

### Configuração do S3

1. Crie um bucket no AWS S3
2. Configure as permissões para acesso público
3. Adicione as credenciais no `.env`

## 🛡️ Permissões

- Usuários só podem editar/excluir filmes que eles próprios cadastraram
- A visualização de detalhes também é restrita ao criador do filme
- Todas as rotas de filmes requerem autenticação

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com UI
npm run test:ui
```

## 📝 Scripts Úteis

```bash
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila para produção
npm start            # Inicia versão compilada
npm run lint         # Verifica código com ESLint
npm run format       # Formata código com Prettier
```

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme a `DATABASE_URL` no `.env`
- Execute `npm run prisma:migrate`

### Erro no upload de imagens
- Verifique as credenciais da AWS no `.env`
- Confirme as permissões do bucket S3
- Verifique o tamanho do arquivo (máx 5MB)

### E-mails não estão sendo enviados
- Verifique as configurações SMTP no `.env`
- Para Ethereal, use as credenciais geradas no site
- Verifique os logs do servidor para erros

## 📚 Documentação Adicional

- [Prisma Docs](https://www.prisma.io/docs)
- [Express Docs](https://expressjs.com/)
- [AWS S3 SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-examples.html)
