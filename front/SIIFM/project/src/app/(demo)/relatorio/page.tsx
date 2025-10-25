// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Calendar, FileCheck, Users, DollarSign } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

// interface Usuario {
//   id: number;
//   nome: string;
//   telefone: string;
//   morada: string;
//   email: string;
//   perfil: string;
// }

// interface Taxa {
//   id: number;
//   nome: string;
//   valor: string;
//   periodicidade: string;
// }

// interface Pagamento {
//   id: number;
//   usuarioId: number;
//   taxaId: number;
//   valorPago: string;
//   metodo: string;
//   data: string;
//   status: string;
//   usuario: Usuario;
//   taxa: Taxa;
// }

// interface RelatorioResponse {
//   totalUsuarios: number;
//   totalPagamentos: number;
//   totalArrecadado: number;
//   usuariosAtivos: number;
//   atividadesRecentes: {
//     ultimosPagamentos: Pagamento[];
//     ultimasTaxas: Taxa[];
//     usuariosAtivos?: Usuario[];
//   };
// }

// const mock: RelatorioResponse = {
//   totalUsuarios: 1,
//   totalPagamentos: 6,
//   totalArrecadado: 4300,
//   usuariosAtivos: 1,
//   atividadesRecentes: {
//     ultimosPagamentos: [
//       {
//         id: 6,
//         usuarioId: 1,
//         taxaId: 1,
//         valorPago: "750",
//         metodo: "M-PESA",
//         data: "2025-10-15T10:16:48.534Z",
//         status: "PAGO",
//         usuario: {
//           id: 1,
//           nome: "Fernando Silva",
//           telefone: "+258841234567",
//           morada: "Av. Eduardo Mondlane, Beira",
//           email: "fernandosilva@example.com",
//           perfil: "ADMIN",
//         },
//         taxa: {
//           id: 1,
//           nome: "Taxa por Actividade Económica",
//           valor: "1500",
//           periodicidade: "MENSAL",
//         },
//       },
//       {
//         id: 5,
//         usuarioId: 1,
//         taxaId: 1,
//         valorPago: "750",
//         metodo: "M-PESA",
//         data: "2025-10-15T10:14:37.187Z",
//         status: "PAGO",
//         usuario: {
//           id: 1,
//           nome: "Fernando Silva",
//           telefone: "+258841234567",
//           morada: "Av. Eduardo Mondlane, Beira",
//           email: "fernandosilva@example.com",
//           perfil: "ADMIN",
//         },
//         taxa: {
//           id: 1,
//           nome: "Taxa por Actividade Económica",
//           valor: "1500",
//           periodicidade: "MENSAL",
//         },
//       },
//     ],
//     ultimasTaxas: [
//       {
//         id: 1,
//         nome: "Taxa por Actividade Económica",
//         valor: "1500",
//         periodicidade: "MENSAL",
//       },
//     ],
//     usuariosAtivos: [
//       {
//         id: 1,
//         nome: "Fernando Silva",
//         telefone: "+258841234567",
//         morada: "Av. Eduardo Mondlane, Beira",
//         email: "fernandosilva@example.com",
//         perfil: "ADMIN",
//       },
//     ],
//   },
// };

// export default function RelatoriosAdmin() {
//   const [tipo, setTipo] = useState<"arrecadacao" | "usuarioAtivos">("arrecadacao");
//   const [tempo, setTempo] = useState<"diaria" | "semanal" | "mensal">("semanal");
//   const [relatorio, setRelatorio] = useState<RelatorioResponse | null>(null);

  
//   useEffect(() => {
//     async function fetchRelatorio() {
//       try {
//         const res = await fetch(`/api/relatorios?tipo=${tipo}&tempo=${tempo}`);
//         const data: RelatorioResponse = await res.json();
//         setRelatorio(data || mock); // usa mock se não houver dados
//       } catch (err) {
//         console.error("Erro ao buscar relatório", err);
//         setRelatorio(mock);
//       }
//     }
//     fetchRelatorio();
//   }, [tipo, tempo]);

//   // Seleciona a lista a exibir dependendo do tipo
//   let listaExibicao =
//     tipo === "arrecadacao"
//       ? relatorio?.atividadesRecentes?.ultimosPagamentos ?? mock.atividadesRecentes.ultimosPagamentos
//       : relatorio?.atividadesRecentes?.usuariosAtivos ?? mock.atividadesRecentes.usuariosAtivos;

