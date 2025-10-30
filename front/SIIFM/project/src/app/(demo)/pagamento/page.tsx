// "use client";

// import { useState, useEffect } from "react";
// import PagamentoCard, { Taxa } from "@/components/pagamento/pagamentoCard";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { FileCheck, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import api from "@/lib/api";

// interface PagamentoResponse {
//   success: boolean;
//   message: string;
//   data: any;
//   recibo: {
//     reciboId: number;
//     nomeUsuario: string;
//     telefone: string;
//     morada: string;
//     email: string;
//     perfil: string;
//     nomeTaxa: string;
//     valorTaxa: number;
//     periodicidade: string;
//     valorPago: number;
//     metodoPagamento: string;
//     statusPagamento: string;
//     dataPagamento: string;
//     reciboPdfUrl: string;
//     referenciaPagamento?: string; // opcional, caso backend gere
//   };
// }

// // Extrair ID do usuário do token
// function getUsuarioIdFromToken() {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   try {
//     const payloadBase64 = token.split(".")[1];
//     const payload = JSON.parse(atob(payloadBase64));
//     return payload.userId;
//   } catch {
//     return null;
//   }
// }

// export default function PagamentoPage() {
//   const [taxas, setTaxas] = useState<Taxa[]>([]);
//   const [pagamentoData, setPagamentoData] = useState<PagamentoResponse | null>(null);
//   const [modalAberto, setModalAberto] = useState(false);

//   // Buscar todas as taxas
//   useEffect(() => {
//     async function fetchTaxas() {
//       try {
//         const { data } = await api.get("/taxas");
//         console.log("Taxas recebidas:", data);

//         if (data.success && Array.isArray(data.data)) {
//           setTaxas(data.data);
//         } else {
//           console.error("Formato inesperado da resposta:", data);
//         }
//       } catch (err) {
//         console.error("Erro ao buscar taxas", err);
//       }
//     }
//     fetchTaxas();
//   }, []);

//   // Abrir modal ao gerar pagamento
//   useEffect(() => {
//     if (pagamentoData) setModalAberto(true);
//   }, [pagamentoData]);

//   const handlePagamento = async (pagamento: { idTaxa: number; valor: number; metodo: string }) => {
//     const usuarioId = getUsuarioIdFromToken();
//     if (!usuarioId) {
//       alert("Usuário não autenticado");
//       return;
//     }

//     try {
//       const { data } = await api.post<PagamentoResponse>("/pagamentos", {
//         usuarioId,
//         taxaId: pagamento.idTaxa,
//         valorPago: pagamento.valor,
//         metodo: pagamento.metodo,
//         status: "PENDENTE", // ✅ Enviado como pendente
//       });

//       if (data.success) setPagamentoData(data);
//       else alert("Erro ao processar pagamento: " + data.message);
//     } catch (err) {
//       console.error("Erro ao gerar pagamento", err);
//       alert("Falha na conexão com o servidor");
//     }
//   };

//   return (
//     <ContentLayout title="Pagamentos">
//       <div className="max-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 space-y-8">
//         <PagamentoCard taxas={taxas} onPagamentoSelecionado={handlePagamento} />

//         <Dialog open={modalAberto} onOpenChange={setModalAberto}>
//           <DialogContent className="max-w-lg rounded-3xl bg-white dark:bg-gray-800 p-8 relative">
//             {pagamentoData && (
//               <div className="space-y-3 mt-4 text-gray-800 dark:text-gray-100">
//                 <p><span className="font-semibold">Status:</span> {pagamentoData.recibo.statusPagamento}</p>
//                 <p><span className="font-semibold">Data:</span> {pagamentoData.recibo.dataPagamento}</p>
//                 {pagamentoData.recibo.referenciaPagamento && (
//                   <p><span className="font-semibold">Referência:</span> {pagamentoData.recibo.referenciaPagamento}</p>
//                 )}
//               </div>
//             )}

