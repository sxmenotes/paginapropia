# Samuel Valenzuela — Estudio de Arquitectura Web & Software de Alto Impacto

Sitio web personal y portafolio interactivo de **Samuel Valenzuela**, enfocado en desarrollo web de alta gama, plataformas a medida, diseño editorial moderno, rendimiento de clase mundial y optimización de conversión comercial.

---

## 🚀 Características Principales

- **Diseño Editorial & Moderno**: Paleta de colores refinada, tipografía técnica (`Space Grotesk` y `JetBrains Mono`) y efectos de cuadrícula ambiental / iluminación suave.
- **Rendimiento & Animaciones**: Animaciones e interacciones fluidas desarrolladas con GSAP y ScrollTrigger.
- **Cotizador Dinámico Interactivo**: Módulo de estimación de proyectos en tiempo real con selección de alcance, plazos y cálculo de inversión aproximada.
- **Showcase de Casos de Éxito**: Exhibición interactiva con previews en vivo y comparativas visuales (Dark/Light mode).
- **Responsive & Mobile-First**: Experiencia optimizada para dispositivos móviles, tablets y monitores de alta resolución.
- **Totalmente Estático & Rápido**: Carga ultra rápida sin dependencias pesadas en tiempo de ejecución.

---

## 🛠️ Stack Tecnológico

- **Core**: HTML5 Semántico, CSS3 Vanilla (Variables CSS, Flexbox, Grid), JavaScript (ES6+).
- **Librerías de Animación**: [GSAP 3](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/).
- **Testing & QA**: [Playwright](https://playwright.dev/) para pruebas visuales y de regresión, [@axe-core/playwright](https://github.com/dequelabs/axe-core) para accesibilidad web.
- **Despliegue**: Listo para [Vercel](https://vercel.com/) / Static Hosting.

---

## 📁 Estructura del Proyecto

```text
.
├── assets/
│   ├── js/             # Librerías JS minificadas (GSAP, ScrollTrigger)
│   ├── logos/          # Isologos y logos de clientes / casos de éxito
│   └── previews/       # Capturas y previews de proyectos destacados
├── logos/              # Identidad visual y branding del sitio
├── index.html          # Estructura principal y contenido semántico
├── style.css           # Hoja de estilos con variables y responsive design
├── main.js             # Lógica interactiva, cotizador y micro-interacciones
├── vercel.json         # Configuración de despliegue y headers para Vercel
├── package.json        # Configuración de dependencias y scripts
├── LICENSE             # Licencia MIT
└── README.md           # Documentación del proyecto
```

---

## 💻 Ejecución en Local

Para visualizar y probar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone git@github.com:sxmenotes/paginapropia.git
   cd paginapropia
   ```

2. **Instalar dependencias opcionales (para tests y scripts)**:
   ```bash
   npm install
   ```

3. **Iniciar servidor local**:
   ```bash
   npm start
   ```
   *O alternativamente, abre `index.html` con cualquier servidor estático (como Live Server en VS Code o `npx serve .`).*

---

## 🚢 Despliegue en Vercel

Este proyecto es un sitio estático optimizado para desplegarse instantáneamente en **Vercel**:

### Opción 1: Conexión Automática con GitHub (Recomendada)
1. Ve a [Vercel Dashboard](https://vercel.com/new).
2. Importa el repositorio `sxmenotes/paginapropia`.
3. Deja los ajustes predeterminados (Vercel detectará automáticamente que es un sitio estático con `index.html` en la raíz).
4. Haz clic en **Deploy**. Cada `git push` a la rama `main` desplegará automáticamente los cambios.

### Opción 2: Mediante Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## 📬 Contacto

- **Desarrollador**: Samuel Valenzuela
- **Agenda una reunión**: [Google Calendar](https://calendar.app.google/SUbaA7Yw8eTLTrft7)
- **WhatsApp**: [Chat directo](https://wa.me/5491178281814)
- **GitHub**: [@sxmenotes](https://github.com/sxmenotes)

---

## 📋 Changelog

### [1.1.0] — 2026-09-17 · SEO & Social Sharing

#### ✨ Añadido
- **`assets/og-image.jpg`** — Imagen Open Graph (1200×630px) con logo y branding del sitio para tarjetas de vista previa en redes sociales.
- **`robots.txt`** — Control de indexación para bots de búsqueda (Google, Bing, etc.). Excluye `/404.html` del índice.
- **`sitemap.xml`** — Mapa del sitio en formato XML para Google Search Console.
- **`manifest.webmanifest`** — Web App Manifest para soporte PWA e instalación desde móvil.
- **Open Graph completo** en `index.html`: `og:image`, `og:image:width/height/alt`, `og:site_name`, `og:locale`, URL corregida a `svalenzdweb.vercel.app`.
- **Twitter/X Cards** (`summary_large_image`) en `index.html` y `404.html`.
- **JSON-LD Schema.org** (`Person`) en `index.html` para Knowledge Panel de Google.
- **`<link rel="canonical">`** y `<link rel="alternate" hreflang="es">` en `index.html`.
- **`<meta name="keywords">`** y **`<meta name="robots" content="index, follow">`** en `index.html`.
- **`<link rel="apple-touch-icon">`** y **`<link rel="manifest">`** en ambos HTML.

#### 🔧 Modificado
- `index.html` — Cabecera `<head>` completamente reescrita con todas las etiquetas SEO.
- `404.html` — Añadido `<meta name="robots" content="noindex, follow">` y etiquetas OG/Twitter básicas.

#### 🗂️ Estructura actualizada
```text
.
├── assets/
│   ├── js/
│   ├── logos/
│   ├── previews/
│   └── og-image.jpg        # ← NUEVO: imagen para tarjetas de redes sociales
├── logos/
├── index.html
├── style.css
├── main.js
├── manifest.webmanifest    # ← NUEVO
├── robots.txt              # ← NUEVO
├── sitemap.xml             # ← NUEVO
├── vercel.json
├── package.json
├── LICENSE
└── README.md
```

---

### [1.0.0] — 2026-09-11 · Release Inicial

- Lanzamiento del sitio personal y portafolio.
- Diseño editorial con `Space Grotesk` y `JetBrains Mono`.
- Cotizador dinámico interactivo.
- Showcase de casos de éxito con previews en vivo.
- Animaciones con GSAP + ScrollTrigger.
- Página 404 personalizada.
- Testing con Playwright + axe-core.
- Configuración de despliegue en Vercel.

