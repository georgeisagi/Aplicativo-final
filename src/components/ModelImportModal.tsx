import React, { useState } from 'react';
import { X, Upload, Check, FileCode, Box, Image as ImageIcon, Sparkles } from 'lucide-react';
import { ActiveModel, VTuberModel } from '../types';

interface ModelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (model: ActiveModel) => void;
  purchasedModels: VTuberModel[];
}

export const ModelImportModal: React.FC<ModelImportModalProps> = ({
  isOpen,
  onClose,
  onSelectModel,
  purchasedModels,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'purchased'>('upload');
  const [modelType, setModelType] = useState<'Live2D' | 'VRM' | 'Imagem (PNG)'>('Live2D');
  const [modelName, setModelName] = useState('Meu Modelo Personalizado');
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFile(file);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleApplyUpload = () => {
    onSelectModel({
      id: 'custom-' + Date.now(),
      name: modelName || 'Meu Modelo',
      type: modelType,
      scale: 1,
      opacity: 1,
      posX: 0,
      posY: 0,
      rotation: 0,
      customImageUrl: previewUrl || undefined,
      wireframeStyle: 'hologram',
      rigColor: '#2563EB',
    });
    onClose();
  };

  const handleSelectPreset = (preset: {
    name: string;
    type: 'Live2D' | 'VRM' | 'Imagem (PNG)';
    color: string;
    style: 'hologram' | 'minimal' | 'cyber' | 'grid' | 'poly';
  }) => {
    onSelectModel({
      id: 'preset-' + preset.name.toLowerCase().replace(/\s+/g, '-'),
      name: preset.name,
      type: preset.type,
      scale: 1,
      opacity: 1,
      posX: 0,
      posY: 0,
      rotation: 0,
      wireframeStyle: preset.style,
      rigColor: preset.color,
    });
    onClose();
  };

  const handleSelectPurchased = (model: VTuberModel) => {
    onSelectModel({
      id: model.id,
      name: model.name,
      type: model.type,
      scale: 1,
      opacity: 1,
      posX: 0,
      posY: 0,
      rotation: 0,
      wireframeStyle: model.wireframeStyle,
      rigColor: model.rigColor,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Adicionar Modelo VTuber
              </h2>
              <p className="text-[10px] text-slate-500">
                Suporte a Live2D, VRM ou imagem (PNG/GIF)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 p-1.5 mx-4 mt-3 bg-slate-100 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Importar Arquivo
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'presets' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Estruturas Rig
          </button>
          <button
            onClick={() => setActiveTab('purchased')}
            className={`py-1.5 rounded-lg transition-all relative ${
              activeTab === 'purchased' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Meus Modelos
            {purchasedModels.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[9px]">
                {purchasedModels.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
          {activeTab === 'upload' && (
            <div className="space-y-3.5">
              {/* Format Selector */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block mb-1.5">
                  Tipo de Formato
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: 'Live2D', icon: FileCode, label: 'Live2D (JSON)' },
                    { type: 'VRM', icon: Box, label: 'VRM 3D (.vrm)' },
                    { type: 'Imagem (PNG)', icon: ImageIcon, label: 'Imagem (PNG/GIF)' },
                  ].map((fmt) => {
                    const Icon = fmt.icon;
                    const isSelected = modelType === fmt.type;
                    return (
                      <button
                        key={fmt.type}
                        type="button"
                        onClick={() => setModelType(fmt.type as any)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-bold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 font-medium'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-[10px] leading-tight">{fmt.type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Model Name Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block mb-1">
                  Nome do Modelo
                </label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ex: VTuber Principal"
                />
              </div>

              {/* Drag and Drop Zone */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block mb-1">
                  Arquivo do Modelo
                </label>
                <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all">
                  <input
                    type="file"
                    className="hidden"
                    accept=".json,.zip,.vrm,.png,.jpg,.jpeg,.gif"
                    onChange={handleFileChange}
                  />
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  {customFile ? (
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-900 truncate max-w-[240px]">
                        {customFile.name}
                      </p>
                      <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">
                        Arquivo carregado pronto para vincular
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-xs font-semibold text-slate-700">
                        Clique para escolher o arquivo
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        .model3.json, .vrm ou .png transparente
                      </p>
                    </div>
                  )}
                </label>
              </div>

              <button
                onClick={handleApplyUpload}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              >
                Salvar e Aplicar Modelo
              </button>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-500 mb-2">
                Escolha uma estrutura técnica para teste de overlay imediato:
              </p>
              {[
                { name: 'Rig Live2D Cubism v4', type: 'Live2D' as const, color: '#3B82F6', style: 'poly' as const, desc: '38 pontos de articulação facial' },
                { name: 'VRM Humanoid Mesh v1.0', type: 'VRM' as const, color: '#6366F1', style: 'cyber' as const, desc: 'Esqueleto 3D para rastreamento completo' },
                { name: 'Holographic Wireframe Grid', type: 'Live2D' as const, color: '#06B6D4', style: 'hologram' as const, desc: 'Matriz visual para transmissões' },
                { name: 'PNGTuber Voice Trigger 4K', type: 'Imagem (PNG)' as const, color: '#EC4899', style: 'minimal' as const, desc: 'Dois estados: falando e repouso' },
              ].map((preset, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-mono text-xs font-bold"
                      style={{ backgroundColor: preset.color }}
                    >
                      {preset.type.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{preset.name}</h4>
                      <p className="text-[10px] text-slate-500">{preset.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectPreset(preset)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Usar
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'purchased' && (
            <div className="space-y-2.5">
              {purchasedModels.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs font-bold text-slate-700">Nenhum modelo comprado ainda</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Visite a Loja para adquirir novos modelos VTuber.
                  </p>
                </div>
              ) : (
                purchasedModels.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                      <p className="text-[10px] text-slate-500">
                        {item.type} · Adquirido na Loja
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectPurchased(item)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Equipar</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
