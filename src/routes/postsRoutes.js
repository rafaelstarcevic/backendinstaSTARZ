import express from "express";


import multer from "multer";
import { listarPosts, uploadImagem, atualizarNovoPost, postarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'.
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado.
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Configura o multer com o armazenamento definido em 'storage'.
const routes = (app) => {
  // Função que configura as rotas da API.
  app.use(express.json()); // Habilita o parseamento de dados JSON na requisição.
  app.use(cors(corsOptions));
  app.get("/posts", listarPosts); // Rota GET para listar todos os posts (tratada pela função 'listarPosts').
  app.post("/posts", postarNovoPost); // Rota POST para criar um novo post (tratada pela função 'postarNovoPost').
  app.post("/uploads", upload.single("imagem"), uploadImagem); 
  // Rota POST para upload de imagem e criação de post (tratada pela função 'uploadImagem').
  app.put("/uploads/:id", atualizarNovoPost)
};

export default routes; // Exporta a função 'routes' para ser utilizada no arquivo principal da API.