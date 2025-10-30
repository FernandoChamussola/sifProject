
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import jsPDF from "jspdf";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

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
//     <ContentLayout title="All Posts">

//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">

//         {/* Card de seleção e campos visíveis */}
//         <Card className="w-full max-w-5xl shadow-lg border border-indigo-300 dark:border-indigo-700 mb-6 bg-white dark:bg-gray-800">
//           <CardHeader className="bg-indigo-50 dark:bg-indigo-900">
//             <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Escolha a Taxa</CardTitle>
//             <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Selecione a taxa para gerar a referência</p>
//           </CardHeader>
//           <CardContent className="flex flex-col md:flex-row md:space-x-6 p-6">
//             {/* Coluna 1 */}
//             <div className="flex-1 space-y-4">
//               <div className="grid w-full items-center gap-1.5">
//                 <Label htmlFor="taxa" className="text-gray-800 dark:text-gray-200">Taxa / Licença</Label>
//                 <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                   <SelectTrigger id="taxa" className="dark:bg-gray-700 dark:text-gray-100">
//                     <SelectValue placeholder="Selecione a taxa" />
//                   </SelectTrigger>
//                   <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
//                     {taxas.map((t) => (
//                       <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="grid w-full items-center gap-1.5">
//                 <Label htmlFor="valor" className="text-gray-800 dark:text-gray-200">Valor (MZN)</Label>
//                 <Input id="valor" value={valor ? valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700" />
//               </div>
//             </div>

//             {/* Coluna 2 */}
//             <div className="flex-1 space-y-4 mt-4 md:mt-0">
//               <div className="grid w-full items-center gap-1.5">
//                 <Label htmlFor="emissao" className="text-gray-800 dark:text-gray-200">Data de Emissão</Label>
//                 <Input id="emissao" value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100" />
//               </div>
//               <div className="grid w-full items-center gap-1.5">
//                 <Label htmlFor="validade" className="text-gray-800 dark:text-gray-200">Validade</Label>
//                 <Input id="validade" value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100" />
//               </div>
//               <Button
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 text-lg mt-2"
//                 onClick={gerarReferencia}
//                 disabled={!taxaSelecionada}
//               >
//                 Gerar Referência
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Card da referência (aparece somente após clicar) */}
//         {referenciaGerada && (
//           <Card className="w-full max-w-2xl shadow-lg border border-indigo-300 dark:border-indigo-700 mb-6 bg-indigo-50 dark:bg-indigo-900">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Referência de Pagamento</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0">
//               <div className="text-gray-800 dark:text-gray-100">
//                 <p><span className="font-bold">Referência:</span> {referencia}</p>
//                 <p><span className="font-bold">Taxa / Licença:</span> {taxaSelecionada}</p>
//                 <p><span className="font-bold">Valor:</span> {valor.toLocaleString()} MZN</p>
//                 <p><span className="font-bold">Data de Emissão:</span> {emissao}</p>
//                 <p><span className="font-bold">Validade:</span> {validade}</p>
//               </div>
//               <Button
//                 className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
//                 onClick={exportarPDF}
//               >
//                 Exportar PDF
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </ContentLayout>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { CreditCard, Calendar, CheckCircle2, RefreshCw } from "lucide-react";
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
//     <ContentLayout title="Pagamento de Taxas / Licenças">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-10">

//         {/* Card de seleção */}
//         <Card className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-indigo-200 dark:border-indigo-700 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//           <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 p-6">
//             <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
//               <CreditCard size={26} /> Selecione a Taxa / Licença
//             </CardTitle>
//             <p className="text-indigo-100 mt-1 text-sm">Selecione a taxa para gerar a referência de pagamento</p>
//           </CardHeader>
//           <CardContent className="grid md:grid-cols-2 gap-8 p-6">
            
//             {/* Coluna esquerda */}
//             <div className="flex flex-col space-y-5">
//               <div className="flex flex-col">
//                 <Label htmlFor="taxa" className="text-gray-700 dark:text-gray-200">Taxa / Licença</Label>
//                 <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                   <SelectTrigger id="taxa" className="dark:bg-gray-700 dark:text-gray-100">
//                     <SelectValue placeholder="Selecione a taxa" />
//                   </SelectTrigger>
//                   <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
//                     {taxas.map((t) => (
//                       <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex flex-col">
//                 <Label htmlFor="valor" className="text-gray-700 dark:text-gray-200">Valor (MZN)</Label>
//                 <Input 
//                   id="valor" 
//                   value={valor ? valor.toLocaleString() : ""} 
//                   readOnly 
//                   className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700 border border-indigo-300 dark:border-indigo-600"
//                 />
//               </div>
//             </div>

