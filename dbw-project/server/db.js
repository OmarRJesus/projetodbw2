// db.js
import mongoose from 'mongoose';

// Função para conectar ao banco de dados
export async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://projetoDBW:projetodbw123@cluster0.kele9xz.mongodb.net/DBW', {
      dbName: 'DBW',
      serverSelectionTimeoutMS: 30000, // Aumenta o tempo limite para conexão
    });
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra a aplicação se falhar a conexão
  }
}
