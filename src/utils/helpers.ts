import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AIPrompt, PromptCategory } from '../interfaces/prompt.interface';
import type { DashboardStats } from '../interfaces/stats.interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function formatShortDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function extractTemplateVariables(template: string): string[] {
  const matches = template.match(/\{\{([^}]+)\}\}/g);
  if (!matches) return [];
  const vars = matches.map((m) => m.replace(/[{}]/g, '').trim());
  return Array.from(new Set(vars)).filter((v) => v.length > 0);
}

export function replaceTemplateVariables(template: string, values: Record<string, string>): string {
  let result = template;
  Object.entries(values).forEach(([key, val]) => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    result = result.replace(regex, val || `{{${key}}}`);
  });
  return result;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Clipboard copy error:', err);
    return false;
  }
}

export function calculateDashboardStats(prompts: AIPrompt[]): DashboardStats {
  const totalPrompts = prompts.length;

  const categoryMap: Record<string, number> = {};
  const modelMap: Record<string, number> = {};
  const allTags = new Set<string>();
  let variableTemplatesCount = 0;

  prompts.forEach((p) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    modelMap[p.targetModel] = (modelMap[p.targetModel] || 0) + 1;
    p.tags.forEach((t) => allTags.add(t));
    if (extractTemplateVariables(p.promptTemplate).length > 0) {
      variableTemplatesCount++;
    }
  });

  const categoryDistribution = Object.entries(categoryMap).map(([category, count]) => ({
    category: category as PromptCategory,
    count,
    percentage: totalPrompts > 0 ? Math.round((count / totalPrompts) * 100) : 0,
  }));

  const modelDistribution = Object.entries(modelMap).map(([model, count]) => ({
    model,
    count,
    percentage: totalPrompts > 0 ? Math.round((count / totalPrompts) * 100) : 0,
  }));

  return {
    totalPrompts,
    categoriesCount: Object.keys(categoryMap).length,
    modelsCount: Object.keys(modelMap).length,
    variableTemplatesCount,
    totalTagsCount: allTags.size,
    categoryDistribution,
    modelDistribution,
  };
}

export function getCategoryBadgeColor(category: PromptCategory): string {
  switch (category) {
    case 'Coding':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'Writing & Content':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'Data & Analytics':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'Productivity':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'Marketing':
      return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
    case 'Creative & Design':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'System / DevOps':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  }
}

export function getModelBadgeColor(model: string): string {
  switch (model) {
    case 'GPT-4o':
      return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
    case 'Claude 3.5 Sonnet':
      return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
    case 'Gemini 1.5 Pro':
      return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
    case 'DeepSeek V3':
      return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
    default:
      return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
  }
}
