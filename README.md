## Generar el Loader
Vas a **https://samherbert.net/svg-loaders/** y le das a descargar en 
Github (Esto te redirije a: https://github.com/SamHerbert/SVG-Loaders), copias el código del loader y lo pegas en un archivo de la carpeta public/assets con la extensión '.svg'.
Y Ahora ya lo puedes usar en tu proyecto.
Lo usas como una url para pegar en tu imagen de forma directa así:

**src="assets/loader.svg"**

## Generar el tipado a las peticiones HTTP
Se utiliza->app.quicktype.io, se copia la respuesta de la petición HTTP y se la pega en este sitio.
Se selecciona Typescript y que sólo nos muestre las interfaces y listo, estas interfaces generadas las
utilizo en mi proyecto(Las copio en la carpeta de interfaces).

## Efectos para que la card del gif no aparezca de golpe sino con un fadeIn
Se utiliza **https://animate.style/**
Copias el CDN que aparece es el sitio web y utilizas las clase con la animación que quieras.
Para el caso del proyecto las clases implementadas son:
animate__animated animate__fadeIn
