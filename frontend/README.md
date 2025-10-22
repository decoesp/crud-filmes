# 🎬 Movies Web - Frontend

Interface web moderna e responsiva para gerenciamento de filmes, desenvolvida com React, TypeScript e TailwindCSS. Parte do desafio técnico da Cubos Tecnologia.

## 📋 Sobre

Frontend completo que oferece uma experiência de usuário fluida e intuitiva para gerenciar filmes, com autenticação, upload de imagens, filtros avançados, busca em tempo real e tema claro/escuro.

## ✨ Funcionalidades Implementadas

### Autenticação
- ✅ Tela de login com validação
- ✅ Tela de cadastro de usuário
- ✅ Tela de recuperação de senha (UI pronta)
- ✅ Proteção de rotas privadas
- ✅ Persistência de autenticação (localStorage)
- ✅ Logout com confirmação

### Gerenciamento de Filmes
- ✅ Listagem de filmes com grid responsivo
- ✅ Paginação inteligente (10 itens por página)
- ✅ Busca em tempo real (debounced)
- ✅ Filtros avançados em modal:
  - Por gênero
  - Por duração (mínima e máxima)
  - Por período de lançamento
- ✅ Visualização de detalhes completos
- ✅ Formulário de criação/edição com validação
- ✅ Upload de imagens (poster e backdrop)
- ✅ Exclusão com confirmação
- ✅ Indicadores visuais de permissão (apenas criador pode editar/excluir)

### Interface e UX
- ✅ Design moderno com Radix Colors
- ✅ Sistema de temas (claro/escuro) com toggle
- ✅ Responsividade completa (mobile, tablet, desktop)
- ✅ Notificações toast (Sonner)
- ✅ Estados de loading e erro
- ✅ Empty states informativos
- ✅ Animações e transições suaves
- ✅ Ícones do Lucide React

### Recursos Adicionais
- ✅ Gerenciamento de estado com Zustand
- ✅ Validação de formulários com React Hook Form + Zod
- ✅ Cliente HTTP com Axios e interceptors
- ✅ Formatação de datas com date-fns
- ✅ Utilitários de CSS com clsx e tailwind-merge
- ✅ Testes unitários com Vitest

## 🚀 Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | ^18.3.1 | Biblioteca UI |
| **TypeScript** | ^5.5.4 | Linguagem tipada |
| **Vite** | ^5.4.3 | Build tool e dev server |
| **TailwindCSS** | ^3.4.10 | Framework CSS utility-first |
| **React Router DOM** | ^6.26.1 | Roteamento SPA |
| **Zustand** | ^4.5.5 | Gerenciamento de estado |
| **React Hook Form** | ^7.53.0 | Gerenciamento de formulários |
| **Zod** | ^3.23.8 | Validação de schemas |
| **Axios** | ^1.7.5 | Cliente HTTP |
| **Lucide React** | ^0.439.0 | Biblioteca de ícones |
| **Sonner** | ^1.5.0 | Notificações toast |
| **date-fns** | ^3.6.0 | Manipulação de datas |
| **Vitest** | Latest | Framework de testes |

## 📁 Estrutura do Projeto

