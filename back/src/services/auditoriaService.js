import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AuditoriaService {
  
  async getAll(options = {}) {
    const { page = 1, limit = 10, orderBy = 'id', order = 'asc' } = options;
    
    const skip = (page - 1) * limit;
    
    const auditorias = await prisma.auditoria.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: {
        [orderBy]: order
      },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    const total = await prisma.auditoria.count();
    
    return {
      data: auditorias,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id) {
    const auditoria = await prisma.auditoria.findUnique({
     where: { id: parseInt(id) },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    if (!auditoria) {
      throw new Error('Auditoria não encontrado');
    }

    return auditoria;
  }

  async create(data) {
    // Validação básica
        if (!data.acao) {
      throw new Error('Campo acao é obrigatório');
    }

    if (!data.entidade) {
      throw new Error('Campo entidade é obrigatório');
    }

    if (!data.detalhes) {
      throw new Error('Campo detalhes é obrigatório');
    }

    const auditoria = await prisma.auditoria.create({
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return auditoria;
  }

  async update(id, data) {
    // Verificar se existe
    await this.getById(id);

    // Validação básica
    // Validações personalizadas aqui

    const auditoria = await prisma.auditoria.update({
      where: { id: parseInt(id) },
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return auditoria;
  }

  async delete(id) {
    // Verificar se existe
    await this.getById(id);

    await prisma.auditoria.delete({
      where: { id: parseInt(id) }
    });

    return { message: 'Auditoria deletado com sucesso' };
  }


}

export default new AuditoriaService();