import React, { useState } from 'react';
import { Target, AlertTriangle, CheckCircle2, Info, ChevronRight, Calculator, Sparkles } from 'lucide-react';

export function MustHitCalculator() {
  const [activeSubTool, setActiveSubTool] = useState<'must-hit' | 'scarab-cycles'>('must-hit');

  // Must-Hit-By inputs
  const [jackpotCap, setJackpotCap] = useState<number>(500);
  const [jackpotReset, setJackpotReset] = useState<number>(250);
  const [currentJackpot, setCurrentJackpot] = useState<number>(494.50);
  const [betPerSpin, setBetPerSpin] = useState<number>(1.00);
  const [baseRtp, setBaseRtp] = useState<number>(90.0);
  const [jackpotContribution, setJackpotContribution] = useState<number>(3.5);

  // Scarab / Cycle slot inputs
  const [cycleGame, setCycleGame] = useState<'scarab' | 'ocean-magic' | 'custom'>('scarab');
  const [currentSpinInCycle, setCurrentSpinInCycle] = useState<number>(8);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(10);
  const [collectedWildFrames, setCollectedWildFrames] = useState<number>(6);
  const [cycleBet, setCycleBet] = useState<number>(1.00);

  // Math calculation for Must-Hit-By:
  const dollarsRemainingToCap = Math.max(0.01, jackpotCap - currentJackpot);
  const dollarsPerSpinContrib = Math.max(0.001, betPerSpin * (jackpotContribution / 100));
  const maxSpinsUntilCap = Math.ceil(dollarsRemainingToCap / dollarsPerSpinContrib);
  const expectedSpinsToHit = Math.max(1, Math.ceil(maxSpinsUntilCap / 2));

  const expectedCostToHit = expectedSpinsToHit * betPerSpin;
  const baseGameReturn = expectedCostToHit * (baseRtp / 100);
  const expectedJackpotWon = (currentJackpot + jackpotCap) / 2;
  const totalExpectedReturn = baseGameReturn + expectedJackpotWon;
  const netExpectedValue = totalExpectedReturn - expectedCostToHit;
  const effectiveRtp = expectedCostToHit > 0 ? (totalExpectedReturn / expectedCostToHit) * 100 : baseRtp;

  const breakevenJackpot = Math.min(
    jackpotCap - 0.01,
    jackpotCap - (jackpotCap - jackpotReset) * ((100 - baseRtp) / 100) * 0.7
  );

  const isMustHitPositive = currentJackpot >= breakevenJackpot && effectiveRtp > 100;

  // Cycle calculation (e.g., Scarab):
  const remainingSpinsInCycle = Math.max(1, totalCycleLength - currentSpinInCycle + 1);
  const costToFinishCycle = remainingSpinsInCycle * cycleBet;
  const estimatedSpin10Payout = collectedWildFrames * (cycleBet * 0.45) * Math.min(6, 1 + collectedWildFrames * 0.35);
  const cycleNetEv = estimatedSpin10Payout - costToFinishCycle;
  const isCyclePositive = collectedWildFrames >= 4 && remainingSpinsInCycle <= 3;

  return (
    <div className="space-y-3">
      {/* Sub-tool switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex gap-1">
        <button
          onClick={() => setActiveSubTool('must-hit')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
            activeSubTool === 'must-hit'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🎯 Must-Hit-By
        </button>
        <button
          onClick={() => setActiveSubTool('scarab-cycles')}
          className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
            activeSubTool === 'scarab-cycles'
              ? 'bg-blue-600 text-white font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🔄 Ciclos Scarab (10 Giros)
        </button>
      </div>

      {/* SUB-TOOL 1: MUST-HIT-BY */}
      {activeSubTool === 'must-hit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="font-bold text-white text-xs">Botes con Límite de Caída (Must-Hit)</h3>
              <p className="text-[10px] text-slate-400">Punto de quiebre donde el RTP supera 100%</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setJackpotCap(500);
                  setJackpotReset(250);
                  setCurrentJackpot(494.50);
                  setBetPerSpin(1.00);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
              >
                $500 Cap
              </button>
              <button
                onClick={() => {
                  setJackpotCap(10000);
                  setJackpotReset(5000);
                  setCurrentJackpot(9850);
                  setBetPerSpin(3.00);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
              >
                $10k Cap
              </button>
            </div>
          </div>

          {/* Compact Inputs */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Tope Máximo ($)</label>
              <input
                type="number"
                value={jackpotCap}
                onChange={(e) => setJackpotCap(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Bote Actual en Pantalla ($)</label>
              <input
                type="number"
                step="0.5"
                value={currentJackpot}
                onChange={(e) => setCurrentJackpot(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Apuesta por Tiro ($)</label>
              <input
                type="number"
                step="0.2"
                value={betPerSpin}
                onChange={(e) => setBetPerSpin(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">RTP Base (%)</label>
              <input
                type="number"
                step="0.5"
                value={baseRtp}
                onChange={(e) => setBaseRtp(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Outcome Card */}
          <div className={`p-3 rounded-xl border space-y-2 ${
            isMustHitPositive ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Estado del Bote</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isMustHitPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {isMustHitPositive ? '✅ SUPERIOR AL 100% (+EV)' : '❌ ESPERAR (VENTAJA CASA)'}
              </span>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="text-[10px] text-slate-500 block">RTP Efectivo Actual:</span>
                <span className={`text-xl font-bold font-mono ${isMustHitPositive ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {effectiveRtp.toFixed(1)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Punto de Quiebre (+EV):</span>
                <span className="text-sm font-bold font-mono text-amber-400">
                  ${breakevenJackpot.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800/60 text-[10px] font-mono">
              <div className="bg-slate-900/60 p-1.5 rounded">
                <span className="text-slate-500 block">Tiradas Máx Restantes:</span>
                <span className="text-white font-bold">~{maxSpinsUntilCap} giros</span>
              </div>
              <div className="bg-slate-900/60 p-1.5 rounded">
                <span className="text-slate-500 block">EV Neto Estimado:</span>
                <span className={`font-bold ${netExpectedValue >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {netExpectedValue >= 0 ? `+$${netExpectedValue.toFixed(2)}` : `-$${Math.abs(netExpectedValue).toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TOOL 2: SCARAB CYCLES */}
      {activeSubTool === 'scarab-cycles' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="font-bold text-white text-xs">Scarab & Golden Egyptian (Ciclo 10 Giros)</h3>
              <p className="text-[10px] text-slate-400">En el giro 10 todos los marcos se vuelven comodines</p>
            </div>
            <span className="text-[10px] font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-900/40">
              Scouting AP
            </span>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Giro Actual en Pantalla</label>
              <input
                type="number"
                min="1"
                max="10"
                value={currentSpinInCycle}
                onChange={(e) => setCurrentSpinInCycle(Math.min(10, Math.max(1, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Marcos Dorados Acumulados</label>
              <input
                type="number"
                min="0"
                max="15"
                value={collectedWildFrames}
                onChange={(e) => setCollectedWildFrames(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold"
              />
            </div>
          </div>

          {/* Cycle Result Card */}
          <div className={`p-3 rounded-xl border space-y-2 ${
            isCyclePositive ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-slate-950 border-slate-800'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Veredicto de Scouting</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                isCyclePositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isCyclePositive ? '🎯 ESTADO FAVORABLE (+EV)' : '⏳ ESTADO NEUTRO / DÉBIL'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center font-mono py-1">
              <div className="bg-slate-900/60 p-1.5 rounded">
                <span className="text-[9px] text-slate-500 block">Faltan</span>
                <span className="font-bold text-white">{remainingSpinsInCycle} giros</span>
              </div>
              <div className="bg-slate-900/60 p-1.5 rounded">
                <span className="text-[9px] text-slate-500 block">Costo</span>
                <span className="font-bold text-white">${costToFinishCycle.toFixed(2)}</span>
              </div>
              <div className="bg-slate-900/60 p-1.5 rounded">
                <span className="text-[9px] text-slate-500 block">Premio Est.</span>
                <span className="font-bold text-emerald-400">~${estimatedSpin10Payout.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-900/50 p-2 rounded">
              {isCyclePositive ? (
                <>🟢 <strong>Jugar de inmediato:</strong> Con {collectedWildFrames} marcos en el giro {currentSpinInCycle}, solo necesitas invertir ${costToFinishCycle.toFixed(2)} para detonar una pantalla con comodines masivos en el giro 10.</>
              ) : (
                <>⚠️ <strong>Buscar otra máquina:</strong> No gastes giros armando marcos desde cero. Los APs solo juegan si encuentran la máquina abandonada a partir del giro 7 u 8 con al menos 4 marcos.</>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
