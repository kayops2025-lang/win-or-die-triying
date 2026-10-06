import React, { useState, useMemo } from 'react';
import { Search, Filter, ShieldCheck, AlertTriangle, ArrowUpDown, ChevronDown, ChevronUp, Info, ExternalLink, Sparkles } from 'lucide-react';
import { SLOT_GAMES_DATABASE, SlotGame } from '../data/slotGames';

interface GameCatalogProps {
  onSelectForBonusCalc?: (game: SlotGame) => void;
  onSelectForProbability?: (game: SlotGame) => void;
}

export function GameCatalog({ onSelectForBonusCalc, onSelectForProbability }: GameCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCasino, setSelectedCasino] = useState<'Todos' | 'FanDuel' | 'DraftKings' | 'Borgata' | 'BetMGM'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [onlyUserGames, setOnlyUserGames] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rtp-desc' | 'rtp-asc' | 'ap-score' | 'name'>('rtp-desc');
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  const categories = [
    'Todos',
    'Desbloqueo Permanente (Red Tiger)',
    'Multiplicador Extremo (Nolimit)',
    'Ciclo Fijo (Wild Frames)',
    'Rollover King (+EV Bono)',
    'High RTP Classic',
    'Multi-Pot Accumulator',
    'Estado Persistente (Banking)',
    'Standard Video Slot'
  ];

  const filteredGames = useMemo(() => {
    return SLOT_GAMES_DATABASE.filter((game) => {
      // Search
      const matchesSearch =
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.scoutingNotes.toLowerCase().includes(searchQuery.toLowerCase());

      // Casino
      const matchesCasino =
        selectedCasino === 'Todos' || game.casinos.includes(selectedCasino);

      // Category
      const matchesCategory =
        selectedCategory === 'Todos' || game.advantageType === selectedCategory;

      // User games toggle
      const matchesUserGames = !onlyUserGames || game.userPlayed;

      return matchesSearch && matchesCasino && matchesCategory && matchesUserGames;
    }).sort((a, b) => {
      if (sortBy === 'rtp-desc') return b.baseRtp - a.baseRtp;
      if (sortBy === 'rtp-asc') return a.baseRtp - b.baseRtp;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'ap-score') {
        const scoreOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };
        return scoreOrder[b.apScore] - scoreOrder[a.apScore];
      }
      return 0;
    });
  }, [searchQuery, selectedCasino, selectedCategory, onlyUserGames, sortBy]);

  const toggleExpand = (id: string) => {
    setExpandedGameId(expandedGameId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Catálogo de Tragamonedas FanDuel & DraftKings con RTP Verificado
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Incluye las 18 slots de tu lista y las joyas de Advantage Play (+EV) con especificaciones de retorno exactas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyUserGames(!onlyUserGames)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                onlyUserGames
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {onlyUserGames ? '✓ Mostrando tus 18 Slots' : 'Filtrar tus 18 Slots'}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre o proveedor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Casino Selector */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs overflow-x-auto">
            {(['Todos', 'FanDuel', 'DraftKings', 'Borgata', 'BetMGM'] as const).map((casino) => (
              <button
                key={casino}
                onClick={() => setSelectedCasino(casino)}
                className={`flex-1 py-1 px-2 rounded text-center whitespace-nowrap transition-colors ${
                  selectedCasino === casino
                    ? casino === 'FanDuel'
                      ? 'bg-blue-600 text-white font-medium'
                      : casino === 'DraftKings'
                      ? 'bg-emerald-600 text-white font-medium'
                      : casino === 'Borgata'
                      ? 'bg-purple-600 text-white font-medium'
                      : casino === 'BetMGM'
                      ? 'bg-amber-600 text-white font-medium'
                      : 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {casino}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Todos' ? 'Todas las Categorías AP' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="rtp-desc">Ordenar: Mayor RTP (Mejor Retorno)</option>
              <option value="rtp-asc">Ordenar: Menor RTP</option>
              <option value="ap-score">Ordenar: Potencial AP (S &gt; A &gt; B)</option>
              <option value="name">Ordenar: Nombre Alfabético</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Mostrando {filteredGames.length} de {SLOT_GAMES_DATABASE.length} tragamonedas auditadas</span>
        <span>Haz clic en cualquier juego para ver notas de AP y cómo auditar el RTP</span>
      </div>

      {/* Games List (High density, readable table/card hybrid) */}
      <div className="space-y-3">
        {filteredGames.map((game) => {
          const isExpanded = expandedGameId === game.id;
          const isHighRtp = game.baseRtp >= 96.0;
          const isLowRtp = game.baseRtp < 95.0;

          return (
            <div
              key={game.id}
              className={`bg-slate-900 border rounded-xl transition-all ${
                isExpanded ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Primary Row Header */}
              <div
                onClick={() => toggleExpand(game.id)}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              >
                {/* Title & Provider */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 border ${
                        game.apScore === 'S'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : game.apScore === 'A'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : game.apScore === 'B'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                      title={`Potencial Advantage Play: Grado ${game.apScore}`}
                    >
                      {game.apScore}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        {game.name}
                      </h3>
                      {game.userPlayed && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          Tu Lista
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>{game.provider}</span>
                      <span>·</span>
                      <span>Volatilidad {game.volatility}</span>
                      <span>·</span>
                      <span className="text-slate-300">{game.advantageType}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics and Status */}
                <div className="flex items-center gap-6 justify-between md:justify-end shrink-0 border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0">
                  {/* Casinos badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {game.casinos.map((c) => (
                      <span
                        key={c}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          c === 'FanDuel'
                            ? 'bg-blue-950 text-blue-400 border border-blue-900/50'
                            : c === 'DraftKings'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50'
                            : c === 'Borgata'
                            ? 'bg-purple-950 text-purple-300 border border-purple-900/50'
                            : 'bg-amber-950 text-amber-300 border border-amber-900/50'
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* RTP Display */}
                  <div className="text-right min-w-24">
                    <span className="text-[10px] text-slate-400 block">RTP Teórico</span>
                    <span
                      className={`text-lg font-mono font-bold ${
                        isHighRtp ? 'text-emerald-400' : isLowRtp ? 'text-rose-400' : 'text-slate-200'
                      }`}
                    >
                      {game.baseRtp.toFixed(2)}%
                    </span>
                  </div>

                  {/* Expand icon */}
                  <button
                    className="text-slate-400 hover:text-white p-1 rounded-md"
                    aria-label={isExpanded ? 'Contraer ficha' : 'Expandir ficha'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Detailed Intelligence Panel */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-950/40 text-xs space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                    {/* Column 1: AP Scouting */}
                    <div className="md:col-span-2 space-y-2">
                      <span className="text-slate-300 font-semibold block text-xs uppercase tracking-wider">
                        Análisis AP & Notas de Scouting:
                      </span>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {game.scoutingNotes}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-2 text-slate-400 text-[11px]">
                        <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">
                          Frecuencia Media de Bono: <strong className="text-white">{game.hitFrequencyApprox || 'N/A'}</strong>
                        </span>
                        {game.rtpRange.hasRanges && (
                          <span className="bg-amber-950/30 text-amber-300 px-2 py-1 rounded border border-amber-900/40">
                            Advertencia de Rangos: Existe de {game.rtpRange.min.toFixed(2)}% a {game.rtpRange.max.toFixed(2)}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Column 2: How to inspect in Casino */}
                    <div className="space-y-2 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                      <span className="text-amber-400 font-semibold block text-xs flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        Cómo Auditar en FanDuel / DK:
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {game.howToCheckRtp}
                      </p>

                      {/* Action buttons */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        {onSelectForBonusCalc && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectForBonusCalc(game);
                            }}
                            className="w-full text-center py-1.5 px-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-medium transition-colors cursor-pointer"
                          >
                            Usar en Calculadora de Bonos (+EV)
                          </button>
                        )}
                        {onSelectForProbability && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectForProbability(game);
                            }}
                            className="w-full text-center py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition-colors cursor-pointer"
                          >
                            Calcular Giros & Varianza
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredGames.length === 0 && (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs">
            No se encontraron tragamonedas que coincidan con los filtros seleccionados. Intenta restablecer los términos de búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
