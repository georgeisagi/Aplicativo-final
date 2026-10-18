import React from 'react';
import { X, Smartphone, ShoppingCart, Cpu, Settings, Plus, Play, ExternalLink } from 'lucide-react';

interface DesignSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSpecsModal: React.FC<DesignSpecsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Dimensões, Proporções e Arquitetura
            </h2>
            <p className="text-xs text-slate-500">
              Especificação técnica original do projeto OverlayPilot
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs no-scrollbar">
          {/* Dimensões e proporções */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              Dimensões e Proporções
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-900 block text-xs">Modo Retrato</span>
                <span className="text-blue-600 font-mono font-bold text-sm block mt-0.5">
                  1080 x 2400 px
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Proporção 9:20 (Formato padrão para smartphones Android modernos).
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-900 block text-xs">Modo Paisagem</span>
                <span className="text-blue-600 font-mono font-bold text-sm block mt-0.5">
                  2400 x 1080 px
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Proporção 20:9 (Ideal para jogos, transmissão ao vivo e tablets).
                </span>
              </div>
            </div>
          </div>

          {/* Navegação inferior (4 menus) */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Navegação Inferior (4 Menus)
            </h3>
            <div className="space-y-2">
              {[
                {
                  num: '1.',
                  name: 'Modelo 2D',
                  desc: 'VTuber personalizável com rigging e canvas em tempo real.',
                },
                {
                  num: '2.',
                  name: 'Loja',
                  desc: 'Compre modelos que são adicionados diretamente à sua biblioteca (somem da vitrine após a compra).',
                },
                {
                  num: '3.',
                  name: 'ADB',
                  desc: 'Configuração e conexão de depuração Android (Wi-Fi e USB).',
                },
                {
                  num: '4.',
                  name: 'Configurações',
                  desc: 'Preferências de desempenho e concessão de permissões do sistema Android.',
                },
              ].map((menu, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5"
                >
                  <span className="font-mono font-bold text-blue-600 text-xs">
                    {menu.num}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 text-xs">{menu.name}</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">
                      {menu.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes da tela inicial */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Detalhes Funcionais da Tela Inicial
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  <span>Modelo 2D Personalizável</span>
                </div>
                <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-0.5 pl-1 pt-1">
                  <li>Importar seu próprio modelo</li>
                  <li>Suporte a Live2D, VRM ou imagem (PNG/GIF)</li>
                  <li>Salvar e manter o modelo escolhido</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </div>
                  <span>Sistema de Loja</span>
                </div>
                <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-0.5 pl-1 pt-1">
                  <li>Visualizar modelos disponíveis</li>
                  <li>Comprar e receber automaticamente</li>
                  <li>O modelo some após a compra</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>Status da IA</span>
                </div>
                <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-0.5 pl-1 pt-1">
                  <li>Ativar/desativar com um toque</li>
                  <li>Exibir o estado atual da IA em tempo real</li>
                  <li>Sincronia labial com microfone</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Settings className="w-3.5 h-3.5" />
                  </div>
                  <span>Configurações</span>
                </div>
                <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-0.5 pl-1 pt-1">
                  <li>Permissões do Android (SYSTEM_ALERT_WINDOW)</li>
                  <li>Preferências de FPS e transparência</li>
                  <li>Gerenciamento de conexões ADB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
