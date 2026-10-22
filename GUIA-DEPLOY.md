# 🚀 GUIA COMPLETO DE DEPLOY - GitHub Pages
## Carômetro Digital - EMEF Prof.ª Maria Aparecida Ujio

---

## 📋 O que vamos fazer?

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   SEU COMPUTADOR          GITHUB              INTERNET      │
│   ┌──────────┐           ┌──────────┐        ┌──────────┐  │
│   │  Código  │──push────▶│  GitHub  │───────▶│  Site    │  │
│   │  do      │           │  Actions │        │  Online  │  │
│   │  Projeto │           │  (build) │        │  24/7    │  │
│   └──────────┘           └──────────┘        └──────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Resumo:** Você sobe o código pro GitHub → GitHub builda automaticamente → Site fica online!

---

## 🎯 PASSO 1: Preparar o Projeto

### 1.1 - Abra o arquivo `vite.config.js`

Você vai ver algo assim:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    // ...
  },
});
```

### 1.2 - Adicione a linha `base`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/carometro-digital/',  // ⬅️ ADICIONE ESTA LINHA
  server: {
    host: "0.0.0.0",
    port: 3000,
    // ...
  },
});
```

> 💡 **IMPORTANTE:** O nome `carometro-digital` deve ser IGUAL ao nome do repositório que você vai criar no GitHub.

### 1.3 - Teste se o build funciona

Abra o terminal na pasta do projeto e rode:

```bash
npm run build
```

Se aparecer algo como:
```
✓ 42 modules transformed.
dist/index.html                   1.00 kB
dist/assets/index-xxx.css         7.96 kB
dist/assets/index-xxx.js          214.40 kB
✓ built in 2.55s
```

✅ **Build OK!** Pode continuar.

---

## 🎯 PASSO 2: Criar Conta no GitHub (se não tiver)

1. Acesse: **https://github.com**
2. Clique em **"Sign up"**
3. Preencha: email, senha, username
4. Verifique o email
5. Pronto! ✅

---

## 🎯 PASSO 3: Criar o Repositório no GitHub

### 3.1 - No GitHub, clique no "+" no canto superior direito

```
┌─────────────────────────────────────────────────┐
│  GitHub                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │ Home │  │Issues│  │Pull R│  │  +   │  ← CLIQUE AQUI
│  └──────┘  └──────┘  └──────┘  └──────┘       │
└─────────────────────────────────────────────────┘
```

### 3.2 - Clique em "New repository"

### 3.3 - Preencha os dados:

```
┌─────────────────────────────────────────────────┐
│  Create a new repository                        │
│                                                 │
│  Repository name:                               │
│  ┌─────────────────────────────────────┐       │
│  │ carometro-digital                    │  ← Nome do repo
│  └─────────────────────────────────────┘       │
│                                                 │
│  Description (optional):                        │
│  ┌─────────────────────────────────────┐       │
│  │ Carômetro Digital - EMEF M.A. Ujio   │  ← Descrição
│  └─────────────────────────────────────┘       │
│                                                 │
│  ○ Public    ← SELECIONE ESTE (público)        │
│  ○ Private                                    │
│                                                 │
│  ☐ Add a README file    ← NÃO MARQUE!          │
│  ☐ Add .gitignore       ← NÃO MARQUE!          │
│  ☐ Choose a license     ← NÃO MARQUE!          │
│                                                 │
│              [ Create repository ]              │
└─────────────────────────────────────────────────┘
```

### 3.4 - Copie a URL do repositório

Depois de criar, você vai ver uma página assim:

