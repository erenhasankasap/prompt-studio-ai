import type { AIModel, PromptCategory } from './prompt.interface';

export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc' | 'most-used' | 'favorites';

export type ViewMode = 'grid' | 'table';

export interface PromptFilterState {
  searchQuery: string;
  selectedCategory: PromptCategory | 'All';
  selectedModel: AIModel | 'All';
  onlyFavorites: boolean;
  sortBy: SortOption;
  selectedTag: string | null;
  viewMode: ViewMode;
}
