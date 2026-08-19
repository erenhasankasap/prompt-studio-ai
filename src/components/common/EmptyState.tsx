import React from 'react';
import { Sparkles, PlusCircle } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Kayıt Bulunamadı',
  description = 'Arama kriterlerinize uygun hiçbir prompt veya şablon bulunamadı. Yeni bir tane ekleyebilir veya filtreleri temizleyebilirsiniz.',
  actionText = 'Yeni Prompt Ekle',
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 backdrop-blur-sm my-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
        {icon || <Sparkles className="w-8 h-8 animate-pulse" />}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};
