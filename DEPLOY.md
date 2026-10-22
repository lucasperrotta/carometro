# 🚀 Guia Rápido de Deploy - GitHub Pages

Este guia vai te ajudar a colocar o Carômetro Digital no ar em poucos minutos!

---

## 📋 Checklist antes de começar

- [ ] Ter uma conta no GitHub (https://github.com)
- [ ] Ter o Git instalado (https://git-scm.com/downloads)
- [ ] Ter o projeto funcionando localmente (`npm run dev`)

---

## 🔧 Passo 1: Preparar o projeto

### 1.1 Editar o `vite.config.js`

Abra o arquivo `vite.config.js` na raiz do projeto e **adicione a linha `base`**:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/carometro-digital/',  // ⬅️ ADICIONE ESTA LINHA!
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

> 💡 **Dica:** Use o **mesmo nome** que você vai dar ao repositório no GitHub.
> 
> Exemplos:
> - Repositório: `carometro-digital` → `base: '/carometro-digital/'`
> - Repositório: `carometro-emef` → `base: '/carometro-emef/'`

### 1.2 Testar o build

```bash
npm run build
```

Se não der erro, está tudo certo! ✅

---

## 🌐 Passo 2: Criar o repositório no GitHub

### 2.1 No terminal (dentro da pasta do projeto)

```bash
# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Carômetro Digital - versão inicial"

# Renomear branch para main
git branch -M main
```

### 2.2 Criar repositório no GitHub

1. Acesse https://github.com/new
2. Preencha:
   - **Repository name:** `carometro-digital` (ou o nome que escolheu)
   - **Description:** "Carômetro Digital - EMEF Prof.ª Maria Aparecida Ujio"
   - **Public** ✅ (necessário para GitHub Pages gratuito)
   - ❌ **NÃO** marque "Add a README file" (já temos um)
3. Clique em **Create repository**

### 2.3 Fazer push para o GitHub

O GitHub vai te mostrar os comandos. Execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/carometro-digital.git
git push -u origin main
```

> ⚠️ Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!

---

## ⚡ Passo 3: Ativar o GitHub Pages

### 3.1 Configurar Pages

1. No repositório, vá em **Settings** (configurações)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **GitHub Actions**

![GitHub Pages Settings](https://docs.github.com/assets/cb-60145/mw-1440/images/help/pages/actions-tab.webp)

### 3.2 Verificar o workflow

O arquivo `.github/workflows/deploy.yml` já está configurado!

Quando você fez o push, o GitHub Actions já deve ter iniciado o deploy automaticamente.

### 3.3 Acompanhar o deploy

1. Vá na aba **Actions** do repositório
2. Clique no workflow "Deploy to GitHub Pages"
3. Aguarde os jobs `build` e `deploy` ficarem verdes ✅

---

## ✅ Passo 4: Acessar o site!

Após o deploy terminar (geralmente 2-3 minutos), acesse:

```
https://SEU_USUARIO.github.io/carometro-digital/
```

> Exemplo real: `https://joaosilva.github.io/carometro-digital/`

---

## 🔄 Como atualizar o site

Sempre que fizer alterações no código:

```bash
# 1. Fazer as alterações no código

# 2. Adicionar e commitar
git add .
git commit -m "Descrição da mudança"

# 3. Enviar para o GitHub
git push
```

O GitHub Actions vai automaticamente:
1. Detectar o push
2. Buildar o projeto
3. Fazer deploy do novo versão

**Pronto! Em 2-3 minutos o site está atualizado.** 🎉

---

## 🐛 Problemas comuns

### "Página não encontrada" (404)

**Causa:** O `base` no `vite.config.js` está diferente do nome do repositório.

**Solução:** Verifique se os nomes são idênticos:
- Nome do repo: `carometro-digital`
- Base no config: `base: '/carometro-digital/'`

### Deploy não inicia automaticamente

**Causa:** O GitHub Pages não está configurado para usar Actions.

**Solução:**
1. Vá em Settings → Pages
2. Em Source, selecione **GitHub Actions**

### Fotos não aparecem após deploy

**Causa:** As fotos estão no localStorage do navegador, que é local.

**Solução:** Isso é normal! Cada navegador mantém seus próprios dados. As fotos cadastradas aparecem no dispositivo onde foram adicionadas.

---

## 📱 Dica: Atalho no celular

Depois de publicado, você pode adicionar o site à tela inicial do celular:

**Android (Chrome):**
1. Abra o site no Chrome
2. Menu (⋮) → "Adicionar à tela inicial"

**iPhone (Safari):**
1. Abra o site no Safari
2. Botão Compartilhar → "Adicionar à Tela de Início"

---

## 🎓 Recursos úteis

- [Documentação GitHub Pages](https://docs.github.com/pt/pages)
- [Documentação Vite](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Docs](https://docs.github.com/pt/actions)

---

**Dúvidas?** Abra uma issue no repositório ou pergunte ao seu mentor! 💪
