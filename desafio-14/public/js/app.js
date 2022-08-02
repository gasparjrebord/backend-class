const socket = io();
const productForm = document.querySelector("#productForm");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");
const products = document.querySelector("#products");
const chatForm = document.querySelector("#chatForm");
const email = document.querySelector("#email");
const name = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const age = document.querySelector("#age");
const nickname = document.querySelector("#nickname");
const authorImage = document.querySelector("#authorImage");
const message = document.querySelector("#message");
const chat = document.querySelector("#chat");
const chatTitle = document.querySelector('#chatTitle')
const welcome = document.querySelector("#welcome");
const logoutButton = document.querySelector("#btnLogout");




fetch("../partials/chat.hbs")
  .then((response) => response.text())
  .then((template) => {
    const chatTemplate = Handlebars.compile(template);

    fetch("../partials/productList.hbs")
      .then((response) => response.text())
      .then((template) => {
        const productListTemplate = Handlebars.compile(template);

        fetch("/user")
          .then((response) => response.text())
          .then((user) => (welcome.innerHTML = `Bienvenido ${user}`));

            logoutButton.addEventListener("click", async () => {

              const response = await fetch("/logout");
              const name = await response.text();

              await fetch("../partials/logout.hbs")
                .then((response) => response.text())
                .then((template) => {
                  const logoutTemplate = Handlebars.compile(template);

                  const html = logoutTemplate({ name: name });
                  document.querySelector("body").innerHTML = html;
                
                  setTimeout(() => {
                    location.reload()
                  }, 2000)
                });
            });

            const authorSchema = new normalizr.schema.Entity(
              "authors",
              {},
              { idAttribute: "email" }
            );
            const messageSchema = new normalizr.schema.Entity(
              "messages",
              {
                author: authorSchema,
              },
              { idAttribute: "_id" }
            );
            
            const calculateCompression = (normalized, denormalized) => {
              const compressed = JSON.stringify(normalized).length;
              const uncompressed = JSON.stringify(denormalized).length;
              const compression = (compressed / uncompressed) * 100;
              return compression.toFixed(2);
            }

            socket.on("init", async (data) => {
              const html = productListTemplate({ products: data });
              products.innerHTML = html;
            });
            socket.on("productUpdate", async (data) => {
              const html = productListTemplate({ products: data });
              products.innerHTML = html;
            });
            socket.on("chatInit", async (data) => {
              const denormalizedData = normalizr
                .denormalize(data.result, [messageSchema], data.entities)
                .reverse();
              const html = chatTemplate({ messages:  denormalizedData});
              chat.innerHTML = html;
              chatTitle.innerHTML = 
              `Compresión: ${calculateCompression(data, denormalizedData)}%`
            });
            socket.on("chatUpdate", async (data) => {
              const denormalizedData = normalizr
                .denormalize(data.result, [messageSchema], data.entities)
                .reverse();
              const html = chatTemplate({ messages: denormalizedData });
              chat.innerHTML = html;
              chatTitle.innerHTML = 
              `Compresión: ${calculateCompression(data, denormalizedData)}%`
            });

            productForm.addEventListener("submit", (event) => {
              event.preventDefault();
              const newProduct = {
                title: title.value,
                price: price.value,
                thumbnail: thumbnail.value
              };
              socket.emit("newProduct", newProduct);
            });

            chatForm.addEventListener("submit", (event) => {
              event.preventDefault();
              const newMessage = {
                author: {
                  email: email.value,
                  name: name.value,
                  lastname: lastname.value,
                  age: age.value,
                  nickname: nickname.value,
                  authorImage: authorImage.value,
                },
                text: message.value,
                timestamp: new Date().toLocaleString(),
              };
              socket.emit("newMessage", newMessage);
              message.value = "";
            });
      });
    
  });
