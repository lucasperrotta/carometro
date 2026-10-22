#!/bin/bash
# ============================================
# Script de Deploy - Carômetro Digital
# ============================================
# Este script automatiza o processo de deploy
# para o GitHub Pages.
#
# USO: ./deploy.sh
# ============================================

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  📸 Carômetro Digital - Deploy Helper    ║${NC}"
echo -e "${BLUE}║  EMEF Prof.ª Maria Aparecida Ujio        ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

# Verifica se está em um repositório Git
if [ ! -d .git ]; then
    echo -e "${YELLOW}⚠️  Este diretório não é um repositório Git.${NC}"
    echo -e "${BLUE}📝 Inicializando Git...${NC}"
    git init
    echo -e "${GREEN}✅ Git inicializado!${NC}"
    echo ""
fi

# Verifica se tem remote configurado
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
    echo -e "${YELLOW}⚠️  Nenhum repositório remoto configurado.${NC}"
    echo ""
    echo -e "${BLUE}📋 PRÓXIMOS PASSOS:${NC}"
    echo ""
    echo "1. Crie um repositório no GitHub:"
    echo "   → Acesse: https://github.com/new"
    echo "   → Nome: carometro-digital"
    echo "   → Visibility: Public"
    echo "   → NÃO marque 'Add README'"
    echo ""
    echo "2. Depois execute:"
    echo -e "   ${GREEN}git remote add origin https://github.com/SEU_USUARIO/carometro-digital.git${NC}"
    echo ""
    echo "3. E rode este script novamente:"
    echo -e "   ${GREEN}./deploy.sh${NC}"
    echo ""
    exit 0
fi

echo -e "${GREEN}✅ Repositório remoto encontrado:${NC}"
echo -e "   ${BLUE}$REMOTE_URL${NC}"
echo ""

# Extrai o nome do repositório da URL
REPO_NAME=$(echo "$REMOTE_URL" | sed -E 's/.*github\.com[:/](.+)\/(.+)\.git/\2/' | sed 's/\.git$//')
echo -e "${BLUE}📦 Nome do repositório: ${REPO_NAME}${NC}"
echo ""

# Verifica se o vite.config.js tem o base configurado
if grep -q "base:" vite.config.js; then
    echo -e "${GREEN}✅ vite.config.js já tem 'base' configurado${NC}"
else
    echo -e "${YELLOW}⚠️  ATENÇÃO: O arquivo vite.config.js precisa ter a linha 'base'${NC}"
    echo ""
    echo "Edite vite.config.js e adicione:"
    echo -e "   ${GREEN}base: '/${REPO_NAME}/',${NC}"
    echo ""
    read -p "Deseja continuar mesmo assim? (s/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

# Testa o build
echo ""
echo -e "${BLUE}🔨 Testando build...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build realizado com sucesso!${NC}"
else
    echo -e "${RED}❌ Erro no build. Corrija os erros antes de continuar.${NC}"
    exit 1
fi

# Commit e push
echo ""
echo -e "${BLUE}📤 Preparando para enviar ao GitHub...${NC}"

git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')" 2>/dev/null || echo "Nada para commitar"

# Verifica se a branch é main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}⚠️  Branch atual: $CURRENT_BRANCH${NC}"
    echo -e "${BLUE}📝 Renomeando para 'main'...${NC}"
    git branch -M main
fi

# Push
echo ""
echo -e "${BLUE}🚀 Fazendo push para o GitHub...${NC}"
git push -u origin main

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          ✅ DEPLOY INICIADO!             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📋 PRÓXIMOS PASSOS:${NC}"
echo ""
echo "1. Acesse o repositório no GitHub:"
echo -e "   ${BLUE}${REMOTE_URL%.git}${NC}"
echo ""
echo "2. Vá em Settings → Pages"
echo "3. Em 'Source', selecione: GitHub Actions"
echo ""
echo "4. Aguarde 2-3 minutos e acesse:"
echo -e "   ${GREEN}https://SEU_USUARIO.github.io/${REPO_NAME}/${NC}"
echo ""
echo -e "${YELLOW}💡 Dica: Acompanhe o progresso em Actions → Deploy to GitHub Pages${NC}"
echo ""
