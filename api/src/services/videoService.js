const videosRepository = require("../repositories/videosRepository");

class videosService {

    encontrarTodos() {
        return videosRepository.encontrarTodos();
    }

    encontrarComFiltros(filtros) {
        let videosFiltrados = videosRepository.encontrarTodos()

        if (filtros.titulo) {
            videosFiltrados = videosFiltrados.filter((video) =>
                video.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
            );
        }
        if (filtros.descricao) {
            videosFiltrados = videosFiltrados.filter((video) =>
                video.descricao.toLowerCase().includes(filtros.descricao.toLowerCase())
            );

        }
        return videosFiltrados;
    }
}

module.exports = new videosService();