import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RelatorioService {
  async getRelatorio(tipo, tempo) {
    const now = new Date();
    let inicio, fim;

    if (tipo === "arrecadacao") {
      if (tempo === "mensal") {
        inicio = new Date(now.getFullYear(), now.getMonth(), 1);
        fim = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      } else if (tempo === "semanal") {
        const diaSemana = now.getDay();
        inicio = new Date(now);
        inicio.setDate(now.getDate() - diaSemana);
        fim = new Date(inicio);
        fim.setDate(inicio.getDate() + 6);
      } else {
        // Geral: últimos 12 meses
        inicio = new Date(now.getFullYear(), now.getMonth() - 12, 1);
        fim = now;
      }

      const pagamentos = await prisma.pagamento.findMany({
        where: {
          status: "PAGO",
          data: {
            gte: inicio,
            lte: fim,
          },
        },
        include: {
          usuario: true,
          taxa: true,
        },
      });

      const totalArrecadado = pagamentos.reduce(
        (soma, p) => soma + Number(p.valorPago),
        0
      );

      return {
        tipo: "arrecadacao",
        periodo: tempo,
        inicio,
        fim,
        totalArrecadado,
        quantidadePagamentos: pagamentos.length,
        pagamentos,
      };
    } else if (tipo === "usuariosAtivos") {
      // Considera usuários com pelo menos um pagamento PAGO
      const usuarios = await prisma.usuario.findMany({
        where: {
          pagamentos: {
            some: {
              status: "PAGO",
            },
          },
        },
        include: {
          pagamentos: true,
        },
      });

      return {
        tipo: "usuariosAtivos",
        total: usuarios.length,
        usuarios,
      };
    } else {
      throw new Error("Tipo de relatório inválido");
    }
  }

 async  getDashboardData() {
    const [
        totalUsuarios,
        totalPagamentos,
        totalArrecadado,
        usuariosAtivos,
        ultimosPagamentos,
        ultimasTaxas
    ] = await Promise.all([
        prisma.usuario.count(),
        prisma.pagamento.count(),
        prisma.pagamento.aggregate({
        _sum: { valorPago: true },
        where: { status: 'PAGO' }
        }),
        prisma.usuario.count({
        where: {
            pagamentos: {
            some: { status: 'PAGO' }
            }
        }
        }),
        prisma.pagamento.findMany({
        where: { status: 'PAGO' },
        orderBy: { data: 'desc' },
        take: 3,
        include: {
            usuario: true,
            taxa: true
        }
        }),
        prisma.taxa.findMany({
        orderBy: { id: 'desc' }, // ou use updatedAt se tiver campo de edição
        take: 3
        })
    ])

    return {
        totalUsuarios,
        totalPagamentos,
        totalArrecadado: Number(totalArrecadado._sum.valorPago || 0),
        usuariosAtivos,
        atividadesRecentes: {
        ultimosPagamentos,
        ultimasTaxas
        }
    }
    }

}

export default new RelatorioService();