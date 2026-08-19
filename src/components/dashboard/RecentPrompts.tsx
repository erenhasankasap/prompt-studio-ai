import React, { useState } from 'react';
import type { AIPrompt } from '../../interfaces/prompt.interface';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatShortDate, copyToClipboard, extractTemplateVariables } from '../../utils/helpers';
import { Sparkles, ArrowRight, Play, Eye, Copy, Check, Layers, Calendar } from 'lucide-react';

export interface RecentPromptsProps {
  prompts: AIPrompt[];
  onView: (prompt: AIPrompt) => void;
  onTest: (prompt: AIPrompt) => void;
  onNavigateToPrompts: () => void;
}

export const RecentPrompts: React.FC<RecentPromptsProps> = ({
  prompts,
  onView,
  onTest,
  onNavigateToPrompts,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sort by newest updated or created
  const recentList = [...prompts]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
    .slice(0, 5);

  const handleCopy = async (prompt: AIPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(prompt.promptTemplate);
    if (success) {
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-md flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Son Eklenen ve Güncellenen Şablonlar
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Kütüphanenizdeki en güncel yapay zeka prompt şablonları
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
            {recentList.length} / {prompts.length} Şablon
          </span>
        </div>

        <div className="space-y-3">
          {recentList.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">
              Henüz kütüphanede kayıtlı prompt şablonu bulunmuyor.
            </p>
          ) : (
            recentList.map((prompt) => {
              const vars = extractTemplateVariables(prompt.promptTemplate);
              const isCopied = copiedId === prompt.id;

              return (
                <div
                  key={prompt.id}
                  onClick={() => onView(prompt)}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <Badge variant="category" category={prompt.category} size="sm">
                        {prompt.category}
                      </Badge>
                      <Badge variant="model" model={prompt.targetModel} size="sm">
                        {prompt.targetModel}
                      </Badge>
                      {vars.length > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                          <Layers className="w-2.5 h-2.5" />
                          {vars.length} Değişken
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {prompt.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {prompt.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatShortDate(prompt.updatedAt || prompt.createdAt)}
                    </span>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleCopy(prompt, e)}
                        title="Şablonu Kopyala"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onTest(prompt)}
                        title="Değişkenleri Doldur ve Test Et"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onView(prompt)}
                        title="Detayları İncele"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateToPrompts}
          className="w-full text-indigo-400 hover:text-indigo-300 justify-between"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Kütüphanedeki Tüm Promptları Görüntüle ({prompts.length})
        </Button>
      </div>
    </div>
  );
};

