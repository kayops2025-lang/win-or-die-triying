export interface SlotGame {
  id: string;
  name: string;
  provider: string;
  baseRtp: number;
  rtpRange: {
    min: number;
    max: number;
    hasRanges: boolean;
    standardVersion: string;
  };
  volatility: 'Baja' | 'Media-Baja' | 'Media' | 'Media-Alta' | 'Alta' | 'Muy Alta' | 'Extrema';
  casinos: ('FanDuel' | 'DraftKings' | 'Borgata' | 'BetMGM')[];
  advantageType:
    | 'Estado Persistente (Banking)'
    | 'Rollover King (+EV Bono)'
    | 'Multi-Pot Accumulator'
    | 'Ciclo Fijo (Wild Frames)'
    | 'High RTP Classic'
    | 'Desbloqueo Permanente (Red Tiger)'
    | 'Multiplicador Extremo (Nolimit)'
    | 'Standard Video Slot';
  apScore: 'S' | 'A' | 'B' | 'C' | 'D'; // S = Alta ventaja explotable, D = Sin ventaja AP
  hitFrequencyApprox?: string; // Frecuencia estimada de bonus
  bonusAvgSpins?: number;
  scoutingNotes: string;
  userPlayed: boolean; // Si fue listado por el usuario
  howToCheckRtp: string;
}

