/**
 * ============================================
 * CARÔMETRO - Grid Principal de Fotos
 * ============================================
 * Componente principal que exibe o grid de fotos
 * dos alunos da turma selecionada.
 * Inclui funcionalidade de drag-and-drop para
 * reordenar os alunos.
 */

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Student, ClassRoom } from '../types';
import { getStudentsByClass, getClassById, reorderStudents } from '../utils/storage';
import StudentCard from './StudentCard';

interface CarometroProps {
  selectedClassId: string;
  onEditStudent: (student: Student) => void;
  onRemoveStudent: (student: Student) => void;
  onTransferStudent: (student: Student) => void;
}

/**
 * Componente wrapper que torna o card "sorteável" (arrastável).
 * Usa o hook useSortable do @dnd-kit.
 */
const SortableStudentCard: React.FC<{
  student: Student;
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
  onTransfer: (student: Student) => void;
}> = ({ student, onEdit, onRemove, onTransfer }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: student.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <StudentCard
        student={student}
        onEdit={onEdit}
        onRemove={onRemove}
        onTransfer={onTransfer}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

const Carometro: React.FC<CarometroProps> = ({
  selectedClassId,
  onEditStudent,
  onRemoveStudent,
  onTransferStudent,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentClass, setCurrentClass] = useState<ClassRoom | null>(null);

  // Configura os sensores de drag (mouse + teclado)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // 8px de movimento para iniciar drag
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Carrega os dados quando a turma selecionada muda
  useEffect(() => {
    loadStudents();
  }, [selectedClassId]);

  /**
   * Carrega os alunos da turma selecionada.
   */
  const loadStudents = () => {
    const classData = getClassById(selectedClassId);
    setCurrentClass(classData || null);
    const classStudents = getStudentsByClass(selectedClassId);
    setStudents(classStudents);
  };

  /**
   * Handler para quando o drag termina.
   * Atualiza a ordem no estado local e persiste no storage.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setStudents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Persiste a nova ordem no storage
        reorderStudents(selectedClassId, newOrder.map((s) => s.id));
        
        return newOrder;
      });
    }
  };

  // Se não há turma selecionada
  if (!currentClass) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">👈</div>
          <h2 className="text-xl font-semibold text-gray-600">
            Selecione uma turma
          </h2>
          <p className="text-gray-400 mt-2">
            Escolha uma turma no menu lateral para visualizar o carômetro.
          </p>
        </div>
      </div>
    );
  }

  // Se a turma não tem alunos
  if (students.length === 0) {
    return (
      <div>
        <ClassHeader currentClass={currentClass} studentCount={0} />
        <div className="flex items-center justify-center h-64 mt-8">
          <div className="text-center">
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-lg font-semibold text-gray-600">
              Nenhum aluno cadastrado
            </h3>
            <p className="text-gray-400 mt-2">
              Clique em "Cadastrar Aluno" para adicionar alunos a esta turma.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Cabeçalho com info da turma */}
      <ClassHeader currentClass={currentClass} studentCount={students.length} />

      {/* Instrução de drag */}
      <div className="mt-4 mb-6 flex items-center gap-2 text-sm text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>Dica:</strong> Arraste os cards para reordenar os alunos no carômetro.
        </span>
      </div>

      {/* Grid de alunos com drag-and-drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={students.map((s) => s.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {students.map((student) => (
              <SortableStudentCard
                key={student.id}
                student={student}
                onEdit={onEditStudent}
                onRemove={onRemoveStudent}
                onTransfer={onTransferStudent}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

/**
 * Componente do cabeçalho da turma.
 */
const ClassHeader: React.FC<{ currentClass: ClassRoom; studentCount: number }> = ({
  currentClass,
  studentCount,
}) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        {currentClass.name}
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Turno: {currentClass.shift} • {studentCount} {studentCount === 1 ? 'aluno' : 'alunos'}
      </p>
    </div>
    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
      </svg>
      Arraste para reordenar
    </div>
  </div>
);

export default Carometro;
