//IMPORTS
import express from "express";
import ProductManager from "./managers/productManager.js";
import productsRouter from "./routes/products.router.js";
import CartManager from "./managers/cartManager.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

//VARIABLES
const app = express();
const manager = new ProductManager("./Products.json");
const cartManager = new CartManager("./Carts.json");

//MIDDLEWARES
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/", viewsRouter);
app.use(express.static(__dirname + "/../public"));

//SETS HANDLEBARS
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//ENDPOINTS
const httpServer = app.listen(8080, () => {
  console.log("Server listening in port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {});

export { manager, cartManager };
