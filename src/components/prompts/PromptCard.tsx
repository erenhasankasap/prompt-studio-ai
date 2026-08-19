import React, { useState } from 'react';
import {
  Star,
  Copy,
  Check,
  Play,
  Edit3,
  Trash2,
  Eye,
  Thermometer,
  Calendar,
  Layers,
} from 'lucide-react';
import type { AIPrompt } from '../../interfaces/prompt.interface';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatShortDate, copyToClipboard, extractTemplateVariables } from '../../utils/helpers';

export interface PromptCardProps {
  prompt: AIPrompt;
  onView: (prompt: AIPrompt) => void;
  onEdit: (prompt: AIPrompt) => void;
  onDelete: (prompt: AIPrompt) => void;
  onTest: (prompt: AIPrompt) => void;
  onToggleFavorite: (id: string) => void;
  onCopySuccess: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onView,
  onEdit,
  onDelete,
  onTest,
  onToggleFavorite,
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const variables = extractTemplateVariables(prompt.promptTemplate);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(prompt.promptTemplate);
    if (success) {
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/5">
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="category" category={prompt.category} size="sm">
              {prompt.category}
            </Badge>
            <Badge variant="model" model={prompt.targetModel} size="sm">
              {prompt.targetModel}
            </Badge>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={() => onToggleFavorite(prompt.id)}
            aria-label={prompt.isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              prompt.isFavorite
                ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/80'
            }`}
          >
            <Star className={`w-4 h-4 ${prompt.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onView(prompt)}
          className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-indigo-300 transition-colors cursor-pointer mb-2"
          title={prompt.title}
        >
          {prompt.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {prompt.description}
        </p>

        {/* Template Preview Snippet */}
        <div
          onClick={() => onView(prompt)}
          className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-slate-300 line-clamp-3 mb-4 cursor-pointer hover:border-slate-700 transition-colors relative group/snippet"
        >
          <pre className="whitespace-pre-wrap font-sans text-slate-300 text-xs">
            {prompt.promptTemplate}
          </pre>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none rounded-xl" />
        </div>

        {/* Tags & Variables Indicator */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/40"
            >
              #{tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-500">
              +{prompt.tags.length - 3}
            </span>
          )}
          {variables.length > 0 && (
            <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {variables.length} Değişken
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Info & Action Bar */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatShortDate(prompt.createdAt)}
          </span>
          <span className="flex items-center gap-1" title={`Temperature: ${prompt.temperature}`}>
            <Thermometer className="w-3 h-3 text-indigo-400" />
            Temp: {prompt.temperature.toFixed(1)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="xs"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              title="Şablonu Kopyala"
            >
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </Button>

            {variables.length > 0 && (
              <Button
                variant="glass"
                size="xs"
                onClick={() => onTest(prompt)}
                leftIcon={<Play className="w-3 h-3 text-indigo-400 fill-indigo-400/20" />}
                title="Değişkenleri Doldur & Test Et"
              >
                Doldur
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onView(prompt)}
              aria-label="Detayları Görüntüle"
              title="Detayları İncele"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onEdit(prompt)}
              aria-label="Düzenle"
              title="Düzenle"
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(prompt)}
              aria-label="Sil"
              title="Sil"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
