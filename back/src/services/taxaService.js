import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaxaService {
  
  async getAll(options = {}) {
    const { page = 1, limit = 10, orderBy = 'id', order = 'asc' } = options;
    
    const skip = (page - 1) * limit;
    
    const taxas = await prisma.taxa.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: {
        [orderBy]: order
      },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    const total = await prisma.taxa.count();
    
    return {
      data: taxas,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id) {
    const taxa = await prisma.taxa.findUnique({
     where: { id: parseInt(id) },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    if (!taxa) {
      throw new Error('Taxa não encontrado');
    }

    return taxa;
  }

  async create(data) {
    // Validação básica
        if (!data.nome) {
      throw new Error('Campo nome é obrigatório');
    }

    if (!data.valor) {
      throw new Error('Campo valor é obrigatório');
    }

    if (!data.periodicidade) {
      throw new Error('Campo periodicidade é obrigatório');
    }

    const taxa = await prisma.taxa.create({
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return taxa;
  }

  async update(id, data) {
    // Verificar se existe
    await this.getById(id);

    // Validação básica
    // Validações personalizadas aqui

    const taxa = await prisma.taxa.update({
      where: { id: parseInt(id) },
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return taxa;
  }

  async delete(id) {
    // Verificar se existe
    await this.getById(id);

    await prisma.taxa.update({
      where: { id: parseInt(id) },
      data: {
        ativo: false
      }
    });

    return { message: 'Taxa desativada com sucesso' };
  }
  
  async reactivate(id) {
    // Verificar se existe
    await this.getById(id);

    await prisma.taxa.update({
      where: { id: parseInt(id) },
      data: {
        ativo: true
      }
    });

    return { message: 'Taxa reativada com sucesso' };
  }

}

export default new TaxaService();