```
frontend/
├── public/                    # Arquivos estáticos
├── src/
│   ├── assets/
│   │   └── icons/            # Ícones customizados (logo)
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── movies/           # Componentes de filmes
│   │   │   ├── FilterModal.tsx
│   │   │   ├── MovieActions.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── MovieFormModal.tsx
│   │   │   ├── MovieFormSidebar.tsx
│   │   │   ├── MovieStat.tsx
│   │   │   └── MovieStatsGrid.tsx
│   │   ├── ui/               # Componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── CircularProgress.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── InfoCard.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TagCard.tsx
│   │   │   └── Textarea.tsx
│   │   └── __tests__/        # Testes de componentes
│   ├── contexts/
│   │   └── ThemeContext.tsx  # Contexto de tema
│   ├── hooks/                # Custom hooks
│   ├── layouts/
│   │   ├── AppLayout.tsx     # Layout autenticado
│   │   └── AuthLayout.tsx    # Layout de autenticação
│   ├── lib/
│   │   ├── api.ts            # Cliente Axios
│   │   ├── cn.ts             # Utilitário clsx + tailwind-merge
│   │   └── validators.ts     # Schemas Zod compartilhados
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   └── movies/
│   │       ├── MovieDetailsPage.tsx
│   │       ├── MovieFormPage.tsx
│   │       └── MoviesListPage.tsx
│   ├── routes/
│   │   └── index.tsx         # Configuração de rotas
│   ├── services/
│   │   ├── auth.service.ts   # Serviço de autenticação
│   │   └── movie.service.ts  # Serviço de filmes
│   ├── stores/
│   │   └── auth.store.ts     # Store Zustand de autenticação
│   ├── types/                # Tipos TypeScript
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globais
├── .env.example              # Exemplo de variáveis de ambiente
├── .eslintrc.cjs             # Configuração ESLint
├── .prettierrc               # Configuração Prettier
├── index.html                # HTML base
├── package.json              # Dependências e scripts
├── postcss.config.js         # Configuração PostCSS
├── tailwind.config.js        # Configuração TailwindCSS
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite
└── README.md                 # Este arquivo
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- **Node.js** 18 ou superior
- **Backend** rodando em http://localhost:3333 (ver [Backend README](../backend/README.md))

### 1. Instalar Dependências

```bash
cd frontend
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3333/api
```

**Importante:** Variáveis de ambiente no Vite devem começar com `VITE_` para serem expostas ao cliente.

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará rodando em **http://localhost:5173**

### 4. Build para Produção

```bash
# Compilar
npm run build

# Visualizar build localmente
npm run preview
```

## 🎨 Design System

### Cores

O projeto usa **Radix Colors** para garantir acessibilidade e consistência:

#### Tema Escuro (Padrão)
- **Background:** `#111113` (base), `#18181b` (subtle), `#212124` (ui)
- **Border:** `#38383d` (subtle), `#434348` (ui)
- **Text:** `#ededef` (primary), `#b4b4b9` (secondary)
- **Accent:** Purple (`#8b5cf6`)

#### Tema Claro
- **Background:** `#ffffff` (base), `#fcfcfc` (subtle), `#f8f8f8` (ui)
- **Border:** `#e8e8e8` (subtle), `#dcdcdc` (ui)
- **Text:** `#111113` (primary), `#60606c` (secondary)
- **Accent:** Purple (`#8b5cf6`)

### Tipografia

- **Fonte:** Inter (Google Fonts)
- **Tamanhos:** Sistema de escala do TailwindCSS (text-sm, text-base, text-lg, etc.)

### Responsividade

| Breakpoint | Largura | Layout |
|------------|---------|--------|
| **Mobile** | < 768px | 1 coluna |
| **Tablet** | 768px - 1023px | 2 colunas |
| **Desktop** | 1024px - 1365px | 3 colunas |
| **Large** | 1366px+ | 4 colunas |

### Componentes UI

#### Button
- Variantes: `primary`, `secondary`, `ghost`, `danger`
- Tamanhos: `sm`, `md`, `lg`
- Estados: `default`, `hover`, `active`, `disabled`, `loading`

#### Input/Textarea
- Validação visual (erro/sucesso)
- Labels e mensagens de erro
- Suporte a ícones

#### Card
- Hover effects
- Imagens com fallback
- Badges e tags

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Login/Cadastro:** Usuário envia credenciais
2. **Backend:** Valida e retorna JWT token
3. **Frontend:** Armazena token no localStorage
4. **Zustand Store:** Gerencia estado de autenticação
5. **Axios Interceptor:** Adiciona token em todas as requisições
6. **Rotas Protegidas:** Verificam autenticação antes de renderizar

### Persistência

```typescript
// auth.store.ts
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      // ...
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### Proteção de Rotas

```typescript
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
```

## 📡 Integração com API

### Cliente Axios

```typescript
// lib/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Serviços

#### Auth Service
```typescript
export const authService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (data: RegisterData) => 
    api.post('/auth/register', data),
  
  me: () => 
    api.get('/auth/me'),
};
```

