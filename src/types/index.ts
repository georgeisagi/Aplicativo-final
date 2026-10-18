export type Orientation = 'portrait' | 'landscape' | 'responsive';

export type TabType = 'model2d' | 'store' | 'adb' | 'settings';

export type ModelCategory = 'Todos' | 'Live2D' | 'VRM' | 'Imagens';

export interface VTuberModel {
  id: string;
  name: string;
  type: 'Live2D' | 'VRM' | 'Imagem (PNG)';
  category: 'Live2D' | 'VRM' | 'Imagens';
  price: number;
  priceFormatted: string;
  isFavorite?: boolean;
  isPurchased?: boolean;
  version?: string;
  parametersCount?: number;
  rigColor: string;
  accentColor: string;
  wireframeStyle: 'hologram' | 'minimal' | 'cyber' | 'grid' | 'poly';
  description?: string;
}

export interface ActiveModel {
  id: string;
  name: string;
  type: 'Live2D' | 'VRM' | 'Imagem (PNG)' | 'Personalizado';
  scale: number;
  opacity: number;
  posX: number;
  posY: number;
  rotation: number;
  customImageUrl?: string;
  wireframeStyle: 'hologram' | 'minimal' | 'cyber' | 'grid' | 'poly';
  rigColor: string;
}

export interface AppSettings {
  // Android Permissions
  overlayPermission: boolean;
  microphonePermission: boolean;
  accessibilityPermission: boolean;
  batteryOptimization: boolean;
  persistentNotification: boolean;
  
  // App Preferences
  fps: 30 | 60 | 120;
  defaultOpacity: number;
  defaultScale: number;
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR' | 'en' | 'es';
  keepScreenOn: boolean;
  autoStartOverlay: boolean;
  lipSyncSensitivity: number;
}

export interface AdbConnectionState {
  isConnected: boolean;
  ipAddress: string;
  port: string;
  pairingCode: string;
  connectionMode: 'wifi' | 'usb';
  logs: string[];
}
