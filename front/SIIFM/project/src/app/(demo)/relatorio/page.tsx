// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { Calendar, FileCheck } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

// interface Pagamento {
//   id: number;
//   usuarioNome: string;
//   taxaNome: string;
//   valorPago: number;
//   metodo: string;
//   data: string;
//   status: "PAGO" | "PENDENTE" | "FALHOU";
// }

// interface UsuarioAtivo {
//   id: number;
//   nome: string;
//   telefone: string;
//   email: string;
//   perfil: string;
//   criadoEm: string;
// }

// interface RelatorioResponse {
//   tipo: "arrecadacao" | "usuariosAtivos";
//   periodo: "diaria" | "semanal" | "mensal";
//   inicio: string;
//   fim: string;
//   totalArrecadado?: number;
//   quantidadePagamentos?: number;
//   pagamentos?: Pagamento[];
//   quantidadeUsuarios?: number;
//   usuarios?: UsuarioAtivo[];
//   exportPdfUrl?: string;
// }

// export default function RelatoriosAdmin() {
//   const [tipo, setTipo] = useState<"arrecadacao" | "usuariosAtivos">("arrecadacao");
//   const [tempo, setTempo] = useState<"diaria" | "semanal" | "mensal">("semanal");
//   const [relatorio, setRelatorio] = useState<RelatorioResponse | null>(null);

//   useEffect(() => {
//     async function fetchRelatorio() {
//       try {
//         const query = new URLSearchParams({ tipo, tempo });
//         const res = await fetch(`/api/relatorios?${query.toString()}`);
//         const data: RelatorioResponse = await res.json();

//         if (tipo === "arrecadacao" && data.pagamentos) {
//           const pagamentosFormatados = data.pagamentos.map(p => ({
//             ...p,
//             usuarioNome: p.usuarioNome || p.usuario?.nome || "Desconhecido",
//             taxaNome: p.taxa?.nome || "Desconhecida",
//             valorPago: Number(p.valorPago),
//           }));
//           setRelatorio({ ...data, pagamentos: pagamentosFormatados });
//         } else {
//           setRelatorio(data);
//         }
//       } catch (err) {
//         console.error("Erro ao buscar relatório", err);
//       }
//     }

//     fetchRelatorio();
//   }, [tipo, tempo]);

//   return (
//     <ContentLayout title="Relatórios">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">

//         {/* Filtros */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 mb-6">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <Calendar size={26} /> Filtros
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col md:flex-row md:items-end gap-4">
//             <div>
//               <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Tipo de Relatório</label>
//               <Select onValueChange={v => setTipo(v as any)} value={tipo}>
//                 <SelectTrigger className="w-52">
//                   <SelectValue placeholder="Tipo" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="arrecadacao">Arrecadação</SelectItem>
//                   <SelectItem value="usuariosAtivos">Usuários Ativos</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Período</label>
//               <Select onValueChange={v => setTempo(v as any)} value={tempo}>
//                 <SelectTrigger className="w-52">
//                   <SelectValue placeholder="Período" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="diaria">Diário</SelectItem>
//                   <SelectItem value="semanal">Semanal</SelectItem>
//                   <SelectItem value="mensal">Mensal</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Total e Export */}
//         {relatorio && (
//           <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//             {tipo === "arrecadacao" && (
//               <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
//                 Total Arrecadado: {relatorio.totalArrecadado?.toLocaleString() || 0} MZN
//               </p>
//             )}
//             {tipo === "usuariosAtivos" && (
//               <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
//                 Total Usuários Ativos: {relatorio.quantidadeUsuarios || 0}
//               </p>
//             )}
//             {relatorio.exportPdfUrl && (
//               <a href={relatorio.exportPdfUrl} target="_blank" rel="noreferrer">
//                 <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2">
//                   <FileCheck size={16} /> Exportar PDF
//                 </Button>
//               </a>
//             )}
//           </Card>
//         )}

