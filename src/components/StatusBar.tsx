import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface StatusBarProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const StatusBar: React.FC<StatusBarProps> = ({ className = '', theme = 'light' }) => {
  const [time, setTime] = useState('10:24');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const textColor = theme === 'dark' ? 'text-slate-100' : 'text-slate-800';

  return (
    <div className={`w-full px-5 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none z-30 ${textColor} ${className}`}>
      {/* Time */}
      <span className="tracking-tight text-[13px] font-bold">{time}</span>

      {/* Status Icons */}
      <div className="flex items-center gap-1.5 text-[11px]">
        {/* Signal Bars */}
        <div className="flex items-end gap-[1.5px] h-3 mr-0.5">
          <span className="w-[2.5px] h-1.5 bg-current rounded-xs opacity-90"></span>
          <span className="w-[2.5px] h-2 bg-current rounded-xs opacity-90"></span>
          <span className="w-[2.5px] h-2.5 bg-current rounded-xs opacity-90"></span>
          <span className="w-[2.5px] h-3 bg-current rounded-xs"></span>
        </div>

        {/* Wifi Icon */}
        <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />

        {/* Battery with percentage */}
        <div className="flex items-center gap-1">
          <Battery className="w-4 h-4 rotate-90" strokeWidth={2.5} />
          <span className="text-[11px] font-bold">100%</span>
        </div>
      </div>
    </div>
  );
};
