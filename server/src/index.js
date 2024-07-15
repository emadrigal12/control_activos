const express = require("express");
const morgan = require("morgan");
const routes = require("../src/api/endpoints");
require("dotenv").config();
const cors = require('cors')
//Configuracion inicial
const app = express();
app.set("port", 4000);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"]
}));

app.use("/", routes);
app.use(morgan("dev"));

//Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a la raíz del servidor");
});

app.get("/productos", (req, res) => {
  res.send("Mensaje recibido");
});

app.listen(app.get("port"));
console.log("Escuchando comunicaciones en el puerto: " + app.get("port"));
