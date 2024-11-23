import express from "express"; // Importa o framework Express para criar a aplicação web.
import routes from "./src/routes/postsRoutes.js"; // Importa o módulo de rotas para os posts, definindo as URLs e os handlers.

const app = express(); // Cria uma nova instância do Express, iniciando a aplicação.
app.use(express.static("uploads"))
routes(app); // Passa a instância da aplicação para o módulo de rotas, configurando as rotas.

app.listen(3000, () => { // Inicia o servidor na porta 3000.
    console.log("Servidor escutando..."); // Mensagem de log para indicar que o servidor está ativo.
});



