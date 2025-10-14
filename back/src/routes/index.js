import express  from'express';
import usuarioRoutes from './usuarioRoutes.js';
import taxaRoutes from './taxaRoutes.js';
import pagamentoRoutes from './pagamentoRoutes.js';
import auditoriaRoutes from './auditoriaRoutes.js';
import autRoute from './auth.js';

const router = express.Router();

// Rotas dos modelos
router.use('/auth', autRoute);
router.use('/usuarios', usuarioRoutes);
router.use('/taxas', taxaRoutes);
router.use('/pagamentos', pagamentoRoutes);
router.use('/auditorias', auditoriaRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'API funcionando corretamente' 
  });
});

export default router;