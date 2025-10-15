


// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import jsPDF from "jspdf";

// export default function PagamentoPage() {
//   const taxas = [
//     { nome: "Licença A", valor: 100, validadeDias: 30 },
//     { nome: "Licença B", valor: 200, validadeDias: 90 },
//     { nome: "Licença C", valor: 300, validadeDias: 180 },
//   ];

//   const [taxaSelecionada, setTaxaSelecionada] = useState("");
//   const [valor, setValor] = useState(0);
//   const [emissao, setEmissao] = useState("");
//   const [validade, setValidade] = useState("");
//   const [referencia, setReferencia] = useState("");
//   const [referenciaGerada, setReferenciaGerada] = useState(false);

//   // Atualiza os campos visíveis sempre que seleciona a taxa
//   useEffect(() => {
//     const item = taxas.find((t) => t.nome === taxaSelecionada);
//     if (item) {
//       setValor(item.valor);
//       const hoje = new Date();
//       setEmissao(hoje.toLocaleDateString());
//       const dataValidade = new Date();
//       dataValidade.setDate(hoje.getDate() + item.validadeDias);
//       setValidade(dataValidade.toLocaleDateString());
//     } else {
//       setValor(0);
//       setEmissao("");
//       setValidade("");
//       setReferencia("");
//       setReferenciaGerada(false);
//     }
//   }, [taxaSelecionada]);

//   const gerarReferencia = () => {
//     if (!taxaSelecionada) return;
//     setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
//     setReferenciaGerada(true);
//   };

//   const exportarPDF = () => {
//     if (!referenciaGerada) return;
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Recibo de Pagamento", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Taxa / Licença: ${taxaSelecionada}`, 20, 40);
//     doc.text(`Valor: ${valor} MZN`, 20, 50);
//     doc.text(`Data de Emissão: ${emissao}`, 20, 60);
//     doc.text(`Validade: ${validade}`, 20, 70);
//     doc.text(`Referência: ${referencia}`, 20, 80);
//     doc.save(`Recibo-${referencia}.pdf`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//       <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Pagamento de Taxa / Licença</h1>

//       {/* Card de seleção e campos visíveis */}
//       <Card className="w-full max-w-5xl shadow-lg border border-indigo-300 dark:border-indigo-700 mb-6 bg-white dark:bg-gray-800">
//         <CardHeader className="bg-indigo-50 dark:bg-indigo-900">
//           <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Escolha a Taxa</CardTitle>
//           <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Selecione a taxa para gerar a referência</p>
//         </CardHeader>
//         <CardContent className="flex flex-col md:flex-row md:space-x-6 p-6">
//           {/* Coluna 1 */}
//           <div className="flex-1 space-y-4">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="taxa" className="text-gray-800 dark:text-gray-200">Taxa / Licença</Label>
//               <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                 <SelectTrigger id="taxa" className="dark:bg-gray-700 dark:text-gray-100">
//                   <SelectValue placeholder="Selecione a taxa" />
//                 </SelectTrigger>
//                 <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
//                   {taxas.map((t) => (
//                     <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="valor" className="text-gray-800 dark:text-gray-200">Valor (MZN)</Label>
//               <Input id="valor" value={valor ? valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700" />
//             </div>
//           </div>

//           {/* Coluna 2 */}
//           <div className="flex-1 space-y-4 mt-4 md:mt-0">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="emissao" className="text-gray-800 dark:text-gray-200">Data de Emissão</Label>
//               <Input id="emissao" value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100" />
//             </div>
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="validade" className="text-gray-800 dark:text-gray-200">Validade</Label>
//               <Input id="validade" value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100" />
//             </div>
//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 text-lg mt-2"
//               onClick={gerarReferencia}
//               disabled={!taxaSelecionada}
//             >
//               Gerar Referência
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Card da referência (aparece somente após clicar) */}
//       {referenciaGerada && (
//         <Card className="w-full max-w-2xl shadow-lg border border-indigo-300 dark:border-indigo-700 mb-6 bg-indigo-50 dark:bg-indigo-900">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Referência de Pagamento</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0">
//             <div className="text-gray-800 dark:text-gray-100">
//               <p><span className="font-bold">Referência:</span> {referencia}</p>
//               <p><span className="font-bold">Taxa / Licença:</span> {taxaSelecionada}</p>
//               <p><span className="font-bold">Valor:</span> {valor.toLocaleString()} MZN</p>
//               <p><span className="font-bold">Data de Emissão:</span> {emissao}</p>
//               <p><span className="font-bold">Validade:</span> {validade}</p>
//             </div>
//             <Button
//               className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
//               onClick={exportarPDF}
//             >
//               Exportar PDF
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { CreditCard, Clock, DollarSign, FileCheck, RefreshCw, X } from "lucide-react";
// import jsPDF from "jspdf";

