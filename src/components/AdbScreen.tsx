import React, { useState } from 'react';
import { Terminal, Wifi, Cable, Play, CheckCircle2, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { AdbConnectionState } from '../types';

interface AdbScreenProps {
  adbState: AdbConnectionState;
  onUpdateAdbState: (partial: Partial<AdbConnectionState>) => void;
  orientation?: 'portrait' | 'landscape';
}

export const AdbScreen: React.FC<AdbScreenProps> = ({
  adbState,
  onUpdateAdbState,
  orientation = 'portrait',
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleConnectToggle = () => {
    if (adbState.isConnected) {
      onUpdateAdbState({
        isConnected: false,
        logs: [...adbState.logs, `[${new Date().toLocaleTimeString()}] ADB desconectado pelo usuário.`],
      });
      return;
    }

    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onUpdateAdbState({
        isConnected: true,
        logs: [
          ...adbState.logs,
          `[${new Date().toLocaleTimeString()}] Conectando a ${adbState.ipAddress}:${adbState.port}...`,
          `[${new Date().toLocaleTimeString()}] Handshake TCP bem-sucedido.`,
          `[${new Date().toLocaleTimeString()}] Dispositivo autorizado: Android 14 (API 34).`,
          `[${new Date().toLocaleTimeString()}] Serviço de overlay ativo no PID 8421.`,
        ],
      });
    }, 900);
  };

  const handleRunCommand = (cmd: string) => {
    onUpdateAdbState({
      logs: [
        ...adbState.logs,
        `$ adb shell ${cmd}`,
        `> Success: Permissão concedida para com.overlaypilot`,
      ],
    });
  };

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const isLandscape = orientation === 'landscape';

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-50 select-none">
      {/* Header */}
      <div className="w-full px-5 pt-3 pb-2 flex items-center justify-between bg-white border-b border-slate-100">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">ADB Conexão</h1>
          <p className="text-[11px] text-slate-500">Configuração e conexão de depuração Android</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              adbState.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
            }`}
          />
          <span className="text-xs font-bold text-slate-700">
            {adbState.isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {/* Mode Selector */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Método de Conexão
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onUpdateAdbState({ connectionMode: 'wifi' })}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                adbState.connectionMode === 'wifi'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Wi-Fi (Wireless)</span>
            </button>
            <button
              onClick={() => onUpdateAdbState({ connectionMode: 'usb' })}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                adbState.connectionMode === 'usb'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'
              }`}
            >
              <Cable className="w-4 h-4" />
              <span>Cabo USB</span>
            </button>
          </div>
        </div>

        {/* Credentials / IP & Port Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
          <div className={`grid ${isLandscape ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                Endereço IP
              </label>
              <input
                type="text"
                value={adbState.ipAddress}
                onChange={(e) => onUpdateAdbState({ ipAddress: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                Porta ADB
              </label>
              <input
                type="text"
                value={adbState.port}
                onChange={(e) => onUpdateAdbState({ port: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className={isLandscape ? '' : 'col-span-2'}>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                Código de Pareamento (Opcional)
              </label>
              <input
                type="text"
                placeholder="6 dígitos (ex: 849201)"
                value={adbState.pairingCode}
                onChange={(e) => onUpdateAdbState({ pairingCode: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleConnectToggle}
            disabled={isConnecting}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
              adbState.isConnected
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
            }`}
          >
            {isConnecting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Estabelecendo conexão ADB...</span>
              </>
            ) : adbState.isConnected ? (
              <span>Desconectar ADB</span>
            ) : (
              <span>Conectar via ADB</span>
            )}
          </button>
        </div>

        {/* Quick Permission Grants via ADB */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Comandos Rápidos de Permissão
          </label>
          <div className="space-y-2">
            {[
              {
                title: 'Liberar Sobreposição de Tela (SYSTEM_ALERT_WINDOW)',
                cmd: 'appops set com.overlaypilot SYSTEM_ALERT_WINDOW allow',
              },
              {
                title: 'Conceder Permissão de Microfone',
                cmd: 'pm grant com.overlaypilot android.permission.RECORD_AUDIO',
              },
              {
                title: 'Ignorar Otimização de Bateria',
                cmd: 'dumpsys deviceidle whitelist +com.overlaypilot',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 truncate">{item.title}</p>
                  <code className="text-[10px] text-slate-500 font-mono block truncate mt-0.5">
                    {item.cmd}
                  </code>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => copyToClipboard(item.cmd)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
                    title="Copiar comando"
                  >
                    {copiedCmd === item.cmd ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRunCommand(item.cmd)}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                  >
                    Executar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Terminal Log Viewer */}
        <div className="bg-slate-900 text-emerald-400 p-3 rounded-2xl font-mono text-[11px] border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
            <span className="flex items-center gap-1.5 font-sans font-semibold text-xs">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Console ADB
            </span>
            <button
              onClick={() => onUpdateAdbState({ logs: [] })}
              className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              Limpar
            </button>
          </div>
          <div className="h-28 overflow-y-auto space-y-1 font-mono text-[10px] text-slate-300 no-scrollbar">
            {adbState.logs.map((log, index) => (
              <div key={index} className="leading-tight break-all">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