export const SLOT_GAMES_DATABASE: SlotGame[] = [
  {
    id: 'wolf-it-up-3-reeler',
    name: 'Wolf It Up! 3 Reeler',
    provider: 'Light & Wonder / Everi',
    baseRtp: 94.50,
    rtpRange: {
      min: 94.00,
      max: 95.00,
      hasRanges: true,
      standardVersion: '94.50% en FanDuel / DK'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Standard Video Slot',
    apScore: 'D',
    hitFrequencyApprox: '1 cada 110 giros',
    bonusAvgSpins: 110,
    scoutingNotes: 'RTP bajo (94.50%). Es un clásico de 3 carretes con alta volatilidad. No tiene estado acumulativo persistente para el jugador siguiente. No recomendado para rollover de bonos por su house edge del 5.50%.',
    userPlayed: true,
    howToCheckRtp: 'Abrir el juego > Menú hamburguesa > Reglas de pago > Desplazarse al pie: "El retorno teórico al jugador (RTP) es de 94.50%".'
  },
  {
    id: 'huff-n-puff-hard-hat',
    name: 'Huff N Puff Hard Hat',
    provider: 'Light & Wonder',
    baseRtp: 96.00,
    rtpRange: {
      min: 94.00,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00% en FanDuel'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 140 giros',
    bonusAvgSpins: 140,
    scoutingNotes: 'Famoso por los sombreros de construcción (Hard Hats) y marcos de paja/madera/ladrillo. En el juego base el sombrero que cae en el tejado es visualmente persistente pero funciona con disparador pseudo-acumulativo (RNG ponderado). Excelente RTP del 96.00% en online comparado con el 88-90% de casinos físicos.',
    userPlayed: true,
    howToCheckRtp: 'Menú ajustes de audio/info (?) > Game Rules > Desplazarse al final de la página.'
  },
  {
    id: 'breaking-bad-mega-fire-blaze',
    name: 'Breaking Bad Mega Fire Blaze',
    provider: 'Playtech',
    baseRtp: 95.87,
    rtpRange: {
      min: 93.50,
      max: 95.87,
      hasRanges: true,
      standardVersion: '95.87%'
    },
    volatility: 'Media-Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Standard Video Slot',
    apScore: 'C',
    hitFrequencyApprox: '1 cada 125 giros (Fire Blaze)',
    bonusAvgSpins: 125,
    scoutingNotes: 'Mecánica Mega Fire Blaze (Hold & Respin) con jackpots Mini, Minor, Major y Grand. No guarda símbolos en pantalla entre diferentes jugadores, el trigger es puro RNG por giro. RTP respetable pero no ofrece ventaja de banking.',
    userPlayed: true,
    howToCheckRtp: 'Presionar icono "i" > Deslizar hasta la página 6 (Game Rules) > Apartado "Return to Player".'
  },
  {
    id: 'coffee-explosion',
    name: 'Coffee Explosion',
    provider: 'Greentube / Slot Factory',
    baseRtp: 96.52,
    rtpRange: {
      min: 94.20,
      max: 96.52,
      hasRanges: true,
      standardVersion: '96.52% (Versión Óptima)'
    },
    volatility: 'Media',
    casinos: ['FanDuel'],
    advantageType: 'High RTP Classic',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 95 giros',
    bonusAvgSpins: 95,
    scoutingNotes: 'RTP sobresaliente de 96.52% (House Edge de solo 3.48%). Uno de los juegos más eficientes de tu lista para quemar rollover de bono de 1x en FanDuel con pérdida matemática mínima esperada ($3.48 por cada $100 apostados).',
    userPlayed: true,
    howToCheckRtp: 'Icono del engranaje / (?) > Tabla de pagos > Sección Legal / RTP.'
  },
  {
    id: 'piggy-prizes-railroad-rumble',
    name: 'Piggy Prizes: Railroad Rumble',
    provider: 'Incredible Technologies',
    baseRtp: 94.12,
    rtpRange: {
      min: 92.00,
      max: 94.12,
      hasRanges: true,
      standardVersion: '94.12%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'C',
    hitFrequencyApprox: '1 cada 160 giros',
    bonusAvgSpins: 160,
    scoutingNotes: 'Los cerdos alcancía crecen en pantalla. CUIDADO: La animación del cerdo engordando es principalmente cosmética (visual illusion), aunque cada moneda tiene una probabilidad independiente de reventar el bote. RTP bajo (94.12%), desventaja matemática de 5.88%.',
    userPlayed: true,
    howToCheckRtp: 'Botón Ayuda (?) > Reglas de Bote y RTP.'
  },
  {
    id: 'rumble-riches-haulin-gold',
    name: 'Rumble Riches: Haulin’ Gold',
    provider: 'Ainsworth / High5',
    baseRtp: 94.15,
    rtpRange: {
      min: 94.15,
      max: 95.00,
      hasRanges: false,
      standardVersion: '94.15%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Standard Video Slot',
    apScore: 'D',
    hitFrequencyApprox: '1 cada 150 giros',
    bonusAvgSpins: 150,
    scoutingNotes: 'Mecánica de vagones de oro. RTP de 94.15%, lo cual es relativamente bajo para slots online reguladas en FanDuel. Evitar para rollover de bonos.',
    userPlayed: true,
    howToCheckRtp: 'Menú principal del juego > Reglas de juego > Buscar "RTP: 94.15%".'
  },
  {
    id: 'piggy-prizes-wish-of-riches',
    name: 'Piggy Prizes: Wish of Riches 1/2',
    provider: 'Incredible Technologies',
    baseRtp: 96.05,
    rtpRange: {
      min: 94.00,
      max: 96.05,
      hasRanges: true,
      standardVersion: '96.05%'
    },
    volatility: 'Media-Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 130 giros',
    bonusAvgSpins: 130,
    scoutingNotes: 'A diferencia de Railroad Rumble (94.12%), esta variante tiene un RTP sustancialmente mejor del 96.05%. Son casi 2% más de retorno al jugador. Mecánica de lámpara mágica con cerdos acumuladores.',
    userPlayed: true,
    howToCheckRtp: 'Pestaña de información > Scroll al final de especificaciones matemáticas.'
  },
  {
    id: 'lemon-juice',
    name: 'Lemon Juice',
    provider: 'Slot Factory / Gaming Realms',
    baseRtp: 95.40,
    rtpRange: {
      min: 94.00,
      max: 95.40,
      hasRanges: true,
      standardVersion: '95.40% registrado'
    },
    volatility: 'Baja',
    casinos: ['FanDuel'],
    advantageType: 'Standard Video Slot',
    apScore: 'C',
    hitFrequencyApprox: '1 cada 75 giros (premios frecuentes)',
    bonusAvgSpins: 75,
    scoutingNotes: 'Juego estilo retro frutal. RTP registrado de 95.40%. Por su baja volatilidad, las ganancias son frecuentes pero pequeñas, amortiguando caídas rápidas de saldo.',
    userPlayed: true,
    howToCheckRtp: 'Menú lateral (?) > Información de la máquina > Tabla de pagos.'
  },
  {
    id: 'huff-n-puff-haunted-mansion',
    name: 'Huff N Puff Haunted Mansion',
    provider: 'Light & Wonder',
    baseRtp: 96.00,
    rtpRange: {
      min: 94.00,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 145 giros',
    bonusAvgSpins: 145,
    scoutingNotes: 'Evolución con temática de mansión embrujada. Mantiene el sólido RTP del 96.00% en las plataformas reguladas de FanDuel y DraftKings. Los marcos de las casas se acumulan durante los giros gratis.',
    userPlayed: true,
    howToCheckRtp: 'Ajustes > (?) Reglas completas > Línea final del documento de certificación GLI.'
  },
  {
    id: 'cash-or-nothing',
    name: 'Cash or Nothing',
    provider: 'Red Tiger',
    baseRtp: 95.71,
    rtpRange: {
      min: 92.70,
      max: 95.71,
      hasRanges: true,
      standardVersion: '95.71% (FD/DK default)'
    },
    volatility: 'Baja',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Standard Video Slot',
    apScore: 'C',
    hitFrequencyApprox: '1 cada 80 giros (Cash Spins)',
    bonusAvgSpins: 80,
    scoutingNotes: 'RTP registrado de 95.71%. Tiene función Cash Spins con símbolos que se bloquean en pantalla (Hold & Win) durante el bonus. Muy baja volatilidad, lo que estabiliza el bankroll.',
    userPlayed: true,
    howToCheckRtp: 'Botón de ayuda (?) en la esquina inferior izquierda > Pestaña "RTP y Volatilidad".'
  },
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    baseRtp: 96.48,
    rtpRange: {
      min: 94.50,
      max: 96.48,
      hasRanges: true,
      standardVersion: '96.48% (FanDuel/DK usan el tier superior)'
    },
    volatility: 'Extrema',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'High RTP Classic',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 200 giros (o compra de bono)',
    bonusAvgSpins: 200,
    scoutingNotes: 'CASO DE ESTUDIO DE RTP RANGES: Pragmatic Play ofrece este juego en versiones de 96.48%, 95.50% y 94.50%. FanDuel y DraftKings casi siempre cargan la versión de 96.48%. Cuidado: volatilidad extrema, requiere un bankroll de mínimo 500 a 1,000 unidades.',
    userPlayed: true,
    howToCheckRtp: 'Presionar "i" > Moverse a la última página de información > Texto final: "El RTP teórico de este juego es del 96.48%".'
  },
  {
    id: 'game-of-thrones',
    name: 'Game of Thrones (Ways / Lines)',
    provider: 'Microgaming / Slingshot',
    baseRtp: 95.07,
    rtpRange: {
      min: 94.80,
      max: 95.07,
      hasRanges: false,
      standardVersion: '95.07%'
    },
    volatility: 'Media-Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Standard Video Slot',
    apScore: 'D',
    hitFrequencyApprox: '1 cada 135 giros',
    bonusAvgSpins: 135,
    scoutingNotes: 'RTP registrado de 95.07% (versión 243 ways). No tiene ventajas de estado persistente. Las 4 casas (Baratheon, Lannister, Stark, Targaryen) ofrecen distintas combinaciones de giros y multiplicadores.',
    userPlayed: true,
    howToCheckRtp: 'Menú hamburguesa > "View Pays" > "Game Rules" > Al final de la página.'
  },
  {
    id: 'almighty-mustang-express',
    name: 'Almighty Mustang Express',
    provider: 'Lightning Box / Everi',
    baseRtp: 94.18,
    rtpRange: {
      min: 92.50,
      max: 94.18,
      hasRanges: true,
      standardVersion: '94.18%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Standard Video Slot',
    apScore: 'D',
    hitFrequencyApprox: '1 cada 165 giros',
    bonusAvgSpins: 165,
    scoutingNotes: 'RTP bajo (94.18%). Los juegos "Express / Train" dependen fuertemente de botes que son difíciles de calcular en EV positivo salvo que el jackpot local esté inflado. No recomendado para jugar a ciegas.',
    userPlayed: true,
    howToCheckRtp: 'Icono del libro de reglas (?) > Última página de tablas.'
  },
  {
    id: 'break-the-diamond-piggy',
    name: 'Break the Diamond Piggy',
    provider: 'Kalamba Games / Everi',
    baseRtp: 95.73,
    rtpRange: {
      min: 93.80,
      max: 95.73,
      hasRanges: true,
      standardVersion: '95.73%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'C',
    hitFrequencyApprox: '1 cada 120 giros',
    bonusAvgSpins: 120,
    scoutingNotes: 'RTP de 95.73%. Presenta medidores de recolección de gemas. Si bien da la sensación de acumulación, la mayoría de los medidores en versiones online de Kalamba reinician de forma independiente por jugador / sesión.',
    userPlayed: true,
    howToCheckRtp: 'Ajustes > Pestaña de información del juego.'
  },
  {
    id: 'double-top-dollar',
    name: 'Double Top Dollar',
    provider: 'IGT',
    baseRtp: 96.00,
    rtpRange: {
      min: 92.00,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00% Online (vs 90-92% en Las Vegas)'
    },
    volatility: 'Media-Baja',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'High RTP Classic',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 65 giros (Ofertas Top Dollar)',
    bonusAvgSpins: 65,
    scoutingNotes: '¡JOYA DE CONVERSIÓN ONLINE! En casinos físicos de Las Vegas o Atlantic City, Top Dollar suele estar programado al 90-92% de RTP. En FanDuel y DraftKings online está calibrado al 96.00%. La estrategia óptima en el bono Top Dollar es aceptar ofertas según la tabla matemática (rechazar menos de 45 créditos en la oferta 1 y 2).',
    userPlayed: true,
    howToCheckRtp: 'Ayuda (?) > Sección "Reglas del juego de bono Top Dollar" y "RTP del 96.00%".'
  },
  {
    id: 'pinball',
    name: 'Pinball (IGT Classic)',
    provider: 'IGT',
    baseRtp: 96.00,
    rtpRange: {
      min: 91.50,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00% en Online'
    },
    volatility: 'Media',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'High RTP Classic',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 75 giros',
    bonusAvgSpins: 75,
    scoutingNotes: 'Otro clásico legendario que en físico tiene un RTP miserable (88-91%) pero que en DraftKings y FanDuel goza de la versión premium online del 96.00%. La bola de pinball en el carrete 3 otorga tiros directos.',
    userPlayed: true,
    howToCheckRtp: 'Botón de ayuda IGT (?) > Texto reglamentario oficial.'
  },
  {
    id: 'black-diamond-deluxe',
    name: 'Black Diamond Deluxe',
    provider: 'Everi',
    baseRtp: 96.00,
    rtpRange: {
      min: 93.00,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00% Online'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'High RTP Classic',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 90 giros',
    bonusAvgSpins: 90,
    scoutingNotes: 'RTP online verificado del 96.00%. Multiplicadores de diamante negro (2x, 3x, 5x). Clásico de 3 carretes y 9 líneas con excelente tasa de retorno online.',
    userPlayed: true,
    howToCheckRtp: 'Icono de engranaje > Reglas de pago > Parte inferior de la ventana.'
  },
  {
    id: 'mystery-of-the-lamp',
    name: 'Mystery of the Lamp',
    provider: 'IGT',
    baseRtp: 96.22,
    rtpRange: {
      min: 94.00,
      max: 96.22,
      hasRanges: true,
      standardVersion: '96.22% (Configuración estándar FD/DK)'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 110 giros (Cualquier lámpara)',
    bonusAvgSpins: 110,
    scoutingNotes: 'Famoso por las 3 lámparas (Igniting, Enchanting, Treasure). En casinos físicos existe entre 92% y 94%, pero en FanDuel/DraftKings corre en su versión de 96.22%. Aunque las chispas que entran a la lámpara son cosméticas, la probabilidad combinada de activar giros de doble o triple lámpara lo convierte en uno de los juegos más rentables de su categoría.',
    userPlayed: true,
    howToCheckRtp: 'Abrir juego en FanDuel/DK > Menú IGT (?) > Desplazarse al final de las reglas: "RTP: 96.22%".'
  },
  // TOP AP CLASSICS (Persistent State & Rollover Kings)
  {
    id: 'scarab-igt',
    name: 'Scarab',
    provider: 'IGT',
    baseRtp: 96.00,
    rtpRange: {
      min: 94.00,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00%'
    },
    volatility: 'Media-Baja',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Ciclo Fijo (Wild Frames)',
    apScore: 'S',
    hitFrequencyApprox: 'Giro 10 de cada ciclo de 10',
    bonusAvgSpins: 10,
    scoutingNotes: '¡EL SANTO GRIAL DEL ADVANTAGE PLAY EN SLOTS! Funciona en ciclos de 10 giros. Cada escarabajo dorado deja un marco. En el giro 10, TODOS los marcos se transforman en comodines (Wilds). Si encuentras una máquina abandonada en el giro 7, 8 o 9 con 4+ marcos en pantalla, el RTP para completar el ciclo supera el 120% a 200% (+EV masivo).',
    userPlayed: false,
    howToCheckRtp: 'Reglas de juego IGT > Apartado "Wild Stays Charges Then Pays".'
  },
  {
    id: 'ocean-magic-igt',
    name: 'Ocean Magic',
    provider: 'IGT',
    baseRtp: 96.07,
    rtpRange: {
      min: 93.99,
      max: 96.07,
      hasRanges: true,
      standardVersion: '96.07%'
    },
    volatility: 'Media',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Estado Persistente (Banking)',
    apScore: 'S',
    hitFrequencyApprox: 'Burbujas persistentes durante 4-7 giros',
    bonusAvgSpins: 7,
    scoutingNotes: 'Burbujas comodín flotantes que suben una posición en cada giro consecutivo. Si una burbuja está en la fila 1 o 2, se sabe exactamente que continuará en la pantalla en los próximos giros. Los APs juegan solo cuando hay burbujas activas en la mitad inferior de los carretes.',
    userPlayed: false,
    howToCheckRtp: 'Reglas de la función Wild Bubble en la ayuda del juego.'
  },
  {
    id: 'blood-suckers-netent',
    name: 'Blood Suckers',
    provider: 'NetEnt',
    baseRtp: 98.00,
    rtpRange: {
      min: 98.00,
      max: 98.00,
      hasRanges: false,
      standardVersion: '98.00% Fijo'
    },
    volatility: 'Baja',
    casinos: ['FanDuel', 'DraftKings'],
    advantageType: 'Rollover King (+EV Bono)',
    apScore: 'S',
    hitFrequencyApprox: '1 cada 50 giros (Frecuencia altísima)',
    bonusAvgSpins: 50,
    scoutingNotes: 'EL REY DEL ROLLOVER DE BONOS. Con un RTP colosal del 98.00% y volatilidad baja, la ventaja de la casa es de apenas el 2.00%. Si recibes un bono de $100 con 1x de rollover en FanDuel/DK, la pérdida matemática esperada es de tan solo $2.00, dejándote con $98.00 NETOS de ganancia esperada (+EV del 98%). Nota: revisa que el casino no excluya este juego de la contribución del bono.',
    userPlayed: false,
    howToCheckRtp: 'Icono (?) > Panel de estadísticas de NetEnt > "RTP: 98.0%".'
  },
  // --- RED TIGER PROGRESSIVE UNLOCKS (PROGRESO PERMANENTE) ---
  {
    id: 'primate-king-red-tiger',
    name: 'Primate King',
    provider: 'Red Tiger',
    baseRtp: 96.00,
    rtpRange: {
      min: 94.60,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00% en FanDuel / DK'
    },
    volatility: 'Media-Alta',
    casinos: ['FanDuel', 'DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Desbloqueo Permanente (Red Tiger)',
    apScore: 'S',
    hitFrequencyApprox: '1 cada 100 giros (Mejora con desbloqueos)',
    bonusAvgSpins: 100,
    scoutingNotes: '¡JOYA DE PERSISTENCIA PERMANENTE! Las monedas de oro que recolectas llenan una barra en la parte superior que NUNCA se reinicia para tu cuenta en esa denominación. Nivel 1: Wilds apilados; Nivel 2: Wilds con multiplicadores crecientes; Nivel 3: ¡DESBLOQUEA UN 6º CARRETE PERMANENTE! Una vez en nivel 3, el RTP del juego se eleva para siempre en esa apuesta.',
    userPlayed: false,
    howToCheckRtp: 'Icono de ayuda (?) > Tabla de pagos de Red Tiger > "RTP: 96.00%".'
  },
  {
    id: 'dynamite-riches-megaways',
    name: 'Dynamite Riches Megaways',
    provider: 'Red Tiger',
    baseRtp: 95.75,
    rtpRange: {
      min: 94.70,
      max: 95.75,
      hasRanges: true,
      standardVersion: '95.75%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Desbloqueo Permanente (Red Tiger)',
    apScore: 'S',
    hitFrequencyApprox: '1 cada 110 giros',
    bonusAvgSpins: 110,
    scoutingNotes: '4 Desbloqueos permanentes por nivel de apuesta: Cada cartucho de dinamita enciende una mecha. Nivel 1 elimina símbolos de bajo pago; Nivel 2 añade comodines de oro; Nivel 3 activa brújula con multiplicador de hasta 10x; Nivel 4 otorga Mega Wilds gigantes. Una vez desbloqueadas las 4 funciones, la máquina queda armada para siempre en esa apuesta.',
    userPlayed: false,
    howToCheckRtp: 'Menú (?) > Sección de especificaciones matemáticas de Red Tiger.'
  },
  {
    id: 'gonzos-quest-megaways',
    name: 'Gonzo’s Quest Megaways',
    provider: 'Red Tiger / NetEnt',
    baseRtp: 96.00,
    rtpRange: {
      min: 94.66,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00%'
    },
    volatility: 'Alta',
    casinos: ['FanDuel', 'DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Standard Video Slot',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 120 giros',
    bonusAvgSpins: 120,
    scoutingNotes: 'Hasta 117,649 formas de ganar. Función Earthquake que destruye símbolos de bajo valor y multiplicadores de avalancha de hasta 5x en juego base y 15x en giros gratis. Excelente juego para buscar multiplicadores medianos jugando a $0.20 o $0.40.',
    userPlayed: false,
    howToCheckRtp: 'Menú (?) > Scroll al pie de página de reglas oficiales.'
  },
  // --- NOLIMIT CITY: MONSTRUOS DE MULTIPLICADORES EXTREMOS ---
  {
    id: 'san-quentin-xways',
    name: 'San Quentin xWays',
    provider: 'Nolimit City',
    baseRtp: 96.03,
    rtpRange: {
      min: 94.11,
      max: 96.03,
      hasRanges: true,
      standardVersion: '96.03% (Versión estándar EE.UU.)'
    },
    volatility: 'Extrema',
    casinos: ['DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Multiplicador Extremo (Nolimit)',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 250 giros (Lockdown Spins)',
    bonusAvgSpins: 250,
    scoutingNotes: '¡MULTIPLICADOR MÁXIMO DE 150,000x! Es el juego más salvaje de la industria. Regla AP fundamental: NUNCA apostar más de $0.20 por tiro. Con $0.20, el premio máximo es de $30,000 en un solo giro. Enhancer cells en la prisión con Jumping Wilds y split xWays que dividen los símbolos multiplicando las líneas exponencialmente.',
    userPlayed: false,
    howToCheckRtp: 'Icono (?) en la esquina inferior izquierda > Documento matemático Nolimit City.'
  },
  {
    id: 'tombstone-rip',
    name: 'Tombstone RIP',
    provider: 'Nolimit City',
    baseRtp: 96.08,
    rtpRange: {
      min: 94.08,
      max: 96.08,
      hasRanges: true,
      standardVersion: '96.08%'
    },
    volatility: 'Extrema',
    casinos: ['DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Multiplicador Extremo (Nolimit)',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 280 giros (Boothill Freespins)',
    bonusAvgSpins: 280,
    scoutingNotes: '¡EL RÉCORD MUNDIAL: 300,000x MULTIPLICADOR MÁXIMO! Volatilidad denominada "Insane" por Nolimit City. Una apuesta de $0.20 puede pagar hasta $60,000. Los giros en el juego base fallan a menudo, pero cuando conecta los comodines xNudge en el carrete central con multiplicadores acumulados, el pago es astronómico.',
    userPlayed: false,
    howToCheckRtp: 'Ayuda (?) > Scroll al pie de la tabla de pagos.'
  },
  {
    id: 'mental-nolimit',
    name: 'Mental',
    provider: 'Nolimit City',
    baseRtp: 96.08,
    rtpRange: {
      min: 94.20,
      max: 96.08,
      hasRanges: true,
      standardVersion: '96.08%'
    },
    volatility: 'Extrema',
    casinos: ['DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Multiplicador Extremo (Nolimit)',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 220 giros',
    bonusAvgSpins: 220,
    scoutingNotes: 'Premio máximo de 66,666x. La función "Dead Patient" otorga multiplicadores individuales que van desde 5x hasta ¡9,999x! Solo recomendado para jugadores que usan disciplina de $0.20 y aceptan sesiones de alta varianza.',
    userPlayed: false,
    howToCheckRtp: 'Menú hamburguesa (?) > Sección de certificación GLI.'
  },
  {
    id: 'fire-in-the-hole-xbomb',
    name: 'Fire in the Hole xBomb',
    provider: 'Nolimit City',
    baseRtp: 96.06,
    rtpRange: {
      min: 94.11,
      max: 96.06,
      hasRanges: true,
      standardVersion: '96.06%'
    },
    volatility: 'Extrema',
    casinos: ['DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Multiplicador Extremo (Nolimit)',
    apScore: 'B',
    hitFrequencyApprox: '1 cada 190 giros (Lucky Wagon Spins)',
    bonusAvgSpins: 190,
    scoutingNotes: 'Premio máximo de 60,000x. Minería subterránea con xBomb Wilds que explotan y aumentan el multiplicador general mientras abren filas adicionales hasta 46,656 formas de ganar.',
    userPlayed: false,
    howToCheckRtp: 'Icono (?) > Tablas de pago de Nolimit City.'
  },
  // --- CASO DE ESTUDIO DEL USUARIO & EXCLUSIVAS DE FANDUEL ---
  {
    id: 'love-island-power-combo',
    name: 'Love Island: Reel Vibes Power Combo',
    provider: 'Games Global / Slingshot Studios',
    baseRtp: 96.00,
    rtpRange: {
      min: 94.00,
      max: 96.00,
      hasRanges: true,
      standardVersion: '96.00% (Exclusivo FanDuel)'
    },
    volatility: 'Media-Alta',
    casinos: ['FanDuel'],
    advantageType: 'Multi-Pot Accumulator',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 140 giros (Aleatorio por tiro)',
    bonusAvgSpins: 140,
    scoutingNotes: '¡EL CASO DE TU PANTALLA! Acumula hasta 15 giros gratis (corazón morado), x15 multiplicador (corazón dorado) y gemas en el corazón rojo. ATENCIÓN: El cuadro indica "MAY UNLOCK" (no está garantizado por giro). La gran ventaja es que este estado de 15 giros / x15 queda GUARDADO en tu cuenta de FanDuel a $0.50. Estrategia AP: NO perseguir con dinero propio; esperar un bono de $10-$20 de FanDuel con 1x rollover para detonar ese multiplicador gigante gratis.',
    userPlayed: true,
    howToCheckRtp: 'Menú hamburguesa > "Rules" > Última línea del texto legal.'
  },
  // --- AUDITORÍA ESPECIAL BORGATA / BETMGM: THE TRAITORS ---
  {
    id: 'the-traitors-faithful-riches',
    name: 'The Traitors: Faithful Riches',
    provider: 'Games Global / NBC Universal',
    baseRtp: 94.20,
    rtpRange: {
      min: 92.00,
      max: 94.20,
      hasRanges: true,
      standardVersion: '94.20% (Exclusivo Borgata & BetMGM)'
    },
    volatility: 'Media-Alta',
    casinos: ['Borgata', 'BetMGM'],
    advantageType: 'Standard Video Slot',
    apScore: 'D',
    hitFrequencyApprox: '1 cada 130 giros',
    bonusAvgSpins: 130,
    scoutingNotes: 'AUDITORÍA SOLICITADA EN BORGATA: ¡NO ES RENTABLE! Tiene un RTP pobre de solo 94.20% (ventaja de la casa del 5.80%). Al ser un juego con licencia de programa de televisión de NBC Universal, el casino paga cuantiosas regalías a la cadena televisiva y castiga el RTP del jugador. Recomendación AP: Evitar por completo; en Borgata es infinitamente mejor jugar Blood Suckers (98.00%) o San Quentin (96.03%).',
    userPlayed: false,
    howToCheckRtp: 'Abrir en Borgata Online > Icono de información (?) > Página 5 de Reglas: "RTP: 94.20%".'
  },
  // --- CLÁSICOS DE ALTO RETORNO PARA PEQUEÑO BANKROLL ---
  {
    id: 'regal-riches-igt',
    name: 'Regal Riches',
    provider: 'IGT',
    baseRtp: 96.27,
    rtpRange: {
      min: 94.00,
      max: 96.27,
      hasRanges: true,
      standardVersion: '96.27%'
    },
    volatility: 'Media',
    casinos: ['FanDuel', 'DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Ciclo Fijo (Wild Frames)',
    apScore: 'S',
    hitFrequencyApprox: 'Giro 10 de cada ciclo de 10',
    bonusAvgSpins: 10,
    scoutingNotes: 'Sucesor moderno de Scarab. Ciclos garantizados de 10 giros. Las gemas azules recolectadas explotan como comodines garantizados en el giro 10. Además tiene un medidor mayor de gemas doradas que desata la Mega Tormenta de Wilds.',
    userPlayed: false,
    howToCheckRtp: 'Reglas de la función Wild Stays Charges Then Pays en la ayuda IGT.'
  },
  {
    id: 'starmania-nextgen',
    name: 'Starmania',
    provider: 'NextGen',
    baseRtp: 97.87,
    rtpRange: {
      min: 97.87,
      max: 97.87,
      hasRanges: false,
      standardVersion: '97.87% Fijo'
    },
    volatility: 'Baja',
    casinos: ['DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'Rollover King (+EV Bono)',
    apScore: 'S',
    hitFrequencyApprox: '1 cada 60 giros',
    bonusAvgSpins: 60,
    scoutingNotes: 'RTP colosal de 97.87% (House Edge de apenas 2.13%). Paga en ambas direcciones (Both Ways: izquierda a derecha y derecha a izquierda). Extraordinaria para amortiguar bankrolls pequeños a $0.20 - $0.40.',
    userPlayed: false,
    howToCheckRtp: 'Icono del engranaje / (?) > Estadísticas matemáticas oficiales.'
  },
  {
    id: 'guns-n-roses-netent',
    name: 'Guns N’ Roses',
    provider: 'NetEnt',
    baseRtp: 96.98,
    rtpRange: {
      min: 96.98,
      max: 96.98,
      hasRanges: false,
      standardVersion: '96.98%'
    },
    volatility: 'Baja',
    casinos: ['FanDuel', 'DraftKings', 'Borgata', 'BetMGM'],
    advantageType: 'High RTP Classic',
    apScore: 'A',
    hitFrequencyApprox: '1 cada 40 giros (Funciones base aleatorias frecuentes)',
    bonusAvgSpins: 40,
    scoutingNotes: 'RTP casi del 97.00% con volatilidad baja. Tiene 3 funciones aleatorias que caen constantemente en el juego base sin esperar al bono (Appetite for Destruction Wild en cruz, Legend Spins con carretes comodín apilados y multiplicador Solo de hasta 10x). Es una de las slots más amigables para estirar un depósito pequeño.',
    userPlayed: false,
    howToCheckRtp: 'Menú (?) NetEnt > Pestaña de estadísticas del juego.'
  }
];

