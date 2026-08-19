import { useState, useEffect, useMemo, useCallback } from 'react';
import type { AIPrompt, AIPromptFormData } from '../interfaces/prompt.interface';
import type { PromptFilterState } from '../interfaces/filter.interface';
import { PromptService } from '../services/promptService';
import { calculateDashboardStats } from '../utils/helpers';

const DEFAULT_FILTER_STATE: PromptFilterState = {
  searchQuery: '',
  selectedCategory: 'All',
  selectedModel: 'All',
  onlyFavorites: false,
  sortBy: 'newest',
  selectedTag: null,
  viewMode: 'grid',
};

export function usePrompts() {
  const [prompts, setPrompts] = useState<AIPrompt[]>(() => PromptService.getAll());
  const [filterState, setFilterState] = useState<PromptFilterState>(DEFAULT_FILTER_STATE);
  const [_isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state if LocalStorage updates externally (e.g. multi-tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'prompt_studio_ai_data_v1' && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          if (Array.isArray(updated)) {
            setPrompts(updated);
          }
        } catch {
          // ignore error
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // CRUD: CREATE
  const createPrompt = useCallback((formData: AIPromptFormData): AIPrompt => {
    setIsLoading(true);
    const created = PromptService.create(formData);
    setPrompts(PromptService.getAll());
    setIsLoading(false);
    return created;
  }, []);

  // CRUD: UPDATE
  const updatePrompt = useCallback((id: string, formData: Partial<AIPromptFormData>): AIPrompt | null => {
    setIsLoading(true);
    const updated = PromptService.update(id, formData);
    if (updated) {
      setPrompts(PromptService.getAll());
    }
    setIsLoading(false);
    return updated;
  }, []);

  // CRUD: DELETE
  const deletePrompt = useCallback((id: string): boolean => {
    setIsLoading(true);
    const success = PromptService.delete(id);
    if (success) {
      setPrompts(PromptService.getAll());
    }
    setIsLoading(false);
    return success;
  }, []);

  // TOGGLE FAVORITE
  const toggleFavorite = useCallback((id: string) => {
    const updated = PromptService.toggleFavorite(id);
    if (updated) {
      setPrompts(PromptService.getAll());
    }
  }, []);

  // INCREMENT USAGE
  const incrementUsage = useCallback((id: string) => {
    PromptService.incrementUsage(id);
    setPrompts(PromptService.getAll());
  }, []);

  // RESET SEED DATA
  const resetToSeedData = useCallback(() => {
    setIsLoading(true);
    const initial = PromptService.resetToDefault();
    setPrompts(initial);
    setFilterState(DEFAULT_FILTER_STATE);
    setIsLoading(false);
  }, []);

  // FILTER & SORT LOGIC
  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      // Search query in title, description, template, or tags
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesTitle = prompt.title.toLowerCase().includes(query);
        const matchesDesc = prompt.description.toLowerCase().includes(query);
        const matchesTemplate = prompt.promptTemplate.toLowerCase().includes(query);
        const matchesTags = prompt.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTemplate && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (filterState.selectedCategory !== 'All' && prompt.category !== filterState.selectedCategory) {
        return false;
      }

      // Model filter
      if (filterState.selectedModel !== 'All' && prompt.targetModel !== filterState.selectedModel) {
        return false;
      }

      // Favorites only
      if (filterState.onlyFavorites && !prompt.isFavorite) {
        return false;
      }

      // Specific tag filter
      if (filterState.selectedTag && !prompt.tags.includes(filterState.selectedTag.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title, 'tr');
        case 'title-desc':
          return b.title.localeCompare(a.title, 'tr');
        case 'most-used':
          return (b.usageCount || 0) - (a.usageCount || 0);
        case 'favorites':
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [prompts, filterState]);

  // ALL UNIQUE TAGS
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    prompts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [prompts]);

  // DASHBOARD STATS
  const stats = useMemo(() => calculateDashboardStats(prompts), [prompts]);

  return {
    prompts,
    filteredPrompts,
    filterState,
    setFilterState,
    allTags,
    stats,
    isLoading: _isLoading,
    createPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage,
    resetToSeedData,
  };
}
