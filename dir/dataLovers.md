# Data Lovers

## Índice

* [1. Resumen del proyecto](#2-resumen-del-proyecto)
* [2. Herramientas usadas](#3-herramientas-usadas)
* [3. Trabajo pre-codeo](#4-trabajo-pre-codeo)
* [4. Funcionalidad de la Interfaz](#5-funcionalidad-de-la-Interfaz)
* [5. Recursos](#6-recursos)

***

## 1. Resumen del proyecto

Esta web nos permite visualizar una base de datos con los pokemons de las primeras 2 generaciones con su informacion correspondiente a Pokemon GO.
Un trabajo de Alexandra F. Vega y Barbara de Villa.

## 2. Herramientas usadas

### HTML

### CSS

### JavaScript

### Control de Versiones (Git y GitHub)

## 3. Trabajo pre-codeo

### Definición del producto

Una web para visualizar datos y facilitar el uso de la aplicacion de Pokemon Go.

### Historias de usuario

![Historias de usuario](/src/img/historiasdeusuario.jpg)
![Criterios de Aceptación](/src/img/criteriosdeaceptacion.jpg)

### Diseño de la Interfaz de Usuario

#### Prototipo de baja fidelidad

![Prototipo de baja 1](/src/img/prototipodebaja1.jpg)

#### Prototipo de alta fidelidad

![Prototipo de alta 1](/src/img/prototipodealta1.jpg)
![Prototipo de alta 2](/src/img/MacBookAir-2.png)
![Prototipo de alta 3](/src/img/MacBookAir-3.png)

#### Testeos de usabilidad

No encontramos grandes problemas durante los testeos, pero gracias al feedback decidimos modificar la interfaz al diseño actual para tener una experiencia de usuario mas placentera y ordenada

## 4. Funcionalidad de la Interfaz

**1. Caracteristicas principales**

* La interfaz esta dividida en 2 secciones importantes, en una podemos visualizar la informacion con tarjetas y la otra en forma de tabla.
* En la seccion de tarjetas podemos ver la imagen numero nombre, y tipos de cada pokemon.
* En la seccion con la tabla tenemos los mismos datos pero tambien incluyen debilidades, resistencias, Km para incubar huevos y el numero de caramelos necesarios para pasar a la siguiente evolucion.
* Contamos con botones de filtrado por tipo, estos botones se pueden combinar para buscar pokemon que pertenezcan a 2 tipos distintos.
* Tambien hay una caja de texto para ingresar el numero o el nombre de un pokemon y realizar su busqueda.
* Al buscar un nombre podemos visualizar todos los pokemon de la linea evolutiva del pokemon buscado.
* El header para los nombres y numeros es usado como boton para ordenar las columanas en ascendente o descendente.

**2. Descripción de scripts / archivos**

* `src/index.html`: Punto de entrada a la aplicación.
* `src/style.css`: Reglas de estilo
* `src/main.js`: Codigo para interactuar el el DOM y funcionalidad basica de la interfaz.
* `src/data.js`: Codigo con la funcion para ordenar columnas y la funcion de filtrado por tipo.
* `src/data/pokemon/pokemon.js`: Base de datos usada en el proyecto.
* `test/data.spec.js`: Tests que se uso para verficar el codigo.
* `README.md`: Explicacion del producto.
* `src/img`: Imagenes usadas en la interfaz y el readme.

## 5. Recursos

### Software Usado

* [Code](https://code.visualstudio.com/)
* [UNIX Shell](https://curriculum.laboratoria.la/es/topics/shell)
* [Git bash](https://git-scm.com/download/win)
* [Git](https://git-scm.com/)
* [GitHub](https://github.com/)
* [GitHub Pages](https://pages.github.com/)

### Referencias

* [Generar una tabla con una base de datos](https://www.youtube.com/watch?v=ri5Nqe_IK50).
* [Ordenar columnas](https://www.youtube.com/watch?v=0d76_2sksWY)
* [Usar funciones en loops](https://stackoverflow.com/questions/18312016/calling-function-in-a-loop-in-javascript)
* [Referencia para la tabla](https://pokemondb.net/pokedex/all)
* [Saltar un loop](https://www.w3schools.com/js/js_break.asp)
* [Busqueda](https://www.w3schools.com/jsref/jsref_includes_array.asp)
* [Filtrado](https://www.youtube.com/watch?v=O3Ht2uejzfM)
*[Tarjetas](https://www.youtube.com/watch?v=rfsv0i4qXFs)
*[Diseño](https://www.youtube.com/watch?v=bF5UBkonkIs )

