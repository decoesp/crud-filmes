# 🎬 Movies API - Backend

API REST completa para gerenciamento de filmes desenvolvida com Node.js, TypeScript, Express e PostgreSQL. Parte do desafio técnico da Cubos Tecnologia.

## 📋 Sobre

Backend robusto que fornece uma API RESTful para gerenciamento de filmes com autenticação JWT, upload de imagens para AWS S3, sistema de filtros avançados, paginação e envio automático de e-mails de lembrete.

## ✨ Funcionalidades Implementadas

### Autenticação e Autorização
- ✅ Cadastro de usuários com validação de dados (Zod)
- ✅ Login com JWT (token expira em 7 dias)
- ✅ Middleware de autenticação para rotas protegidas
- ✅ Hash de senhas com bcryptjs
- ✅ Endpoint para obter dados do usuário autenticado

### Gerenciamento de Filmes
- ✅ CRUD completo de filmes
- ✅ Listagem com paginação (padrão: 10 itens, máx: 50)
- ✅ Busca em tempo real (título, título original, descrição)
- ✅ Filtros avançados:
  - Por gênero
  - Por duração (mínima e máxima)
  - Por período de lançamento (startDate/endDate)
- ✅ Upload de imagens (poster e backdrop) para AWS S3
- ✅ Permissões: apenas o criador pode editar/excluir

### Sistema de E-mails
- ✅ Cron job diário (9h) para lembretes de lançamento
- ✅ Envio automático de e-mail para filmes com estreia no dia
- ✅ Flag `reminderSent` para evitar duplicatas
- ✅ Suporte para Ethereal Email (desenvolvimento) e SMTP real (produção)

### Recursos Adicionais
- ✅ Tratamento global de erros com middleware customizado
- ✅ Validação de dados com Zod em todas as rotas
- ✅ CORS configurado para frontend
- ✅ Health check endpoint (`/health`)
- ✅ Testes unitários com Vitest
- ✅ TypeScript com tipagem estrita

## 🚀 Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Node.js** | 18+ | Runtime JavaScript |
| **TypeScript** | ^5.5.4 | Linguagem tipada |
| **Express** | ^4.19.2 | Framework web |
| **Prisma ORM** | ^5.19.0 | ORM e migrations |
| **PostgreSQL** | 14+ | Banco de dados |
| **JWT** | ^9.0.2 | Autenticação |
| **Bcryptjs** | ^2.4.3 | Hash de senhas |
| **Zod** | ^3.23.8 | Validação de schemas |
| **AWS S3 SDK** | ^3.645.0 | Upload de imagens |
| **Nodemailer** | ^6.9.14 | Envio de e-mails |
| **Node-cron** | ^3.0.3 | Agendamento de tarefas |
| **Multer** | ^1.4.5 | Upload de arquivos |
| **Vitest** | ^2.0.5 | Framework de testes |

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma          # Schema do banco (User, Movie)
│   └── seed.ts                # Script de seed (opcional)
├── src/
│   ├── config/
│   │   ├── database.ts        # Cliente Prisma
│   │   └── multer.ts          # Configuração de upload
│   ├── controllers/
│   │   ├── auth.controller.ts # Cadastro, login, me
│   │   ├── movie.controller.ts # CRUD de filmes
│   │   └── user.controller.ts # Perfil do usuário
│   ├── jobs/
│   │   └── reminder-job.ts    # Cron job de lembretes
│   ├── middlewares/
│   │   ├── auth.middleware.ts # Verificação de JWT
│   │   └── error-handler.ts   # Tratamento de erros
│   ├── routes/
│   │   ├── auth.routes.ts     # Rotas de autenticação
│   │   ├── movie.routes.ts    # Rotas de filmes
│   │   ├── user.routes.ts     # Rotas de usuário
│   │   └── index.ts           # Agregador de rotas
│   ├── services/
│   │   ├── auth.service.ts    # Lógica de autenticação
│   │   ├── movie.service.ts   # Lógica de filmes
│   │   ├── user.service.ts    # Lógica de usuário
│   │   ├── s3.service.ts      # Upload para S3
│   │   └── email.service.ts   # Envio de e-mails
│   ├── utils/
│   │   └── app-error.ts       # Classe de erro customizada
│   ├── validators/
│   │   ├── auth.validator.ts  # Schemas de autenticação
│   │   ├── movie.validator.ts # Schemas de filmes
│   │   └── user.validator.ts  # Schemas de usuário
│   ├── test/
│   │   └── setup.ts           # Setup de testes
│   └── server.ts              # Entry point da aplicação
├── .env.example               # Exemplo de variáveis de ambiente
├── .eslintrc.json             # Configuração ESLint
├── .prettierrc                # Configuração Prettier
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
└── README.md                  # Este arquivo
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- **Node.js** 18 ou superior
- **PostgreSQL** 14 ou superior (ou Docker)
- **Conta AWS** com bucket S3 configurado
- **Conta SMTP** (Ethereal para dev ou provedor real para produção)

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Application
NODE_ENV=development
PORT=3333
API_URL=http://localhost:3333

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/movies_db?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=movies-images

