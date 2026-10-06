import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Smartphone,
  Layers,
  Coins,
  Calculator,
  Compass,
  ArrowRight,
  Wifi,
  BatteryCharging,
  Signal
} from 'lucide-react';
import { SurebetSlotFeed } from './components/SurebetSlotFeed';
import { BetSizeDiagnostic } from './components/BetSizeDiagnostic';
import { NolimitRedTigerResearch } from './components/NolimitRedTigerResearch';
import { BonusEvCalculator } from './components/BonusEvCalculator';
import { ApToolsUnified } from './components/ApToolsUnified';
import { PWAInstallButton } from './components/PWAInstallButton';
import { SlotGame } from './data/slotGames';

type MobileTab = 'feed' | 'diagnostic' | 'research' | 'calculator' | 'tools';

export default function App() {
  const [activeTab, setActiveTab] = useState<MobileTab>('feed');
  const [currentTime, setCurrentTime] = useState<string>('09:41');
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenCalculatorWithGame = (game: SlotGame) => {
    setActiveTab('calculator');
  };

  return (
    <div className="min-h-screen bg-slate-950 sm:bg-slate-900 text-slate-100 flex items-center justify-center p-0 sm:p-3 selection:bg-amber-500/30 selection:text-amber-200">
      {/* 
        AUTHENTIC ANDROID VERTICAL SMARTPHONE SHELL
        - Formato vertical nativo para Android (390px - 430px)
        - En escritorio/tableta se enmarca como teléfono móvil real
        - En móvil real toma el 100% de la pantalla sin scroll horizontal
      */}
      <div className="w-full max-w-[430px] h-screen sm:h-[880px] sm:max-h-[96vh] bg-slate-950 sm:border-[8px] sm:border-slate-800/95 sm:rounded-[44px] sm:shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] flex flex-col overflow-hidden relative">
        
        {/* ANDROID SYSTEM STATUS BAR */}
        <div className="bg-slate-950 px-5 pt-2.5 pb-1 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none shrink-0 z-50">
          <span className="font-bold text-white text-[12px]">{currentTime}</span>
          
          {/* Punch-hole camera dot */}
          <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800/90 shadow-inner flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-slate-900" />
          </div>

          {/* Icons: 5G, Wi-Fi, Battery */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3 text-slate-300" />
            <Wifi className="w-3 h-3 text-slate-300" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold text-slate-200">98%</span>
              <div className="w-4 h-2 border border-slate-400 rounded-xs p-0.2 flex items-center">
                <div className="h-full w-full bg-emerald-400 rounded-2xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ANDROID COMPACT APP BAR (WIN OR DIE TRYING) */}
        <header className="bg-slate-950/95 border-b border-slate-850 px-3 py-2 flex items-center justify-between gap-2 shrink-0 z-40 backdrop-blur-md">
          <div
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-amber-500/20">
              W
            </div>
            <div>
              <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  WIN OR DIE TRYING
                </span>
                <span className="text-[8px] font-mono font-bold px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  +EV
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-medium leading-none block mt-0.5">
                FanDuel · DraftKings · Borgata
              </span>
            </div>
          </div>

          {/* Quick Actions (PWA install & Quick 1x Bono) */}
          <div className="flex items-center gap-1 shrink-0">
            <PWAInstallButton />
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Bono 1x</span>
            </button>
          </div>
        </header>

        {/* 
          SCROLLABLE CONTENT VIEWPORT (VERTICAL PHONE SCREEN)
          No lateral overflow, smooth touch scrolling
        */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-3 pb-24 space-y-3">
          {/* NOTICE IF RUNNING INSIDE AI STUDIO IFRAME */}
          {isInIframe && (
            <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border border-amber-500/50 rounded-xl p-2.5 text-xs text-amber-200 flex items-center justify-between gap-2 shadow-lg">
              <div className="min-w-0 flex items-center gap-2">
                <span className="text-base shrink-0">📲</span>
                <div>
                  <span className="font-bold text-white text-[11px] block leading-tight">
                    Para instalar Win Or Die en tu Android:
                  </span>
                  <span className="text-[10px] text-amber-300 block leading-tight">
                    Abre en Chrome para no descargar AI Studio
                  </span>
                </div>
              </div>
              <a
                href="https://ais-pre-jqpqfhj5qxkvdcglk5eyji-498741471479.us-west2.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[10px] shrink-0 cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
              >
                <span>Abrir en Chrome</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* TAB 1: SUREBET SLOT FEED (+EV RADAR) */}
          {activeTab === 'feed' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Radar +EV (Estilo Surebets)
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Por Grado AP & RTP
                </span>
              </div>

              <SurebetSlotFeed onOpenCalculator={handleOpenCalculatorWithGame} />
            </div>
          )}

          {/* TAB 2: $1-$2 vs 20c DIAGNOSTIC & TRAP */}
          {activeTab === 'diagnostic' && <BetSizeDiagnostic />}

          {/* TAB 3: CACERÍA (BORGATA, THE TRAITORS, NOLIMIT, RED TIGER, LOVE ISLAND) */}
          {activeTab === 'research' && <NolimitRedTigerResearch />}

          {/* TAB 4: CALCULATOR (EV & ROLLOVER) */}
          {activeTab === 'calculator' && <BonusEvCalculator />}

          {/* TAB 5: BOTES & HERRAMIENTAS AP (MUST-HIT, GIROS RNG, BANKROLL, AUDITORÍA) */}
          {activeTab === 'tools' && <ApToolsUnified />}
        </main>

        {/* 
          NATIVE ANDROID BOTTOM DOCK NAVIGATION
          5 touch tabs with hitboxes >= 48px, active glow and labels
        */}
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-slate-950/98 border-t border-slate-850 backdrop-blur-xl flex flex-col shadow-2xl safe-area-pb">
          <nav className="flex justify-around items-center px-1 pt-1.5 pb-1">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center text-[10px] font-semibold transition-all cursor-pointer active:scale-95 ${
                activeTab === 'feed' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-base leading-none ${activeTab === 'feed' ? 'scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''}`}>
                🎰
              </span>
              <span className="mt-1 tracking-tight">Slots +EV</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center text-[10px] font-semibold transition-all cursor-pointer active:scale-95 ${
                activeTab === 'diagnostic' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-base leading-none ${activeTab === 'diagnostic' ? 'scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' : ''}`}>
                🚨
              </span>
              <span className="mt-1 tracking-tight">$1 vs 20¢</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center text-[10px] font-semibold transition-all cursor-pointer active:scale-95 ${
                activeTab === 'research' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-base leading-none ${activeTab === 'research' ? 'scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : ''}`}>
                💎
              </span>
              <span className="mt-1 tracking-tight">Cacería</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center text-[10px] font-semibold transition-all cursor-pointer active:scale-95 ${
                activeTab === 'calculator' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-base leading-none ${activeTab === 'calculator' ? 'scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`}>
                ⚡
              </span>
              <span className="mt-1 tracking-tight">Bono 1x</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center text-[10px] font-semibold transition-all cursor-pointer active:scale-95 ${
                activeTab === 'tools' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`text-base leading-none ${activeTab === 'tools' ? 'scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}`}>
                🛡️
              </span>
              <span className="mt-1 tracking-tight">Botes & AP</span>
            </button>
          </nav>

          {/* ANDROID SYSTEM BOTTOM GESTURE PILL BAR */}
          <div className="py-1 flex items-center justify-center">
            <div className="w-28 h-1 bg-slate-600/70 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
