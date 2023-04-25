# Markdown Links

## Índice

* [1. Instalación](#1-instalación)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Herramientas usadas](#3-herramientas-usadas)
* [4. Librerias externas](#4-librerias-externas)
* [5. Caracteristicas principales](#5-caracteristicas-principales)
* [6. Archivos del proyecto](#6-archivos-del-proyecto)
* [7. Referencias](#7-referencias)

***

## 1. Instalación

```js
$ npm install @alexvyard/md-links
```

## 2. Resumen del proyecto

Esta libreria nos permitira checkear si nuestros links dentro de los archivos Markdown funcionan, con opciones para simplemente listar los links hasta mostrar estadisticas sobre ellos

## 3. Herramientas usadas

### JavaScript

### Node.js

### Control de Versiones (Git y GitHub)

### HTTP

## 4. Librerias externas

* Commander
* Gulp
* Linkinator
* "markdown-link-check"
* "markdown-link-extractor"

## 5. Caracteristicas principales

* Podemos ejecutar el codigo a traves de la terminal usando "md-links" en conjunto con una ruta, ya sea absoluta o relativa o un directorio o un solo archivo.
```js
$ md-links
```

* Si no se inserta una ruta nos mostrara indicaciones de como usar el comando.
```js
$ md-links

Usage: md-Links [route] [options]

Options:
  -v, --validate  Validate links, use with a route
  -s, --stats     Show stats, use with a route

Example call:
  $ md-Links README.md --validate

Please insert a route
```

* Al ingresar una ruta tendremos nos regresara una lista con el link, el archivo donde se origino, su texto correspondiente y la linea donde se encuentra.
```js
$ md-links README.md

README.md https://github.com/cheeriojs/cheerio Cheerio 276
README.md https://github.com/markedjs/marked marked 277
README.md https://github.com/workshopper/learnyounode learnyounode 286
```

* Tenemos 2 opciones --validate y --stats, tambien podemos usar -v o -s correspondientemente.

* Al usar --validate nos regresara una lista con el link, el archivo donde se origino, el estado del link, el numero de respuesta, su texto correspondiente y la linea donde se encuentra.
```js
$ md-links README.md --validate

README.md https://github.com/workshopper/how-to-npm alive 200 how-to-npm 299
README.md https://www.youtube.com/watch?v=WgSc1nv_4Gw alive 200 ¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube 312
README.md https://carlosazaustre.es/manejando-la-asincronia-en-javascript alive 200 Asíncronía en js 316
```

* Al usar --stats nos listará el total de links y el total de links unicos.
```js
$ md-links README.md --stats

README.md
  Total: 31
  Unique: 31
```

* Al usar ambas opciones en conjunto nos regresara el total de links, el total de links unicos y el total de links rotos.
```js
$ md-links README.md --stats --validate

README.md
  Total: 31
  Unique: 31
  Broken: 1
```

* Si ingresamos incorrectamente una opcion o ruta nos regresara un mensaje de error.

## 6. Archivos del proyecto

* `README.md` Descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos.
* `index.js`: Modulo
* `modules\scripts.js` modulo con scripts para las opciones
* `package.json` nombre, versión, descripción, autores, licencia,
  dependencias, scripts, main, bin, etc
* `.editorconfig` configuración para editores de texto.
* `.eslintrc` configuración para linter.
* `.gitignore` para ignorar `node_modules`
* `test/md-links.spec.js` tests unitarios
* `gulpfile.js` configuracion de gulp
* `dir` directorio con archivos markdown 
* `dor` directorio sin archivos markdown

## 7. Referencias

* [Commander](https://github.com/tj/commander.js)
* [Node JS CLI Tutorials - Intro & Basics with Commander.js](https://www.youtube.com/watch?v=q3IfiUCuZvU)
* [Node.js Command Line Interface | Commander.js - The complete solution for node.js CLI](https://www.youtube.com/watch?v=CF_ZFydxxxs)
* [markdown-link-check](https://www.npmjs.com/package/markdown-link-check)
* [markdown-link-extractor](https://www.npmjs.com/package/markdown-link-extractor)
* [Tú, yo y package.json](https://medium.com/noders/t%C3%BA-yo-y-package-json-9553929fb2e3)
* [Easy Way to Create CLI Scripts with JavaScript and Node](https://www.youtube.com/watch?v=dfTpFFZwazI)
* [Regex to check for certain extensions or no extension and is only 0-9, a-z and hyphens](https://stackoverflow.com/questions/59471139/regex-to-check-for-certain-extensions-or-no-extension-and-is-only-0-9-a-z-and-h)
* [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
* [Check for Broken Links with Node.js](https://www.youtube.com/watch?v=SdvlogJv3S8)
* [linkinator](https://github.com/JustinBeckwith/linkinator)
* [How to use Dynamic Imports for Modules - JavaScript Tutorial](https://www.youtube.com/watch?v=5s5fVghc4S8)
* [For loop inside For Loop Javascript](https://stackoverflow.com/questions/7071818/for-loop-inside-for-loop-javascript)
* [Executing shell commands from gulp tasks and promise based tasks - Gulp](https://www.youtube.com/watch?v=7aC-s5Lkmm8)
* [Unit Testing Commander Scripts With Jest](https://fireflysemantics.medium.com/unit-testing-commander-scripts-with-jest-bc32465709d6)
