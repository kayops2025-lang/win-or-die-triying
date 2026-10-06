import React, { useState } from 'react';
import {
  Flame,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  Building2,
  Sparkles,
  TrendingUp,
  Skull,
  Coins,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Eye
} from 'lucide-react';

export function NolimitRedTigerResearch() {
  const [selectedSubTab, setSelectedSubTab] = useState<'traitors' | 'love-island' | 'red-tiger' | 'nolimit'>('traitors');
  const [nolimitBet, setNolimitBet] = useState<number>(0.20);

  return (
    <div className="space-y-3">
      {/* Compact Top Carousel Segmented Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'traitors' as const, label: '🎭 The Traitors (Borgata)' },
          { id: 'love-island' as const, label: '🏝️ Love Island (x15)' },
          { id: 'red-tiger' as const, label: '🦁 Red Tiger Desbloqueos' },
          { id: 'nolimit' as const, label: '⚡ Nolimit (300k x)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSubTab(tab.id)}
            className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
              selectedSubTab === tab.id
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: THE TRAITORS AUDIT (BORGATA CASINO) */}
      {selectedSubTab === 'traitors' && (
        <div className="space-y-2.5">
          {/* Main Audit Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs font-bold text-white">The Traitors: Faithful Riches</h3>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                    Borgata Exclusivo
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Games Global / Reality NBC</p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-sm font-bold text-rose-400">94.20% RTP</span>
                <span className="text-[9px] text-rose-400 block font-semibold">Ventaja Casa: 5.80%</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-400 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Veredicto AP: NO ES RENTABLE (-EV)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tiene un retorno de solo <strong>94.20%</strong>. Te quita <strong className="text-rose-400">$58 por cada $1,000 apostados</strong> (el doble que una slot normal). Esto ocurre porque deben pagar regalías millonarias a NBC por el nombre.
              </p>
            </div>

            {/* Alternatives at Borgata */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-white block">
                Alternativas en Borgata que SÍ pagan:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                <div className="p-2 rounded-lg bg-slate-950 border border-emerald-900/40">
                  <span className="font-bold text-white block truncate">Blood Suckers</span>
                  <span className="text-emerald-400 font-bold">98.00% RTP</span>
                  <span className="text-slate-500 block text-[9px]">+3.8% vs Traitors</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-emerald-900/40">
                  <span className="font-bold text-white block truncate">Starmania</span>
                  <span className="text-emerald-400 font-bold">97.87% RTP</span>
                  <span className="text-slate-500 block text-[9px]">Paga ambos lados</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-emerald-900/40">
                  <span className="font-bold text-white block truncate">White Rabbit</span>
                  <span className="text-emerald-400 font-bold">97.72% RTP</span>
                  <span className="text-slate-500 block text-[9px]">Megaways 248k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: LOVE ISLAND REAL VIBES CASE STUDY */}
      {selectedSubTab === 'love-island' && (
        <div className="space-y-2.5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Caso Real en FanDuel
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Estado Guardado
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mt-0.5">
                Love Island: 15 Giros & x15 Multiplicador ($0.50)
              </h3>
            </div>

            {/* 3 Indicators */}
            <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[9px] text-slate-500 block">Morado</span>
                <span className="text-xs font-bold text-purple-400">15 Giros</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[9px] text-slate-500 block">Dorado</span>
                <span className="text-xs font-bold text-amber-400">x15 Mult.</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[9px] text-slate-500 block">Rojo</span>
                <span className="text-xs font-bold text-rose-400">3/4 Gemas</span>
              </div>
            </div>

            {/* Tactical Advice */}
            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-xs space-y-1">
              <span className="font-bold text-amber-400 text-xs block">
                Cómo cobrar este estado guardado sin perder:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Tu máquina en FanDuel a $0.50 está cargadísima. <strong>NO deposites dinero real para cazarlo.</strong> Espera a recibir un bono o crédito semanal de $10 o $20 con 1x rollover de FanDuel y úsalo para disparar esta ronda con 15 giros a x15.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: RED TIGER PERMANENT UNLOCKS */}
      {selectedSubTab === 'red-tiger' && (
        <div className="space-y-2.5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Joyas de Scouting Online
              </span>
              <h3 className="text-xs font-bold text-white mt-0.5">
                Red Tiger: Slots con Desbloqueos Permanentes
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                El RTP base aumenta del 95.7% a más del 98.5% cuando los niveles están completos.
              </p>
            </div>

            {/* Games List */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">Primate King</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">3 Mejoras de Gorila</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Recolecta monedas doradas. En Nivel 3, el gorila es Wild apilado con multiplicadores acumulables permanentes.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">Dynamite Riches</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">4 Funciones de Mecha</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Al desbloquear los 4 cartuchos de dinamita, la mecha queda activada para siempre con multiplicadores x10 y mega wild 3x3.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-xs">Pirates' Plenty (The Sunken Treasure)</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">6° Rodillo Desbloqueado</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Al completar el mapa del tesoro, se abre permanentemente el 6° carrete, elevando el RTP a niveles +EV.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: NOLIMIT CITY MULTIPLIERS */}
      {selectedSubTab === 'nolimit' && (
        <div className="space-y-2.5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                Multiplicadores Descomunales
              </span>
              <h3 className="text-xs font-bold text-white mt-0.5">
                Nolimit City: Potencial de 150,000x a 300,000x
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Borgata, DraftKings y casinos online con las ganancias máximas más altas del mundo.
              </p>
            </div>

            {/* Nolimit Bet Math */}
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-300">Simular con Apuesta Mínima:</span>
                <span className="font-mono text-xs font-bold text-amber-400">$0.20</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Tombstone RIP</span>
                  <span className="text-xs font-bold text-rose-400">300,000x</span>
                  <span className="text-[10px] text-emerald-400 font-bold block">$60,000 max</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">San Quentin xWays</span>
                  <span className="text-xs font-bold text-rose-400">150,000x</span>
                  <span className="text-[10px] text-emerald-400 font-bold block">$30,000 max</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded leading-relaxed">
                💡 <strong>Por qué a 20¢ ganas en grande:</strong> En Nolimit City no necesitas apostar $2. Con solo $0.20, una conexión con multiplicador xNudge o xWays puede pagar $1,000, $5,000 o hasta $60,000, mientras mantienes tu riesgo de quiebra al mínimo.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
