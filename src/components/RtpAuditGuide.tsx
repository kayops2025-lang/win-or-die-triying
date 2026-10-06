import React, { useState } from 'react';
import { Eye, HelpCircle, AlertTriangle, CheckCircle, Search, Building2, Smartphone, ArrowRight } from 'lucide-react';
import { CASINO_COMPARISON_DATA } from '../data/apGuides';

export function RtpAuditGuide() {
  const [activeTab, setActiveTab] = useState<'audit' | 'economics'>('audit');
  const [selectedCasino, setSelectedCasino] = useState<'FanDuel' | 'DraftKings'>('FanDuel');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              <span>Auditoría Técnica</span>
              <span>·</span>
              <span>Defensa Matemática</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Detección de Rangos de RTP Ocultos & Por Qué FanDuel/DK Pagan Más
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Los proveedores de juegos ofrecen a los casinos la misma slot con diferentes configuraciones de retorno (RTP Ranges). Descubre cómo auditar en 10 segundos la versión exacta instalada en tu cuenta.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'audit' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auditoría en App
            </button>
            <button
              onClick={() => setActiveTab('economics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'economics' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Online vs Casino Físico
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'audit' ? (
        <div className="space-y-8">
          {/* Interactive Step-by-Step Casino Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Steps (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-semibold text-white">Protocolo de Inspección en 10 Segundos</h3>
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setSelectedCasino('FanDuel')}
                    className={`px-2.5 py-1 text-xs font-medium rounded ${
                      selectedCasino === 'FanDuel' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    FanDuel Casino
                  </button>
                  <button
                    onClick={() => setSelectedCasino('DraftKings')}
                    className={`px-2.5 py-1 text-xs font-medium rounded ${
                      selectedCasino === 'DraftKings' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    DraftKings Casino
                  </button>
                </div>
              </div>

              {selectedCasino === 'FanDuel' ? (
                <div className="space-y-4 text-xs">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                      1
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Abre el juego dentro de FanDuel</strong>
                      <p className="text-slate-400 mt-0.5">
                        Inicia cualquier slot como <em>Sweet Bonanza</em>, <em>Huff N Puff</em> o <em>Coffee Explosion</em> en modo dinero real.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                      2
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Localiza el menú de Ayuda (?) o Información (i)</strong>
                      <p className="text-slate-400 mt-0.5">
                        En Pragmatic Play y Light & Wonder, está en la esquina inferior izquierda. En IGT, suele ser un botón con tres barras o un signo de interrogación en el margen superior/inferior.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                      3
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Desplázate a la última página ("Reglas del Juego")</strong>
                      <p className="text-slate-400 mt-0.5">
                        La ley estatal de juego de EE.UU. (DGE en Nueva Jersey, PGCB en Pennsylvania, MGCB en Michigan) OBLIGA por ley a mostrar el retorno exacto al jugador certificado.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30">
                      4
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Verifica la cifra exacta</strong>
                      <p className="text-slate-400 mt-0.5">
                        Busca el texto: <code className="text-emerald-300 font-mono">"El retorno teórico al jugador (RTP) es de XX.XX%"</code>. Si es inferior a 95.00%, descarta la máquina.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-emerald-500/30">
                      1
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Ficha del Juego en DraftKings</strong>
                      <p className="text-slate-400 mt-0.5">
                        Antes de pulsar "Play", en la app de DraftKings puedes pulsar el icono de información en la esquina de la miniatura para ver estadísticas del juego.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-emerald-500/30">
                      2
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Dentro del Juego: Menú de Ajustes / Paytable</strong>
                      <p className="text-slate-400 mt-0.5">
                        Abre las opciones del proveedor. En juegos exclusivos de DraftKings Games Studio (como Rocket o slots temáticas), el RTP está en la primera pantalla de reglas.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-emerald-500/30">
                      3
                    </span>
                    <div>
                      <strong className="text-white block font-medium">Audita la versión de Sweet Bonanza / IGT</strong>
                      <p className="text-slate-400 mt-0.5">
                        Confirma que Sweet Bonanza indique 96.48% y no 95.50% o 94.50%. DraftKings suele cargar la versión 96.48% en la mayoría de estados regulados.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Case Study Card (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3 mb-4">
                  Caso de Estudio Real: El Impacto de Sweet Bonanza
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Pragmatic Play suministra el juego más popular del mundo, <em>Sweet Bonanza</em>, en 3 versiones matemáticas distintas que el casino puede elegir al firmar el contrato:
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/60 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-emerald-300 block">Tier 1 (Óptimo — FanDuel & DK)</span>
                      <span className="text-[11px] text-slate-400">Ventaja de la casa: 3.52%</span>
                    </div>
                    <span className="text-base font-mono font-bold text-emerald-300">96.48% RTP</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-300 block">Tier 2 (Reducido — Casinos secundarios)</span>
                      <span className="text-[11px] text-slate-400">Ventaja de la casa: 4.50%</span>
                    </div>
                    <span className="text-base font-mono font-bold text-slate-300">95.50% RTP</span>
                  </div>

                  <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/40 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-rose-300 block">Tier 3 (Degradado — Sitios Offshore)</span>
                      <span className="text-[11px] text-slate-400">Ventaja de la casa: 5.50%</span>
                    </div>
                    <span className="text-base font-mono font-bold text-rose-400">94.50% RTP</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <strong className="text-white block mb-1">Impacto Financiero de la Diferencia (2.0%):</strong>
                  Por cada <span className="text-white font-mono">$1,000</span> de volumen jugado en apuestas combinadas, la versión degradada del 94.50% te quita <span className="text-rose-400 font-mono font-semibold">$20 adicionales</span> que habrían permanecido en tu saldo en la versión de FanDuel/DraftKings de 96.48%.
                </div>
              </div>

              <div className="text-[11px] text-slate-500 mt-4">
                * Consejo AP: Si abres un juego y ves que el casino lo tiene configurado en la versión de 94.50%, cierra la app inmediatamente y juega en la plataforma que ofrezca la versión de 96.48%.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Economics tab: Why online pays better */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASINO_COMPARISON_DATA.reasons.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <span className="text-xs font-semibold text-white">{item.factor}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30">
                    <span className="text-rose-400 font-bold block text-[11px] uppercase tracking-wider mb-0.5">
                      Casino Físico (Retail / Las Vegas)
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{item.retail}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                    <span className="text-emerald-400 font-bold block text-[11px] uppercase tracking-wider mb-0.5">
                      Online (FanDuel & DraftKings)
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{item.online}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400 block font-medium">Consecuencia Matemática:</span>
                  <p className="text-slate-200 mt-0.5 text-[11px] leading-relaxed">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real comparison banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-white">
                Ejemplo Legendario: Double Top Dollar & Pinball
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                En el Strip de Las Vegas o en Atlantic City, una máquina física de <em>Top Dollar</em> suele estar calibrada al <strong className="text-rose-400 font-mono">90.00% - 92.00%</strong> de retorno. En FanDuel y DraftKings online, la versión digital de IGT está programada al <strong className="text-emerald-400 font-mono">96.00%</strong>. Es una diferencia colosal del <strong className="text-white">+4% a +6% de RTP</strong> a favor del jugador.
              </p>
            </div>
            <div className="shrink-0 font-mono text-center p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block">Diferencia de Retorno</span>
              <span className="text-2xl font-bold text-emerald-400">+5.00% RTP</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">a favor de Online</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
