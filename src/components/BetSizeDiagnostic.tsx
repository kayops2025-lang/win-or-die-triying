import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  DollarSign,
  RefreshCw,
  Layers,
  ArrowRight,
  Info,
  Flame,
  Eye,
  Coins,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';
import { SLOT_GAMES_DATABASE } from '../data/slotGames';

export function BetSizeDiagnostic() {
  const [activeSubTab, setActiveSubTab] = useState<'compare' | 'trap' | 'jackpot-extra' | 'plan'>('compare');
  const [depositAmount, setDepositAmount] = useState<number>(100);
  const [highBetSize, setHighBetSize] = useState<number>(2.00);
  const [lowBetSize, setLowBetSize] = useState<number>(0.20);
  const [selectedGameId, setSelectedGameId] = useState<string>('huff-n-puff-hard-hat');

  // Interactive Bet-Level Simulator demonstration
  const [simulatedBetLevel, setSimulatedBetLevel] = useState<'0.20' | '1.00' | '2.00'>('0.20');

  const activeGame = SLOT_GAMES_DATABASE.find(g => g.id === selectedGameId);
  const avgBonusSpins = activeGame?.bonusAvgSpins || 140;
  const gameRtp = activeGame?.baseRtp || 96.00;
  const probPerSpin = 1 / avgBonusSpins;

  // High bet statistics
  const highSpins = highBetSize > 0 ? Math.floor(depositAmount / highBetSize) : 0;
  const highZeroBonusProb = Math.pow(1 - probPerSpin, highSpins) * 100;
  const highAtLeastOneBonusProb = 100 - highZeroBonusProb;
  const highExpectedMinutes = (highSpins * 4) / 60;

  // Low bet ($0.20) statistics
  const lowSpins = lowBetSize > 0 ? Math.floor(depositAmount / lowBetSize) : 0;
  const lowZeroBonusProb = Math.pow(1 - probPerSpin, lowSpins) * 100;
  const lowAtLeastOneBonusProb = 100 - lowZeroBonusProb;
  const lowExpectedBonuses = (lowSpins / avgBonusSpins);
  const lowExpectedMinutes = (lowSpins * 4) / 60;

  const mockBetStates = {
    '0.20': {
      coinsAccumulated: 8,
      meterFill: 75,
      statusDesc: '8 marcos/monedas guardadas en nivel $0.20',
      payoutScale: 'Premios escalados a apuesta de $0.20'
    },
    '1.00': {
      coinsAccumulated: 1,
      meterFill: 10,
      statusDesc: '1 moneda guardada (estado casi vacío)',
      payoutScale: 'Premios escalados a apuesta de $1.00'
    },
    '2.00': {
      coinsAccumulated: 0,
      meterFill: 0,
      statusDesc: '0 monedas (máquina limpia a $2.00)',
      payoutScale: 'Premios escalados a apuesta de $2.00'
    }
  };

  return (
    <div className="space-y-3">
      {/* Top Mobile Segmented Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'compare' as const, label: '⚖️ $1-$2 vs 20¢' },
          { id: 'trap' as const, label: '🪤 Trampa Botes' },
          { id: 'jackpot-extra' as const, label: '💰 +20¢ Jackpot' },
          { id: 'plan' as const, label: '📋 Plan AP' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex-1 py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-rose-500 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: LIVE COMPARISON $1-$2 vs $0.20 */}
      {activeSubTab === 'compare' && (
        <div className="space-y-3">
          {/* Quick Alert Banner */}
          <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-3 text-xs">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Diagnóstico: Infracapitalización Crítica</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Con un depósito de ${depositAmount}, jugar a $1 o $2 solo compra {highSpins} giros. Como los bonos salen cada ~{avgBonusSpins} giros, el <strong className="text-rose-400">{highZeroBonusProb.toFixed(0)}% de las veces</strong> quebrarás sin ver ni un solo bonus.
            </p>
          </div>

          {/* Compact Input Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white">Simular Depósito</span>
              <div className="flex gap-1.5">
                {[50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDepositAmount(amt)}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      depositAmount === amt
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Monto Depositado</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1.5 text-slate-500 font-mono text-xs">$</span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Math.max(10, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-6 pr-2 py-1.5 text-xs text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Juego Activo</label>
                <select
                  value={selectedGameId}
                  onChange={(e) => setSelectedGameId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white truncate"
                >
                  {SLOT_GAMES_DATABASE.filter(g => g.userPlayed).map(game => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Direct Head-to-Head Cards */}
          <div className="space-y-2">
            {/* High Bet Card */}
            <div className="bg-slate-900 border border-rose-900/60 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-rose-900/40 pb-1.5">
                <span className="font-bold text-rose-400 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Apuesta Alta: ${highBetSize.toFixed(2)} / tiro
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  Quiebra Rápida
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center font-mono py-1">
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Tiradas</span>
                  <span className="text-sm font-bold text-rose-400">{highSpins}</span>
                </div>
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Tiempo</span>
                  <span className="text-sm font-bold text-white">~{Math.round(highExpectedMinutes)}m</span>
                </div>
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Sin Bono</span>
                  <span className="text-sm font-bold text-rose-400">{highZeroBonusProb.toFixed(0)}%</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-rose-950/30 p-2 rounded-lg leading-relaxed">
                🔴 <strong>En {highSpins} giros</strong> es matemáticamente casi seguro que tu saldo llegue a $0.00 antes de que el ciclo aleatorio dispare la bonificación.
              </div>
            </div>

            {/* Low Bet Card */}
            <div className="bg-slate-900 border border-emerald-900/60 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-1.5">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Apuesta Micro: ${lowBetSize.toFixed(2)} / tiro
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Supervivencia AP
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center font-mono py-1">
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Tiradas</span>
                  <span className="text-sm font-bold text-emerald-400">{lowSpins}</span>
                </div>
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Tiempo</span>
                  <span className="text-sm font-bold text-white">~{Math.round(lowExpectedMinutes)}m</span>
                </div>
                <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">Ver Bono</span>
                  <span className="text-sm font-bold text-emerald-400">{lowAtLeastOneBonusProb.toFixed(0)}%</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-300 bg-emerald-950/30 p-2 rounded-lg leading-relaxed">
                🟢 <strong>Con {lowSpins} giros</strong> tienes un {lowAtLeastOneBonusProb.toFixed(0)}% de probabilidad de activar bonos (~{lowExpectedBonuses.toFixed(1)} bonos en promedio). Tu saldo tiene margen para soportar rachas negativas.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: THE ACCUMULATION TRAP ACROSS BET SIZES */}
      {activeSubTab === 'trap' && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                La Regla de Oro AP
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                ¿Puedo acumular a 20¢ y subir a $1 o $2 para cobrar?
              </h3>
              <p className="text-xs text-rose-300 font-medium mt-1">
                ❌ <strong>¡NO! Cada apuesta tiene una memoria totalmente separada.</strong>
              </p>
            </div>

            {/* Interactive Demo */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  Prueba el selector de apuesta:
                </span>
                <div className="flex gap-1">
                  {(['0.20', '1.00', '2.00'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSimulatedBetLevel(lvl)}
                      className={`px-2 py-1 text-[11px] font-mono rounded font-bold transition-all cursor-pointer ${
                        simulatedBetLevel === lvl
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      ${lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* State Meter Box */}
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Memoria de la Ranura:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {mockBetStates[simulatedBetLevel].coinsAccumulated} marcas acumuladas
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${mockBetStates[simulatedBetLevel].meterFill}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-300 font-medium">
                  {mockBetStates[simulatedBetLevel].statusDesc}
                </div>
              </div>

              <div className="text-[11px] text-rose-300/90 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/40 leading-relaxed">
                ⚠️ Si gastas $20 llenando marcos en <em>Scarab</em> a $0.20 y luego cambias a $1.00, la máquina <strong>reinicia la pantalla a cero marcos</strong>. El casino no permite transferir progreso entre denominaciones.
              </div>
            </div>

            {/* 3 Laws of Persistent Slots */}
            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-400 block text-[11px]">1. Construir desde cero es -EV:</strong>
                <p className="text-slate-400 text-[10px] mt-0.5 leading-relaxed">
                  Girar desde cero para engordar cerdos o acumular monedas te cuesta el 4-6% de la ventaja de la casa. Los profesionales solo juegan cuando la máquina ya quedó llena por otro jugador.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-400 block text-[11px]">2. Cuándo SÍ usar $0.20:</strong>
                <p className="text-slate-400 text-[10px] mt-0.5 leading-relaxed">
                  Para liquidar bonos de rollover 1x (FanDuel/DraftKings) o para cazar multiplicadores masivos de 100,000x a 300,000x en Nolimit City sin arriesgar tu saldo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: THE +20¢ EXTRA JACKPOT WAGER (FANDUEL / DRAFTKINGS / MEGA FIRE BLAZE) */}
      {activeSubTab === 'jackpot-extra' && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Auditoría de Apuesta Secundaria
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                ¿Vale la pena activar los +20¢ extra de Jackpot en FanDuel & DraftKings?
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                La matemática detrás de la apuesta progresiva opcional de $0.20.
              </p>
            </div>

            {/* Breakdown Card */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-xs">Análisis de Costo / Varianza</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Varianza Extrema
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
                <p>
                  <strong>1. En una apuesta base de $0.20:</strong> Sumarle +$0.20 de jackpot eleva tu tiro a <strong>$0.40</strong>. El <strong>50% de tu dinero por giro</strong> se va directamente a una lotería con probabilidad de 1 en 500,000 giros. Esto dobla la velocidad con la que tu depósito se desvanece en rachas secas.
                </p>
                <p>
                  <strong>2. En una apuesta de $0.50 (Mega Fire Blaze):</strong> La apuesta secundaria sigue siendo $0.20 (total $0.70). Aquí representa el 28% de tu costo. Los premios de Fire Blaze escalan con la apuesta base de $0.50, mientras que el jackpot progresivo paga una cifra fija independiente de tu apuesta.
                </p>
                <p>
                  <strong>3. Veredicto Matemático:</strong> Solo activa los +20¢ cuando el jackpot acumulado haya superado su umbral de valor esperado positivo (+EV), o si juegas por recreación pura sabiendo que es una donación de varianza. Para moler saldo o hacer rollover, <strong>apaga siempre los 20¢ extra</strong>.
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Base $0.20 + 20¢ Jackpot</span>
                <span className="text-sm font-bold text-rose-400">$0.40 total</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">50% costo en lotería</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Solo Base $0.20 (Limpio)</span>
                <span className="text-sm font-bold text-emerald-400">$0.20 total</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">100% al RTP del juego</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ACTION PLAN */}
      {activeSubTab === 'plan' && (
        <div className="space-y-2 text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4" />
              <span>Reglas de Oro para Proteger Tu Saldo</span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-white block">1. Regla de 250+ Unidades</strong>
                <p className="text-slate-400 mt-0.5">
                  Con $100 depositados, tu tiro máximo debe ser <strong>$0.20 a $0.40</strong>. Solo sube a $1.00 si tu saldo supera los $500.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-white block">2. No "engordes" botes tú mismo</strong>
                <p className="text-slate-400 mt-0.5">
                  Si un juego acumulativo está en cero, no lo juegues esperando llenarlo. Juega slots de alto RTP fijo (superior al 96.5%) como <em>Coffee Explosion</em> o <em>Blood Suckers</em>.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-white block">3. Retira tu depósito tras un buen bono</strong>
                <p className="text-slate-400 mt-0.5">
                  Si tu depósito de $100 sube a $160, retira tus $100 de inmediato. Juega únicamente con las ganancias para blindar tu bolsillo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
