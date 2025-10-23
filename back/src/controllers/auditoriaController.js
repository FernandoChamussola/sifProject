import auditoriaService from '../services/auditoriaService.js';
import chalk from 'chalk';

class AuditoriaController {

  async getAll(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        orderBy: req.query.orderBy,
        order: req.query.order
      };

      const result = await auditoriaService.getAll(options);
      
      console.log(chalk.green(`✅ Listagem de auditorias solicitada - Total: ${result.pagination.total}`));
      
      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao listar auditorias:`), error.message);
      
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
      const auditoria = await auditoriaService.getById(parseInt(id));
      
      console.log(chalk.green(`✅ Auditoria encontrado - ID: ${id}`));
      
      res.json({
        success: true,
        data: auditoria
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao buscar auditoria:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const auditoria = await auditoriaService.create(req.body);
      
      console.log(chalk.green(`✅ Auditoria criado com sucesso - ID: ${auditoria.id}`));
      
      res.status(201).json({
        success: true,
        data: auditoria,
        message: 'Auditoria criado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao criar auditoria:`), error.message);
      
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
      const auditoria = await auditoriaService.update(parseInt(id), req.body);
      
      console.log(chalk.green(`✅ Auditoria atualizado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        data: auditoria,
        message: 'Auditoria atualizado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao atualizar auditoria:`), error.message);
      
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
      const result = await auditoriaService.delete(parseInt(id));
      
      console.log(chalk.green(`✅ Auditoria deletado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        message: result.message
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao deletar auditoria:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  
}

export default new AuditoriaController();