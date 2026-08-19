import React, { useState } from 'react';
import {
  Star,
  Copy,
  Check,
  Edit3,
  Trash2,
  Eye,
  Play,
  Layers,
} from 'lucide-react';
import type { AIPrompt } from '../../interfaces/prompt.interface';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatShortDate, copyToClipboard, extractTemplateVariables } from '../../utils/helpers';

export interface PromptTableProps {
  prompts: AIPrompt[];
  onView: (prompt: AIPrompt) => void;
  onEdit: (prompt: AIPrompt) => void;
  onDelete: (prompt: AIPrompt) => void;
  onTest: (prompt: AIPrompt) => void;
  onToggleFavorite: (id: string) => void;
  onCopySuccess: () => void;
}

export const PromptTable: React.FC<PromptTableProps> = ({
  prompts,
  onView,
  onEdit,
  onDelete,
  onTest,
  onToggleFavorite,
  onCopySuccess,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: AIPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await copyToClipboard(prompt.promptTemplate);
    if (success) {
      setCopiedId(prompt.id);
      onCopySuccess();
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-950/80 text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
          <tr>
            <th scope="col" className="px-4 py-3.5 w-10 text-center">
              Fav
            </th>
            <th scope="col" className="px-4 py-3.5">
              Başlık & Açıklama
            </th>
            <th scope="col" className="px-4 py-3.5">
              Kategori
            </th>
            <th scope="col" className="px-4 py-3.5">
              Model
            </th>
            <th scope="col" className="px-4 py-3.5">
              Değişkenler
            </th>
            <th scope="col" className="px-4 py-3.5 text-center">
              Temp
            </th>
            <th scope="col" className="px-4 py-3.5">
              Tarih
            </th>
            <th scope="col" className="px-4 py-3.5 text-right">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {prompts.map((prompt) => {
            const vars = extractTemplateVariables(prompt.promptTemplate);
            const isCopied = copiedId === prompt.id;

            return (
              <tr
                key={prompt.id}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onView(prompt)}
              >
                {/* Favorite */}
                <td
                  className="px-4 py-3.5 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(prompt.id);
                  }}
                >
                  <button
                    aria-label={prompt.isFavorite ? 'Favoriden Çıkar' : 'Favoriye Ekle'}
                    className="cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        prompt.isFavorite
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    />
                  </button>
                </td>

                {/* Title & Description */}
                <td className="px-4 py-3.5 max-w-xs sm:max-w-md">
                  <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {prompt.title}
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {prompt.description}
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge variant="category" category={prompt.category} size="sm">
                    {prompt.category}
                  </Badge>
                </td>

                {/* Target Model */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <Badge variant="model" model={prompt.targetModel} size="sm">
                    {prompt.targetModel}
                  </Badge>
                </td>

                {/* Variables */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {vars.length > 0 ? (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 inline-flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {vars.length} Değişken
                    </span>
                  ) : (
                    <span className="text-xs text-slate-600 font-mono">—</span>
                  )}
                </td>

                {/* Temperature */}
                <td className="px-4 py-3.5 text-center font-mono text-xs text-slate-400">
                  {prompt.temperature.toFixed(1)}
                </td>

                {/* Date */}
                <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-400 font-mono">
                  {formatShortDate(prompt.createdAt)}
                </td>

                {/* Actions */}
                <td
                  className="px-4 py-3.5 text-right whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={(e) => handleCopy(prompt, e)}
                      leftIcon={
                        isCopied ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )
                      }
                      title="Kopyala"
                    >
                      {isCopied ? 'Kopyalandı' : 'Kopyala'}
                    </Button>

                    {vars.length > 0 && (
                      <button
                        onClick={() => onTest(prompt)}
                        title="Değişkenleri Doldur"
                        className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => onView(prompt)}
                      title="Detayları İncele"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onEdit(prompt)}
                      title="Düzenle"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDelete(prompt)}
                      title="Sil"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
