export interface GuidePillar {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  realEvStatus: 'Imbatible (+EV)' | 'Condicional (+EV)' | 'Defensivo (+EV)' | 'Falacia (-EV)';
  mathematicalFormula?: string;
  explanation: string[];
  tactics: {
    rule: string;
    description: string;
  }[];
}

export const AP_PILLARS: GuidePillar[] = [
  {
    id: 'persistent-banking',
    title: 'Pilar 1: Slots de Estado Persistente (Banking Slots)',
    subtitle: 'El único método físico/digital donde una slot supera el 100% de RTP por giro',
    summary: 'Aprovechar máquinas abandonadas por otros jugadores donde acumuladores, marcos de comodines o botes Must-Hit-By están al borde del gatillo.',
    realEvStatus: 'Condicional (+EV)',
    mathematicalFormula: 'RTP_actual = RTP_base + [(Valor_Jackpot - Punto_Disparo) / Tiradas_Restantes_Esperadas] > 100%',
    explanation: [
      'Los jugadores recreativos suelen abandonar las máquinas tras gastar su presupuesto sin saber que dejaron un "estado avanzado".',
      'En botes Must-Hit-By (por ejemplo, "Debe caer antes de $500"): a medida que el bote se acerca a $500 (digamos $496), la probabilidad condicionada por giro se dispara. La ganancia matemática neta esperada supera el costo de cada tirada.',
      'En juegos de ciclo cerrado (como Scarab o Golden Egyptian con ciclos de 10 giros): si alguien abandona en el giro 8 con 5 marcos dorados en pantalla, el costo de girar 2 veces es insignificante comparado con el valor de la explosión de comodines en el giro 10.',
      'Diferencia clave: Cuidado con las "ilusiones visuales" (Multi-Pot) de cerdos alcancía o lámparas (como Piggy Prizes o Mystery of the Lamp). En muchos de estos juegos el tamaño del cerdo es solo una animación gráfica y no un medidor de estado estrictamente predecible.'
    ],
    tactics: [
      {
        rule: 'Machine Scouting Activo',
        description: 'En casinos físicos o al cambiar de juego en online, inspeccionar siempre el estado visual de la pantalla antes de apostar el primer centavo.'
      },
      {
        rule: 'Regla del Giro 7-9 en Scarab',
        description: 'Jugar únicamente ciclos de Scarab si la máquina está en giro 7, 8 o 9 con al menos 4 marcos dorados fijados.'
      },
      {
        rule: 'Límite de Abandono Estricto',
        description: 'Una vez cobrado el jackpot o concluido el ciclo de 10 giros, ABANDONAR la máquina de inmediato: el RTP vuelve a su estado negativo base (~95%).'
      }
    ]
  },
  {
    id: 'bonus-rollover',
    title: 'Pilar 2: La Ecuación del Rollover de Bonos (Casino Matched Betting)',
    subtitle: 'Subsidiar la ventaja de la casa con dinero promocional de FanDuel y DraftKings',
    summary: 'La fórmula matemática exacta que convierte promociones de bienvenida y drops de saldo en ganancia esperada positiva comprobable.',
    realEvStatus: 'Imbatible (+EV)',
    mathematicalFormula: 'EV_Neto = Bono - [Requisito_Apuesta × (1 - RTP_Juego)]',
    explanation: [
      'FanDuel y DraftKings compiten ferozmente en mercados regulados de EE.UU. (NJ, PA, MI, WV, etc.) ofreciendo promociones con requisitos de apuesta asombrosamente bajos (1x o 5x rollover).',
      'Si FanDuel te regala $100 con 1x de rollover: tu requisito de apuesta es $100.',
      'Si juegas una slot como Blood Suckers (98.00% RTP) o Coffee Explosion (96.52% RTP), la ventaja de la casa es del 2.00% o 3.48% respectivamente.',
      'Tu pérdida matemática esperada en $100 apostados al 96.52% es de solo $3.48. El valor esperado neto (EV) es: $100 - $3.48 = +$96.52 en tu bolsillo.',
      'No necesitas predecir nada ni vencer al RNG: el subsidio del casino paga con creces el house edge.'
    ],
    tactics: [
      {
        rule: 'Priorizar Rollover 1x a 5x',
        description: 'Cualquier bono con rollover superior a 25x en slots tiene EV negativo o riesgo excesivo de ruina.'
      },
      {
        rule: 'Selección de Slots de Máximo RTP',
        description: 'Ejecutar siempre el rollover en las slots con RTP más alto permitido en los términos del bono (como Blood Suckers 98%, Coffee Explosion 96.52% o Sweet Bonanza 96.48%).'
      },
      {
        rule: 'Tamaño de Apuesta Micro (Baja Varianza)',
        description: 'Apostar montos pequeños ($0.20 - $0.50 por tiro) para completar el rollover rápidamente minimizando la varianza y asegurando el valor esperado.'
      }
    ]
  },
  {
    id: 'rtp-ranges',
    title: 'Pilar 3: Detección de Rangos de RTP Ocultos (RTP Ranges)',
    subtitle: 'La ventaja defensiva: nunca regales un 2% de tu dinero por pereza de leer la tabla de ayuda',
    summary: 'Los proveedores venden slots con múltiples perfiles matemáticos. Aprende a auditar el RTP real configurado en tu cuenta de FanDuel o DraftKings.',
    realEvStatus: 'Defensivo (+EV)',
    mathematicalFormula: 'Diferencia_Margen = (RTP_Optimo - RTP_Degradado) × Volumen_Apostado',
    explanation: [
      'Empresas como Pragmatic Play, Play\'n GO, IGT o NetEnt no venden un juego fijo: venden un software con selectores de retorno (por ejemplo: 96.48%, 95.50%, 94.50% o hasta 91%).',
      'Por qué FanDuel y DraftKings casi siempre tienen los mejores RTPs: Al tener economías de escala masivas y millones de usuarios en deportes y casino, prefieren ofrecer el RTP máximo (ej. Sweet Bonanza al 96.48%) para fidelizar a los jugadores, a diferencia de casinos online offshore o casinos físicos.',
      'Sin embargo, un casino puede cambiar silenciosamente una versión. Un 2% de diferencia significa perder $20 extra por cada $1,000 en volumen de juego.',
      'El Advantage Player abre SIEMPRE el ícono de interrogación (?) o información (i) antes de apostar el primer centavo.'
    ],
    tactics: [
      {
        rule: 'Protocolo de los 10 Segundos',
        description: 'Abrir el juego > Tocar (?) o (i) > Deslizar al pie de la página de reglas > Verificar el número decimal exacto del RTP.'
      },
      {
        rule: 'Regla del 96.00% Umbral',
        description: 'Si un juego en online tiene menos del 95.50% de RTP, descártalo a menos que tenga un bote acumulativo extraordinariamente cargado.'
      }
    ]
  }
];

