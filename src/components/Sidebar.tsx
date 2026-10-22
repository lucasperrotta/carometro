/**
 * ============================================
 * SIDEBAR - Menu Lateral de Navegação
 * ============================================
 * Exibe as turmas agrupadas por ano escolar.
 * Permite selecionar a turma ativa e acessar
 * as funcionalidades do sistema.
 */

import React, { useState } from 'react';
import { ClassRoom } from '../types';
import { getClasses } from '../utils/storage';

interface SidebarProps {
  selectedClassId: string | null;
  onSelectClass: (classId: string) => void;
  onAddStudent: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedClassId,
  onSelectClass,
  onAddStudent,
}) => {
  const classes = getClasses();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Agrupa turmas por ano
  const groupedClasses = classes.reduce((acc, classItem) => {
    const yearKey = `${classItem.year}º Ano`;
    if (!acc[yearKey]) {
      acc[yearKey] = [];
    }
    acc[yearKey].push(classItem);
    return acc;
  }, {} as Record<string, ClassRoom[]>);

  return (
    <>
      {/* Botão mobile para abrir sidebar */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col h-full
        `}
      >
        {/* Header da sidebar */}
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <h1 className="text-xl font-bold text-white">📸 Carômetro Digital</h1>
          <p className="text-blue-100 text-sm mt-1">
            EMEF Prof.ª Maria Aparecida Ujio
          </p>
          <p className="text-blue-200 text-xs mt-1">Turno: Manhã</p>
        </div>

        {/* Botão de cadastrar aluno */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={onAddStudent}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Cadastrar Aluno
          </button>
        </div>

        {/* Lista de turmas */}
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Turmas
          </p>
          
          {Object.entries(groupedClasses).map(([year, yearClasses]) => (
            <div key={year} className="mb-4">
              <p className="text-sm font-semibold text-gray-600 mb-1.5">{year}</p>
              <ul className="space-y-1">
                {yearClasses.map((classItem) => (
                  <li key={classItem.id}>
                    <button
                      onClick={() => {
                        onSelectClass(classItem.id);
                        setIsMobileOpen(false);
                      }}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-150
                        ${
                          selectedClassId === classItem.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          selectedClassId === classItem.id ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        Turma {classItem.section}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer da sidebar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-400 text-center">
            Sistema v1.0 • 2024
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
