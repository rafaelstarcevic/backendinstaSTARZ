import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão do ambiente.

// Função assíncrona para obter todos os posts.
export async function getTodosPosts() { 
  
    const db = conexao.db("rafael-starcevic"); // Seleciona o banco de dados "rafael-starcevic".
  
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
  
    return colecao.find().toArray(); // Retorna um array com todos os documentos da coleção.
}

export async function criarPost(novoPost) { // Função assíncrona para criar um novo post.
    const db = conexao.db("rafael-starcevic"); // Seleciona o banco de dados "rafael-starcevic".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.insertOne(novoPost); // Insere um novo documento na coleção com os dados do novo post.
}

export async function atualizarPost(id, novoPost) { // Função assíncrona para criar um novo post.
    const db = conexao.db("rafael-starcevic"); // Seleciona o banco de dados "rafael-starcevic".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