```
┌─────────────────────────────────────────────────┐
│  ...or push an existing repository               │
│                                                 │
│  git remote add origin                          │
│  ┌─────────────────────────────────────────┐   │
│  │ https://github.com/SEU_USER/carometro-  │   │ ← COPIE ESTA URL!
│  │ digital.git                             │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**COPIE ESSA URL!** Você vai precisar dela no próximo passo.

---

## 🎯 PASSO 4: Enviar o Código para o GitHub

### 4.1 - Abra o terminal na pasta do projeto

**No Windows:**
- Abra a pasta do projeto
- Clique na barra de endereço (onde mostra o caminho)
- Digite `cmd` e aperte Enter

**No Mac/Linux:**
- Abra o terminal
- Use `cd` para navegar até a pasta:
  ```bash
  cd /caminho/para/o/projeto
  ```

### 4.2 - Execute os comandos (COPIE E COLE um por um):

```bash
# 1️⃣ Inicializa o Git no projeto
git init
```
↑ Enter, espera terminar, depois:

```bash
# 2️⃣ Adiciona todos os arquivos
git add .
```
↑ Enter, espera, depois:

```bash
# 3️⃣ Cria o primeiro commit
git commit -m "Carômetro Digital - versão inicial"
```
↑ Enter, espera, depois:

```bash
# 4️⃣ Renomeia a branch para main
git branch -M main
```
↑ Enter, depois:

```bash
# 5️⃣ Conecta com o GitHub (SUBSTITUA a URL pela sua!)
git remote add origin https://github.com/SEU_USUARIO/carometro-digital.git
```

> ⚠️ **IMPORTANTE:** Troque `SEU_USUARIO` pelo seu username do GitHub!
> 
> Exemplo: se seu user é `joaosilva123`, a linha fica:
> ```bash
> git remote add origin https://github.com/joaosilva123/carometro-digital.git
> ```

Depois:

```bash
# 6️⃣ Envia o código para o GitHub! 🚀
git push -u origin main
```

### 4.3 - Popup de Login

Quando rodar o último comando, vai aparecer:

```
┌─────────────────────────────────────────────────┐
│  Sign in to GitHub                              │
│                                                 │
│  Sign in to GitHub CLI with browser?            │
│                                                 │
│  ○ Sign in with browser                         │  ← SELECIONE ESTE
│  ○ Sign in with token                           │
│                                                 │
└─────────────────────────────────────────────────┘
```

1. Selecione **"Sign in with browser"**
2. O terminal vai mostrar um código e abrir o navegador
3. No navegador, faça login no GitHub
4. Cole o código que apareceu no terminal
5. Autorize o acesso
6. Volte no terminal - deve ter funcionado! ✅

---

## 🎯 PASSO 5: Ativar o GitHub Pages

### 5.1 - Vá no repositório do GitHub

Acesse: `https://github.com/SEU_USUARIO/carometro-digital`

### 5.2 - Vá em Settings

```
┌─────────────────────────────────────────────────┐
│  carometro-digital                              │
│                                                 │
│  [<> Code] [⚡ Actions] [⚙ Settings]           │  ← CLIQUE AQUI
│                                    ↑            │
└─────────────────────────────────────────────────┘
```

### 5.3 - No menu lateral, clique em "Pages"

```
┌─────────────────────────────────────────────────┐
│  Settings                                       │
│                                                 │
│  ┌──────────────────┐                          │
│  │ General          │                          │
│  │ Access           │                          │
│  │ ...              │                          │
│  │ Pages            │  ← CLIQUE AQUI           │
│  │ ...              │                          │
│  └──────────────────┘                          │
└─────────────────────────────────────────────────┘
```

### 5.4 - Configure o Source

```
┌─────────────────────────────────────────────────┐
│  GitHub Pages                                   │
│                                                 │
│  Source:                                        │
│  ┌─────────────────────────────────────┐       │
│  │  ▼ GitHub Actions            │  ← SELECIONE│
│  └─────────────────────────────────────┘       │
│                                                 │
│  (Antes estava "Deploy from a branch")         │
└─────────────────────────────────────────────────┘
```

### 5.5 - Pronto! O deploy vai iniciar automaticamente!

---

## 🎯 PASSO 6: Acompanhar o Deploy

### 6.1 - Vá na aba "Actions"

