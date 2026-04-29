import type {
  PsProjectDetail,
  GenerationSession,
  PsGeneratedImage
} from './projects.types';

/* ─── Helpers ───────────────────────────────────────────────── */

function makeImages(count: number, baseHue: number): PsGeneratedImage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `img-${(baseHue * 31 + i * 97).toString(16).padStart(7, '0')}`,
    accentColor: `hsl(${(baseHue + i * 18) % 360}, 55%, 42%)`
  }));
}

function makeSession(
  id: string,
  date: Date,
  skus: string[],
  imageCount: number,
  baseHue: number,
  freeText?: string
): GenerationSession {
  return {
    id,
    generatedAt: date,
    images: makeImages(imageCount, baseHue),
    params: {
      skus,
      imageType: 'Perfect Store',
      angle: 'Frontal',
      aspectRatio: '1:1',
      quality: 'Alto',
      freeText
    }
  };
}

/* ─── Mock Data ─────────────────────────────────────────────── */

const PS_PROJECTS: PsProjectDetail[] = [
  /* ── Bretaña (10 proyectos) ─────────────────────────────── */
  {
    id: 'ps-b01',
    name: 'Bretaña Verano Caribe 2026',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/3.png',
    skus: ['Bretaña Mora 400ml', 'Bretaña Fresa 400ml'],
    createdAt: new Date('2026-03-10'),
    sessions: [
      makeSession(
        'ses-b01a',
        new Date('2026-04-17T09:15:00'),
        ['Bretaña Mora 400ml', 'Bretaña Fresa 400ml'],
        4,
        340,
        'Botella de Bretaña Mora 400ml en primer plano sobre arena fina y húmeda de playa caribeña colombiana al atardecer, olas suaves llegando a la orilla desenfocadas al fondo, palmeras inclinadas por la brisa tropical fuera de foco, gotas de condensación sobre el vidrio frío refractando rayos dorados del sol poniente, reflejo del cielo anaranjado en el cuerpo de la botella, texturas de arena alrededor de la base, fotografía comercial premium estilo lifestyle playero, lente 85mm f/1.4, hora dorada, colores saturados y cálidos, mood vacacional y refrescante'
      ),
      makeSession(
        'ses-b01b',
        new Date('2026-04-14T16:30:00'),
        ['Bretaña Fresa 400ml'],
        2,
        355,
        'Botella de Bretaña Fresa 400ml sobre toalla de playa de rayas coloridas, fondo de playa tropical desenfocado con turistas en silueta, sombrilla de playa amarilla fuera de foco creando bokeh cálido, luz solar directa de mediodía con sombras cortas y duras, gotas de agua sobre el empaque rojo frambuesa, superficie de arena blanca granulada, fotografía editorial lifestyle veraniego, Canon 50mm f/2, alto contraste, colores tropicales vibrantes'
      )
    ]
  },
  {
    id: 'ps-b02',
    name: 'Bretaña Góndola Nacional',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/4.webp',
    skus: ['Bretaña Mora 400ml', 'Bretaña Maracuyá 400ml', 'Bretaña Uva 400ml'],
    createdAt: new Date('2026-02-20'),
    sessions: [
      makeSession(
        'ses-b02a',
        new Date('2026-04-16T10:00:00'),
        ['Bretaña Mora 400ml', 'Bretaña Maracuyá 400ml'],
        4,
        320,
        'Góndola de supermercado de cadena colombiana completamente surtida con Bretaña Mora y Maracuyá, tres niveles de botellas perfectamente alineadas al frente con etiquetas visibles y sin rotación, señalética corporativa de precio en amarillo institucional, iluminación cenital LED blanco frío sin sombras, piso vinílico brillante reflectante, carros de supermercado al fondo completamente desenfocados, fotografía planograma de alta resolución, lente 24mm gran angular leve, perspectiva frontal a altura de producto'
      )
    ]
  },
  {
    id: 'ps-b03',
    name: 'Bretaña Activación Colegio',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/5.png',
    skus: ['Bretaña Fresa 250ml', 'Bretaña Mora 250ml'],
    createdAt: new Date('2026-02-05'),
    sessions: [
      makeSession(
        'ses-b03a',
        new Date('2026-04-15T08:00:00'),
        ['Bretaña Fresa 250ml'],
        3,
        5,
        'Botella pequeña de Bretaña Fresa 250ml sobre mesa escolar de madera con cuadernos y colores al fondo completamente desenfocados, luz natural de ventana de salón creando sombra suave lateral, empaque rojo brillante contrastando con superficie beige de la mesa, fotografía de producto lifestyle escolar, lente 50mm, foco preciso en el empaque, bokeh cremoso en fondo de aula'
      )
    ]
  },
  {
    id: 'ps-b04',
    name: 'Bretaña Tienda Barrio Q1',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/6-v1.png',
    skus: ['Bretaña Mora 400ml', 'Bretaña Uva 400ml'],
    createdAt: new Date('2026-01-15'),
    sessions: [
      makeSession(
        'ses-b04a',
        new Date('2026-04-13T14:00:00'),
        ['Bretaña Mora 400ml', 'Bretaña Uva 400ml'],
        4,
        290,
        'Nevera de piso de tienda de barrio bogotana completamente surtida con Bretaña, botellas de Mora y Uva organizadas por sabor en cada bandeja, iluminación interna de la nevera creando brillo frío sobre los empaques, puerta de vidrio entreabierta mostrando el interior, fondo del local con estantes de víveres fuera de foco, luz fluorescente cálida del establecimiento, fotografía documental de punto de venta, lente 35mm, ambiente auténtico de tendero colombiano'
      )
    ]
  },
  {
    id: 'ps-b05',
    name: 'Bretaña Perfect Store Jumbo',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/8.webp',
    skus: [
      'Bretaña Maracuyá 400ml',
      'Bretaña Fresa 400ml',
      'Bretaña Uva 400ml'
    ],
    createdAt: new Date('2026-01-08'),
    sessions: [
      makeSession(
        'ses-b05a',
        new Date('2026-04-12T11:00:00'),
        ['Bretaña Maracuyá 400ml'],
        4,
        45,
        'Exhibición de cabecera de góndola Jumbo con Bretaña Maracuyá en display de cartón corporativo naranja y verde, botellas en pirámide estable con frentes perfectamente orientados, señalética de oferta 2x1 en rojo, iluminación de punto focal LED sobre el display, piso brillante de supermercado reflectante, pasillo lateral de bebidas visible al fondo, fotografía comercial de alta calidad, perspectiva de consumidor, lente 35mm'
      )
    ]
  },
  {
    id: 'ps-b06',
    name: 'Bretaña Lanzamiento Maracuyá',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/limonada-cereza-683x1024%20(1).jpg',
    skus: ['Bretaña Maracuyá 400ml'],
    createdAt: new Date('2025-12-01'),
    sessions: [
      makeSession(
        'ses-b06a',
        new Date('2026-04-10T09:30:00'),
        ['Bretaña Maracuyá 400ml'],
        6,
        38,
        'Botella de Bretaña Maracuyá 400ml sobre superficie de mármol blanco con vetas grises, maracuyás partidos al rededor derramando jugo naranja brillante, hojas tropicales verdes como decoración natural, fondo neutro gris perla, iluminación de estudio difusa y suave, reflejos controlados sobre el vidrio del empaque, fotografía de producto gastro-editorial estilo revista, lente 100mm macro, foco perfecto en el empaque, colores frescos y apetitosos'
      )
    ]
  },
  {
    id: 'ps-b07',
    name: 'Bretaña Navidad 2025',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/limonada-cereza-683x1024.jpg',
    skus: ['Bretaña Mora 1.5L', 'Bretaña Fresa 1.5L'],
    createdAt: new Date('2025-11-15'),
    sessions: [
      makeSession(
        'ses-b07a',
        new Date('2026-04-08T15:00:00'),
        ['Bretaña Mora 1.5L'],
        4,
        0,
        'Botella familiar de Bretaña Mora 1.5L en mesa navideña colombiana con mantel rojo, rodeada de decoraciones doradas y verdes fuera de foco, luces de árbol de navidad creando bokeh circular cálido en el fondo, vaso con hielo y bebida servida al lado, ambiente festivo y familiar, fotografía lifestyle de mesa familiar, lente 50mm f/1.8, tonos cálidos rojizos y dorados, mood celebración y reunión familiar'
      )
    ]
  },
  {
    id: 'ps-b08',
    name: 'Bretaña Canal Moderno',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/mowi-910x1024.jpg',
    skus: ['Bretaña Uva 400ml', 'Bretaña Mora 400ml'],
    createdAt: new Date('2025-11-01'),
    sessions: [
      makeSession(
        'ses-b08a',
        new Date('2026-04-06T10:15:00'),
        ['Bretaña Uva 400ml'],
        3,
        270,
        'Nevera de conveniencia tipo gorila de minimercado moderno con Bretaña Uva perfectamente organizada, iluminación LED interna blanca fría que resalta el morado del empaque, puerta de vidrio con marco negro de aluminio, productos en posición perfecta facing, piso de cerámica gris del local al fondo, fotografía retail ejecutiva, lente 35mm, perspectiva frontal ligeramente elevada, alto contraste y saturación'
      )
    ]
  },
  {
    id: 'ps-b09',
    name: 'Bretaña Impulso Cajas',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/naranja-pina-683x1024.jpg',
    skus: [
      'Bretaña Fresa 250ml',
      'Bretaña Maracuyá 250ml',
      'Bretaña Uva 250ml'
    ],
    createdAt: new Date('2025-10-10'),
    sessions: [
      makeSession(
        'ses-b09a',
        new Date('2026-04-04T13:45:00'),
        ['Bretaña Fresa 250ml', 'Bretaña Maracuyá 250ml'],
        4,
        15,
        'Display de impulso en zona de cajas registradoras de supermercado con Bretaña 250ml en variedad de sabores, botellitas apiladas en canasta de exhibición de color rojo corporativo, iluminación mixta de tienda y luz natural de entrada, empaque pequeño muy legible a esa altura, clientes pagando al fondo completamente desenfocados, fotografía punto de impulso comercial, lente 35mm, perspectiva desde altura de caja registradora'
      )
    ]
  },
  {
    id: 'ps-b10',
    name: 'Bretaña Lifestyle Urbano',
    brand: 'Bretaña',
    thumbnail: '/images/Breta%C3%B1a/tamarindo.png',
    skus: ['Bretaña Mora 400ml', 'Bretaña Maracuyá 400ml'],
    createdAt: new Date('2025-09-20'),
    sessions: [
      makeSession(
        'ses-b10a',
        new Date('2026-04-02T17:00:00'),
        ['Bretaña Mora 400ml'],
        4,
        330,
        'Joven universitario colombiano de 20 años tomando Bretaña Mora 400ml en parque urbano de Bogotá, fondo de edificios modernos y árboles desenfocados con bokeh suave, luz de tarde nublada característica bogotana, botella sostenida naturalmente con una mano, ropa casual urbana, expresión relajada y auténtica, fotografía street lifestyle editorial, lente 85mm f/1.8, paleta de colores fríos azulados con el rojo del empaque como acento visual'
      )
    ]
  },

  /* ── Colombiana (6 proyectos) ───────────────────────────── */
  {
    id: 'ps-001',
    name: 'Campaña Verano 2026',
    brand: 'Colombiana',
    thumbnail: '/images/Colombiana/2_5_1.png',
    skus: ['Colombiana 400ml', 'Colombiana 1.5L', 'Colombiana Naranja 400ml'],
    createdAt: new Date('2026-04-01'),
    sessions: [
      makeSession(
        'ses-001',
        new Date('2026-04-15T10:22:00'),
        ['Colombiana 400ml', 'Colombiana 1.5L'],
        4,
        195,
        'Nevera de conveniencia tipo gorila completamente surtida en tienda de barrio colombiana, botellas de Colombiana 400ml y 1.5L perfectamente alineadas al frente con etiquetas visibles, iluminación fría fluorescente de supermercado que resalta los rojos del empaque, fondo de estantería metálica con productos adicionales fuera de foco, suelo de cerámica blanca, ambiente limpio y ordenado, fotografía comercial de alta resolución, lente 50mm, bokeh suave en el fondo'
      ),
      makeSession(
        'ses-002',
        new Date('2026-04-14T16:05:00'),
        ['Colombiana Naranja 400ml'],
        2,
        30,
        'Botella de Colombiana Naranja 400ml sobre mostrador de tienda de barrio, luz natural cálida entrando por ventana lateral que crea un halo dorado alrededor del producto, fondo desenfocado de estantes con productos variados, gotas de condensación sobre el vidrio frío, superficie de madera rústica, estética lifestyle urbana colombiana, fotografía editorial de producto, tonos cálidos y saturados, hora dorada'
      ),
      makeSession(
        'ses-003',
        new Date('2026-04-12T09:40:00'),
        ['Colombiana 400ml'],
        6,
        215,
        'Vista cenital perfecta de góndola de supermercado de cadena con botellas de Colombiana 400ml organizadas en filas uniformes, señalética de precio amarilla, productos frente al frente con etiquetas alineadas milimétricamente, iluminación cenital LED blanco, ambiente hiperclean estilo retail moderno, fotografía de arquitectura comercial, gran angular, alta saturación'
      )
    ]
  },
  {
    id: 'ps-c02',
    name: 'Colombiana 70 Años',
    brand: 'Colombiana',
    thumbnail: '/images/Colombiana/3.webp',
    skus: ['Colombiana 400ml', 'Colombiana 1.5L'],
    createdAt: new Date('2025-11-01'),
    sessions: [
      makeSession(
        'ses-c02a',
        new Date('2026-04-11T10:00:00'),
        ['Colombiana 400ml'],
        4,
        200,
        'Edición especial botella Colombiana 400ml con sello conmemorativo 70 años sobre fondo negro con detalles dorados, iluminación de estudio con rim light dorado perimetral, reflejo perfecto en superficie oscura espejada, fotografía de producto luxury editorial, lente 100mm, composición centrada con simetría perfecta, mood celebración institucional y premium'
      )
    ]
  },
  {
    id: 'ps-c03',
    name: 'Colombiana Góndola Q2',
    brand: 'Colombiana',
    thumbnail:
      '/images/Colombiana/83e6d28646340c7ef5b37db25a87d06c3829aa2d_SoftDrinks_509470_06.jpg',
    skus: [
      'Colombiana 400ml',
      'Colombiana Naranja 400ml',
      'Colombiana Uva 400ml'
    ],
    createdAt: new Date('2026-01-10'),
    sessions: [
      makeSession(
        'ses-c03a',
        new Date('2026-04-09T09:00:00'),
        ['Colombiana 400ml', 'Colombiana Naranja 400ml'],
        4,
        185,
        'Pasillo de bebidas en Éxito con bloque mixto de Colombiana por sabores, señalética de precio institucional, tres niveles de producto perfectamente alineados, iluminación cenital de supermercado, perspectiva a altura de producto, fotografía planograma comercial'
      )
    ]
  },
  {
    id: 'ps-c04',
    name: 'Colombiana Navidad',
    brand: 'Colombiana',
    thumbnail: '/images/Colombiana/848x600_carnaval.webp',
    skus: ['Colombiana 1.5L', 'Colombiana 400ml'],
    createdAt: new Date('2025-12-01'),
    sessions: [
      makeSession(
        'ses-c04a',
        new Date('2026-04-07T14:00:00'),
        ['Colombiana 1.5L'],
        4,
        0,
        'Botella familiar Colombiana 1.5L en mesa navideña con mantel rojo y decoraciones doradas, pavo y bandeja de comida colombiana alrededor fuera de foco, luces de navidad creando bokeh dorado cálido, fotografía lifestyle familiar, lente 50mm, tonos cálidos festivos'
      )
    ]
  },
  {
    id: 'ps-c05',
    name: 'Colombiana Tiendas de Barrio',
    brand: 'Colombiana',
    thumbnail: '/images/Colombiana/P-0001-3.png',
    skus: ['Colombiana 400ml'],
    createdAt: new Date('2025-10-15'),
    sessions: [
      makeSession(
        'ses-c05a',
        new Date('2026-04-05T11:30:00'),
        ['Colombiana 400ml'],
        4,
        205,
        'Botella de Colombiana 400ml asomando desde cava de hielo de tienda de barrio, hielo picado rodeando la botella fría con condensación intensa, mano de tendero colombiano entregando el producto, fondo de tienda con víveres y confites, luz fluorescente cálida, fotografía documental de punto de venta auténtico, lente 35mm'
      )
    ]
  },
  {
    id: 'ps-c06',
    name: 'Colombiana Perfect Store Carulla',
    brand: 'Colombiana',
    thumbnail: '/images/Colombiana/a3af06123769773.60f5a2e179f51.jpg',
    skus: ['Colombiana 400ml', 'Colombiana Naranja 400ml', 'Colombiana 1.5L'],
    createdAt: new Date('2025-09-05'),
    sessions: [
      makeSession(
        'ses-c06a',
        new Date('2026-04-03T10:00:00'),
        ['Colombiana 400ml', 'Colombiana Naranja 400ml'],
        6,
        190,
        'Lineal premium de Carulla con Colombiana en exhibición perfect store, bloque de color por sabor con señalética de precio clara, iluminación de supermercado premium más cálida que cadenas populares, suelo mármol del establecimiento, carros de mercado Carulla en fondo desenfocado, fotografía planograma premium, lente 24mm'
      )
    ]
  },

  /* ── Postobón (5 proyectos) ─────────────────────────────── */
  {
    id: 'ps-004',
    name: 'Postobón Original Q2',
    brand: 'Sabores',
    thumbnail:
      '/images/Sabores/503bc9164592099.Y3JvcCwxNDAwLDEwOTUsMCwxNTk.png',
    skus: [
      'Postobón Manzana 400ml',
      'Postobón Uva 400ml',
      'Postobón Naranja 400ml'
    ],
    createdAt: new Date('2026-01-20'),
    sessions: [
      makeSession(
        'ses-031',
        new Date('2026-04-18T08:15:00'),
        ['Postobón Manzana 400ml'],
        4,
        10,
        'Góndola de Éxito con botellas de Postobón Manzana 400ml perfectamente alineadas en tres niveles, etiquetas verdes y blancas frente al consumidor, señalética de precio en tarjeta amarilla, iluminación cenital LED, pasillo de bebidas amplio con piso brillante reflectante, carros de mercado al fondo fuera de foco, perspectiva de consumidor parado frente al lineal, fotografía planograma comercial de alta resolución'
      ),
      makeSession(
        'ses-032',
        new Date('2026-04-13T17:45:00'),
        ['Postobón Uva 400ml', 'Postobón Naranja 400ml'],
        6,
        280,
        'Exhibición cruzada de Postobón Uva y Postobón Naranja en tienda de barrio bogotana, botellas apiladas en bloque mixto con frentes visibles, display sobre nevera de piso con cartón corporativo Postobón, luz fluorescente cálida del local, fondo de estantes con confites, piso de baldosa clásica, fotografía documental comercial con look editorial cálido y colorido'
      )
    ]
  },
  {
    id: 'ps-p02',
    name: 'Postobón Uva Verano',
    brand: 'Sabores',
    thumbnail: '/images/Sabores/6170890333279.jpeg',
    skus: ['Postobón Uva 400ml', 'Postobón Uva 1.5L'],
    createdAt: new Date('2026-02-14'),
    sessions: [
      makeSession(
        'ses-p02a',
        new Date('2026-04-14T12:00:00'),
        ['Postobón Uva 400ml'],
        4,
        275,
        'Botella de Postobón Uva 400ml sobre uvas negras frescas y hojas de vid sobre superficie de madera oscura, gotas de agua fría en el empaque morado oscuro, iluminación de estudio lateral cálida creando sombras dramáticas, fondo negro degradado, fotografía de producto food styling premium, lente 85mm macro, composición diagonal dinámica, colores ricos morados y verdes'
      )
    ]
  },
  {
    id: 'ps-p03',
    name: 'Postobón Naranja Canal',
    brand: 'Sabores',
    thumbnail: '/images/Sabores/En-caso-de-necesitar-otra-imagen-1.webp',
    skus: ['Postobón Naranja 400ml'],
    createdAt: new Date('2026-03-01'),
    sessions: [
      makeSession(
        'ses-p03a',
        new Date('2026-04-11T09:30:00'),
        ['Postobón Naranja 400ml'],
        4,
        25,
        'Botella de Postobón Naranja 400ml en nevera de conveniencia Oxxo iluminada con LED naranja cálido, empaque naranja vibrante que armoniza con la iluminación, productos perfectamente organizados facing, logo Oxxo visible en fondo, fotografía de canal moderno, lente 35mm, perspectiva frontal'
      )
    ]
  },
  {
    id: 'ps-p04',
    name: 'Postobón Back to School',
    brand: 'Sabores',
    thumbnail: '/images/Sabores/postobon-1.jpg',
    skus: ['Postobón Manzana 400ml', 'Postobón Uva 400ml'],
    createdAt: new Date('2025-12-10'),
    sessions: [
      makeSession(
        'ses-p04a',
        new Date('2026-04-08T08:00:00'),
        ['Postobón Manzana 400ml'],
        3,
        12,
        'Botella de Postobón Manzana 400ml en lonchera escolar abierta con sándwich y frutas alrededor, mesa escolar colorida, lápices y útiles fuera de foco al fondo, luz natural de ventana de colegio, fotografía lifestyle escolar colorida, lente 50mm, mood regreso a clases alegre y nutritivo'
      )
    ]
  },
  {
    id: 'ps-p05',
    name: 'Postobón Góndola Sur Colombia',
    brand: 'Sabores',
    thumbnail: '/images/Sabores/postobon-2.jpg',
    skus: [
      'Postobón Manzana 400ml',
      'Postobón Naranja 400ml',
      'Postobón Uva 400ml'
    ],
    createdAt: new Date('2025-09-15'),
    sessions: [
      makeSession(
        'ses-p05a',
        new Date('2026-04-01T10:00:00'),
        ['Postobón Manzana 400ml', 'Postobón Uva 400ml'],
        4,
        8,
        'Góndola de supermercado regional en ciudad intermedia colombiana con Postobón por sabores, bloque de color completo en dos niveles, señalética de precio regional, iluminación más cálida que grandes cadenas, ambiente auténtico de supermercado de provincia, fotografía planograma regional, lente 28mm'
      )
    ]
  },

  /* ── Hit (5 proyectos) ──────────────────────────────────── */
  {
    id: 'ps-002',
    name: 'Activación Hit Frutas',
    brand: 'Hit',
    thumbnail:
      '/images/Hit/498117045_1065010415676976_4799101696404848688_n.jpg',
    skus: ['Hit Mango 400ml', 'Hit Mora 400ml', 'Hit Lulo 400ml'],
    createdAt: new Date('2026-03-18'),
    sessions: [
      makeSession(
        'ses-011',
        new Date('2026-04-16T11:30:00'),
        ['Hit Mango 400ml', 'Hit Mora 400ml'],
        4,
        45,
        'Exhibición de impulso junto a caja registradora con Hit Mango y Hit Mora en display de cartón corporativo amarillo y morado vibrantes, iluminación cálida de punto de venta, fondo ligeramente desenfocado, superficie brillante tipo mostrador de acero, fotografía comercial de producto en contexto real, lente 35mm, alto contraste de color'
      ),
      makeSession(
        'ses-012',
        new Date('2026-04-10T14:20:00'),
        ['Hit Lulo 400ml'],
        2,
        95,
        'Joven colombiana sosteniendo Hit Lulo 400ml en playa del Pacífico colombiano, arena blanca y mar turquesa al fondo desenfocado, luz solar directa con reflejos en el vidrio, gotas de rocío en la botella fría, ropa de verano colorida, fotografía lifestyle editorial, Canon 85mm f/1.4, colores tropicales saturados'
      )
    ]
  },
  {
    id: 'ps-h02',
    name: 'Hit Mango Verano',
    brand: 'Hit',
    thumbnail: '/images/Hit/5806d830741507.Y3JvcCwxOTg5LDE1NTcsMTcsOTU2.jpg',
    skus: ['Hit Mango 400ml', 'Hit Mango 1L'],
    createdAt: new Date('2026-02-28'),
    sessions: [
      makeSession(
        'ses-h02a',
        new Date('2026-04-13T15:00:00'),
        ['Hit Mango 400ml'],
        4,
        40,
        'Botella de Hit Mango 400ml rodeada de mangos maduros enteros y partidos sobre tabla de madera clara, jugo de mango salpicando alrededor del producto, fondo blanco de estudio, iluminación de estudio suave y difusa, fotografía food styling editorial vibrante, lente 100mm, colores amarillos y naranjas intensos saturados, gotas de agua fría en la botella'
      )
    ]
  },
  {
    id: 'ps-h03',
    name: 'Hit Canal Moderno Bogotá',
    brand: 'Hit',
    thumbnail: '/images/Hit/Honeyview_HIT_2.jpg',
    skus: ['Hit Mora 400ml', 'Hit Lulo 400ml', 'Hit Mango 400ml'],
    createdAt: new Date('2026-01-25'),
    sessions: [
      makeSession(
        'ses-h03a',
        new Date('2026-04-11T11:00:00'),
        ['Hit Mora 400ml', 'Hit Lulo 400ml'],
        4,
        90,
        'Bloque de sabores Hit en nevera de conveniencia de Oxxo en Bogotá, iluminación LED interna resaltando los colores del empaque, sabores organizados por color creando bloque visual llamativo, puerta de vidrio abierta mostrando el facing, piso del local al fondo, fotografía de canal moderno, lente 35mm, colores fríos y saturados'
      )
    ]
  },
  {
    id: 'ps-h04',
    name: 'Hit Góndola Carrefour',
    brand: 'Hit',
    thumbnail: '/images/Hit/destacado_mandarina_0.jpg',
    skus: ['Hit Mango 400ml', 'Hit Mora 400ml'],
    createdAt: new Date('2025-12-20'),
    sessions: [
      makeSession(
        'ses-h04a',
        new Date('2026-04-09T10:00:00'),
        ['Hit Mango 400ml'],
        4,
        48,
        'Góndola de jugos y bebidas en Carrefour con Hit en exhibición premium, señalética de precio clara, botellas en tres niveles perfectamente alineadas facing, iluminación LED Carrefour de alta calidad, pasillo amplio y limpio, fotografía planograma de cadena internacional, lente 28mm, perspectiva ligeramente elevada'
      )
    ]
  },
  {
    id: 'ps-h05',
    name: 'Hit Lanzamiento Lulo',
    brand: 'Hit',
    thumbnail: '/images/Hit/maxresdefault.jpg',
    skus: ['Hit Lulo 400ml'],
    createdAt: new Date('2025-10-01'),
    sessions: [
      makeSession(
        'ses-h05a',
        new Date('2026-04-07T09:30:00'),
        ['Hit Lulo 400ml'],
        6,
        100,
        'Botella de Hit Lulo 400ml sobre lulos frescos partidos en mitad sobre superficie de pizarra negra, gotas de lulo salpicando alrededor, fondo verde oscuro de vegetación, iluminación de estudio con rim light blanco perimetral creando volumen, fotografía food styling editorial de lanzamiento, lente 85mm macro, colores verde lima intenso y amarillo del lulo protagonistas'
      )
    ]
  }
];

/* ─── Repository ────────────────────────────────────────────── */

export function findPsProjectById(id: string): PsProjectDetail | undefined {
  return PS_PROJECTS.find(p => p.id === id);
}

export function getAllPsProjects(): PsProjectDetail[] {
  return PS_PROJECTS;
}
