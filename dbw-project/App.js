// server/app.js
import express from 'express';
import cors from 'cors';
import appRoutes from './routes/appRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', appRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
