import React from 'react';
import type { AIPrompt } from '../../interfaces/prompt.interface';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle } from 'lucide-react';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  prompt: AIPrompt | null;
  isLoading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  prompt,
  isLoading = false,
}) => {
  if (!prompt) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Promptu Sil"
      maxWidth="md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            Bu işlem geri alınamaz. Seçili prompt veritabanınızdan ve yerel depolamadan kalıcı olarak kaldırılacaktır.
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <p className="text-xs text-slate-400">Silinecek Prompt:</p>
          <p className="text-sm font-semibold text-white mt-0.5 line-clamp-2">
            {prompt.title}
          </p>
          <span className="inline-block mt-2 text-[11px] font-mono text-slate-500">
            Kategori: {prompt.category} • Model: {prompt.targetModel}
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Vazgeç
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Evet, Sil
          </Button>
        </div>
      </div>
    </Modal>
  );
};