// const taxas = [
//   { nome: "Licença A", valor: 100, validadeDias: 30 },
//   { nome: "Licença B", valor: 200, validadeDias: 90 },
//   { nome: "Licença C", valor: 300, validadeDias: 180 },
// ];

// export default function PagamentoPage() {
//   const [taxaSelecionada, setTaxaSelecionada] = useState("");
//   const [valor, setValor] = useState(0);
//   const [emissao, setEmissao] = useState("");
//   const [validade, setValidade] = useState("");
//   const [referencia, setReferencia] = useState("");
//   const [modalAberto, setModalAberto] = useState(false);

//   useEffect(() => {
//     const item = taxas.find((t) => t.nome === taxaSelecionada);
//     if (item) {
//       setValor(item.valor);
//       const hoje = new Date();
//       setEmissao(hoje.toLocaleDateString());
//       const dataValidade = new Date();
//       dataValidade.setDate(hoje.getDate() + item.validadeDias);
//       setValidade(dataValidade.toLocaleDateString());
//     } else {
//       setValor(0);
//       setEmissao("");
//       setValidade("");
//       setReferencia("");
//     }
//   }, [taxaSelecionada]);

//   const gerarReferencia = () => {
//     if (!taxaSelecionada) return;
//     setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
//     setModalAberto(true);
//   };

//   const exportarPDF = () => {
//     if (!referencia) return;
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Recibo de Pagamento", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Taxa / Licença: ${taxaSelecionada}`, 20, 40);
//     doc.text(`Valor: ${valor} MZN`, 20, 50);
//     doc.text(`Data de Emissão: ${emissao}`, 20, 60);
//     doc.text(`Validade: ${validade}`, 20, 70);
//     doc.text(`Referência: ${referencia}`, 20, 80);
//     doc.save(`Recibo-${referencia}.pdf`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
//       <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12">
//         Pagamento de Taxa / Licença
//       </h1>

//       {/* Card principal */}
//       <Card className="w-full max-w-4xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//         <CardHeader className="mb-6">
//           <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//             <CreditCard size={26} /> Selecione a Taxa
//           </CardTitle>
//         </CardHeader>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Coluna esquerda */}
//           <div className="space-y-6">
//             <div className="flex flex-col gap-2">
//               <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//                 <CreditCard size={18} /> Taxa / Licença
//               </Label>
//               <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                 <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100">
//                   <SelectValue placeholder="Selecione a taxa" />
//                 </SelectTrigger>
//                 <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
//                   {taxas.map((t) => (
//                     <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//                 <DollarSign size={18} /> Valor (MZN)
//               </Label>
//               <Input
//                 value={valor ? valor.toLocaleString() : ""}
//                 readOnly
//                 className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700"
//               />
//             </div>
//           </div>

//           {/* Coluna direita */}
//           <div className="space-y-6">
//             <div className="flex flex-col gap-2">
//               <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//                 <Clock size={18} /> Data de Emissão
//               </Label>
//               <Input value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
//             </div>

//             <div className="flex flex-col gap-2">
//               <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
//                 <Clock size={18} /> Validade
//               </Label>
//               <Input value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
//             </div>

//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 transition-colors duration-300"
//               onClick={gerarReferencia}
//               disabled={!taxaSelecionada}
//             >
//               <RefreshCw size={18} /> Gerar Referência
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Modal de referência */}
//       <Dialog open={modalAberto} onOpenChange={setModalAberto}>
//         <DialogContent className="max-w-lg rounded-3xl bg-white dark:bg-gray-800 p-8 relative">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-xl font-bold text-green-600 dark:text-green-400">
//               <FileCheck size={20} /> Referência Gerada
//             </DialogTitle>
//           </DialogHeader>

//           <div className="space-y-3 mt-4 text-gray-800 dark:text-gray-100">
//             <p><span className="font-semibold">Referência:</span> {referencia}</p>
//             <p><span className="font-semibold">Taxa / Licença:</span> {taxaSelecionada}</p>
//             <p><span className="font-semibold">Valor:</span> {valor.toLocaleString()} MZN</p>
//             <p><span className="font-semibold">Data de Emissão:</span> {emissao}</p>
//             <p><span className="font-semibold">Validade:</span> {validade}</p>
//           </div>

