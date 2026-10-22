/**
 * ============================================
 * STUDENT CARD - Card Individual do Aluno
 * ============================================
 * Exibe a foto, nome e ações disponíveis para
 * cada aluno no grid do carômetro.
 */

import React from 'react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
  onTransfer: (student: Student) => void;
  // Props para drag-and-drop
  isDragging?: boolean;
  dragHandleProps?: Record<string, unknown>;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onRemove,
  onTransfer,
  isDragging,
  dragHandleProps,
}) => {
  return (
    <div
      className={`
        group relative bg-white rounded-xl shadow-sm border border-gray-100
        overflow-hidden transition-all duration-200
        hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5
        ${isDragging ? 'opacity-50 scale-95 shadow-lg ring-2 ring-blue-400' : ''}
      `}
    >
      {/* Área da foto */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {student.photoUrl ? (
          <img
            src={student.photoUrl}
            alt={`Foto de ${student.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder quando não tem foto
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}

        {/* Handle de drag (visível no hover) */}
        <div
          {...(dragHandleProps || {})}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </div>
        </div>

        {/* Botões de ação (visíveis no hover) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Editar */}
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(student); }}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm hover:bg-blue-50 transition-colors"
            title="Editar aluno"
          >
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Transferir */}
          <button
            onClick={(e) => { e.stopPropagation(); onTransfer(student); }}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm hover:bg-purple-50 transition-colors"
            title="Transferir aluno"
          >
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          {/* Remover */}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(student); }}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm hover:bg-red-50 transition-colors"
            title="Remover aluno"
          >
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Informações do aluno */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 truncate" title={student.name}>
          {student.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Ordem: #{student.displayOrder + 1}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