# Email (Ethereal for development)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your-ethereal-user
SMTP_PASS=your-ethereal-password
SMTP_FROM=noreply@movies.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar Banco de Dados

#### Opção A: Usando Docker (Recomendado)

```bash
# Na raiz do projeto
docker compose up -d postgres

# Aguarde alguns segundos para o banco iniciar
```

#### Opção B: PostgreSQL Local

Certifique-se de que o PostgreSQL está rodando e crie o banco:

```sql
CREATE DATABASE movies_db;
```

### 4. Executar Migrations

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# (Opcional) Popular banco com dados de teste
npm run seed
```

### 5. Iniciar Servidor

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

O servidor estará rodando em **http://localhost:3333**

## 📡 Documentação da API

### Base URL
```
http://localhost:3333/api
```

### Autenticação

#### Cadastro de Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}

Response 201:
{
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com"
  },
  "token": "jwt-token"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}

Response 200:
{
  "user": { ... },
  "token": "jwt-token"
}
```

#### Obter Usuário Autenticado
```http
GET /api/auth/me
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com"
}
```

### Filmes (Requer Autenticação)

#### Listar Filmes
```http
GET /api/movies?page=1&limit=10&search=matrix&genre=Ação&minDuration=90&maxDuration=180&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer {token}

Response 200:
{
  "movies": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Obter Detalhes de um Filme
```http
GET /api/movies/:id
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "title": "Matrix",
  "originalTitle": "The Matrix",
  "releaseDate": "1999-03-31T00:00:00.000Z",
  "description": "...",
  "duration": 136,
  "genre": "Ficção Científica",
  "posterUrl": "https://...",
  "backdropUrl": "https://...",
  ...
}
```

#### Criar Filme
```http
POST /api/movies
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- title: "Matrix"
- originalTitle: "The Matrix"
- releaseDate: "1999-03-31"
- description: "..."
- duration: 136
- genre: "Ficção Científica"
- poster: (file)
- backdrop: (file)

Response 201:
{
  "id": "uuid",
  "title": "Matrix",
  ...
}
```

#### Atualizar Filme
```http
PUT /api/movies/:id
Authorization: Bearer {token}
Content-Type: multipart/form-data

(Mesmos campos do POST, todos opcionais)

Response 200:
{
  "id": "uuid",
  "title": "Matrix Reloaded",
  ...
}
```

#### Deletar Filme
```http
DELETE /api/movies/:id
Authorization: Bearer {token}

Response 204: No Content
```

### Usuário (Requer Autenticação)

#### Obter Perfil
```http
GET /api/users/profile
Authorization: Bearer {token}

Response 200:
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Atualizar Perfil
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Pedro Silva",
  "email": "joaopedro@example.com"
}

Response 200:
{
  "id": "uuid",
  "name": "João Pedro Silva",
  "email": "joaopedro@example.com"
}
```

### Health Check

```http
GET /health

Response 200:
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🔐 Segurança