//             {/* Coluna direita */}
//             <div className="flex flex-col space-y-5">
//               <div className="flex flex-col">
//                 <Label htmlFor="emissao" className="text-gray-700 dark:text-gray-200">Data de Emissão</Label>
//                 <Input 
//                   id="emissao" 
//                   value={emissao} 
//                   readOnly 
//                   className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <Label htmlFor="validade" className="text-gray-700 dark:text-gray-200">Validade</Label>
//                 <Input 
//                   id="validade" 
//                   value={validade} 
//                   readOnly 
//                   className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600"
//                 />
//               </div>
//               <Button
//                 className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 rounded-xl transition-transform duration-200 active:scale-95"
//                 onClick={gerarReferencia}
//                 disabled={!taxaSelecionada}
//               >
//                 <RefreshCw size={18} /> Gerar Referência
//               </Button>
//             </div>

//           </CardContent>
//         </Card>

//         {/* Card da referência */}
//         {referenciaGerada && (
//           <Card className="w-full max-w-3xl bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 shadow-xl rounded-3xl border border-green-300 dark:border-green-700 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
//             <CardHeader className="p-6">
//               <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200 text-xl font-bold">
//                 <CheckCircle2 size={24} /> Referência de Pagamento
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6 p-6">
//               <div className="flex flex-col space-y-2 text-gray-800 dark:text-gray-100">
//                 <p><span className="font-semibold">Referência:</span> {referencia}</p>
//                 <p><span className="font-semibold">Taxa / Licença:</span> {taxaSelecionada}</p>
//                 <p><span className="font-semibold">Valor:</span> {valor.toLocaleString()} MZN</p>
//                 <p className="flex items-center gap-1"><Calendar size={16} /> <span className="font-semibold">Emissão:</span> {emissao}</p>
//                 <p className="flex items-center gap-1"><Calendar size={16} /> <span className="font-semibold">Validade:</span> {validade}</p>
//               </div>
//               <Button
//                 className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 px-6 font-bold rounded-xl transition-transform duration-200 active:scale-95"
//                 onClick={exportarPDF}
//               >
//                 Exportar PDF
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//       </div>
//     </ContentLayout>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { CreditCard, Calendar, CheckCircle2, RefreshCw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

