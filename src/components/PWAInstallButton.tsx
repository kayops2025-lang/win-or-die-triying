import React, { useState } from 'react';
import { Smartphone, X, Check, Copy, ExternalLink, AlertTriangle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const STANDALONE_APP_URL = 'https://ais-pre-jqpqfhj5qxkvdcglk5eyji-498741471479.us-west2.run.app';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, isAndroid, isInIframe, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(STANDALONE_APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (isInstalled) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <Check className="w-3 h-3" />
        <span>Instalada</span>
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          if (isInstallable && !isInIframe) {
            install();
          } else {
            setShowGuide(true);
          }
        }}
        className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-xs transition-all whitespace-nowrap cursor-pointer"
        title="Instalar en tu Android"
      >
        <Smartphone className="w-3 h-3" />
        <span>Instalar</span>
      </button>

      {/* Guide Modal for Android */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl text-slate-200 space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Instalar en tu Android</h3>
                  <span className="text-[10px] text-slate-400">PWA Nativo sin AI Studio</span>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation of why AI Studio was being installed instead */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-[11px] text-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>¿Por qué se descargaba AI Studio?</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Porque estabas en la página <code className="bg-slate-950 px-1 py-0.2 rounded text-amber-300">aistudio.google.com</code>. Los 3 puntos de Chrome instalan la página que aparece en la barra superior de direcciones (AI Studio), en lugar de la slot app que está adentro.
              </p>
              <p className="text-white font-semibold pt-1">
                Para instalar <strong>Win Or Die</strong>, solo debes abrir su enlace directo en una pestaña limpia de Chrome:
              </p>
            </div>

            {/* Big Action: Open directly in Chrome */}
            <a
              href={STANDALONE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 text-center"
            >
              <span>Abrir App en Pestaña Nueva de Chrome</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Direct URL Box & Copy Button */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-400 block font-medium">
                O copia el enlace directo:
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  readOnly
                  value={STANDALONE_APP_URL}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-300 font-mono truncate select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                    copied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  }`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-1.5 text-[11px]">
              <span className="font-bold text-white block">
                Una vez abierta en la pestaña nueva:
              </span>
              <ol className="space-y-1.5 text-slate-300">
                <li className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-slate-850">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Toca los <strong>3 puntos (⋮)</strong> en la esquina de Chrome.
                  </span>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-slate-850">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Verás <strong className="text-emerald-400">"Instalar aplicación"</strong> (con el nombre e icono de <em>Win Or Die</em>).
                  </span>
                </li>

                <li className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-slate-850">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Confirma y se añadirá como app nativa completa a tu pantalla de inicio.
                  </span>
                </li>
              </ol>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
