/**
 * ============================================
 * TIPOS DO SISTEMA - Carômetro Digital
 * ============================================
 * Definições TypeScript para garantir type-safety
 * em toda a aplicação.
 */

/**
 * Representa uma turma da escola.
 * Exemplo: "6º Ano A", "7º Ano B", etc.
 */
export interface ClassRoom {
  id: string;
  name: string;        // Ex: "6º Ano A"
  shift: string;       // Ex: "Manhã"
  year: number;        // Ano escolar (6, 7, 8, 9)
  section: string;     // Turma (A, B, C)
}

/**
 * Representa um aluno cadastrado no sistema.
 * O displayOrder é CRUCIAL - define a posição
 * exata do aluno no grid do carômetro.
 */
export interface Student {
  id: string;
  name: string;
  photoUrl: string;    // Base64 da foto ou URL
  classId: string;     // FK para ClassRoom
  displayOrder: number; // Ordem de exibição no grid
  createdAt: string;   // Data de cadastro (ISO string)
}

/**
 * Dados necessários para cadastrar/editar um aluno.
 * Separamos do Student para ter um DTO limpo.
 */
export interface StudentFormData {
  name: string;
  photoUrl: string;
  classId: string;
}

/**
 * Dados para transferência de aluno entre turmas.
 */
export interface TransferData {
  studentId: string;
  targetClassId: string;
}