#### Movie Service
```typescript
export const movieService = {
  list: (params: MovieFilters) => 
    api.get('/movies', { params }),
  
  getById: (id: string) => 
    api.get(`/movies/${id}`),
  
  create: (data: FormData) => 
    api.post('/movies', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  update: (id: string, data: FormData) => 
    api.put(`/movies/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  delete: (id: string) => 
    api.delete(`/movies/${id}`),
};
```

## 🧪 Testes

### Executar Testes

```bash
# Rodar todos os testes
npm test

# Rodar com UI
npm run test:ui

# Rodar com cobertura
npm run test:coverage
```

### Estrutura de Testes

```
src/
├── components/
│   ├── ui/
│   │   └── __tests__/
│   │       ├── Button.test.tsx
│   │       ├── CircularProgress.test.tsx
│   │       └── Input.test.tsx
│   └── movies/
│       └── __tests__/
│           └── MovieCard.test.tsx
└── services/
    └── __tests__/
        └── auth.service.test.tsx
```

### Exemplo de Teste

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server (Vite)

# Build
npm run build            # Compila TypeScript + Vite build
npm run preview          # Preview do build de produção

# Qualidade de Código
npm run lint             # Verifica código com ESLint
npm run format           # Formata código com Prettier

# Testes
npm test                 # Executa testes com Vitest
npm run test:ui          # Abre UI do Vitest
npm run test:coverage    # Gera relatório de cobertura
```

## 🎯 Funcionalidades Detalhadas

### Busca e Filtros

#### Busca em Tempo Real
- Debounce de 500ms para evitar requisições excessivas
- Busca por título, título original e descrição
- Indicador visual de busca ativa

#### Filtros Avançados
- **Modal responsivo** com formulário de filtros
- **Gênero:** Dropdown com opções predefinidas
- **Duração:** Inputs numéricos para min/max
- **Período:** Date pickers para startDate/endDate
- **Aplicar/Limpar:** Botões de ação
- **Indicador:** Badge mostrando número de filtros ativos

### Upload de Imagens

#### Fluxo
1. Usuário seleciona arquivo via input
2. Preview imediato da imagem
3. Validação de tipo e tamanho no frontend
4. Envio via FormData para backend
5. Backend faz upload para S3 e retorna URL

#### Validações
- **Tipos aceitos:** JPEG, PNG, WebP
- **Tamanho máximo:** 5MB
- **Proporções recomendadas:**
  - Poster: 2:3 (ex: 500x750px)
  - Backdrop: 16:9 (ex: 1920x1080px)

### Paginação

- **Itens por página:** 10 (fixo)
- **Navegação:** Anterior, Próxima, Primeira, Última
- **Indicador:** "Página X de Y"
- **Desabilitação:** Botões desabilitados quando não aplicável

### Notificações

Usando **Sonner** para toast notifications:

```typescript
import { toast } from 'sonner';

// Sucesso
toast.success('Filme criado com sucesso!');

// Erro
toast.error('Erro ao criar filme');

// Loading
const toastId = toast.loading('Criando filme...');
toast.success('Filme criado!', { id: toastId });
```

### Tema Claro/Escuro

#### Implementação
```typescript
// ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## 🐛 Troubleshooting

### Erro: "Network Error" ou "CORS"

**Causa:** Backend não está rodando ou CORS não configurado

**Solução:**
```bash
# Verificar se backend está rodando
curl http://localhost:3333/health

# Verificar variável de ambiente
cat .env
# Deve ter: VITE_API_URL=http://localhost:3333/api

# Reiniciar dev server
npm run dev
```

### Erro: "Cannot read property of undefined"

**Causa:** Dados da API não estão no formato esperado

**Solução:**
- Verificar tipos TypeScript
- Adicionar optional chaining (`?.`)
- Adicionar verificações de null/undefined

### Imagens não carregam

**Causa:** URLs do S3 incorretas ou bucket não público

**Solução:**
- Verificar configuração do S3 no backend
- Testar URL da imagem diretamente no navegador
- Adicionar fallback para imagens quebradas

### Build falha com erro de TypeScript

**Causa:** Erros de tipo não detectados em dev

**Solução:**
```bash
# Verificar erros de tipo
npx tsc --noEmit

