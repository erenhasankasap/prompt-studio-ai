export type PromptCategory = 
  | 'Coding'
  | 'Writing & Content'
  | 'Data & Analytics'
  | 'Productivity'
  | 'Marketing'
  | 'Creative & Design'
  | 'System / DevOps';

export type AIModel = 
  | 'GPT-4o'
  | 'Claude 3.5 Sonnet'
  | 'Gemini 1.5 Pro'
  | 'DeepSeek V3'
  | 'Universal';

export interface AIPrompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  targetModel: AIModel;
  systemInstruction?: string;
  promptTemplate: string;
  tags: string[];
  temperature: number; // 0.0 to 1.0
  isFavorite: boolean;
  usageCount: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface AIPromptFormData {
  title: string;
  description: string;
  category: PromptCategory;
  targetModel: AIModel;
  systemInstruction: string;
  promptTemplate: string;
  tags: string[];
  temperature: number;
  isFavorite: boolean;
}

export interface FormValidationErrors {
  title?: string;
  description?: string;
  category?: string;
  promptTemplate?: string;
  temperature?: string;
  tags?: string;
}
