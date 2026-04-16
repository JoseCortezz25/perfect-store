import type { AdminUser, AdminBrand } from './admin.types';

export const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: 'u1', name: 'David A',    initials: 'DA', email: 'david.a@sphere.io',          role: 'admin',    roleLabel: 'Admin',      status: 'active'   },
  { id: 'u2', name: 'Michaela O', initials: 'MO', email: 'michaela.o@studio.co',        role: 'diseñador', roleLabel: 'Diseñadora', status: 'active'   },
  { id: 'u3', name: 'Carlos M',   initials: 'CM', email: 'carlos.m@studio.co',          role: 'qc',       roleLabel: 'QC',         status: 'active'   },
  { id: 'u4', name: 'Elena R',    initials: 'ER', email: 'elena.r@pepsico.com',         role: 'cliente',  roleLabel: 'Cliente',    status: 'active'   },
  { id: 'u5', name: 'Ana G',      initials: 'AG', email: 'ana.g@studio.co',             role: 'diseñador', roleLabel: 'Diseñadora', status: 'active'   },
  { id: 'u6', name: 'Luis P',     initials: 'LP', email: 'luis.p@studio.co',            role: 'diseñador', roleLabel: 'Diseñador',  status: 'inactive' },
  { id: 'u7', name: 'Sofia V',    initials: 'SV', email: 'sofia.v@studio.co',           role: 'qc',       roleLabel: 'QC',         status: 'active'   },
  { id: 'u8', name: 'Marco T',    initials: 'MT', email: 'marco.t@nikeinc.com',         role: 'cliente',  roleLabel: 'Cliente',    status: 'active'   },
  { id: 'u9', name: 'Daniela S',  initials: 'DS', email: 'daniela.s@studio.co',        role: 'diseñador', roleLabel: 'Diseñadora', status: 'active'   },
];

export const MOCK_ADMIN_BRANDS: AdminBrand[] = [
  {
    id: 'b1',
    name: 'Adidas',
    client: 'Adidas AG',
    projects: [
      { id: '1',  name: 'World Cup 2026 Global Series',            designer: 'Michaela O', status: 'qc_approved',   pieces: 60 },
    ],
  },
  {
    id: 'b2',
    name: 'Nike',
    client: 'Nike Inc.',
    projects: [
      { id: '4',  name: 'Brand Refresh Q2',                        designer: 'Michaela O', status: 'delivered',     pieces: 18 },
      { id: '5',  name: 'Air Max Drop',                            designer: 'Luis P',     status: 'needs_fix',     pieces: 8  },
    ],
  },
  {
    id: 'b3',
    name: 'Pepsi',
    client: 'PepsiCo',
    projects: [
      { id: '2',  name: 'Back to School',                          designer: 'Carlos R',   status: 'client_review', pieces: 12 },
    ],
  },
  {
    id: 'b4',
    name: 'Gatorade',
    client: 'PepsiCo',
    projects: [
      { id: '3',  name: 'World Cup Launch',                        designer: 'Daniela S',  status: 'qc_rejected',   pieces: 36 },
    ],
  },
  {
    id: 'b5',
    name: 'Zara',
    client: 'Inditex',
    projects: [
      { id: '6',  name: 'Holiday Collection',                      designer: 'Ana G',      status: 'qc_pending',    pieces: 30 },
    ],
  },
  {
    id: 'b6',
    name: 'Massimo Dutti',
    client: 'Inditex',
    projects: [
      { id: '7',  name: 'Spring Drop 2025',                        designer: 'Carlos R',   status: 'client_approved', pieces: 16 },
    ],
  },
  {
    id: 'b7',
    name: 'Horizon',
    client: 'Horizon Talent Group',
    projects: [
      { id: '8',  name: 'Horizon Talent Spring Recruitment Ads',   designer: 'Daniela S',  status: 'qc_approved',   pieces: 6  },
    ],
  },
  {
    id: 'b8',
    name: 'Suncrest',
    client: 'Suncrest Marketing',
    projects: [
      { id: '9',  name: 'Suncrest Influencer Push',                designer: 'Luis P',     status: 'client_review', pieces: 12 },
    ],
  },
  {
    id: 'b9',
    name: 'Evergreen',
    client: 'Evergreen Communications',
    projects: [
      { id: '10', name: 'Evergreen Brand Refresh Toolkit',         designer: 'Ana G',      status: 'delivered',     pieces: 5  },
    ],
  },
  {
    id: 'b10',
    name: 'Radiant',
    client: 'Radiant Brand Studio',
    projects: [
      { id: '11', name: 'Radiant Studio Holiday Creative Suite',   designer: 'Michaela O', status: 'needs_fix',     pieces: 8  },
    ],
  },
  {
    id: 'b11',
    name: 'Summit',
    client: 'Summit Digital Agency',
    projects: [
      { id: '12', name: 'Summit Digital Paid Search Overhaul',     designer: 'Carlos R',   status: 'qc_pending',    pieces: 10 },
    ],
  },
];
