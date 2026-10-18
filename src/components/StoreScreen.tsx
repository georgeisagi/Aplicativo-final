import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Sparkles, Check, Layers } from 'lucide-react';
import { VTuberModel, ModelCategory } from '../types';

interface StoreScreenProps {
  models: VTuberModel[];
  onPurchase: (model: VTuberModel) => void;
  onToggleFavorite: (id: string) => void;
  purchasedCount: number;
  onOpenPurchased: () => void;
  orientation?: 'portrait' | 'landscape';
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  models,
  onPurchase,
  onToggleFavorite,
  purchasedCount,
  onOpenPurchased,
  orientation = 'portrait',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory>('Todos');

  const categories: ModelCategory[] = ['Todos', 'Live2D', 'VRM', 'Imagens'];

  // Filter available (unpurchased) models
  const availableModels = models.filter((model) => !model.isPurchased);

  const filteredModels = availableModels.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todos' || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isLandscape = orientation === 'landscape';

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white select-none">
      {/* Top Header */}
      <div className="w-full px-5 pt-2 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Loja</h1>
        <button
          onClick={onOpenPurchased}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors active:scale-95"
          aria-label="Carrinho e Modelos Adquiridos"
        >
          <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
          {purchasedCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {purchasedCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="px-5 py-1">
        <div className="relative w-full flex items-center">
          <Search className="w-4 h-4 text-blue-600 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar modelos..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs / Segmented Controls */}
      <div className="px-5 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Models Grid (2 columns in portrait, 4 columns in landscape) */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-1 no-scrollbar">
        {filteredModels.length === 0 ? (
          <div className="w-full h-48 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
              <Layers className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-700">Nenhum modelo disponível</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
              {availableModels.length === 0
                ? 'Você adquiriu todos os modelos da loja! Verifique sua biblioteca.'
                : 'Nenhum resultado corresponde à sua pesquisa.'}
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-3.5 ${
              isLandscape ? 'grid-cols-4' : 'grid-cols-2'
            }`}
          >
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Thumbnail Area with Rig Wireframe (NO anime girl illustrations) */}
                <div
                  className="relative w-full aspect-square bg-gradient-to-b from-slate-50 to-slate-100/90 flex items-center justify-center p-3 overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${model.rigColor}15, #f8fafc)`,
                  }}
                >
                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => onToggleFavorite(model.id)}
                    aria-label="Favoritar modelo"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-xs active:scale-90 z-10"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        model.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>

                  {/* Clean Technical Rig Thumbnail Vector */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-slate-600 transition-transform duration-300 group-hover:scale-105"
                      fill="none"
                      stroke="currentColor"
                    >
                      {/* Geometric Wireframe Silhouette */}
                      <polygon
                        points="50,15 78,35 78,70 50,90 22,70 22,35"
                        stroke={model.rigColor}
                        strokeWidth="1.8"
                        strokeDasharray="4 2"
                        className="opacity-75"
                      />
                      <circle cx="50" cy="40" r="14" stroke={model.rigColor} strokeWidth="1.5" />
                      <circle cx="45" cy="38" r="2" fill={model.rigColor} />
                      <circle cx="55" cy="38" r="2" fill={model.rigColor} />
                      <line x1="50" y1="54" x2="50" y2="78" stroke={model.rigColor} strokeWidth="1.5" />
                      <line x1="32" y1="62" x2="68" y2="62" stroke={model.rigColor} strokeWidth="1.2" />
                      <circle cx="50" cy="15" r="2.5" fill={model.rigColor} />
                      <circle cx="78" cy="35" r="2.5" fill={model.rigColor} />
                      <circle cx="22" cy="35" r="2.5" fill={model.rigColor} />
                      <circle cx="50" cy="90" r="2.5" fill={model.rigColor} />
                    </svg>

                    {/* Format Badge Overlay */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-100 text-[9px] font-mono font-semibold text-slate-600 whitespace-nowrap shadow-xs">
                      {model.version}
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    {/* Model Name */}
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {model.name}
                    </h3>

                    {/* Model Type */}
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {model.type}
                    </p>

                    {/* Price */}
                    <p className="text-xs font-bold text-slate-900 mt-1">
                      {model.priceFormatted}
                    </p>
                  </div>

                  {/* Primary Buy Button: "Comprar" */}
                  <button
                    onClick={() => onPurchase(model)}
                    className="w-full mt-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-1.5 px-3 rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1"
                  >
                    <span>Comprar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
