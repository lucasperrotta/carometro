#!/bin/bash
# ============================================
# Script de Demonstração - Carômetro Digital
# ============================================
# Cria pastas de exemplo com imagens placeholder
# para você testar o sistema rapidamente.
#
# USO: ./scripts/demo.sh
# ============================================

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  📸 Carômetro Digital - Demo Setup       ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

TURMAS_DIR="public/turmas"

# Cria as pastas das turmas
echo -e "${BLUE}📁 Criando pastas das turmas...${NC}"
mkdir -p "$TURMAS_DIR/6A"
mkdir -p "$TURMAS_DIR/6B"
mkdir -p "$TURMAS_DIR/7A"
mkdir -p "$TURMAS_DIR/7B"
mkdir -p "$TURMAS_DIR/8A"
mkdir -p "$TURMAS_DIR/9A"

echo -e "${GREEN}✅ Pastas criadas!${NC}"
echo ""

# Cria imagens placeholder (SVG simples)
echo -e "${BLUE}🖼️  Criando imagens de exemplo...${NC}"

# Função para criar placeholder SVG
create_placeholder() {
    local turma=$1
    local name=$2
    local file="$TURMAS_DIR/$turma/$name.jpg"
    
    # Cria um SVG simples como placeholder
    cat > "$file" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#e0e7ff"/>
  <circle cx="200" cy="150" r="60" fill="#6366f1"/>
  <rect x="140" y="220" width="120" height="100" rx="20" fill="#6366f1"/>
  <text x="200" y="360" font-family="Arial" font-size="20" fill="#4338ca" text-anchor="middle">${name//_/ }</text>
</svg>
EOF
}

# 6º Ano A
create_placeholder "6A" "alice_mendes"
create_placeholder "6A" "bruno_costa"
create_placeholder "6A" "carla_rodrigues"
create_placeholder "6A" "daniel_souza"
create_placeholder "6A" "elena_fernandes"

# 6º Ano B
create_placeholder "6B" "fabio_lima"
create_placeholder "6B" "gabriel_oliveira"
create_placeholder "6B" "hugo_santos"

# 7º Ano A
create_placeholder "7A" "isabela_pereira"
create_placeholder "7A" "joao_silva"
create_placeholder "7A" "karla_oliveira"
create_placeholder "7A" "lucas_ferreira"

# 7º Ano B
create_placeholder "7B" "maria_santos"
create_placeholder "7B" "nicolas_lima"

# 8º Ano A
create_placeholder "8A" "olivia_costa"
create_placeholder "8A" "pedro_henrique"
create_placeholder "8A" "rafaela_souza"

# 9º Ano A
create_placeholder "9A" "samuel_ferreira"
create_placeholder "9A" "tatiana_lima"
create_placeholder "9A" "uri_santos"

echo -e "${GREEN}✅ Imagens de exemplo criadas!${NC}"
echo ""

# Gera o manifest
echo -e "${BLUE}📄 Gerando manifest.json...${NC}"
node scripts/generate-manifest.js

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        ✅ DEMO CONFIGURADA!              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📋 PRÓXIMO PASSO:${NC}"
echo -e "   Rode: ${GREEN}npm run dev${NC}"
echo -e "   Acesse: ${GREEN}http://localhost:5173${NC}"
echo ""
echo -e "${YELLOW}💡 DICA:${NC}"
echo "   Substitua as imagens SVG por fotos reais dos alunos."
echo "   Mantenha os mesmos nomes de arquivo!"
echo ""
