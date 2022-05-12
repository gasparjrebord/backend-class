class User {
    constructor(name, surname, books, pets){
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }
    getFullName(){
        console.log(`Nombre del usuario: ${this.name} ${this.surname}`);
    }
    addPet(pet) {
        this.pets.push(pet);
    }
    countPets() {
        console.log(`Cantidad de mascotas: ${this.pets.length}`);
    }
    addBook(name, author) {
        this.books.push({name,author});
    }
    getBookName(){
        console.log(`Libros del usuario: ${this.books.map(libro=>libro.name)}`);
    }
}
const firstUser = new User("Gaspar", "Rebord", [], []);
firstUser.addPet('Pipo');
firstUser.addPet('Pia');
firstUser.addBook("1984", "George Orwell");
firstUser.addBook("La naranaja mecanica", "George Orwell");
firstUser.getFullName();
firstUser.countPets();
firstUser.getBookName();