export default function PagamentoPage() {
  const taxas = [
    { nome: "Licença A", valor: 100, validadeDias: 30 },
    { nome: "Licença B", valor: 200, validadeDias: 90 },
    { nome: "Licença C", valor: 300, validadeDias: 180 },
  ];

  const [taxaSelecionada, setTaxaSelecionada] = useState("");
  const [valor, setValor] = useState(0);
  const [emissao, setEmissao] = useState("");
  const [validade, setValidade] = useState("");
  const [referencia, setReferencia] = useState("");
  const [referenciaGerada, setReferenciaGerada] = useState(false);
  const [loadingReferencia, setLoadingReferencia] = useState(false);

  useEffect(() => {
    const item = taxas.find((t) => t.nome === taxaSelecionada);
    if (item) {
      setValor(item.valor);
      const hoje = new Date();
      setEmissao(hoje.toLocaleDateString());
      const dataValidade = new Date();
      dataValidade.setDate(hoje.getDate() + item.validadeDias);
      setValidade(dataValidade.toLocaleDateString());
    } else {
      setValor(0);
      setEmissao("");
      setValidade("");
      setReferencia("");
      setReferenciaGerada(false);
    }
  }, [taxaSelecionada]);

  const gerarReferencia = () => {
    if (!taxaSelecionada) return;
    setLoadingReferencia(true);

    setTimeout(() => {
      setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
      setReferenciaGerada(true);
      setLoadingReferencia(false);
    }, 600); // simula animação de loading
  };

  const exportarPDF = () => {
    if (!referenciaGerada) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Recibo de Pagamento", 20, 20);
    doc.setFontSize(12);
    doc.text(`Taxa / Licença: ${taxaSelecionada}`, 20, 40);
    doc.text(`Valor: ${valor} MZN`, 20, 50);
    doc.text(`Data de Emissão: ${emissao}`, 20, 60);
    doc.text(`Validade: ${validade}`, 20, 70);
    doc.text(`Referência: ${referencia}`, 20, 80);
    doc.save(`Recibo-${referencia}.pdf`);
  };

  return (
    <ContentLayout title="Pagamento de Taxas / Licenças">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-10">

        {/* Card de seleção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-indigo-200 dark:border-indigo-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 p-6">
              <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
                <CreditCard size={26} /> Selecione a Taxa / Licença
              </CardTitle>
              <p className="text-indigo-100 mt-1 text-sm">Selecione a taxa para gerar a referência de pagamento</p>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 p-6">

              {/* Coluna esquerda */}
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <Label htmlFor="taxa" className="text-gray-700 dark:text-gray-200">Taxa / Licença</Label>
                  <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
                    <SelectTrigger id="taxa" className="dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 transition">
                      <SelectValue placeholder="Selecione a taxa" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                      {taxas.map((t) => (
                        <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="valor" className="text-gray-700 dark:text-gray-200">Valor (MZN)</Label>
                  <Input 
                    id="valor" 
                    value={valor ? valor.toLocaleString() : ""} 
                    readOnly 
                    className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700 border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
              </div>

              {/* Coluna direita */}
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col">
                  <Label htmlFor="emissao" className="text-gray-700 dark:text-gray-200">Data de Emissão</Label>
                  <Input 
                    id="emissao" 
                    value={emissao} 
                    readOnly 
                    className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="validade" className="text-gray-700 dark:text-gray-200">Validade</Label>
                  <Input 
                    id="validade" 
                    value={validade} 
                    readOnly 
                    className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition"
                  />
                </div>
                <Button
                  className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 rounded-xl transition-transform duration-200 active:scale-95"
                  onClick={gerarReferencia}
                  disabled={!taxaSelecionada || loadingReferencia}
                >
                  {loadingReferencia ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={18} />} Gerar Referência
                </Button>
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* Card da referência */}
        {referenciaGerada && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl"
          >
            <Card className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 shadow-xl rounded-3xl border border-green-300 dark:border-green-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200 text-xl font-bold">
                  <CheckCircle2 size={24} /> Referência de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6 p-6">
                <div className="flex flex-col space-y-2 text-gray-800 dark:text-gray-100">
                  <p><span className="font-semibold">Referência:</span> {referencia}</p>
                  <p><span className="font-semibold">Taxa / Licença:</span> {taxaSelecionada}</p>
                  <p><span className="font-semibold">Valor:</span> {valor.toLocaleString()} MZN</p>
                  <p className="flex items-center gap-1"><Calendar size={16} /> <span className="font-semibold">Emissão:</span> {emissao}</p>
                  <p className="flex items-center gap-1"><Calendar size={16} /> <span className="font-semibold">Validade:</span> {validade}</p>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 px-6 font-bold rounded-xl transition-transform duration-200 active:scale-95"
                  onClick={exportarPDF}
                >
                  Exportar PDF
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </div>
    </ContentLayout>
  );
}








// dashboard


// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { CreditCard, Calendar, CheckCircle2, Loader2, RefreshCw, Clock, Wallet } from "lucide-react";
// import { motion } from "framer-motion";
// import jsPDF from "jspdf";

// export default function DashboardPagamento() {
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
//   const [loadingReferencia, setLoadingReferencia] = useState(false);

//   // Histórico simulado (pode vir da API)
//   const [historico, setHistorico] = useState([
//     { id: 1, taxa: "Licença A", valor: 100, data: "2025-10-15", status: "PAGO" },
//     { id: 2, taxa: "Licença B", valor: 200, data: "2025-10-20", status: "PENDENTE" },
//     { id: 3, taxa: "Licença C", valor: 300, data: "2025-11-01", status: "FALHOU" },
//   ]);

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
//     setLoadingReferencia(true);
//     setTimeout(() => {
//       setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
//       setReferenciaGerada(true);
//       setLoadingReferencia(false);
//     }, 600);
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

//   const resumo = {
//     total: historico.reduce((acc, h) => acc + h.valor, 0),
//     pagos: historico.filter((h) => h.status === "PAGO").length,
//     pendentes: historico.filter((h) => h.status === "PENDENTE").length,
//   };

//   return (
//     <ContentLayout title="Dashboard de Pagamentos">
//       <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 space-y-10">

//         {/* Cards de resumo */}
//         <div className="grid md:grid-cols-3 gap-6">
//           <motion.div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6 flex items-center gap-4 hover:shadow-2xl transition-shadow duration-300"
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//             <Wallet size={36} className="text-indigo-600 dark:text-indigo-400" />
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Total de Pagamentos</p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{resumo.total} MZN</p>
//             </div>
//           </motion.div>

//           <motion.div className="bg-green-100 dark:bg-green-900 shadow-lg rounded-3xl p-6 flex items-center gap-4 hover:shadow-2xl transition-shadow duration-300"
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             <CheckCircle2 size={36} className="text-green-600 dark:text-green-300" />
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Pagamentos Concluídos</p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{resumo.pagos}</p>
//             </div>
//           </motion.div>

//           <motion.div className="bg-yellow-100 dark:bg-yellow-900 shadow-lg rounded-3xl p-6 flex items-center gap-4 hover:shadow-2xl transition-shadow duration-300"
//             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
//             <Clock size={36} className="text-yellow-600 dark:text-yellow-300" />
//             <div>
//               <p className="text-gray-600 dark:text-gray-300">Pendentes</p>
//               <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{resumo.pendentes}</p>
//             </div>
//           </motion.div>
//         </div>

//         {/* Card de geração de referência */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//           <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-indigo-200 dark:border-indigo-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
//             <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-700 dark:to-indigo-800 p-6">
//               <CardTitle className="flex items-center gap-2 text-white text-2xl font-bold">
//                 <CreditCard size={26} /> Gerar Referência
//               </CardTitle>
//               <p className="text-indigo-100 mt-1 text-sm">Selecione a taxa e gere sua referência de pagamento</p>
//             </CardHeader>
//             <CardContent className="grid md:grid-cols-2 gap-8 p-6">
//               {/* Coluna esquerda */}
//               <div className="flex flex-col space-y-5">
//                 <div className="flex flex-col">
//                   <Label htmlFor="taxa" className="text-gray-700 dark:text-gray-200">Taxa / Licença</Label>
//                   <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                     <SelectTrigger id="taxa" className="dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 transition">
//                       <SelectValue placeholder="Selecione a taxa" />
//                     </SelectTrigger>
//                     <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
//                       {taxas.map((t) => (
//                         <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex flex-col">
//                   <Label htmlFor="valor" className="text-gray-700 dark:text-gray-200">Valor (MZN)</Label>
//                   <Input 
//                     id="valor" 
//                     value={valor ? valor.toLocaleString() : ""} 
//                     readOnly 
//                     className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700 border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition"
//                   />
//                 </div>
//               </div>

//               {/* Coluna direita */}
//               <div className="flex flex-col space-y-5">
//                 <div className="flex flex-col">
//                   <Label htmlFor="emissao" className="text-gray-700 dark:text-gray-200">Data de Emissão</Label>
//                   <Input id="emissao" value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition" />
//                 </div>
//                 <div className="flex flex-col">
//                   <Label htmlFor="validade" className="text-gray-700 dark:text-gray-200">Validade</Label>
//                   <Input id="validade" value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-white border border-indigo-300 dark:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition" />
//                 </div>
//                 <Button
//                   className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 rounded-xl transition-transform duration-200 active:scale-95"
//                   onClick={gerarReferencia}
//                   disabled={!taxaSelecionada || loadingReferencia}
//                 >
//                   {loadingReferencia ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={18} />} Gerar Referência
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Card da referência */}
//         {referenciaGerada && (
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
//             <Card className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 shadow-xl rounded-3xl border border-green-300 dark:border-green-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
//               <CardHeader className="p-6">
//                 <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200 text-xl font-bold">
//                   <CheckCircle2 size={24} /> Referência Gerada
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6 p-6">
//                 <div className="flex flex-col space-y-2 text-gray-800 dark:text-gray-100">
//                   <p><span className="font-semibold">Referência:</span> {referencia}</p>
//                   <p><span className="font-semibold">Taxa / Licença:</span> {taxaSelecionada}</p>
//                   <p><span className="font-semibold">Valor:</span> {valor.toLocaleString()} MZN</p>
//                   <p className="flex items-center gap-1"><Calendar size={16} /> <span className="font-semibold">Emissão:</span> {emissao}</p>
//                   <p className="flex items-center gap-1"><Calendar size={16} /> <span className="font-semibold">Validade:</span> {validade}</p>
//                 </div>
//                 <Button
//                   className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 px-6 font-bold rounded-xl transition-transform duration-200 active:scale-95"
//                   onClick={exportarPDF}
//                 >
//                   Exportar PDF
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {/* Histórico de pagamentos */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
//           <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl border border-indigo-200 dark:border-indigo-700 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
//             <CardHeader className="p-6">
//               <CardTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
//                 <Wallet size={24} /> Histórico de Pagamentos
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead className="bg-indigo-100 dark:bg-indigo-900">
//                   <tr>
//                     <th className="py-2 px-4 text-gray-800 dark:text-gray-100">ID</th>
//                     <th className="py-2 px-4 text-gray-800 dark:text-gray-100">Taxa</th>
//                     <th className="py-2 px-4 text-gray-800 dark:text-gray-100">Valor (MZN)</th>
//                     <th className="py-2 px-4 text-gray-800 dark:text-gray-100">Data</th>
//                     <th className="py-2 px-4 text-gray-800 dark:text-gray-100">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {historico.map((h) => (
//                     <tr key={h.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900 transition">
//                       <td className="py-2 px-4">{h.id}</td>
//                       <td className="py-2 px-4">{h.taxa}</td>
//                       <td className="py-2 px-4">{h.valor.toLocaleString()}</td>
//                       <td className="py-2 px-4">{h.data}</td>
//                       <td className={`py-2 px-4 font-semibold ${
//                         h.status === "PAGO" ? "text-green-600 dark:text-green-300" :
//                         h.status === "PENDENTE" ? "text-yellow-600 dark:text-yellow-300" :
//                         "text-red-600 dark:text-red-400"
//                       }`}>{h.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>
//         </motion.div>

//       </div>
//     </ContentLayout>
//   );
// }
