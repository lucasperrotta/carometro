/**
 * ============================================
 * MANIFEST SERVICE - Camada de Dados
 * ============================================
 * 
 * Lê os dados do manifest.json gerado pelo script.
 * O manifest é criado a partir da estrutura de
 * pastas em public/turmas/.
 * 
 * ESTRUTURA DO MANIFEST:
 * {
 *   turmas: [
 *     {
 *       id: "6A",
 *       name: "6º Ano A",
 *       shift: "Manhã",
 *       students: [
 *         { id, name, photoUrl }
 *       ]
 *     }
 *   ]
 * }
 */

import { ClassRoom, Student } from '../types';

// Cache do manifest para evitar múltiplas requisições
let manifestCache: ManifestData | null = null;

/**
 * Interface do manifest.json
 */
interface ManifestData {
  generatedAt: string;
  totalTurmas: number;
  totalAlunos: number;
  turmas: ManifestTurma[];
}

interface ManifestTurma {
  id: string;
  name: string;
  shift: string;
  year: number;
  section: string;
  students: ManifestStudent[];
}

interface ManifestStudent {
  id: string;
  name: string;
  photoUrl: string;
  fileName?: string;
}

/**
 * Busca o manifest.json do servidor.
 * Usa cache para evitar requisições repetidas.
 */
export async function fetchManifest(): Promise<ManifestData> {
  // Se já tem em cache, retorna
  if (manifestCache) {
    return manifestCache;
  }

  try {
    const response = await fetch('/turmas/manifest.json');
    
    if (!response.ok) {
      throw new Error('Manifest não encontrado');
    }

    const data: ManifestData = await response.json();
    manifestCache = data;
    return data;
  } catch (error) {
    console.error('Erro ao carregar manifest:', error);
    // Retorna manifest vazio como fallback
    return {
      generatedAt: new Date().toISOString(),
      totalTurmas: 0,
      totalAlunos: 0,
      turmas: [],
    };
  }
}

/**
 * Limpa o cache do manifest (força recarregamento).
 */
export function clearManifestCache(): void {
  manifestCache = null;
}

/**
 * Retorna todas as turmas do manifest.
 */
export async function getClasses(): Promise<ClassRoom[]> {
  const manifest = await fetchManifest();
  
  return manifest.turmas.map(turma => ({
    id: turma.id,
    name: turma.name,
    shift: turma.shift,
    year: turma.year,
    section: turma.section,
  }));
}

/**
 * Busca uma turma específica pelo ID.
 */
export async function getClassById(id: string): Promise<ClassRoom | undefined> {
  const classes = await getClasses();
  return classes.find(c => c.id === id);
}

/**
 * Retorna os alunos de uma turma específica.
 * A ordem é definida pela ordem alfabética dos arquivos.
 */
export async function getStudentsByClass(classId: string): Promise<Student[]> {
  const manifest = await fetchManifest();
  const turma = manifest.turmas.find(t => t.id === classId);
  
  if (!turma) return [];

  // Converte para o formato Student
  return turma.students.map((student, index) => ({
    id: student.id,
    name: student.name,
    photoUrl: student.photoUrl,
    classId: classId,
    displayOrder: index, // Ordem baseada na posição no manifest
    createdAt: new Date().toISOString(),
  }));
}

/**
 * Retorna todos os alunos de todas as turmas.
 */
export async function getAllStudents(): Promise<Student[]> {
  const manifest = await fetchManifest();
  const allStudents: Student[] = [];

  manifest.turmas.forEach(turma => {
    turma.students.forEach((student, index) => {
      allStudents.push({
        id: student.id,
        name: student.name,
        photoUrl: student.photoUrl,
        classId: turma.id,
        displayOrder: index,
        createdAt: new Date().toISOString(),
      });
    });
  });

  return allStudents;
}

/**
 * Busca um aluno específico pelo ID.
 */
export async function getStudentById(id: string): Promise<Student | undefined> {
  const allStudents = await getAllStudents();
  return allStudents.find(s => s.id === id);
}
