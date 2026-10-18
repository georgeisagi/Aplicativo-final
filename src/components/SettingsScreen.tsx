import React from 'react';
import { Shield, Sliders, Mic, Layers, Cpu, Globe, Moon, Bell, Eye } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (partial: Partial<AppSettings>) => void;
  orientation?: 'portrait' | 'landscape';
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  orientation = 'portrait',
}) => {
  const isLandscape = orientation === 'landscape';

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-50 select-none">
      {/* Header */}
      <div className="w-full px-5 pt-3 pb-2 flex items-center justify-between bg-white border-b border-slate-100">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Configurações</h1>
          <p className="text-[11px] text-slate-500">Permissões do Android e preferências</p>
        </div>
      </div>

      {/* Scrollable Settings Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {/* Section 1: Android Permissions */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
            <Shield className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Permissões do Android
            </h2>
          </div>

          <div className="space-y-3">
            {/* Sobreposição de Tela */}
            <div className="flex items-center justify-between">
              <div className="pr-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Sobreposição de Tela (Overlay)
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Permite desenhar o VTuber por cima de outros apps e jogos
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.overlayPermission}
                onClick={() =>
                  onUpdateSettings({ overlayPermission: !settings.overlayPermission })
                }
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  settings.overlayPermission ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.overlayPermission ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Microfone */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <div className="pr-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Acesso ao Microfone
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Necessário para a IA sincronizar os lábios com a sua voz
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.microphonePermission}
                onClick={() =>
                  onUpdateSettings({ microphonePermission: !settings.microphonePermission })
                }
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  settings.microphonePermission ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.microphonePermission ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Acessibilidade */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <div className="pr-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Serviço de Acessibilidade
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Permite gestos de toque automatizados e detecção de contexto
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.accessibilityPermission}
                onClick={() =>
                  onUpdateSettings({ accessibilityPermission: !settings.accessibilityPermission })
                }
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  settings.accessibilityPermission ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.accessibilityPermission ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notificação Persistente */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <div className="pr-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Notificação em Primeiro Plano
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Garante que o Android não feche o overlay em segundo plano
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.persistentNotification}
                onClick={() =>
                  onUpdateSettings({ persistentNotification: !settings.persistentNotification })
                }
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  settings.persistentNotification ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.persistentNotification ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: App Preferences */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Preferências & Desempenho
            </h2>
          </div>

          <div className="space-y-4">
            {/* FPS Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800">
                  Taxa de Quadros (FPS)
                </span>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {settings.fps} FPS
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {([30, 60, 120] as const).map((fpsVal) => (
                  <button
                    key={fpsVal}
                    onClick={() => onUpdateSettings({ fps: fpsVal })}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                      settings.fps === fpsVal
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {fpsVal} FPS
                  </button>
                ))}
              </div>
            </div>

            {/* Opacidade do Modelo */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  Opacidade Padrão
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  {Math.round(settings.defaultOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={settings.defaultOpacity}
                onChange={(e) =>
                  onUpdateSettings({ defaultOpacity: parseFloat(e.target.value) })
                }
                className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Escala Padrão */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">
                  Escala do Modelo
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  {Math.round(settings.defaultScale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={settings.defaultScale}
                onChange={(e) =>
                  onUpdateSettings({ defaultScale: parseFloat(e.target.value) })
                }
                className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Manter Tela Ligada */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-800">
                Manter tela sempre ativa (WakeLock)
              </span>
              <button
                role="switch"
                aria-checked={settings.keepScreenOn}
                onClick={() =>
                  onUpdateSettings({ keepScreenOn: !settings.keepScreenOn })
                }
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  settings.keepScreenOn ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.keepScreenOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App Info Footer */}
        <div className="text-center py-2 text-[10px] text-slate-400">
          <p className="font-semibold text-slate-500">OverlayPilot v1.4.0 (Build 302)</p>
          <p>Compatível com Android 10+ · Live2D Cubism & VRM 1.0</p>
        </div>
      </div>
    </div>
  );
};
