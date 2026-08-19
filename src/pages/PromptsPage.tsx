import React from 'react';
import type { AIPrompt } from '../interfaces/prompt.interface';
import type { PromptFilterState } from '../interfaces/filter.interface';
import { SearchFilterBar } from '../components/prompts/SearchFilterBar';
import { PromptCard } from '../components/prompts/PromptCard';
import { PromptTable } from '../components/prompts/PromptTable';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Plus, Library } from 'lucide-react';

export interface PromptsPageProps {
  prompts: AIPrompt[];
  filteredPrompts: AIPrompt[];
  filterState: PromptFilterState;
  onFilterChange: (newState: Partial<PromptFilterState>) => void;
  onResetFilters: () => void;
  onOpenCreateModal: () => void;
  onViewPrompt: (prompt: AIPrompt) => void;
  onEditPrompt: (prompt: AIPrompt) => void;
  onDeletePrompt: (prompt: AIPrompt) => void;
  onTestPrompt: (prompt: AIPrompt) => void;
  onToggleFavorite: (id: string) => void;
  onCopySuccess: () => void;
}

export const PromptsPage: React.FC<PromptsPageProps> = ({
  prompts,
  filteredPrompts,
  filterState,
  onFilterChange,
  onResetFilters,
  onOpenCreateModal,
  onViewPrompt,
  onEditPrompt,
  onDeletePrompt,
  onTestPrompt,
  onToggleFavorite,
  onCopySuccess,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Library className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Prompt Kütüphanesi
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kayıtlı yapay zeka prompt şablonlarınızı filtreleyin, düzenleyin veya yeni şablonlar oluşturun.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onOpenCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto"
        >
          Yeni Prompt Ekle
        </Button>
      </div>

      {/* Search & Filter Controls */}
      <SearchFilterBar
        filterState={filterState}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalFiltered={filteredPrompts.length}
        totalCount={prompts.length}
      />

      {/* Content: Grid or Table View or Empty State */}
      {filteredPrompts.length === 0 ? (
        <EmptyState
          title={
            prompts.length === 0
              ? 'Henüz Hiç Prompt Eklenmedi'
              : 'Filtrelere Uygun Prompt Bulunamadı'
          }
          description={
            prompts.length === 0
              ? 'Yapay zeka modelleriniz için ilk prompt şablonunu oluşturarak hemen başlayabilirsiniz.'
              : 'Arama sorgunuzu değiştirin veya aktif filtreleri sıfırlamayı deneyin.'
          }
          actionText={
            prompts.length === 0 ? 'İlk Promptu Ekle' : 'Filtreleri Sıfırla'
          }
          onAction={
            prompts.length === 0 ? onOpenCreateModal : onResetFilters
          }
        />
      ) : filterState.viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onView={onViewPrompt}
              onEdit={onEditPrompt}
              onDelete={onDeletePrompt}
              onTest={onTestPrompt}
              onToggleFavorite={onToggleFavorite}
              onCopySuccess={onCopySuccess}
            />
          ))}
        </div>
      ) : (
        <PromptTable
          prompts={filteredPrompts}
          onView={onViewPrompt}
          onEdit={onEditPrompt}
          onDelete={onDeletePrompt}
          onTest={onTestPrompt}
          onToggleFavorite={onToggleFavorite}
          onCopySuccess={onCopySuccess}
        />
      )}
    </div>
  );
};
