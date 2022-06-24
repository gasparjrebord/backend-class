# Lista de comandos utilizados

- Para crear la base de datos

```console
use ecommerce;
```

- Para crear las colecciones

```console
db.createCollection('products');
db.createCollection('cart');
```

- Para insertar las rows a products

```console
db.products.insertMany([
    {
        "timestamp": ISODate(),
        "title": "Product 1",
        "price": 100,
        "description":"Some description for product 1",
        "code": "code-1",
        "image": "url-1.com",
        "stock": 100
    },
    {
        "timestamp": ISODate(),
        "title": "Product 2",
        "price": 320,
        "description":"Some description for product 2",
        "code": "code-2",
        "image": "url-2.com",
        "stock": 200
    },
    {
        "timestamp": ISODate(),
        "title": "Product 3",
        "price": 930,
        "description":"Some description for product 3",
        "code": "code-3",
        "image": "url-3.com",
        "stock": 300
    },
    {
        "timestamp": ISODate(),
        "title": "Product 4",
        "price": 1140,
        "description":"Some description for product 4",
        "code": "code-4",
        "image": "url-4.com",
        "stock": 400
    },
    {
        "timestamp": ISODate(),
        "title": "Product 5",
        "price": 2250,
        "description":"Some description for product 5",
        "code": "code-5",
        "image": "url-5.com",
        "stock": 500
    },
    {
        "timestamp": ISODate(),
        "title": "Product 6",
        "price": 3360,
        "description":"Some description for product 6",
        "code": "code-6",
        "image": "url-6.com",
        "stock": 600
    },
    {
        "timestamp": ISODate(),
        "title": "Product 7",
        "price": 4470,
        "description":"Some description for product 7",
        "code": "code-7",
        "image": "url-7.com",
        "stock": 700
    },
    {
        "timestamp": ISODate(),
        "title": "Product 8",
        "price": 5000,
        "description":"Some description for product 8",
        "code": "code-8",
        "image": "url-8.com",
        "stock": 800
    },
    {
        "timestamp": ISODate(),
        "title": "Product 9",
        "price": 3450,
        "description":"Some description for product 9",
        "code": "code-9",
        "image": "url-9.com",
        "stock": 900
    },
    {
        "timestamp": ISODate(),
        "title": "Product 10",
        "price": 2860,
        "description":"Some description for product 10",
        "code": "code-10",
        "image": "url-10.com",
        "stock": 1000
    }
]);
```

- Para insertar products al carrito

```console
db.cart.insertMany([
    {
        "timestamp": ISODate(),
        "title": "Product 10",
        "price": 2860,
        "code": "code-10",
        "image": "url-10.com",
        "quantity": 1
    }, 
    {
        "timestamp": ISODate(),
        "title": "Product 2",
        "price": 340,
        "code": "code-2",
        "image": "url-2.com",
        "quantity": 3
    },
    {
        "timestamp": ISODate(),
        "title": "Product 4",
        "price": 1140,
        "code": "code-4",
        "image": "url-4.com",
        "quantity": 6
    }
    ])
```

- Para listar todos los products

```console
db.products.find();
```



- Para contar la cantidad de documentos en products

```console
db.products.countDocuments();
```

- Agregar otro product más a *products*

```console
db.products.insertOne({
        "timestamp": ISODate(),
        "title": "Product 11",
        "price": 3860,
        "description":"Some description for product 11",
        "code": "code-11",
        "image": "url-11.com",
        "stock": 1100
    });
```

- Devolver el **title** del product que tiene código **code-11**

```console
db.products.find({code: "code-11"}, {title: 1, _id:0});
```

- Listar products con precio menor a 1000 pesos:

```console
db.products.find({price: {$lt: 1000}});
```

- Listar los products con precio entre los 1000 a 3000 pesos.

```console
db.products(find {price: {$gt: 1000, $lt: 3000 });
```

- Listar los products con precio mayor a 3000 pesos.

```console
db.products.find({price: {$gt: 3000}});
```


- Realizar una consulta que traiga sólo el nombre del tercer product más barato.

```console
db.products.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
```


- Hacer una actualización sobre todos los products, agregando el campo stock a todos ellos con un valor de 100.

```console
db.products.updateMany({}, {$inc: {stock: 100}});
```


- Cambiar el stock a cero de los products con precios mayores a 4000 pesos. 

```console
db.products.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
```


- Borrar los products con precio menor a 1000 pesos

```console
db.products.deleteMany({price: {$lt: 1000}});
```


- Creación del usuario **pepe**, con contraseña: **asd456**. Permiso solo de lectura
  
```console
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]});
```

- Login del usuario creado anteriormente

```console
mongo -u pepe -p --authenticationDatabase ecommerce 
```

- Vista de las DB que tiene acceso

```console
> show dbs
ecommerce  0.000GB
```

- Intenando agregar un *product* a la colección **product** en la db **ecommerce**

```console
> use ecommerce
switched to db ecommerce
> db.products.insertOne({nombre: "pepe prueba"})
uncaught exception: WriteCommandError({
	"ok" : 0,
	"errmsg" : "not authorized on ecommerce to execute command { insert: \"products\", ordered: true, lsid: { id: UUID(\"0472ecf7-1bf2-47c1-8616-00278992617c\") }, $db: \"ecommerce\" }",
	"code" : 13,
	"codeName" : "Unauthorized"
})