export const CASINO_COMPARISON_DATA = {
  title: '¿Por qué FanDuel y DraftKings pagan mejores RTPs que los Casinos Físicos?',
  reasons: [
    {
      factor: 'Costos de Estructura y Suelo',
      retail: 'Un casino físico en Las Vegas o Atlantic City gasta cientos de millones en bienes raíces, electricidad gigantesca, mantenimiento y licencias hoteleras.',
      online: 'FanDuel y DraftKings operan en la nube (servidores AWS/GCP). El costo marginal de un giro adicional es cercano a cero.',
      impact: 'En físico necesitan recuperar costes con RTPs agresivos del 88% al 92%. Online pueden operar cómodamente al 96% - 98%.'
    },
    {
      factor: 'Nómina y Empleados',
      retail: 'Miles de empleados: crupieres, camareros, guardias de seguridad, técnicos de máquinas, supervisores de sala, personal de limpieza.',
      online: 'Un equipo centralizado de software y soporte técnico atiende a millones de usuarios simultáneos.',
      impact: 'Menor costo laboral = menor margen de casa requerido para ser rentable.'
    },
    {
      factor: 'Competencia a un Clic de Distancia',
      retail: 'Una vez que un jugador entra a un casino físico, el costo de cambiar de casino es alto (transporte, estacionamiento).',
      online: 'El usuario tiene FanDuel, DraftKings, BetMGM y Caesars en la misma pantalla del móvil. Si un casino degrada su RTP, el usuario migra en 3 segundos.',
      impact: 'FanDuel y DraftKings compiten agresivamente manteniendo los tiers superiores de RTP ofrecidos por los desarrolladores.'
    },
    {
      factor: 'Conversión de Apuestas Deportivas (Sportsbook Cross-Sell)',
      retail: 'Viven casi exclusivamente de la retención del suelo de casino.',
      online: 'FanDuel y DraftKings ganan miles de millones en apuestas deportivas (NFL, NBA, MLB). Utilizan el casino online como producto de retención secundaria, lo que les permite ofrecer promociones con 1x rollover imposibles en físico.',
      impact: 'Promociones regulares con +EV real disponibles semanalmente.'
    }
  ]
};
