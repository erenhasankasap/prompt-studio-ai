import React, { useState, useEffect } from 'react';
import type { AIPrompt } from '../interfaces/prompt.interface';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  extractTemplateVariables,
  replaceTemplateVariables,
  copyToClipboard,
} from '../utils/helpers';
import {
  Terminal,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Layers,
  Zap,
} from 'lucide-react';

export interface PlaygroundPageProps {
  prompts: AIPrompt[];
  onIncrementUsage: (id: string) => void;
  onCopySuccess: () => void;
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({
  prompts,
  onIncrementUsage,
  onCopySuccess,
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(
    prompts.length > 0 ? prompts[0].id : 'custom'
  );
  const [customTemplate, setCustomTemplate] = useState<string>(
    'Lütfen aşağıdaki {{language}} kodunu incele ve {{taskType}} işlemi uygula:\n\n```{{language}}\n{{sourceCode}}\n```\n\nHedef: {{goal}}'
  );
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);

  const selectedPrompt = prompts.find((p) => p.id === selectedPromptId);
  const activeTemplate = selectedPrompt ? selectedPrompt.promptTemplate : customTemplate;

  const detectedVariables = extractTemplateVariables(activeTemplate);

  // Initialize variable inputs whenever active template changes
  useEffect(() => {
    const initialMap: Record<string, string> = {};
    detectedVariables.forEach((v) => {
      initialMap[v] = '';
    });
    setVariableValues(initialMap);
    setCopied(false);
  }, [selectedPromptId, customTemplate]);

  const evaluatedPrompt = replaceTemplateVariables(activeTemplate, variableValues);

  const handleCopy = async () => {
    const success = await copyToClipboard(evaluatedPrompt);
    if (success) {
      setCopied(true);
      if (selectedPrompt) {
        onIncrementUsage(selectedPrompt.id);
      }
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    const resetMap: Record<string, string> = {};
    detectedVariables.forEach((v) => {
      resetMap[v] = '';
    });
    setVariableValues(resetMap);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Terminal className="w-4 h-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Prompt Test ve Değişken Enjeksiyon Alanı
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Kayıtlı bir prompt seçin veya kendi şablonunuzu yazın; dinamik değişkenleri doldurup nihai promptu anında oluşturun.
        </p>
      </div>

      {/* Template Selector & Mode Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <label className="text-xs font-semibold text-slate-300 whitespace-nowrap">
            Şablon Seçimi:
          </label>
          <select
            value={selectedPromptId}
            onChange={(e) => setSelectedPromptId(e.target.value)}
            className="w-full sm:max-w-md px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="custom">✍️ Özel Şablon Yaz (Canlı Deneme)</option>
            <optgroup label="Kayıtlı Kütüphane Promptları">
              {prompts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.category})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {selectedPrompt && (
          <div className="flex items-center gap-2">
            <Badge variant="category" category={selectedPrompt.category} size="sm">
              {selectedPrompt.category}
            </Badge>
            <Badge variant="model" model={selectedPrompt.targetModel} size="sm">
              {selectedPrompt.targetModel}
            </Badge>
          </div>
        )}
      </div>

      {/* Main Workspace (3 columns on xl, 2 on lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Editor / Viewer (5 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                {selectedPromptId === 'custom' ? 'Şablon Metni (Düzenlenebilir)' : 'Seçili Şablon'}
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {detectedVariables.length} değişken
              </span>
            </div>

            {selectedPromptId === 'custom' ? (
              <textarea
                rows={12}
                value={customTemplate}
                onChange={(e) => setCustomTemplate(e.target.value)}
                placeholder="Değişkenler için {{degiskenAdi}} kullanın..."
                className="w-full flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 leading-relaxed custom-scrollbar"
              />
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap max-h-[350px] overflow-y-auto custom-scrollbar">
                {activeTemplate}
              </div>
            )}

            {/* Variable Pills */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                Bulunan Değişkenler:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {detectedVariables.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">Değişken bulunamadı</span>
                ) : (
                  detectedVariables.map((v) => (
                    <span
                      key={v}
                      className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-mono"
                    >
                      {`{{${v}}}`}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Variable Inputs (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Değerleri Doldur
              </h3>
              {detectedVariables.length > 0 && (
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              )}
            </div>

            {detectedVariables.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500 text-xs">
                <p>Bu şablonda henüz dinamik bir değişken yok.</p>
                <p className="mt-1">
                  Şablonunuza <code className="text-indigo-300">{'{{konu}}'}</code> gibi etiketler ekleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5 overflow-y-auto max-h-[420px] pr-1 flex-1 custom-scrollbar">
                {detectedVariables.map((v) => (
                  <div key={v} className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-300 font-mono">
                      {`{{${v}}}`}
                    </label>
                    <textarea
                      rows={2}
                      value={variableValues[v] || ''}
                      onChange={(e) =>
                        setVariableValues({ ...variableValues, [v]: e.target.value })
                      }
                      placeholder={`"${v}" için değer...`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-sans"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Evaluated Output (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Nihai Prompt Çıktısı
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {evaluatedPrompt.length} char
              </span>
            </div>

            <div className="flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto custom-scrollbar select-text">
              {evaluatedPrompt}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <Button
                variant="primary"
                size="md"
                onClick={handleCopy}
                className="w-full"
                leftIcon={
                  copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )
                }
              >
                {copied ? 'Kopyalandı!' : 'Hazır Promptu Kopyala'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
