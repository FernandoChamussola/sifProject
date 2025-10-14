import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PagamentoService {
  
  async getAll(options = {}) {
    const { page = 1, limit = 10, orderBy = 'id', order = 'asc' } = options;
    
    const skip = (page - 1) * limit;
    
    const pagamentos = await prisma.pagamento.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: {
        [orderBy]: order
      },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    const total = await prisma.pagamento.count();
    
    return {
      data: pagamentos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id) {
    const pagamento = await prisma.pagamento.findUnique({
     where: { id: parseInt(id) },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    if (!pagamento) {
      throw new Error('Pagamento não encontrado');
    }

    return pagamento;
  }

  async create(data) {
    // Validação básica
        if (!data.valorPago) {
      throw new Error('Campo valorPago é obrigatório');
    }

    if (!data.metodo) {
      throw new Error('Campo metodo é obrigatório');
    }



    if (!data.status) {
      throw new Error('Campo status é obrigatório');
    }

    const pagamento = await prisma.pagamento.create({
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return pagamento;
  }

  async update(id, data) {
    // Verificar se existe
    await this.getById(id);

    // Validação básica
    // Validações personalizadas aqui

    const pagamento = await prisma.pagamento.update({
      where: { id: parseInt(id) },
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return pagamento;
  }

  async delete(id) {
    // Verificar se existe
    await this.getById(id);

    await prisma.pagamento.delete({
      where: { id: parseInt(id) }
    });

    return { message: 'Pagamento deletado com sucesso' };
  }


}

export default new PagamentoService();