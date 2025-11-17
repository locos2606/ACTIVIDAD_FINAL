# ACTIVIDAD_FINAL
Actividad 2 David Giron 

Este es un proyecto Full-Stack simple de una "Lista de Tareas". El sistema está compuesto por un backend (API) construido con Node.js y un frontend interactivo (página web) construido con HTML, CSS y JavaScript.

Arquitectura del Sistema
El proyecto se divide en dos componentes principales que se ejecutan de forma independiente:

El Backend (La "Cocina") : Es una API RESTful escrita en index.js. Se encarga de conectarse a la base de datos, gestionar la lógica de negocio y responder a las peticiones del frontend.

El Frontend (El "Restaurante") : Es una página web ( index.html) que el usuario ve en su navegador. Se encarga de "consumir" la API para mostrar, crear, actualizar y eliminar tareas de forma visual e interactiva.

Tecnologías Utilizadas
Backend
Node.js : entorno de ejecución de JavaScript en el servidor.

Express : Framework para construir la API y gestionar las rutas (endpoints).

MySQL : Base de datos relacionales para almacenar las tareas.

mysql(paquete npm) : Controlador para conectar Node.js con la base de datos MySQL.

cors(paquete npm) : Middleware para permitir que el frontend (en un dominio diferente) pueda hacer peticiones a la API.

morgan(paquete npm) : Middleware para registrar (loggear) todas las peticiones HTTP que llegan al servidor en la terminal.

Interfaz
HTML5 : Para la estructura de la página web.

CSS3 : Para los estilos visuales (integrado en el index.html).

JavaScript (ES6+) : Para la interactividad del cliente (Fetch API, manipulación del DOM).

Entorno
XAMPP : Utilizado para ejecutar el servidor de base de datos MySQL de forma sencilla.

VS Code (con Live Server) : Editor de código y servidor de desarrollo para el frontend.



Configuración de la Base de Datos----------

El backend se conecta a una base de datos MySQL llamada api_dbque contiene una tabla tasks.

Script SQL de la estructura:
SQL

-- 1. Crear la base de datos
CREATE DATABASE api_db;

-- 2. Usar la base de datos
USE api_db;

-- 3. Crear la tabla de tareas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Cómo Ejecutar el Proyecto
Para poner en marcha el sistema completo, debes iniciar el Backend y el Frontend por separado.

1. Iniciar el Backend (API)
El backend debe estar siempre corriendo para que el frontend pueda funcionar.

Abra el panel de control de XAMPP y presione "Inicio" en el módulo de MySQL .

Abre una terminal en la raíz del proyecto en VS Code.

Si es la primera vez, instale las dependencias:

Intento

npm install express mysql cors morgan
Inicia el servidor:

Intento

node index.js
La terminal debería:

Conectado exitosamente a la base de datos MySQL.
Servidor corriendo en http://localhost:3000
¡No cierres esta terminal!

2. Iniciar el Frontend (Página Web)
En VS Code, haga clic en derecho sobre el archivo index.html.

Selecciona la opción "Abrir con Live Server" .

Esto abrirá automáticamente tu navegador en una dirección similar a http://127.0.0.1:5500/index.html.

¡Y listo! La página web se cargará y se comunicará con tu API. Puedes empezar a agregar, completar y eliminar tareas.

 Funcionalidad de la API (Endpoints)
El backend ( index.js) expone las siguientes rutas:

GET /tasks: Obtiene y devuelve una lista (matriz) de todas las tareas en la base de datos.

POST /tasks: Crea una nueva tarea. Espera un JSON en el cuerpo con un title.

Ejemplo de cuerpo :{ "title": "Mi nueva tarea" }

PUT /tasks/:id: Actualiza una tarea existente (para marcarla como completada). Espera un JSON en el cuerpo con el campo completed.

Ejemplo de cuerpo :{ "completed": true }

DELETE /tasks/:id: Elimine una tarea específica basada en su id.
