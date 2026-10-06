import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Flame,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight,
  X,
  ExternalLink,
  Info,
  DollarSign,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { SLOT_GAMES_DATABASE, SlotGame } from '../data/slotGames';

interface SurebetSlotFeedProps {
  onOpenCalculator: (game: SlotGame) => void;
}

export function SurebetSlotFeed({ onOpenCalculator }: SurebetSlotFeedProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGameForSheet, setSelectedGameForSheet] = useState<SlotGame | null>(null);

  const filterChips = [
    { id: 'all', label: '🔥 Todo +EV', count: SLOT_GAMES_DATABASE.length },
    { id: 'ap-s', label: '⭐ Grado S (+EV Alto)', count: SLOT_GAMES_DATABASE.filter(g => g.apScore === 'S').length },
    { id: 'red-tiger', label: '🦁 Red Tiger (Permanente)', count: SLOT_GAMES_DATABASE.filter(g => g.advantageType === 'Desbloqueo Permanente (Red Tiger)').length },
    { id: 'nolimit', label: '⚡ Nolimit (150k-300k)', count: SLOT_GAMES_DATABASE.filter(g => g.advantageType === 'Multiplicador Extremo (Nolimit)').length },
    { id: 'rollover', label: '🛡️ Rollover 1x (>97%)', count: SLOT_GAMES_DATABASE.filter(g => g.baseRtp >= 97.0).length },
    { id: 'cycles', label: '🔄 Ciclos (Scarab/Regal)', count: SLOT_GAMES_DATABASE.filter(g => g.advantageType === 'Ciclo Fijo (Wild Frames)').length },
    { id: 'fanduel', label: '🔵 FanDuel', count: SLOT_GAMES_DATABASE.filter(g => g.casinos.includes('FanDuel')).length },
    { id: 'draftkings', label: '🟢 DraftKings', count: SLOT_GAMES_DATABASE.filter(g => g.casinos.includes('DraftKings')).length },
    { id: 'borgata', label: '🟣 Borgata', count: SLOT_GAMES_DATABASE.filter(g => g.casinos.includes('Borgata')).length }
  ];

  const filteredGames = useMemo(() => {
    return SLOT_GAMES_DATABASE.filter((game) => {
      // Search
      const matchesSearch =
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.scoutingNotes.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Filter
      if (activeFilter === 'all') return true;
      if (activeFilter === 'ap-s') return game.apScore === 'S';
      if (activeFilter === 'red-tiger') return game.advantageType === 'Desbloqueo Permanente (Red Tiger)';
      if (activeFilter === 'nolimit') return game.advantageType === 'Multiplicador Extremo (Nolimit)';
      if (activeFilter === 'rollover') return game.baseRtp >= 97.0;
      if (activeFilter === 'cycles') return game.advantageType === 'Ciclo Fijo (Wild Frames)';
      if (activeFilter === 'fanduel') return game.casinos.includes('FanDuel');
      if (activeFilter === 'draftkings') return game.casinos.includes('DraftKings');
      if (activeFilter === 'borgata') return game.casinos.includes('Borgata');

      return true;
    }).sort((a, b) => {
      // Prioritize S rank then RTP
      const scoreOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };
      if (scoreOrder[b.apScore] !== scoreOrder[a.apScore]) {
        return scoreOrder[b.apScore] - scoreOrder[a.apScore];
      }
      return b.baseRtp - a.baseRtp;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-3">
      {/* Search & Counter Micro Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar slot (ej. Scarab, Primate, 98%)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-2 rounded-xl shrink-0">
          {filteredGames.length} slots
        </span>
      </div>

      {/* Horizontal Filter Chips Carousel (Surebet style) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-xl whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeFilter === chip.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* The Surebet Compact Feed Cards */}
      <div className="space-y-2">
        {filteredGames.map((game) => {
          const isBad = game.baseRtp < 95.0;
          const isTop = game.baseRtp >= 96.5 || game.apScore === 'S';

          return (
            <div
              key={game.id}
              onClick={() => setSelectedGameForSheet(game)}
              className="bg-slate-900/95 border border-slate-800/90 hover:border-slate-700 active:bg-slate-850 rounded-xl p-3 text-xs transition-all cursor-pointer shadow-sm relative overflow-hidden"
            >
              {/* Top Row: Title + Casino Badges + EV/RTP Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-white text-xs truncate max-w-[200px] xs:max-w-[240px]">
                      {game.name}
                    </span>
                    {/* Casino Badges */}
                    <div className="flex items-center gap-1">
                      {game.casinos.map((c) => (
                        <span
                          key={c}
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            c === 'FanDuel'
                              ? 'bg-blue-950 text-blue-400 border border-blue-900/40'
                              : c === 'DraftKings'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/40'
                              : c === 'Borgata'
                              ? 'bg-purple-950 text-purple-300 border border-purple-900/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-900/40'
                          }`}
                        >
                          {c === 'FanDuel' ? 'FD' : c === 'DraftKings' ? 'DK' : c === 'Borgata' ? 'BORG' : 'MGM'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {game.provider} · {game.advantageType}
                  </div>
                </div>

                {/* Big Right Pill (Surebet Style) */}
                <div className="text-right shrink-0">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded-lg border ${
                      game.apScore === 'S'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : isTop
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : isBad
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {game.baseRtp.toFixed(2)}% RTP
                  </span>
                  <span className="block text-[9px] font-mono font-bold text-slate-400 mt-0.5">
                    Grado AP: {game.apScore}
                  </span>
                </div>
              </div>

              {/* Middle 3-Column Metrics (Surebet Odds Style) */}
              <div className="grid grid-cols-3 gap-1.5 my-2 py-1.5 px-2 rounded-lg bg-slate-950/80 border border-slate-850 text-[10px] font-mono">
                <div>
                  <span className="text-slate-500 block text-[9px]">Apuesta AP:</span>
                  <span className="text-slate-200 font-bold">
                    {game.advantageType.includes('Nolimit') ? '$0.20 fijo' : '$0.20 - $0.40'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px]">Volatilidad:</span>
                  <span
                    className={`font-bold ${
                      game.volatility === 'Extrema'
                        ? 'text-rose-400'
                        : game.volatility === 'Baja'
                        ? 'text-emerald-400'
                        : 'text-amber-300'
                    }`}
                  >
                    {game.volatility}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[9px]">Frec. Bono:</span>
                  <span className="text-slate-300 truncate block">
                    {game.hitFrequencyApprox ? game.hitFrequencyApprox.replace(' giros', '') : 'RNG'}
                  </span>
                </div>
              </div>

              {/* Bottom Quick Advice Line */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                <p className="truncate text-slate-300 text-[11px] pr-2">
                  <span className="text-amber-400 font-bold mr-1">Táctica:</span>
                  {game.scoutingNotes}
                </p>
                <span className="text-amber-400 text-xs shrink-0 flex items-center">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* NATIVE MOBILE BOTTOM SHEET DRAWER */}
      {selectedGameForSheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full sm:max-w-lg max-h-[85vh] rounded-t-3xl sm:rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
            {/* Drawer Drag Handle */}
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      {selectedGameForSheet.name}
                    </h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {selectedGameForSheet.baseRtp.toFixed(2)}% RTP
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {selectedGameForSheet.provider} · {selectedGameForSheet.advantageType}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedGameForSheet(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="space-y-4 py-3 text-xs">
                {/* AP Notes */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-amber-400 font-bold block text-xs">
                    Consejo Táctico Advantage Play:
                  </span>
                  <p className="text-slate-200 leading-relaxed text-xs">
                    {selectedGameForSheet.scoutingNotes}
                  </p>
                </div>

                {/* Audit Instructions */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-blue-400 font-bold block text-xs flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    Cómo Auditar el RTP en el Casino:
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {selectedGameForSheet.howToCheckRtp}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                    <span className="text-slate-500 block text-[10px]">Volatilidad:</span>
                    <span className="text-white font-bold">{selectedGameForSheet.volatility}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                    <span className="text-slate-500 block text-[10px]">Frecuencia Bono:</span>
                    <span className="text-white font-bold">{selectedGameForSheet.hitFrequencyApprox || 'RNG puro'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const g = selectedGameForSheet;
                  setSelectedGameForSheet(null);
                  onOpenCalculator(g);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Calcular Bono</span>
              </button>
              <button
                onClick={() => setSelectedGameForSheet(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
