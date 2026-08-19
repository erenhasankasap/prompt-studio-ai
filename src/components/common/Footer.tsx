import React from 'react';
import { Sparkles, Code2, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 backdrop-blur mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand and Description */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-tight flex items-center justify-center sm:justify-start gap-2">
                PromptStudio AI
                <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  v1.0.0
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Web Geliştirme; Yapay Zeka Proje Yönergesi standartlarına uygun olarak geliştirilmiş modüler CRUD platformu.
              </p>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300">
              React 19 + TypeScript
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
              Tailwind CSS v4
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
              Vite
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
              LocalStorage
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Eğitim projesi olarak geliştirildi
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full CRUD & Strict Type-Safety</span>
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
