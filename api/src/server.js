const express = require("express");
const servidor = express();

const rotas = require("./utils/rotas.json")

const videosRoutes = require("./routes/videosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const canaisRoutes = require("./routes/canaisRoutes");
const naoEncontrado = require("./middlewares/naoEncontrado");
const manipuladorDeErros = require("./middlewares/manipuladorDeErros");
const path = require("node:path")

// Middleware para permitir requisições JSON
servidor.use(express.json());
servidor.use("/uploads", express.static(path.resolve(__dirname, "..", "public")))

// Usando as rotas
servidor.use("/videos", videosRoutes);
servidor.use("/canais", canaisRoutes);
servidor.use("/usuarios", usuariosRoutes);

servidor.get("/", (req, res) => res.json(rotas));

servidor.use(manipuladorDeErros)
servidor.use(naoEncontrado)

// Inicializando o servidor na porta 3000
servidor.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
