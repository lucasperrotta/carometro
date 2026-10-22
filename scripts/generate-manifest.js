/**
 * ============================================
 * GERADOR DE MANIFEST - Script Node.js
 * ============================================
 * 
 * Este script lê as pastas dentro de public/turmas/
 * e gera um arquivo manifest.json com a lista de
 * alunos de cada turma.
 * 
 * ESTRUTURA ESPERADA:
 * public/
 * └── turmas/
 *     ├── 6A/
 *     │   ├── joao_silva.jpg
 *     │   ├── maria_santos.jpg
 *     │   └── pedro_lima.jpg
 *     ├── 6B/
 *     │   ├── ana_oliveira.jpg
 *     │   └── lucas_ferreira.jpg
 *     ├── 7A/
 *     │   └── ...
 *     └── manifest.json  ← GERADO AUTOMATICAMENTE
 * 
 * COMO USAR:
 * 1. Coloque as fotos nas pastas das turmas
 * 2. Rode: node scripts/generate-manifest.js
 * 3. O manifest.json será criado/atualizado
 * 4. Rode npm run dev pra ver o resultado
 * 
 * REGRAS PARA NOMES DE ARQUIVO:
 * - Use underscore (_) no lugar de espaços
 * - Ex: "joao_silva.jpg" → "Joao Silva"
 * - Ex: "maria_dos_santos.jpg" → "Maria Dos Santos"
 * - Extensões aceitas: .jpg, .jpeg, .png, .webp
 */

const fs = require('fs');
const path = require('path');

// Configurações
const TURMAS_DIR = path.join(__dirname, '..', 'public', 'turmas');
const MANIFEST_FILE = path.join(TURMAS_DIR, 'manifest.json');

// Extensões de imagem aceitas
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Nomes das turmas (mapeamento)
const TURMA_NAMES = {
  '6A': '6º Ano A',
  '6B': '6º Ano B',
  '6C': '6º Ano C',
  '7A': '7º Ano A',
  '7B': '7º Ano B',
  '7C': '7º Ano C',
  '8A': '8º Ano A',
  '8B': '8º Ano B',
  '8C': '8º Ano C',
  '9A': '9º Ano A',
  '9B': '9º Ano B',
  '9C': '9º Ano C',
};

/**
 * Converte nome de arquivo para nome legível.
 * Ex: "joao_silva.jpg" → "Joao Silva"
 */
function fileNameToStudentName(fileName) {
  // Remove a extensão
  const nameWithoutExt = path.basename(fileName, path.extname(fileName));
  
  // Substitui underscores por espaços
  const nameWithSpaces = nameWithoutExt.replace(/_/g, ' ');
  
  // Capitaliza cada palavra
  const capitalized = nameWithSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return capitalized;
}

/**
 * Verifica se o arquivo é uma imagem válida.
 */
function isImageFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Lê as pastas de turmas e gera o manifest.
 */
function generateManifest() {
  console.log('🔍 Lendo pastas de turmas...\n');

  // Verifica se a pasta existe
  if (!fs.existsSync(TURMAS_DIR)) {
    console.error('❌ Erro: Pasta public/turmas/ não encontrada!');
    console.log('💡 Crie a pasta e adicione as subpastas das turmas.');
    process.exit(1);
  }

  // Lê as subpastas (turmas)
  const entries = fs.readdirSync(TURMAS_DIR, { withFileTypes: true });
  const turmas = [];

  entries.forEach(entry => {
    // Só processa diretórios
    if (!entry.isDirectory()) return;

    const turmaId = entry.name;
    const turmaPath = path.join(TURMAS_DIR, turmaId);
    const turmaName = TURMA_NAMES[turmaId] || turmaId;

    console.log(`📁 Processando turma: ${turmaName} (${turmaId})`);

    // Lê as imagens da turma
    const files = fs.readdirSync(turmaPath);
    const imageFiles = files.filter(isImageFile);

    if (imageFiles.length === 0) {
      console.log(`   ⚠️  Nenhuma imagem encontrada em ${turmaId}/\n`);
      return;
    }

    // Cria a lista de alunos
    const alunos = imageFiles.map((file, index) => ({
      id: `${turmaId}-${index}`,
      name: fileNameToStudentName(file),
      photoUrl: `/turmas/${turmaId}/${file}`,
      fileName: file,
    }));

    // Adiciona a turma ao manifest
    turmas.push({
      id: turmaId,
      name: turmaName,
      shift: 'Manhã',
      year: parseInt(turmaId.charAt(0)),
      section: turmaId.charAt(1),
      students: alunos,
    });

    console.log(`   ✅ ${alunos.length} aluno(s) encontrado(s)\n`);
  });

  // Ordena turmas por ano e seção
  turmas.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.section.localeCompare(b.section);
  });

  // Cria o manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalTurmas: turmas.length,
    totalAlunos: turmas.reduce((sum, t) => sum + t.students.length, 0),
    turmas: turmas,
  };

  // Salva o manifest
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  console.log('═══════════════════════════════════════');
  console.log('✅ Manifest gerado com sucesso!');
  console.log(`📊 Total: ${manifest.totalTurmas} turmas, ${manifest.totalAlunos} alunos`);
  console.log(`📄 Arquivo: ${MANIFEST_FILE}`);
  console.log('═══════════════════════════════════════\n');
}

// Executa o script
generateManifest();