//           <div className="flex justify-end gap-4 mt-6">
//             <Button
//               variant="outline"
//               className="flex items-center gap-2"
//               onClick={() => setModalAberto(false)}
//             >
//               <X size={16} /> Fechar
//             </Button>
//             <Button
//               className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2"
//               onClick={exportarPDF}
//             >
//               <FileCheck size={16} /> Exportar PDF
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Clock, DollarSign, FileCheck, RefreshCw, X } from "lucide-react";

interface Taxa {
  id: number;
  nome: string;
  valor: number;
}

interface PagamentoResponse {
  status: string;
  reciboPdfUrl: string;
  data: string;
}

export default function PagamentoPage() {
  const [taxas, setTaxas] = useState<Taxa[]>([]);
  const [taxaSelecionadaId, setTaxaSelecionadaId] = useState<number | null>(null);
  const [valor, setValor] = useState(0);
  const [emissao, setEmissao] = useState("");
  const [validade, setValidade] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [pagamentoData, setPagamentoData] = useState<PagamentoResponse | null>(null);

  // GET: buscar taxas do backend
  useEffect(() => {
    async function fetchTaxas() {
      try {
        const res = await fetch("/api/pagamento"); // endpoint GET
        const data: Taxa[] = await res.json();
        setTaxas(data);
      } catch (err) {
        console.error("Erro ao buscar taxas", err);
      }
    }
    fetchTaxas();
  }, []);

  // Atualiza valor, emissão e validade ao selecionar taxa
  useEffect(() => {
    const taxa = taxas.find(t => t.id === taxaSelecionadaId);
    if (taxa) {
      setValor(taxa.valor);
      const hoje = new Date();
      setEmissao(hoje.toLocaleDateString());
      const dataValidade = new Date();
      dataValidade.setDate(hoje.getDate() + 30); // exemplo: validade 30 dias
      setValidade(dataValidade.toLocaleDateString());
    } else {
      setValor(0);
      setEmissao("");
      setValidade("");
      setPagamentoData(null);
    }
  }, [taxaSelecionadaId, taxas]);

  // POST: gerar referência/pagamento
  const gerarPagamento = async () => {
    if (!taxaSelecionadaId) return;
    try {
      const res = await fetch("/api/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idTaxa: taxaSelecionadaId,
          valor,
          metodo: "cartao",
        }),
      });
      const data: PagamentoResponse = await res.json();
      setPagamentoData(data);
      setModalAberto(true);
    } catch (err) {
      console.error("Erro ao gerar pagamento", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12">Pagamento de Taxa / Licença</h1>

      <Card className="w-full max-w-4xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
        <CardHeader className="mb-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
            <CreditCard size={26} /> Selecione a Taxa
          </CardTitle>
        </CardHeader>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <CreditCard size={18} /> Taxa / Licença
              </Label>
              <Select value={taxaSelecionadaId?.toString() || ""} onValueChange={(val) => setTaxaSelecionadaId(Number(val))}>
                <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100">
                  <SelectValue placeholder="Selecione a taxa" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                  {taxas.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>{t.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <DollarSign size={18} /> Valor (MZN)
              </Label>
              <Input
                value={valor ? valor.toLocaleString() : ""}
                readOnly
                className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Clock size={18} /> Data de Emissão
              </Label>
              <Input value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Clock size={18} /> Validade
              </Label>
              <Input value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={gerarPagamento}
              disabled={!taxaSelecionadaId}
            >
              <RefreshCw size={18} /> Gerar Pagamento
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de pagamento */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-lg rounded-3xl bg-white dark:bg-gray-800 p-8 relative">
         

          {pagamentoData && (
            <div className="space-y-3 mt-4 text-gray-800 dark:text-gray-100">
              <p><span className="font-semibold">Status:</span> {pagamentoData.status}</p>
              <p><span className="font-semibold">Data:</span> {pagamentoData.data}</p>
              <p><span className="font-semibold">Valor:</span> {valor.toLocaleString()} MZN</p>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setModalAberto(false)}
            >
              <X size={16} /> Fechar
            </Button>
            {pagamentoData?.reciboPdfUrl && (
              <a href={pagamentoData.reciboPdfUrl} target="_blank" rel="noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2">
                  <FileCheck size={16} /> Abrir Recibo
                </Button>
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

