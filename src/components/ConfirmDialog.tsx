/**
 * ============================================
 * CONFIRM DIALOG - Diálogo de Confirmação
 * ============================================
 * Modal genérico de confirmação para ações
 * destrutivas (como remover um aluno).
 */

import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  // Define cores baseado na variante
  const variantStyles = {
    danger: {
      button: 'bg-red-600 hover:bg-red-700',
      icon: '🗑️',
    },
    warning: {
      button: 'bg-yellow-600 hover:bg-yellow-700',
      icon: '⚠️',
    },
    info: {
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'ℹ️',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        {/* Ícone */}
        <div className="text-center mb-4">
          <span className="text-4xl">{styles.icon}</span>
        </div>

        {/* Texto */}
        <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          {message}
        </p>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg font-medium transition-colors ${styles.button}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
