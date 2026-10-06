import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, TrendingDown, TrendingUp, DollarSign, Percent, Scale, ArrowDownRight } from 'lucide-react';

export function BankrollStrategy() {
  const [totalBankroll, setTotalBankroll] = useState<number>(500);
  const [betPerSpin, setBetPerSpin] = useState<number>(1.00);
  const [volatility, setVolatility] = useState<'Baja' | 'Media' | 'Alta' | 'Extrema'>('Alta');
  const [gameRtp, setGameRtp] = useState<number>(96.0);
  const [stopLossPercent, setStopLossPercent] = useState<number>(25); // 25% of bankroll per session
  const [takeProfitPercent, setTakeProfitPercent] = useState<number>(40); // 40% gain

  // Units
  const totalUnits = betPerSpin > 0 ? Math.floor(totalBankroll / betPerSpin) : 0;

  // Minimum recommended units based on slot volatility standard deviation:
  // Low: 300 units, Med: 500 units, High: 1000 units, Extreme: 1500 units
  const minRecommendedUnits = {
    Baja: 300,
    Media: 500,
    Alta: 1000,
    Extrema: 1800
  }[volatility];

  const safeMaxBet = totalBankroll / minRecommendedUnits;

  // Risk of Ruin approximation based on units vs required units:
  // If units < 25% of recommended -> >80% RoR
  // If units >= recommended -> <5% RoR
  const ratio = totalUnits / minRecommendedUnits;
  let estimatedRiskOfRuin = 0;
  if (ratio <= 0.1) estimatedRiskOfRuin = 98;
  else if (ratio <= 0.25) estimatedRiskOfRuin = 85;
  else if (ratio <= 0.5) estimatedRiskOfRuin = 52;
  else if (ratio <= 0.75) estimatedRiskOfRuin = 28;
  else if (ratio < 1.0) estimatedRiskOfRuin = 12;
  else if (ratio < 1.5) estimatedRiskOfRuin = 4;
  else estimatedRiskOfRuin = 1;

  // Session limits
  const sessionStopLossAmount = totalBankroll * (stopLossPercent / 100);
  const stopLossBalanceThreshold = Math.max(0, totalBankroll - sessionStopLossAmount);

  const sessionTakeProfitAmount = totalBankroll * (takeProfitPercent / 100);
  const takeProfitBalanceThreshold = totalBankroll + sessionTakeProfitAmount;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <span>Gestión de Capital AP</span>
              <span>·</span>
              <span>Risk of Ruin</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Estrategia Profesional de Bankroll para FanDuel & DraftKings
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Un jugador profesional nunca piensa en dólares, sino en <strong className="text-white">Unidades</strong>. La causa #1 de quiebra en slots no es el RTP del casino, sino el sobre-dimensionamiento de la apuesta (over-betting) frente a la volatilidad real del juego.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl shrink-0 self-start md:self-auto text-xs">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">Regla de Oro: Mínimo 500-1000 Unidades</span>
          </div>
        </div>
      </div>

      {/* Grid of Strategy Form & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-5">
          <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">
            Configuración de tu Presupuesto & Juego
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Bankroll Total Asignado ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  min="20"
                  step="50"
                  value={totalBankroll}
                  onChange={(e) => setTotalBankroll(Math.max(10, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg pl-7 pr-3 py-1.5 text-white font-mono font-medium focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Apuesta por Giro ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  min="0.10"
                  step="0.25"
                  value={betPerSpin}
                  onChange={(e) => setBetPerSpin(Math.max(0.10, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg pl-7 pr-3 py-1.5 text-white font-mono font-medium focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Volatilidad de la Slot</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Baja', 'Media', 'Alta', 'Extrema'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setVolatility(lvl)}
                  className={`py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    volatility === lvl
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {volatility === 'Baja' && 'Ej: Lemon Juice, Cash or Nothing (Premios constantes, oscilación baja)'}
              {volatility === 'Media' && 'Ej: Coffee Explosion, Double Top Dollar, Pinball (Equilibrio)'}
              {volatility === 'Alta' && 'Ej: Huff N Puff Hard Hat, Mystery of the Lamp, Breaking Bad (Sequías de 100-200 giros)'}
              {volatility === 'Extrema' && 'Ej: Sweet Bonanza (Sequías severas, todo el RTP concentrado en bonus esporádicos)'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Límite de Parada de Pérdida (Stop-Loss Sesión)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="50"
                  value={stopLossPercent}
                  onChange={(e) => setStopLossPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-1.5 text-rose-300 font-mono font-medium focus:border-rose-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 text-xs">% del bankroll</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Objetivo de Retiro (Stop-Win Sesión)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={takeProfitPercent}
                  onChange={(e) => setTakeProfitPercent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-1.5 text-emerald-300 font-mono font-medium focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-slate-500 text-xs">% de ganancia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output & Risk Analysis (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">
              <span>Auditoría de Salud de Bankroll</span>
              <span className="font-mono text-white">{totalUnits} Unidades Actuales</span>
            </div>

            {/* Risk of Ruin Meter */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Probabilidad Estimada de Ruina (Bancarrota):</span>
                <span
                  className={`font-mono font-bold text-sm ${
                    estimatedRiskOfRuin > 40
                      ? 'text-rose-400'
                      : estimatedRiskOfRuin > 15
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {estimatedRiskOfRuin}% {estimatedRiskOfRuin > 40 ? '(Peligro Crítico)' : estimatedRiskOfRuin > 15 ? '(Moderado)' : '(Zona Segura AP)'}
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    estimatedRiskOfRuin > 40
                      ? 'bg-rose-500'
                      : estimatedRiskOfRuin > 15
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, estimatedRiskOfRuin)}%` }}
                />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Unidades Recomendadas:</span>
                <span className="font-mono font-bold text-white text-base">
                  {minRecommendedUnits} giros
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Para volatilidad {volatility.toLowerCase()}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Apuesta Máx. Segura por Tiro:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">
                  ${safeMaxBet.toFixed(2)} / tiro
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {betPerSpin > safeMaxBet ? '⚠️ Estás sobreapostando' : '✓ Tamaño de apuesta óptimo'}
                </span>
              </div>
            </div>

            {/* Execution Thresholds */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <span className="text-slate-300 font-semibold block">Reglas de Salida Obligatorias para la Sesión:</span>
              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-rose-900/30">
                <div className="flex items-center gap-2 text-rose-300">
                  <TrendingDown className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>Stop-Loss (Cerrar sesión al llegar a):</span>
                </div>
                <span className="font-mono font-bold text-rose-400">
                  ${stopLossBalanceThreshold.toFixed(2)} (-${sessionStopLossAmount.toFixed(2)})
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-emerald-900/30">
                <div className="flex items-center gap-2 text-emerald-300">
                  <TrendingUp className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Stop-Win (Retirar beneficio al llegar a):</span>
                </div>
                <span className="font-mono font-bold text-emerald-400">
                  ${takeProfitBalanceThreshold.toFixed(2)} (+${sessionTakeProfitAmount.toFixed(2)})
                </span>
              </div>
            </div>
          </div>

          {/* Warning on Martingale and False AP Systems */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-rose-400">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>Advertencia AP: Por qué la Martingala es Suicidio Matemático</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Doblar la apuesta tras cada giro perdedor (Martingala) NO cambia la ventaja de la casa del juego. Debido a las rachas de sequía de 15 a 30 giros sin premios de valor en slots, la apuesta requerida crece exponencialmente ($1, $2, $4, $8, $16, $32, $64, $128, $256, $512...) hasta vaciar todo el bankroll o chocar contra el límite de mesa del casino.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