//             <div className="flex justify-end gap-4 mt-6">
//               <Button variant="outline" className="flex items-center gap-2" onClick={() => setModalAberto(false)}>
//                 <X size={16} /> Fechar
//               </Button>

//               {pagamentoData?.recibo?.statusPagamento === "PAGO" && (
//                 <a href={pagamentoData.recibo.reciboPdfUrl} target="_blank" rel="noreferrer">
//                   <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2">
//                     <FileCheck size={16} /> Abrir Recibo
//                   </Button>
//                 </a>
//               )}
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </ContentLayout>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { FileCheck, X } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import PagamentoCard, { Taxa } from "@/components/pagamento/pagamentoCard";
// import api from "@/lib/api";

// interface PagamentoResponse {
//   success: boolean;
//   message: string;
//   data: any;
//   recibo: {
//     reciboId: number;
//     nomeUsuario: string;
//     telefone: string;
//     morada: string;
//     email: string;
//     perfil: string;
//     nomeTaxa: string;
//     valorTaxa: number;
//     periodicidade: string;
//     valorPago: number;
//     metodoPagamento: string;
//     statusPagamento: string;
//     dataPagamento: string;
//     reciboPdfUrl: string;
//     referenciaPagamento?: string;
//   };
// }

// // Extrai ID do usuário do token
// function getUsuarioIdFromToken() {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   try {
//     const payloadBase64 = token.split(".")[1];
//     const payload = JSON.parse(atob(payloadBase64));
//     return payload.userId;
//   } catch {
//     return null;
//   }
// }

// export default function PagamentoPage() {
//   const [taxas, setTaxas] = useState<Taxa[]>([]);
//   const [pagamentoData, setPagamentoData] = useState<PagamentoResponse | null>(null);
//   const [modalAberto, setModalAberto] = useState(false);

//   // Buscar taxas do backend
//   useEffect(() => {
//     async function fetchTaxas() {
//       try {
//         const { data } = await api.get("/taxas");
//         if (data.success && Array.isArray(data.data)) setTaxas(data.data);
//       } catch (err) {
//         console.error("Erro ao buscar taxas", err);
//       }
//     }
//     fetchTaxas();
//   }, []);

//   // Abrir modal quando pagamento é gerado
//   useEffect(() => {
//     if (pagamentoData) setModalAberto(true);
//   }, [pagamentoData]);

//   const handlePagamento = async (pagamento: { idTaxa: number; valor: number; metodo: string }) => {
//     const usuarioId = getUsuarioIdFromToken();
//     if (!usuarioId) return alert("Usuário não autenticado");

//     try {
//       const { data } = await api.post<PagamentoResponse>("/pagamentos", {
//         usuarioId,
//         taxaId: pagamento.idTaxa,
//         valorPago: pagamento.valor,
//         metodo: pagamento.metodo,
//         status: "PENDENTE",
//       });

//       if (data.success) setPagamentoData(data);
//       else alert("Erro: " + data.message);
//     } catch (err) {
//       console.error("Erro ao gerar pagamento", err);
//       alert("Falha na conexão com o servidor");
//     }
//   };

//   return (
//     <ContentLayout title="Pagamentos">
//       <div className="w-full flex-1 flex flex-col gap-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)]">


//         {/* Formulário ocupa toda a largura */}
//         <div className="w-full flex justify-center flex-1">
//           <div className="w-full max-w-5xl">
//             <PagamentoCard taxas={taxas} onPagamentoSelecionado={handlePagamento} />
//           </div>
//         </div>

