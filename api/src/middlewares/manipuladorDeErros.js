const manipuladorDeErros = (erro, req, res, next) => {
    res.status(erro.status || 500).json({
        mensagem: erro.message || "Erro interno do servidor",
        detalhes: erro.details || {}
    });
};

module.exports = manipuladorDeErros;