import type {
  ProjectDetail,
  ProjectVersion,
  BannerPiece,
  QcCheckGroup
} from './projects.types';

/* ─── Mock QC Groups ────────────────────────────────────────── */

const QC_GROUPS_V1: QcCheckGroup[] = [
  {
    id: 'weight',
    label: 'Peso del archivo',
    items: [
      {
        id: 'w1',
        label: 'Peso total del ZIP < 200KB',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'w2',
        label: 'Imágenes optimizadas',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'w3',
        label: 'Assets sin comprimir detectados',
        category: 'important',
        status: 'fail',
        detail:
          '3 imágenes PNG sin optimizar (hero_stadium.png, logo_full.png, cta_bg.png)'
      }
    ]
  },
  {
    id: 'dimensions',
    label: 'Dimensiones',
    items: [
      {
        id: 'd1',
        label: 'Dimensiones declaradas en HTML',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'd2',
        label: 'Dimensiones coinciden con nombre de archivo',
        category: 'critical',
        status: 'fail',
        detail: 'Archivo "WC26_GDN_300x250.zip" contiene un banner de 310x260px'
      },
      {
        id: 'd3',
        label: 'Meta viewport configurado correctamente',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'naming',
    label: 'Nomenclatura',
    items: [
      {
        id: 'n1',
        label: 'Nombre del ZIP sigue convención cliente',
        category: 'important',
        status: 'warning',
        detail:
          'Se esperaba el prefijo "WC26_" pero se encontró "Wc26_" en 2 archivos'
      },
      {
        id: 'n2',
        label: 'Archivos internos sin espacios',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 'n3',
        label: 'index.html presente en raíz',
        category: 'critical',
        status: 'pass'
      }
    ]
  },
  {
    id: 'scripts',
    label: 'Scripts',
    items: [
      {
        id: 's1',
        label: 'Sin scripts de tracking no autorizados',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 's2',
        label: 'Clicktag implementado correctamente',
        category: 'critical',
        status: 'fail',
        detail: 'El clicktag apunta a "#" en lugar de una variable dinámica'
      },
      {
        id: 's3',
        label: 'GSAP versión >= 3.x',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 's4',
        label: 'Sin dependencias externas CDN',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'animations',
    label: 'Animaciones',
    items: [
      {
        id: 'a1',
        label: 'Duración total <= 30 segundos',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'a2',
        label: 'Loop configurado correctamente',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 'a3',
        label: 'Botón de pausa en animaciones > 5s',
        category: 'important',
        status: 'warning',
        detail: 'Animación de 22s detectada sin botón de pausa visible'
      }
    ]
  }
];

const QC_GROUPS_V2: QcCheckGroup[] = [
  {
    id: 'weight',
    label: 'Peso del archivo',
    items: [
      {
        id: 'w1',
        label: 'Peso total del ZIP < 200KB',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'w2',
        label: 'Imágenes optimizadas',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'w3',
        label: 'Assets sin comprimir detectados',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'dimensions',
    label: 'Dimensiones',
    items: [
      {
        id: 'd1',
        label: 'Dimensiones declaradas en HTML',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'd2',
        label: 'Dimensiones coinciden con nombre de archivo',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'd3',
        label: 'Meta viewport configurado correctamente',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'naming',
    label: 'Nomenclatura',
    items: [
      {
        id: 'n1',
        label: 'Nombre del ZIP sigue convención cliente',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'n2',
        label: 'Archivos internos sin espacios',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 'n3',
        label: 'index.html presente en raíz',
        category: 'critical',
        status: 'pass'
      }
    ]
  },
  {
    id: 'scripts',
    label: 'Scripts',
    items: [
      {
        id: 's1',
        label: 'Sin scripts de tracking no autorizados',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 's2',
        label: 'Clicktag implementado correctamente',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 's3',
        label: 'GSAP versión >= 3.x',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 's4',
        label: 'Sin dependencias externas CDN',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'animations',
    label: 'Animaciones',
    items: [
      {
        id: 'a1',
        label: 'Duración total <= 30 segundos',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'a2',
        label: 'Loop configurado correctamente',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 'a3',
        label: 'Botón de pausa en animaciones > 5s',
        category: 'important',
        status: 'pass'
      }
    ]
  }
];

const QC_GROUPS_V3: QcCheckGroup[] = [
  {
    id: 'weight',
    label: 'Peso del archivo',
    items: [
      {
        id: 'w1',
        label: 'Peso total del ZIP < 200KB',
        category: 'critical',
        status: 'fail',
        detail: 'ZIP pesa 348KB — excede el límite de 200KB en 148KB'
      },
      {
        id: 'w2',
        label: 'Imágenes optimizadas',
        category: 'important',
        status: 'fail',
        detail:
          'hero_stadium.jpg (1.2MB) y player_shot.png (890KB) no están optimizadas'
      },
      {
        id: 'w3',
        label: 'Assets sin comprimir detectados',
        category: 'important',
        status: 'fail',
        detail: '5 archivos sin comprimir detectados'
      }
    ]
  },
  {
    id: 'dimensions',
    label: 'Dimensiones',
    items: [
      {
        id: 'd1',
        label: 'Dimensiones declaradas en HTML',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'd2',
        label: 'Dimensiones coinciden con nombre de archivo',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 'd3',
        label: 'Meta viewport configurado correctamente',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'naming',
    label: 'Nomenclatura',
    items: [
      {
        id: 'n1',
        label: 'Nombre del ZIP sigue convención cliente',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'n2',
        label: 'Archivos internos sin espacios',
        category: 'informational',
        status: 'warning',
        detail: '2 archivos con espacios: "hero stadium.jpg", "cta button.png"'
      },
      {
        id: 'n3',
        label: 'index.html presente en raíz',
        category: 'critical',
        status: 'pass'
      }
    ]
  },
  {
    id: 'scripts',
    label: 'Scripts',
    items: [
      {
        id: 's1',
        label: 'Sin scripts de tracking no autorizados',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 's2',
        label: 'Clicktag implementado correctamente',
        category: 'critical',
        status: 'pass'
      },
      {
        id: 's3',
        label: 'GSAP versión >= 3.x',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 's4',
        label: 'Sin dependencias externas CDN',
        category: 'important',
        status: 'pass'
      }
    ]
  },
  {
    id: 'animations',
    label: 'Animaciones',
    items: [
      {
        id: 'a1',
        label: 'Duración total <= 30 segundos',
        category: 'important',
        status: 'pass'
      },
      {
        id: 'a2',
        label: 'Loop configurado correctamente',
        category: 'informational',
        status: 'pass'
      },
      {
        id: 'a3',
        label: 'Botón de pausa en animaciones > 5s',
        category: 'important',
        status: 'pass'
      }
    ]
  }
];

/* ─── Google Display Network Pieces (30) ───────────────────── */

const gdnP01: BannerPiece = {
  id: 'gdn-01',
  name: 'WC26_GDN_300x250',
  size: '300x250',
  fileName: 'WC26_GDN_300x250.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#1E3A8A'
};
const gdnP02: BannerPiece = {
  id: 'gdn-02',
  name: 'WC26_GDN_728x90',
  size: '728x90',
  fileName: 'WC26_GDN_728x90.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#1D4ED8'
};
const gdnP03: BannerPiece = {
  id: 'gdn-03',
  name: 'WC26_GDN_160x600',
  size: '160x600',
  fileName: 'WC26_GDN_160x600.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#1E3A8A'
};
const gdnP04: BannerPiece = {
  id: 'gdn-04',
  name: 'WC26_GDN_300x600',
  size: '300x600',
  fileName: 'WC26_GDN_300x600.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP05: BannerPiece = {
  id: 'gdn-05',
  name: 'WC26_GDN_320x50',
  size: '320x50',
  fileName: 'WC26_GDN_320x50.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP06: BannerPiece = {
  id: 'gdn-06',
  name: 'WC26_GDN_970x250',
  size: '970x250',
  fileName: 'WC26_GDN_970x250.html',
  hasAnimation: true,
  animationDurationMs: 22000,
  accentColor: '#1D4ED8'
};
const gdnP07: BannerPiece = {
  id: 'gdn-07',
  name: 'WC26_GDN_468x60',
  size: '468x60',
  fileName: 'WC26_GDN_468x60.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP08: BannerPiece = {
  id: 'gdn-08',
  name: 'WC26_GDN_336x280',
  size: '336x280',
  fileName: 'WC26_GDN_336x280.html',
  hasAnimation: true,
  animationDurationMs: 12000,
  accentColor: '#1D4ED8'
};
const gdnP09: BannerPiece = {
  id: 'gdn-09',
  name: 'WC26_GDN_320x480',
  size: '320x480',
  fileName: 'WC26_GDN_320x480.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#1E3A8A'
};
const gdnP10: BannerPiece = {
  id: 'gdn-10',
  name: 'WC26_GDN_120x600',
  size: '120x600',
  fileName: 'WC26_GDN_120x600.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP11: BannerPiece = {
  id: 'gdn-11',
  name: 'WC26_GDN_970x90',
  size: '970x90',
  fileName: 'WC26_GDN_970x90.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#1E3A8A'
};
const gdnP12: BannerPiece = {
  id: 'gdn-12',
  name: 'WC26_GDN_250x250',
  size: '250x250',
  fileName: 'WC26_GDN_250x250.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP13: BannerPiece = {
  id: 'gdn-13',
  name: 'WC26_GDN_200x200',
  size: '200x200',
  fileName: 'WC26_GDN_200x200.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP14: BannerPiece = {
  id: 'gdn-14',
  name: 'WC26_GDN_180x150',
  size: '180x150',
  fileName: 'WC26_GDN_180x150.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP15: BannerPiece = {
  id: 'gdn-15',
  name: 'WC26_GDN_240x400',
  size: '240x400',
  fileName: 'WC26_GDN_240x400.html',
  hasAnimation: true,
  animationDurationMs: 12000,
  accentColor: '#1E3A8A'
};
const gdnP16: BannerPiece = {
  id: 'gdn-16',
  name: 'WC26_GDN_300x1050',
  size: '300x1050',
  fileName: 'WC26_GDN_300x1050.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP17: BannerPiece = {
  id: 'gdn-17',
  name: 'WC26_GDN_580x400',
  size: '580x400',
  fileName: 'WC26_GDN_580x400.html',
  hasAnimation: true,
  animationDurationMs: 18000,
  accentColor: '#1E3A8A'
};
const gdnP18: BannerPiece = {
  id: 'gdn-18',
  name: 'WC26_GDN_930x180',
  size: '930x180',
  fileName: 'WC26_GDN_930x180.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#1D4ED8'
};
const gdnP19: BannerPiece = {
  id: 'gdn-19',
  name: 'WC26_GDN_750x300',
  size: '750x300',
  fileName: 'WC26_GDN_750x300.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP20: BannerPiece = {
  id: 'gdn-20',
  name: 'WC26_GDN_1024x768',
  size: '1024x768',
  fileName: 'WC26_GDN_1024x768.html',
  hasAnimation: true,
  animationDurationMs: 20000,
  accentColor: '#1D4ED8'
};
const gdnP21: BannerPiece = {
  id: 'gdn-21',
  name: 'WC26_GDN_320x100',
  size: '320x100',
  fileName: 'WC26_GDN_320x100.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP22: BannerPiece = {
  id: 'gdn-22',
  name: 'WC26_GDN_234x60',
  size: '234x60',
  fileName: 'WC26_GDN_234x60.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP23: BannerPiece = {
  id: 'gdn-23',
  name: 'WC26_GDN_125x125',
  size: '125x125',
  fileName: 'WC26_GDN_125x125.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP24: BannerPiece = {
  id: 'gdn-24',
  name: 'WC26_GDN_480x320',
  size: '480x320',
  fileName: 'WC26_GDN_480x320.html',
  hasAnimation: true,
  animationDurationMs: 12000,
  accentColor: '#1D4ED8'
};
const gdnP25: BannerPiece = {
  id: 'gdn-25',
  name: 'WC26_GDN_200x446',
  size: '200x446',
  fileName: 'WC26_GDN_200x446.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP26: BannerPiece = {
  id: 'gdn-26',
  name: 'WC26_GDN_292x30',
  size: '292x30',
  fileName: 'WC26_GDN_292x30.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP27: BannerPiece = {
  id: 'gdn-27',
  name: 'WC26_GDN_600x314',
  size: '600x314',
  fileName: 'WC26_GDN_600x314.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#1E3A8A'
};
const gdnP28: BannerPiece = {
  id: 'gdn-28',
  name: 'WC26_GDN_1200x628',
  size: '1200x628',
  fileName: 'WC26_GDN_1200x628.html',
  hasAnimation: false,
  accentColor: '#1D4ED8'
};
const gdnP29: BannerPiece = {
  id: 'gdn-29',
  name: 'WC26_GDN_88x31',
  size: '88x31',
  fileName: 'WC26_GDN_88x31.html',
  hasAnimation: false,
  accentColor: '#1E3A8A'
};
const gdnP30: BannerPiece = {
  id: 'gdn-30',
  name: 'WC26_GDN_320x400',
  size: '320x400',
  fileName: 'WC26_GDN_320x400.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#1D4ED8'
};

/* ─── Meta Pieces (6) ───────────────────────────────────────── */

const metaP01: BannerPiece = {
  id: 'meta-01',
  name: 'WC26_META_1080x1080',
  size: '1080x1080',
  fileName: 'WC26_META_1080x1080.html',
  hasAnimation: true,
  animationDurationMs: 12000,
  accentColor: '#3B0764'
};
const metaP02: BannerPiece = {
  id: 'meta-02',
  name: 'WC26_META_1200x628',
  size: '1200x628',
  fileName: 'WC26_META_1200x628.html',
  hasAnimation: false,
  accentColor: '#4A044E'
};
const metaP03: BannerPiece = {
  id: 'meta-03',
  name: 'WC26_META_1080x1920',
  size: '1080x1920',
  fileName: 'WC26_META_1080x1920.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#3B0764'
};
const metaP04: BannerPiece = {
  id: 'meta-04',
  name: 'WC26_META_1200x1200',
  size: '1200x1200',
  fileName: 'WC26_META_1200x1200.html',
  hasAnimation: false,
  accentColor: '#4A044E'
};
const metaP05: BannerPiece = {
  id: 'meta-05',
  name: 'WC26_META_900x1600',
  size: '900x1600',
  fileName: 'WC26_META_900x1600.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#3B0764'
};
const metaP06: BannerPiece = {
  id: 'meta-06',
  name: 'WC26_META_1080x566',
  size: '1080x566',
  fileName: 'WC26_META_1080x566.html',
  hasAnimation: false,
  accentColor: '#4A044E'
};

/* ─── YouTube Pieces (4) ────────────────────────────────────── */

const ytP01: BannerPiece = {
  id: 'yt-01',
  name: 'WC26_YT_1280x720',
  size: '1280x720',
  fileName: 'WC26_YT_1280x720.html',
  hasAnimation: true,
  animationDurationMs: 30000,
  accentColor: '#7F1D1D'
};
const ytP02: BannerPiece = {
  id: 'yt-02',
  name: 'WC26_YT_300x250',
  size: '300x250',
  fileName: 'WC26_YT_300x250.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#991B1B'
};
const ytP03: BannerPiece = {
  id: 'yt-03',
  name: 'WC26_YT_970x250',
  size: '970x250',
  fileName: 'WC26_YT_970x250.html',
  hasAnimation: true,
  animationDurationMs: 20000,
  accentColor: '#7F1D1D'
};
const ytP04: BannerPiece = {
  id: 'yt-04',
  name: 'WC26_YT_728x90',
  size: '728x90',
  fileName: 'WC26_YT_728x90.html',
  hasAnimation: false,
  accentColor: '#991B1B'
};

/* ─── Programmatic Pieces (8) ───────────────────────────────── */

const progP01: BannerPiece = {
  id: 'prog-01',
  name: 'WC26_PROG_300x250',
  size: '300x250',
  fileName: 'WC26_PROG_300x250.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#14532D'
};
const progP02: BannerPiece = {
  id: 'prog-02',
  name: 'WC26_PROG_728x90',
  size: '728x90',
  fileName: 'WC26_PROG_728x90.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#166534'
};
const progP03: BannerPiece = {
  id: 'prog-03',
  name: 'WC26_PROG_160x600',
  size: '160x600',
  fileName: 'WC26_PROG_160x600.html',
  hasAnimation: false,
  accentColor: '#14532D'
};
const progP04: BannerPiece = {
  id: 'prog-04',
  name: 'WC26_PROG_300x600',
  size: '300x600',
  fileName: 'WC26_PROG_300x600.html',
  hasAnimation: true,
  animationDurationMs: 18000,
  accentColor: '#166534'
};
const progP05: BannerPiece = {
  id: 'prog-05',
  name: 'WC26_PROG_320x50',
  size: '320x50',
  fileName: 'WC26_PROG_320x50.html',
  hasAnimation: false,
  accentColor: '#14532D'
};
const progP06: BannerPiece = {
  id: 'prog-06',
  name: 'WC26_PROG_970x250',
  size: '970x250',
  fileName: 'WC26_PROG_970x250.html',
  hasAnimation: true,
  animationDurationMs: 22000,
  accentColor: '#166534'
};
const progP07: BannerPiece = {
  id: 'prog-07',
  name: 'WC26_PROG_336x280',
  size: '336x280',
  fileName: 'WC26_PROG_336x280.html',
  hasAnimation: true,
  animationDurationMs: 12000,
  accentColor: '#14532D'
};
const progP08: BannerPiece = {
  id: 'prog-08',
  name: 'WC26_PROG_468x60',
  size: '468x60',
  fileName: 'WC26_PROG_468x60.html',
  hasAnimation: false,
  accentColor: '#166534'
};

/* ─── Connected TV Pieces (3) ───────────────────────────────── */

const ctvP01: BannerPiece = {
  id: 'ctv-01',
  name: 'WC26_CTV_1920x1080',
  size: '1920x1080',
  fileName: 'WC26_CTV_1920x1080.html',
  hasAnimation: true,
  animationDurationMs: 30000,
  accentColor: '#0C2340'
};
const ctvP02: BannerPiece = {
  id: 'ctv-02',
  name: 'WC26_CTV_1280x720',
  size: '1280x720',
  fileName: 'WC26_CTV_1280x720.html',
  hasAnimation: true,
  animationDurationMs: 30000,
  accentColor: '#0E2D50'
};
const ctvP03: BannerPiece = {
  id: 'ctv-03',
  name: 'WC26_CTV_640x480',
  size: '640x480',
  fileName: 'WC26_CTV_640x480.html',
  hasAnimation: true,
  animationDurationMs: 20000,
  accentColor: '#0C2340'
};

/* ─── OOH Digital Pieces (4) ────────────────────────────────── */

const oohP01: BannerPiece = {
  id: 'ooh-01',
  name: 'WC26_OOH_1920x540',
  size: '1920x540',
  fileName: 'WC26_OOH_1920x540.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#431407'
};
const oohP02: BannerPiece = {
  id: 'ooh-02',
  name: 'WC26_OOH_1080x1920',
  size: '1080x1920',
  fileName: 'WC26_OOH_1080x1920.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#7C2D12'
};
const oohP03: BannerPiece = {
  id: 'ooh-03',
  name: 'WC26_OOH_1920x1080',
  size: '1920x1080',
  fileName: 'WC26_OOH_1920x1080.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#431407'
};
const oohP04: BannerPiece = {
  id: 'ooh-04',
  name: 'WC26_OOH_1280x720',
  size: '1280x720',
  fileName: 'WC26_OOH_1280x720.html',
  hasAnimation: false,
  accentColor: '#7C2D12'
};

/* ─── Mobile App Pieces (5) ─────────────────────────────────── */

const mobP01: BannerPiece = {
  id: 'mob-01',
  name: 'WC26_MOB_320x480',
  size: '320x480',
  fileName: 'WC26_MOB_320x480.html',
  hasAnimation: true,
  animationDurationMs: 10000,
  accentColor: '#052E16'
};
const mobP02: BannerPiece = {
  id: 'mob-02',
  name: 'WC26_MOB_320x50',
  size: '320x50',
  fileName: 'WC26_MOB_320x50.html',
  hasAnimation: false,
  accentColor: '#14532D'
};
const mobP03: BannerPiece = {
  id: 'mob-03',
  name: 'WC26_MOB_320x100',
  size: '320x100',
  fileName: 'WC26_MOB_320x100.html',
  hasAnimation: false,
  accentColor: '#052E16'
};
const mobP04: BannerPiece = {
  id: 'mob-04',
  name: 'WC26_MOB_300x250',
  size: '300x250',
  fileName: 'WC26_MOB_300x250.html',
  hasAnimation: true,
  animationDurationMs: 12000,
  accentColor: '#14532D'
};
const mobP05: BannerPiece = {
  id: 'mob-05',
  name: 'WC26_MOB_300x600',
  size: '300x600',
  fileName: 'WC26_MOB_300x600.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#052E16'
};

/* ─── Takeover Pieces (2) ───────────────────────────────────── */

const tkovP01: BannerPiece = {
  id: 'tkov-01',
  name: 'WC26_TKOV_1920x1080',
  size: '1920x1080',
  fileName: 'WC26_TKOV_1920x1080.html',
  hasAnimation: true,
  animationDurationMs: 30000,
  accentColor: '#1C1917'
};
const tkovP02: BannerPiece = {
  id: 'tkov-02',
  name: 'WC26_TKOV_1280x720',
  size: '1280x720',
  fileName: 'WC26_TKOV_1280x720.html',
  hasAnimation: true,
  animationDurationMs: 25000,
  accentColor: '#292524'
};

/* ─── Amazon Display Pieces (3) ─────────────────────────────── */

const amzP01: BannerPiece = {
  id: 'amz-01',
  name: 'WC26_AMZ_300x250',
  size: '300x250',
  fileName: 'WC26_AMZ_300x250.html',
  hasAnimation: true,
  animationDurationMs: 15000,
  accentColor: '#451A03'
};
const amzP02: BannerPiece = {
  id: 'amz-02',
  name: 'WC26_AMZ_728x90',
  size: '728x90',
  fileName: 'WC26_AMZ_728x90.html',
  hasAnimation: false,
  accentColor: '#78350F'
};
const amzP03: BannerPiece = {
  id: 'amz-03',
  name: 'WC26_AMZ_160x600',
  size: '160x600',
  fileName: 'WC26_AMZ_160x600.html',
  hasAnimation: false,
  accentColor: '#451A03'
};

/* ─── Mock Versions ─────────────────────────────────────────── */

const MOCK_VERSIONS: ProjectVersion[] = [
  {
    id: 'v3',
    label: 'V3',
    status: 'approved',
    uploadedAt: new Date('2026-04-09'),
    uploadedBy: 'Michaela O',
    zipFileName: 'WC26_GlobalSeries_V3.zip',
    qcResult: {
      score: 42,
      groups: QC_GROUPS_V3,
      validatedAt: new Date('2026-04-09T10:32:00'),
      versionId: 'v3'
    },
    folders: [
      {
        id: 'v3-f01',
        name: 'Google Display',
        status: 'approved',
        pieces: [
          gdnP01,
          gdnP02,
          gdnP03,
          gdnP04,
          gdnP05,
          gdnP06,
          gdnP07,
          gdnP08,
          gdnP09,
          gdnP10,
          gdnP11,
          gdnP12,
          gdnP13,
          gdnP14,
          gdnP15,
          gdnP16,
          gdnP17,
          gdnP18,
          gdnP19,
          gdnP20,
          gdnP21,
          gdnP22,
          gdnP23,
          gdnP24,
          gdnP25,
          gdnP26,
          gdnP27,
          gdnP28,
          gdnP29,
          gdnP30
        ]
      },
      {
        id: 'v3-f02',
        name: 'Meta Feed',
        status: 'approved',
        pieces: [metaP01, metaP02, metaP06]
      },
      {
        id: 'v3-f03',
        name: 'Meta Stories',
        status: 'approved',
        pieces: [metaP03, metaP04, metaP05]
      },
      {
        id: 'v3-f04',
        name: 'YouTube',
        status: 'approved',
        pieces: [ytP01, ytP02, ytP03, ytP04]
      },
      {
        id: 'v3-f05',
        name: 'Programmatic',
        status: 'approved',
        pieces: [
          progP01,
          progP02,
          progP03,
          progP04,
          progP05,
          progP06,
          progP07,
          progP08
        ]
      },
      {
        id: 'v3-f06',
        name: 'Connected TV',
        status: 'pending',
        pieces: [ctvP01, ctvP02, ctvP03]
      },
      {
        id: 'v3-f07',
        name: 'OOH Digital',
        status: 'approved',
        pieces: [oohP01, oohP02, oohP03, oohP04]
      },
      {
        id: 'v3-f08',
        name: 'Mobile App',
        status: 'approved',
        pieces: [mobP01, mobP02, mobP03, mobP04, mobP05]
      },
      {
        id: 'v3-f09',
        name: 'Takeover',
        status: 'approved',
        pieces: [tkovP01, tkovP02]
      },
      {
        id: 'v3-f10',
        name: 'Amazon Display',
        status: 'pending',
        pieces: [amzP01, amzP02, amzP03]
      }
    ]
  },
  {
    id: 'v2',
    label: 'V2',
    status: 'rejected',
    uploadedAt: new Date('2026-04-04'),
    uploadedBy: 'Michaela O',
    zipFileName: 'WC26_GlobalSeries_V2.zip',
    qcResult: {
      score: 96,
      groups: QC_GROUPS_V2,
      validatedAt: new Date('2026-04-04T14:18:00'),
      versionId: 'v2'
    },
    folders: [
      {
        id: 'v2-f01',
        name: 'Google Display',
        status: 'rejected',
        pieces: [
          gdnP01,
          gdnP02,
          gdnP03,
          gdnP04,
          gdnP05,
          gdnP06,
          gdnP07,
          gdnP08,
          gdnP09,
          gdnP10,
          gdnP11,
          gdnP12
        ]
      },
      {
        id: 'v2-f02',
        name: 'Meta Feed',
        status: 'rejected',
        pieces: [metaP01, metaP02, metaP06]
      },
      {
        id: 'v2-f03',
        name: 'Meta Stories',
        status: 'approved',
        pieces: [metaP03, metaP04, metaP05]
      },
      {
        id: 'v2-f04',
        name: 'YouTube',
        status: 'pending',
        pieces: [ytP01, ytP02, ytP03, ytP04]
      },
      {
        id: 'v2-f05',
        name: 'Programmatic',
        status: 'rejected',
        pieces: [progP01, progP02, progP03, progP04, progP05, progP06]
      },
      {
        id: 'v2-f06',
        name: 'Connected TV',
        status: 'pending',
        pieces: [ctvP01, ctvP02]
      },
      {
        id: 'v2-f07',
        name: 'OOH Digital',
        status: 'rejected',
        pieces: [oohP01, oohP02, oohP03]
      },
      {
        id: 'v2-f08',
        name: 'Mobile App',
        status: 'pending',
        pieces: [mobP01, mobP02, mobP03, mobP04]
      },
      {
        id: 'v2-f09',
        name: 'Takeover',
        status: 'rejected',
        pieces: [tkovP01, tkovP02]
      },
      {
        id: 'v2-f10',
        name: 'Amazon Display',
        status: 'pending',
        pieces: [amzP01, amzP02]
      }
    ]
  },
  {
    id: 'v1',
    label: 'V1',
    status: 'rejected',
    uploadedAt: new Date('2026-03-28'),
    uploadedBy: 'Michaela O',
    zipFileName: 'WC26_GlobalSeries_V1.zip',
    qcResult: {
      score: 58,
      groups: QC_GROUPS_V1,
      validatedAt: new Date('2026-03-28T09:45:00'),
      versionId: 'v1'
    },
    folders: [
      {
        id: 'v1-f01',
        name: 'Google Display',
        status: 'rejected',
        pieces: [gdnP01, gdnP02, gdnP03, gdnP04, gdnP05, gdnP06, gdnP07, gdnP08]
      },
      {
        id: 'v1-f02',
        name: 'Meta Feed',
        status: 'pending',
        pieces: [metaP01, metaP06]
      },
      {
        id: 'v1-f03',
        name: 'Meta Stories',
        status: 'pending',
        pieces: [metaP04, metaP05]
      },
      {
        id: 'v1-f04',
        name: 'YouTube',
        status: 'pending',
        pieces: [ytP01, ytP02]
      },
      {
        id: 'v1-f05',
        name: 'Programmatic',
        status: 'rejected',
        pieces: [progP01, progP02, progP03, progP04]
      },
      {
        id: 'v1-f06',
        name: 'OOH Digital',
        status: 'rejected',
        pieces: [oohP01, oohP02]
      },
      {
        id: 'v1-f07',
        name: 'Mobile App',
        status: 'pending',
        pieces: [mobP01, mobP02, mobP03]
      },
      {
        id: 'v1-f08',
        name: 'Takeover',
        status: 'rejected',
        pieces: [tkovP01, tkovP02]
      }
    ]
  }
];

/* ─── Mock Projects Map ─────────────────────────────────────── */

const MOCK_DETAIL_MAP: Record<
  string,
  { versions: ProjectVersion[]; stageUrl?: string }
> = {
  '1': {
    versions: MOCK_VERSIONS,
    stageUrl:
      'https://stage.sphere.internal/review/adidas-wc26-globalseries-abc123'
  }
};

/* ─── Mock Base Projects (mirrors home page data) ──────────── */

type ProjectBase = Omit<ProjectDetail, 'versions' | 'stageUrl'>;

const MOCK_BASE_PROJECTS: ProjectBase[] = [
  {
    id: '1',
    name: 'World Cup 2026 Global Series',
    brand: 'Adidas',
    client: 'Adidas AG',
    designer: 'Michaela O',
    status: 'qc_approved',
    totalPieces: 60,
    latestVersion: 3,
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-04-09')
  },
  {
    id: '2',
    name: 'Back to School',
    brand: 'Pepsi',
    client: 'PepsiCo',
    designer: 'Carlos R',
    status: 'client_review',
    totalPieces: 12,
    latestVersion: 2,
    createdAt: new Date('2026-03-20'),
    updatedAt: new Date('2026-04-05')
  },
  {
    id: '3',
    name: 'World Cup Launch',
    brand: 'Gatorade',
    client: 'PepsiCo',
    designer: 'Daniela S',
    status: 'qc_rejected',
    totalPieces: 36,
    latestVersion: 1,
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-08')
  },
  {
    id: '4',
    name: 'Brand Refresh Q2',
    brand: 'Nike',
    client: 'Nike Inc.',
    designer: 'Michaela O',
    status: 'delivered',
    totalPieces: 18,
    latestVersion: 4,
    createdAt: new Date('2026-02-14'),
    updatedAt: new Date('2026-03-28')
  },
  {
    id: '5',
    name: 'Air Max Drop',
    brand: 'Nike',
    client: 'Nike Inc.',
    designer: 'Luis P',
    status: 'needs_fix',
    totalPieces: 8,
    latestVersion: 2,
    createdAt: new Date('2026-03-28'),
    updatedAt: new Date('2026-04-09')
  },
  {
    id: '6',
    name: 'Holiday Collection',
    brand: 'Zara',
    client: 'Inditex',
    designer: 'Ana G',
    status: 'qc_pending',
    totalPieces: 30,
    latestVersion: 1,
    createdAt: new Date('2026-04-08'),
    updatedAt: new Date('2026-04-08')
  },
  {
    id: '7',
    name: 'Spring Drop 2025',
    brand: 'Massimo Dutti',
    client: 'Inditex',
    designer: 'Carlos R',
    status: 'client_approved',
    totalPieces: 16,
    latestVersion: 3,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-04-03')
  },
  {
    id: '8',
    name: 'Horizon Talent Spring Recruitment Ads',
    brand: 'Horizon',
    client: 'Horizon Talent Group',
    designer: 'Daniela S',
    status: 'qc_approved',
    totalPieces: 6,
    latestVersion: 2,
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2025-12-20')
  },
  {
    id: '9',
    name: 'Suncrest Influencer Push',
    brand: 'Suncrest',
    client: 'Suncrest Marketing',
    designer: 'Luis P',
    status: 'client_review',
    totalPieces: 12,
    latestVersion: 1,
    createdAt: new Date('2026-01-02'),
    updatedAt: new Date('2026-01-08')
  },
  {
    id: '10',
    name: 'Evergreen Brand Refresh Toolkit',
    brand: 'Evergreen',
    client: 'Evergreen Communications',
    designer: 'Ana G',
    status: 'delivered',
    totalPieces: 5,
    latestVersion: 3,
    createdAt: new Date('2025-11-20'),
    updatedAt: new Date('2025-11-29')
  },
  {
    id: '11',
    name: 'Radiant Studio Holiday Creative Suite',
    brand: 'Radiant',
    client: 'Radiant Brand Studio',
    designer: 'Michaela O',
    status: 'needs_fix',
    totalPieces: 8,
    latestVersion: 1,
    createdAt: new Date('2025-12-05'),
    updatedAt: new Date('2025-12-11')
  },
  {
    id: '12',
    name: 'Summit Digital Paid Search Overhaul',
    brand: 'Summit',
    client: 'Summit Digital Agency',
    designer: 'Carlos R',
    status: 'qc_pending',
    totalPieces: 10,
    latestVersion: 2,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-16')
  }
];

/* ─── Repository ────────────────────────────────────────────── */

export function findProjectById(id: string): ProjectDetail | undefined {
  const base = MOCK_BASE_PROJECTS.find(p => p.id === id);
  if (!base) return undefined;

  const extra = MOCK_DETAIL_MAP[id] ?? {
    versions: [],
    pieces: [],
    stageUrl: undefined
  };

  return { ...base, ...extra };
}