//   return (
//     <ContentLayout title="Relatórios">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-6">
//         {/* Filtros */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 flex flex-col md:flex-row gap-6 items-end">
//           <div>
//             <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Tipo</label>
//             <Select onValueChange={(v) => setTipo(v as "arrecadacao" | "usuarioAtivos")} value={tipo}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Tipo" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="arrecadacao">Arrecadação</SelectItem>
//                 <SelectItem value="usuarioAtivos">Usuários Ativos</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Período</label>
//             <Select onValueChange={(v) => setTempo(v as "diaria" | "semanal" | "mensal")} value={tempo}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Período" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="diaria">Diária</SelectItem>
//                 <SelectItem value="semanal">Semanal</SelectItem>
//                 <SelectItem value="mensal">Mensal</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </Card>

//         {/* Totais */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 flex flex-wrap justify-between gap-6">
//           <div className="flex items-center gap-2">
//             <DollarSign /> Total Arrecadado: {relatorio?.totalArrecadado ?? mock.totalArrecadado} MZN
//           </div>
//           <div className="flex items-center gap-2">
//             <Users /> Total Usuários: {relatorio?.totalUsuarios ?? mock.totalUsuarios}
//           </div>
//           <div className="flex items-center gap-2">
//             Usuários Ativos: {relatorio?.usuariosAtivos ?? mock.usuariosAtivos}
//           </div>
//           <div className="flex items-center gap-2">
//             Total Pagamentos: {relatorio?.totalPagamentos ?? mock.totalPagamentos}
//           </div>
//         </Card>

//         {/* Lista de exibição */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//               {tipo === "arrecadacao" ? "Últimos Pagamentos" : "Usuários Ativos"}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {listaExibicao.length === 0 && (
//               <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum dado encontrado.</p>
//             )}

//             {tipo === "arrecadacao" &&
//               listaExibicao.map((p: Pagamento) => (
//                 <div
//                   key={p.id}
//                   className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
//                 >
//                   <div className="space-y-1">
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{p.taxa.nome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{p.metodo}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{new Date(p.data).toLocaleString()}</p>
//                     <p className="text-gray-800 dark:text-gray-100 font-bold">{Number(p.valorPago).toLocaleString()} MZN</p>
//                     <p
//                       className={`font-semibold ${
//                         p.status === "PAGO" ? "text-green-600" : p.status === "PENDENTE" ? "text-yellow-500" : "text-red-600"
//                       }`}
//                     >
//                       {p.status}
//                     </p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-gray-700 dark:text-gray-200 font-medium">Usuário: {p.usuario.nome}</p>
//                     <p className="text-gray-700 dark:text-gray-200">{p.usuario.email}</p>
//                   </div>
//                 </div>
//               ))}

//             {tipo === "usuarioAtivos" &&
//               listaExibicao.map((u: Usuario) => (
//                 <div
//                   key={u.id}
//                   className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
//                 >
//                   <p className="text-gray-800 dark:text-gray-100 font-semibold">{u.nome}</p>
//                   <p className="text-gray-700 dark:text-gray-200">{u.email}</p>
//                   <p className="text-gray-700 dark:text-gray-200">{u.telefone}</p>
//                   <p className="text-gray-700 dark:text-gray-200">{u.perfil}</p>
//                 </div>
//               ))}
//           </CardContent>
//         </Card>
//       </div>
//     </ContentLayout>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar, FileCheck, Users, DollarSign } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import api from "@/lib/api"; // instância Axios configurada com baseURL e headers

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
  usuarioId: number;
  taxaId: number;
  valorPago: string;
  metodo: string;
  data: string;
  status: string;
  usuario: Usuario;
  taxa: Taxa;
}

interface RelatorioResponse {
  totalUsuarios: number;
  totalPagamentos: number;
  totalArrecadado: number;
  usuariosAtivos: number;
  atividadesRecentes: {
    ultimosPagamentos: Pagamento[];
    ultimasTaxas: Taxa[];
    usuariosAtivos?: Usuario[];
  };
}

