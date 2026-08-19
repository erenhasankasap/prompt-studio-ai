import React, { useState } from 'react';
import type { AIPrompt } from '../../interfaces/prompt.interface';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Copy,
  Check,
  Play,
  Edit3,
  Calendar,
  Layers,
  Thermometer,
  Eye,
  Star,
  Terminal,
} from 'lucide-react';
import {
  formatDate,
  copyToClipboard,
  extractTemplateVariables,
} from '../../utils/helpers';

export interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: AIPrompt | null;
  onEdit: (prompt: AIPrompt) => void;
  onTest: (prompt: AIPrompt) => void;
  onToggleFavorite: (id: string) => void;
  onCopySuccess: () => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  isOpen,
  onClose,
  prompt,
  onEdit,
  onTest,
  onToggleFavorite,
  onCopySuccess,
}) => {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedSystem, setCopiedSystem] = useState(false);

  if (!prompt) return null;

  const variables = extractTemplateVariables(prompt.promptTemplate);

  const handleCopyTemplate = async () => {
    const success = await copyToClipboard(prompt.promptTemplate);
    if (success) {
      setCopiedTemplate(true);
      onCopySuccess();
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  const handleCopySystem = async () => {
    if (!prompt.systemInstruction) return;
    const success = await copyToClipboard(prompt.systemInstruction);
    if (success) {
      setCopiedSystem(true);
      onCopySuccess();
      setTimeout(() => setCopiedSystem(false), 2000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={prompt.title}
      subtitle={prompt.description}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Meta badges & status */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="category" category={prompt.category} size="md">
              {prompt.category}
            </Badge>
            <Badge variant="model" model={prompt.targetModel} size="md">
              {prompt.targetModel}
            </Badge>
            <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              <Thermometer className="w-3.5 h-3.5 text-indigo-400" />
              Temp: {prompt.temperature.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(prompt.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                prompt.isFavorite
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${prompt.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{prompt.isFavorite ? 'Favori' : 'Favorilere Ekle'}</span>
            </button>
          </div>
        </div>

        {/* System Instruction (if exists) */}
        {prompt.systemInstruction && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                Sistem Rolü & Talimatı (System Instruction)
              </h4>
              <button
                onClick={handleCopySystem}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedSystem ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSystem ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono">
              {prompt.systemInstruction}
            </div>
          </div>
        )}

        {/* Prompt Template */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              Prompt Şablon İçeriği
            </h4>
            <button
              onClick={handleCopyTemplate}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              {copiedTemplate ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedTemplate ? 'Kopyalandı' : 'Şablonu Kopyala'}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap selection:bg-indigo-500/40">
            {prompt.promptTemplate}
          </div>
        </div>

        {/* Dynamic Variables & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Variables */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h5 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Şablon Değişkenleri ({variables.length})
            </h5>
            {variables.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {variables.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 text-xs font-mono"
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Bu şablonda dinamik değişken bulunmuyor.</p>
            )}
          </div>

          {/* Tags */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h5 className="text-xs font-bold text-slate-300 mb-2">Etiketler</h5>
            {prompt.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Etiket eklenmemiş.</p>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Oluşturulma: {formatDate(prompt.createdAt)}
          </span>
          <span>Son Güncelleme: {formatDate(prompt.updatedAt)}</span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose}>
            Kapat
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onEdit(prompt);
              }}
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            >
              Düzenle
            </Button>

            {variables.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onTest(prompt);
                }}
                leftIcon={<Play className="w-3.5 h-3.5" />}
              >
                Değişkenleri Doldur
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
