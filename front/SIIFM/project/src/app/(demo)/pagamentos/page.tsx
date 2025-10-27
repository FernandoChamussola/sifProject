


"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Clock,
  Wallet,
  FileCheck,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import api from "@/lib/api";
import { ContentLayout } from "@/components/admin-panel/content-layout";


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
  perfil: "ADMIN" | "COMERCIANTE" | "CIDADÃO";
  exp: number;
  iat: number;
}

export default function HistoricoPagamento() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    async function fetchPagamentos() {
      try {
        setLoading(true);
        setErro(null);

        // 1️⃣ Obter token do localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          setErro("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        // 2️⃣ Decodificar token para obter o ID e perfil
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.id;
        const perfil = decoded.perfil;

        // 3️⃣ Montar URL da requisição
        let url = "";
        if (perfil === "ADMIN") {
          url = `/pagamentos?page=${pagina}`;
        } else {
          url = `/usuarios/${userId}/pagamentos`;
        }

        // 4️⃣ Fazer requisição
        const { data } = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let lista: Pagamento[] = [];

        if (perfil === "ADMIN" && data.data) {
          // Admin (resposta paginada)
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
          // Usuário comum
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
      } catch (err: any) {
        console.error("Erro ao buscar histórico:", err);
        setErro("Não foi possível carregar os pagamentos.");
      } finally {
        setLoading(false);
      }
    }

    fetchPagamentos();
  }, [pagina]);

  return (
    <ContentLayout title="Histórico de Pagamentos">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-5xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <CreditCard size={26} /> Pagamentos Recentes
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading && (
              <p className="text-gray-700 dark:text-gray-200 text-center">
                Carregando pagamentos...
              </p>
            )}
            {erro && (
              <p className="text-red-600 dark:text-red-400 text-center">
                {erro}
              </p>
            )}
            {!loading && pagamentos.length === 0 && !erro && (
              <p className="text-gray-700 dark:text-gray-200 text-center">
                Nenhum pagamento encontrado.
              </p>
            )}

            {pagamentos.map((p) => (
              <div
                key={p.id}
                className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
              >
                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <Wallet size={16} /> {p.taxaNome}
                  </p>
                  <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <Clock size={16} /> {p.data}
                  </p>
                  <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <CreditCard size={16} /> {p.metodo}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold">
                    {p.valor.toLocaleString()} MZN
                  </p>

                  {p.usuarioNome && (
                    <p className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium">
                      <Users size={16} /> {p.usuarioNome}
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
                  <div className="flex items-center gap-1">
                    {p.status === "CONCLUIDO" && (
                      <CheckCircle className="text-green-600" />
                    )}
                    {p.status === "PENDENTE" && (
                      <Clock className="text-yellow-500" />
                    )}
                    {p.status === "FALHOU" && (
                      <XCircle className="text-red-600" />
                    )}
                    <span className="text-gray-800 dark:text-gray-100 font-semibold">
                      {p.status}
                    </span>
                  </div>

                  {p.reciboPdfUrl && (
                    <a href={p.reciboPdfUrl} target="_blank" rel="noreferrer">
                      <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2">
                        <FileCheck size={16} /> Abrir Recibo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}

            {totalPaginas > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  disabled={pagina <= 1}
                  onClick={() => setPagina(pagina - 1)}
                  variant="outline"
                >
                  Anterior
                </Button>
                <span className="text-gray-700 dark:text-gray-200">
                  Página {pagina} de {totalPaginas}
                </span>
                <Button
                  disabled={pagina >= totalPaginas}
                  onClick={() => setPagina(pagina + 1)}
                  variant="outline"
                >
                  Próxima
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
