import React, { useState, useMemo } from 'react';
import { HelpCircle, Play, RotateCcw, AlertTriangle, CheckCircle, BarChart3, Clock, Zap } from 'lucide-react';
import { SLOT_GAMES_DATABASE } from '../data/slotGames';

export function SpinProbabilityAnalysis() {
  const [selectedGameId, setSelectedGameId] = useState<string>('huff-n-puff-hard-hat');
  const [customFrequency, setCustomFrequency] = useState<number>(140);
  const [targetSpins, setTargetSpins] = useState<number>(140);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<{
    totalSpins: number;
    bonusHits: number[];
    longestDrySpell: number;
    currentDrySpell: number;
  } | null>(null);

  const activeGame = SLOT_GAMES_DATABASE.find(g => g.id === selectedGameId);
  const baseFrequency = selectedGameId === 'custom' ? customFrequency : (activeGame?.bonusAvgSpins || 140);
  const probPerSpin = 1 / baseFrequency;

  // Cumulative geometric probability: P(hit in <= N spins) = 1 - (1 - p)^N
  const cumulativeProbabilityAtTarget = useMemo(() => {
    return (1 - Math.pow(1 - probPerSpin, targetSpins)) * 100;
  }, [probPerSpin, targetSpins]);

  // Key milestones
  const milestones = useMemo(() => {
    const list = [25, 50, 100, Math.round(baseFrequency), Math.round(baseFrequency * 2), Math.round(baseFrequency * 3)];
    // deduplicate
    const unique = Array.from(new Set(list)).sort((a, b) => a - b);
    return unique.map(spins => {
      const prob = (1 - Math.pow(1 - probPerSpin, spins)) * 100;
      const drySpellProb = Math.pow(1 - probPerSpin, spins) * 100;
      return {
        spins,
        probHit: prob,
        probDrySpell: drySpellProb,
        isMean: spins === Math.round(baseFrequency)
      };
    });
  }, [baseFrequency, probPerSpin]);

  // Run a fast Monte Carlo session of 300 spins
  const runMonteCarloSimulation = () => {
    setIsSimulating(true);
    const spins = 300;
    const bonusHits: number[] = [];
    let longestDry = 0;
    let currentDry = 0;

    for (let i = 1; i <= spins; i++) {
      const rand = Math.random();
      if (rand < probPerSpin) {
        bonusHits.push(i);
        if (currentDry > longestDry) longestDry = currentDry;
        currentDry = 0;
      } else {
        currentDry++;
      }
    }
    if (currentDry > longestDry) longestDry = currentDry;

    setTimeout(() => {
      setSimulationLog({
        totalSpins: spins,
        bonusHits,
        longestDrySpell: longestDry,
        currentDrySpell: currentDry
      });
      setIsSimulating(false);
    }, 150);
  };

  return (
    <div className="space-y-8">
      {/* Educational Banner addressing user question */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Análisis Estadístico</span>
              <span>·</span>
              <span>Desmitificando el RNG</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              ¿Se puede predecir al menos a los cuántos giros va a pagar?
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
              <strong>La respuesta corta y matemática es NO:</strong> el generador de números aleatorios (RNG) de FanDuel y DraftKings no tiene memoria ni "acumula ganas de pagar". Si una máquina lleva 200 giros sin activar el bono, la probabilidad del siguiente giro es exactamente la misma que la del primer giro.
            </p>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
              <strong>Lo que SÍ podemos calcular:</strong> la <span className="text-amber-300 font-medium">Distribución Geométrica Acumulada</span>. Esta fórmula nos revela con precisión milimétrica la probabilidad de sufrir rachas de sequía de 100, 200 o 400 giros, lo que determina el tamaño exacto de bankroll necesario para no quebrar.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shrink-0 text-xs text-slate-300 space-y-1.5 self-start">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px]">La Falacia del Jugador</span>
            <div className="flex items-center gap-1.5 text-rose-400 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>"Ya lleva 150 tiros, ya le toca"</span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-xs leading-normal">
              Falso: a la media teórica (ej. 140 giros), el <strong>36.7%</strong> de las veces aún no habrá caído ningún bono.
            </p>
          </div>
        </div>
      </div>

      {/* Probability Calculator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
          <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
            Parámetros del Juego & Frecuencia
          </h3>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Seleccionar Slot para Analizar
            </label>
            <select
              value={selectedGameId}
              onChange={(e) => {
                setSelectedGameId(e.target.value);
                const g = SLOT_GAMES_DATABASE.find(x => x.id === e.target.value);
                if (g && g.bonusAvgSpins) {
                  setCustomFrequency(g.bonusAvgSpins);
                  setTargetSpins(g.bonusAvgSpins);
                }
              }}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white font-medium focus:border-amber-500 focus:outline-none"
            >
              <optgroup label="Tus Juegos Frecuentes">
                {SLOT_GAMES_DATABASE.filter(g => g.userPlayed).map(game => (
                  <option key={game.id} value={game.id}>
                    {game.name} (~{game.hitFrequencyApprox})
                  </option>
                ))}
              </optgroup>
              <option value="custom">Frecuencia Personalizada...</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Frecuencia Promedio Teórica (1 en cada N giros)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                max="500"
                value={baseFrequency}
                onChange={(e) => {
                  setSelectedGameId('custom');
                  setCustomFrequency(Math.max(10, Number(e.target.value)));
                }}
                className="w-32 bg-slate-950 border border-slate-750 rounded-lg px-3 py-1.5 text-xs text-amber-300 font-mono font-semibold focus:border-amber-500 focus:outline-none"
              />
              <span className="text-xs text-slate-400">
                giros de media (Probabilidad por giro: {(probPerSpin * 100).toFixed(3)}%)
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-slate-400 font-medium">
                Evaluar ventana de giros: <span className="text-white font-mono font-semibold">{targetSpins} giros</span>
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {((targetSpins / baseFrequency)).toFixed(1)}x de la media
              </span>
            </div>
            <input
              type="range"
              min="10"
              max={Math.max(500, baseFrequency * 3)}
              step="5"
              value={targetSpins}
              onChange={(e) => setTargetSpins(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-950 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>10 giros</span>
              <span>{Math.round(baseFrequency)} giros (Media)</span>
              <span>{Math.round(baseFrequency * 3)} giros (3x)</span>
            </div>
          </div>

          {/* Current Target Probability Result */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">
              Probabilidad Acumulada a {targetSpins} Giros
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-amber-400">
                {cumulativeProbabilityAtTarget.toFixed(1)}%
              </span>
              <span className="text-xs text-slate-400">de ver $\ge 1$ bono</span>
            </div>
            <div className="mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-2 flex justify-between">
              <span>Riesgo de Sequía Cero Bonos:</span>
              <span className="font-mono text-rose-400 font-semibold">
                {(100 - cumulativeProbabilityAtTarget).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Table & Mathematical Curve (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3 mb-4">
              Tabla de Probabilidad Acumulada vs Riesgo de Sequía
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="py-2 font-medium">Volumen de Giros</th>
                    <th className="py-2 font-medium">Probabilidad de Activar (%)</th>
                    <th className="py-2 font-medium text-right">Riesgo de Sequía Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {milestones.map((m) => (
                    <tr
                      key={m.spins}
                      className={m.isMean ? 'bg-amber-500/10 text-amber-200' : 'text-slate-300 hover:bg-slate-950/40'}
                    >
                      <td className="py-2.5 flex items-center gap-1.5 font-medium">
                        <span>{m.spins} giros</span>
                        {m.isMean && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">
                            Media
                          </span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-amber-400 h-full rounded-full"
                              style={{ width: `${Math.min(100, m.probHit)}%` }}
                            />
                          </div>
                          <span>{m.probHit.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-medium text-slate-400">
                        {m.probDrySpell.toFixed(1)}% ({m.probDrySpell > 20 ? 'Frecuente' : m.probDrySpell > 5 ? 'Posible' : 'Raro'})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong className="text-white block mb-1">Conclusión para la Gestión de Bankroll:</strong>
            Para soportar la varianza normal sin quebrar, tu bankroll debe contar con suficiente saldo para absorber al menos <strong>3 veces la media de giros</strong> del juego (~{Math.round(baseFrequency * 3)} giros). Jugar con un presupuesto de solo 50 giros en una máquina de 140 giros de media es una garantía matemática de ruina en más del 70% de las sesiones.
          </div>
        </div>
      </div>

      {/* Real-Time Monte Carlo Session Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">
                Simulador Monte Carlo de Sesión Real (300 Giros Consecutivos)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Observa cómo se agrupan los bonos en una sesión simulada en tiempo real según la probabilidad real de {activeGame?.name || 'la máquina'}.
            </p>
          </div>

          <button
            onClick={runMonteCarloSimulation}
            disabled={isSimulating}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto cursor-pointer"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulando 300 Giros...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ejecutar Simulación de Sesión</span>
              </>
            )}
          </button>
        </div>

        {simulationLog ? (
          <div className="space-y-5">
            {/* Simulation Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Giros Totales:</span>
                <span className="text-lg font-bold font-mono text-white">{simulationLog.totalSpins}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Bonos Activados:</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {simulationLog.bonusHits.length} bonos
                </span>
                <span className="text-[10px] text-slate-500 block">
                  (Media teórica: {(simulationLog.totalSpins / baseFrequency).toFixed(1)})
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Racha Máx. Sin Bonos (Sequía):</span>
                <span className={`text-lg font-bold font-mono ${simulationLog.longestDrySpell > baseFrequency * 1.5 ? 'text-rose-400' : 'text-amber-300'}`}>
                  {simulationLog.longestDrySpell} giros
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Varianza de la Sesión:</span>
                <span className="text-lg font-bold font-mono text-white">
                  {simulationLog.bonusHits.length >= Math.round(simulationLog.totalSpins / baseFrequency)
                    ? 'Positiva (+V)'
                    : 'Negativa (-V)'}
                </span>
              </div>
            </div>

            {/* Visual Spin Timeline */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-medium">
                <span>Línea Temporal de la Sesión (Giro 1 al 300):</span>
                <span>
                  {simulationLog.bonusHits.length > 0
                    ? `Bonos en giros: #${simulationLog.bonusHits.join(', #')}`
                    : '¡Cero bonos en toda la sesión! (Sequía brutal)'}
                </span>
              </div>
              <div className="h-6 w-full bg-slate-950 border border-slate-800 rounded-lg p-1 flex gap-0.5 overflow-hidden">
                {Array.from({ length: 300 }).map((_, idx) => {
                  const spinNum = idx + 1;
                  const isHit = simulationLog.bonusHits.includes(spinNum);
                  return (
                    <div
                      key={idx}
                      title={isHit ? `¡Bono en giro #${spinNum}!` : `Giro #${spinNum}`}
                      className={`flex-1 h-full rounded-xs transition-colors ${
                        isHit ? 'bg-emerald-400 ring-1 ring-emerald-300 z-10' : 'bg-slate-850 hover:bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>Giro #1</span>
                <span>Giro #150</span>
                <span>Giro #300</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400">
            Haz clic en <strong className="text-white">"Ejecutar Simulación de Sesión"</strong> para generar una muestra de 300 giros y ver empíricamente cómo se distribuyen las rachas y sequías de bonus.
          </div>
        )}
      </div>
    </div>
  );
}
