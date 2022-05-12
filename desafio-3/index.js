const Container = require("./container")

const container = new Container("products.json");

const main = async () => {
    const id1 = await container.save(
        "Regla",
        75,
        "https://rfmayorista.com.ar/wp-content/uploads/2020/03/REGLA-ECONM_15-CM.-600x600.jpg"
    );
    const id2 = await container.save(
        "Goma",
        50,
        "https://image.shutterstock.com/image-photo/rubber-eraser-pencil-ink-pen-260nw-656520052.jpg"
    );
    const id3 = await container.save(
        "Lapicera",
        100,
        "https://aldina.com.ar/wp-content/uploads/2020/08/bic-cristal-trazo-fino-azul-1.jpg"
    );

    console.log(id1, id2, id3); // 1, 2, 3

    const obj2 = await container.getById(2);
    console.log(obj2); // { 'Goma', 50, url, 2 }

    await container.deleteById(2);

    const allObjects = await container.getAll();
    console.log(allObjects);

    //await contenedor.deleteAll();
};

main();