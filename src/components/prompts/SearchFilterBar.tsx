import React from 'react';
import {
  Search,
  X,
  LayoutGrid,
  List,
  Star,
  RotateCcw,
} from 'lucide-react';
import type { PromptFilterState, SortOption, ViewMode } from '../../interfaces/filter.interface';
import type { AIModel, PromptCategory } from '../../interfaces/prompt.interface';

export interface SearchFilterBarProps {
  filterState: PromptFilterState;
  onFilterChange: (newState: Partial<PromptFilterState>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalCount: number;
}

const CATEGORIES: (PromptCategory | 'All')[] = [
  'All',
  'Coding',
  'Writing & Content',
  'Data & Analytics',
  'Productivity',
  'Marketing',
  'Creative & Design',
  'System / DevOps',
];

const MODELS: (AIModel | 'All')[] = [
  'All',
  'GPT-4o',
  'Claude 3.5 Sonnet',
  'Gemini 1.5 Pro',
  'DeepSeek V3',
  'Universal',
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'En Yeni Eklenenler' },
  { value: 'oldest', label: 'En Eski Eklenenler' },
  { value: 'title-asc', label: 'Başlık (A-Z)' },
  { value: 'title-desc', label: 'Başlık (Z-A)' },
  { value: 'favorites', label: 'Önce Favoriler' },
];

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalCount,
}) => {
  const isFiltered =
    filterState.searchQuery !== '' ||
    filterState.selectedCategory !== 'All' ||
    filterState.selectedModel !== 'All' ||
    filterState.onlyFavorites ||
    filterState.selectedTag !== null;

  return (
    <div className="space-y-3 mb-6">
      {/* Top Search & Action Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Başlık, etiket, şablon veya açıklamalarda ara..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              aria-label="Aramayı Temizle"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns & View Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Selector */}
          <select
            value={filterState.selectedCategory}
            onChange={(e) =>
              onFilterChange({ selectedCategory: e.target.value as PromptCategory | 'All' })
            }
            className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900 text-slate-100">
                {cat === 'All' ? 'Tüm Kategoriler' : cat}
              </option>
            ))}
          </select>

          {/* Model Selector */}
          <select
            value={filterState.selectedModel}
            onChange={(e) =>
              onFilterChange({ selectedModel: e.target.value as AIModel | 'All' })
            }
            className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {MODELS.map((model) => (
              <option key={model} value={model} className="bg-slate-900 text-slate-100">
                {model === 'All' ? 'Tüm Modeller' : model}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={filterState.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
            className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
                {opt.label}
              </option>
            ))}
          </select>

          {/* Favorites Only Toggle */}
          <button
            onClick={() => onFilterChange({ onlyFavorites: !filterState.onlyFavorites })}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              filterState.onlyFavorites
                ? 'bg-amber-400/15 border-amber-400/30 text-amber-300 shadow-sm shadow-amber-400/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterState.onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Favoriler</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900/80 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => onFilterChange({ viewMode: 'grid' as ViewMode })}
              title="Kart Görünümü"
              aria-label="Kart Görünümü"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                filterState.viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onFilterChange({ viewMode: 'table' as ViewMode })}
              title="Tablo Görünümü"
              aria-label="Tablo Görünümü"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                filterState.viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Stats & Reset Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span>
            Toplam <strong className="text-slate-200">{totalCount}</strong> prompt arasından{' '}
            <strong className="text-indigo-400">{totalFiltered}</strong> kayıt listeleniyor.
          </span>
          {filterState.selectedTag && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 text-[11px] font-mono">
              #{filterState.selectedTag}
              <X
                className="w-3 h-3 cursor-pointer hover:text-white"
                onClick={() => onFilterChange({ selectedTag: null })}
              />
            </span>
          )}
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors text-xs cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Filtreleri Temizle</span>
          </button>
        )}
      </div>
    </div>
  );
};
