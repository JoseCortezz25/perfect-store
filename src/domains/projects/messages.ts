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
      all: 'Todos',
      brand: 'Por marca',
      recent: 'Recientes'
    },
    projectsSection: 'Proyectos',
    noProjects: 'Aún no hay proyectos',
    noProjectsInGroup: 'Ningún proyecto coincide con este filtro'
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
    qc_pending: 'QC Pendiente',
    qc_approved: 'QC Aprobado',
    qc_rejected: 'QC Rechazado',
    client_review: 'Revisión cliente',
    client_approved: 'Aprobado por cliente',
    delivered: 'Entregado',
    needs_fix: 'Necesita corrección'
  }
} as const;
