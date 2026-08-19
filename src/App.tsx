import { useState } from 'react';
import { usePrompts } from './hooks/usePrompts';
import { useToast } from './hooks/useToast';
import type { AIPrompt, AIPromptFormData, PromptCategory } from './interfaces/prompt.interface';
import { Navbar, type NavTab } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { DashboardPage } from './pages/DashboardPage';
import { PromptsPage } from './pages/PromptsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AboutPage } from './pages/AboutPage';
import { PromptFormModal } from './components/prompts/PromptFormModal';
import { PromptDetailModal } from './components/prompts/PromptDetailModal';
import { PromptTestModal } from './components/prompts/PromptTestModal';
import { DeleteConfirmModal } from './components/prompts/DeleteConfirmModal';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  // Prompts & LocalStorage Hook
  const {
    prompts,
    filteredPrompts,
    filterState,
    setFilterState,
    stats,
    createPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage,
    resetToSeedData,
  } = usePrompts();

  // Toast Notifications Hook
  const {
    toasts,
    removeToast,
    toastSuccess,
    toastError,
    toastInfo,
  } = useToast();

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingPrompt, setEditingPrompt] = useState<AIPrompt | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [viewingPrompt, setViewingPrompt] = useState<AIPrompt | null>(null);

  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);
  const [testingPrompt, setTestingPrompt] = useState<AIPrompt | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletingPrompt, setDeletingPrompt] = useState<AIPrompt | null>(null);

  // Handlers for Modals
  const handleOpenCreate = () => {
    setEditingPrompt(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (prompt: AIPrompt) => {
    setEditingPrompt(prompt);
    setIsFormModalOpen(true);
  };

  const handleOpenDetail = (prompt: AIPrompt) => {
    setViewingPrompt(prompt);
    setIsDetailModalOpen(true);
  };

  const handleOpenTest = (prompt: AIPrompt) => {
    setTestingPrompt(prompt);
    setIsTestModalOpen(true);
  };

  const handleOpenDelete = (prompt: AIPrompt) => {
    setDeletingPrompt(prompt);
    setIsDeleteModalOpen(true);
  };

  // CRUD Form Submit (Create or Update)
  const handleFormSubmit = (data: AIPromptFormData, editId?: string) => {
    if (editId) {
      const updated = updatePrompt(editId, data);
      if (updated) {
        toastSuccess('Prompt Güncellendi', `"${data.title}" başarıyla güncellendi.`);
        // If updating currently viewed prompt, update view state too
        if (viewingPrompt && viewingPrompt.id === editId) {
          setViewingPrompt(updated);
        }
      } else {
        toastError('Güncelleme Başarısız', 'Prompt güncellenirken bir sorun oluştu.');
      }
    } else {
      const created = createPrompt(data);
      toastSuccess('Yeni Prompt Eklendi', `"${created.title}" kütüphanenize kaydedildi.`);
    }
  };

  // CRUD Delete Confirm
  const handleDeleteConfirm = () => {
    if (!deletingPrompt) return;
    const title = deletingPrompt.title;
    const success = deletePrompt(deletingPrompt.id);
    if (success) {
      toastSuccess('Prompt Silindi', `"${title}" kalıcı olarak kaldırıldı.`);
      if (viewingPrompt && viewingPrompt.id === deletingPrompt.id) {
        setIsDetailModalOpen(false);
      }
    } else {
      toastError('Silme Hatası', 'Prompt silinirken bir sorun oluştu.');
    }
    setIsDeleteModalOpen(false);
    setDeletingPrompt(null);
  };

  // Favorite toggle feedback
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    const item = prompts.find((p) => p.id === id);
    if (item) {
      if (!item.isFavorite) {
        toastSuccess('Favorilere Eklendi', `"${item.title}" favorilerinize eklendi.`);
      } else {
        toastInfo('Favorilerden Çıkarıldı', `"${item.title}" favorilerden kaldırıldı.`);
      }
    }
  };

  // Reset Data to Seed Defaults
  const handleResetData = () => {
    if (window.confirm('Tüm verileri varsayılan örnek prompt şablonlarına sıfırlamak istediğinize emin misiniz?')) {
      resetToSeedData();
      toastInfo('Veriler Sıfırlandı', 'Varsayılan örnek prompt verileri yüklendi.');
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      selectedCategory: 'All',
      selectedModel: 'All',
      onlyFavorites: false,
      sortBy: 'newest',
      selectedTag: null,
      viewMode: filterState.viewMode,
    });
  };

  // Category filter from dashboard click
  const handleSelectCategoryFilter = (category: PromptCategory) => {
    setFilterState((prev) => ({
      ...prev,
      selectedCategory: category,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenCreateModal={handleOpenCreate}
        onResetData={handleResetData}
        totalCount={prompts.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'dashboard' && (
          <DashboardPage
            prompts={prompts}
            stats={stats}
            onOpenCreateModal={handleOpenCreate}
            onViewPrompt={handleOpenDetail}
            onTestPrompt={handleOpenTest}
            onNavigateToPrompts={() => setCurrentTab('prompts')}
            onNavigateToPlayground={() => setCurrentTab('playground')}
            onSelectCategoryFilter={handleSelectCategoryFilter}
          />
        )}

        {currentTab === 'prompts' && (
          <PromptsPage
            prompts={prompts}
            filteredPrompts={filteredPrompts}
            filterState={filterState}
            onFilterChange={(newFilters) =>
              setFilterState((prev) => ({ ...prev, ...newFilters }))
            }
            onResetFilters={handleResetFilters}
            onOpenCreateModal={handleOpenCreate}
            onViewPrompt={handleOpenDetail}
            onEditPrompt={handleOpenEdit}
            onDeletePrompt={handleOpenDelete}
            onTestPrompt={handleOpenTest}
            onToggleFavorite={handleToggleFavorite}
            onCopySuccess={() => toastSuccess('Kopyalandı', 'Prompt panoya kopyalandı.')}
          />
        )}

        {currentTab === 'playground' && (
          <PlaygroundPage
            prompts={prompts}
            onIncrementUsage={incrementUsage}
            onCopySuccess={() => toastSuccess('Kopyalandı', 'Nihai prompt panoya kopyalandı.')}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigateToPrompts={() => setCurrentTab('prompts')} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Container */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Create / Edit Form Modal */}
      <PromptFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingPrompt(null);
        }}
        onSubmit={handleFormSubmit}
        editingPrompt={editingPrompt}
      />

      {/* Detail Inspection Modal */}
      <PromptDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setViewingPrompt(null);
        }}
        prompt={viewingPrompt}
        onEdit={handleOpenEdit}
        onTest={handleOpenTest}
        onToggleFavorite={handleToggleFavorite}
        onCopySuccess={() => toastSuccess('Kopyalandı', 'Panoya kopyalandı.')}
      />

      {/* Test / Variable Playground Modal */}
      <PromptTestModal
        isOpen={isTestModalOpen}
        onClose={() => {
          setIsTestModalOpen(false);
          setTestingPrompt(null);
        }}
        prompt={testingPrompt}
        onIncrementUsage={incrementUsage}
        onCopySuccess={() => toastSuccess('Kopyalandı', 'Nihai prompt panoya kopyalandı.')}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingPrompt(null);
        }}
        onConfirm={handleDeleteConfirm}
        prompt={deletingPrompt}
      />
    </div>
  );
}

export default App;
