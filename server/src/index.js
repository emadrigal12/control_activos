const express = require("express");
const morgan = require("morgan");
const routes = require("../src/api/endpoints");
require("dotenv").config();

//Configuracion inicial
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Escuchando comunicaciones en el puerto: " + app.get("port"));

//Middlewares
app.use("/", routes);
app.use(morgan("dev"));

//Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la raíz del servidor");
});

app.get("/productos", (req, res) => {
  res.send("Mensaje recibido");
});
