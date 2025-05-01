# Clover.Space-ListUser-Api

Este proyecto tiene como objetivo obtener información sobre los usuarios de una plataforma externa, Clover Space, utilizando la API pública proporcionada por ellos. Además, permite mostrar esta información de manera estructurada y visual en una página web.

## Descripción

El proyecto está compuesto por un conjunto de funciones JavaScript que interactúan con la API de Clover Space para obtener detalles de usuarios y mostrarlos en una página web. La aplicación incluye funcionalidades como la obtención de la mejor imagen de avatar del usuario, la visualización de información detallada sobre cada usuario (nombre, género, estado, etc.), y la opción de ver el perfil completo de cada usuario en la plataforma.

### Funcionalidades:
- **Obtener el avatar del usuario:** Se obtiene la imagen de perfil más adecuada del usuario, si está disponible.
- **Formato de fecha:** Se formatea la fecha de la última vez que el usuario abrió la aplicación.
- **Renderizar usuarios:** Los usuarios obtenidos de la API se muestran en tarjetas con su información, incluyendo nombre, género, estado, ubicación y fecha de última apertura.
- **Botón para ver perfil:** Los usuarios pueden hacer clic en un botón para abrir el perfil completo de cada usuario en una nueva pestaña.
- **Recarga de página:** El botón de recarga permite refrescar la página con la información actualizada de los usuarios.

## Requisitos

- **API de Clover Space:** La aplicación utiliza la API pública de Clover Space para obtener la información de los usuarios. La URL base de la API es `https://api.clover.space/f/v1/users/namecards`.
- **CORS Proxy:** Dado que la API de Clover Space no permite solicitudes directas desde el navegador, se utiliza un proxy CORS gratuito proporcionado por `https://cors-anywhere.herokuapp.com/`.

## Uso

1. **Obtener usuarios:**
   La función `fetchAllUsers` se encarga de hacer una solicitud a la API de Clover Space para obtener la lista de usuarios. Esta función soporta paginación y puede continuar obteniendo usuarios hasta que no haya más páginas disponibles.

2. **Renderizar los usuarios:**
   La función `renderUsers` recibe una lista de usuarios y los muestra en la página web, creando dinámicamente tarjetas con la información de cada usuario.

3. **Visualización de información:**
   Cada tarjeta de usuario incluye:
   - **Avatar del usuario.**
   - **Nombre o apodo del usuario.**
   - **ID Social.**
   - **Género (Masculino, Femenino, No especificado).**
   - **Estado (Activo, Inactivo).**
   - **Ubicación (si está disponible).**
   - **Fecha de última apertura (si está disponible).**
   - **Botón para ver el perfil completo del usuario.**

4. **Botón de crear servidor CRROS:**
   Un botón que simula la creación de un servidor CRROS (solo una demostración en este caso).

5. **Recargar página:**
   Un botón que permite recargar la página para obtener la lista de usuarios actualizada.

