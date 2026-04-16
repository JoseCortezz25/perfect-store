export const adminMessages = {
  pageTitle: 'Administración',
  pageSubtitle: 'Gestiona usuarios, marcas y proyectos de la plataforma',

  nav: {
    myProjects: 'Mis proyectos',
    admin: 'Admin',
    changeProfile: 'Cambiar perfil',
    myProfile: 'Mi perfil',
    closeSession: 'Cerrar sesión',
    close: 'Cerrar',
  },

  users: {
    sectionTitle: 'Usuarios',
    sectionSubtitle: (count: number) => `${count} ${count === 1 ? 'usuario' : 'usuarios'} registrados`,
    inviteButton: 'Invitar usuario',
    searchPlaceholder: 'Buscar usuario...',
    emptySearch: (q: string) => `Sin resultados para "${q}"`,

    tableHeaders: {
      user: 'Usuario',
      email: 'Email',
      role: 'Rol',
      activate: 'Activar',
      delete: 'Eliminar',
    },

    stats: {
      total: 'Total usuarios',
      active: 'Usuarios activos',
      inactive: 'Desactivados',
    },

    empty: {
      title: 'Todavía no tienes usuarios',
      cta: 'Invitar usuario',
    },

    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },

    actions: {
      editRole: 'Editar rol',
      deactivate: 'Desactivar',
      reactivate: 'Reactivar',
      delete: 'Eliminar',
    },

    invite: {
      modalTitle: 'Invitar usuario',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'nombre@empresa.com',
      roleLabel: 'Rol',
      submit: 'Enviar invitación',
      submitting: 'Enviando...',
      cancel: 'Cancelar',
    },

    editRole: {
      modalTitle: 'Editar rol',
      confirmTitle: 'Confirmar cambio',
      roleLabel: 'Nuevo rol',
      submit: 'Guardar cambios',
      confirm: 'Confirmar',
      back: 'Volver',
      cancel: 'Cancelar',
      confirmDescription: (name: string, from: string, to: string) =>
        `¿Cambiar el rol de ${name} de ${from} a ${to}?`,
    },

    toggleStatus: {
      deactivateTitle: 'Desactivar usuario',
      reactivateTitle: 'Reactivar usuario',
      deactivateDescription: (name: string) =>
        `¿Desactivar la cuenta de ${name}? El usuario perderá acceso a la plataforma.`,
      reactivateDescription: (name: string) =>
        `¿Reactivar la cuenta de ${name}? El usuario recuperará acceso a la plataforma.`,
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },

    deleteUser: {
      modalTitle: 'Eliminar usuario',
      description: (name: string) =>
        `¿Eliminar permanentemente la cuenta de ${name}? Esta acción no se puede deshacer.`,
      confirm: 'Eliminar',
      cancel: 'Cancelar',
    },

    roles: {
      admin: 'Admin',
      diseñador: 'Diseñador',
      qc: 'QC',
      cliente: 'Cliente',
    } as Record<string, string>,
  },

  brands: {
    sectionTitle: 'Marcas y proyectos',
    sectionSubtitle: (count: number) =>
      `${count} ${count === 1 ? 'marca' : 'marcas'} registradas`,
    projectCount: (n: number) => `${n} ${n === 1 ? 'proyecto' : 'proyectos'}`,

    actions: {
      deleteBrand: 'Eliminar marca',
      deleteProject: 'Eliminar proyecto',
    },

    deleteBrand: {
      modalTitle: 'Eliminar marca',
      description: (name: string) =>
        `¿Eliminar la marca "${name}" y todos sus proyectos? Esta acción no se puede deshacer.`,
      confirm: 'Eliminar',
      cancel: 'Cancelar',
    },

    deleteProject: {
      modalTitle: 'Eliminar proyecto',
      description: (name: string) =>
        `¿Eliminar el proyecto "${name}"? Esta acción no se puede deshacer.`,
      confirm: 'Eliminar',
      cancel: 'Cancelar',
    },

    brandStatus: {
      approved: 'Aprobado',
      rejected: 'Rechazado',
      pending: 'Pendiente',
    },

    tableHeaders: {
      brand: 'Marca',
      client: 'Cliente',
      projects: 'Proyectos',
      status: 'Estado',
      pieces: 'Piezas',
      delete: 'Eliminar',
    },

    piecesUnit: 'pzs',
  },

  unauthorized: {
    title: 'Acceso restringido',
    description: 'Esta sección es solo para administradores.',
  },
};
