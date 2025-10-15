import RelatorioService from '../services/relatorio.js';
import chalk from 'chalk';

class RelatorioController {
  async getRelatorio(req, res) {
    try {
      const { tipo, tempo } = req.query;
      const relatorio = await RelatorioService.getRelatorio(tipo, tempo);
      
      console.log(chalk.green(`✅ Relatório solicitado - Tipo: ${tipo}, Tempo: ${tempo}`));
      
      res.json(relatorio);
    } catch (error) {
      console.error(chalk.red(`❌ Erro ao gerar relatório:`), error.message);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }



}

export default new RelatorioController();