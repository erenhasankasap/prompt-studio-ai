import React, { useState, useEffect } from 'react';
import type { AIPrompt } from '../../interfaces/prompt.interface';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  extractTemplateVariables,
  replaceTemplateVariables,
  copyToClipboard,
} from '../../utils/helpers';
import { Copy, Check, Sparkles, Terminal, RotateCcw } from 'lucide-react';

export interface PromptTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: AIPrompt | null;
  onIncrementUsage: (id: string) => void;
  onCopySuccess: () => void;
}

export const PromptTestModal: React.FC<PromptTestModalProps> = ({
  isOpen,
  onClose,
  prompt,
  onIncrementUsage,
  onCopySuccess,
}) => {
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prompt) {
      const vars = extractTemplateVariables(prompt.promptTemplate);
      const initialMap: Record<string, string> = {};
      vars.forEach((v) => {
        initialMap[v] = '';
      });
      setVariableValues(initialMap);
      setCopied(false);
    }
  }, [prompt, isOpen]);

  if (!prompt) return null;

  const variables = extractTemplateVariables(prompt.promptTemplate);
  const evaluatedPrompt = replaceTemplateVariables(prompt.promptTemplate, variableValues);

  const handleCopyEvaluated = async () => {
    const success = await copyToClipboard(evaluatedPrompt);
    if (success) {
      setCopied(true);
      onIncrementUsage(prompt.id);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetVariables = () => {
    const initialMap: Record<string, string> = {};
    variables.forEach((v) => {
      initialMap[v] = '';
    });
    setVariableValues(initialMap);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Prompt Değişken Doldurma & Test Alanı"
      subtitle={`"${prompt.title}" şablonundaki değişkenleri doldurarak nihai promptu anında oluşturun.`}
      maxWidth="4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Variable Inputs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Doldurulacak Değişkenler ({variables.length})
            </h4>
            {variables.length > 0 && (
              <button
                onClick={handleResetVariables}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Temizle</span>
              </button>
            )}
          </div>

          {variables.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              Bu şablonda {'{{degisken}}'} tanımlı değil. Şablonu doğrudan kopyalayabilirsiniz.
            </div>
          ) : (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {variables.map((variable) => (
                <div key={variable} className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-300 font-mono">
                    {`{{${variable}}}`}
                  </label>
                  <textarea
                    rows={2}
                    value={variableValues[variable] || ''}
                    onChange={(e) =>
                      setVariableValues({
                        ...variableValues,
                        [variable]: e.target.value,
                      })
                    }
                    placeholder={`"${variable}" değeri girin...`}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 leading-relaxed font-sans"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Live Evaluated Output */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Nihai Prompt Önizlemesi
            </h4>
            <span className="text-[11px] font-mono text-slate-500">
              {evaluatedPrompt.length} karakter
            </span>
          </div>

          <div className="flex-1 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[380px] select-text">
            {evaluatedPrompt}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Kapat
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopyEvaluated}
              leftIcon={
                copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )
              }
            >
              {copied ? 'Hazır Prompt Kopyalandı!' : 'Nihai Promptu Kopyala'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