//         {/* Lista de Pagamentos */}
//         {relatorio && tipo === "arrecadacao" && relatorio.pagamentos && (
//           <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//             <CardHeader className="mb-6">
//               <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//                 Lista de Pagamentos
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {relatorio.pagamentos.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum pagamento encontrado.</p>}
//               {relatorio.pagamentos.map(p => (
//                 <div key={p.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
//                   <div className="space-y-1">
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{p.usuarioNome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{p.taxaNome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{p.metodo}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{new Date(p.data).toLocaleString()}</p>
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{p.valorPago.toLocaleString()} MZN</p>
//                     <p className={`font-semibold ${p.status === "PAGO" ? "text-green-600" : p.status === "PENDENTE" ? "text-yellow-500" : "text-red-600"}`}>{p.status}</p>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//         {/* Lista de Usuários Ativos */}
//         {relatorio && tipo === "usuariosAtivos" && relatorio.usuarios && (
//           <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//             <CardHeader className="mb-6">
//               <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//                 Lista de Usuários Ativos
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {relatorio.usuarios.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum usuário ativo encontrado.</p>}
//               {relatorio.usuarios.map(u => (
//                 <div key={u.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
//                   <div className="space-y-1">
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{u.nome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{u.email}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{u.telefone}</p>
//                     <p className="text-gray-800 dark:text-gray-100 font-medium">{u.perfil}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{new Date(u.criadoEm).toLocaleString()}</p>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         )}

//       </div>
//     </ContentLayout>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Calendar, FileCheck, Users, DollarSign, Wallet2Icon, WalletCards, Wallet } from "lucide-react";
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

// interface RelatorioBackend {
//   totalUsuarios: number;
//   totalPagamentos: number;
//   totalArrecadado: number;
//   usuariosAtivos: number;
//   atividadesRecentes: {
//     ultimosPagamentos?: Pagamento[];
//     ultimasTaxas?: Taxa[];
//     usuariosAtivos?: Usuario[];
//   };
// }

// export default function RelatoriosAdmin() {
//   const [inicio, setInicio] = useState("");
//   const [fim, setFim] = useState("");
//   const [tipo, setTipo] = useState<"arrecadacao" | "usuariosAtivos">("arrecadacao");

//   const [relatorio, setRelatorio] = useState<RelatorioBackend | null>(null);

  
//   const mock: RelatorioBackend = {
//     totalUsuarios: 1,
//     totalPagamentos: 6,
//     totalArrecadado: 4500,
//     usuariosAtivos: 1,
//     atividadesRecentes: {
//       ultimosPagamentos: [
//         {
//           id: 6,
//           usuarioId: 1,
//           taxaId: 1,
//           valorPago: "750",
//           metodo: "M-PESA",
//           data: "2025-10-15T10:16:48.534Z",
//           status: "PAGO",
//           usuario: {
//             id: 1,
//             nome: "Fernando Silva",
//             telefone: "+258841234567",
//             morada: "Av. Eduardo Mondlane, Beira",
//             email: "fernandosilva@example.com",
//             perfil: "ADMIN",
//           },
//           taxa: {
//             id: 1,
//             nome: "Taxa por Actividade Económica",
//             valor: "1500",
//             periodicidade: "MENSAL",
//           },
//         },
//          {
//           id: 6,
//           usuarioId: 1,
//           taxaId: 1,
//           valorPago: "750",
//           metodo: "M-PESA",
//           data: "2025-10-15T10:16:48.534Z",
//           status: "PAGO",
//           usuario: {
//             id: 1,
//             nome: "Fernando Silva",
//             telefone: "+258841234567",
//             morada: "Av. Eduardo Mondlane, Beira",
//             email: "fernandosilva@example.com",
//             perfil: "ADMIN",
//           },
//           taxa: {
//             id: 1,
//             nome: "Taxa por Actividade Económica",
//             valor: "1500",
//             periodicidade: "MENSAL",
//           },
//         }, {
//           id: 6,
//           usuarioId: 1,
//           taxaId: 1,
//           valorPago: "750",
//           metodo: "M-PESA",
//           data: "2025-10-15T10:16:48.534Z",
//           status: "PAGO",
//           usuario: {
//             id: 1,
//             nome: "Fernando Silva",
//             telefone: "+258841234567",
//             morada: "Av. Eduardo Mondlane, Beira",
//             email: "fernandosilva@example.com",
//             perfil: "ADMIN",
//           },
//           taxa: {
//             id: 1,
//             nome: "Taxa por Actividade Económica",
//             valor: "1500",
//             periodicidade: "MENSAL",
//           },
//         },
//         // Mais pagamentos mock se quiser...
//       ],
//       ultimasTaxas: [
//         {
//           id: 1,
//           nome: "Taxa por Actividade Económica",
//           valor: "1500",
//           periodicidade: "MENSAL",
//         },
//         {
//           id: 1,
//           nome: "Taxa por Actividade Económica",
//           valor: "1500",
//           periodicidade: "MENSAL",
//         },{
//           id: 1,
//           nome: "Taxa por Actividade Económica2",
//           valor: "1500",
//           periodicidade: "MENSAL",
//         },{
//           id: 1,
//           nome: "Taxa por Actividade Económica3",
//           valor: "1500",
//           periodicidade: "MENSAL",
//         },
//       ],
//       usuariosAtivos: [
//         {
//           id: 1,
//           nome: "Fernando Silva",
//           telefone: "+258841234567",
//           morada: "Av. Eduardo Mondlane, Beira",
//           email: "fernandosilva@example.com",
//           perfil: "ADMIN",
//         },
        
//       ],
//     },
//   };
//   const listaExibicao: (Pagamento | Usuario)[] =
//   tipo === "arrecadacao"
//     ? relatorio?.atividadesRecentes?.ultimosPagamentos || mock.atividadesRecentes!.ultimosPagamentos || []
//     : relatorio?.atividadesRecentes?.usuariosAtivos || mock.atividadesRecentes!.usuariosAtivos || [];


  
//   useEffect(() => {
//     async function fetchRelatorio() {
//       try {
//         const query = new URLSearchParams();
//         if (inicio) query.append("inicio", inicio);
//         if (fim) query.append("fim", fim);
//         query.append("tipo", tipo);
//         const periodo = "semanal"; // ou derivar do filtro
//         query.append("tempo", periodo);

//         const res = await fetch(`/api/relatorios?${query.toString()}`);
//         if (!res.ok) throw new Error("Erro ao buscar relatório");
//         const data: RelatorioBackend = await res.json();
//         setRelatorio(data);
//       } catch (err) {
//         console.warn("Usando mock por falha no backend ou dados ausentes", err);
//         setRelatorio(mock);
//       }
//     }
//     fetchRelatorio();
//   }, [inicio, fim, tipo]);

 
//   return (
//     <ContentLayout title="Relatórios">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-8">
        
//         {/* Filtros */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 mb-6">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <Calendar size={26} /> Filtros
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col md:flex-row md:items-end gap-4">
//             <div>
//               <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Data Início</label>
//               <Input type="date" value={inicio} onChange={e => setInicio(e.target.value)} />
//             </div>
//             <div>
//               <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Data Fim</label>
//               <Input type="date" value={fim} onChange={e => setFim(e.target.value)} />
//             </div>
//             <div>
//               <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">Tipo</label>
//               <Select onValueChange={v => setTipo(v as "arrecadacao" | "usuariosAtivos")} value={tipo}>
//                 <SelectTrigger className="w-44">
//                   <SelectValue placeholder="Tipo" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="arrecadacao">Arrecadação</SelectItem>
//                   <SelectItem value="usuariosAtivos">Usuários Ativos</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Totais */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="flex gap-6">
//             <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg flex items-center gap-2">
//               <Users size={18} /> Total Usuários: {relatorio?.totalUsuarios ?? mock.totalUsuarios}
//             </p>
//             <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg flex items-center gap-2">
//               <Wallet2Icon size={18} /> Total Arrecadado: {relatorio?.totalArrecadado ?? mock.totalArrecadado} MZN
//             </p>
//             <p className="text-gray-800 dark:text-gray-100 font-semibold text-lg flex items-center gap-2">
//               <Users size={18} /> Usuários Ativos: {relatorio?.usuariosAtivos ?? mock.usuariosAtivos}
//             </p>
//           </div>
//         </Card>

//         {/* Lista */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               {tipo === "arrecadacao" ? "Últimos Pagamentos" : "Usuários Ativos"}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {listaExibicao.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum item encontrado.</p>}

//             {tipo === "arrecadacao" &&
//               (listaExibicao as Pagamento[]).map(p => (
//                 <div key={p.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
//                   <div className="space-y-1">
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{p.taxa.nome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{p.usuario.nome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{p.metodo}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{new Date(p.data).toLocaleString()}</p>
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{parseFloat(p.valorPago).toLocaleString()} MZN</p>
//                     <p className={`font-semibold ${p.status === "PAGO" ? "text-green-600" : "text-red-600"}`}>{p.status}</p>
//                   </div>
//                 </div>
//               ))}

//             {tipo === "usuariosAtivos" &&
//               (listaExibicao as Usuario[]).map(u => (
//                 <div key={u.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
//                   <div className="space-y-1">
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{u.nome}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{u.email}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{u.telefone}</p>
//                     <p className="text-gray-800 dark:text-gray-100">{u.morada}</p>
//                     <p className="text-gray-800 dark:text-gray-100 font-semibold">{u.perfil}</p>
//                   </div>
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

const mock: RelatorioResponse = {
  totalUsuarios: 1,
  totalPagamentos: 6,
  totalArrecadado: 4300,
  usuariosAtivos: 1,
  atividadesRecentes: {
    ultimosPagamentos: [
      {
        id: 6,
        usuarioId: 1,
        taxaId: 1,
        valorPago: "750",
        metodo: "M-PESA",
        data: "2025-10-15T10:16:48.534Z",
        status: "PAGO",
        usuario: {
          id: 1,
          nome: "Fernando Silva",
          telefone: "+258841234567",
          morada: "Av. Eduardo Mondlane, Beira",
          email: "fernandosilva@example.com",
          perfil: "ADMIN",
        },
        taxa: {
          id: 1,
          nome: "Taxa por Actividade Económica",
          valor: "1500",
          periodicidade: "MENSAL",
        },
      },
      {
        id: 5,
        usuarioId: 1,
        taxaId: 1,
        valorPago: "750",
        metodo: "M-PESA",
        data: "2025-10-15T10:14:37.187Z",
        status: "PAGO",
        usuario: {
          id: 1,
          nome: "Fernando Silva",
          telefone: "+258841234567",
          morada: "Av. Eduardo Mondlane, Beira",
          email: "fernandosilva@example.com",
          perfil: "ADMIN",
        },
        taxa: {
          id: 1,
          nome: "Taxa por Actividade Económica",
          valor: "1500",
          periodicidade: "MENSAL",
        },
      },
    ],
    ultimasTaxas: [
      {
        id: 1,
        nome: "Taxa por Actividade Económica",
        valor: "1500",
        periodicidade: "MENSAL",
      },
    ],
    usuariosAtivos: [
      {
        id: 1,
        nome: "Fernando Silva",
        telefone: "+258841234567",
        morada: "Av. Eduardo Mondlane, Beira",
        email: "fernandosilva@example.com",
        perfil: "ADMIN",
      },
    ],
  },
};

export default function RelatoriosAdmin() {
  const [tipo, setTipo] = useState<"arrecadacao" | "usuarioAtivos">("arrecadacao");
  const [tempo, setTempo] = useState<"diaria" | "semanal" | "mensal">("semanal");
  const [relatorio, setRelatorio] = useState<RelatorioResponse | null>(null);

  
  useEffect(() => {
    async function fetchRelatorio() {
      try {
        const res = await fetch(`/api/relatorios?tipo=${tipo}&tempo=${tempo}`);
        const data: RelatorioResponse = await res.json();
        setRelatorio(data || mock); // usa mock se não houver dados
      } catch (err) {
        console.error("Erro ao buscar relatório", err);
        setRelatorio(mock);
      }
    }
    fetchRelatorio();
  }, [tipo, tempo]);

  // Seleciona a lista a exibir dependendo do tipo
  let listaExibicao =
    tipo === "arrecadacao"
      ? relatorio?.atividadesRecentes?.ultimosPagamentos ?? mock.atividadesRecentes.ultimosPagamentos
      : relatorio?.atividadesRecentes?.usuariosAtivos ?? mock.atividadesRecentes.usuariosAtivos;

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
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10 flex flex-wrap justify-between gap-6">
          <div className="flex items-center gap-2">
            <DollarSign /> Total Arrecadado: {relatorio?.totalArrecadado ?? mock.totalArrecadado} MZN
          </div>
          <div className="flex items-center gap-2">
            <Users /> Total Usuários: {relatorio?.totalUsuarios ?? mock.totalUsuarios}
          </div>
          <div className="flex items-center gap-2">
            Usuários Ativos: {relatorio?.usuariosAtivos ?? mock.usuariosAtivos}
          </div>
          <div className="flex items-center gap-2">
            Total Pagamentos: {relatorio?.totalPagamentos ?? mock.totalPagamentos}
          </div>
        </Card>

        {/* Lista de exibição */}
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
              listaExibicao.map((p: Pagamento) => (
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
              listaExibicao.map((u: Usuario) => (
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
      </div>
    </ContentLayout>
  );
}
