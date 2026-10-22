/**
 * ============================================
 * CARÔMETRO - Grid Principal de Fotos
 * ============================================
 * Exibe o grid de fotos dos alunos da turma.
 * Clique na foto para ver informações do aluno.
 */

import React from 'react';
import { Student, ClassRoom } from '../types';

interface CarometroProps {
  students: Student[];
  classId: string;
  onSelectStudent: (student: Student) => void;
}

const Carometro: React.FC<CarometroProps> = ({
  students,
  classId,
  onSelectStudent,
}) => {
  // Mapeamento dos nomes das turmas
  const turmaNames: Record<string, string> = {
    '6A': '6º Ano A', '6B': '6º Ano B', '6C': '6º Ano C',
    '7A': '7º Ano A', '7B': '7º Ano B', '7C': '7º Ano C',
    '8A': '8º Ano A', '8B': '8º Ano B', '8C': '8º Ano C',
    '9A': '9º Ano A', '9B': '9º Ano B', '9C': '9º Ano C',
  };

  const className = turmaNames[classId] || classId;

  // Se não tem alunos
  if (students.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{className}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Turno: Manhã • 0 alunos
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center h-64 mt-8">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-lg font-semibold text-gray-600">
              Nenhum aluno nesta turma
            </h3>
            <p className="text-gray-400 mt-2 mb-4">
              Adicione fotos dos alunos na pasta:
            </p>
            <code className="block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
              public/turmas/{classId}/
            </code>
            <p className="text-gray-400 mt-4 text-sm">
              Nomeie os arquivos com o nome do aluno usando underscore.
              <br />
              Exemplo: <code className="bg-gray-100 px-1 rounded">joao_silva.jpg</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{className}</h2>
          <p className="text-gray-500 text-sm mt-1">
            Turno: Manhã • {students.length} {students.length === 1 ? 'aluno' : 'alunos'}
          </p>
        </div>
      </div>

      {/* Dica */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>Dica:</strong> Clique na foto para ver mais detalhes. A ordem segue a ordem alfabética dos arquivos.
        </span>
      </div>

      {/* Grid de alunos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 cursor-pointer"
          >
            {/* Foto */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              {student.photoUrl ? (
                <img
                  src={student.photoUrl}
                  alt={`Foto de ${student.name}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Nome */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 truncate" title={student.name}>
                {student.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carometro;