//         {/* Modal de confirmação */}
//         <Dialog open={modalAberto} onOpenChange={setModalAberto}>
//           <DialogContent className="w-full max-w-3xl rounded-3xl bg-white dark:bg-gray-800 p-8 relative animate-fade-in">
//             {pagamentoData && (
//               <div className="space-y-3 text-gray-800 dark:text-gray-100">
//                 <p><span className="font-semibold">Status:</span> {pagamentoData.recibo.statusPagamento}</p>
//                 <p><span className="font-semibold">Data:</span> {pagamentoData.recibo.dataPagamento}</p>
//                 {pagamentoData.recibo.referenciaPagamento && (
//                   <p><span className="font-semibold">Referência:</span> {pagamentoData.recibo.referenciaPagamento}</p>
//                 )}
//               </div>
//             )}

//             <div className="flex flex-wrap justify-end gap-4 mt-6">
//               <Button variant="outline" className="flex items-center gap-2" onClick={() => setModalAberto(false)}>
//                 <X size={16} /> Fechar
//               </Button>

//               {pagamentoData?.recibo?.statusPagamento === "PAGO" && (
//                 <a href={pagamentoData.recibo.reciboPdfUrl} target="_blank" rel="noreferrer">
//                   <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2">
//                     <FileCheck size={16} /> Abrir Recibo
//                   </Button>
//                 </a>
//               )}
//             </div>
//           </DialogContent>
//         </Dialog>

//       </div>
//     </ContentLayout>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Loader2, CheckCircle2, CreditCard, Calendar, RefreshCw, X } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useToast } from "@/components/ui/Toast";


interface Taxa {
  id: number;
  nome: string;
  valor: number;
  validadeDias: number;
}

interface PagamentoResponse {
  success: boolean;
  message: string;
  data: any;
  recibo: {
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
    reciboPdfUrl: string;
    referenciaPagamento?: string;
  };
}

// Extrai ID do usuário do token
function getUsuarioIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.userId || payload.id;
  } catch {
    return null;
  }
}

