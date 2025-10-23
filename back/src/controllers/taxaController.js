import taxaService from '../services/taxaService.js';
import chalk from 'chalk';

class TaxaController {

  async getAll(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        orderBy: req.query.orderBy,
        order: req.query.order
      };

      const result = await taxaService.getAll(options);
      
      console.log(chalk.green(`✅ Listagem de taxas solicitada - Total: ${result.pagination.total}`));
      
      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao listar taxas:`), error.message);
      
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
      const taxa = await taxaService.getById(parseInt(id));
      
      console.log(chalk.green(`✅ Taxa encontrado - ID: ${id}`));
      
      res.json({
        success: true,
        data: taxa
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao buscar taxa:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const taxa = await taxaService.create(req.body);
      
      console.log(chalk.green(`✅ Taxa criado com sucesso - ID: ${taxa.id}`));
      
      res.status(201).json({
        success: true,
        data: taxa,
        message: 'Taxa criado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao criar taxa:`), error.message);
      
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
      const taxa = await taxaService.update(parseInt(id), req.body);
      
      console.log(chalk.green(`✅ Taxa atualizado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        data: taxa,
        message: 'Taxa atualizado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao atualizar taxa:`), error.message);
      
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
      const result = await taxaService.delete(parseInt(id));
      
      console.log(chalk.green(`✅ Taxa deletado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        message: result.message
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao deletar taxa:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  
}

export default new TaxaController();