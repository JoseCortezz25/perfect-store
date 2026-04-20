import type { AdminUser, AdminBrand } from './admin.types';

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'u1',
    name: 'David Arroyo',
    initials: 'DA',
    email: 'david.a@perfectstore.io',
    role: 'admin',
    roleLabel: 'Admin',
    status: 'active'
  },
  {
    id: 'u2',
    name: 'Michaela Ortega',
    initials: 'MO',
    email: 'michaela.o@agencia.co',
    role: 'agencia',
    roleLabel: 'Agencia',
    status: 'active'
  },
  {
    id: 'u3',
    name: 'Carlos Méndez',
    initials: 'CM',
    email: 'carlos.m@agencia.co',
    role: 'agencia',
    roleLabel: 'Agencia',
    status: 'active'
  },
  {
    id: 'u4',
    name: 'Elena Ríos',
    initials: 'ER',
    email: 'elena.r@postobon.com',
    role: 'cliente',
    roleLabel: 'Cliente',
    status: 'active'
  },
  {
    id: 'u5',
    name: 'Ana González',
    initials: 'AG',
    email: 'ana.g@agencia.co',
    role: 'agencia',
    roleLabel: 'Agencia',
    status: 'active'
  },
  {
    id: 'u6',
    name: 'Luis Paredes',
    initials: 'LP',
    email: 'luis.p@agencia.co',
    role: 'agencia',
    roleLabel: 'Agencia',
    status: 'inactive'
  },
  {
    id: 'u7',
    name: 'Sofia Vargas',
    initials: 'SV',
    email: 'sofia.v@agencia.co',
    role: 'agencia',
    roleLabel: 'Agencia',
    status: 'active'
  },
  {
    id: 'u8',
    name: 'Marco Torres',
    initials: 'MT',
    email: 'marco.t@postobon.com',
    role: 'cliente',
    roleLabel: 'Cliente',
    status: 'active'
  },
  {
    id: 'u9',
    name: 'Daniela Salinas',
    initials: 'DS',
    email: 'daniela.s@agencia.co',
    role: 'agencia',
    roleLabel: 'Agencia',
    status: 'active'
  }
];

export const MOCK_ADMIN_BRANDS: AdminBrand[] = [
  {
    id: 'b1',
    name: 'Bretaña',
    client: 'Postobón',
    projects: [
      {
        id: '1',
        name: 'Campaña Verano Bretaña',
        designer: 'Michaela O',
        status: 'delivered',
        pieces: 32
      },
      {
        id: '2',
        name: 'Bretaña Mora Lanzamiento',
        designer: 'Ana G',
        status: 'qc_approved',
        pieces: 18
      }
    ]
  },
  {
    id: 'b2',
    name: 'Manzana',
    client: 'Postobón',
    projects: [
      {
        id: '3',
        name: 'Refresh Manzana Q2',
        designer: 'Daniela S',
        status: 'delivered',
        pieces: 24
      },
      {
        id: '4',
        name: 'Manzana Perfect Store',
        designer: 'Luis P',
        status: 'client_review',
        pieces: 12
      }
    ]
  },
  {
    id: 'b3',
    name: 'Colombiana',
    client: 'Postobón',
    projects: [
      {
        id: '5',
        name: 'Colombiana 70 Años',
        designer: 'Michaela O',
        status: 'delivered',
        pieces: 48
      },
      {
        id: '6',
        name: 'Colombiana Navidad',
        designer: 'Ana G',
        status: 'delivered',
        pieces: 36
      }
    ]
  },
  {
    id: 'b4',
    name: 'Hit',
    client: 'Postobón',
    projects: [
      {
        id: '7',
        name: 'Hit Tropical Summer',
        designer: 'Carlos M',
        status: 'qc_approved',
        pieces: 20
      },
      {
        id: '8',
        name: 'Hit Maracuyá Drop',
        designer: 'Sofia V',
        status: 'client_review',
        pieces: 14
      }
    ]
  },
  {
    id: 'b5',
    name: 'Mr. Tea',
    client: 'Postobón',
    projects: [
      {
        id: '9',
        name: 'Mr. Tea Limón 2026',
        designer: 'Daniela S',
        status: 'delivered',
        pieces: 28
      },
      {
        id: '10',
        name: 'Mr. Tea Durazno Lanzamiento',
        designer: 'Luis P',
        status: 'qc_approved',
        pieces: 16
      }
    ]
  },
  {
    id: 'b6',
    name: 'Hipinto',
    client: 'Postobón',
    projects: [
      {
        id: '11',
        name: 'Hipinto Refresh Escolar',
        designer: 'Ana G',
        status: 'client_review',
        pieces: 22
      }
    ]
  },
  {
    id: 'b7',
    name: 'Pepsi',
    client: 'Postobón',
    projects: [
      {
        id: '12',
        name: 'Pepsi Black Friday',
        designer: 'Michaela O',
        status: 'delivered',
        pieces: 40
      },
      {
        id: '13',
        name: 'Pepsi Mundo 2026',
        designer: 'Carlos M',
        status: 'qc_approved',
        pieces: 30
      }
    ]
  },
  {
    id: 'b8',
    name: 'Uva',
    client: 'Postobón',
    projects: [
      {
        id: '14',
        name: 'Uva Fest Verano',
        designer: 'Sofia V',
        status: 'qc_approved',
        pieces: 18
      }
    ]
  },
  {
    id: 'b9',
    name: 'Naranja',
    client: 'Postobón',
    projects: [
      {
        id: '15',
        name: 'Naranja Fresh Campo',
        designer: 'Daniela S',
        status: 'client_review',
        pieces: 26
      }
    ]
  }
];
