/**
 * ============================================
 * APP.tsx - Componente Raiz da Aplicação
 * ============================================
 * 
 * Carômetro Digital - EMEF Professora Maria Aparecida Ujio
 * 
 * Este é o componente principal que:
 * 1. Inicializa o storage (localStorage)
 * 2. Gerencia o estado global da aplicação
 * 3. Coordena a comunicação entre componentes
 * 4. Controla a exibição de modais
 * 
 * Arquitetura: Single Page Application (SPA)
 * com estado gerenciado via useState + localStorage.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Student } from './types';
import { initializeStorage, removeStudent } from './utils/storage';
import Layout from './components/Layout';
import Carometro from './components/Carometro';
import StudentForm from './components/StudentForm';
import TransferModal from './components/TransferModal';
import ConfirmDialog from './components/ConfirmDialog';

const App: React.FC = () => {
  // ============================================
  // ESTADO DA APLICAÇÃO
  // ============================================
  
  /** ID da turma atualmente selecionada */
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  
  /** Controla exibição do modal de cadastro/edição */
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  /** Aluno sendo editado (null = modo cadastro) */
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  /** Controla exibição do modal de transferência */
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  /** Aluno selecionado para transferência */
  const [transferringStudent, setTransferringStudent] = useState<Student | null>(null);
  
  /** Controla exibição do diálogo de confirmação de remoção */
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  
  /** Aluno selecionado para remoção */
  const [removingStudent, setRemovingStudent] = useState<Student | null>(null);
  
  /** Counter para forçar re-render após mudanças */
  const [refreshKey, setRefreshKey] = useState(0);

  // ============================================
  // INICIALIZAÇÃO
  // ============================================

  /**
   * Inicializa o storage na primeira renderização.
   * Popula o localStorage com as turmas padrão.
   */
  useEffect(() => {
    initializeStorage();
  }, []);

  // ============================================
  // HANDLERS - Ações da Interface
  // ============================================

  /**
   * Seleciona uma turma para exibição.
   */
  const handleSelectClass = useCallback((classId: string) => {
    setSelectedClassId(classId);
  }, []);

  /**
   * Abre o modal de cadastro de aluno.
   */
  const handleAddStudent = useCallback(() => {
    setEditingStudent(null);
    setIsFormOpen(true);
  }, []);

  /**
   * Abre o modal de edição com os dados do aluno.
   */
  const handleEditStudent = useCallback((student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  }, []);

  /**
   * Abre o diálogo de confirmação para remover aluno.
   */
  const handleRemoveStudent = useCallback((student: Student) => {
    setRemovingStudent(student);
    setIsConfirmRemoveOpen(true);
  }, []);

  /**
   * Confirma e executa a remoção do aluno.
   */
  const confirmRemoveStudent = useCallback(() => {
    if (removingStudent) {
      removeStudent(removingStudent.id);
      setIsConfirmRemoveOpen(false);
      setRemovingStudent(null);
      setRefreshKey((k) => k + 1); // Força re-render
    }
  }, [removingStudent]);

  /**
   * Abre o modal de transferência.
   */
  const handleTransferStudent = useCallback((student: Student) => {
    setTransferringStudent(student);
    setIsTransferOpen(true);
  }, []);

  /**
   * Callback de sucesso após operações CRUD.
   * Força re-render para atualizar a lista.
   */
  const handleSuccess = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  // ============================================
  // RENDER
  // ============================================

  return (
    <Layout
      selectedClassId={selectedClassId}
      onSelectClass={handleSelectClass}
      onAddStudent={handleAddStudent}
    >
      {/* Área principal - Carômetro */}
      {selectedClassId ? (
        <Carometro
          key={refreshKey} // Re-renderiza quando dados mudam
          selectedClassId={selectedClassId}
          onEditStudent={handleEditStudent}
          onRemoveStudent={handleRemoveStudent}
          onTransferStudent={handleTransferStudent}
        />
      ) : (
        // Tela inicial quando nenhuma turma está selecionada
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-lg">
            <div className="text-7xl mb-6">🏫</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Carômetro Digital
            </h1>
            <h2 className="text-lg text-gray-600 mb-2">
              EMEF Professora Maria Aparecida Ujio
            </h2>
            <p className="text-gray-400 mb-8">
              Selecione uma turma no menu lateral para visualizar e gerenciar
              as fotos dos alunos.
            </p>
            
            {/* Cards informativos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="text-2xl mb-2">📸</div>
                <h3 className="font-semibold text-blue-800 text-sm">Visualizar</h3>
                <p className="text-xs text-blue-600 mt-1">
                  Veja as fotos dos alunos organizadas por turma.
                </p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="text-2xl mb-2">✏️</div>
                <h3 className="font-semibold text-green-800 text-sm">Gerenciar</h3>
                <p className="text-xs text-green-600 mt-1">
                  Cadastre, edite e remova alunos facilmente.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="font-semibold text-purple-800 text-sm">Transferir</h3>
                <p className="text-xs text-purple-600 mt-1">
                  Mova alunos entre turmas sem perder dados.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          MODAIS
          ============================================ */}

      {/* Modal de Cadastro/Edição de Aluno */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStudent(null);
        }}
        onSuccess={handleSuccess}
        editStudent={editingStudent}
        defaultClassId={selectedClassId || undefined}
      />

      {/* Modal de Transferência */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => {
          setIsTransferOpen(false);
          setTransferringStudent(null);
        }}
        onSuccess={handleSuccess}
        student={transferringStudent}
      />

      {/* Diálogo de Confirmação de Remoção */}
      <ConfirmDialog
        isOpen={isConfirmRemoveOpen}
        title="Remover Aluno"
        message={`Tem certeza que deseja remover "${removingStudent?.name}" do carômetro? Esta ação não pode ser desfeita.`}
        confirmLabel="Sim, Remover"
        cancelLabel="Não, Cancelar"
        variant="danger"
        onConfirm={confirmRemoveStudent}
        onCancel={() => {
          setIsConfirmRemoveOpen(false);
          setRemovingStudent(null);
        }}
      />
    </Layout>
  );
};

export default App;
