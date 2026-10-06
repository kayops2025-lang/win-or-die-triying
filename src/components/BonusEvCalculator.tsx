import React, { useState } from 'react';
import { DollarSign, ShieldAlert, Sparkles, TrendingUp, CheckCircle, ArrowRight, HelpCircle, Zap } from 'lucide-react';
import { SLOT_GAMES_DATABASE } from '../data/slotGames';

interface BonusPreset {
  id: string;
  casino: 'FanDuel' | 'DraftKings';
  name: string;
  bonusAmount: number;
  depositAmount: number;
  rollover: number;
  recommendedGameId: string;
}

const PRESETS: BonusPreset[] = [
  {
    id: 'fd-welcome',
    casino: 'FanDuel',
    name: 'FD $100 (1x)',
    bonusAmount: 100,
    depositAmount: 10,
    rollover: 1,
    recommendedGameId: 'coffee-explosion',
  },
  {
    id: 'fd-drop-20',
    casino: 'FanDuel',
    name: 'FD Drop $20 (1x)',
    bonusAmount: 20,
    depositAmount: 0,
    rollover: 1,
    recommendedGameId: 'sweet-bonanza',
  },
  {
    id: 'dk-match-100',
    casino: 'DraftKings',
    name: 'DK $100 Match (5x)',
    bonusAmount: 100,
    depositAmount: 100,
    rollover: 5,
    recommendedGameId: 'blood-suckers-netent',
  },
  {
    id: 'fd-play-again',
    casino: 'FanDuel',
    name: 'FD $500 Reembolso (1x)',
    bonusAmount: 500,
    depositAmount: 500,
    rollover: 1,
    recommendedGameId: 'blood-suckers-netent',
  }
];

export function BonusEvCalculator() {
  const [bonusAmount, setBonusAmount] = useState<number>(100);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [rolloverMultiplier, setRolloverMultiplier] = useState<number>(1);
  const [selectedGameId, setSelectedGameId] = useState<string>('coffee-explosion');
  const [customRtp, setCustomRtp] = useState<number>(96.52);
  const [betSizePerSpin, setBetSizePerSpin] = useState<number>(0.20);

  const activeGame = SLOT_GAMES_DATABASE.find(g => g.id === selectedGameId);
  const effectiveRtp = selectedGameId === 'custom' ? customRtp : (activeGame ? activeGame.baseRtp : 96.0);
  const houseEdge = (100 - effectiveRtp) / 100;

  const totalWageringRequired = bonusAmount * rolloverMultiplier;
  const expectedHouseLoss = totalWageringRequired * houseEdge;
  const netExpectedValue = bonusAmount - expectedHouseLoss;
  const spinsToComplete = betSizePerSpin > 0 ? Math.ceil(totalWageringRequired / betSizePerSpin) : 0;

  const handleSelectPreset = (preset: BonusPreset) => {
    setBonusAmount(preset.bonusAmount);
    setDepositAmount(preset.depositAmount);
    setRolloverMultiplier(preset.rollover);
    setSelectedGameId(preset.recommendedGameId);
    const game = SLOT_GAMES_DATABASE.find(g => g.id === preset.recommendedGameId);
    if (game) setCustomRtp(game.baseRtp);
  };

  return (
    <div className="space-y-3">
      {/* Preset Pills Carousel */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] whitespace-nowrap text-slate-300 hover:text-white shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${p.casino === 'FanDuel' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
            <span className="font-semibold">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Main Compact Input Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Calculadora de EV & Rollover
          </span>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Fórmula AP
          </span>
        </div>

        {/* 2-Column Inputs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Monto Bono ($)</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1.5 text-slate-500 font-mono text-xs">$</span>
              <input
                type="number"
                min="1"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-6 pr-2 py-1.5 text-xs text-white font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Rollover (Playthrough)</label>
            <div className="flex gap-1">
              {[1, 2, 5, 10].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRolloverMultiplier(r)}
                  className={`flex-1 py-1.5 text-[11px] font-mono rounded font-bold transition-all cursor-pointer ${
                    rolloverMultiplier === r
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slot Selection */}
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Slot para Rollover</label>
          <select
            value={selectedGameId}
            onChange={(e) => {
              setSelectedGameId(e.target.value);
              const g = SLOT_GAMES_DATABASE.find(x => x.id === e.target.value);
              if (g) setCustomRtp(g.baseRtp);
            }}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium"
          >
            <optgroup label="Tus Slots Favoritas">
              {SLOT_GAMES_DATABASE.filter(g => g.userPlayed).map(game => (
                <option key={game.id} value={game.id}>
                  {game.name} — {game.baseRtp.toFixed(2)}% RTP
                </option>
              ))}
            </optgroup>
            <optgroup label="Joyas AP > 96.5%">
              {SLOT_GAMES_DATABASE.filter(g => !g.userPlayed).map(game => (
                <option key={game.id} value={game.id}>
                  ★ {game.name} — {game.baseRtp.toFixed(2)}%
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Bet Size Quick Selector */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-400 font-medium">Tiro por Giro:</span>
          <div className="flex gap-1.5">
            {[0.20, 0.40, 0.50, 1.00].map((s) => (
              <button
                key={s}
                onClick={() => setBetSizePerSpin(s)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded font-bold cursor-pointer ${
                  betSizePerSpin === s
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                ${s.toFixed(2)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Immediate Math Result Card (No Scrolling Needed!) */}
      <div className={`border rounded-xl p-3.5 space-y-2.5 ${
        netExpectedValue > 0 ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-rose-950/20 border-rose-800/60'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Ganancia Matemática Esperada
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {effectiveRtp.toFixed(2)}% RTP
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className={`text-2xl font-black font-mono tracking-tight ${
            netExpectedValue > 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {netExpectedValue > 0 ? `+$${netExpectedValue.toFixed(2)}` : `-$${Math.abs(netExpectedValue).toFixed(2)}`}
          </span>
          <span className="text-[11px] font-bold text-emerald-400">
            {netExpectedValue > 0 ? '✅ 100% +EV REAL' : '❌ -EV (No Rentable)'}
          </span>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px] py-1 border-t border-slate-800/60">
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
            <span className="text-[9px] text-slate-500 block">Wagering</span>
            <span className="font-bold text-white">${totalWageringRequired}</span>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
            <span className="text-[9px] text-slate-500 block">Costo Casa</span>
            <span className="font-bold text-rose-400">-${expectedHouseLoss.toFixed(2)}</span>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
            <span className="text-[9px] text-slate-500 block">Tiradas</span>
            <span className="font-bold text-amber-400">~{spinsToComplete}</span>
          </div>
        </div>

        {/* Advice line */}
        <p className="text-[10px] text-slate-300 leading-relaxed bg-slate-950/60 p-2 rounded-lg">
          💡 En bonos 1x de FanDuel y DraftKings, el casino subsidia los ${bonusAmount}. Con giros de ${betSizePerSpin.toFixed(2)}, conviertes casi todo el bono en <strong>${netExpectedValue.toFixed(2)} en efectivo retirable</strong>.
        </p>
      </div>
    </div>
  );
}
