const socket = io();


const sendMessage = () => {
    const email = document.getElementById("email-field").value;
    const text = document.getElementById("text-field").value;
    const msg = { email, text, date: new Date().toLocaleString()};
    socket.emit('newMessage', msg);
    return false;
}

const addProduct = () => {
    const title = document.getElementById("title-field").value;
    const price = document.getElementById("price-field").value;
    const thumbnail = document.getElementById("thumbnail-field").value;
    const product = { title, price, thumbnail};
    socket.emit('newProduct', product);
    return false;
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