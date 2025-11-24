# 🃏 ValoFantasy

Bienvenido a **ValoFantasy**, una aplicación para coleccionar cartas de jugadores profesionales de Valorant. Abre sobres, construye tu equipo de ensueño y compite con otros usuarios.

## Equipo 135:
- ~~Pablo Benario~~ Elimino el ramo 
- Emanuel Saavedra  
- Benjamín Ureta

----

# Cómo ejecutar el proyecto

Para ejecutar ValoFantasy necesitarás ejecutar tanto el backend como el frontend, por separado, para ello:

##  Backend (MongoDB)
Para ejecutar el servidor en el puerto 3001, ejecutar ***desde la carpeta backend***:
<pre>npm install</pre>
<pre>npm start</pre>
Y mientras esta ejecutadonse, en otra ventana hacer:
<pre>npm run import</pre>
Asegurarse tener el .exe de MongoDB en:
<pre>C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe</pre>

## Terminal 2 - Frontend (React + Vite)
Para inicializar el frontend, asegurese de haber iniciado el backend.
Cuando el backend se encuentra corriendo, ejecutar ***desde la carpeta frontend***:
<pre>npm install</pre>
<pre>npm start</pre>

# 📱 URLs de la aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## ⚡ Características principales

- 🃏 **Abrir Packs**: Obtén 4 cartas aleatorias de jugadores profesionales
- 👥 **Base de datos completa**: Miles de jugadores de torneos VCT

---

# HITO 3 – Informe final 

***Valorant Fantasy Manager*** es una plataforma interactiva que permite a los fans de Valorant involucrarse de manera más activa con el ecosistema competitivo del juego. A través de sobres de cartas digitales, los usuarios podrán obtener jugadores profesionales, crear sus propios equipos y competir contra otros usuarios acumulando puntos basados en el rendimiento real de los jugadores durante los torneos. El sitio contará con distintas vistas para abrir sobres, gestionar equipos, revisar puntajes y estadísticas, y personalizar el perfil de usuario. Esta herramienta busca aumentar la emoción y el engagement con la escena competitiva, utilizando datos reales del juego extraídos de VLR.

---

## 📊 Estructura del Estado Global

### Librería Utilizada: **Zustand**

El proyecto utiliza **Zustand** como librería de gestión de estado global debido a su simplicidad, rendimiento y facilidad de integración con React. Zustand permite crear stores reactivos sin necesidad de providers ni contextos complejos.

### Stores Implementados:

#### 1. **`teamStore.ts`** - Gestión del Equipo
Store principal para manejar la funcionalidad de creación de equipos mediante drag & drop.

**Estado:**
- `players: IPlayer[]` - Inventario de jugadores disponibles del usuario
- `slots: (IPlayer | null)[]` - Array de 5 slots para formar el equipo
- `draggingPlayer: IPlayer | null` - Jugador siendo arrastrado actualmente
- `selectedPlayer: IPlayer | null` - Jugador seleccionado para ver detalles
- `originalIndexMap: Record<string, number>` - Mapeo de posiciones originales para restaurar jugadores

**Acciones:**
- `setPlayers(players)` - Actualiza el inventario de jugadores
- `setSlots(slots)` - Actualiza los slots del equipo
- `setDraggingPlayer(player)` - Establece el jugador siendo arrastrado
- `setSelectedPlayer(player)` - Establece el jugador seleccionado para el modal
- `setOriginalIndexMap(map)` - Guarda las posiciones originales del inventario

**Uso:** Permite a los usuarios arrastrar jugadores desde el inventario a 5 slots para formar su equipo, manteniendo el estado sincronizado durante toda la interacción.

#### 2. **`cooldownStore.ts`** - Sistema de Cooldown para Packs
Store persistente para controlar el tiempo de espera entre aperturas de sobres.

**Estado:**
- `lastPackTime: number | null` - Timestamp de la última apertura de pack
- `cooldownRemaining: number` - Tiempo restante de cooldown en milisegundos

**Acciones:**
- `startCooldown()` - Inicia el cooldown de 5 minutos
- `updateRemaining()` - Actualiza el tiempo restante de cooldown

**Persistencia:** Utiliza `zustand/middleware` con `persist` para mantener el cooldown incluso al recargar la página, guardando el estado en `localStorage` bajo la key `"pack-cooldown"`.

