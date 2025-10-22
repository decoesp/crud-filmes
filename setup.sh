#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Configurando ambiente do projeto CRUD Filmes...${NC}\n"

# Verificar se está no diretório correto
if [ ! -f "package.json" ] && [ ! -d "backend" ] && [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto${NC}"
    exit 1
fi

# 1. Instalar dependências do backend
echo -e "${YELLOW}📦 Instalando dependências do backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${GREEN}✓ Dependências do backend já instaladas${NC}"
fi
cd ..

# 2. Instalar dependências do frontend
echo -e "\n${YELLOW}📦 Instalando dependências do frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${GREEN}✓ Dependências do frontend já instaladas${NC}"
fi
cd ..

# 3. Verificar se Docker está rodando
echo -e "\n${YELLOW}🐳 Verificando Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker não está rodando. Por favor, inicie o Docker e tente novamente.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker está rodando${NC}"

# 4. Subir banco de dados com Docker Compose
echo -e "\n${YELLOW}🗄️  Iniciando banco de dados PostgreSQL...${NC}"
docker compose up -d postgres
sleep 3

# Verificar se o container está rodando
if docker ps --format '{{.Names}}' | grep -q "postgres";
then
    echo -e "${GREEN}✓ PostgreSQL iniciado com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar PostgreSQL${NC}"
    exit 1
fi

# 5. Gerar Prisma Client
echo -e "\n${YELLOW}⚙️  Gerando Prisma Client...${NC}"
cd backend
npx prisma generate
echo -e "${GREEN}✓ Prisma Client gerado${NC}"

# 6. Rodar migrations
echo -e "\n${YELLOW}🔄 Executando migrations do banco de dados...${NC}"
npx prisma migrate deploy
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migrations executadas com sucesso${NC}"
else
    echo -e "${YELLOW}⚠️  Criando nova migration...${NC}"
    npx prisma migrate dev --name init
fi

# 7. Rodar seed (se existir)
echo -e "\n${YELLOW}🌱 Populando banco de dados com dados iniciais...${NC}"
if grep -q "\"seed\"" package.json; then
    npm run seed
    echo -e "${GREEN}✓ Seed executado com sucesso${NC}"
else
    echo -e "${YELLOW}⚠️  Script de seed não encontrado (opcional)${NC}"
fi

cd ..

# 8. Criar arquivo .env se não existir
echo -e "\n${YELLOW}📝 Verificando arquivos de configuração...${NC}"

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Criando backend/.env a partir do .env.example...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ backend/.env criado${NC}"
else
    echo -e "${GREEN}✓ backend/.env já existe${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Criando frontend/.env a partir do .env.example...${NC}"
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓ frontend/.env criado${NC}"
else
    echo -e "${GREEN}✓ frontend/.env já existe${NC}"
fi

# 9. Resumo final
echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BLUE}📋 Próximos passos:${NC}\n"
echo -e "  ${YELLOW}1.${NC} Abra dois terminais"
echo -e "  ${YELLOW}2.${NC} No primeiro terminal, rode:"
echo -e "     ${GREEN}cd backend && npm run dev${NC}"
echo -e "  ${YELLOW}3.${NC} No segundo terminal, rode:"
echo -e "     ${GREEN}cd frontend && npm run dev${NC}\n"

echo -e "${BLUE}🌐 URLs:${NC}"
echo -e "  • Backend:  ${GREEN}http://localhost:3333${NC}"
echo -e "  • Frontend: ${GREEN}http://localhost:5173${NC}\n"

echo -e "${BLUE}💡 Dicas:${NC}"
echo -e "  • Para parar o banco: ${YELLOW}docker-compose down${NC}"
echo -e "  • Para ver logs do banco: ${YELLOW}docker-compose logs -f postgres${NC}"
echo -e "  • Para acessar o Prisma Studio: ${YELLOW}cd backend && npx prisma studio${NC}\n"

echo -e "${GREEN}Bom desenvolvimento! 🚀${NC}\n"
