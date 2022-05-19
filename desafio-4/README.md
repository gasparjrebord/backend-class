# Desafío 4

## API RESTful

### Consignas

Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:

- **GET** _/api/productos_ -> devuelve todos los productos.
- **GET** _/api/productos/:id_ -> devuelve un producto según su id.
- **POST** _/api/productos_ -> recibe y agrega un producto, y lo devuelve con su id asignado.
- **PUT** _/api/productos/:id_ -> recibe y actualiza un producto según su id.
- **DELETE** _/api/productos/:id_ -> elimina un producto según su id.

- Cada producto estará representado por un objecto con el siguiente formato

```json
{
  "title": "(nombre del producto)",
  "price": "(precio)",
  "thumbnail": "(url al logo o foto del producto)"
}
```

- Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

- Para el caso de que un producto no exista, se devolverá el objeto:
  { error : 'producto no encontrado' }

- Implementar los métodos de la API en una clase separada, utilizando para la persistencia de sus productos un contenedor de los desarrollados en clases anteriores.

- Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.

- Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.

- El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.

- Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

## Para probar API puedes realizar lo siguiente

1. Estar en el directorio de **'Entrega-4'**

2. Instalar dependencias con: `npm install`

3. Iniciar el servidor con `npm run server`

---

### `GET | http://localhost:8080/api/productos`

### `GET | http://localhost:8080/api/productos/:id`

### `POST | http://localhost:8080/api/productos`

### `PUT | http://localhost:8080/api/productos/:id`

### `DELETE | http://localhost:8080/api/productos/:id`
