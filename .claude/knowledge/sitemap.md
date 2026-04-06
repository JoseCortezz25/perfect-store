# Sitemap — Sphere Plataforma

Estructura de páginas y secciones de la plataforma Sphere.

---

## Árbol de navegación

```
Sphere Plataforma
├── Login
│   ├── Usuario
│   └── Contraseña
│
├── Home
│   ├── Nuevo Proyecto: Modal Nombre + Marca
│   ├── Datos generales: Total de proyectos / Total piezas analizadas
│   ├── Filtros: Visualizar por marca o recientes
│   ├── Grid — Listado de Proyectos agrupado por clientes
│   ├── Barra navegación
│   └── Borrado automático después de 60 días de creado ⚠️
│
└── Proyecto Detalle
    ├── VALIDADOR
    │   ├── Campo carga de archivos + Versión
    │   ├── Panel Validaciones
    │   ├── Listado de versiones
    │   └── Status por versión
    │
    └── PREVIEW
        ├── Listado Piezas lateral (selección 1 o varias simultáneamente)
        ├── Preview tamaño real + medidas + Posibilidad de recargar animación
        ├── Filtro por tamaño
        ├── Dark mode + Light mode para fondo
        └── Link Stage abierto para compartir
```

---

## Páginas

### Login
Pantalla de acceso a la plataforma. Campos: usuario y contraseña.

---

### Home
Panel principal del usuario autenticado.

- **Nuevo Proyecto**: modal para crear un proyecto ingresando nombre y marca.
- **Datos generales**: métricas globales — total de proyectos y total de piezas analizadas.
- **Filtros**: permite visualizar proyectos por marca o por recientes.
- **Grid de proyectos**: listado de todos los proyectos, agrupados por cliente.
- **Barra de navegación**: navegación principal de la plataforma.
- **Borrado automático**: los proyectos se eliminan automáticamente a los 60 días de su creación.

---

### Proyecto Detalle
Vista de detalle de un proyecto. Contiene dos secciones principales: **Validador** y **Preview**.

#### Validador
Herramienta de control de calidad de los archivos del proyecto.

- **Campo carga de archivos + Versión**: permite subir archivos y asignarles una versión.
- **Panel Validaciones**: muestra los resultados del análisis de calidad.
- **Listado de versiones**: historial de versiones subidas al proyecto.
- **Status por versión**: estado de QC de cada versión (pending, approved, rejected, etc.).

#### Preview
Visualizador de las piezas del proyecto.

- **Listado Piezas lateral**: panel lateral con las piezas del proyecto; permite seleccionar una o varias simultáneamente.
- **Preview tamaño real**: visualización de la pieza en su tamaño real, con medidas y opción de recargar la animación.
- **Filtro por tamaño**: filtra las piezas del listado lateral por dimensiones.
- **Dark mode / Light mode**: permite cambiar el fondo del preview entre oscuro y claro.
- **Link Stage**: genera un enlace público para compartir el stage del proyecto.
