import React from 'react';
import type { AIPrompt, PromptCategory } from '../interfaces/prompt.interface';
import type { DashboardStats } from '../interfaces/stats.interface';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { CategoryDistribution } from '../components/dashboard/CategoryDistribution';
import { RecentPrompts } from '../components/dashboard/RecentPrompts';
import { Button } from '../components/common/Button';
import { Sparkles, Plus, Library, Terminal } from 'lucide-react';

export interface DashboardPageProps {
  prompts: AIPrompt[];
  stats: DashboardStats;
  onOpenCreateModal: () => void;
  onViewPrompt: (prompt: AIPrompt) => void;
  onTestPrompt: (prompt: AIPrompt) => void;
  onNavigateToPrompts: () => void;
  onNavigateToPlayground: () => void;
  onSelectCategoryFilter: (category: PromptCategory) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  prompts,
  stats,
  onOpenCreateModal,
  onViewPrompt,
  onTestPrompt,
  onNavigateToPrompts,
  onNavigateToPlayground,
  onSelectCategoryFilter,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-10 shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Prompt & Şablon Yönetim Merkezi</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Yapay Zeka Promptlarınızı <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Tek Bir Yerden Yönetin ve Test Edin
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
            Claude, GPT-4o, Gemini ve DeepSeek için hazırladığınız dinamik prompt şablonlarını kaydedin,
            etiketleyin, değişkenlerini doldurarak anında kopyalayın ve ekibinizle paylaşın.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button
              variant="primary"
              size="md"
              onClick={onOpenCreateModal}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Yeni Prompt Oluştur
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onNavigateToPrompts}
              leftIcon={<Library className="w-4 h-4 text-indigo-400" />}
            >
              Prompt Kütüphanesine Git
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={onNavigateToPlayground}
              leftIcon={<Terminal className="w-4 h-4 text-slate-400" />}
            >
              Test Alanını Aç
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Analytics & Recent Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CategoryDistribution
            stats={stats}
            onSelectCategory={(cat) => {
              onSelectCategoryFilter(cat);
              onNavigateToPrompts();
            }}
          />
        </div>

        <div className="lg:col-span-2">
          <RecentPrompts
            prompts={prompts}
            onView={onViewPrompt}
            onTest={onTestPrompt}
            onNavigateToPrompts={onNavigateToPrompts}
          />
        </div>
      </div>
    </div>
  );
};
