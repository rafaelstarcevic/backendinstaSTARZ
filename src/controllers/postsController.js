import { getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Função assíncrona para listar todos os posts.
    const posts = await getTodosPosts(); // Obtém todos os posts de forma assíncrona.
    // Retorna os posts em formato JSON com status 200 (sucesso).
    res.status(200).json(posts); 
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição.
    try {
      const postCriado = await criarPost(novoPost); // Cria o novo post de forma assíncrona.
      res.status(200).json(postCriado); // Retorna o post criado em formato JSON com status 200 (sucesso).
  } catch (erro) {
      console.error(erro.message); // Imprime a mensagem de erro no console.
      res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna um erro genérico com status 500 (erro interno do servidor).
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "", // Descrição do post (pode ser preenchida posteriormente).
    imgUrl: req.file.originalname, // Nome original do arquivo da imagem.
    alt: "" // Texto alternativo para a imagem (pode ser preenchido posteriormente).
  };

  try {
      const postCriado = await criarPost(novoPost); // Cria o novo post com a imagem.
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Gera o novo nome do arquivo com o ID do post.
      fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo para o novo local.
      res.status(200).json(postCriado); // Retorna o post criado em formato JSON com status 200 (sucesso).
  } catch (erro) {
      console.error(erro.message); // Imprime a mensagem de erro no console.
      res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna um erro genérico com status 500 (erro interno do servidor).
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id; // Obtém os dados do novo post do corpo da requisição.
  const urlImagem = `http://localhost:3000/${id}.png`
  try {
      const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
      const descricao = await gerarDescricaoComGemini(imageBuffer)

      const post = {
        imgUrl: urlImagem,
        descricao: descricao,
        alt: req.body.alt
    }

      const postCriado = await atualizarPost(id, post); // Cria o novo post de forma assíncrona.
      res.status(200).json(postCriado); // Retorna o post criado em formato JSON com status 200 (sucesso).
  } catch (erro) {
      console.error(erro.message); // Imprime a mensagem de erro no console.
      res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna um erro genérico com status 500 (erro interno do servidor).
  }
}
