// App.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './server/db.js'; // Importa a função de conexão

// Cria a aplicação Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conecta ao banco de dados antes de iniciar o servidor
await connectDB();

// Agora podemos importar as rotas após a conexão com o banco
import appRoutes from './server/routes/appRoutes.js';
app.use('/api', appRoutes);

// Define a porta do servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
