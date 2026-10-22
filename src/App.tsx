/**
 * ============================================
 * APP.tsx - Componente Raiz da Aplicação
 * ============================================
 * 
 * Carômetro Digital - EMEF Professora Maria Aparecida Ujio
 * 
 * Versão baseada em estrutura de pastas:
 * - Fotos organizadas em public/turmas/[TURMA]/
 * - Nome do arquivo = nome do aluno
 * - manifest.json gerado automaticamente
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Student, ClassRoom } from './types';
import { getClasses, getStudentsByClass, clearManifestCache } from './utils/manifestService';
import Layout from './components/Layout';
import Carometro from './components/Carometro';
import StudentInfoPanel from './components/StudentInfoPanel';

const App: React.FC = () => {
  // ============================================
  // ESTADO DA APLICAÇÃO
  // ============================================
  
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // ============================================
  // CARREGAMENTO INICIAL
  // ============================================

  /**
   * Carrega as turmas do manifest na inicialização.
   */
  useEffect(() => {
    loadClasses();
  }, []);

  /**
   * Carrega os alunos quando a turma muda.
   */
  useEffect(() => {
    if (selectedClassId) {
      loadStudents(selectedClassId);
    }
  }, [selectedClassId]);

  /**
   * Busca as turmas do manifest.json.
   */
  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca os alunos de uma turma específica.
   */
  const loadStudents = async (classId: string) => {
    try {
      const data = await getStudentsByClass(classId);
      setStudents(data);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  // ============================================
  // HANDLERS
  // ============================================

  const handleSelectClass = useCallback((classId: string) => {
    setSelectedClassId(classId);
    setSelectedStudent(null);
  }, []);

  const handleSelectStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const handleCloseStudentInfo = useCallback(() => {
    setSelectedStudent(null);
  }, []);

  const handleRefresh = useCallback(async () => {
    clearManifestCache();
    await loadClasses();
    if (selectedClassId) {
      await loadStudents(selectedClassId);
    }
  }, [selectedClassId]);

  // ============================================
  // RENDER
  // ============================================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando turmas...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout
      classes={classes}
      selectedClassId={selectedClassId}
      onSelectClass={handleSelectClass}
      onRefresh={handleRefresh}
    >
      {selectedClassId ? (
        <Carometro
          students={students}
          classId={selectedClassId}
          onSelectStudent={handleSelectStudent}
        />
      ) : (
        <WelcomeScreen totalClasses={classes.length} />
      )}

      {/* Painel de informações do aluno */}
      {selectedStudent && (
        <StudentInfoPanel
          student={selectedStudent}
          onClose={handleCloseStudentInfo}
        />
      )}
    </Layout>
  );
};

/**
 * Tela de boas-vindas quando nenhuma turma está selecionada.
 */
const WelcomeScreen: React.FC<{ totalClasses: number }> = ({ totalClasses }) => (
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
        Selecione uma turma no menu lateral para visualizar as fotos dos alunos.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="text-2xl mb-2">📸</div>
          <h3 className="font-semibold text-blue-800 text-sm">Visualizar</h3>
          <p className="text-xs text-blue-600 mt-1">
            Veja as fotos dos alunos organizadas por turma.
          </p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="text-2xl mb-2">📁</div>
          <h3 className="font-semibold text-green-800 text-sm">Organizar</h3>
          <p className="text-xs text-green-600 mt-1">
            Basta colocar as fotos nas pastas das turmas.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <div className="text-2xl mb-2">🔄</div>
          <h3 className="font-semibold text-purple-800 text-sm">Atualizar</h3>
          <p className="text-xs text-purple-600 mt-1">
            Rode o script para atualizar o carômetro.
          </p>
        </div>
      </div>

      {totalClasses === 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
          <p className="text-yellow-800 font-semibold mb-2">⚠️ Nenhuma turma encontrada</p>
          <p className="text-yellow-700 text-sm">
            Crie as pastas das turmas em <code className="bg-yellow-100 px-1 rounded">public/turmas/</code> e rode:
          </p>
          <code className="block mt-2 bg-yellow-100 text-yellow-900 px-3 py-2 rounded text-sm">
            node scripts/generate-manifest.js
          </code>
        </div>
      )}
    </div>
  </div>
);

export default App;
