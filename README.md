# 📸 Carômetro Digital - EMEF Prof.ª Maria Aparecida Ujio

Sistema web para gestão do carômetro (mural de fotos) dos alunos da escola.

## 🚀 Deploy no GitHub Pages

### Pré-requisitos
- Conta no GitHub
- Git instalado na máquina
- Node.js 18+ instalado

### Passo a Passo

#### 1. Criar o Repositório no GitHub

```bash
# No terminal, dentro da pasta do projeto:
git init
git add .
git commit -m "Initial commit - Carômetro Digital"
```

Depois crie um repositório novo no GitHub (ex: `carometro-digital`) e faça o push:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/carometro-digital.git
git push -u origin main
```

#### 2. Ajustar o `vite.config.js` para GitHub Pages

Abra o arquivo `vite.config.js` e adicione a propriedade `base`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/carometro-digital/', // ⬅️ ADICIONE ESTA LINHA (use o nome do seu repo)
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
```

> ⚠️ **IMPORTANTE:** O valor de `base` deve ser o nome do seu repositório com `/` no início e no final.
> - Se o repo é `carometro-digital` → `base: '/carometro-digital/'`
> - Se o repo é `carometro-emef` → `base: '/carometro-emef/'`

#### 3. Configurar GitHub Pages no Repositório

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. O workflow já está configurado em `.github/workflows/deploy.yml`

#### 4. Fazer Deploy

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

O GitHub Actions vai automaticamente:
1. Instalar dependências
2. Buildar o projeto
3. Publicar em `https://SEU_USUARIO.github.io/carometro-digital/`

### ✅ Pronto!

Acesse: `https://SEU_USUARIO.github.io/carometro-digital/`

---

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Buildar para produção
npm run build

# Preview do build
npm run preview
```

## 📋 Funcionalidades

- ✅ Visualização do carômetro por turma
- ✅ Cadastro de alunos com foto
- ✅ Edição de dados e fotos
- ✅ Remoção de alunos
- ✅ Transferência entre turmas
- ✅ Reordenação via drag-and-drop
- ✅ 12 turmas pré-cadastradas (6º ao 9º ano, A/B/C)
- ✅ Design responsivo (mobile/desktop)

## 🏗️ Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- @dnd-kit (drag-and-drop)
- localStorage (persistência)

## 📁 Estrutura

```
src/
├── App.tsx              → Componente raiz
├── main.tsx             → Entry point
├── index.css            → Estilos globais
├── types/index.ts       → Interfaces TypeScript
├── data/seed.ts         → Dados iniciais (turmas)
├── utils/storage.ts     → Camada de persistência
└── components/
    ├── Layout.tsx       → Layout principal
    ├── Sidebar.tsx      → Menu lateral
    ├── Carometro.tsx    → Grid de fotos
    ├── StudentCard.tsx  → Card do aluno
    ├── StudentForm.tsx  → Formulário CRUD
    ├── TransferModal.tsx → Modal de transferência
    └── ConfirmDialog.tsx → Confirmação
```

## 📝 Próximos Passos (Backend Real)

Quando quiser migrar para um backend:

1. **Prisma + SQLite** para banco de dados
2. **Express/Next.js API Routes** para endpoints
3. **Multer** para upload de imagens no servidor
4. **Autenticação** para proteger o sistema

---

Desenvolvido por [Seu Nome] - Estagiário de TI  
EMEF Professora Maria Aparecida Ujio - 2024
