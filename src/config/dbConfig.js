import { MongoClient } from 'mongodb'; // Importa o cliente MongoDB para interagir com o banco de dados.

export default async function conectarAoBanco(stringConexao) { // Função assíncrona para conectar ao banco de dados.
  let mongoClient; // Declara uma variável para armazenar o cliente MongoDB.

  try { // Bloco try para capturar possíveis erros durante a conexão.
      mongoClient = new MongoClient(stringConexao); // Cria uma nova instância do cliente MongoDB com a string de conexão fornecida.
      console.log('Conectando ao cluster do banco de dados...'); // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida.
      await mongoClient.connect(); // Conecta ao banco de dados de forma assíncrona.
      console.log('Conectado ao MongoDB Atlas com sucesso!'); // Imprime uma mensagem de sucesso após a conexão.
    
      return mongoClient; // Retorna o cliente MongoDB conectado para uso posterior.
  } catch (erro) { // Bloco catch para tratar erros.
      console.error('Falha na conexão com o banco!', erro); // Imprime uma mensagem de erro no console, incluindo o erro detalhado.
      process.exit(); // Encerra a aplicação em caso de falha na conexão.
  }
}