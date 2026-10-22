/**
 * ============================================
 * STUDENT INFO PANEL - Painel de Informações
 * ============================================
 * Exibe informações detalhadas do aluno quando
 * clicado no card do carômetro.
 */

import React from 'react';
import { Student } from '../types';

interface StudentInfoPanelProps {
  student: Student;
  onClose: () => void;
}

const StudentInfoPanel: React.FC<StudentInfoPanelProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Foto grande */}
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {student.photoUrl ? (
            <img
              src={student.photoUrl}
              alt={`Foto de ${student.name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Informações */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {student.name}
          </h2>
          <div className="space-y-2 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Turma: {student.classId}
            </p>
            <p className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              Posição no carômetro: #{student.displayOrder + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoPanel;
