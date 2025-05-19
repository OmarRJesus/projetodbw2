import express from 'express';
import cors from 'cors';
import { connectDB } from './server/config/db.js';


const app = express();


app.use(cors());
app.use(express.json());


await connectDB();


import appRoutes from './server/routes/appRoutes.js';
app.use('/api', appRoutes);

// Porta do servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
