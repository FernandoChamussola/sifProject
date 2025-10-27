import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";

interface Pagamento {
  id: number;
  taxaNome: string;
  valor: number;
  metodo: string;
  data: string;
  status: "CONCLUIDO" | "PENDENTE" | "FALHOU";
  usuarioNome?: string;
  reciboPdfUrl?: string;
}

interface JwtPayload {
  id: number;
  perfil: string;
}

export function usePagamentos(pagina: number) {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    async function fetchPagamentos() {
      try {
        setLoading(true);
        setErro(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setErro("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.id;
        const perfil = decoded.perfil;

        let url = perfil === "ADMIN"
          ? `/pagamentos?page=${pagina}`
          : `/usuarios/${userId}/pagamentos`;

        const { data } = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let lista: Pagamento[] = [];

        if (perfil === "ADMIN" && data.data) {
          lista = data.data.map((p: any) => ({
            id: p.id,
            taxaNome: p.taxa?.nome || "—",
            valor: Number(p.valorPago || p.valor || 0),
            metodo: p.metodo,
            data: new Date(p.data).toLocaleDateString("pt-PT"),
            status:
              p.status === "PAGO"
                ? "CONCLUIDO"
                : p.status === "PENDENTE"
                  ? "PENDENTE"
                  : "FALHOU",
            usuarioNome: p.usuario?.nome,
            reciboPdfUrl: p.reciboPdfUrl,
          }));
          setTotalPaginas(data.totalPages || 1);
        } else if (data.success && data.data?.pagamentos) {
          const pagamentos = data.data.pagamentos;
          lista = pagamentos.map((p: any) => ({
            id: p.id,
            taxaNome: p.taxa?.nome || "—",
            valor: Number(p.valorPago || p.valor || 0),
            metodo: p.metodo,
            data: new Date(p.data).toLocaleDateString("pt-PT"),
            status:
              p.status === "PAGO"
                ? "CONCLUIDO"
                : p.status === "PENDENTE"
                  ? "PENDENTE"
                  : "FALHOU",
            usuarioNome: data.data.nome,
          }));
          setTotalPaginas(1);
        }

        setPagamentos(lista);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        setErro("Não foi possível carregar os pagamentos.");
      } finally {
        setLoading(false);
      }
    }

    fetchPagamentos();
  }, [pagina]);

  return { pagamentos, loading, erro, totalPaginas };
}
