// "use client";

// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CreditCard, Clock, Wallet, FileCheck, CheckCircle, XCircle, Users } from "lucide-react";
// import api from "@/lib/api";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

// interface Pagamento {
//   id: number;
//   taxaNome: string;
//   valorPago: number;
//   metodo: string;
//   data: string;
//   status: "CONCLUIDO" | "PENDENTE" | "FALHOU";
//   usuarioNome?: string;
// }

// interface JwtPayload {
//   id: number;
//   perfil: "ADMIN" | "COMERCIANTE" | "CIDADÃO";
//   exp: number;
//   iat: number;
// }

// export default function HistoricoPagamento() {
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [erro, setErro] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchPagamentos() {
//       try {
//         setLoading(true);
//         setErro(null);

//         // Obter token
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setErro("Usuário não autenticado.");
//           setLoading(false);
//           return;
//         }

//         // Decodificar token para obter ID e perfil
//         const decoded = jwtDecode<JwtPayload>(token);
//         const userId = decoded.id;
//         const perfil = decoded.perfil;

//         // Endpoint
//         const url =
//           perfil === "ADMIN"
//             ? "/pagamentos"
//             : `/usuarios/${userId}/pagamentos`;

//         // Requisição
//         const { data } = await api.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Ajustar lista conforme retorno
//         let lista: Pagamento[] = [];

//         if (perfil !== "ADMIN" && data.success && data.data?.pagamentos) {
//           const usuario = data.data;
//           lista = usuario.pagamentos.map((p: any) => ({
//             id: p.id,
//             taxaNome: p.taxa?.nome || "—",
//             valorPago: Number(p.valorPago || 0),
//             metodo: p.metodo,
//             data: new Date(p.data).toLocaleDateString("pt-PT"),
//             status:
//               p.status === "PAGO"
//                 ? "CONCLUIDO"
//                 : p.status === "PENDENTE"
//                   ? "PENDENTE"
//                   : "FALHOU",
//             usuarioNome: usuario.nome,
//           }));
//         } else if (perfil === "ADMIN" && data.success && Array.isArray(data.data)) {
//           // Caso o admin veja todos os pagamentos (caso retorne lista direta)
//           lista = data.data.map((p: any) => ({
//             id: p.id,
//             taxaNome: p.taxa?.nome || "—",
//             valorPago: Number(p.valorPago || 0),
//             metodo: p.metodo,
//             data: new Date(p.data).toLocaleDateString("pt-PT"),
//             status:
//               p.status === "PAGO"
//                 ? "CONCLUIDO"
//                 : p.status === "PENDENTE"
//                   ? "PENDENTE"
//                   : "FALHOU",
//             usuarioNome: p.usuario?.nome || "—",
//           }));
//         }

//         setPagamentos(lista);
//       } catch (err: any) {
//         console.error("Erro ao buscar histórico:", err);
//         setErro("Não foi possível carregar os pagamentos.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPagamentos();
//   }, []);

//   return (
//     <ContentLayout title="Histórico de Pagamentos">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//         <Card className="w-full max-w-[90rem] mx-auto shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-8 md:p-16">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <CreditCard size={26} /> Pagamentos Recentes
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {loading && (
//               <p className="text-gray-700 dark:text-gray-200 text-center">
//                 Carregando pagamentos...
//               </p>
//             )}
//             {erro && (
//               <p className="text-red-600 dark:text-red-400 text-center">
//                 {erro}
//               </p>
//             )}
//             {!loading && pagamentos.length === 0 && !erro && (
//               <p className="text-gray-700 dark:text-gray-200 text-center">
//                 Nenhum pagamento encontrado.
//               </p>
//             )}

//             {pagamentos.map((p) => (
//               <div
//                 key={p.id}
//                 className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
//               >
//                 <div className="space-y-1">
//                   <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
//                     <Wallet size={16} /> {p.taxaNome}
//                   </p>
//                   <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
//                     <Clock size={16} /> {p.data}
//                   </p>
//                   <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
//                     <CreditCard size={16} /> {p.metodo}
//                   </p>
//                   <p className="text-gray-800 dark:text-gray-100 font-semibold">
//                     {p.valorPago.toLocaleString()} MZN
//                   </p>

//                   {p.usuarioNome && (
//                     <p className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium">
//                       <Users size={16} /> {p.usuarioNome}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-2 mt-4 md:mt-0">
//                   {p.status === "CONCLUIDO" && <CheckCircle className="text-green-600" />}
//                   {p.status === "PENDENTE" && <Clock className="text-yellow-500" />}
//                   {p.status === "FALHOU" && <XCircle className="text-red-600" />}
//                   <span className="text-gray-800 dark:text-gray-100 font-semibold">
//                     {p.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </ContentLayout>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   CreditCard,
//   Clock,
//   Wallet,
//   FileCheck,
//   CheckCircle,
//   XCircle,
//   Users,
//   Download
// } from "lucide-react";
// import api from "@/lib/api";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { motion } from "framer-motion";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// interface Pagamento {
//   id: number;
//   taxaNome: string;
//   valorPago: number;
//   metodo: string;
//   data: string;
//   status: "CONCLUIDO" | "PENDENTE" | "FALHOU";
//   usuarioNome?: string;
// }

// interface JwtPayload {
//   id: number;
//   perfil: "ADMIN" | "COMERCIANTE" | "CIDADÃO";
//   exp: number;
//   iat: number;
// }

// export default function HistoricoPagamento() {
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [erro, setErro] = useState<string | null>(null);
//   const [filtroStatus, setFiltroStatus] = useState<"ALL" | "CONCLUIDO" | "PENDENTE" | "FALHOU">("ALL");

//   useEffect(() => {
//     async function fetchPagamentos() {
//       try {
//         setLoading(true);
//         setErro(null);

//         const token = localStorage.getItem("token");
//         if (!token) {
//           setErro("Usuário não autenticado.");
//           setLoading(false);
//           return;
//         }

//         const decoded = jwtDecode<JwtPayload>(token);
//         const userId = decoded.id;
//         const perfil = decoded.perfil;

//         const url = perfil === "ADMIN" ? "/pagamentos" : `/usuarios/${userId}/pagamentos`;
//         const { data } = await api.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         let lista: Pagamento[] = [];

//         if (perfil !== "ADMIN" && data.success && data.data?.pagamentos) {
//           const usuario = data.data;
//           lista = usuario.pagamentos.map((p: any) => ({
//             id: p.id,
//             taxaNome: p.taxa?.nome || "—",
//             valorPago: Number(p.valorPago || 0),
//             metodo: p.metodo,
//             data: new Date(p.data).toLocaleDateString("pt-PT"),
//             status:
//               p.status === "PAGO"
//                 ? "CONCLUIDO"
//                 : p.status === "PENDENTE"
//                   ? "PENDENTE"
//                   : "FALHOU",
//             usuarioNome: usuario.nome,
//           }));
//         } else if (perfil === "ADMIN" && data.success && Array.isArray(data.data)) {
//           lista = data.data.map((p: any) => ({
//             id: p.id,
//             taxaNome: p.taxa?.nome || "—",
//             valorPago: Number(p.valorPago || 0),
//             metodo: p.metodo,
//             data: new Date(p.data).toLocaleDateString("pt-PT"),
//             status:
//               p.status === "PAGO"
//                 ? "CONCLUIDO"
//                 : p.status === "PENDENTE"
//                   ? "PENDENTE"
//                   : "FALHOU",
//             usuarioNome: p.usuario?.nome || "—",
//           }));
//         }

//         setPagamentos(lista);
//       } catch (err: any) {
//         console.error("Erro ao buscar histórico:", err);
//         setErro("Não foi possível carregar os pagamentos.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPagamentos();
//   }, []);

//   const pagamentosFiltrados =
//     filtroStatus === "ALL"
//       ? pagamentos
//       : pagamentos.filter((p) => p.status === filtroStatus);

//   return (
//     <ContentLayout title="Histórico de Pagamentos">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//         <Card className="w-full max-w-[90rem] mx-auto shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <CreditCard size={26} /> Pagamentos Recentes
//             </CardTitle>

//             <div className="flex items-center gap-3">
//               <Select value={filtroStatus} onValueChange={v => setFiltroStatus(v as any)}>
//                 <SelectTrigger className="w-48">
//                   <SelectValue placeholder="Filtrar por status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL">Todos</SelectItem>
//                   <SelectItem value="CONCLUIDO">Concluídos</SelectItem>
//                   <SelectItem value="PENDENTE">Pendentes</SelectItem>
//                   <SelectItem value="FALHOU">Falhou</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {loading && (
//               <p className="text-gray-700 dark:text-gray-200 text-center">
//                 Carregando pagamentos...
//               </p>
//             )}
//             {erro && (
//               <p className="text-red-600 dark:text-red-400 text-center">
//                 {erro}
//               </p>
//             )}
//             {!loading && pagamentosFiltrados.length === 0 && !erro && (
//               <p className="text-gray-700 dark:text-gray-200 text-center">
//                 Nenhum pagamento encontrado.
//               </p>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {pagamentosFiltrados.map((p) => (
//                 <motion.div
//                   key={p.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.25 }}
//                   className="flex flex-col justify-between bg-indigo-50 dark:bg-indigo-900 rounded-2xl p-5 shadow-lg border border-indigo-200 dark:border-indigo-700 hover:scale-105 transition-transform duration-200"
//                 >
//                   <div className="space-y-1">
//                     <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold">
//                       <Wallet size={16} /> {p.taxaNome}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
//                       <Clock size={16} /> {p.data}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm">
//                       <CreditCard size={16} /> {p.metodo}
//                     </p>
//                     <p className="text-gray-800 dark:text-gray-100 font-bold">
//                       {p.valorPago.toLocaleString()} MZN
//                     </p>
//                     {p.usuarioNome && (
//                       <p className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium text-sm">
//                         <Users size={16} /> {p.usuarioNome}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center gap-2">
//                       {p.status === "CONCLUIDO" && <CheckCircle className="text-green-600" />}
//                       {p.status === "PENDENTE" && <Clock className="text-yellow-500" />}
//                       {p.status === "FALHOU" && <XCircle className="text-red-600" />}
//                       <span className="text-gray-800 dark:text-gray-100 font-semibold">
//                         {p.status}
//                       </span>
//                     </div>

//                     {p.status === "CONCLUIDO" && (
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="flex items-center gap-1"
//                         onClick={() => console.log("Gerar recibo", p.id)}
//                       >
//                         <Download size={16} /> Recibo
//                       </Button>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </ContentLayout>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CreditCard, Clock, Wallet, CheckCircle, XCircle, Users, Download, FileText } from "lucide-react";
// import { motion } from "framer-motion";
// import api from "@/lib/api";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
// import jsPDF from "jspdf";

// interface Pagamento {
//   id: number;
//   taxaNome: string;
//   valorPago: number;
//   metodo: string;
//   data: string;
//   status: "CONCLUIDO" | "PENDENTE" | "FALHOU";
//   usuarioNome?: string;
// }

// interface Recibo {
//   reciboId: number;
//   nomeUsuario: string;
//   telefone: string;
//   morada: string;
//   email: string;
//   perfil: string;
//   nomeTaxa: string;
//   valorTaxa: number;
//   periodicidade: string;
//   valorPago: number;
//   metodoPagamento: string;
//   statusPagamento: string;
//   dataPagamento: string;
// }

// interface JwtPayload {
//   id: number;
//   perfil: "ADMIN" | "COMERCIANTE" | "CIDADÃO";
//   exp: number;
//   iat: number;
// }

// export default function HistoricoPagamento() {
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [erro, setErro] = useState<string | null>(null);
//   const [filtroStatus, setFiltroStatus] = useState<"ALL" | "CONCLUIDO" | "PENDENTE" | "FALHOU">("ALL");
//   const [reciboSelecionado, setReciboSelecionado] = useState<Recibo | null>(null);
//   const [modalAberto, setModalAberto] = useState(false);

//   useEffect(() => {
//     async function fetchPagamentos() {
//       try {
//         setLoading(true);
//         setErro(null);

//         const token = localStorage.getItem("token");
//         if (!token) {
//           setErro("Usuário não autenticado.");
//           setLoading(false);
//           return;
//         }

//         const decoded = jwtDecode<JwtPayload>(token);
//         const userId = decoded.id;
//         const perfil = decoded.perfil;

//         const url = perfil === "ADMIN" ? "/pagamentos" : `/usuarios/${userId}/pagamentos`;

//         const { data } = await api.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         let lista: Pagamento[] = [];

//         if (!data.success) {
//           setErro("Não foi possível carregar os pagamentos.");
//           return;
//         }

//         if (perfil === "ADMIN" && Array.isArray(data.data)) {
//           lista = data.data.map((p: any) => ({
//             id: p.id,
//             taxaNome: p.taxa?.nome || "—",
//             valorPago: Number(p.valorPago || 0),
//             metodo: p.metodo,
//             data: new Date(p.data).toLocaleDateString("pt-PT"),
//             status:
//               p.status === "PAGO"
//                 ? "CONCLUIDO"
//                 : p.status === "PENDENTE"
//                   ? "PENDENTE"
//                   : "FALHOU",
//             usuarioNome: p.usuario?.nome || "—",
//           }));
//         } else if (perfil !== "ADMIN" && data.data.pagamentos) {
//           lista = data.data.pagamentos.map((p: any) => ({
//             id: p.id,
//             taxaNome: p.taxa?.nome || "—",
//             valorPago: Number(p.valorPago || 0),
//             metodo: p.metodo,
//             data: new Date(p.data).toLocaleDateString("pt-PT"),
//             status:
//               p.status === "PAGO"
//                 ? "CONCLUIDO"
//                 : p.status === "PENDENTE"
//                   ? "PENDENTE"
//                   : "FALHOU",
//             usuarioNome: data.data.nome,
//           }));
//         }

//         setPagamentos(lista);
//       } catch (err: any) {
//         console.error("Erro ao buscar histórico:", err);
//         setErro("Não foi possível carregar os pagamentos.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPagamentos();
//   }, []);

//   const pagamentosFiltrados =
//     filtroStatus === "ALL" ? pagamentos : pagamentos.filter(p => p.status === filtroStatus);

//   async function handleRecibo(pagamentoId: number) {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const { data } = await api.get(`/pagamentos/${pagamentoId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success && data.recibo) {
//         setReciboSelecionado(data.recibo);
//         setModalAberto(true);
//       }
//     } catch (err) {
//       console.error("Erro ao buscar recibo:", err);
//     }
//   }

//   function baixarReciboPDF() {
//     if (!reciboSelecionado) return;

//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.setFont("helvetica", "bold");
//     doc.text("RECIBO DE PAGAMENTO", 105, 20, { align: "center" });
//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Nome: ${reciboSelecionado.nomeUsuario}`, 20, 40);
//     doc.text(`Telefone: ${reciboSelecionado.telefone}`, 20, 50);
//     doc.text(`Morada: ${reciboSelecionado.morada}`, 20, 60);
//     doc.text(`Email: ${reciboSelecionado.email}`, 20, 70);
//     doc.text(`Perfil: ${reciboSelecionado.perfil}`, 20, 80);
//     doc.text(`Taxa: ${reciboSelecionado.nomeTaxa}`, 20, 90);
//     doc.text(`Valor da Taxa: ${reciboSelecionado.valorTaxa.toLocaleString()} MZN`, 20, 100);
//     doc.text(`Periodicidade: ${reciboSelecionado.periodicidade}`, 20, 110);
//     doc.text(`Valor Pago: ${reciboSelecionado.valorPago.toLocaleString()} MZN`, 20, 120);
//     doc.text(`Método: ${reciboSelecionado.metodoPagamento}`, 20, 130);
//     doc.text(`Status: ${reciboSelecionado.statusPagamento}`, 20, 140);
//     doc.text(`Data: ${reciboSelecionado.dataPagamento}`, 20, 150);

//     doc.save(`recibo_${reciboSelecionado.reciboId}.pdf`);
//   }

//   return (
//     <ContentLayout title="Histórico de Pagamentos">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//         <Card className="w-full max-w-[90rem] mx-auto shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <CreditCard size={24} /> Pagamentos Recentes
//             </CardTitle>

//             <div className="flex items-center gap-2">
//               <span className="text-gray-700 dark:text-gray-200 font-medium">Status:</span>
//               <select
//                 className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//                 value={filtroStatus}
//                 onChange={e => setFiltroStatus(e.target.value as any)}
//               >
//                 <option value="ALL">Todos</option>
//                 <option value="CONCLUIDO">Concluídos</option>
//                 <option value="PENDENTE">Pendentes</option>
//                 <option value="FALHOU">Falhou</option>
//               </select>
//             </div>
//           </CardHeader>

//           <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {loading
//               ? Array.from({ length: 6 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="animate-pulse bg-indigo-100 dark:bg-indigo-800 rounded-xl h-28 p-3"
//                   ></div>
//                 ))
//               : pagamentosFiltrados.length === 0
//               ? (
//                 <p className="text-gray-700 dark:text-gray-200 text-center col-span-full">
//                   Nenhum pagamento encontrado.
//                 </p>
//               )
//               : pagamentosFiltrados.map((p) => (
//                   <motion.div
//                     key={p.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.25 }}
//                     className="flex flex-col justify-between bg-indigo-50 dark:bg-indigo-900 rounded-xl p-3 shadow border border-indigo-200 dark:border-indigo-700 hover:scale-105 transition-transform duration-200"
//                   >
//                     <div className="space-y-1 text-sm">
//                       <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold">
//                         <Wallet size={14} /> {p.taxaNome}
//                       </p>
//                       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//                         <Clock size={14} /> {p.data}
//                       </p>
//                       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//                         <CreditCard size={14} /> {p.metodo}
//                       </p>
//                       <p className="text-gray-800 dark:text-gray-100 font-bold">
//                         {p.valorPago.toLocaleString()} MZN
//                       </p>
//                       {p.usuarioNome && (
//                         <p className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium">
//                           <Users size={14} /> {p.usuarioNome}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center justify-between mt-3">
//                       <div className="flex items-center gap-2">
//                         {p.status === "CONCLUIDO" && <CheckCircle className="text-green-600" />}
//                         {p.status === "PENDENTE" && <Clock className="text-yellow-500" />}
//                         {p.status === "FALHOU" && <XCircle className="text-red-600" />}
//                         <span className="text-gray-800 dark:text-gray-100 font-semibold text-sm">
//                           {p.status}
//                         </span>
//                       </div>

//                       {p.status === "CONCLUIDO" && (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex items-center gap-1 text-xs"
//                           onClick={() => handleRecibo(p.id)}
//                         >
//                           <FileText size={14} /> Recibo
//                         </Button>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//           </CardContent>
//         </Card>

//         {/* Modal de Recibo */}
//         <Dialog open={modalAberto} onOpenChange={setModalAberto}>
//           <DialogContent className="max-w-md rounded-2xl border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-gray-800 p-6 shadow-lg">


//             {reciboSelecionado && (
//               <div className="mt-4 space-y-2 text-sm">
//                 <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
//                   <p className="font-semibold">{reciboSelecionado.nomeUsuario}</p>
//                   <p>{reciboSelecionado.email}</p>
//                   <p>{reciboSelecionado.telefone}</p>
//                   <p>{reciboSelecionado.morada}</p>
//                 </div>

//                 <div className="pt-2 space-y-1">
//                   <p><strong>Taxa:</strong> {reciboSelecionado.nomeTaxa}</p>
//                   <p><strong>Valor da Taxa:</strong> {reciboSelecionado.valorTaxa.toLocaleString()} MZN</p>
//                   <p><strong>Periodicidade:</strong> {reciboSelecionado.periodicidade}</p>
//                   <p><strong>Valor Pago:</strong> {reciboSelecionado.valorPago.toLocaleString()} MZN</p>
//                   <p><strong>Método:</strong> {reciboSelecionado.metodoPagamento}</p>
//                   <p><strong>Status:</strong> {reciboSelecionado.statusPagamento}</p>
//                   <p><strong>Data:</strong> {reciboSelecionado.dataPagamento}</p>
//                 </div>

//                 <Button
//                   onClick={baixarReciboPDF}
//                   className="mt-4 w-full flex items-center justify-center gap-2"
//                   variant="default"
//                 >
//                   <Download size={16} /> Baixar PDF
//                 </Button>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </div>
//     </ContentLayout>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Clock, Wallet, CheckCircle, XCircle, Users, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import jsPDF from "jspdf";

interface Pagamento {
  id: number;
  taxaNome: string;
  valorPago: number;
  metodo: string;
  data: string;
  status: "CONCLUIDO" | "PENDENTE" | "FALHOU";
  usuarioNome?: string;
}

interface Recibo {
  reciboId: number;
  nomeUsuario: string;
  telefone: string;
  morada: string;
  email: string;
  perfil: string;
  nomeTaxa: string;
  valorTaxa: number;
  periodicidade: string;
  valorPago: number;
  metodoPagamento: string;
  statusPagamento: string;
  dataPagamento: string;
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
  const [filtroStatus, setFiltroStatus] = useState<"ALL" | "CONCLUIDO" | "PENDENTE" | "FALHOU">("ALL");
  const [filtroNome, setFiltroNome] = useState<string>("");
  const [filtroValor, setFiltroValor] = useState<string>("");
  const [reciboSelecionado, setReciboSelecionado] = useState<Recibo | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

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

        const url = perfil === "ADMIN" ? "/pagamentos" : `/usuarios/${userId}/pagamentos`;

        const { data } = await api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let lista: Pagamento[] = [];

        if (!data.success) {
          setErro("Não foi possível carregar os pagamentos.");
          return;
        }

        if (perfil === "ADMIN" && Array.isArray(data.data)) {
          lista = data.data.map((p: any) => ({
            id: p.id,
            taxaNome: p.taxa?.nome || "—",
            valorPago: Number(p.valorPago || 0),
            metodo: p.metodo,
            data: new Date(p.data).toLocaleDateString("pt-PT"),
            status:
              p.status === "PAGO"
                ? "CONCLUIDO"
                : p.status === "PENDENTE"
                  ? "PENDENTE"
                  : "FALHOU",
            usuarioNome: p.usuario?.nome || "—",
          }));
        } else if (perfil !== "ADMIN" && data.data.pagamentos) {
          lista = data.data.pagamentos.map((p: any) => ({
            id: p.id,
            taxaNome: p.taxa?.nome || "—",
            valorPago: Number(p.valorPago || 0),
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
  }, []);

  const pagamentosFiltrados = pagamentos
    .filter(p => filtroStatus === "ALL" ? true : p.status === filtroStatus)
    .filter(p => p.taxaNome.toLowerCase().includes(filtroNome.toLowerCase()))
    .filter(p => filtroValor ? p.valorPago.toString().includes(filtroValor) : true);

  async function handleRecibo(pagamentoId: number) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await api.get(`/pagamentos/${pagamentoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success && data.recibo) {
        setReciboSelecionado(data.recibo);
        setModalAberto(true);
      }
    } catch (err) {
      console.error("Erro ao buscar recibo:", err);
    }
  }

  function baixarReciboPDF() {
    if (!reciboSelecionado) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("RECIBO DE PAGAMENTO", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Nome: ${reciboSelecionado.nomeUsuario}`, 20, 40);
    doc.text(`Telefone: ${reciboSelecionado.telefone}`, 20, 50);
    doc.text(`Morada: ${reciboSelecionado.morada}`, 20, 60);
    doc.text(`Email: ${reciboSelecionado.email}`, 20, 70);
    doc.text(`Perfil: ${reciboSelecionado.perfil}`, 20, 80);
    doc.text(`Taxa: ${reciboSelecionado.nomeTaxa}`, 20, 90);
    doc.text(`Valor da Taxa: ${reciboSelecionado.valorTaxa.toLocaleString()} MZN`, 20, 100);
    doc.text(`Periodicidade: ${reciboSelecionado.periodicidade}`, 20, 110);
    doc.text(`Valor Pago: ${reciboSelecionado.valorPago.toLocaleString()} MZN`, 20, 120);
    doc.text(`Método: ${reciboSelecionado.metodoPagamento}`, 20, 130);
    doc.text(`Status: ${reciboSelecionado.statusPagamento}`, 20, 140);
    doc.text(`Data: ${reciboSelecionado.dataPagamento}`, 20, 150);

    doc.save(`recibo_${reciboSelecionado.reciboId}.pdf`);
  }

  return (
    <ContentLayout title="Histórico de Pagamentos">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-[90rem] mx-auto shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
          <CardHeader className="mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <CreditCard size={24} /> Pagamentos Recentes
            </CardTitle>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-200 font-medium text-sm mb-1">
                  Status
                </label>
                <select
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  value={filtroStatus}
                  onChange={e => setFiltroStatus(e.target.value as any)}
                >
                  <option value="ALL">Todos</option>
                  <option value="CONCLUIDO">Concluídos</option>
                  <option value="PENDENTE">Pendentes</option>
                  <option value="FALHOU">Falhou</option>
                </select>
              </div>

              {/* Filtrar por taxa */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-200 font-medium text-sm mb-1">
                  Taxa
                </label>
                <input
                  type="text"
                  placeholder="Filtrar por taxa"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  value={filtroNome}
                  onChange={e => setFiltroNome(e.target.value)}
                />
              </div>

              {/* Filtrar por valor */}
              <div className="flex flex-col">
                <label className="text-gray-700 dark:text-gray-200 font-medium text-sm mb-1">
                  Valor
                </label>
                <input
                  type="text"
                  placeholder="Filtrar por valor"
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  value={filtroValor}
                  onChange={e => setFiltroValor(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>


          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-indigo-100 dark:bg-indigo-800 rounded-xl h-28 p-3"
                ></div>
              ))
              : pagamentosFiltrados.length === 0
                ? (
                  <p className="text-gray-700 dark:text-gray-200 text-center col-span-full">
                    Nenhum pagamento encontrado.
                  </p>
                )
                : pagamentosFiltrados.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col justify-between bg-indigo-50 dark:bg-indigo-900 rounded-xl p-3 shadow border border-indigo-200 dark:border-indigo-700 hover:scale-105 transition-transform duration-200"
                  >
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100 font-semibold">
                        <Wallet size={14} /> {p.taxaNome}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <Clock size={14} /> {p.data}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <CreditCard size={14} /> {p.metodo}
                      </p>
                      <p className="text-gray-800 dark:text-gray-100 font-bold">
                        {p.valorPago.toLocaleString()} MZN
                      </p>
                      {p.usuarioNome && (
                        <p className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 font-medium">
                          <Users size={14} /> {p.usuarioNome}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {p.status === "CONCLUIDO" && <CheckCircle className="text-green-600" />}
                        {p.status === "PENDENTE" && <Clock className="text-yellow-500" />}
                        {p.status === "FALHOU" && <XCircle className="text-red-600" />}
                        <span className="text-gray-800 dark:text-gray-100 font-semibold text-sm">
                          {p.status}
                        </span>
                      </div>

                      {p.status === "CONCLUIDO" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => handleRecibo(p.id)}
                        >
                          <FileText size={14} /> Recibo
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
          </CardContent>
        </Card>

        {/* Modal de Recibo */}
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent className="max-w-md rounded-2xl border border-indigo-300 dark:border-indigo-600 bg-white dark:bg-gray-800 p-6 shadow-lg">
            {reciboSelecionado && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                  <p className="font-semibold">{reciboSelecionado.nomeUsuario}</p>
                  <p>{reciboSelecionado.email}</p>
                  <p>{reciboSelecionado.telefone}</p>
                  <p>{reciboSelecionado.morada}</p>
                </div>

                <div className="pt-2 space-y-1">
                  <p><strong>Taxa:</strong> {reciboSelecionado.nomeTaxa}</p>
                  <p><strong>Valor da Taxa:</strong> {reciboSelecionado.valorTaxa.toLocaleString()} MZN</p>
                  <p><strong>Periodicidade:</strong> {reciboSelecionado.periodicidade}</p>
                  <p><strong>Valor Pago:</strong> {reciboSelecionado.valorPago.toLocaleString()} MZN</p>
                  <p><strong>Método:</strong> {reciboSelecionado.metodoPagamento}</p>
                  <p><strong>Status:</strong> {reciboSelecionado.statusPagamento}</p>
                  <p><strong>Data:</strong> {reciboSelecionado.dataPagamento}</p>
                </div>

                <Button
                  onClick={baixarReciboPDF}
                  className="mt-4 w-full flex items-center justify-center gap-2"
                  variant="default"
                >
                  <Download size={16} /> Baixar PDF
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}
