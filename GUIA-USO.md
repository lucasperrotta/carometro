# 📸 Carômetro Digital - Guia de Uso

## Como Funciona

O sistema funciona com base em **estrutura de pastas**. Você organiza as fotos dos alunos em pastas e o sistema exibe automaticamente!

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   public/turmas/           →  Carômetro Digital             │
│   ├── 6A/                  →  6º Ano A (fotos)              │
│   │   ├── joao_silva.jpg   →  João Silva                    │
│   │   ├── maria_santos.jpg →  Maria Santos                  │
│   │   └── pedro_lima.jpg   →  Pedro Lima                    │
│   ├── 6B/                  →  6º Ano B (fotos)              │
│   │   └── ana_oliveira.jpg →  Ana Oliveira                  │
│   └── manifest.json        →  Lista gerada automaticamente  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Passo a Passo

### 1️⃣ Criar as Pastas das Turmas

Na pasta do projeto, crie as subpastas dentro de `public/turmas/`:

```bash
# No terminal (dentro da pasta do projeto):
cd public/turmas

# Crie as pastas das turmas que você precisa:
mkdir 6A
mkdir 6B
mkdir 6C
mkdir 7A
mkdir 7B
# ... e assim por diante
```

Ou crie manualmente pelo explorador de arquivos:
```
public/
└── turmas/
    ├── 6A/     ← Crie esta pasta
    ├── 6B/     ← Crie esta pasta
    ├── 7A/     ← Crie esta pasta
    └── ...
```

### 2️⃣ Adicionar as Fotos dos Alunos

Coloque as fotos dos alunos dentro da pasta da turma correspondente.

**⚠️ REGRA IMPORTANTE PARA NOMES DE ARQUIVO:**

- Use **underscore** (_) no lugar de espaços
- O nome do arquivo vira o nome do aluno
- Exemplos:

| Arquivo | Nome Exibido |
|---------|--------------|
| `joao_silva.jpg` | Joao Silva |
| `maria_dos_santos.jpg` | Maria Dos Santos |
| `pedro_henrique_oliveira.jpg` | Pedro Henrique Oliveira |
| `ana_clara.jpg` | Ana Clara |

**Formatos aceitos:** `.jpg`, `.jpeg`, `.png`, `.webp`

### 3️⃣ Gerar o Manifest

Depois de adicionar as fotos, rode o script para gerar o `manifest.json`:

```bash
node scripts/generate-manifest.js
```

Você vai ver algo assim:
```
🔍 Lendo pastas de turmas...

📁 Processando turma: 6º Ano A (6A)
   ✅ 3 aluno(s) encontrado(s)

📁 Processando turma: 6º Ano B (6B)
   ✅ 1 aluno(s) encontrado(s)

═══════════════════════════════════════
✅ Manifest gerado com sucesso!
📊 Total: 2 turmas, 4 alunos
═══════════════════════════════════════
```

### 4️⃣ Rodar o Sistema

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 📋 Exemplo Completo

### Estrutura de arquivos:
```
public/
└── turmas/
    ├── 6A/
    │   ├── alice_mendes.jpg
    │   ├── bruno_costa.jpg
    │   ├── carla_rodrigues.jpg
    │   └── daniel_souza.jpg
    ├── 6B/
    │   ├── elena_fernandes.jpg
    │   └── fabio_lima.jpg
    ├── 7A/
    │   ├── gabriela_oliveira.jpg
    │   ├── hugo_santos.jpg
    │   └── isabela_pereira.jpg
    └── manifest.json
```

### Resultado no sistema:

**6º Ano A:**
1. Alice Mendes
2. Bruno Costa
3. Carla Rodrigues
4. Daniel Souza

**6º Ano B:**
1. Elena Fernandes
2. Fabio Lima

**7º Ano A:**
1. Gabriela Oliveira
2. Hugo Santos
3. Isabela Pereira

---

## 🔄 Como Atualizar

### Adicionar um aluno novo:
1. Coloque a foto na pasta da turma: `public/turmas/6A/novo_aluno.jpg`
2. Rode: `node scripts/generate-manifest.js`
3. Atualize a página do navegador (ou clique em "Atualizar Carômetro")

### Remover um aluno:
1. Delete a foto da pasta da turma
2. Rode: `node scripts/generate-manifest.js`
3. Atualize a página

### Trocar a foto de um aluno:
1. Substitua o arquivo na pasta (mantenha o mesmo nome)
2. Atualize a página (não precisa rodar o script)

### Mover aluno para outra turma:
1. Mova o arquivo para a pasta da nova turma
2. Rode: `node scripts/generate-manifest.js`
3. Atualize a página

---

## 💡 Dicas

### Ordem dos alunos
A ordem no carômetro segue a **ordem alfabética dos arquivos**. Se quiser uma ordem específica, renomeie os arquivos com números na frente:

```
6A/
├── 01_ana_silva.jpg      → Aparece em 1º
├── 02_bruno_santos.jpg   → Aparece em 2º
├── 03_carla_lima.jpg     → Aparece em 3º
```

Mas os números serão removidos do nome exibido? **NÃO!** Eles aparecerão no nome.

**Solução melhor:** Use a ordem alfabética natural ou aceite a ordem do sistema de arquivos.

### Fotos em alta qualidade
- Recomendo fotos **quadradas** (1:1) para ficar bonito no grid
- Tamanho ideal: 400x400px ou 600x600px
- Formato JPG para fotos (menor tamanho de arquivo)

### Backup
Faça backup regular da pasta `public/turmas/`! É lá que estão todas as fotos.

---

## 🆘 Problemas Comuns

### "Nenhuma turma encontrada"
- Verifique se as pastas estão em `public/turmas/`
- Verifique se rodou `node scripts/generate-manifest.js`
- Clique em "Atualizar Carômetro" na sidebar

### "Foto não aparece"
- Verifique se o arquivo é uma imagem válida (.jpg, .png)
- Verifique se o nome do arquivo não tem caracteres especiais
- Tente renomear o arquivo sem espaços ou acentos

### "Nome do aluno aparece estranho"
- Lembre-se: underscore (_) vira espaço
- Ex: `joao_silva.jpg` → "Joao Silva" ✅
- Ex: `joao silva.jpg` → "Joao silva.jpg" ❌ (não funciona)

---

## 📁 Estrutura do Projeto

```
carometro/
├── public/
│   └── turmas/              ← SUAS FOTOS VÃO AQUI
│       ├── 6A/
│       ├── 6B/
│       ├── 7A/
│       └── manifest.json    ← Gerado automaticamente
├── scripts/
│   └── generate-manifest.js ← Script que gera o manifest
├── src/
│   ├── App.tsx              ← Componente principal
│   ├── components/          ← Componentes React
│   ├── types/               ← Tipos TypeScript
│   └── utils/
│       └── manifestService.ts ← Lê o manifest.json
├── GUIA-USO.md              ← Este arquivo
└── package.json
```

---

## 🎯 Resumo Rápido

1. **Coloque fotos** em `public/turmas/[TURMA]/`
2. **Nomeie** com underscore: `nome_sobrenome.jpg`
3. **Rode** `node scripts/generate-manifest.js`
4. **Acesse** `http://localhost:5173`
5. **Pronto!** 🎉

---

**Feito com 💙 para a EMEF Professora Maria Aparecida Ujio**
