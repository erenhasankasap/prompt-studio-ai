import type { AIModel, PromptCategory } from './prompt.interface';

export interface DashboardStats {
  totalPrompts: number;
  categoriesCount: number;
  modelsCount: number;
  variableTemplatesCount: number;
  totalTagsCount: number;
  categoryDistribution: {
    category: PromptCategory;
    count: number;
    percentage: number;
  }[];
  modelDistribution: {
    model: AIModel | string;
    count: number;
    percentage: number;
  }[];
}

