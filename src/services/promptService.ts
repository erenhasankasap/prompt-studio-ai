import type { AIPrompt, AIPromptFormData, FormValidationErrors } from '../interfaces/prompt.interface';
import { INITIAL_PROMPTS } from '../utils/initialData';

const STORAGE_KEY = 'prompt_studio_ai_data_v3';

export class PromptService {
  /**
   * Get all prompts from LocalStorage or initialize with seed data if empty/corrupted
   */
  static getAll(): AIPrompt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveAll(INITIAL_PROMPTS);
        return INITIAL_PROMPTS;
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return parsed;
    } catch (error) {
      console.error('LocalStorage parse error in PromptService.getAll:', error);
      this.saveAll(INITIAL_PROMPTS);
      return INITIAL_PROMPTS;
    }
  }

  /**
   * Save array of prompts to LocalStorage
   */
  static saveAll(prompts: AIPrompt[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
      return true;
    } catch (error) {
      console.error('LocalStorage save error in PromptService.saveAll:', error);
      return false;
    }
  }

  /**
   * CREATE: Add a new prompt
   */
  static create(formData: AIPromptFormData): AIPrompt {
    const newPrompt: AIPrompt = {
      id: 'pr-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      targetModel: formData.targetModel,
      systemInstruction: formData.systemInstruction?.trim() || '',
      promptTemplate: formData.promptTemplate.trim(),
      tags: formData.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
      temperature: formData.temperature,
      isFavorite: formData.isFavorite || false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const currentList = this.getAll();
    const updatedList = [newPrompt, ...currentList];
    this.saveAll(updatedList);
    return newPrompt;
  }

  /**
   * UPDATE: Update an existing prompt by ID
   */
  static update(id: string, formData: Partial<AIPromptFormData>): AIPrompt | null {
    const currentList = this.getAll();
    const index = currentList.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const existing = currentList[index];
    const updatedItem: AIPrompt = {
      ...existing,
      ...formData,
      tags: formData.tags
        ? formData.tags.map((t) => t.trim().toLowerCase()).filter(Boolean)
        : existing.tags,
      updatedAt: new Date().toISOString(),
    };

    currentList[index] = updatedItem;
    this.saveAll(currentList);
    return updatedItem;
  }

  /**
   * DELETE: Remove prompt by ID
   */
  static delete(id: string): boolean {
    const currentList = this.getAll();
    const filteredList = currentList.filter((p) => p.id !== id);
    if (filteredList.length === currentList.length) return false;
    this.saveAll(filteredList);
    return true;
  }

  /**
   * TOGGLE FAVORITE
   */
  static toggleFavorite(id: string): AIPrompt | null {
    const currentList = this.getAll();
    const item = currentList.find((p) => p.id === id);
    if (!item) return null;
    item.isFavorite = !item.isFavorite;
    item.updatedAt = new Date().toISOString();
    this.saveAll(currentList);
    return item;
  }

  /**
   * INCREMENT USAGE COUNT
   */
  static incrementUsage(id: string): void {
    const currentList = this.getAll();
    const item = currentList.find((p) => p.id === id);
    if (item) {
      item.usageCount = (item.usageCount || 0) + 1;
      this.saveAll(currentList);
    }
  }

  /**
   * RESET TO INITIAL DATA
   */
  static resetToDefault(): AIPrompt[] {
    this.saveAll(INITIAL_PROMPTS);
    return INITIAL_PROMPTS;
  }

  /**
   * FORM VALIDATION
   */
  static validateForm(data: AIPromptFormData): FormValidationErrors {
    const errors: FormValidationErrors = {};

    if (!data.title || data.title.trim().length === 0) {
      errors.title = 'Prompt başlığı zorunludur.';
    } else if (data.title.trim().length < 3) {
      errors.title = 'Başlık en az 3 karakter olmalıdır.';
    } else if (data.title.trim().length > 100) {
      errors.title = 'Başlık en fazla 100 karakter olabilir.';
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.description = 'Kısa açıklama zorunludur.';
    } else if (data.description.trim().length < 5) {
      errors.description = 'Açıklama en az 5 karakter olmalıdır.';
    }

    if (!data.category) {
      errors.category = 'Lütfen geçerli bir kategori seçiniz.';
    }

    if (!data.promptTemplate || data.promptTemplate.trim().length === 0) {
      errors.promptTemplate = 'Prompt şablon içeriği zorunludur.';
    } else if (data.promptTemplate.trim().length < 10) {
      errors.promptTemplate = 'Prompt şablonu en az 10 karakter olmalıdır.';
    }

    if (data.temperature < 0 || data.temperature > 1) {
      errors.temperature = 'Temperature değeri 0.0 ile 1.0 arasında olmalıdır.';
    }

    return errors;
  }
}
