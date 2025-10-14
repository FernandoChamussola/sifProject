import pagamentoService from '../services/pagamentoService.js';
import chalk from 'chalk';

class PagamentoController {

  async getAll(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        orderBy: req.query.orderBy,
        order: req.query.order
      };

      const result = await pagamentoService.getAll(options);
      
      console.log(chalk.green(`✅ Listagem de pagamentos solicitada - Total: ${result.pagination.total}`));
      
      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao listar pagamentos:`), error.message);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await pagamentoService.getById(parseInt(id));
      
      console.log(chalk.green(`✅ Pagamento encontrado - ID: ${id}`));
      
      res.json({
        success: true,
        data: pagamento
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao buscar pagamento:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const pagamento = await pagamentoService.create(req.body);
      
      console.log(chalk.green(`✅ Pagamento criado com sucesso - ID: ${pagamento.id}`));
      
      res.status(201).json({
        success: true,
        data: pagamento,
        message: 'Pagamento criado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao criar pagamento:`), error.message);
      
      // Erro de validação do Prisma
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          message: 'Dados duplicados. Verifique campos únicos.'
        });
      }

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await pagamentoService.update(parseInt(id), req.body);
      
      console.log(chalk.green(`✅ Pagamento atualizado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        data: pagamento,
        message: 'Pagamento atualizado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao atualizar pagamento:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await pagamentoService.delete(parseInt(id));
      
      console.log(chalk.green(`✅ Pagamento deletado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        message: result.message
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao deletar pagamento:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  
}

export default new PagamentoController();