export default function PagamentoPage() {
  const { showToast } = useToast();
  const [taxas, setTaxas] = useState<Taxa[]>([]);
  const [taxaSelecionada, setTaxaSelecionada] = useState<Taxa | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<string>("");
  const [emissao, setEmissao] = useState("");
  const [validade, setValidade] = useState("");
  const [loadingPagamento, setLoadingPagamento] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [pagamentoData, setPagamentoData] = useState<PagamentoResponse | null>(null);
  const [erroModal, setErroModal] = useState(false);

  const metodosPagamento = ["M-PESA", "E-MOLA", "CASH"];

  // Busca taxas do backend
  useEffect(() => {
    async function fetchTaxas() {
      try {
        const { data } = await api.get("/taxas");
        if (data.success && Array.isArray(data.data)) setTaxas(data.data);
      } catch (err) {
        // console.error("Erro ao buscar taxas", err);
        showToast("error", "Erro ao buscar taxas");
        setErroModal(true);
      }
    }
    fetchTaxas();
  }, []);

  // Atualiza datas ao selecionar taxa
  useEffect(() => {
    if (taxaSelecionada) {
      const hoje = new Date();
      setEmissao(hoje.toLocaleDateString());
      const dataValidade = new Date();
      dataValidade.setDate(hoje.getDate() + (taxaSelecionada.validadeDias || 0));
      setValidade(dataValidade.toLocaleDateString());
    } else {
      setEmissao("");
      setValidade("");
    }
  }, [taxaSelecionada]);

  const handlePagamento = async () => {
    if (!taxaSelecionada || !metodoPagamento) return setErroModal(true);
    const usuarioId = getUsuarioIdFromToken();
    if (!usuarioId) return setErroModal(true);
    showToast("warning", "processando pagamento!")
    setLoadingPagamento(true);
    setModalAberto(true);

    try {
      const { data } = await api.post<PagamentoResponse>("/pagamentos", {
        usuarioId,
        taxaId: taxaSelecionada.id,
        valorPago: taxaSelecionada.valor,
        metodo: metodoPagamento,
        status: "PENDENTE",
      });

      setPagamentoData(data);
    } catch (err) {
      showToast("error", "Erro ao gerar pagamento!")
      setErroModal(true);
    } finally {
      setLoadingPagamento(false);

      // Fecha automaticamente após 3 segundos
      setTimeout(() => setModalAberto(false), 1000);
    }
  };

  return (
    <ContentLayout title="Pagamento de Taxas / Licenças">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-10">

        {/* Card de seleção */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-5xl">
          <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-indigo-200 dark:border-indigo-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 p-6">
              <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
                <CreditCard size={26} /> Selecione a Taxa / Licença
              </CardTitle>
              <p className="text-indigo-100 mt-1 text-sm">Selecione a taxa e método para gerar a referência</p>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 p-6">

              {/* Coluna esquerda */}
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <Label className="text-gray-700 dark:text-gray-200">Taxa / Licença</Label>
                  <Select value={taxaSelecionada?.id?.toString() || ""} onValueChange={val => setTaxaSelecionada(taxas.find(t => t.id.toString() === val) || null)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 transition">
                      <SelectValue placeholder="Selecione a taxa" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                      {taxas.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label className="text-gray-700 dark:text-gray-200">Valor (MZN)</Label>
                  <Input value={taxaSelecionada ? taxaSelecionada.valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700 border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
              </div>

              {/* Coluna direita */}
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <Label className="text-gray-700 dark:text-gray-200">Método de Pagamento</Label>
                  <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
                    <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 transition">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                      {metodosPagamento.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label className="text-gray-700 dark:text-gray-200">Data de Emissão</Label>
                  <Input value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <div className="flex flex-col">
                  <Label className="text-gray-700 dark:text-gray-200">Validade</Label>
                  <Input value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition" />
                </div>
                <Button onClick={handlePagamento} disabled={!taxaSelecionada || !metodoPagamento} className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 rounded-xl transition-transform duration-200 active:scale-95">
                  {loadingPagamento ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={18} />} Gerar Pagamento
                </Button>
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* Modal de loading / sucesso */}
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent className="w-full max-w-3xl rounded-3xl bg-white dark:bg-gray-800 p-8 relative animate-fade-in">
            {loadingPagamento ? (
              <div className="flex flex-col items-center justify-center gap-4 text-gray-800 dark:text-gray-100">
                <Loader2 className="animate-spin" size={40} />
                
                <p className="text-lg font-medium">Aguarde, processando pagamento...</p>
              </div>
            ) : (
              pagamentoData && (
                <div className="space-y-3 text-gray-800 dark:text-gray-100">
                   <p className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                    <CheckCircle2 size={20} /> Pagamento realizado com sucesso!
                  </p> 
                   
                  <p><span className="font-semibold">Status:</span> {pagamentoData.recibo.statusPagamento}</p>
                  <p><span className="font-semibold">Data:</span> {pagamentoData.recibo.dataPagamento}</p>
                  {pagamentoData.recibo.referenciaPagamento && (
                    <p><span className="font-semibold">Referência:</span> {pagamentoData.recibo.referenciaPagamento}</p>
                  )}
                  {pagamentoData.recibo.reciboPdfUrl && (
                    <a href={pagamentoData.recibo.reciboPdfUrl} target="_blank" rel="noreferrer">
                      <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white flex items-center gap-2 mt-4">
                        Abrir Recibo
                      </Button>
                    </a>
                  )}
                </div>
              )
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de erro */}
        <Dialog open={erroModal} onOpenChange={setErroModal}>
          <DialogContent className="w-80 p-6 rounded-xl bg-red-100 dark:bg-red-900 flex flex-col items-center justify-center space-y-4">
            <X size={24} className="text-red-600 dark:text-red-300" />
            <p className="text-center text-red-700 dark:text-red-200 font-semibold">Falha, tente mais tarde!</p>
            <Button onClick={() => setErroModal(false)} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg">Fechar</Button>
          </DialogContent>
        </Dialog>

      </div>
    </ContentLayout>
  );
}
