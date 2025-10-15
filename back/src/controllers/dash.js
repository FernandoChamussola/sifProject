import RelatorioService from '../services/relatorio.js';
import chalk from 'chalk';

class DashController {
  async getDashData(req, res) {
    try {
      const dashData = await RelatorioService.getDashboardData();
      
      console.log(chalk.green(`✅ Dados do dashboard solicitados`));
      
      res.json(dashData);
    } catch (error) {
      console.error(chalk.red(`❌ Erro ao buscar dados do dashboard:`), error.message);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

export default new DashController();