**Uso:** Previene spam de aperturas de packs, forzando un tiempo de espera de 5 minutos entre cada apertura.

---

## 🗺️ Mapa de Rutas y Flujo de Autenticación

### Estructura de Rutas

El proyecto utiliza **React Router v7** con un sistema de rutas anidadas y protección basada en autenticación.

#### **Rutas Públicas** (Accesibles sin autenticación):
- `/` - **Home**: Página de bienvenida con enlaces principales
- `/login` - **Login/Registro**: Sistema de autenticación con JWT y cookies HttpOnly
- `/players` - **Lista de Jugadores**: Vista completa de todos los jugadores disponibles
- `/tournaments` - **Lista de Torneos**: Torneos VCT con jugadores participantes
- `/leaderboard` - **Tabla de Puntos**: Ranking de usuarios

#### **Rutas Protegidas** (Requieren autenticación):
- `/packs` - **ValoPacks**: Apertura de sobres con cooldown de 5 minutos
- `/team` - **Mi Equipo**: Constructor de equipo con drag & drop + inventario filtrable
- `/profile` - **Perfil**: Información del usuario autenticado

### Sistema de Autenticación

#### **Componentes de Protección:**

1. **`ProtectedRoute.tsx`**
   - Verifica autenticación mediante `loginService.restoreLogin()`
   - Si no hay sesión válida → redirige a `/login`
   - Si hay sesión → renderiza el componente hijo
   - Muestra pantalla de carga durante verificación

2. **`PublicRoute.tsx`**
   - Redirige a `/` si el usuario ya está autenticado
   - Previene acceso a `/login` cuando ya hay sesión activa

#### **Flujo de Autenticación:**

```
┌─────────────────────────────────────────────────┐
│  Usuario ingresa a la aplicación               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
      ┌──────────────────────┐
      │ ¿Tiene token JWT     │
      │ válido en cookies?   │
      └──────┬───────────────┘
             │
    ┌────────┴────────┐
    │                 │
   SÍ                NO
    │                 │
    ▼                 ▼
┌────────┐      ┌──────────┐
│ Acceso │      │ Redirige │
│ Total  │      │ a /login │
└────────┘      └──────────┘
                      │
                      ▼
           ┌─────────────────────┐
           │ Login/Registro      │
           │ - Username/Password │
           │ - JWT + CSRF Token  │
           └──────────┬──────────┘
                      │
                      ▼
              ┌───────────────┐
              │ Cookie HttpOnly│
              │ Token guardado │
              └───────┬────────┘
                      │
                      ▼
              ┌──────────────┐
              │ Acceso Total │
              └──────────────┘
```

#### **Tecnologías de Seguridad:**

- **JWT (JSON Web Tokens)**: Tokens firmados con expiración de 1 hora
- **Cookies HttpOnly**: Previene acceso desde JavaScript (protección XSS)
- **CSRF Tokens**: Token único por sesión para prevenir ataques CSRF
- **bcrypt**: Hash seguro de contraseñas en base de datos MongoDB
- **SameSite Cookies**: Protección adicional contra CSRF
- **Express + CORS**: Backend configurado para aceptar credenciales desde `localhost:5173`

#### **Servicios de Autenticación:**

**`services/login.ts`**
- `login(credentials)` - Autenticación con username/password
- `register(username, name, email, password)` - Registro de nuevos usuarios
- `restoreLogin()` - Verifica sesión actual mediante `/api/login/me`
- `logout()` - Cierra sesión y limpia cookies

**Backend: `controllers/loginController.ts`**
- `POST /api/login` - Valida credenciales y retorna JWT en cookie
- `POST /api/register` - Crea usuario con password hasheado
- `GET /api/login/me` - Verifica token JWT y retorna usuario actual
- `POST /api/login/logout` - Limpia cookie de sesión

#### **Persistencia:**
- JWT almacenado en cookies con flag `httpOnly`
- CSRF token en `localStorage` para validación en requests mutantes
- Información de usuario en `localStorage` para UI (sin datos sensibles)

---

## 🎨 Características Adicionales

