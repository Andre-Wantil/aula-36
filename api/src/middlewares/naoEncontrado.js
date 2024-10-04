const naoEncontrado = (req, res, next) => {
    res.status(404).json({
        mensagem: "Recurso não encontrado",
        caminho: req.originalUrl
    });
};

module.exports = naoEncontrado;