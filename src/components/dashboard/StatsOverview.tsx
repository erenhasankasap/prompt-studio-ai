import React from 'react';
import type { DashboardStats } from '../../interfaces/stats.interface';
import { Sparkles, FolderTree, Cpu, Layers } from 'lucide-react';

export interface StatsOverviewProps {
  stats: DashboardStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Toplam Prompt Şablonu',
      value: stats.totalPrompts,
      subtext: 'Kütüphanede kayıtlı',
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      bgGradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'border-indigo-500/20',
      iconBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    },
    {
      title: 'Kategori Çeşitliliği',
      value: stats.categoriesCount,
      subtext: 'Aktif kullanım alanı',
      icon: <FolderTree className="w-5 h-5 text-purple-400" />,
      bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
      borderColor: 'border-purple-500/20',
      iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    },
    {
      title: 'Hedef AI Modelleri',
      value: stats.modelsCount,
      subtext: 'Claude, GPT-4o, Gemini...',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      bgGradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
      borderColor: 'border-cyan-500/20',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'Dinamik Şablonlar',
      value: stats.variableTemplatesCount,
      subtext: 'Özelleştirilebilir parametreli',
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      borderColor: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl border ${card.borderColor} bg-slate-900/60 bg-gradient-to-br ${card.bgGradient} p-5 backdrop-blur-md transition-all duration-300 hover:shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {card.title}
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${card.iconBg}`}
            >
              {card.icon}
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              {card.value}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">{card.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

