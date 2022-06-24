const socket = io();


const render = async (path, target) => {
    try {
      const data = await fetch(path);
      const parsed = await data.text();
      target.innerHTML = parsed;
    } catch (error) {console.error(error)}
};

socket.on("productsList", async (data) => {
    await render("/products", products);
});
socket.on("productsUpdate", async (data) => {
    await render("/products", products);
});
socket.on("messagesList", async (data) => {
    await render("/chat", chat)
})
socket.on("messagesUpdate", async (data) => {
    await render("/chat", chat)
})


const sendMessage = () => {
    const email = document.getElementById("email-field").value;
    const text = document.getElementById("text-field").value;
    const date = new Date().toLocaleString();

    const msg = { email, text, date };

    if (email !== '' && text !== '') {
        socket.emit('newMessage', msg);
    }
}

const addProduct = () => {
    const title = document.getElementById("title-field").value;
    const price = document.getElementById("price-field").value;
    const thumbnail = document.getElementById("thumbnail-field").value;
    const product = { title, price, thumbnail};

    if (title !== '' && price !== '' && thumbnail !== '') {
        socket.emit('newProduct', product);
    }
}

/*
const chat = (msg) => {
    const { email, text } = msg;
    return `
            <div>
                <strong>${email}</strong>
                <em>${text}</em>
            </div>
    `;
}

const addMessages = (msgs) => {
    const finalMessage = msgs.map(msg => chat(msg)).join(' ');
    document.getElementById('messages').innerHTML = finalMessage;
}
*/
socket.on('messages', (messages) => addMessages(messages));