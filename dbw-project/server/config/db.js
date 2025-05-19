import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://projetoDBW:projetodbw123@cluster0.kele9xz.mongodb.net/DBW', {
      dbName: 'DBW',
      serverSelectionTimeoutMS: 30000,
    });
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1); 
  }
}
