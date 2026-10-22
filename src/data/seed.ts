/**
 * ============================================
 * SEED DATA - Dados Iniciais do Sistema
 * ============================================
 * Popula o localStorage com as turmas da escola.
 * Na versão com backend, isso seria um script
 * de seed do Prisma.
 */

import { ClassRoom } from '../types';

/**
 * Gera todas as turmas da escola:
 * - Anos: 6º, 7º, 8º, 9º
 * - Seções: A, B, C
 * - Turno: Manhã
 * Total: 12 turmas
 */
export function generateClasses(): ClassRoom[] {
  const years = [6, 7, 8, 9];
  const sections = ['A', 'B', 'C'];
  const classes: ClassRoom[] = [];

  years.forEach((year) => {
    sections.forEach((section) => {
      classes.push({
        id: `class-${year}${section}`,
        name: `${year}º Ano ${section}`,
        shift: 'Manhã',
        year,
        section,
      });
    });
  });

  return classes;
}

/**
 * Dados iniciais de turmas (usado no primeiro load).
 */
export const initialClasses: ClassRoom[] = generateClasses();
