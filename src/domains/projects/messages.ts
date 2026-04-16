export const projectMessages = {
  home: {
    welcome: 'Bienvenido a Sphere',
    newProject: 'Crear nuevo proyecto',
    searchPlaceholder: 'Buscar proyectos...',
    sortBy: 'Ordenar por',
    metrics: {
      activeBanners: 'Banners activos',
      approved: 'Aprobados',
      inCorrection: 'En corrección',
      sentToClient: 'Enviados a cliente'
    },
    filters: {
      sortLabel: 'Ordenar',
      alphabetical: 'Nombre A → Z',
      recent: 'Más reciente',
      oldest: 'Más antiguo',
      created: 'Fecha de creación',
    },
    brandFilter: 'Marcas',
    clearBrands: 'Limpiar',
    projectsSection: 'Proyectos',
    noProjects: 'Aún no hay proyectos',
    noProjectsInGroup: 'Ningún proyecto coincide con este filtro',
    statsTitle: 'Estadísticas',
    statsSubtitle: 'Métricas activas del flujo de producción',
    projectsTitle: 'Proyectos',
    projectsSubtitle: 'Gestiona y valida las piezas digitales del equipo',
    viewGrid: 'Vista cuadrícula',
    viewList: 'Vista lista',
    cardTags: {
      done: 'Listo',
      inProgress: 'En progreso',
      pending: 'Pendiente',
    },
    listHeaders: {
      name: 'Nombre',
      status: 'Estado',
      designer: 'Diseñador',
      lastModified: 'Última modificación',
    },
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
  card: {
    pieces: (n: number) => `${n} ${n === 1 ? 'pieza' : 'piezas'}`,
    version: (n: number) => `V${n}`,
    daysLeft: (n: number) => `${n}d restantes`,
    expiringSoon: 'Vence pronto',
    date: (d: Date) => d.toLocaleDateString('es-MX', { month: '2-digit', day: '2-digit', year: 'numeric' })
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
    'qc_pending': 'QC Pendiente',
    'qc_approved': 'QC Aprobado',
    'qc_rejected': 'QC Rechazado',
    'client_review': 'Revisión cliente',
    'client_approved': 'Aprobado por cliente',
    delivered: 'Entregado',
    'needs_fix': 'Necesita corrección'
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
        passCount: (_: number) => 'aprobados',
        failCount: (_: number) => 'fallidos',
        warningCount: (_: number) => 'advertencias',
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
        exitFullscreen: 'Salir',
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
      show: 'Mostrar carpetas',
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
        rejecting: (n: number) => `${n} ${n === 1 ? 'pieza' : 'piezas'} para rechazar`,
      },
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
      ariaLabel: (score: number, label: string) => `Puntuación QC: ${score} de 100. ${label}`,
    },
  }
} as const;