### Autenticação JWT
- Token gerado no login com expiração configurável (padrão: 7 dias)
- Middleware `authMiddleware` valida token em rotas protegidas
- Token deve ser enviado no header: `Authorization: Bearer {token}`

### Validação de Dados
- Todos os inputs são validados com Zod antes de processar
- Mensagens de erro descritivas para facilitar debugging
- Validação de tipos de arquivo para uploads (JPEG, PNG, WebP)
- Limite de tamanho de arquivo: 5MB

### Permissões
- Usuários só podem editar/excluir seus próprios filmes
- Verificação de ownership no service layer
- Erro 403 (Forbidden) se tentar acessar recurso de outro usuário

### Boas Práticas
- Senhas hasheadas com bcryptjs (salt rounds: 10)
- CORS configurado para aceitar apenas frontend autorizado
- Variáveis sensíveis em `.env` (nunca commitadas)
- Tratamento global de erros para não expor stack traces

## 📧 Sistema de E-mails

### Como Funciona

1. **Cron Job** roda diariamente às 9h (horário do servidor)
2. Busca filmes com `releaseDate` = hoje e `reminderSent` = false
3. Para cada filme encontrado:
   - Busca dados do usuário criador
   - Envia e-mail com detalhes do filme
   - Marca `reminderSent` = true

### Configuração para Desenvolvimento

Use o **Ethereal Email** para testar sem enviar e-mails reais:

1. Acesse https://ethereal.email/
2. Clique em **"Create Ethereal Account"**
3. Copie as credenciais SMTP:
   ```env
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=seu-usuario-gerado
   SMTP_PASS=sua-senha-gerada
   ```
4. Visualize os e-mails enviados no painel do Ethereal

### Configuração para Produção

Para produção, use um provedor SMTP real:
- **SendGrid** (recomendado)
- **AWS SES**
- **Mailgun**
- **Gmail** (para testes, não recomendado para produção)

## 🖼️ Upload de Imagens

### AWS S3 Setup

1. **Criar Bucket:**
   - Acesse AWS Console > S3
   - Crie um novo bucket (ex: `movies-images-prod`)
   - Região: escolha a mais próxima (ex: `us-east-1`)

