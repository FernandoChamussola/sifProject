import express  from'express';
import usuarioRoutes from './usuarioRoutes.js';
import taxaRoutes from './taxaRoutes.js';
import pagamentoRoutes from './pagamentoRoutes.js';
import auditoriaRoutes from './auditoriaRoutes.js';
import autRoute from './auth.js';
import relatorioRoutes from './relatorio.js';
import dashRoutes from './dash.js';
import  {authenticateToken}  from '../middleware/autenticateToken.js';

const router = express.Router();

// Rotas dos modelos
router.use('/auth', autRoute);
router.use('/usuarios',authenticateToken, usuarioRoutes);
router.use('/taxas',authenticateToken, taxaRoutes);
router.use('/pagamentos',authenticateToken, pagamentoRoutes);
router.use('/auditorias',authenticateToken, auditoriaRoutes);
router.use('/relatorios',authenticateToken, relatorioRoutes);
router.use('/dashboard',authenticateToken, dashRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'API funcionando corretamente' 
  });
});

export default router;