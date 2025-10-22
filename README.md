# 🎬 Movies - Sistema de Gerenciamento de Filmes

Aplicação fullstack completa para gerenciamento de filmes, desenvolvida como parte do desafio técnico da Cubos Tecnologia.

## 📋 Sobre o Projeto

Sistema web responsivo que permite aos usuários cadastrar, visualizar, editar e excluir filmes de sua coleção pessoal. A aplicação inclui autenticação, upload de imagens para cloud, sistema de filtros avançados, paginação e envio automático de e-mails de lembrete para filmes com data de estreia futura.

## ✨ Funcionalidades

### Autenticação
- ✅ Cadastro de usuário com validação
- ✅ Login com JWT
- ✅ Proteção de rotas privadas
- ✅ Logout

### Gerenciamento de Filmes
- ✅ Listagem com paginação (10 itens por página)
- ✅ Busca em tempo real por título, título original e descrição
- ✅ Filtros avançados:
  - Por gênero
  - Por duração (mínima e máxima)
  - Por período de lançamento
- ✅ Visualização de detalhes completos
- ✅ Criação de novos filmes com upload de imagens
- ✅ Edição de filmes existentes
- ✅ Exclusão de filmes
- ✅ Permissões: apenas o criador pode editar/excluir

### Recursos Adicionais
- ✅ Upload de imagens (poster e backdrop) para AWS S3
- ✅ Sistema de temas (claro/escuro) com toggle
- ✅ E-mail de lembrete automático para filmes com estreia futura
- ✅ Interface responsiva (mobile, tablet, desktop)
- ✅ Notificações toast para feedback do usuário

## 🚀 Stack Tecnológica

### Backend
- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **AWS S3** - Armazenamento de imagens
- **Nodemailer** - Envio de e-mails
- **Node-cron** - Agendamento de tarefas
- **Zod** - Validação de dados
- **Bcrypt** - Hash de senhas

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS** - Estilização
- **React Router DOM** - Roteamento
- **Zustand** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **Sonner** - Notificações

## 📁 Estrutura do Projeto

```
crud-filmes/
├── backend/              # API REST
│   ├── prisma/          # Schema e migrations
│   ├── src/
│   │   ├── config/      # Configurações
│   │   ├── controllers/ # Controllers
│   │   ├── jobs/        # Cron jobs
│   │   ├── middlewares/ # Middlewares
│   │   ├── routes/      # Rotas
│   │   ├── services/    # Lógica de negócio
│   │   ├── utils/       # Utilitários
│   │   ├── validators/  # Validações Zod
│   │   └── server.ts    # Entry point
│   └── package.json
│
├── frontend/            # Interface web
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── contexts/    # React Contexts
│   │   ├── layouts/     # Layouts
│   │   ├── lib/         # Utilitários
│   │   ├── pages/       # Páginas
│   │   ├── routes/      # Configuração de rotas
│   │   ├── services/    # Serviços de API
│   │   ├── stores/      # Zustand stores
│   │   └── App.tsx
│   └── package.json
│
└── README.md            # Este arquivo
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 14+
- Conta AWS (para S3)
- Conta de e-mail SMTP (Ethereal para dev, ou outro)

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd crud-filmes
```

### 2. Configure o Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Configure o banco de dados
npm run prisma:generate
npm run prisma:migrate

# Inicie o servidor
npm run dev
```

O backend estará rodando em `http://localhost:3333`

### 3. Configure o Frontend

