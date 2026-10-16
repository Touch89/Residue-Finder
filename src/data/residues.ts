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

  // ---- Corto-punzante (9 adicionales) ----
  {
    id: "aguja-sutura",
    name: "Aguja de Sutura",
    category: "Corto-punzante",
    riskLevel: "danger",
    riskLabel: "Peligroso Biológico",
    description:
      "Aguja curva utilizada para cerrar heridas o incisiones quirúrgicas, generalmente unida a hilo de sutura. Puede estar contaminada con sangre y fluidos corporales, representando riesgo de transmisión de infecciones si se maneja sin protección.",
    handling:
      "Depositar de inmediato en contenedor rígido para corto-punzantes sin reencapuchar ni manipular con las manos. No desechar junto al hilo de sutura en la basura común. Mantener fuera del alcance de niños y personal no capacitado.",
    recycling:
      "No reciclable. Debe tratarse como residuo biológico infeccioso mediante autoclave o incineración en plantas autorizadas.",
    equipment: [
      { label: "Guantes de nitrilo" },
      { label: "Contenedor rígido para corto-punzantes" },
      { label: "Pinzas quirúrgicas" },
    ],
    tags: ["aguja", "sutura", "quirúrgico", "biológico", "hospital"],
  },
  {
    id: "bisturi",
    name: "Bisturí Desechable",
    category: "Corto-punzante",
    riskLevel: "danger",
    riskLabel: "Peligroso Biológico",
    description:
      "Hoja de corte quirúrgico de un solo uso, extremadamente afilada, empleada en procedimientos médicos y de laboratorio. El contacto accidental puede causar cortes profundos y exposición a patógenos si estuvo en contacto con tejido o fluidos.",
    handling:
      "Separar la hoja del mango usando un dispositivo removedor, nunca con los dedos. Depositar directamente en el contenedor rígido para corto-punzantes. No reutilizar ni limpiar para desecharlo después.",
    recycling:
      "No reciclable por vía convencional; requiere incineración o esterilización en plantas de residuos biológico-infecciosos.",
    equipment: [
      { label: "Guantes de nitrilo dobles" },
      { label: "Removedor de hojas de bisturí" },
      { label: "Contenedor rígido" },
    ],
    tags: ["bisturí", "quirúrgico", "punzante", "biológico", "hospital"],
  },
  {
    id: "lanceta",
    name: "Lanceta",
    category: "Corto-punzante",
    riskLevel: "danger",
    riskLabel: "Peligroso Biológico",
    description:
      "Dispositivo pequeño de punción utilizado para obtener gotas de sangre en pruebas de glucosa u otros análisis rápidos. Es de uso único y puede portar sangre contaminada con patógenos.",
    handling:
      "Desechar inmediatamente después de un solo uso en un contenedor rígido para corto-punzantes. No compartir entre personas. No tirar en bolsas de basura comunes ni dejar expuestas.",
    recycling:
      "No reciclable; se gestiona junto con otros residuos corto-punzantes mediante incineración controlada.",
    equipment: [
      { label: "Guantes de nitrilo" },
      { label: "Mini contenedor rígido portátil" },
    ],
    tags: ["lanceta", "sangre", "punzante", "biológico", "glucosa"],
  },
  {
    id: "cateter",
    name: "Catéter Intravenoso",
    category: "Corto-punzante",
    riskLevel: "danger",
    riskLabel: "Peligroso Biológico",
    description:
      "Dispositivo médico utilizado para administrar fluidos o medicamentos directamente al torrente sanguíneo. Incluye una aguja guía que puede estar contaminada con sangre tras su uso.",
    handling:
      "Retirar con cuidado y depositar la aguja en contenedor rígido inmediatamente. No doblar ni reencapuchar. El resto plástico del catéter, si no tuvo contacto con sangre visible, puede separarse según protocolo hospitalario.",
    recycling:
      "La aguja no es reciclable y requiere tratamiento biológico especial; el tubo plástico puede destinarse a gestión de residuos hospitalarios comunes.",
    equipment: [
      { label: "Guantes de nitrilo" },
      { label: "Contenedor rígido para corto-punzantes" },
    ],
    tags: ["catéter", "aguja", "hospital", "biológico", "médico"],
  },
  {
    id: "navaja-afeitar",
    name: "Navaja de Afeitar Desechable",
    category: "Corto-punzante",
    riskLevel: "caution",
    riskLabel: "Precaución — Punzante",
    description:
      "Hoja metálica de un solo uso para afeitado personal. Aunque de uso doméstico no suele estar contaminada biológicamente, su filo representa riesgo de corte para quien maneja la basura.",
    handling:
      "Envolver en varias capas de papel o cartón antes de desechar, o depositar en un recipiente rígido pequeño. Nunca tirar suelta directamente en la bolsa de basura.",
    recycling:
      "El metal es técnicamente reciclable, pero por seguridad se recomienda desecharla envuelta en la basura general salvo que exista un punto de recolección de metales cortantes.",
    equipment: [
      { label: "Guantes resistentes a cortes" },
      { label: "Recipiente rígido pequeño o envoltura gruesa" },
    ],
    tags: ["navaja", "afeitar", "punzante", "metal", "doméstico"],
  },
  {
    id: "clavo-oxidado",
    name: "Clavo Oxidado",
    category: "Corto-punzante",
    riskLevel: "caution",
    riskLabel: "Precaución — Punzante",
    description:
      "Elemento metálico de construcción que, al oxidarse, incrementa el riesgo de infecciones como el tétanos ante un pinchazo o herida. Común en escombros y restos de demolición.",
    handling:
      "Recoger con herramientas, nunca con las manos descubiertas. Envolver en cartón o tela gruesa y asegurar con cinta antes de desechar. Si hay una herida por pinchazo, buscar atención médica inmediata.",
    recycling:
      "El metal es reciclable; puede llevarse a chatarrerías o puntos de acopio de metales una vez asegurado para transporte.",
    equipment: [
      { label: "Guantes de cuero reforzado" },
      { label: "Pinzas o alicate" },
      { label: "Envoltura de cartón grueso" },
    ],
    tags: ["clavo", "oxidado", "metal", "punzante", "escombro"],
  },
  {
    id: "vidrio-roto",
    name: "Vidrio Roto / Cristal Roto",
    category: "Corto-punzante",
    riskLevel: "caution",
    riskLabel: "Precaución — Punzante",
    description:
      "Fragmentos de vidrio de ventanas, espejos o vajilla rota con bordes filosos capaces de causar cortes profundos. A diferencia del vidrio de envases, su composición no siempre es apta para el reciclaje estándar.",
    handling:
      "Recoger con escoba y recogedor, nunca con las manos. Envolver en varias capas de papel periódico o cartón y rotular como 'Vidrio roto' antes de desechar.",
    recycling:
      "Generalmente no se recicla junto al vidrio de envases por su composición distinta (vidrio templado, espejos). Se dispone envuelto en la basura general salvo punto de acopio específico.",
    equipment: [
      { label: "Guantes resistentes a cortes" },
      { label: "Escoba y recogedor" },
      { label: "Papel periódico o cartón para envolver" },
    ],
    tags: ["vidrio", "cristal", "roto", "punzante", "corte"],
  },
  {
    id: "aguja-tatuaje",
    name: "Aguja de Tatuaje",
    category: "Corto-punzante",
    riskLevel: "danger",
    riskLabel: "Peligroso Biológico",
    description:
      "Aguja de un solo uso empleada en procedimientos de tatuaje y perforaciones, en contacto directo con sangre y piel. Representa alto riesgo de transmisión de infecciones si no se desecha correctamente.",
    handling:
      "Desechar de inmediato tras cada uso en un contenedor rígido para corto-punzantes dentro del mismo estudio de tatuaje. Nunca reutilizar ni limpiar para descartarla después.",
    recycling:
      "No reciclable. Tratamiento exclusivo mediante incineración en instalaciones autorizadas para residuos biológico-infecciosos.",
    equipment: [
      { label: "Guantes de nitrilo desechables" },
      { label: "Contenedor rígido certificado" },
      { label: "Protector facial" },
    ],
    tags: ["tatuaje", "aguja", "biológico", "punzante", "piel"],
  },
  {
    id: "cuchilla-cutter",
    name: "Cuchilla de Cúter / Exacto",
    category: "Corto-punzante",
    riskLevel: "caution",
    riskLabel: "Precaución — Punzante",
    description:
      "Hoja metálica retráctil utilizada en tareas de corte doméstico, oficina o manualidades. Sin contaminación biológica habitual, pero su filo representa riesgo físico directo para quien recolecta residuos.",
    handling:
      "Retraer la hoja por completo o romperla en el segmentador integrado del cúter antes de desechar. Envolver en cartón rígido y asegurar con cinta adhesiva.",
    recycling:
      "El metal es reciclable en teoría, pero por seguridad se recomienda desecharla bien envuelta salvo exista un punto de acopio de metales cortantes.",
    equipment: [
      { label: "Guantes resistentes a cortes" },
      { label: "Cartón rígido para envolver" },
    ],
    tags: ["cúter", "cuchilla", "punzante", "oficina", "metal"],
  },

  // ---- Electrónico (8 adicionales) ----
  {
    id: "laptop",
    name: "Laptop / Computadora Portátil",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Dispositivo electrónico complejo con placas de circuito impreso, batería de litio, pantalla con posibles metales pesados y plásticos difíciles de reciclar. Contiene materiales valiosos como oro y cobre, pero también sustancias tóxicas como plomo y retardantes de llama bromados.",
    handling:
      "Realizar borrado seguro de datos antes de desechar. No perforar ni desarmar la batería. No exponer a golpes fuertes ni calor extremo. Llevar a un centro de recolección RAEE o programa de devolución del fabricante.",
    recycling:
      "Se desensambla para separar batería, placas, pantalla y carcasa plástica, cada uno con proceso de reciclaje distinto. Muchos componentes pueden recuperarse para refabricación o extracción de metales preciosos.",
    equipment: [
      { label: "Empaque protector o caja acolchada" },
      { label: "Borrado seguro de datos" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["laptop", "computadora", "electrónico", "RAEE", "batería"],
  },
  {
    id: "cargador",
    name: "Cargador de Celular",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Dispositivo de alimentación eléctrica compuesto por plásticos, cables de cobre y componentes electrónicos internos. Pese a su tamaño reducido, forma parte de los residuos electrónicos de más rápido crecimiento por la obsolescencia de puertos y conectores.",
    handling:
      "No desechar en la basura doméstica. No cortar el cable para intentar reutilizar el cobre sin protección. Llevar a puntos de recolección de electrónicos pequeños en tiendas o centros de acopio.",
    recycling:
      "El cobre del cable y los componentes metálicos internos son recuperables mediante procesos de separación y fundición en plantas especializadas de RAEE.",
    equipment: [
      { label: "Bolsa o caja pequeña para transporte" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["cargador", "cable", "electrónico", "RAEE", "cobre"],
  },
  {
    id: "televisor",
    name: "Televisor",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Aparato electrónico de gran tamaño que, en modelos antiguos de tubo (CRT), contiene plomo y fósforo en cantidades significativas; los modelos LED/LCD contienen mercurio en la retroiluminación y metales pesados en sus placas.",
    handling:
      "No romper la pantalla ni intentar desarmarlo en casa. Transportarlo con cuidado para evitar fugas de componentes internos. Entregarlo completo a un centro de recolección RAEE o servicio municipal de electrónicos.",
    recycling:
      "Se procesa en plantas especializadas que separan vidrio, plásticos, metales y componentes peligrosos como el mercurio de forma controlada.",
    equipment: [
      { label: "Transporte con protección (manta o caja)" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["televisor", "pantalla", "electrónico", "RAEE", "mercurio"],
  },
  {
    id: "impresora",
    name: "Impresora",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Equipo electrónico que combina plásticos, placas de circuito, motores y, en algunos casos, cartuchos de tinta o tóner con residuos químicos. El tóner en polvo puede ser perjudicial si se inhala en grandes cantidades.",
    handling:
      "Retirar y desechar los cartuchos de tinta o tóner por separado en puntos de recolección específicos. No desarmar el equipo en casa. Llevar el cuerpo de la impresora a un centro RAEE.",
    recycling:
      "Los cartuchos pueden ser rellenados o reciclados por el fabricante; el resto del equipo se procesa para recuperar plásticos y metales en plantas de electrónicos.",
    equipment: [
      { label: "Bolsa sellada para cartuchos usados" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["impresora", "electrónico", "RAEE", "tóner", "tinta"],
  },
  {
    id: "control-remoto",
    name: "Control Remoto",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Pequeño dispositivo electrónico que generalmente contiene pilas, una placa de circuito simple y una carcasa plástica. Su tamaño reducido hace que a menudo se deseche junto con la basura común por error.",
    handling:
      "Retirar las pilas antes de desechar y gestionarlas como residuo peligroso por separado. Llevar la carcasa y circuito a un punto de recolección de electrónicos pequeños.",
    recycling:
      "Los plásticos y la placa de circuito pueden separarse y reciclarse en instalaciones de RAEE; las pilas siguen su propio proceso de reciclaje de metales.",
    equipment: [
      { label: "Destornillador pequeño para retirar pilas" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["control", "remoto", "electrónico", "RAEE", "pilas"],
  },
  {
    id: "audifonos",
    name: "Audífonos",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Dispositivo de audio compuesto por cables, imanes, pequeños altavoces y, en versiones inalámbricas, baterías de litio. Los modelos con batería representan mayor riesgo si se exponen a daño físico o calor.",
    handling:
      "No desarmar baterías de litio en casa. No desechar junto con cables sueltos en la basura general. Entregar en puntos de recolección de pequeños electrónicos.",
    recycling:
      "Los imanes y el cobre de las bobinas son recuperables; las baterías de litio siguen un proceso de reciclaje especializado para metales como el cobalto.",
    equipment: [
      { label: "Bolsa pequeña para transporte" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["audífonos", "electrónico", "RAEE", "batería", "litio"],
  },
  {
    id: "tablet",
    name: "Tablet",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Dispositivo electrónico portátil con pantalla táctil, batería de litio sellada y placas de circuito compactas. La batería integrada no removible aumenta el riesgo de daño si se desecha de forma incorrecta.",
    handling:
      "Realizar borrado seguro de datos antes de desechar. No perforar la carcasa ni exponer a golpes que dañen la batería interna. Llevar a un centro de recolección RAEE o programa del fabricante.",
    recycling:
      "Se desensambla en plantas especializadas para separar pantalla, batería y placas, recuperando metales preciosos y gestionando el litio de forma segura.",
    equipment: [
      { label: "Borrado seguro de datos" },
      { label: "Empaque protector" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["tablet", "electrónico", "RAEE", "batería", "litio"],
  },
  {
    id: "disco-duro",
    name: "Disco Duro",
    category: "Electrónico",
    riskLevel: "caution",
    riskLabel: "RAEE — Precaución",
    description:
      "Componente de almacenamiento de datos que contiene imanes de neodimio, platos metálicos y placas de circuito. Puede retener información sensible incluso después de ser formateado de forma convencional.",
    handling:
      "Realizar borrado seguro certificado o destrucción física de los platos si contiene datos sensibles. No desecharlo intacto en la basura común. Llevar a un centro de recolección RAEE o servicio de destrucción certificada.",
    recycling:
      "Los imanes de neodimio, el aluminio de los platos y las placas de circuito son altamente recuperables en plantas especializadas de electrónicos.",
    equipment: [
      { label: "Software de borrado seguro o trituradora de discos" },
      { label: "Punto de recolección RAEE" },
    ],
    tags: ["disco duro", "electrónico", "RAEE", "datos", "imán"],
  },

  // ---- Orgánico (9 adicionales) ----
  {
    id: "cascara-fruta",
    name: "Cáscara de Fruta",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Restos vegetales generados al pelar o consumir frutas como plátano, naranja o manzana. Se descomponen rápidamente y son ricos en nutrientes aprovechables para el compostaje doméstico.",
    handling:
      "Separar en el recipiente de orgánicos inmediatamente después de generarse. Trocear las cáscaras grandes para acelerar su descomposición. Evitar que se acumulen húmedas por varios días sin ventilación.",
    recycling:
      "Ideal para compostaje doméstico o industrial; aporta carbono y humedad al proceso. También puede usarse en lombricultura (vermicompostaje).",
    equipment: [
      { label: "Cubo con tapa hermética" },
      { label: "Compostador doméstico" },
    ],
    tags: ["fruta", "cáscara", "orgánico", "compost", "biodegradable"],
  },
  {
    id: "cafe-molido",
    name: "Restos de Café Molido",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Residuo sólido que queda tras preparar café filtrado o de cafetera. Rico en nitrógeno, mejora la estructura del compost y puede usarse directamente como abono para plantas acidófilas.",
    handling:
      "Dejar enfriar y secar brevemente antes de almacenar para evitar moho. Separar del filtro de papel si este no es compostable en el mismo recipiente.",
    recycling:
      "Excelente aditivo para compost por su alto contenido de nitrógeno; también se usa como repelente natural de algunas plagas de jardín.",
    equipment: [
      { label: "Recipiente con tapa" },
      { label: "Compostador doméstico" },
    ],
    tags: ["café", "molido", "orgánico", "compost", "nitrógeno"],
  },
  {
    id: "hojas-secas",
    name: "Hojas Secas de Jardín",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Follaje caído de árboles y plantas, rico en carbono. Es un componente clave para equilibrar el compost junto con residuos ricos en nitrógeno como los restos de comida.",
    handling:
      "Recoger y almacenar en un lugar seco si no se van a compostar de inmediato. Evitar quemarlas, ya que genera contaminación atmosférica y está prohibido en muchas zonas.",
    recycling:
      "Aporta la fracción 'marrón' (carbono) necesaria en el compostaje. También puede usarse como mantillo protector para el suelo del jardín.",
    equipment: [
      { label: "Rastrillo" },
      { label: "Bolsa o contenedor para jardín" },
      { label: "Compostador doméstico" },
    ],
    tags: ["hojas", "jardín", "orgánico", "compost", "carbono"],
  },
  {
    id: "restos-poda",
    name: "Restos de Poda",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Ramas, tallos y recortes generados al podar árboles, arbustos o césped. Su volumen y dureza requieren trituración previa para facilitar su descomposición en el compost.",
    handling:
      "Triturar o cortar en piezas pequeñas antes de compostar. Separar ramas gruesas, que tardan más en descomponerse, de hojas y tallos tiernos.",
    recycling:
      "Triturado, se convierte en material estructural para compost o mantillo (mulch) que retiene humedad y protege el suelo.",
    equipment: [
      { label: "Trituradora de jardín o tijeras de podar" },
      { label: "Guantes de jardinería" },
      { label: "Compostador doméstico" },
    ],
    tags: ["poda", "ramas", "orgánico", "compost", "jardín"],
  },
  {
    id: "cascara-huevo",
    name: "Cáscara de Huevo",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Residuo rico en carbonato de calcio que, al descomponerse, aporta minerales valiosos al suelo. Es un residuo orgánico frecuente en la cocina diaria.",
    handling:
      "Enjuagar ligeramente para eliminar restos de clara o yema antes de almacenar, evitando malos olores. Triturar para acelerar su descomposición en el compost.",
    recycling:
      "Aporta calcio al compost, beneficioso para el crecimiento de plantas. También puede molerse fina y esparcirse directamente en macetas o jardín.",
    equipment: [
      { label: "Recipiente con tapa" },
      { label: "Mortero o molino para triturar (opcional)" },
    ],
    tags: ["huevo", "cáscara", "orgánico", "compost", "calcio"],
  },
  {
    id: "pan-duro",
    name: "Restos de Pan",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Sobras de pan duro o mohoso que ya no son aptas para el consumo. Se descomponen con facilidad, aunque pueden atraer plagas si no se gestionan correctamente.",
    handling:
      "Desmenuzar en trozos pequeños antes de depositar en el compost. Evitar grandes cantidades de una sola vez para prevenir la proliferación de roedores o insectos.",
    recycling:
      "Aporta carbohidratos al compost, acelerando la actividad microbiana. En pequeñas cantidades también puede usarse para alimentar aves de corral donde esté permitido.",
    equipment: [
      { label: "Cubo con tapa hermética" },
      { label: "Compostador doméstico" },
    ],
    tags: ["pan", "orgánico", "compost", "biodegradable", "cocina"],
  },
  {
    id: "posos-te",
    name: "Posos de Té / Bolsitas de Té",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Residuo vegetal resultante de infusionar hojas de té. Muchas bolsitas comerciales contienen fibras sintéticas o grapas metálicas que deben separarse antes de compostar.",
    handling:
      "Retirar grapas metálicas y, si la bolsita no es de papel 100% biodegradable, separar las hojas de té de la bolsa antes de desechar.",
    recycling:
      "Las hojas de té son un excelente aporte de nitrógeno para el compost; también pueden usarse directamente como abono para plantas de interior.",
    equipment: [
      { label: "Recipiente con tapa" },
      { label: "Tijeras para abrir bolsitas no compostables" },
    ],
    tags: ["té", "infusión", "orgánico", "compost", "biodegradable"],
  },
  {
    id: "restos-verduras",
    name: "Restos de Verduras",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Recortes, pieles y partes no utilizadas de verduras durante la preparación de alimentos, como tallos de brócoli, piel de zanahoria o puntas de cebolla. Representan una fracción importante del residuo orgánico de cocina.",
    handling:
      "Separar en recipiente específico inmediatamente durante la preparación de alimentos. Evitar mezclar con restos de carne o lácteos si se compostará en casa sin sistema industrial.",
    recycling:
      "Se compostan fácilmente aportando humedad y nutrientes; también pueden aprovecharse para elaborar caldos antes de desecharse.",
    equipment: [
      { label: "Cubo con tapa hermética" },
      { label: "Compostador doméstico" },
    ],
    tags: ["verduras", "orgánico", "compost", "cocina", "biodegradable"],
  },
  {
    id: "flores-marchitas",
    name: "Flores Marchitas",
    category: "Orgánico",
    riskLevel: "safe",
    riskLabel: "Compostable",
    description:
      "Arreglos florales, pétalos y tallos que han perdido su frescura. Suelen desecharse enteros junto con espuma floral u otros materiales no orgánicos que deben separarse antes de compostar.",
    handling:
      "Retirar cintas, alambres, espuma floral sintética y envolturas de plástico antes de desechar los tallos y pétalos. Trocear tallos leñosos para acelerar la descomposición.",
    recycling:
      "Los componentes vegetales son compostables; los elementos decorativos sintéticos deben desecharse por separado en el residuo que corresponda.",
    equipment: [
      { label: "Tijeras de jardín" },
      { label: "Compostador doméstico" },
    ],
    tags: ["flores", "orgánico", "compost", "jardín", "biodegradable"],
  },

  // ---- Peligroso (9 adicionales) ----
  {
    id: "pintura-solventes",
    name: "Pintura y Solventes",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "Las pinturas, barnices y disolventes contienen compuestos orgánicos volátiles (COV), metales pesados y solventes inflamables. Verterlos por el desagüe contamina el agua y sus vapores son tóxicos al inhalarse en espacios cerrados.",
    handling:
      "Dejar secar la pintura sobrante dentro del envase original antes de desechar, si es a base de agua. Nunca verter por el desagüe ni mezclar con otros residuos químicos. Mantener en lugar ventilado y lejos de fuentes de calor.",
    recycling:
      "Los solventes pueden destilarse y reutilizarse en procesos industriales; la pintura seca se trata como residuo peligroso sólido. Llevar a centros municipales de residuos peligrosos.",
    equipment: [
      { label: "Guantes resistentes a químicos" },
      { label: "Mascarilla con filtro para vapores orgánicos" },
      { label: "Zona ventilada" },
      { label: "Envase original etiquetado" },
    ],
    tags: ["pintura", "solvente", "químico", "tóxico", "peligroso"],
  },
  {
    id: "pesticida",
    name: "Pesticidas / Agroquímicos",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "Productos formulados para eliminar plagas que contienen compuestos tóxicos para la vida acuática, los polinizadores y la salud humana. Sus envases vacíos conservan residuos peligrosos incluso después de usarse por completo.",
    handling:
      "Nunca reutilizar los envases para otros fines. No verter sobrantes en el suelo, desagües o cuerpos de agua. Almacenar en su envase original, bien cerrado y alejado de alimentos y niños.",
    recycling:
      "Algunos programas agrícolas certificados realizan triple lavado y reciclan los envases plásticos; el producto sobrante debe entregarse en centros de residuos peligrosos.",
    equipment: [
      { label: "Guantes resistentes a químicos" },
      { label: "Mascarilla con filtro específico" },
      { label: "Gafas de protección" },
      { label: "Ropa de manga larga" },
    ],
    tags: ["pesticida", "agroquímico", "tóxico", "químico", "peligroso"],
  },
  {
    id: "medicamento-vencido",
    name: "Medicamentos Vencidos",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Peligroso Farmacéutico",
    description:
      "Fármacos caducados o no utilizados que, si se desechan en la basura común o el inodoro, contaminan fuentes de agua y pueden generar resistencia bacteriana en el ambiente. Representan también riesgo de ingestión accidental.",
    handling:
      "No tirar al inodoro ni a la basura doméstica. Mantener en su empaque original con el prospecto. Llevar a farmacias o puntos de recolección con programas de retorno de medicamentos (Punto Limpio).",
    recycling:
      "No reciclables; requieren incineración controlada en plantas autorizadas para residuos farmacéuticos.",
    equipment: [
      { label: "Bolsa sellada para transporte" },
      { label: "Punto de recolección farmacéutico" },
    ],
    tags: ["medicamento", "farmacéutico", "caducado", "químico", "peligroso"],
  },
  {
    id: "bateria-auto",
    name: "Batería de Auto (Plomo-Ácido)",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "Contiene ácido sulfúrico corrosivo y placas de plomo, un metal pesado altamente tóxico para el sistema nervioso. Su manejo inadecuado puede causar quemaduras químicas y contaminación severa de suelo y agua.",
    handling:
      "Transportar siempre en posición vertical para evitar derrames de ácido. No perforar la carcasa. Llevar a talleres mecánicos, tiendas de autopartes o centros de acopio especializados en baterías de plomo-ácido.",
    recycling:
      "Altamente reciclable: el plomo se recupera y refunde para fabricar nuevas baterías, y el ácido se neutraliza o reutiliza en procesos industriales controlados.",
    equipment: [
      { label: "Guantes resistentes a químicos" },
      { label: "Gafas de protección" },
      { label: "Transporte vertical seguro" },
    ],
    tags: ["batería", "auto", "plomo", "ácido", "peligroso"],
  },
  {
    id: "aerosol",
    name: "Aerosol / Lata a Presión",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Peligroso — Inflamable",
    description:
      "Envases presurizados que contienen gases propelentes inflamables y, en algunos casos, residuos químicos del producto original. Representan riesgo de explosión si se perforan, aplastan o exponen al fuego.",
    handling:
      "Nunca perforar, quemar ni compactar el envase, incluso si parece vacío. Verificar que no quede producto residual antes de desechar. Mantener alejado de fuentes de calor.",
    recycling:
      "El metal del envase (aluminio o acero) es reciclable una vez completamente vacío; llevar a puntos de recolección de metales o residuos peligrosos según la normativa local.",
    equipment: [
      { label: "Guantes de protección" },
      { label: "Zona libre de llamas o chispas" },
    ],
    tags: ["aerosol", "lata", "presión", "inflamable", "peligroso"],
  },
  {
    id: "termometro-mercurio",
    name: "Termómetro de Mercurio Roto",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "El mercurio es un metal líquido neurotóxico que se volatiliza a temperatura ambiente, representando un riesgo respiratorio grave en espacios cerrados. Un termómetro roto puede liberar vapores tóxicos durante semanas si no se limpia correctamente.",
    handling:
      "Ventilar el área inmediatamente. No usar aspiradora ni escoba, ya que dispersan el mercurio. Recoger las gotas con cartón rígido o jeringa y depositarlas en un frasco de vidrio sellado. Nunca tocar el mercurio con las manos.",
    recycling:
      "No reciclable en el hogar. Debe entregarse sellado en un centro de residuos peligrosos para su tratamiento especializado de recuperación de mercurio.",
    equipment: [
      { label: "Guantes de nitrilo" },
      { label: "Frasco de vidrio con tapa hermética" },
      { label: "Cartón rígido o jeringa sin aguja" },
      { label: "Ventilación del área" },
    ],
    tags: ["mercurio", "termómetro", "tóxico", "neurotóxico", "peligroso"],
  },
  {
    id: "limpiador-toxico",
    name: "Producto de Limpieza Tóxico",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Peligroso Químico",
    description:
      "Productos como cloro, amoníaco, destapadores de cañerías o desinfectantes concentrados que pueden generar gases tóxicos al mezclarse entre sí o con otras sustancias, además de ser corrosivos al contacto con la piel.",
    handling:
      "Nunca mezclar distintos productos de limpieza entre sí. Mantener en su envase original, bien cerrado y en un lugar ventilado. No verter grandes cantidades por el desagüe sin diluir según las instrucciones del fabricante.",
    recycling:
      "El envase vacío y enjuagado según indicaciones puede reciclarse como plástico; el producto sobrante en grandes cantidades debe llevarse a un centro de residuos peligrosos.",
    equipment: [
      { label: "Guantes resistentes a químicos" },
      { label: "Gafas de protección" },
      { label: "Zona ventilada" },
    ],
    tags: ["limpiador", "químico", "tóxico", "corrosivo", "peligroso"],
  },
  {
    id: "gasolina",
    name: "Combustible / Gasolina",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "Líquido altamente inflamable y volátil derivado del petróleo. Sus vapores pueden causar incendios o explosiones, y su vertido contamina gravemente suelos y aguas subterráneas.",
    handling:
      "Almacenar únicamente en recipientes certificados para combustibles, bien cerrados y en lugares ventilados alejados de fuentes de ignición. Nunca verter en el suelo, desagües o la basura.",
    recycling:
      "Puede entregarse a centros de residuos peligrosos o gasolineras que cuenten con programas de recuperación de combustibles para su reprocesamiento o uso industrial controlado.",
    equipment: [
      { label: "Recipiente certificado para combustibles" },
      { label: "Guantes resistentes a solventes" },
      { label: "Zona libre de llamas o chispas" },
    ],
    tags: ["gasolina", "combustible", "inflamable", "tóxico", "peligroso"],
  },
  {
    id: "asbesto",
    name: "Asbesto / Amianto",
    category: "Peligroso",
    riskLevel: "danger",
    riskLabel: "Altamente Peligroso",
    description:
      "Material fibroso usado antiguamente en techos y recubrimientos por su resistencia al fuego. Al deteriorarse o fracturarse, libera fibras microscópicas que, al inhalarse, causan enfermedades pulmonares graves como la asbestosis y el mesotelioma.",
    handling:
      "No romper, lijar ni perforar materiales que contengan asbesto. Humedecer antes de manipular para reducir la dispersión de fibras. La remoción debe realizarla personal certificado con equipo de protección respiratoria especializado.",
    recycling:
      "No reciclable. Debe empaquetarse en bolsas selladas específicas para asbesto y entregarse a plantas de disposición de residuos peligrosos autorizadas.",
    equipment: [
      { label: "Respirador con filtro para partículas (P100)" },
      { label: "Traje de protección desechable" },
      { label: "Bolsas selladas especiales para asbesto" },
    ],
    tags: ["asbesto", "amianto", "fibras", "tóxico", "peligroso"],
  },

  // ---- Reciclable (8 adicionales) ----
  {
    id: "papel",
    name: "Papel",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Material celulósico utilizado en hojas de oficina, cuadernos y documentos impresos. Es uno de los residuos más comunes en hogares y oficinas, y su reciclaje reduce significativamente la tala de árboles.",
    handling:
      "Mantener seco y libre de grasa o comida. Retirar clips, grapas y espirales metálicas antes de desechar. Separar del papel carbón o papel encerado, que no son reciclables convencionalmente.",
    recycling:
      "Depositar en contenedor azul o de papel/cartón. Se procesa mediante trituración y repulpado para fabricar nuevo papel; puede reciclarse varias veces antes de que las fibras se degraden.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor azul (reciclables)" },
    ],
    tags: ["papel", "oficina", "celulosa", "reciclar", "documentos"],
  },
  {
    id: "botella-pet",
    name: "Botella de Plástico PET",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Envase plástico fabricado con tereftalato de polietileno (PET), identificado con el símbolo número 1 en el triángulo de reciclaje. Es uno de los plásticos más reciclados a nivel mundial gracias a su pureza como material.",
    handling:
      "Vaciar completamente el contenido líquido antes de desechar. Aplastar la botella para reducir volumen y retirar la tapa si el programa de reciclaje local lo solicita. Enjuagar si contuvo líquidos azucarados.",
    recycling:
      "Depositar en contenedor amarillo o de plásticos. Se tritura en escamas (flakes), se lava y se funde para producir fibra textil, nuevos envases u otros productos plásticos.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor amarillo (plásticos)" },
    ],
    tags: ["botella", "plástico", "PET", "reciclar", "envase"],
  },
  {
    id: "lata-aluminio",
    name: "Lata de Aluminio",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Envase ligero utilizado comúnmente para bebidas, fabricado de aluminio, un metal infinitamente reciclable sin pérdida de calidad. Reciclar aluminio consume hasta un 95% menos energía que producirlo desde mineral virgen.",
    handling:
      "Enjuagar para eliminar restos de bebida y aplastar para reducir volumen. No es necesario separar la anilla, ya que es del mismo material.",
    recycling:
      "Depositar en contenedor amarillo o de metales. Se funde a baja temperatura comparada con el aluminio virgen, y puede estar de vuelta en los estantes como nueva lata en semanas.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor amarillo (metales/plásticos)" },
    ],
    tags: ["lata", "aluminio", "metal", "reciclar", "bebida"],
  },
  {
    id: "lata-hojalata",
    name: "Lata de Hojalata / Acero",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Envase metálico usado para conservas de alimentos, fabricado de acero recubierto con una fina capa de estaño. Es fácilmente separable con imanes en las plantas de reciclaje, lo que facilita su recuperación.",
    handling:
      "Enjuagar para eliminar restos de alimento. Revisar bordes filosos tras abrir la lata y manipular con cuidado. Aplastar si es posible para ahorrar espacio.",
    recycling:
      "Depositar en contenedor amarillo o de metales. Se recupera mediante separación magnética y se refunde para fabricar nuevo acero, un proceso que puede repetirse indefinidamente.",
    equipment: [
      { label: "Guantes para evitar cortes con bordes filosos" },
      { label: "Contenedor amarillo (metales)" },
    ],
    tags: ["lata", "hojalata", "acero", "metal", "reciclar"],
  },
  {
    id: "periodico",
    name: "Periódico",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Papel de baja gramatura e impresión diaria, con fibras más cortas que el papel de oficina debido a su proceso de fabricación rápido. Es ampliamente reciclado para producir papel reciclado de menor calidad.",
    handling:
      "Mantener seco y apilado. No mezclar con residuos orgánicos o papel engrasado. Puede reutilizarse como material de embalaje o absorbente antes de reciclarse.",
    recycling:
      "Depositar en contenedor azul o de papel. Se repulpa para fabricar nuevo papel periódico, cartón o papel higiénico reciclado.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor azul (papel/cartón)" },
    ],
    tags: ["periódico", "papel", "reciclar", "celulosa", "impreso"],
  },
  {
    id: "revista",
    name: "Revista",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Publicación impresa en papel couché o satinado, con tintas y recubrimientos que requieren un proceso de reciclaje algo más complejo que el papel común debido a su acabado brillante.",
    handling:
      "Retirar elementos no reciclables como espirales plásticos, muestras de perfume adheridas o portadas con textura plástica antes de desechar.",
    recycling:
      "Depositar en contenedor azul o de papel. El proceso de repulpado elimina las tintas y recubrimientos para reincorporar las fibras a nuevo papel.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor azul (papel/cartón)" },
    ],
    tags: ["revista", "papel", "impreso", "reciclar", "celulosa"],
  },
  {
    id: "tetra-pak",
    name: "Tetra Pak / Cartón para Líquidos",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Envase compuesto por capas de cartón, plástico y aluminio, utilizado para leche, jugos y otros líquidos. Su estructura multicapa requiere plantas especializadas capaces de separar los distintos materiales.",
    handling:
      "Vaciar completamente, enjuagar brevemente y aplastar para reducir volumen. No es necesario separar las capas en casa; eso se realiza en planta.",
    recycling:
      "Depositar en contenedor específico para Tetra Pak o de papel/cartón según la normativa local. En planta se separan las fibras de celulosa del plástico y aluminio mediante hidropulpeo.",
    equipment: [
      { label: "Sin equipo especial requerido" },
      { label: "Contenedor para cartón para líquidos" },
    ],
    tags: ["tetrapak", "cartón", "envase", "reciclar", "multicapa"],
  },
  {
    id: "chatarra-metalica",
    name: "Chatarra Metálica",
    category: "Reciclable",
    riskLevel: "safe",
    riskLabel: "Reciclable",
    description:
      "Restos de piezas metálicas, herramientas rotas, tuberías o estructuras de hierro, acero, cobre o aluminio provenientes de construcción, reparaciones o electrodomésticos. Tiene alto valor de recuperación en el mercado de metales.",
    handling:
      "Separar por tipo de metal si es posible (ferroso y no ferroso) para facilitar su venta o entrega. Manipular piezas con bordes filosos u oxidados con guantes reforzados.",
    recycling:
      "Llevar a chatarrerías o centros de acopio de metales, donde se pesa, clasifica y funde para fabricar nuevos productos metálicos, con gran ahorro energético frente al metal virgen.",
    equipment: [
      { label: "Guantes de cuero reforzado" },
      { label: "Transporte adecuado según peso y volumen" },
    ],
    tags: ["chatarra", "metal", "acero", "cobre", "reciclar"],
  },

  // ---- Residuo Sanitario (9 adicionales) ----
  {
    id: "guantes-desechables",
    name: "Guantes Desechables",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Guantes de látex, nitrilo o vinilo de un solo uso, empleados en contextos médicos, de limpieza o alimentarios. Pueden estar contaminados con fluidos corporales, químicos o patógenos según su uso.",
    handling:
      "Retirar volteándolos hacia adentro para evitar el contacto con la superficie contaminada. Depositar en bolsa cerrada. En contexto médico o de enfermedad activa, tratar como residuo biológico.",
    recycling:
      "Generalmente no reciclables por contaminación y mezcla de materiales. En uso doméstico sin riesgo biológico, se desechan en bolsa cerrada con la basura general.",
    equipment: [
      { label: "Bolsa de plástico cerrada" },
      { label: "Lavado de manos posterior" },
    ],
    tags: ["guantes", "sanitario", "desechable", "látex", "nitrilo"],
  },
  {
    id: "pañal",
    name: "Pañal Desechable",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Producto absorbente de un solo uso compuesto por plástico, celulosa y polímeros superabsorbentes. Contiene desechos biológicos humanos y tarda cientos de años en degradarse en un relleno sanitario.",
    handling:
      "Enrollar y cerrar con sus propias cintas adhesivas para contener el contenido. Depositar en bolsa cerrada. No arrojar al inodoro bajo ninguna circunstancia.",
    recycling:
      "No reciclable en la mayoría de los sistemas municipales. Algunos programas especializados separan la celulosa y el plástico mediante procesos industriales específicos.",
    equipment: [
      { label: "Bolsa de plástico cerrada" },
      { label: "Guantes desechables (opcional)" },
    ],
    tags: ["pañal", "sanitario", "desechable", "absorbente", "plástico"],
  },
  {
    id: "toalla-sanitaria",
    name: "Toalla Sanitaria / Compresa",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Producto de higiene femenina compuesto por celulosa, polímeros absorbentes y una capa plástica impermeable. Contiene fluidos biológicos y no es apta para desecharse por el inodoro.",
    handling:
      "Envolver en papel higiénico o su propia envoltura antes de depositar en bolsa cerrada. Nunca arrojar al inodoro, ya que puede obstruir tuberías y sistemas de alcantarillado.",
    recycling:
      "No reciclable por su composición mixta y contaminación biológica. Se dispone en bolsa cerrada junto con la basura sanitaria general.",
    equipment: [
      { label: "Bolsa de plástico pequeña" },
      { label: "Papel higiénico para envolver" },
    ],
    tags: ["compresa", "sanitario", "higiene", "desechable", "absorbente"],
  },
  {
    id: "papel-higienico-usado",
    name: "Papel Higiénico Usado",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Papel de celulosa de un solo uso para higiene personal, diseñado para disolverse en agua en pequeñas cantidades. En sistemas de alcantarillado antiguos o con tuberías delicadas, se recomienda no desecharlo por el inodoro.",
    handling:
      "En la mayoría de los sistemas modernos puede desecharse por el inodoro en cantidades normales. En zonas con tuberías sensibles o sistemas sépticos delicados, depositar en bote con bolsa y tapa.",
    recycling:
      "No reciclable debido a su diseño biodegradable de disolución rápida y a la contaminación biológica.",
    equipment: [
      { label: "Bote con tapa y bolsa (si no se desecha por el inodoro)" },
    ],
    tags: ["papel higiénico", "sanitario", "celulosa", "desechable"],
  },
  {
    id: "algodon-usado",
    name: "Algodón Usado",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Fibra natural utilizada para limpieza facial, aplicación de productos o curaciones menores. Tras su uso puede contener residuos de maquillaje, alcohol, sangre u otros fluidos.",
    handling:
      "Depositar en bote con bolsa, nunca al inodoro ya que puede obstruir tuberías al no disolverse. Si tuvo contacto con sangre u otros fluidos corporales en cantidad, tratar como residuo biológico.",
    recycling:
      "No reciclable por contaminación. Se dispone junto con la basura sanitaria general en bolsa cerrada.",
    equipment: [{ label: "Bote con tapa y bolsa" }],
    tags: ["algodón", "sanitario", "desechable", "higiene"],
  },
  {
    id: "venda",
    name: "Venda / Apósito",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Material textil o de gasa utilizado para cubrir heridas o inmovilizar lesiones. Puede estar impregnado de sangre, exudado o antisépticos, representando riesgo biológico leve a moderado según el caso.",
    handling:
      "Retirar con guantes y depositar en bolsa cerrada. Si proviene de una herida infectada o de un entorno hospitalario, tratar como residuo biológico-infeccioso según protocolo.",
    recycling:
      "No reciclable por contaminación biológica y mezcla de materiales (gasa, adhesivo, a veces plástico).",
    equipment: [
      { label: "Guantes desechables" },
      { label: "Bolsa de plástico cerrada" },
    ],
    tags: ["venda", "apósito", "sanitario", "herida", "gasa"],
  },
  {
    id: "hisopo",
    name: "Hisopo de Algodón",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Pequeño bastoncillo con puntas de algodón sobre un eje de plástico o papel, usado para limpieza de oídos o aplicación de productos. Su tamaño reducido hace que frecuentemente termine contaminando el mar al ser arrojado al inodoro.",
    handling:
      "Nunca desechar por el inodoro; depositar siempre en bote con bolsa. Preferir versiones con eje de papel o cartón, más fáciles de degradar que las de plástico.",
    recycling:
      "No reciclable por la mezcla de algodón y plástico o papel. En algunos casos los ejes de cartón pueden compostarse si se retira el algodón.",
    equipment: [{ label: "Bote con tapa y bolsa" }],
    tags: ["hisopo", "algodón", "sanitario", "desechable", "plástico"],
  },
  {
    id: "protector-bucal",
    name: "Protector Bucal Desechable",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Dispositivo de un solo uso empleado en consultas dentales o médicas para exámenes bucales, fabricado generalmente de plástico o silicona de bajo costo. Puede tener contacto directo con saliva y fluidos orales.",
    handling:
      "Desechar en bolsa cerrada inmediatamente después de su uso. En contexto clínico, seguir el protocolo de residuos biológico-infecciosos del centro de salud.",
    recycling:
      "No reciclable por contaminación biológica directa con fluidos corporales.",
    equipment: [
      { label: "Guantes desechables" },
      { label: "Bolsa de plástico cerrada" },
    ],
    tags: ["protector bucal", "sanitario", "dental", "desechable"],
  },
  {
    id: "toallita-humeda",
    name: "Toallita Húmeda",
    category: "Residuo Sanitario",
    riskLevel: "caution",
    riskLabel: "Precaución — Sanitario",
    description:
      "Paño desechable impregnado de líquido limpiador, usado para higiene personal o de superficies. Está hecho de fibras sintéticas no biodegradables que no se disuelven en agua, siendo una de las principales causas de obstrucciones en el alcantarillado.",
    handling:
      "Nunca desechar por el inodoro, aunque la etiqueta indique 'biodegradable', ya que su descomposición es muy lenta. Depositar siempre en bote con bolsa cerrada.",
    recycling:
      "No reciclable por su composición de fibras sintéticas mezcladas con químicos de limpieza.",
    equipment: [{ label: "Bote con tapa y bolsa" }],
    tags: ["toallita", "húmeda", "sanitario", "desechable", "plástico"],
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
