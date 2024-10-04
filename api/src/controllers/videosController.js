const videosRepository = require("../repositories/videosRepository");

const Video = require("../models/Video");
const videoService = require("../services/videoService");
class videosController {
  index(req, res, next) {
    try {
      const filtros = req.query;
      
      const videos = videoService.encontrarComFiltros(filtros);

      if (videos.length > 0) {
        res.status(200).json(videos);
      } else {
        res.status(404).json({ mensagem: "Nenhum vídeo encontrado" });
      }
    } catch (erro) {
      next(erro)
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const video = videosRepository.buscarPeloId(id);

      if (video) {
        res.status(200).json(video);
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar vídeo", detalhes: erro.message });
    }
  }

  store(req, res) {
    try {
      const imagePath = req.file?.filename;
      const { titulo, descricao, canalID } = req.body;

      if (!titulo || !descricao || !canalID) {
        return res.status(400).json({
          message: "Seu upload está incorreto",
          send: `${titulo}, ${descricao}, ${canalID}`
        })
      }

      const novoVideo = new Video(titulo, descricao, imagePath, parseInt(canalID));

      videosRepository.adicionar(novoVideo);
      res.status(201).json(novoVideo);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar vídeo", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const body = req.body;
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const video = videosRepository.buscarPeloId(id);

      if (!video) {
        return res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }

      videosRepository.atualizar(id, body);
      res.status(200).json(video);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar vídeo", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const video = videosRepository.buscarPeloId(id);
      if (video) {
        videosRepository.excluir(id);
        res.status(200).json({
          mensagem: `Vídeo id:${id} removido com sucesso!`,
          video
        });
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover vídeo", detalhes: erro.message });
    }
  }
}

module.exports = new videosController();
