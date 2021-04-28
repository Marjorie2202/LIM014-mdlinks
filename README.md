# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Guía de uso](#3-guía-de-uso)
* [4. Objetivos de Aprendizaje](#4-objetivos-de-aprendizaje)
* [5. Checklist](#5-checklist)
  
***

## 1. Preámbulo

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchs plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Resumen del proyecto

El proyecto MDLinks crea una librería usando Node JS, que lee y analiza archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas, así como una herramienta de línea de comando (CLI).

![MDLinks Logo](https://user-images.githubusercontent.com/75852321/116343566-48a53e80-a7aa-11eb-8952-dd098c45e75e.png)

### 2.1. Diagramas de Flujo

#### **A. API**

![API de MD-Links](https://user-images.githubusercontent.com/75852321/116339368-ea289200-a7a2-11eb-90cf-7cab4412a305.png)

#### **B. CLI**

![CLI de MD-Links](https://user-images.githubusercontent.com/75852321/116343878-eef14400-a7aa-11eb-9a3e-0c0cfea7c729.png)

## 3. Guía de Uso

Para la instalación, usar el siguiente comando:

~~~ 
npm 
~~~ 

El ejecutable de la aplicación se ejecuta de la siguiente manera a través de la terminal:

~~~ 
md-links <path-to-file> [options]
~~~ 

### Options

#### **--stats**

Si pasamos la opción '-s' o '--stats', el output (salida) será un texto con estadísticas básicas sobre los links.

~~~
$ md-links ./some/example.md --stats
~~~

Por ejemplo:

![Stats example](https://user-images.githubusercontent.com/75852321/116343969-17793e00-a7ab-11eb-8a9f-c71c36347d23.png)

#### **-validate**

Si pasamos la opción '--validate' o '-v' o 'validate link', el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

~~~
$ md-links ./some/example.md --validate
~~~

Por ejemplo:

![validate Example](https://user-images.githubusercontent.com/75852321/116344437-d7ff2180-a7ab-11eb-8e0f-b14ec5326df9.png)

#### **--statsValidate**

También podemos combinar --stats y --validate o pasarla opción '-a' para obtener estadísticas que necesiten de los resultados de la validación.

~~~
$ md-links <path-to-file> --stats --validate
~~~

Por ejemplo:

![StatsValidate example](https://user-images.githubusercontent.com/75852321/116344331-ac7c3700-a7ab-11eb-81d4-3c05f25c55d4.png)


#### **No Option**

Si no se ingresa una opción, por default se identifica al archivo markdown (a partir de la ruta que recibe como
argumento), analiza , e imprimevlos links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

~~~
$ md-links <path-to-file>
~~~

Por ejemplo:

![No Option example](https://user-images.githubusercontent.com/75852321/116345327-89eb1d80-a7ad-11eb-8b8d-15d1bae1e7d6.png)

#### **--help**

Si se desea conocer los comandos a usar, se debe ingresar elcomando '-h' o '--help' (sin ingresar el 'path') , de la siguiente forma:

~~~
$ md-links --help
~~~

Por ejemplo:

![Help example](https://user-images.githubusercontent.com/75852321/116345554-fb2ad080-a7ad-11eb-8179-e80fbaa87156.png)


## 4. Objetivos de Aprendizaje

### JavaScript

* [x] Uso de condicionales (if-else | switch | operador ternario)
* [x] [Uso de funciones (parámetros | argumentos | valor de retorno)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones)
* [x] [Manipular arrays (filter | map | sort | reduce)](https://code.tutsplus.com/es/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209)
* [ ] [Manipular objects (key | value)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object)
* [x] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
* [x] [Diferenciar entre expression y statements.](https://openclassrooms.com/en/courses/4309531-descubre-las-funciones-en-javascript/5108986-diferencia-entre-expresion-y-sentencia)
* [x] [Diferenciar entre tipos de datos atómicos y estructurados.](https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures)
* [x] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [x] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [x] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

### Node

* [x] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))
* [x] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [x] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
* [x] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [x] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [x] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

* [x] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [x] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Uso de librerias de Mock.](https://jestjs.io/docs/es-ES/manual-mocks)
* [x] Uso de Mocks manuales.
* [ ] Testeo para múltiples Sistemas Operativos.

### Estructura del código y guía de estilo

* [x] [Organizar y dividir el código en módulos (Modularización)](https://medium.com/@sebastianpaduano/modularizaci%C3%B3n-en-javascript-538bd6c75fa)
* [x] Uso de identificadores descriptivos ([Nomenclatura](http://snowdream.github.io/javascript-style-guide/javascript-style-guide/es/naming-conventions.html) | [Semántica](https://geekytheory.com/semantica-coder))
* [x] Uso de linter (ESLINT)

### Git y GitHub

* [x] [Uso de comandos de git (add | commit | pull | status | push)](https://github.com/jlord/git-it-electron)
* [x] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [x] Colaboración en Github (branches | pull requests | |[tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging))
* [x] Organización en Github (projects | issues | labels | milestones)

### HTTP

* [x] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

### Fundamentos de programación

* [x] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)


## 5. Checklist

### General

* [x] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [x] Un board con el backlog para la implementación de la librería.
* [ ] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios
* [x] Implementa `options.validate`

### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [x] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [x] Pasa tests (y linters) (`npm test`).