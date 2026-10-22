# 📸 Carômetro Digital
## EMEF Professora Maria Aparecida Ujio

Sistema web para visualização do carômetro (mural de fotos) dos alunos, baseado em **estrutura de pastas**.

---

## 🎯 Como Funciona

O sistema lê as fotos organizadas em pastas e exibe automaticamente no carômetro:

```
public/turmas/
├── 6A/
│   ├── joao_silva.jpg      → "Joao Silva"
│   ├── maria_santos.jpg    → "Maria Santos"
│   └── pedro_lima.jpg      → "Pedro Lima"
├── 6B/
│   ├── ana_oliveira.jpg    → "Ana Oliveira"
│   └── lucas_ferreira.jpg  → "Lucas Ferreira"
└── manifest.json           ← Gerado automaticamente
```

**Regra simples:** Nome do arquivo = Nome do aluno (use underscore no lugar de espaços)

---

## 🚀 Instalação e Uso

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar pastas das turmas
```bash
cd public/turmas
mkdir 6A 6B 6C 7A 7B 7C 8A 8B 8C 9A 9B 9C
```

### 3. Adicionar fotos dos alunos
Coloque as fotos nas pastas das turmas correspondentes:
```bash
# Exemplo:
# public/turmas/6A/joao_silva.jpg
# public/turmas/6A/maria_santos.jpg
```

### 4. Gerar o manifest
```bash
node scripts/generate-manifest.js
```

### 5. Rodar o sistema
```bash
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📋 Guia Rápido

| Ação | Como fazer |
|------|------------|
| **Adicionar aluno** | Coloque foto em `public/turmas/[TURMA]/nome.jpg` |
| **Remover aluno** | Delete a foto da pasta |
| **Trocar foto** | Substitua o arquivo (mesmo nome) |
| **Mover aluno** | Mova o arquivo para outra pasta de turma |
| **Atualizar sistema** | Rode `node scripts/generate-manifest.js` |

---

## 📖 Documentação Completa

Leia o **[GUIA-USO.md](GUIA-USO.md)** para instruções detalhadas, exemplos e dicas.

---

## 🛠️ Tecnologias

- **React 18** + TypeScript
- **Vite** (build tool)
- **Tailwind CSS v4** (estilos)
- **Node.js** (script de geração do manifest)

---

## 📁 Estrutura do Projeto

```
carometro/
├── public/
│   └── turmas/              ← SUAS FOTOS VÃO AQUI
│       ├── 6A/              ← Pasta da turma
│       ├── 6B/
│       ├── 7A/
│       └── manifest.json    ← Lista de alunos (gerado)
├── scripts/
│   └── generate-manifest.js ← Gera o manifest.json
├── src/
│   ├── App.tsx              ← Componente principal
│   ├── components/          ← Componentes React
│   ├── types/               ← Tipos TypeScript
│   └── utils/
│       └── manifestService.ts
├── GUIA-USO.md              ← Guia completo de uso
└── README.md                ← Este arquivo
```

---

## 🌐 Deploy no GitHub Pages

O sistema pode ser publicado no GitHub Pages gratuitamente!

### Passo a passo:

1. **Edite `vite.config.js`** e adicione:
   ```javascript
   base: '/carometro-digital/',  // Nome do seu repo
   ```

2. **Crie o repositório no GitHub** (público)

3. **Faça push:**
   ```bash
   git init
   git add .
   git commit -m "Carômetro Digital"
   git remote add origin https://github.com/SEU_USER/carometro-digital.git
   git push -u origin main
   ```

4. **Ative o GitHub Pages:**
   - Settings → Pages → Source: GitHub Actions

5. **Acesse:** `https://SEU_USER.github.io/carometro-digital/`

Leia **[GUIA-DEPLOY.md](GUIA-DEPLOY.md)** para instruções detalhadas.

---

## 💡 Vantagens desta Abordagem

✅ **Simples** - Basta organizar arquivos em pastas  
✅ **Sem banco de dados** - Tudo baseado em arquivos  
✅ **Fácil de manter** - Qualquer pessoa consegue usar  
✅ **Backup fácil** - Basta copiar a pasta `public/turmas/`  
✅ **Sem upload** - Coloque as fotos direto nas pastas  
✅ **Gratuito** - Hospede no GitHub Pages  

---

## 🤝 Contribuindo

Este é um projeto interno da EMEF Professora Maria Aparecida Ujio.

**Desenvolvido por:** [Seu Nome] - Estagiário de TI  
**Contato:** [seu.email@escola.edu.br]

---

## 📝 Licença

Uso interno da EMEF Professora Maria Aparecida Ujio.

---

**Feito com 💙 para a educação**
