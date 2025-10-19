# 🃏 ValoFantasy

Bienvenido a **ValoFantasy**, una aplicación para coleccionar cartas de jugadores profesionales de Valorant. Abre sobres, construye tu equipo de ensueño y compite con otros usuarios.

## Equipo 135:
- ~~Pablo Benario~~ 💀💀💀
- Emanuel Saavedra  
- Benjamín Ureta

## Cómo ejecutar el proyecto

Para ejecutar ValoFantasy necesitarás abrir **2 terminales** y ejecutar tanto el backend como el frontend:

### Terminal 1 - Backend (JSON Server)
```bash
cd backend
npx json-server --watch db.json --port 3001
```

### Terminal 2 - Frontend (React + Vite)
```bash
cd frontend
npm run dev
```

## 📱 URLs de la aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## ⚡ Características principales

- 🃏 **Abrir Packs**: Obtén 5 cartas aleatorias de jugadores profesionales
- 👥 **Base de datos completa**: Miles de jugadores de torneos VCT

---

# HITO 1 – Definición y primera versión del proyecto

En este primer hito deberán entregar una versión inicial de su aplicación fullstack desarrollada en React (frontend) y json-server (backend simulado). La idea es que comiencen a dar forma a su proyecto a partir del tema que ya seleccionaron, priorizando funcionalidades y trabajando en la construcción de las primeras vistas.

Requerimientos:

* Priorización de funcionalidades

    Identificar las principales funcionalidades de la aplicación.

    Establecer un orden de prioridad (por ejemplo: alta, media, baja) y justificar la decisión.

* Implementación de al menos dos vistas completas

    Desarrollar en React al menos dos vistas funcionales del sistema (por ejemplo: una vista de listado y otra de detalle o formulario).

    La aplicación debe ser una SPA (Single Page Application).

* Base de datos mock

    Utilizar json-server como backend simulado.

    Configurar la carpeta "backend/" con los datos en formato JSON y la configuración necesaria para exponer endpoints REST.

* Buenas prácticas de desarrollo

    No se permite manipular el DOM directamente, siempre debe hacerse a través de los mecanismos de React (JSX, hooks, props, etc.).

    No se debe utilizar el tipo "any" en TypeScript, salvo que se justifique explícitamente en el informe.

    La aplicación debe incluir interacción con el usuario utilizando useState (por ejemplo, para manejar formularios, cambios de vista o actualización de datos).

# Informe de entrega (PDF)
* El informe debe ser breve y contener:

    Una descripción del tema del proyecto.

    El listado de funcionalidades y su prioridad.

    Indicar cuáles vistas fueron desarrolladas en este hito.

    Incluir mockups de las vistas no desarrolladas que planifican implementar en los siguientes hitos.

# Repositorio público en GitHub

    El repositorio debe estar organizado en dos carpetas principales:

        "frontend/" → aplicación React.

        "backend/" → configuración de json-server con la base de datos mock.

    Incluir un archivo "README.md" con instrucciones claras de instalación y ejecución del proyecto (tanto frontend como backend).

# Entregables:

    Informe en PDF (subido a la plataforma), con los elementos descritos, el nombre completo de los integrantes, y el link al repositorio público en GitHub.