import React, { useState, useEffect } from 'react';
import type {
  AIPrompt,
  AIPromptFormData,
  AIModel,
  PromptCategory,
  FormValidationErrors,
} from '../../interfaces/prompt.interface';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PromptService } from '../../services/promptService';
import { extractTemplateVariables } from '../../utils/helpers';
import { Layers, Plus, X, Thermometer, Star } from 'lucide-react';

export interface PromptFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AIPromptFormData, editId?: string) => void;
  editingPrompt?: AIPrompt | null;
}

const CATEGORIES: PromptCategory[] = [
  'Coding',
  'Writing & Content',
  'Data & Analytics',
  'Productivity',
  'Marketing',
  'Creative & Design',
  'System / DevOps',
];

const MODELS: AIModel[] = [
  'GPT-4o',
  'Claude 3.5 Sonnet',
  'Gemini 1.5 Pro',
  'DeepSeek V3',
  'Universal',
];

const INITIAL_FORM_STATE: AIPromptFormData = {
  title: '',
  description: '',
  category: 'Coding',
  targetModel: 'Claude 3.5 Sonnet',
  systemInstruction: '',
  promptTemplate: '',
  tags: [],
  temperature: 0.2,
  isFavorite: false,
};

export const PromptFormModal: React.FC<PromptFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingPrompt,
}) => {
  const [formData, setFormData] = useState<AIPromptFormData>(INITIAL_FORM_STATE);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize or populate form on open
  useEffect(() => {
    if (editingPrompt) {
      setFormData({
        title: editingPrompt.title,
        description: editingPrompt.description,
        category: editingPrompt.category,
        targetModel: editingPrompt.targetModel,
        systemInstruction: editingPrompt.systemInstruction || '',
        promptTemplate: editingPrompt.promptTemplate,
        tags: [...editingPrompt.tags],
        temperature: editingPrompt.temperature,
        isFavorite: editingPrompt.isFavorite,
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
    setTagInput('');
    setErrors({});
    setIsSubmitting(false);
  }, [editingPrompt, isOpen]);

  const detectedVariables = extractTemplateVariables(formData.promptTemplate);

  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase().replace(/[^a-z0-9-_]/gi, '');
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = PromptService.validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    onSubmit(formData, editingPrompt?.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingPrompt ? 'Prompt Şablonunu Düzenle' : 'Yeni AI Prompt Ekle'}
      subtitle={
        editingPrompt
          ? 'Mevcut prompt detaylarını ve şablonunu güncelleyin.'
          : 'Yapay zeka projelerinizde kullanmak üzere yeni bir şablon kaydedin.'
      }
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="prompt-title" className="text-xs font-semibold text-slate-200">
              Prompt Başlığı <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {formData.title.length}/100
            </span>
          </div>
          <input
            id="prompt-title"
            type="text"
            maxLength={100}
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            placeholder="Örn: React & TypeScript Refactoring Uzmanı"
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
              errors.title
                ? 'border-rose-500 focus:ring-rose-500/30'
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.title}</p>
          )}
        </div>

        {/* Category & Model Selectors (Grid 2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label htmlFor="prompt-category" className="block text-xs font-semibold text-slate-200 mb-1.5">
              Kategori <span className="text-rose-400">*</span>
            </label>
            <select
              id="prompt-category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as PromptCategory })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-slate-100">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div>
            <label htmlFor="prompt-model" className="block text-xs font-semibold text-slate-200 mb-1.5">
              Hedef AI Modeli
            </label>
            <select
              id="prompt-model"
              value={formData.targetModel}
              onChange={(e) =>
                setFormData({ ...formData, targetModel: e.target.value as AIModel })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              {MODELS.map((model) => (
                <option key={model} value={model} className="bg-slate-900 text-slate-100">
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="prompt-description" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Kısa Açıklama & Amaç <span className="text-rose-400">*</span>
          </label>
          <input
            id="prompt-description"
            type="text"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: undefined });
            }}
            placeholder="Bu prompt'un ne işe yaradığını kısaca açıklayın..."
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
              errors.description
                ? 'border-rose-500 focus:ring-rose-500/30'
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.description}</p>
          )}
        </div>

        {/* System Instruction (Optional) */}
        <div>
          <label htmlFor="prompt-system" className="block text-xs font-semibold text-slate-200 mb-1.5">
            Sistem Rolü & Talimatı (System Instruction)
            <span className="text-slate-500 font-normal ml-1">(Opsiyonel)</span>
          </label>
          <input
            id="prompt-system"
            type="text"
            value={formData.systemInstruction}
            onChange={(e) =>
              setFormData({ ...formData, systemInstruction: e.target.value })
            }
            placeholder="Örn: Sen kıdemli bir Frontend Architect ve TypeScript uzmanısın..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Prompt Template */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="prompt-template" className="text-xs font-semibold text-slate-200">
              Prompt Şablon İçeriği <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-indigo-400 font-medium">
              Değişkenler için {'{{degiskenAdi}}'} formatını kullanabilirsiniz
            </span>
          </div>
          <textarea
            id="prompt-template"
            rows={6}
            value={formData.promptTemplate}
            onChange={(e) => {
              setFormData({ ...formData, promptTemplate: e.target.value });
              if (errors.promptTemplate) setErrors({ ...errors, promptTemplate: undefined });
            }}
            placeholder="Prompt metnini girin. Dinamik doldurulacak kısımları {{degisken}} şeklinde yazabilirsiniz..."
            className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border font-mono text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 leading-relaxed transition-all ${
              errors.promptTemplate
                ? 'border-rose-500 focus:ring-rose-500/30'
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          {errors.promptTemplate && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.promptTemplate}</p>
          )}

          {/* Dynamic Variables Pill Preview */}
          {detectedVariables.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
              <span className="text-[11px] text-indigo-300 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Tespit Edilen Değişkenler:
              </span>
              {detectedVariables.map((v) => (
                <span
                  key={v}
                  className="px-2 py-0.5 rounded-md bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-[11px] font-mono"
                >
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tags & Temperature (Grid 2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Etiketler (Tags)
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDownTag}
                placeholder="Örn: react (Enter'a bas)"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={handleAddTag}
                aria-label="Etiket Ekle"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tag Badges */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    #{tag}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-rose-400 transition-colors"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Temperature Slider & Favorite Checkbox */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1.5">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-indigo-400" />
                  Creativity / Temperature
                </span>
                <span className="font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  {formData.temperature.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.temperature}
                onChange={(e) =>
                  setFormData({ ...formData, temperature: parseFloat(e.target.value) })
                }
                className="w-full accent-indigo-500 cursor-pointer bg-slate-800 rounded-lg h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0.0 (Kesin / Tutarlı)</span>
                <span>1.0 (Yaratıcı)</span>
              </div>
            </div>

            {/* Favorite Checkbox */}
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={formData.isFavorite}
                onChange={(e) =>
                  setFormData({ ...formData, isFavorite: e.target.checked })
                }
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <Star className={`w-3.5 h-3.5 ${formData.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
                Favorilere ekle
              </span>
            </label>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            İptal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
          >
            {editingPrompt ? 'Değişiklikleri Kaydet' : 'Promptu Kaydet'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
