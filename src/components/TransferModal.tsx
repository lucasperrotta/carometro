/**
 * ============================================
 * TRANSFER MODAL - Modal de Transferência
 * ============================================
 * Permite transferir um aluno de uma turma
 * para outra sem perder os dados.
 */

import React, { useState, useEffect } from 'react';
import { Student, ClassRoom } from '../types';
import { getClasses, transferStudent, getClassById } from '../utils/storage';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  student: Student | null;
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  student,
}) => {
  const [targetClassId, setTargetClassId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classes = getClasses();

  // Filtra as turmas disponíveis (exclui a turma atual do aluno)
  const availableClasses = classes.filter(
    (c: ClassRoom) => c.id !== student?.classId
  );

  useEffect(() => {
    if (isOpen) {
      setTargetClassId('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!student || !targetClassId) return;

    setIsSubmitting(true);

    try {
      const success = transferStudent(student.id, targetClassId);
      if (success) {
        onSuccess();
        onClose();
      } else {
        alert('Erro ao transferir aluno.');
      }
    } catch (error) {
      console.error('Erro na transferência:', error);
      alert('Erro ao transferir. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !student) return null;

  const currentClass = getClassById(student.classId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              🔄 Transferir Aluno
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Info do aluno */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {student.photoUrl ? (
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{student.name}</p>
              <p className="text-sm text-gray-500">
                Turma atual: <strong>{currentClass?.name}</strong>
              </p>
            </div>
          </div>

          {/* Seleção da turma destino */}
          <div>
            <label htmlFor="target-class" className="block text-sm font-medium text-gray-700 mb-1.5">
              Transferir para: *
            </label>
            <select
              id="target-class"
              value={targetClassId}
              onChange={(e) => setTargetClassId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white"
              required
            >
              <option value="">Selecione a turma de destino...</option>
              {availableClasses.map((c: ClassRoom) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.shift}
                </option>
              ))}
            </select>
          </div>

          {/* Aviso */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-700">
              ⚠️ O aluno será movido para a nova turma. A foto e os dados serão mantidos.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Transferindo...' : 'Confirmar Transferência'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
