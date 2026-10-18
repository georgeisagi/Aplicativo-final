import React from 'react';
import { StatusBar } from './StatusBar';
import { BottomNav } from './BottomNav';
import { TabType, Orientation } from '../types';

interface DeviceFrameProps {
  orientation: Orientation;
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount: number;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  orientation,
  currentTab,
  onTabChange,
  cartCount,
  children,
}) => {
  const isLandscape = orientation === 'landscape';
  const isResponsive = orientation === 'responsive';

  if (isResponsive) {
    return (
      <div className="w-full h-full flex flex-col bg-white overflow-hidden shadow-2xl relative">
        <StatusBar />
        <div className="flex-1 w-full overflow-hidden relative">{children}</div>
        <BottomNav currentTab={currentTab} onTabChange={onTabChange} cartCount={cartCount} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-2 sm:p-6 w-full h-full">
      {/* Outer Phone Chassis */}
      <div
        className={`relative transition-all duration-500 ease-out bg-slate-900 p-2.5 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-4 border-slate-700/60 flex flex-col items-center justify-between overflow-hidden ${
          isLandscape
            ? 'w-[840px] max-w-[95vw] h-[400px] max-h-[85vh]' // 20:9 Landscape ratio
            : 'w-[380px] max-w-[95vw] h-[780px] max-h-[92vh]' // 9:20 Portrait ratio
        }`}
      >
        {/* Device Punch Hole Camera */}
        <div
          className={`absolute z-40 bg-black rounded-full pointer-events-none shadow-inner border border-slate-800 ${
            isLandscape
              ? 'left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5'
              : 'top-3.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5'
          }`}
        />

        {/* Device Screen Surface */}
        <div className="w-full h-full bg-white rounded-[34px] overflow-hidden flex flex-col relative shadow-inner">
          {/* Android Status Bar */}
          <StatusBar />

          {/* Screen Content Viewport */}
          <div className="flex-1 w-full overflow-hidden relative">
            {children}
          </div>

          {/* Android Bottom Navigation */}
          <BottomNav currentTab={currentTab} onTabChange={onTabChange} cartCount={cartCount} />
        </div>
      </div>
    </div>
  );
};
