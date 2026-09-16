export type RiskLevel = "danger" | "caution" | "safe";

export interface Residue {
  id: string;
  name: string;
  category: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  description: string;
  handling: string;
  recycling: string;
  equipment: { label: string }[];
  tags: string[];
}

export const residues: Residue[] = [
  {
    id: "jeringa",
    name: "Jeringa",
    category: "Corto-punzante",
    riskLevel: "danger",
    riskLabel: "Peligroso Biológico",
    description:
      "Residuo médico punzante utilizado para administrar medicamentos o extraer fluidos. Puede portar patógenos infecciosos como VIH, hepatitis B y C. Su manejo inadecuado representa un grave riesgo para la salud pública.",
    handling:
      "Depositar directamente en contenedor rígido resistente a punciones (descartex) sin reencapuchar. No doblar ni romper la aguja. Nunca mezclar con residuos domésticos. Llevar el contenedor lleno al 75% a un punto de recolección autorizado.",
    recycling:
      "No reciclable convencionalmente. Requiere tratamiento especial: autoclave, incineración o microondas industrial. Solo personal certificado en manejo de residuos peligrosos puede gestionarlo.",
    equipment: [
      { label: "Guantes de nitrilo dobles" },
      { label: "Gafas de protección" },
      { label: "Contenedor rígido (descartex)" },
      { label: "Bata o mandilón" },
    ],
    tags: ["médico", "punzante", "hospital", "aguja", "biológico"],
  },
  {
    id: "pila",
    name: "Pila / Batería",
    category: "Electrónico-Químico",
    riskLevel: "caution",
    riskLabel: "Precaución — Químico",
    description:
      "Las pilas contienen metales pesados como mercurio, plomo, cadmio y litio que pueden contaminar suelos y acuíferos durante cientos de años si se desechan en la basura común. Una sola pila de botón puede contaminar 600 mil litros de agua.",
    handling:
      "No tirar en basura doméstica. No incinerar. No perforar ni desmontar. Almacenar en lugar fresco y seco, separadas de materiales inflamables. Llevar a puntos de recolección especializados en tiendas de electrónica o centros de acopio.",
    recycling:
      "Reciclables mediante procesos hidrometalúrgicos y pirometalúrgicos que recuperan metales valiosos. Busca el símbolo WEEE o contenedores específicos para pilas en supermercados, ferreterías y tiendas de electrónica.",
    equipment: [
      { label: "Guantes de látex" },
      { label: "Caja de cartón separadora" },
      { label: "Etiqueta de identificación" },
    ],
    tags: ["batería", "electrónico", "litio", "mercurio", "químico"],
  },
  {
    id: "cartón",
    name: "Cartón",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Material de embalaje fabricado de celulosa prensada. Uno de los materiales más eficientemente reciclados a nivel mundial. Una tonelada de cartón reciclado ahorra 17 árboles, 26,500 litros de agua y 4,100 kWh de energía.",
    handling:
      "Aplanar cajas para reducir volumen. Retirar cintas adhesivas, grapas metálicas y elementos plásticos. Mantener seco — el cartón húmedo pierde valor reciclable. Separar del resto de residuos orgánicos.",
    recycling:
      "Depositar en contenedor azul o de papel/cartón. El proceso incluye trituración, mezcla con agua, filtración de impurezas, formación de hojas y secado. Se puede reciclar hasta 7 veces antes de que las fibras sean demasiado cortas.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor azul (reciclables)" },
    ],
    tags: ["papel", "embalaje", "caja", "celulosa", "reciclar"],
  },
  {
    id: "residuo-orgánico",
    name: "Residuo Orgánico",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Materia biodegradable de origen vegetal o animal: restos de comida, cáscaras, hojas, café, etc. Representan entre el 40–60% de los residuos domésticos. Si se compostan, enriquecen el suelo; en rellenos sanitarios generan metano, un potente gas de efecto invernadero.",
    handling:
      "Separar en recipiente específico con tapa hermética para evitar olores y plagas. Recolección frecuente (cada 2–3 días). No mezclar con aceites en grandes cantidades, carnes o lácteos si se compostan en casa.",
    recycling:
      "Compostaje doméstico o industrial. El compost resultante mejora la estructura del suelo, la retención de humedad y aporta nutrientes. También puede destinarse a digestión anaeróbica para generar biogás.",
    equipment: [
      { label: "Cubo con tapa hermética" },
      { label: "Guantes de cocina" },
      { label: "Compostador doméstico" },
    ],
    tags: ["comida", "orgánico", "compost", "vegetal", "biodegradable"],
  },
  {
    id: "celular",
    name: "Teléfono Celular",
    category: "Residuo Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Los teléfonos contienen más de 60 elementos de la tabla periódica: oro, plata, cobre, cobalto, litio y tierras raras. También contienen plomo, berilio y arsénico. Solo el 20% de los residuos electrónicos se recicla formalmente a nivel mundial.",
    handling:
      "Borrar datos personales antes de descartar. No tirar en basura común. No exponer a calor extremo (riesgo de explosión de batería de litio). Llevar a centros de recolección autorizados RAEE o a la marca del fabricante.",
    recycling:
      "Los fabricantes y operadores telefónicos tienen programas de recolección. El proceso separa plásticos, metales preciosos y baterías. Algunos componentes se refurbish y reused. Busca el símbolo WEEE (cubo de basura tachado) en el dispositivo.",
    equipment: [
      { label: "Empaque original o caja acolchada" },
      { label: "Datos borrados y verificados" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["smartphone", "electrónico", "RAEE", "batería", "litio"],
  },
  {
    id: "aceite-motor",
    name: "Aceite de Motor",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "El aceite lubricante usado contiene metales pesados, hidrocarburos aromáticos policíclicos y aditivos tóxicos. Un litro de aceite usado puede contaminar un millón de litros de agua subterránea. Está catalogado como residuo peligroso en la mayoría de las legislaciones.",
    handling:
      "Nunca verter por el desagüe, suelo o basura. Almacenar en recipiente cerrado y hermético, preferiblemente en el mismo envase original. Mantener alejado de fuentes de calor. Etiquetarlo claramente como 'Aceite Usado — Peligroso'.",
    recycling:
      "El aceite usado se re-refina para producir aceite base lubricante o se usa como combustible en procesos industriales con control de emisiones. Llévalo a talleres mecánicos autorizados, estaciones de servicio o centros municipales de residuos peligrosos.",
    equipment: [
      { label: "Guantes resistentes a solventes" },
      { label: "Gafas de protección" },
      { label: "Recipiente hermético etiquetado" },
      { label: "Zona libre de llamas o chispas" },
    ],
    tags: ["aceite", "motor", "hidrocarburo", "tóxico", "peligroso"],
  },
  {
    id: "vidrio",
    name: "Vidrio",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "El vidrio es 100% reciclable y puede reciclarse indefinidamente sin pérdida de calidad o pureza. Fabricado de arena de sílice, carbonato de sodio y piedra caliza. El reciclaje ahorra hasta un 30% de energía respecto a la producción virgen.",
    handling:
      "Separar por colores (transparente, verde, ámbar). Enjuagar envases. No mezclar con vidrio roto de ventanas, espejos, cerámica o cristal templado (composición química diferente). Manipular con cuidado por riesgo de corte.",
    recycling:
      "Depositar en contenedor verde (iglú de vidrio). Se tritura, funde a 1500°C y se forma nuevo vidrio. El vidrio reciclado se llama cullet. Nunca va al cubo de plásticos ni al de papel.",
    equipment: [
      { label: "Guantes resistentes a cortes" },
      { label: "Contenedor verde (iglú)" },
    ],
    tags: ["botella", "envase", "vidrio", "transparente", "reciclar"],
  },
  {
    id: "mascarilla",
    name: "Mascarilla / Cubrebocas",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Las mascarillas desechables están fabricadas de polipropileno no tejido, un plástico difícil de reciclar. Contienen metales (nariz metálica) y pueden retener patógenos si fueron usadas por personas enfermas. La pandemia generó un exceso masivo de este residuo.",
    handling:
      "Retirar tocando solo las gomas. Doblar hacia adentro (cara interior hacia dentro). Depositar en bolsa de plástico cerrada antes de tirar. En contexto hospitalario o de aislamiento, tratar como residuo biológico infeccioso.",
    recycling:
      "Actualmente poco reciclables de forma convencional. Algunos programas especializados los recuperan para fabricar materiales de construcción. En uso doméstico sin enfermedad activa, van a la basura general en bolsa cerrada.",
    equipment: [
      { label: "Guantes desechables" },
      { label: "Bolsa de plástico cerrada" },
    ],
    tags: ["mascarilla", "cubrebocas", "sanitario", "polipropileno"],
  },
];

export const categories = [
  { label: "Corto-punzante", color: "danger" },
  { label: "Electrónico", color: "caution" },
  { label: "Orgánico", color: "safe" },
  { label: "Peligroso", color: "danger" },
  { label: "Reciclable", color: "safe" },
  { label: "Sanitario", color: "caution" },
];

export function searchResidues(query: string): Residue[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return residues.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.tags.some((t) => t.includes(q)) ||
      r.description.toLowerCase().includes(q)
  );
}
