import React, { useState, useEffect } from 'react';
import { ActiveModel } from '../types';
import { Sparkles, Move, Maximize2, RotateCw } from 'lucide-react';

interface RigVisualizerProps {
  activeModel: ActiveModel | null;
  aiActive: boolean;
  onOpenImport: () => void;
  orientation?: 'portrait' | 'landscape';
}

export const RigVisualizer: React.FC<RigVisualizerProps> = ({
  activeModel,
  aiActive,
  onOpenImport,
  orientation = 'portrait',
}) => {
  const [breathPhase, setBreathPhase] = useState(0);
  const [blink, setBlink] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Subtle breathing idle simulation
  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      setBreathPhase(Math.sin(elapsed * 2));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Subtle blink simulation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Voice lip-sync simulation when AI is active
  useEffect(() => {
    if (!aiActive) {
      setMouthOpen(false);
      return;
    }
    const talkInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 180);
    return () => clearInterval(talkInterval);
  }, [aiActive]);

  const scale = activeModel?.scale ?? 1;
  const opacity = activeModel?.opacity ?? 1;
  const posY = activeModel?.posY ?? 0;
  const posX = activeModel?.posX ?? 0;
  const rigColor = activeModel?.rigColor ?? '#3B82F6';

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Background Subtle Coordinate Grid for rigging precision */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #0F172A 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Model Canvas Container */}
      <div
        className="relative flex flex-col items-center justify-center transition-all duration-300"
        style={{
          transform: `translate(${posX}px, ${posY + breathPhase * 3}px) scale(${scale})`,
          opacity: opacity,
        }}
      >
        {activeModel?.customImageUrl ? (
          /* User Custom Uploaded Image / Sprite */
          <div className="relative group">
            <img
              src={activeModel.customImageUrl}
              alt="Modelo Personalizado"
              className="max-h-[360px] max-w-[280px] object-contain drop-shadow-xl rounded-2xl"
            />
            <div className="absolute inset-0 border-2 border-dashed border-blue-400/50 rounded-2xl pointer-events-none" />
          </div>
        ) : (
          /* Sleek Technical VTuber Wireframe / Rig Node Avatar (NO anime character) */
          <div className="relative flex flex-col items-center">
            {/* Rig Bounding Box with Anchor Corners */}
            <div className="relative w-64 h-80 rounded-2xl border border-slate-200/90 bg-white/40 backdrop-blur-xs flex flex-col items-center justify-between p-4 shadow-sm">
              {/* Corner Handles */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-blue-500 rounded-xs" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-xs" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-blue-500 rounded-xs" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-xs" />

              {/* Rig Header Meta */}
              <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-blue-600 font-semibold">
                  <Sparkles className="w-3 h-3" />
                  {activeModel ? activeModel.name : 'Rig 2D / VRM'}
                </span>
                <span>{activeModel ? activeModel.type : 'Live2D v4'}</span>
              </div>

              {/* Central Vector Geometric Rig Wireframe */}
              <div className="relative w-36 h-48 my-auto flex items-center justify-center">
                <svg
                  viewBox="0 0 160 200"
                  className="w-full h-full text-slate-700"
                  fill="none"
                  stroke="currentColor"
                >
                  {/* Outer Head Oval Wireframe */}
                  <ellipse
                    cx="80"
                    cy="65"
                    rx="42"
                    ry="50"
                    stroke={rigColor}
                    strokeWidth="1.8"
                    strokeDasharray="3 3"
                    className="opacity-70"
                  />

                  {/* Facial Crosshairs */}
                  <line
                    x1="80"
                    y1="25"
                    x2="80"
                    y2="105"
                    stroke={rigColor}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                  <line
                    x1="45"
                    y1="68"
                    x2="115"
                    y2="68"
                    stroke={rigColor}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />

                  {/* Left Eye Node */}
                  <g className="transition-transform duration-150">
                    <ellipse
                      cx="62"
                      cy="65"
                      rx="8"
                      ry={blink ? 1 : 7}
                      stroke={rigColor}
                      strokeWidth="2"
                      fill={blink ? 'none' : '#3B82F6'}
                      fillOpacity={blink ? 0 : 0.15}
                    />
                    <circle cx="62" cy="65" r="2.5" fill={rigColor} opacity={blink ? 0 : 0.8} />
                  </g>

                  {/* Right Eye Node */}
                  <g className="transition-transform duration-150">
                    <ellipse
                      cx="98"
                      cy="65"
                      rx="8"
                      ry={blink ? 1 : 7}
                      stroke={rigColor}
                      strokeWidth="2"
                      fill={blink ? 'none' : '#3B82F6'}
                      fillOpacity={blink ? 0 : 0.15}
                    />
                    <circle cx="98" cy="65" r="2.5" fill={rigColor} opacity={blink ? 0 : 0.8} />
                  </g>

                  {/* Mouth Rig Node (animates with AI talk simulation) */}
                  <path
                    d={
                      mouthOpen
                        ? 'M 72 88 Q 80 98 88 88 Z'
                        : 'M 74 89 Q 80 93 86 89'
                    }
                    stroke={rigColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill={mouthOpen ? rigColor : 'none'}
                    fillOpacity={mouthOpen ? 0.3 : 0}
                    className="transition-all duration-100"
                  />

                  {/* Neck & Body Rig Frame */}
                  <path
                    d="M 70 115 L 70 130 L 35 155 L 30 195 M 90 115 L 90 130 L 125 155 L 130 195"
                    stroke={rigColor}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    strokeOpacity="0.6"
                  />

                  {/* Center Torso Skeleton */}
                  <path
                    d="M 80 130 L 80 190"
                    stroke={rigColor}
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                  />
                  <line
                    x1="45"
                    y1="160"
                    x2="115"
                    y2="160"
                    stroke={rigColor}
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                  />

                  {/* Joint Keypoint Anchor Dots */}
                  <circle cx="35" cy="155" r="3" fill={rigColor} />
                  <circle cx="125" cy="155" r="3" fill={rigColor} />
                  <circle cx="80" cy="130" r="3" fill={rigColor} />
                  <circle cx="80" cy="65" r="2" fill={rigColor} />
                </svg>

                {/* AI Audio Wave Overlay if active */}
                {aiActive && (
                  <div className="absolute -bottom-3 flex items-center gap-1 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[9px] font-mono shadow-sm animate-pulse">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    Sincronia labial ativa
                  </div>
                )}
              </div>

              {/* Wireframe Rig Parameters Bar */}
              <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-mono">Nodes: 38</span>
                <span className="font-mono">FPS: 60</span>
                <span className="font-mono text-emerald-600">Sync: OK</span>
              </div>
            </div>

            {/* Quick Action to Change / Custom Model */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onOpenImport}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
              >
                Trocar modelo ou importar arquivo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
