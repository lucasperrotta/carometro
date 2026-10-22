/**
 * ============================================
 * STORAGE UTILS - Camada de Persistência
 * ============================================
 * Funções para manipular o localStorage.
 * Em um projeto real com backend, essas funções
 * seriam substituídas por chamadas à API.
 * 
 * A interface é simples para facilitar a migração
 * futura para um backend real.
 */

import { ClassRoom, Student } from '../types';
import { initialClasses } from '../data/seed';

// Chaves usadas no localStorage
const KEYS = {
  CLASSES: 'carometro_classes',
  STUDENTS: 'carometro_students',
  INITIALIZED: 'carometro_initialized',
};

/**
 * Inicializa o storage com dados padrão.
 * Só roda na primeira vez que o app é aberto.
 */
export function initializeStorage(): void {
  const isInitialized = localStorage.getItem(KEYS.INITIALIZED);
  
  if (!isInitialized) {
    // Salva as turmas padrão
    localStorage.setItem(KEYS.CLASSES, JSON.stringify(initialClasses));
    // Inicializa lista vazia de alunos
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify([]));
    // Marca como inicializado
    localStorage.setItem(KEYS.INITIALIZED, 'true');
  }
}

// ============================================
// OPERAÇÕES DE TURMAS (CLASSES)
// ============================================

/**
 * Retorna todas as turmas cadastradas.
 */
export function getClasses(): ClassRoom[] {
  const data = localStorage.getItem(KEYS.CLASSES);
  return data ? JSON.parse(data) : [];
}

/**
 * Busca uma turma específica pelo ID.
 */
export function getClassById(id: string): ClassRoom | undefined {
  const classes = getClasses();
  return classes.find((c) => c.id === id);
}

// ============================================
// OPERAÇÕES DE ALUNOS (STUDENTS)
// ============================================

/**
 * Retorna todos os alunos cadastrados.
 */
export function getStudents(): Student[] {
  const data = localStorage.getItem(KEYS.STUDENTS);
  return data ? JSON.parse(data) : [];
}

/**
 * Retorna os alunos de uma turma específica,
 * ordenados pelo displayOrder.
 */
export function getStudentsByClass(classId: string): Student[] {
  const students = getStudents();
  return students
    .filter((s) => s.classId === classId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Busca um aluno específico pelo ID.
 */
export function getStudentById(id: string): Student | undefined {
  const students = getStudents();
  return students.find((s) => s.id === id);
}

/**
 * Gera um ID único para o aluno.
 * Em produção, isso seria feito pelo banco de dados.
 */
function generateId(): string {
  return `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Cadastra um novo aluno na turma.
 * O displayOrder é definido como o próximo número disponível.
 */
export function addStudent(name: string, photoUrl: string, classId: string): Student {
  const students = getStudents();
  
  // Calcula a próxima ordem para essa turma
  const classStudents = students.filter((s) => s.classId === classId);
  const maxOrder = classStudents.length > 0
    ? Math.max(...classStudents.map((s) => s.displayOrder))
    : -1;

  const newStudent: Student = {
    id: generateId(),
    name,
    photoUrl,
    classId,
    displayOrder: maxOrder + 1,
    createdAt: new Date().toISOString(),
  };

  students.push(newStudent);
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  
  return newStudent;
}

/**
 * Atualiza os dados de um aluno existente.
 */
export function updateStudent(id: string, data: Partial<Omit<Student, 'id' | 'createdAt'>>): Student | null {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === id);
  
  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  
  return students[index];
}

/**
 * Remove um aluno do sistema.
 * Após remover, reorganiza a ordem dos restantes.
 */
export function removeStudent(id: string): boolean {
  const students = getStudents();
  const student = students.find((s) => s.id === id);
  
  if (!student) return false;

  const filtered = students.filter((s) => s.id !== id);
  
  // Reorganiza a ordem da turma após remoção
  const classStudents = filtered
    .filter((s) => s.classId === student.classId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  
  classStudents.forEach((s, index) => {
    s.displayOrder = index;
  });

  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(filtered));
  return true;
}

/**
 * Transfere um aluno para outra turma.
 * Mantém a foto e dados, apenas muda o classId.
 */
export function transferStudent(studentId: string, targetClassId: string): boolean {
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  
  if (!student) return false;

  const sourceClassId = student.classId;

  // Define nova ordem na turma de destino
  const targetStudents = students.filter(
    (s) => s.classId === targetClassId && s.id !== studentId
  );
  const newOrder = targetStudents.length > 0
    ? Math.max(...targetStudents.map((s) => s.displayOrder)) + 1
    : 0;

  // Atualiza o aluno
  student.classId = targetClassId;
  student.displayOrder = newOrder;

  // Reorganiza a ordem da turma de origem
  const sourceStudents = students
    .filter((s) => s.classId === sourceClassId && s.id !== studentId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  
  sourceStudents.forEach((s, index) => {
    s.displayOrder = index;
  });

  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  return true;
}

/**
 * Atualiza a ordem de exibição dos alunos de uma turma.
 * Usado após drag-and-drop.
 */
export function reorderStudents(classId: string, orderedIds: string[]): void {
  const students = getStudents();
  
  orderedIds.forEach((id, index) => {
    const student = students.find((s) => s.id === id);
    if (student && student.classId === classId) {
      student.displayOrder = index;
    }
  });

  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
}

/**
 * Reseta todo o storage (útil para testes).
 */
export function resetStorage(): void {
  localStorage.removeItem(KEYS.CLASSES);
  localStorage.removeItem(KEYS.STUDENTS);
  localStorage.removeItem(KEYS.INITIALIZED);
  initializeStorage();
}
