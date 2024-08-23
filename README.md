# **📚 Nova-Manga**

**Nova-Manga** es un proyecto de Proyecto de Final de Ciclo (PFC) que consiste en una aplicación web dedicada a la gestión y recomendación de manga. La aplicación cuenta con una base de datos interna que permite gestionar libros, autores y editoriales de manera eficiente. 

## **✨ Características Principales**

- **Gestión de Contenidos**: Administra una base de datos de mangas, autores y editoriales.
- **Búsqueda Avanzada**: Los usuarios pueden explorar un listado de mangas con opciones de filtrado para facilitar la búsqueda de sus títulos favoritos.
- **Detalles del Manga**: Cada manga incluye una página de detalles donde se proporciona información completa sobre el título, incluyendo el autor, la editorial, y más.

## **🖼️ Imágenes del Proyecto**
Index
![App Screenshot](/Documentation/)

Recomendaciones:
![App Screenshot](/Documentation/screenshot/reco.png)

Catálogo:
![App Screenshot](/JS%20PROYECTOS/DOM/input-color-rgb/imagenes/DOM4.png)

Detalle:
![App Screenshot](/JS%20PROYECTOS/DOM/input-color-rgb/imagenes/DOM4.png)

Panel de gestión de libros (como ejemplo):
![App Screenshot](/JS%20PROYECTOS/DOM/input-color-rgb/imagenes/DOM4.png)

## **🔍 Funcionalidades Adicionales**

- **Interfaz Intuitiva**: Diseñada para que la navegación y la experiencia del usuario sean lo más fluida posible.
- **Actualizaciones en Tiempo Real**: La base de datos se actualiza constantemente para reflejar las últimas novedades del mundo del manga.

---

Este proyecto no solo ofrece una plataforma para la gestión de mangas, sino que también proporciona a los usuarios una experiencia rica y personalizada para descubrir y explorar nuevos títulos.


## **🚀 Instalación**

1. Clona el repositorio:
   
bash
   git clone https://github.com/Aikarubi/Nova-manga.git

2. Levanta los servicios con Docker:
bash
   docker-compose up -d

3. Configura la base de datos:

bash
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
   php bin/console doctrine:fixtures:load

4. Instala las dependencias del frontend (Angular):

bash
   cd frontend
   npm install
   ng serve

5. Accede a la aplicación:

Abre tu navegador y ve a http://localhost:4200 para ver la aplicación en funcionamiento.

   


## **Tecnologías utilizadas**

**Frontend:** HTML5, CSS3, TypeScript
**FrameWorks:** Angular, B5
**Backend:** PHP, MariaDB, Docker
**FrameWorks:** Symfony, Doctrine