```bash
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL da API

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📡 Endpoints da API

### Autenticação
```
POST   /api/auth/register    # Cadastro
POST   /api/auth/login        # Login
GET    /api/auth/me           # Usuário autenticado
```

### Filmes (requer autenticação)
```
GET    /api/movies            # Listar (com filtros e paginação)
GET    /api/movies/:id        # Detalhes
POST   /api/movies            # Criar
PUT    /api/movies/:id        # Atualizar
DELETE /api/movies/:id        # Deletar
```

### Usuário (requer autenticação)
```
GET    /api/users/profile     # Perfil
PUT    /api/users/profile     # Atualizar perfil
```

## 🎨 Design e UX

### Temas
- **Tema escuro** (padrão) - Baseado no Radix Colors
- **Tema claro** - Com toggle no header
- **Persistência** - Salvo no localStorage

### Responsividade
- **Mobile:** 414px - Layout em coluna única
- **Tablet:** 768px - Grid de 2 colunas
- **Desktop:** 1366px - Grid de 3-4 colunas
- **Large:** 1920px+ - Grid de 4-5 colunas

### Componentes UI
- Botões com variantes e estados de loading
- Inputs e textareas com validação visual
- Cards de filmes com hover effects
- Modal de filtros responsivo
- Paginação inteligente
- Toast notifications

## 🔐 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Autenticação JWT com expiração
- ✅ Validação de dados no backend (Zod)
- ✅ Validação de dados no frontend (Zod + React Hook Form)
- ✅ Proteção de rotas privadas
- ✅ Verificação de permissões (apenas criador pode editar/excluir)
- ✅ CORS configurado
- ✅ Sanitização de inputs
- ✅ Rate limiting (recomendado para produção)

## 📧 Sistema de E-mails

O sistema envia e-mails automaticamente para filmes com data de estreia futura:

1. **Cron job** roda diariamente às 9h
2. Verifica filmes com data de lançamento no dia atual
3. Envia e-mail para o usuário que cadastrou
4. Marca como enviado para evitar duplicatas

### Configuração para Desenvolvimento
Use o [Ethereal Email](https://ethereal.email/) para testes:
1. Crie uma conta gratuita
2. Copie as credenciais SMTP para o `.env`
3. Visualize os e-mails enviados no painel do Ethereal

## 🖼️ Upload de Imagens

Imagens são armazenadas no AWS S3:
- Suporta poster (2:3) e backdrop (16:9)
- Validação de tipo (JPEG, PNG, WebP)
- Limite de 5MB por arquivo
- URLs públicas geradas automaticamente
- Exclusão automática ao deletar filme

### Configuração do S3
1. Crie um bucket no AWS S3
2. Configure permissões públicas
3. Adicione credenciais no `.env` do backend

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📦 Build para Produção

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🚀 Deploy

### Backend
Recomendações:
- **Railway** / **Render** / **Fly.io** - Para a API
- **Neon** / **Supabase** - Para PostgreSQL
- **AWS S3** - Para imagens

### Frontend
Recomendações:
- **Vercel** / **Netlify** / **Cloudflare Pages** - Para o frontend

## 📝 Variáveis de Ambiente

### Backend (.env)
```env
NODE_ENV=development
PORT=3333
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_BUCKET_NAME=...
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3333/api
```

## 🎯 Decisões Técnicas e Justificativas

### Backend

**Por que Prisma?**
- Type-safety completo
- Migrations automáticas
- Query builder intuitivo
- Excelente DX (Developer Experience)

**Por que Express?**
- Maduro e estável
- Grande ecossistema
- Flexível e minimalista
- Fácil de testar

**Por que Zod?**
- Validação type-safe
- Inferência de tipos
- Mensagens de erro customizáveis
- Integração com TypeScript

### Frontend

**Por que Vite?**
- Build extremamente rápido
- HMR instantâneo
- Configuração simples
- Otimizado para produção

**Por que TailwindCSS?**
- Desenvolvimento rápido
- Consistência visual
- Purge automático (bundle pequeno)
- Customização fácil

**Por que Zustand?**
- API simples e intuitiva
- Sem boilerplate
- Persistência fácil
- Performance excelente

## 🐛 Troubleshooting

Ver READMEs específicos:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 📚 Documentação Adicional

- [Desafio Original](./Desafio%20Fullstack%20-%20Cubos%20Tecnologia.md)
- [Plano de Desenvolvimento (4 dias)](./PLANO_DESENVOLVIMENTO.md)

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico da Cubos Tecnologia.

## 📄 Licença

MIT