# Corrigir erros apontados
# Depois fazer build novamente
npm run build
```

### Tema não persiste após reload

**Causa:** localStorage não está salvando

**Solução:**
- Verificar se navegador permite localStorage
- Verificar console para erros
- Limpar localStorage e testar novamente:
```javascript
localStorage.clear();
location.reload();
```

## 🚀 Deploy

### Opções Recomendadas

| Serviço | Custo | Vantagens |
|---------|-------|-----------|
| **Vercel** | Free tier | Deploy automático, preview URLs, edge network |
| **Netlify** | Free tier | CI/CD integrado, forms, functions |
| **Cloudflare Pages** | Free tier | CDN global, analytics |
| **GitHub Pages** | Free | Integração com GitHub |

### Deploy na Vercel (Recomendado)

#### Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

#### Via GitHub

1. **Conectar repositório:**
   - Acesse https://vercel.com/
   - New Project > Import Git Repository
   - Selecione seu repositório

2. **Configurar build:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Adicionar variável de ambiente:**
   - Settings > Environment Variables
   - `VITE_API_URL` = URL do backend em produção

4. **Deploy:**
   - Vercel faz deploy automático a cada push

### Deploy na Netlify

#### Via CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Via GitHub

1. **Conectar repositório:**
   - Acesse https://app.netlify.com/
   - New site from Git
   - Selecione seu repositório

2. **Configurar build:**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Adicionar variável de ambiente:**
   - Site settings > Environment variables
   - `VITE_API_URL` = URL do backend

4. **Deploy:**
   - Netlify faz deploy automático

### Configuração para Produção

#### Variáveis de Ambiente

```env
VITE_API_URL=https://sua-api.railway.app/api
```

#### Otimizações

O Vite já faz otimizações automáticas:
- ✅ Minificação de JS/CSS
- ✅ Tree-shaking
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Gzip/Brotli compression

#### Verificar Build

```bash
# Build
npm run build

# Analisar tamanho
du -sh dist/*

# Preview local
npm run preview
```

## 📚 Documentação Adicional

### Tecnologias
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [Lucide Icons](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/)
- [date-fns](https://date-fns.org/)

### Arquivos do Projeto
- [README Principal](../README.md)
- [Backend README](../backend/README.md)
- [Desafio Original](../Desafio%20Fullstack%20-%20Cubos%20Tecnologia.md)

## 👨‍💻 Desenvolvimento

### Padrões de Código

- **Componentes:** PascalCase (ex: `MovieCard.tsx`)
- **Hooks:** camelCase com prefixo `use` (ex: `useAuth.ts`)
- **Utilitários:** camelCase (ex: `formatDate.ts`)
- **Tipos:** PascalCase com sufixo `Type` (ex: `MovieType`)
- **Constantes:** UPPER_SNAKE_CASE (ex: `API_BASE_URL`)

### Organização de Imports

```typescript
// 1. React e bibliotecas externas
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Componentes
import { Button } from '@/components/ui/Button';
import { MovieCard } from '@/components/movies/MovieCard';

// 3. Hooks e utilitários
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

// 4. Tipos
import type { Movie } from '@/types/movie';

// 5. Estilos (se houver)
import './styles.css';
```

### Boas Práticas

- ✅ Usar TypeScript estrito (sem `any`)
- ✅ Componentes pequenos e focados (SRP)
- ✅ Custom hooks para lógica reutilizável
- ✅ Validação de formulários com Zod
- ✅ Tratamento de erros com try/catch
- ✅ Loading states para melhor UX
- ✅ Acessibilidade (ARIA labels, semantic HTML)
- ✅ Responsividade mobile-first

### Contribuindo

1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
2. Commit: `git commit -m "feat: adiciona nova funcionalidade"`
3. Push: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

## 📄 Licença

MIT

---

**Desenvolvido como parte do desafio técnico da Cubos Tecnologia** 🚀
