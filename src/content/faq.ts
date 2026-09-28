export type FaqEntry = {
  question: string;
  answer: string;
};

export const FAQ_SECTION = {
  log: { main: "Preguntas", tail: "faq" },
  title: "Preguntas frecuentes",
  blurb: "Lo que hay que saber antes de entrar a la zona cero.",
} as const;

/** Mirrored 1:1 in the FAQPage JSON-LD of index.html — keep both in sync */
export const FAQ: FaqEntry[] = [
  {
    question: "¿Qué es Wasteland: Japan Apocalypse?",
    answer:
      "Una serie de supervivencia post-apocalíptica ambientada en un Japón colapsado, con guion propio: facciones, una escaleta de eventos semanal y decisiones con consecuencias. No es un survival vanilla.",
  },
  {
    question: "¿Wasteland es la serie o el estudio?",
    answer:
      "Wasteland es la serie, no el estudio. Myrk Studio es el estudio que la produce y Japan Apocalypse es el primer episodio de esa serie. Cada serie futura explorará una historia y colapso distinto.",
  },
  {
    question: "¿Cómo se accede al servidor?",
    answer:
      "Por whitelist: completá el formulario público de esta web. El staff revisa las postulaciones y aplica prioridad a las que llegan por invitación; el resto entra por orden de llegada.",
  },
  {
    question: "¿Qué necesito para postular?",
    answer:
      "Tu usuario de Discord, tu nombre de Minecraft, tu edad, por qué querés entrar y la aceptación de las normas. La experiencia previa en roleplay ayuda, pero no es obligatoria.",
  },
  {
    question: "¿Puedo conocer el lore antes de entrar?",
    answer:
      "Solo el teaser público. El resto del lore está clasificado y aparece dentro del servidor: hay cintas y documentos repartidos por la zona de exclusión para quien sepa dónde mirar.",
  },
  {
    question: "¿Cada cuánto se actualiza el mundo?",
    answer:
      "La escaleta narrativa dirige la historia semana a semana. Cada jornada tiene un estado propio y las semanas siguientes se desbloquean a medida que el servidor progresa.",
  },
];
