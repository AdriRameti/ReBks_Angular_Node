# ReBks Project

En este proyecto, he desarrollado una página web donde su finalidad es potenciar el mercado de articulos de segunda mano. En este caso, se trata de una web para la compra-venta de libros de estudios de segunda mano.
La web se divide en varias categorias las cuales son:
  1. Enseñanza
  2. Curso
  3. Asignaturas
Cada una de estas categorias mostrará la disposición de libros de dicha categoria. Esto hace que en la web se apliquen filtros constantemente.

## Home

En el apartado de Home, nos mostrara todas las enseñanzas que se dispone de libros actualmente.
Esta página sera una página de filtro ya que cuando seleccionemos la enseñanza, se guardará para pasar a la otra vista.
En todas las páginas encontraremos una barrada busqueda y una sección de filtros, las cuales cuando se activen mostraran los resultados y en el caso de la barra de busqueda, cuando se elimine el texto regresará a la página donde estaba

## Cursos

Como en el caso anterior, la página de cursos también será una página de filtrado ya que al seleccionar el curso que deseamos, este se guardara junto a la enseñanza para que alfinal se muestre el resultado con todos los filtros aplicados.

## Asignaturas

En la página de asignaturas, encontraremos todas las asignaturas de la enseñanza y curso seleccionados anteriormente.
Esta página también será una página de filtrado ya que una vez seleccionemos la asignatura, nos mostrara los libros con los filtros aplicados durante la navegación.

## Shop

Terminada la navegación por la web y aplicados los filtros, llegamos al apartado donde se muestra el resultado de la busqueda.
Aquí podremos seguir al usuario que ha posteado el articulo o darle like al artículo si nos ha gustado. 
Ademas, si pulsamos encima de la imágen de la targeta del artículo, nos redirigirá a la vista detallada del artículo.

## Details

En esta parte, encontraremos un desglose detallado del artículo. Además, se pueden realizar distintas acciones las cuales son:
  1. Calificar el articulo por puntuación de 0 a 5 estrellas
  2. Comentar que te ha parecido el artículo 
  3. Si eres el dueño del artículo, podrás eliminar aquellos comentarios que veas inapropiados.
  4. Se puede dar like al comentario
  5. Si pulsamos al autor del artículo nos redirigira a su perfil donde nos aparecerá los libros que ha publicado dicho usuario

## Login y Register

En este apartado, podremos registrarnos o iniciar sesion para tener un perfil en la página. Los campos serán requeridos y estarán validados para que se haga un correcto registro
Una vez iniciada la sesion, ya podrás dar follow o like a los articulos ya que si no estuviera iniciada la sesion, te redirigiria a la página de login
Además, una vez has iniciado sesion, podrás dirigirte a tu perfil donde aparecerá tu información la cual la podrás modificar y además aparecerán los articulos que te han gustado y los usuarios que sigues.

## Karma

Esta página web tendrá un sistema de Karma que consta en que dependiendo de la acción que se realice, se sumará una puntuación al usuario. 
Estas acciones pueden ser:
  1. Follow
  2. Like
  3. Visitar perfiles

## Tecnologías utilizadas

Vamos a dividir las tecnologías en 3 bloques los cuales son:

  Frontend:
  En la parte de frontend hemos utilizado la tecnología Angular 12
  Backend: 
  En el backend hemos realizado un servidor Express basado en Node JS
  Data Base:
  La base de datos ha sido creada en MongoDB realizando las peticiones con Mongoose.
