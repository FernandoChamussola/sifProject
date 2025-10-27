"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Check, X, Clock } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { usePagamentos } from "@/hooks/usePagamentos"; 

export default function Home() {
  const [pagina, setPagina] = useState(1);
  const { pagamentos, loading, erro } = usePagamentos(pagina);

  const totalPagamentos = pagamentos.reduce((acc, p) => acc + p.valor, 0);
  const ultimosPagamentos = pagamentos.slice(-5).reverse();

  const pendentes = pagamentos.filter(p => p.status === "PENDENTE").length;
  const concluidos = pagamentos.filter(p => p.status === "CONCLUIDO").length;
  const falhados = pagamentos.filter(p => p.status === "FALHOU").length;

  return (
    <ContentLayout title="Home">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-6">

        {/* Top Cards: Total + Status */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Pagamentos */}
          <Card className="p-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl shadow flex flex-col items-center justify-center">
            <Wallet className="text-indigo-600 dark:text-indigo-400 mb-2" size={28} />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pagamentos</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
              {totalPagamentos.toLocaleString()} MZN
            </p>
          </Card>

          {/* Status Cards */}
          <Card className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-700 rounded-2xl shadow flex flex-col items-center justify-center">
            <Clock className="text-yellow-500 mb-2" size={28} />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pendentes</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pendentes}</p>
          </Card>

          <Card className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-2xl shadow flex flex-col items-center justify-center">
            <Check className="text-green-600 mb-2" size={28} />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Concluídos</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{concluidos}</p>
          </Card>

          <Card className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-700 rounded-2xl shadow flex flex-col items-center justify-center">
            <X className="text-red-600 mb-2" size={28} />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Falhados</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{falhados}</p>
          </Card>
        </div>

        {/* Últimos Pagamentos */}
        <Card className="w-full max-w-5xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Últimos Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-gray-700 dark:text-gray-200 text-center">Carregando...</p>
            ) : erro ? (
              <p className="text-red-600 dark:text-red-400 text-center">{erro}</p>
            ) : ultimosPagamentos.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum pagamento encontrado.</p>
            ) : (
              ultimosPagamentos.map(p => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.15 }}
                  className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-3 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {p.taxaNome || p.metodo}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Data: {p.data}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">
                      {p.valor.toLocaleString()} MZN
                    </p>
                    {p.status === "CONCLUIDO" && <Check className="text-green-600" size={16} />}
                    {p.status === "PENDENTE" && <Clock className="text-yellow-500" size={16} />}
                    {p.status === "FALHOU" && <X className="text-red-600" size={16} />}
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

      </div>
    </ContentLayout>
  );
}
