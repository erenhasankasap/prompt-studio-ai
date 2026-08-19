import React from 'react';
import type { DashboardStats } from '../../interfaces/stats.interface';
import type { PromptCategory } from '../../interfaces/prompt.interface';
import { getCategoryBadgeColor, getModelBadgeColor } from '../../utils/helpers';
import { Layers, Cpu } from 'lucide-react';

export interface CategoryDistributionProps {
  stats: DashboardStats;
  onSelectCategory?: (category: PromptCategory) => void;
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  stats,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-6">
      {/* Category Breakdown */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Kategori Dağılımı
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Kütüphanedeki şablonların kategorilere göre oranı
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {stats.categoryDistribution.map((item) => {
            const badgeColor = getCategoryBadgeColor(item.category);

            return (
              <div
                key={item.category}
                className="space-y-1.5 cursor-pointer group"
                onClick={() => onSelectCategory && onSelectCategory(item.category)}
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-md border font-medium font-mono text-[11px] ${badgeColor} transition-transform group-hover:scale-105`}
                  >
                    {item.category}
                  </span>
                  <span className="font-mono text-slate-400 text-xs">
                    <strong className="text-white">{item.count}</strong> şablon ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 group-hover:from-indigo-400 group-hover:to-purple-400"
                    style={{ width: `${Math.max(item.percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Breakdown */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Model Uyumluluğu
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hedeflenen yapay zeka modelleri
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {stats.modelDistribution.map((item) => {
            const badgeColor = getModelBadgeColor(item.model);

            return (
              <div key={item.model} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-md border font-medium font-mono text-[11px] ${badgeColor}`}
                  >
                    {item.model}
                  </span>
                  <span className="font-mono text-slate-400 text-xs">
                    <strong className="text-white">{item.count}</strong> şablon ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(item.percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

