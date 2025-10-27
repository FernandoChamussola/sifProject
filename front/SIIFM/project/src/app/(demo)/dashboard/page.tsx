"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "@/lib/api"; // import da instância axios

// Função para decodificar JWT
function parseJwt(token: string | null) {
  if (!token) return null;
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

interface Usuario {
  id: number;
  nome: string;
  telefone: string;
  morada: string;
  email: string;
  perfil: string;
}

interface Taxa {
  id: number;
  nome: string;
  valor: string;
  periodicidade: string;
}

interface Pagamento {
  id: number;
  valorPago: string;
  metodo: string;
  data: string;
  status: string;
  usuario: Usuario;
  taxa: Taxa;
}

interface DashboardData {
  totalUsuarios: number;
  totalPagamentos: number;
  totalArrecadado: number;
  usuariosAtivos: number;
  atividadesRecentes: {
    ultimosPagamentos: Pagamento[];
    ultimasTaxas: Taxa[];
  };
}

export default function DashboardAdmin() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [usuario, setUsuario] = useState<{ perfil: string } | null>(null);

  // Pega usuário logado do token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    setUsuario(decoded);
  }, []);

  // // Redireciona ou oculta dashboard se não for admin
  // if (!usuario) return <p>Carregando...</p>;
  // if (usuario.perfil !== "ADMIN") {
  //   return (
  //     <ContentLayout title="Dashboard">
  //       <p className="text-center mt-20">Acesso negado</p>
  //     </ContentLayout>
  //   );
  // }

  // Fetch dashboard
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data } = await api.get<DashboardData>("/dashboard");
        setDashboard(data);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }
    fetchDashboard();
  }, []);

  if (!dashboard) return <p>Carregando...</p>;

  const pagamentos = dashboard.atividadesRecentes.ultimosPagamentos;

  const arrecadacaoData = pagamentos.map((p) => ({
    data: new Date(p.data).toLocaleDateString(),
    valorPago: Number(p.valorPago),
  }));

  const statusCount: Record<string, number> = {};
  pagamentos.forEach((p) => {
    statusCount[p.status] = (statusCount[p.status] || 0) + 1;
  });
  const statusData = Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <ContentLayout title="Dashboard">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-6">
        {/* Estatísticas Gerais */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-indigo-200 dark:border-indigo-700">
            <CardTitle>Total Usuários</CardTitle>
            <CardContent className="text-2xl font-bold">
              {dashboard.totalUsuarios}
            </CardContent>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-indigo-200 dark:border-indigo-700">
            <CardTitle>Pagamentos</CardTitle>
            <CardContent className="text-2xl font-bold">
              {dashboard.totalPagamentos}
            </CardContent>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-indigo-200 dark:border-indigo-700">
            <CardTitle>Total Arrecadado</CardTitle>
            <CardContent className="text-2xl font-bold">
              {dashboard.totalArrecadado.toLocaleString()} MZN
            </CardContent>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-indigo-200 dark:border-indigo-700">
            <CardTitle>Usuários Ativos</CardTitle>
            <CardContent className="text-2xl font-bold">
              {dashboard.usuariosAtivos}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700">
            <CardHeader className="mb-4">
              <CardTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Arrecadação Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={arrecadacaoData}>
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valorPago" fill="#4f46e5" name="Valor Pago" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700">
            <CardHeader className="mb-4">
              <CardTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Pagamentos por Status
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#16a34a" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Últimos Pagamentos */}
        <Card className="w-full max-w-6xl p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Últimos Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pagamentos.length === 0 && (
              <p className="text-center text-gray-700 dark:text-gray-200">
                Nenhum pagamento recente.
              </p>
            )}
            {pagamentos.map((p) => (
              <div
                key={p.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {p.usuario.nome}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100">{p.taxa.nome}</p>
                  <p className="text-gray-800 dark:text-gray-100">{p.metodo}</p>
                  <p className="text-gray-800 dark:text-gray-100">
                    {new Date(p.data).toLocaleString()}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold">
                    {Number(p.valorPago).toLocaleString()} MZN
                  </p>
                  <p
                    className={`font-semibold ${
                      p.status === "PAGO" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {p.status}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
