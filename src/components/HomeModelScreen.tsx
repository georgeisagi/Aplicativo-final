import React from 'react';
import { Settings, Plus, Play, Pause } from 'lucide-react';
import { ActiveModel } from '../types';
import { RigVisualizer } from './RigVisualizer';

interface HomeModelScreenProps {
  activeModel: ActiveModel | null;
  aiActive: boolean;
  onToggleAi: () => void;
  onOpenImport: () => void;
  onOpenSettings: () => void;
  orientation?: 'portrait' | 'landscape';
}

export const HomeModelScreen: React.FC<HomeModelScreenProps> = ({
  activeModel,
  aiActive,
  onToggleAi,
  onOpenImport,
  onOpenSettings,
  orientation = 'portrait',
}) => {
  const isLandscape = orientation === 'landscape';

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 select-none">
      {/* Top Header Bar */}
      <div className="w-full px-5 py-2.5 flex items-center justify-between z-20">
        {/* Brand Lockup: OverlayPilot */}
        <div className="flex items-center">
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Overlay<span className="text-blue-600">Pilot</span>
          </span>
        </div>

        {/* Top Right Settings Gear Icon */}
        <button
          onClick={onOpenSettings}
          aria-label="Configurações"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors active:scale-95"
        >
          <Settings className="w-5 h-5" strokeWidth={1.8} />
        </button>
      </div>

      {/* Main Viewport Workspace */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        {/* Central Model Canvas (Strictly no anime characters as requested) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <RigVisualizer
            activeModel={activeModel}
            aiActive={aiActive}
            onOpenImport={onOpenImport}
            orientation={orientation}
          />
        </div>

        {/* Floating Card: "+ Adicionar seu modelo" */}
        {/* In portrait: top-right; In landscape: left side */}
        <div
          className={`absolute z-20 ${
            isLandscape
              ? 'left-6 top-1/2 -translate-y-1/2 w-48'
              : 'right-4 top-2 w-44'
          }`}
        >
          <button
            onClick={onOpenImport}
            className="w-full bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all text-center flex flex-col items-center group active:scale-[0.98]"
          >
            {/* Plus Icon in soft blue circle */}
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h3 className="text-xs font-bold text-slate-900 leading-snug">
              Adicionar seu modelo
            </h3>

            {/* Subtitle */}
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">
              Importe seu VTuber e comece a usar.
            </p>
          </button>
        </div>

        {/* Floating Card: "Status da IA" */}
        {/* In portrait: bottom-left/center; In landscape: right side */}
        <div
          className={`absolute z-20 ${
            isLandscape
              ? 'right-6 top-1/2 -translate-y-1/2 w-64'
              : 'left-4 bottom-4 right-4 max-w-sm mx-auto'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-between">
            {/* Left Status Text */}
            <div className="flex flex-col pr-2">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    aiActive ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-900">
                  {aiActive ? 'IA Ativada' : 'IA Desativada'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 truncate">
                {aiActive
                  ? 'Ouvindo comandos e interagindo...'
                  : 'Aguardando comandos...'}
              </span>
            </div>

            {/* Right Action Button (Blue circular Play/Pause button) */}
            <button
              onClick={onToggleAi}
              aria-label={aiActive ? 'Desativar IA' : 'Ativar IA'}
              className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-all shrink-0"
            >
              {aiActive ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
