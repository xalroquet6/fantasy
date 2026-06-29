# 🏆 La Liga Fantasy PALOS FC
La aplicación permite seguir la clasificación general de la liga de amigos, ver el desglose detallado de puntos obtenidos por jornada, examinar estadísticas avanzadas de cada jugador y revisar el reglamento de la competición.

---

## 🛠️ Tecnologías Utilizadas

*   **[React 19](https://react.dev/):** Biblioteca para construir interfaces de usuario de forma declarativa e interactiva a través de componentes.
*   **[TypeScript](https://www.typescriptlang.org/):** Tipado estático sobre JavaScript para prevenir errores en tiempo de desarrollo y estructurar datos de forma limpia.
*   **[Vite 8](https://vite.dev/):** Empaquetador ultra-rápido para un entorno de desarrollo ágil y compilaciones optimizadas.
*   **[Tailwind CSS 4](https://tailwindcss.com/):** Framework de CSS utilitario para un estilado moderno, responsivo y visualmente atractivo.

---

## 📂 Estructura del Proyecto

A continuación se detalla la organización de los directorios y archivos principales de la aplicación:

```text
fantasy-react/
├── src/
│   ├── components/            # Componentes modulares de la interfaz
│   │   ├── Liga.tsx           # Vista de clasificación general e histórica de jornadas
│   │   ├── Jugadores.tsx      # Estadísticas acumuladas y marcas de participantes
│   │   ├── NavBar.tsx         # Barra de navegación por pestañas de la app
│   │   ├── Reglamento.tsx     # Reglamento oficial de la competición
│   │   ├── Copa.tsx           # Vista de la competición de Copa por parejas
│   │   └── Champions.tsx      # Vista de la competición de Champions League
│   ├── data/
│   │   ├── datos.ts           # Base de datos local (Participantes, Jornadas, Copa)
│   │   └── textoReglamento.ts # Texto del reglamento oficial formateado
│   ├── App.tsx                # Componente principal que gestiona el estado y enrutado básico
│   ├── tipos.ts               # Definición de interfaces y tipos TypeScript del modelo de datos
│   ├── index.css              # Configuración de estilos globales y Tailwind CSS
│   └── main.tsx               # Punto de entrada de la aplicación en el DOM
├── index.html                 # Plantilla HTML base
├── package.json               # Configuración del proyecto, dependencias y scripts
└── tsconfig.json              # Configuración del compilador de TypeScript
```

---

## 📊 Modelo de Datos

Las estructuras y tipos de datos se encuentran completamente tipados para asegurar la consistencia del proyecto:

1.  **Interfaces y Tipos:**
    *   Definidos en [tipos.ts](file:///Users/xavi/Desktop/fantasy-react/src/tipos.ts).
    *   [Participante](file:///Users/xavi/Desktop/fantasy-react/src/tipos.ts#L1-L4): Representa a un jugador de la liga (`id`, `nombre`).
    *   [JornadaLiga](file:///Users/xavi/Desktop/fantasy-react/src/tipos.ts#L11-L14): Estructura de cada jornada, que almacena el número de jornada y un array con el participante y sus puntos.
    *   [CompeticionCopa](file:///Users/xavi/Desktop/fantasy-react/src/tipos.ts#L21-L24): Define en qué jornada de liga se juega la copa y el listado de parejas formadas.

2.  **Base de Datos Estática:**
    *   Ubicada en [datos.ts](file:///Users/xavi/Desktop/fantasy-react/src/data/datos.ts).
    *   Contiene los participantes iniciales (`PARTICIPANTES`), las jornadas jugadas con sus puntuaciones reales (`JORNADAS`) y las parejas de Copa (`COPA`).

---

## 🧩 Componentes Principales

La aplicación se compone de vistas modulares renderizadas de forma condicional en [App.tsx](file:///Users/xavi/Desktop/fantasy-react/src/App.tsx):

*   **[NavBar.tsx](file:///Users/xavi/Desktop/fantasy-react/src/components/NavBar.tsx):** Menú superior responsivo que maneja la navegación reactiva entre pestañas de la aplicación.
*   **[Liga.tsx](file:///Users/xavi/Desktop/fantasy-react/src/components/Liga.tsx):**
    *   *Clasificación General:* Lista ordenada de participantes según la suma total de sus puntos históricos.
    *   *Puntos Jornada:* Menú desplegable interactivo para consultar el resultado exacto de cualquier jornada y ordenar a los participantes de mayor a menor puntuación obtenida en ella.
*   **[Jugadores.tsx](file:///Users/xavi/Desktop/fantasy-react/src/components/Jugadores.tsx):** Acordeón interactivo que calcula dinámicamente para cada jugador:
    *   Puntos totales acumulados.
    *   Jornadas ganadas (número de veces que obtuvo la puntuación máxima del grupo).
    *   Media de puntos por jornada.
    *   Récord de puntuación máxima obtenida en una sola jornada.
*   **[Reglamento.tsx](file:///Users/xavi/Desktop/fantasy-react/src/components/Reglamento.tsx):** Renderizado estructurado de las reglas oficiales a partir de [textoReglamento.ts](file:///Users/xavi/Desktop/fantasy-react/src/data/textoReglamento.ts).
*   **[Copa.tsx](file:///Users/xavi/Desktop/fantasy-react/src/components/Copa.tsx) & [Champions.tsx](file:///Users/xavi/Desktop/fantasy-react/src/components/Champions.tsx):** Paneles preparados para expandir la competición (actualmente marcados en construcción).

---

## 🚀 Instalación y Ejecución en Local

Sigue los siguientes pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio e ir al directorio:**
    ```bash
    cd fantasy-react
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo local:**
    ```bash
    npm run dev
    ```
    *Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación funcionando.*

4.  **Compilar para producción:**
    ```bash
    npm run build
    ```

---

## 🌐 Despliegue en Producción

El proyecto está configurado para ser desplegado de manera directa en **GitHub Pages** mediante el comando:
```bash
npm run deploy
```
Este script ejecuta primero `npm run build` para compilar la versión optimizada en la carpeta `dist/` y luego utiliza la librería `gh-pages` para publicarlo en la rama de despliegue correspondiente.

---