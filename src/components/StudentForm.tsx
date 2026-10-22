/**
 * ============================================
 * STUDENT FORM - Modal de Cadastro/Edição
 * ============================================
 * Formulário para cadastrar ou editar um aluno.
 * Inclui upload de foto com preview.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Student, ClassRoom } from '../types';
import { getClasses, addStudent, updateStudent } from '../utils/storage';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editStudent?: Student | null; // Se definido, está em modo edição
  defaultClassId?: string;      // Turma padrão para novo cadastro
}

const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editStudent,
  defaultClassId,
}) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [classId, setClassId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const classes = getClasses();
  const isEditing = !!editStudent;

  // Preenche o formulário quando está editando
  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setPhotoUrl(editStudent.photoUrl);
      setClassId(editStudent.classId);
    } else {
      setName('');
      setPhotoUrl('');
      setClassId(defaultClassId || classes[0]?.id || '');
    }
  }, [editStudent, defaultClassId, isOpen]);

  /**
   * Processa o upload de imagem.
   * Converte para base64 para armazenar no localStorage.
   */
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Valida tipo do arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem.');
      return;
    }

    // Valida tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    // Converte para base64
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Remove a foto selecionada.
   */
  const handleRemovePhoto = () => {
    setPhotoUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Submete o formulário (cadastro ou edição).
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor, informe o nome do aluno.');
      return;
    }

    if (!classId) {
      alert('Por favor, selecione uma turma.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && editStudent) {
        // Modo edição
        updateStudent(editStudent.id, { name: name.trim(), photoUrl, classId });
      } else {
        // Modo cadastro
        addStudent(name.trim(), photoUrl, classId);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {isEditing ? '✏️ Editar Aluno' : '➕ Cadastrar Aluno'}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Upload de foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto do Aluno
            </label>
            <div className="flex items-center gap-4">
              {/* Preview da foto */}
              <div className="w-20 h-20 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>

              {/* Botões de upload */}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Escolher foto
                </label>
                {photoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="block text-xs text-red-500 hover:text-red-700"
                  >
                    Remover foto
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              PNG, JPG até 5MB
            </p>
          </div>

          {/* Nome do aluno */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Nome Completo *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Seleção de turma */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1.5">
              Turma *
            </label>
            <select
              id="class"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="">Selecione uma turma...</option>
              {classes.map((c: ClassRoom) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.shift}
                </option>
              ))}
            </select>
          </div>

          {/* Botões de ação */}
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
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
