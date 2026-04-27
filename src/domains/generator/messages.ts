export const generatorMessages = {
  pageTitle: 'Generador',
  pageSubtitle: 'Configura y genera imágenes para tus campañas',

  projectBar: {
    label: 'Proyecto activo',
    none: 'Ningún proyecto seleccionado',
    change: 'Cambiar',
    select: 'Seleccionar proyecto'
  },

  projectModal: {
    title: 'Asociar proyecto',
    subtitle: 'Selecciona o crea el proyecto donde se guardarán las imágenes',
    selectLabel: 'Proyecto existente',
    selectPlaceholder: 'Seleccionar proyecto...',
    orCreate: 'Nuevo proyecto',
    newNameLabel: 'Nombre del proyecto',
    newNamePlaceholder: 'Ej: Campaña Verano 2026',
    newBrandLabel: 'Marca',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },

  skuPanel: {
    title: 'SKUs',
    searchPlaceholder: 'Buscar SKU...',
    allBrands: 'Todas',
    selectedLabel: 'Seleccionados',
    noResults: 'Sin resultados',
    emptySelection: 'Ningún SKU seleccionado'
  },

  config: {
    referenceImage: {
      label: 'Imagen de referencia',
      hint: 'Sube una imagen como fondo o contexto base (opcional)',
      cta: 'Subir imagen',
      change: 'Cambiar',
      remove: 'Quitar'
    },

    imageType: {
      label: 'Tipo de imagen',
      options: {
        aislado: 'Aislado',
        lifestyle: 'Lifestyle',
        perfect_store: 'Perfect Store'
      }
    },

    visualReferences: 'Ver referencias visuales',

    angle: {
      label: 'Ángulo',
      viewExamples: 'Ver ejemplos',
      options: {
        frontal: 'Frontal',
        tres_cuartos: '3/4',
        lateral: 'Lateral',
        cenital: 'Cenital',
        bajo: 'Contrapicado',
        isometrico: 'Isométrico',
        detalle: 'Detalle',
        trasero: 'Trasero'
      }
    },

    illumination: {
      label: 'Iluminación',
      viewExamples: 'Ver ejemplos',
      options: {
        natural: 'Natural',
        estudio: 'Estudio',
        golden_hour: 'Golden Hour',
        rembrandt: 'Rembrandt',
        contraluz: 'Contraluz',
        cenital: 'Cenital',
        dramatica: 'Dramática',
        suave: 'Suave'
      }
    },

    advanced: 'Avanzado',

    aspectRatio: {
      label: 'Relación de aspecto'
    },

    context: {
      label: 'Descripción de contexto',
      toolbarLabel: 'Contexto',
      freeText: {
        label: 'Prompt',
        placeholder: 'Describe el contexto de la imagen...'
      },
      elements: {
        label: 'Elementos',
        chips: [
          'Bar',
          'Playa',
          'Hogar',
          'Estadio',
          'Supermercado',
          'Restaurante',
          'Parque',
          'Piscina',
          'Terraza',
          'Tienda'
        ]
      },
      atmospheric: {
        label: 'Atmósfera',
        chips: [
          'Alegre',
          'Festivo',
          'Relajado',
          'Enérgico',
          'Familiar',
          'Fresco',
          'Vibrante',
          'Íntimo'
        ]
      },
      dayMoment: {
        label: 'Momento del día',
        steps: ['Amanecer', 'Mañana', 'Mediodía', 'Tarde', 'Atardecer', 'Noche']
      },
      prominence: {
        label: 'Protagonismo',
        steps: [
          'Solo producto',
          'Producto',
          'Equilibrado',
          'Entorno',
          'Solo entorno'
        ]
      },
      promptPreview: {
        label: 'Vista previa del prompt',
        disclaimer:
          'El sistema interpreta esta descripción y la adapta automáticamente a las reglas visuales de la marca. No es un prompt libre.',
        empty: 'El prompt se generará según tus selecciones.'
      }
    },

    quality: {
      label: 'Calidad de imagen',
      options: {
        bajo: 'Baja',
        medio: 'Media',
        alto: 'Alta'
      }
    },

    imageCount: {
      label: 'Cantidad',
      options: [1, 2, 4, 8] as const
    },

    generateBtn: 'Generar imágenes',
    generateBtnLoading: 'Generando...',
    validationSkus: 'Selecciona al menos un SKU para continuar',
    validationType: 'Selecciona un tipo de imagen'
  },

  results: {
    title: 'Resultados',
    back: 'Volver a configuración',
    addToProject: 'Añadir a proyecto',
    regenerate: 'Regenerar',
    regenerateAll: 'Regenerar todo',
    download: 'Descargar',
    downloadAll: 'Descargar todo',
    imageAlt: (n: number) => `Imagen generada ${n}`,
    imageSingular: 'imagen generada',
    imagePlural: 'imágenes generadas',
    emptyState: {
      title: 'Genera tu primera imagen',
      subtitle: 'Configura los parámetros y haz clic en Generar',
      previewLabel: 'Vista previa del prompt',
      previewEmpty: 'Configura los parámetros para componer tu prompt'
    },
    galleryTitle: 'Imágenes de proyectos',
    modal: {
      title: 'Detalle de imagen',
      close: 'Cerrar',
      params: {
        skus: 'SKUs',
        type: 'Tipo',
        angle: 'Ángulo',
        aspect: 'Aspecto',
        quality: 'Calidad',
        prompt: 'Prompt',
        project: 'Proyecto',
        brand: 'Marca'
      }
    }
  }
} as const;
