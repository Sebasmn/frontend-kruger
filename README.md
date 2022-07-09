Este proyecto esta hecho con el framework de angularjs.

Los estilos utilizados fueron una combinación de bootstrap, angular material y estilos propios.

Como podrá observar el proyecto tendra diferentes carpetas creadas en app, carpeta que podremos localizar en la siguiente ruta "src/app".

Carpetas incluidas dentro de app:
"_guards": archivos con programación para controlar el acceso a nuestras rutas del proyecto.
"_helpers": contiene un archivo con la programación necesaria para establecer el token de inicio de sesión en nuestro proyecto.
"_models": modelos creados para uso en programación.
"_services": archivos para instanciar los métodos creados en el backend y poderlos utilizar como método en el proyecto.
"angular-material": contiene un archivo con todos los elementos importados de la libreria angular material para su uso en las interfaces del proyecto.
"components": contiene los componentes creados para la creación del presente proyecto.

El archivo "app-routing.module.ts" contiene las rutas creadas para la navegación del sistema.
El archivo "app.component.html" contiene la estructura básica que tendra nuestro sistema, incluyendo las interfaces instanciadas por nuestras rutas.
El archivo "styles.scss" contiene nuestros estilos globales para la aplicación que pueden ser usados en cualquier componente creado. 
Nota: algunos componentes tienen sus propios estilos establecidos en su archivo scss.

Pasos para ejecutar el proyecto:

1. Ejecutar el comando "npm install"
2. Abrir una terminal y ejecutar el comando "ng serve -o"
3. Esperar hasta que el proyecto se despliegue en una nueva pestaña del navegador por defecto de su computador


Usuarios de prueba para el sistema

Administrador
-------------
Usuario: kruger-1804629226
Contraseña: 1ue09r2grk282646

Empleado
--------
Usuario: kruger-1850261668
Contraseña: r688k66r10215gue

Nota: Al momento de crear un empleado nuevo usando la cuenta de administrador el usuario y contraseña para ingresar al sistema se envian al correo electrónico del registro.
