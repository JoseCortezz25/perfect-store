export const projectMessages = {
  home: {
    newProject: 'Nuevo proyecto',
    newBrand: 'Nueva marca',
    searchPlaceholder: 'Buscar proyectos...',
    metrics: {
      totalProjects: 'Total proyectos',
      totalImages: 'Imágenes generadas',
      totalSkus: 'SKUs registrados',
      imagesThisWeek: 'Imágenes esta semana'
    },
    filters: {
      sortLabel: 'Ordenar',
      alphabetical: 'Nombre A → Z',
      recent: 'Más reciente',
      oldest: 'Más antiguo',
      created: 'Fecha de creación'
    },
    brandFilter: 'Marcas',
    clearBrands: 'Limpiar',
    noProjectsInGroup: 'Ningún proyecto coincide con este filtro',
    statsTitle: 'Resumen',
    statsSubtitle: 'Métricas generales de la plataforma',
    projectsTitle: 'Proyectos',
    projectsSubtitle: 'Genera y gestiona imágenes de producto para Postobón',
    viewGrid: 'Vista cuadrícula',
    viewList: 'Vista lista',
    listHeaders: {
      name: 'Nombre',
      brand: 'Marca',
      images: 'Imágenes',
      lastModified: 'Última modificación'
    }
  },
  modal: {
    title: 'Nuevo proyecto',
    subtitle: 'Completa los datos para crear un nuevo proyecto',
    nameLabel: 'Nombre del proyecto',
    namePlaceholder: 'Ej. Campaña Verano 2025',
    brandLabel: 'Marca',
    brandPlaceholder: 'Ej. Nike',
    createButton: 'Crear proyecto',
    creatingButton: 'Creando...',
    cancelButton: 'Cancelar',
    errors: {
      serverError: 'Algo salió mal. Por favor intenta de nuevo.'
    }
  },
  brandModal: {
    title: 'Nueva marca',
    subtitle: 'Completa los datos para registrar una nueva marca',
    nameLabel: 'Nombre de la marca',
    namePlaceholder: 'Ej. Nike',
    clientLabel: 'Cliente',
    clientPlaceholder: 'Ej. Empresa S.A.',
    createButton: 'Crear marca',
    creatingButton: 'Creando...',
    cancelButton: 'Cancelar',
    errors: {
      serverError: 'Algo salió mal. Por favor intenta de nuevo.'
    }
  },
  card: {
    images: (n: number) => `${n} ${n === 1 ? 'imagen' : 'imágenes'}`,
    date: (d: Date) =>
      d.toLocaleDateString('es-CO', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      })
  },
  table: {
    columns: {
      project: 'Proyecto',
      brand: 'Marca',
      designer: 'Diseñador',
      status: 'Estado',
      version: 'Versión',
      pieces: 'Piezas',
      date: 'Fecha'
    }
  },
  status: {
    uploaded: 'Subido',
    qc_pending: 'QC Pendiente',
    qc_approved: 'QC Aprobado',
    qc_rejected: 'QC Rechazado',
    client_review: 'Revisión cliente',
    client_approved: 'Aprobado por cliente',
    delivered: 'Entregado',
    needs_fix: 'Necesita corrección'
  },
  psDetail: {
    backButton: 'Proyectos',
    generateMore: 'Generar más',
    metaSeparator: '·',
    sessionDivider: (dateLabel: string, count: number) =>
      `${dateLabel} · ${count} ${count === 1 ? 'imagen' : 'imágenes'}`,
    regenerate: 'Regenerar',
    download: 'Descargar',
    imageAlt: (n: number) => `Imagen generada ${n}`,
    modal: {
      title: 'Detalle de imagen',
      close: 'Cerrar',
      params: {
        skus: 'SKUs',
        type: 'Tipo',
        angle: 'Ángulo',
        aspect: 'Aspecto',
        quality: 'Calidad',
        prompt: 'Prompt'
      }
    }
  },

  detail: {
    breadcrumb: 'Proyectos',
    backButton: 'Proyectos',
    tabs: {
      validador: 'Validador',
      preview: 'Preview'
    },
    stageLinkButton: 'Client Link',
    versionLabel: (v: string) => v,
    validador: {
      uploadTitle: 'Subir nueva versión',
      dropLabel: 'Arrastra tu ZIP aquí o',
      dropCta: 'selecciona un archivo',
      dropHint: 'Solo archivos .zip',
      versionFieldLabel: 'Versión',
      versionPlaceholder: 'Ej. V4',
      submitButton: 'Subir versión',
      submittingButton: 'Subiendo...',
      uploadSuccess: (label: string) => `Versión ${label} subida correctamente`,
      uploadError: 'Algo salió mal. Intenta de nuevo.',
      qcPanel: {
        title: 'Resultado de QC',
        validating: 'Validando archivo...',
        noResult: 'Sube una versión para ver el resultado',
        scoreLabel: (score: number) => `${score}`,
        scoreMax: '/ 100',
        passCount: () => 'aprobados',
        failCount: () => 'fallidos',
        warningCount: () => 'advertencias',
        groups: {
          weight: 'Peso del archivo',
          dimensions: 'Dimensiones',
          naming: 'Nomenclatura',
          scripts: 'Scripts',
          animations: 'Animaciones'
        }
      },
      versionHistory: {
        title: 'Versiones',
        uploadedBy: (name: string) => `por ${name}`,
        noVersions: 'Aún no hay versiones subidas'
      }
    },
    preview: {
      piecesTitle: 'Piezas',
      filterAll: 'Todos',
      noSelection: 'Selecciona una pieza para previsualizar',
      noSelectionHint: 'Haz clic en cualquier pieza del panel izquierdo',
      noPieces: 'No hay piezas en este proyecto',
      toolbar: {
        darkBg: 'Oscuro',
        lightBg: 'Claro',
        reload: 'Recargar',
        selectedCount: (n: number) => `${n} ${n === 1 ? 'pieza' : 'piezas'}`,
        fullscreen: 'Pantalla completa',
        exitFullscreen: 'Salir'
      },
      dimensions: (w: number, h: number) => `${w} × ${h} px`,
      animated: 'Animado',
      static: 'Estático'
    },
    stageModal: {
      title: 'Link de Stage',
      subtitle: 'Comparte este enlace con tu cliente para revisión.',
      copyButton: 'Copiar',
      copiedButton: 'Copiado',
      regenButton: 'Regenerar enlace',
      closeLabel: 'Cerrar'
    },
    foldersPanel: {
      searchPlaceholder: 'Buscar carpeta...',
      noPieces: (n: number) => `${n} ${n === 1 ? 'pieza' : 'piezas'}`,
      folderApproved: 'Aprobado',
      folderRejected: 'Rechazado',
      hide: 'Ocultar carpetas',
      show: 'Mostrar carpetas'
    },
    qcActions: {
      approve: 'Aprobar',
      reject: 'Rechazar',
      selectAll: 'Seleccionar todo',
      selected: (n: number) => `${n} ${n === 1 ? 'pieza' : 'piezas'}`,
      rejectComment: {
        label: 'Motivo del rechazo',
        optional: '(opcional)',
        placeholder: 'Describe las correcciones necesarias...',
        confirm: 'Confirmar rechazo',
        cancel: 'Cancelar',
        rejecting: (n: number) =>
          `${n} ${n === 1 ? 'pieza' : 'piezas'} para rechazar`
      }
    },
    versionStatus: {
      validating: 'Validando',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      pending: 'Pendiente'
    },
    qcScoreLabels: {
      approved: 'Aprobado',
      warnings: 'Con advertencias',
      rejected: 'Rechazado',
      ariaLabel: (score: number, label: string) =>
        `Puntuación QC: ${score} de 100. ${label}`
    }
  }
} as const;