```
┌─────────────────────────────────────────────────┐
│  carometro-digital                              │
│                                                 │
│  [<> Code] [⚡ Actions]  ← CLIQUE AQUI         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 6.2 - Você vai ver algo assim:

```
┌─────────────────────────────────────────────────┐
│  All workflows                                  │
│                                                 │
│  ┌─────────────────────────────────────┐       │
│  │ ✅ Deploy to GitHub Pages           │       │
│  │    Deploy: 2024-01-15 14:30         │       │
│  │    main · 2 minutes ago             │       │
│  └─────────────────────────────────────┘       │
│                                                 │
│  Se tiver ✅ verde = DEU CERTO!                │
│  Se tiver ❌ vermelho = DEU ERRO               │
└─────────────────────────────────────────────────┘
```

### 6.3 - Aguarde ~2-3 minutos

O workflow tem 2 etapas:
1. **build** - Instala e builda o projeto
2. **deploy** - Publica no GitHub Pages

Quando ambos estiverem ✅ verdes, o site está no ar!

---

## 🎯 PASSO 7: Acessar o Site!

O site estará disponível em:

```
https://SEU_USUARIO.github.io/carometro-digital/
```

**Exemplo real:**
- User: `joaosilva`
- Repo: `carometro-digital`
- URL: `https://joaosilva.github.io/carometro-digital/`

---

## 🔄 Como Atualizar o Site (depois)

Sempre que fizer mudanças no código:

```bash
# 1. Faça suas alterações no código...

# 2. Salve os arquivos

# 3. No terminal:
git add .
git commit -m "Descrição do que mudou"
git push
```

**Pronto!** Em 2-3 minutos o site atualiza automaticamente! 🎉

---

## 🐛 Problemas Comuns e Soluções

### ❌ "Página não encontrada" (404)

**Causa:** O `base` no `vite.config.js` está diferente do nome do repositório.

**Solução:**
```javascript
// Se o repo é "carometro-digital":
base: '/carometro-digital/',  // ← Deve ser IGUAL ao nome do repo
```

### ❌ "Actions are not enabled"

**Solução:**
1. Vá em Settings → Actions → General
2. Marque: "Allow all actions"
3. Salve

### ❌ Build falha no GitHub Actions

**Solução:**
1. Vá na aba Actions
2. Clique no workflow que falhou
3. Veja os logs de erro
4. Geralmente é erro de código - rode `npm run build` localmente para ver

### ❌ "Permission denied" no git push

**Solução:**
```bash
# Remova o remote antigo
git remote remove origin

# Adicione novamente com a URL correta
git remote add origin https://github.com/SEU_USUARIO/carometro-digital.git

# Tente o push novamente
git push -u origin main
```

---

## 📱 Bônus: Atalho no Celular

Depois que o site estiver no ar, adicione na tela inicial:

**Android (Chrome):**
1. Abra o site no Chrome
2. Menu (⋮) → "Adicionar à tela inicial"
3. Nomeie como "Carômetro"
4. Pronto! Vira um "app" 📱

**iPhone (Safari):**
1. Abra o site no Safari
2. Botão Compartilhar (⬆️)
3. "Adicionar à Tela de Início"
4. Nomeie como "Carômetro"
5. Pronto! 📱

---

## 📞 Precisa de Ajuda?

- **Documentação GitHub Pages:** https://docs.github.com/pt/pages
- **Documentação Vite:** https://vitejs.dev/guide/
- **Stack Overflow:** https://stackoverflow.com/

---

## ✅ Checklist Final

- [ ] Editou `vite.config.js` com o `base` correto
- [ ] `npm run build` funciona sem erros
- [ ] Criou repositório no GitHub (público)
- [ ] Fez `git push` com sucesso
- [ ] Ativou GitHub Pages → Source: GitHub Actions
- [ ] Aguardou o workflow terminar (✅ verde)
- [ ] Acessou o site e está funcionando!

---

**Feito com 💙 por [Seu Nome] - Estagiário de TI**  
**EMEF Professora Maria Aparecida Ujio - 2024**
