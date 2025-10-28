import express from 'express';
import cors from 'cors';
import indexRoutes from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
//aceitar requisições de outras origens
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', indexRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})