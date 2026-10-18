import React from 'react';
import { User, Store, Terminal, Settings } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, cartCount = 0 }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'model2d',
      label: 'Modelo 2D',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'store',
      label: 'Loja',
      icon: (
        <div className="relative">
          <Store className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      ),
    },
    {
      id: 'adb',
      label: 'ADB',
      icon: (
        <div className="relative flex items-center justify-center">
          <Terminal className="w-5 h-5" />
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-100 shrink-0 z-30 select-none">
      {/* 4 Navigation Buttons */}
      <div className="grid grid-cols-4 items-center px-2 pt-2 pb-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 mb-0.5">
                {tab.icon}
              </div>
              <span className="text-[11px] leading-tight tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
              {/* Active Indicator Bar as seen in the mock */}
              {isActive && (
                <div className="w-8 h-[2.5px] bg-blue-600 rounded-full mt-1 animate-in fade-in zoom-in duration-200" />
              )}
              {!isActive && <div className="w-8 h-[2.5px] mt-1 opacity-0" />}
            </button>
          );
        })}
      </div>

      {/* Android Home Gesture Pill */}
      <div className="w-full flex justify-center pb-2 pt-1">
        <div className="w-32 h-1 bg-slate-800/60 rounded-full" />
      </div>
    </div>
  );
};
