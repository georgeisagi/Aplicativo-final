/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  RotateCw,
  Info,
  Maximize2,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';
import {
  Orientation,
  TabType,
  VTuberModel,
  ActiveModel,
  AppSettings,
  AdbConnectionState,
} from './types';
import { INITIAL_MODELS } from './data/models';
import { DeviceFrame } from './components/DeviceFrame';
import { HomeModelScreen } from './components/HomeModelScreen';
import { StoreScreen } from './components/StoreScreen';
import { AdbScreen } from './components/AdbScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ModelImportModal } from './components/ModelImportModal';
import { DesignSpecsModal } from './components/DesignSpecsModal';

export default function App() {
  // Device & View State
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [currentTab, setCurrentTab] = useState<TabType>('model2d');

  // AI & Active Model State
  const [aiActive, setAiActive] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<ActiveModel | null>({
    id: 'default-rig',
    name: 'Rig Live2D Base',
    type: 'Live2D',
    scale: 1,
    opacity: 1,
    posX: 0,
    posY: 0,
    rotation: 0,
    wireframeStyle: 'poly',
    rigColor: '#2563EB',
  });

  // Store & Purchased Models
  const [models, setModels] = useState<VTuberModel[]>(INITIAL_MODELS);
  const [purchasedModels, setPurchasedModels] = useState<VTuberModel[]>([]);

  // Modals
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ADB Connection State
  const [adbState, setAdbState] = useState<AdbConnectionState>({
    isConnected: false,
    ipAddress: '192.168.1.104',
    port: '5555',
    pairingCode: '',
    connectionMode: 'wifi',
    logs: [
      `[${new Date().toLocaleTimeString()}] Sistema OverlayPilot inicializado.`,
      `[${new Date().toLocaleTimeString()}] Daemon ADB aguardando conexão...`,
    ],
  });

  // Settings State
  const [settings, setSettings] = useState<AppSettings>({
    overlayPermission: true,
    microphonePermission: true,
    accessibilityPermission: false,
    batteryOptimization: true,
    persistentNotification: true,
    fps: 60,
    defaultOpacity: 1.0,
    defaultScale: 1.0,
    theme: 'light',
    language: 'pt-BR',
    keepScreenOn: true,
    autoStartOverlay: false,
    lipSyncSensitivity: 75,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Handle Model Purchase (as rule states: "O modelo some após a compra")
  const handlePurchaseModel = (boughtModel: VTuberModel) => {
    // 1. Mark as purchased in store so it disappears from the available catalog
    setModels((prev) =>
      prev.map((m) => (m.id === boughtModel.id ? { ...m, isPurchased: true } : m))
    );

    // 2. Add to user's purchased inventory
    setPurchasedModels((prev) => [...prev, { ...boughtModel, isPurchased: true }]);

    // 3. Show confirmation toast
    showToast(`"${boughtModel.name}" comprado com sucesso! Adicionado aos seus modelos.`);
  };

  // Toggle favorite in store
  const handleToggleFavorite = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  // Toggle AI State
  const handleToggleAi = () => {
    const nextState = !aiActive;
    setAiActive(nextState);
    showToast(
      nextState
        ? 'IA Ativada: ouvindo microfone e aguardando comandos de voz'
        : 'IA Desativada: overlay em modo de espera'
    );
  };

  // Rotate Orientation helper
  const handleRotate = () => {
    setOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'));
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Preview Control Header Bar */}
      <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 z-40 flex items-center justify-between shrink-0">
        {/* Brand & Mode Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-base font-extrabold tracking-tight text-white">
              Overlay<span className="text-blue-500">Pilot</span>
            </span>
          </div>

          <span className="hidden sm:inline-block w-px h-4 bg-slate-700" />

          {/* Quick Orientation Selector */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => setOrientation('portrait')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                orientation === 'portrait'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Modo Retrato</span>
              <span className="text-[10px] opacity-75 font-mono">(9:20)</span>
            </button>

            <button
              onClick={() => setOrientation('landscape')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all ${
                orientation === 'landscape'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 rotate-90" />
              <span className="hidden md:inline">Modo Paisagem</span>
              <span className="text-[10px] opacity-75 font-mono">(20:9)</span>
            </button>

            <button
              onClick={() => setOrientation('responsive')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                orientation === 'responsive'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Preenchimento total da tela"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Tela Cheia</span>
            </button>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Rotate Button */}
          <button
            onClick={handleRotate}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors active:scale-95"
            title="Alternar entre Retrato e Paisagem"
          >
            <RotateCw className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Girar Tela</span>
          </button>

          {/* Design Specs & Proportions Button */}
          <button
            onClick={() => setIsSpecsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl text-xs font-semibold border border-blue-500/30 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dimensões & Detalhes</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 w-full flex items-center justify-center overflow-hidden relative bg-slate-950 p-2 sm:p-4">
        <DeviceFrame
          orientation={orientation}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          cartCount={purchasedModels.length}
        >
          {/* Tab 1: Modelo 2D (Tela Inicial) */}
          {currentTab === 'model2d' && (
            <HomeModelScreen
              activeModel={activeModel}
              aiActive={aiActive}
              onToggleAi={handleToggleAi}
              onOpenImport={() => setIsImportModalOpen(true)}
              onOpenSettings={() => setCurrentTab('settings')}
              orientation={orientation === 'landscape' ? 'landscape' : 'portrait'}
            />
          )}

          {/* Tab 2: Loja */}
          {currentTab === 'store' && (
            <StoreScreen
              models={models}
              onPurchase={handlePurchaseModel}
              onToggleFavorite={handleToggleFavorite}
              purchasedCount={purchasedModels.length}
              onOpenPurchased={() => setIsImportModalOpen(true)}
              orientation={orientation === 'landscape' ? 'landscape' : 'portrait'}
            />
          )}

          {/* Tab 3: ADB */}
          {currentTab === 'adb' && (
            <AdbScreen
              adbState={adbState}
              onUpdateAdbState={(partial) =>
                setAdbState((prev) => ({ ...prev, ...partial }))
              }
              orientation={orientation === 'landscape' ? 'landscape' : 'portrait'}
            />
          )}

          {/* Tab 4: Configurações */}
          {currentTab === 'settings' && (
            <SettingsScreen
              settings={settings}
              onUpdateSettings={(partial) =>
                setSettings((prev) => ({ ...prev, ...partial }))
              }
              orientation={orientation === 'landscape' ? 'landscape' : 'portrait'}
            />
          )}
        </DeviceFrame>

        {/* Toast Alert Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>

      {/* Model Importer Modal */}
      <ModelImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSelectModel={(model) => {
          setActiveModel(model);
          showToast(`Modelo "${model.name}" equipado com sucesso!`);
        }}
        purchasedModels={purchasedModels}
      />

      {/* Design Specifications & Proportions Modal */}
      <DesignSpecsModal
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
      />
    </div>
  );
}