### Sistema de Rarezas
Los jugadores tienen rarezas basadas en su rating:
- 🌈 **Legendaria** (Top 5%)
- 💜 **Épica** (5-15%)
- 🧡 **Especial** (15-40%)
- 💙 **Normal** (40-70%)
- ⚪ **Común** (70-100%)

### Filtros y Ordenamiento
- Filtrar por rareza con Material UI Buttons y Chips
- Ordenar por rating ascendente/descendente
- Aplicable al inventario de jugadores

### Drag & Drop Team Building
- Biblioteca: `@dnd-kit` (React DnD moderno)
- 5 slots para formar equipo completo
- Estadísticas promedio del equipo en tiempo real
- Botón para reiniciar y devolver jugadores al inventario

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** + **TypeScript**
- **Vite** - Build tool y dev server
- **React Router v7** - Enrutamiento SPA
- **Zustand** - Estado global
- **Material UI** - Componentes UI (Buttons, Chips)
- **@dnd-kit** - Drag & Drop
- **Axios** - Cliente HTTP

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Hash de contraseñas
- **cookie-parser** - Manejo de cookies
- **CORS** - Configuración de políticas de origen cruzado

---

## Decisiones de Diseño

#### **1. Tema Oscuro Gaming**
- **Justificación**: Los juegos competitivos (Valorant) tradicionalmente usan temas oscuros
- **Implementación**: Fondo `#0b0c10` con gradientes sutiles para evitar monotonía
- **Contraste**: Texto `#e8eaed` sobre fondos oscuros cumple WCAG AA para accesibilidad

#### **2. Efectos de Profundidad**
- **Glassmorphism** en navegación: Efecto vidrio esmerilado moderno
- **Inset Shadows**: `inset 0 1px 0 rgba(255,255,255,0.03)` simula brillo interior
- **Layered Shadows**: Múltiples `box-shadow` para profundidad realista

#### **3. Micro-interacciones**
- **Hover Lift**: `translateY(-1px)` da sensación de elevación
- **Scale Transform**: `scale(1.05)` para énfasis en cartas
- **Transiciones Rápidas**: 0.05-0.3s para respuesta inmediata

#### **4. Gradientes y Color**
- **Degradados Dinámicos**: Rarezas con gradientes `linear-gradient` doble tono
- **Botones con Gradiente**: Primarios usan `--accent` → `--accent2` para efecto premium
- **Background Radial**: `radial-gradient` desde esquina crea profundidad visual

#### **5. Tipografía**
- **System Font Stack**: `ui-sans-serif, system-ui, -apple-system, Segoe UI` para rendimiento
- **Peso Variable**: 600-800 para jerarquía (`font-weight: 800` en títulos)
- **Letter Spacing**: `0.3px` en marca para legibilidad

#### **6. Responsive Design**
- **Grid Auto-fill**: Adaptación automática de columnas según viewport
- **Max-width Container**: `1100px` para legibilidad en pantallas grandes
- **Flexbox Wrap**: Componentes se reorganizan en móvil sin media queries explícitas

### Integración de Material UI

**Uso Selectivo:**
- **Buttons**: Para filtros de rareza con estados activos/disabled
- **Chips**: Para tags de filtros aplicados (removibles)
- **Sin Theming Global**: Se usa tema por defecto con ligeros overrides CSS

**Justificación:**
- Aporta componentes interactivos complejos sin reimplementarlos
- No impone sistema de diseño completo (se adapta a nuestro tema oscuro)
- Tree-shaking de Vite elimina componentes no usados

### Archivos CSS por Módulo

| Archivo | Propósito | Componentes Estilizados |
|---------|-----------|-------------------------|
| `index.css` | Variables globales + reset | Sistema de colores, fuentes |
| `App.css` | Layout principal | Nav, footer, containers |
| `player.css` | Tarjetas de jugadores | Cards, gradientes de rareza |
| `my-team.css` | Team builder | Slots drag & drop, inventario |
| `team-builder.css` | Estadísticas de equipo | Stats display, promedio |
| `modal.css` | Modales | Overlay, contenido modal |
| `tournament-list.css` | Lista de torneos | Tablas, grids de torneos |
| `Player_list.css` | Inventario de jugadores | Grid masonry, filtros |

---

# 🔗 URL de la aplicación 

La aplicación ValoFantasy se encuentra desplegada en:

```
fullstack.dcc.uchile.cl:<puerto-asignado>
```