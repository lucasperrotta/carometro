/**
 * ============================================
 * LAYOUT - Componente de Layout Principal
 * ============================================
 * Estrutura base da aplicação com sidebar e
 * área de conteúdo principal.
 * 
 * Recebe as props necessárias para a sidebar
 * e as repassa ao componente Sidebar.
 */

import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  selectedClassId: string | null;
  onSelectClass: (classId: string) => void;
  onAddStudent: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  selectedClassId,
  onSelectClass,
  onAddStudent,
}) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar com navegação das turmas */}
      <Sidebar
        selectedClassId={selectedClassId}
        onSelectClass={onSelectClass}
        onAddStudent={onAddStudent}
      />
      
      {/* Área principal de conteúdo */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
