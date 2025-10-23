import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UsuarioService {
  
  async getAll(options = {}) {
    const { page = 1, limit = 10, orderBy = 'id', order = 'asc' } = options;
    
    const skip = (page - 1) * limit;
    
    const usuarios = await prisma.usuario.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: {
        [orderBy]: order
      },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    const total = await prisma.usuario.count();
    
    return {
      data: usuarios,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getById(id) {
    const usuario = await prisma.usuario.findUnique({
     where: { id: parseInt(id) },
      include: {
        // Adicione relações aqui se necessário
      }
    });

    if (!usuario) {
      throw new Error('Usuario não encontrado');
    }

    return usuario;
  }

  async create(data) {
    // Validação básica
    if (!data.nome) {
      throw new Error('Campo nome é obrigatório');
    }

    if (!data.email) {
      throw new Error('Campo email é obrigatório');
    }

    if (!data.telefone) {
      throw new Error('Campo telefone é obrigatório');
    }

    if (!data.senhaHash) {
      throw new Error('Campo senhaHash é obrigatório');
    }

    if (!data.perfil) {
      throw new Error('Campo perfil é obrigatório');
    }

    const usuario = await prisma.usuario.create({
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return usuario;
  }

  async update(id, data) {
    // Verificar se existe
    await this.getById(id);

    // Validação básica
    // Validações personalizadas aqui

    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data,
      include: {
        // Adicione relações aqui se necessário
      }
    });

    return usuario;
  }

  async delete(id) {
    // Verificar se existe
    await this.getById(id);

    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });

    return { message: 'Usuario deletado com sucesso' };
  }

  //retorna o usuario seus pagemtos feitos as taxas associadas
  async getUsuarioWithPagamentos(id) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      include: {
        pagamentos: {
          include: {
            taxa: true // Inclui os detalhes da taxa associada a cada pagamento
          }
        }
      }
    });

    return usuario;
  }


}

export default new UsuarioService();