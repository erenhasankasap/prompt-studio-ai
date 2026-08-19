import React from 'react';
import { cn, getCategoryBadgeColor, getModelBadgeColor } from '../../utils/helpers';
import type { PromptCategory } from '../../interfaces/prompt.interface';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'category' | 'model' | 'tag' | 'custom';
  category?: PromptCategory;
  model?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'tag',
  category,
  model,
  size = 'sm',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  let colorStyle = 'bg-slate-800/80 text-slate-300 border border-slate-700/60';

  if (variant === 'category' && category) {
    colorStyle = getCategoryBadgeColor(category);
  } else if (variant === 'model' && model) {
    colorStyle = getModelBadgeColor(model);
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border font-mono transition-colors select-none',
        sizeStyles[size],
        colorStyle,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