2. **Configurar Permissões:**
   - Desabilite "Block all public access"
   - Adicione Bucket Policy para leitura pública:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::movies-images-prod/*"
       }
     ]
   }
   ```

3. **Criar Credenciais IAM:**
   - Acesse IAM > Users > Create User
   - Anexe policy `AmazonS3FullAccess` (ou crie policy customizada)
   - Gere Access Key e Secret Key
   - Adicione no `.env`

### Tipos de Imagem Suportados
- **Poster:** Proporção 2:3 (ex: 500x750px)
- **Backdrop:** Proporção 16:9 (ex: 1920x1080px)
- **Formatos:** JPEG, PNG, WebP
- **Tamanho máximo:** 5MB por arquivo

## 🧪 Testes

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Rodar com UI (Vitest UI)
npm run test:ui

# Rodar com watch mode
npm test -- --watch
```

### Estrutura de Testes

```
src/
├── services/
│   └── __tests__/
│       ├── auth.service.test.ts
│       └── movie.service.test.ts
└── test/
    └── setup.ts
```

### Cobertura de Testes

- ✅ Testes unitários para services
- ✅ Mocks do Prisma Client
- ✅ Validação de regras de negócio
- ⚠️ Testes de integração (TODO)

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload (tsx watch)

# Build e Produção
npm run build            # Compila TypeScript para JavaScript (tsup)
npm start                # Inicia servidor compilado

# Banco de Dados
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrations (dev)
npm run prisma:studio    # Abre Prisma Studio (GUI)
npm run seed             # Popula banco com dados de teste

# Qualidade de Código
npm run lint             # Verifica código com ESLint
npm run format           # Formata código com Prettier

# Testes
npm test                 # Executa testes com Vitest
npm run test:ui          # Abre UI do Vitest
```

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"

**Causa:** PostgreSQL não está rodando ou `DATABASE_URL` incorreta

**Solução:**
```bash
# Verificar se Docker está rodando
docker ps

# Iniciar PostgreSQL
docker compose up -d postgres

# Verificar logs
docker compose logs postgres

# Testar conexão
npm run prisma:studio
```

### Erro: "JWT malformed" ou "Invalid token"

**Causa:** Token JWT inválido ou expirado

**Solução:**
- Faça login novamente para obter novo token
- Verifique se está enviando header correto: `Authorization: Bearer {token}`
- Confirme que `JWT_SECRET` no `.env` não mudou

### Erro: "Access Denied" no upload de imagens

**Causa:** Credenciais AWS incorretas ou permissões do bucket

**Solução:**
```bash
# Verificar credenciais no .env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=...

# Testar credenciais com AWS CLI
aws s3 ls s3://seu-bucket --profile default
```

### E-mails não estão sendo enviados

**Causa:** Configurações SMTP incorretas ou cron job não iniciou

**Solução:**
```bash
# Verificar logs do servidor
# Deve aparecer: "⏰ Cron jobs started"

# Testar envio manual
npm run test-email  # Se houver script de teste

# Verificar credenciais Ethereal
# Acesse https://ethereal.email/ e gere novas credenciais
```

### Erro: "Port 3333 already in use"

**Causa:** Outra aplicação está usando a porta

**Solução:**
```bash
# Linux/Mac: Encontrar processo
lsof -i :3333
kill -9 <PID>

# Ou mudar porta no .env
PORT=3334
```

## 🚀 Deploy

### Opções Recomendadas

| Serviço | Uso | Custo |
|---------|-----|-------|
| **Railway** | API + PostgreSQL | Free tier disponível |
| **Render** | API + PostgreSQL | Free tier disponível |
| **Fly.io** | API | Free tier disponível |
| **Neon** | PostgreSQL | Free tier generoso |
| **Supabase** | PostgreSQL | Free tier disponível |
| **AWS S3** | Imagens | Pay-as-you-go (barato) |

### Deploy no Railway (Exemplo)

1. **Criar conta no Railway**
2. **Criar novo projeto:**
   ```bash
   railway init
   ```
3. **Adicionar PostgreSQL:**
   - Dashboard > New > Database > PostgreSQL
4. **Configurar variáveis de ambiente:**
   - Copie todas do `.env.example`
   - `DATABASE_URL` será gerada automaticamente
5. **Deploy:**
   ```bash
   railway up
   ```

### Variáveis de Ambiente para Produção

```env
NODE_ENV=production
PORT=3333
DATABASE_URL=postgresql://...  # Fornecida pelo provedor
JWT_SECRET=use-um-secret-forte-e-aleatorio
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=movies-images-prod
SMTP_HOST=smtp.sendgrid.net  # Ou outro provedor
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxx  # API key do SendGrid
FRONTEND_URL=https://seu-frontend.vercel.app
```

## 📚 Documentação Adicional

### Tecnologias
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [Zod](https://zod.dev/)
- [AWS S3 SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-examples.html)
- [Nodemailer](https://nodemailer.com/)
- [Node-cron](https://www.npmjs.com/package/node-cron)

### Arquivos do Projeto
- [README Principal](../README.md)
- [Desafio Original](../Desafio%20Fullstack%20-%20Cubos%20Tecnologia.md)
- [Frontend README](../frontend/README.md)

## 👨‍💻 Desenvolvimento

### Padrões de Código

- **Arquitetura:** Controller → Service → Repository (Prisma)
- **Nomenclatura:** camelCase para variáveis, PascalCase para classes
- **Imports:** Usar path aliases (`@config`, `@services`, etc.)
- **Erros:** Usar `AppError` para erros de negócio
- **Validação:** Zod schemas em pasta `validators/`

### Contribuindo

1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
2. Commit: `git commit -m "feat: adiciona nova funcionalidade"`
3. Push: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

## 📄 Licença

MIT

---

**Desenvolvido como parte do desafio técnico da Cubos Tecnologia** 🚀
