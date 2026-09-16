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