export default function RelatoriosAdmin() {
  const [tipo, setTipo] = useState<"arrecadacao" | "usuarioAtivos">("arrecadacao");
  const [tempo, setTempo] = useState<"diaria" | "semanal" | "mensal">("semanal");
  const [relatorio, setRelatorio] = useState<RelatorioResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRelatorio() {
      try {
        setLoading(true);
        setErro(null);

        const { data } = await api.get<RelatorioResponse>(
          `/relatorios?tipo=${tipo}&tempo=${tempo}`
        );

        setRelatorio(data);
      } catch (err: any) {
        console.error("Erro ao buscar relatório:", err);
        setErro("Não foi possível carregar o relatório.");
      } finally {
        setLoading(false);
      }
    }

    fetchRelatorio();
  }, [tipo, tempo]);

  const listaExibicao =
    tipo === "arrecadacao"
      ? relatorio?.atividadesRecentes?.ultimosPagamentos ?? []
      : relatorio?.atividadesRecentes?.usuariosAtivos ?? [];

  return (
    <ContentLayout title="Relatórios">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-6">

        {/* Filtros */}
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 flex flex-col md:flex-row gap-6 items-end">
          <div>
            <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Tipo</label>
            <Select onValueChange={(v) => setTipo(v as "arrecadacao" | "usuarioAtivos")} value={tipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arrecadacao">Arrecadação</SelectItem>
                <SelectItem value="usuarioAtivos">Usuários Ativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Período</label>
            <Select onValueChange={(v) => setTempo(v as "diaria" | "semanal" | "mensal")} value={tempo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diaria">Diária</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Totais */}
        {loading ? (
          <p className="text-gray-700 dark:text-gray-200">Carregando dados...</p>
        ) : erro ? (
          <p className="text-red-600 dark:text-red-400">{erro}</p>
        ) : (
          <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 flex flex-wrap justify-between gap-6">
            <div className="flex items-center gap-2">
              <DollarSign /> Total Arrecadado: {relatorio?.totalArrecadado} MZN
            </div>
            <div className="flex items-center gap-2">
              <Users /> Total Usuários: {relatorio?.totalUsuarios}
            </div>
            <div className="flex items-center gap-2">
              Usuários Ativos: {relatorio?.usuariosAtivos}
            </div>
            <div className="flex items-center gap-2">
              Total Pagamentos: {relatorio?.totalPagamentos}
            </div>
          </Card>
        )}

        {/* Lista de exibição */}
        {!loading && !erro && (
          <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
            <CardHeader className="mb-6">
              <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {tipo === "arrecadacao" ? "Últimos Pagamentos" : "Usuários Ativos"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {listaExibicao.length === 0 && (
                <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum dado encontrado.</p>
              )}

              {tipo === "arrecadacao" &&
                (listaExibicao as Pagamento[]).map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
                  >
                    <div className="space-y-1">
                      <p className="text-gray-800 dark:text-gray-100 font-semibold">{p.taxa.nome}</p>
                      <p className="text-gray-800 dark:text-gray-100">{p.metodo}</p>
                      <p className="text-gray-800 dark:text-gray-100">{new Date(p.data).toLocaleString()}</p>
                      <p className="text-gray-800 dark:text-gray-100 font-bold">{Number(p.valorPago).toLocaleString()} MZN</p>
                      <p
                        className={`font-semibold ${
                          p.status === "PAGO" ? "text-green-600" : p.status === "PENDENTE" ? "text-yellow-500" : "text-red-600"
                        }`}
                      >
                        {p.status}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-700 dark:text-gray-200 font-medium">Usuário: {p.usuario.nome}</p>
                      <p className="text-gray-700 dark:text-gray-200">{p.usuario.email}</p>
                    </div>
                  </div>
                ))}

              {tipo === "usuarioAtivos" &&
                (listaExibicao as Usuario[]).map((u) => (
                  <div
                    key={u.id}
                    className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
                  >
                    <p className="text-gray-800 dark:text-gray-100 font-semibold">{u.nome}</p>
                    <p className="text-gray-700 dark:text-gray-200">{u.email}</p>
                    <p className="text-gray-700 dark:text-gray-200">{u.telefone}</p>
                    <p className="text-gray-700 dark:text-gray-200">{u.perfil}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
    </ContentLayout>
  );
}
