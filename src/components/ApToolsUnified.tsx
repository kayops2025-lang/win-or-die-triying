import React, { useState } from 'react';
import { Target, Zap, Shield, Search } from 'lucide-react';
import { MustHitCalculator } from './MustHitCalculator';
import { SpinProbabilityAnalysis } from './SpinProbabilityAnalysis';
import { BankrollStrategy } from './BankrollStrategy';
import { RtpAuditGuide } from './RtpAuditGuide';

export function ApToolsUnified() {
  const [activeTool, setActiveTool] = useState<'must-hit' | 'spins' | 'bankroll' | 'rtp-audit'>('must-hit');

  const tools = [
    { id: 'must-hit' as const, label: '🎯 Must-Hit', icon: Target },
    { id: 'spins' as const, label: '🎲 Giros RNG', icon: Zap },
    { id: 'bankroll' as const, label: '🛡️ Bankroll', icon: Shield },
    { id: 'rtp-audit' as const, label: '🔍 Auditoría', icon: Search },
  ];

  return (
    <div className="space-y-3">
      {/* Top Segmented Navigation Pills (Surebet style) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-1 flex gap-1 overflow-x-auto no-scrollbar">
        {tools.map((t) => {
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render active tool exclusively so user doesn't scroll endlessly */}
      <div className="min-h-[500px]">
        {activeTool === 'must-hit' && <MustHitCalculator />}
        {activeTool === 'spins' && <SpinProbabilityAnalysis />}
        {activeTool === 'bankroll' && <BankrollStrategy />}
        {activeTool === 'rtp-audit' && <RtpAuditGuide />}
      </div>
    </div>
  );
}
