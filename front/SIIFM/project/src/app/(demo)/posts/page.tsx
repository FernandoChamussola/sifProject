

// export default function PostsPage() {
//   return (
//     <ContentLayout title="All Posts">
//       <h1>All Posts</h1>
//     </ContentLayout>
//   );
// // }



// "use client";

// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";

// // app/pagamento/page.tsx


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

//   // Atualiza os campos automaticamente ao selecionar a taxa
//   useEffect(() => {
//     const item = taxas.find((t) => t.nome === taxaSelecionada);
//     if (item) {
//       setValor(item.valor);
//       const hoje = new Date();
//       setEmissao(hoje.toLocaleDateString());
//       const dataValidade = new Date();
//       dataValidade.setDate(hoje.getDate() + item.validadeDias);
//       setValidade(dataValidade.toLocaleDateString());
//       setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
//     } else {
//       setValor(0);
//       setEmissao("");
//       setValidade("");
//       setReferencia("");
//     }
//   }, [taxaSelecionada]);

//   return (
//       <ContentLayout title="All Posts">


//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex flex-col items-center p-6">

//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Pagamento de Taxa / Licença</h1>

//       <Card className="w-full max-w-lg shadow-lg border border-indigo-300">
//         <CardHeader className="bg-indigo-50">
//           <CardTitle className="text-xl font-semibold">Dados do Pagamento</CardTitle>
//           <span>Preencha ou selecione a taxa para gerar a referência de pagamento</span>
//         </CardHeader>

//         <CardContent className="space-y-4 p-6">

//           {/* Seleção de taxa/licença */}
//           <div className="grid w-full items-center gap-1.5">
//             <Label htmlFor="taxa">Taxa / Licença</Label>
//             <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//               <SelectTrigger id="taxa">
//                 <SelectValue placeholder="Selecione a taxa" />
//               </SelectTrigger>
//               <SelectContent>
//                 {taxas.map((t) => (
//                   <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Valor */}
//           <div className="grid w-full items-center gap-1.5">
//             <Label htmlFor="valor">Valor (MZN)</Label>
//             <Input id="valor" value={valor.toLocaleString()} readOnly className="font-bold text-lg text-indigo-700" />
//           </div>

//           {/* Data de emissão */}
//           <div className="grid w-full items-center gap-1.5">
//             <Label htmlFor="emissao">Data de Emissão</Label>
//             <Input id="emissao" value={emissao} readOnly className="bg-indigo-50" />
//           </div>

//           {/* Validade */}
//           <div className="grid w-full items-center gap-1.5">
//             <Label htmlFor="validade">Validade</Label>
//             <Input id="validade" value={validade} readOnly className="bg-indigo-50" />
//           </div>

//           {/* Referência */}
//           <div className="grid w-full items-center gap-1.5">
//             <Label htmlFor="referencia">Referência de Pagamento</Label>
//             <Input id="referencia" value={referencia} readOnly className="font-mono text-sm text-indigo-800" />
//           </div>

//           <Separator className="my-4" />

//           {/* Botão */}
//           <Button
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-lg"
//             onClick={() => alert(`Pagamento de ${taxaSelecionada} (${valor} MZN) realizado!\nReferência: ${referencia}`)}
//             disabled={!taxaSelecionada}
//           >
//             Pagar
//           </Button>
//         </CardContent>
//       </Card>

//     </div>

//    </ContentLayout>

//   );
// }




"use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
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

//   useEffect(() => {
//     const item = taxas.find((t) => t.nome === taxaSelecionada);
//     if (item) {
//       setValor(item.valor);
//       const hoje = new Date();
//       setEmissao(hoje.toLocaleDateString());
//       const dataValidade = new Date();
//       dataValidade.setDate(hoje.getDate() + item.validadeDias);
//       setValidade(dataValidade.toLocaleDateString());
//       setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
//     } else {
//       setValor(0);
//       setEmissao("");
//       setValidade("");
//       setReferencia("");
//     }
//   }, [taxaSelecionada]);

//   return (

//     <ContentLayout title="All Posts">

//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex flex-col items-center p-6">

//       <h1 className="text-3xl font-bold text-gray-800 mb-6"></h1>

//       <Card className="w-full max-w-5xl shadow-lg border border-indigo-300">
//         <CardHeader className="bg-indigo-50">
//           <CardTitle className="text-xl font-semibold">Dados do Pagamento</CardTitle>
//           <p className="text-gray-600 text-sm mt-1">
//             Selecione a taxa para gerar a referência de pagamento
//           </p>
//         </CardHeader>

//         <CardContent className="flex flex-col md:flex-row md:space-x-6 p-6">
//           {/* Coluna 1 */}
//           <div className="flex-1 space-y-4">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="taxa">Taxa / Licença</Label>
//               <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                 <SelectTrigger id="taxa">
//                   <SelectValue placeholder="Selecione a taxa" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {taxas.map((t) => (
//                     <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="valor">Valor (MZN)</Label>
//               <Input id="valor" value={valor.toLocaleString()} readOnly className="font-bold text-lg text-indigo-700" />
//             </div>
//           </div>

//           {/* Coluna 2 */}
//           <div className="flex-1 space-y-4 mt-4 md:mt-0">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="emissao">Data de Emissão</Label>
//               <Input id="emissao" value={emissao} readOnly className="bg-indigo-50" />
//             </div>

//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="validade">Validade</Label>
//               <Input id="validade" value={validade} readOnly className="bg-indigo-50" />
//             </div>

//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="referencia">Referência</Label>
//               <Input id="referencia" value={referencia} readOnly className="font-mono text-sm text-indigo-800" />
//             </div>

//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-lg mt-2"
//               onClick={() => alert(`Pagamento de ${taxaSelecionada} (${valor} MZN) realizado!\nReferência: ${referencia}`)}
//               disabled={!taxaSelecionada}
//             >
//               Gerar Referencia
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Separator className="my-8" />

//     </div>

//      </ContentLayout>

//   );
// }


// app/pagamento/page.tsx

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

//   useEffect(() => {
//     const item = taxas.find((t) => t.nome === taxaSelecionada);
//     if (item) {
//       setValor(item.valor);
//       const hoje = new Date();
//       setEmissao(hoje.toLocaleDateString());
//       const dataValidade = new Date();
//       dataValidade.setDate(hoje.getDate() + item.validadeDias);
//       setValidade(dataValidade.toLocaleDateString());
//       setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
//     } else {
//       setValor(0);
//       setEmissao("");
//       setValidade("");
//       setReferencia("");
//     }
//   }, [taxaSelecionada]);

//   const gerarPDF = () => {
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

//     <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex flex-col items-center p-6">

//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Pagamento de Taxa / Licença</h1>

//       {/* Card principal de seleção */}
//       <Card className="w-full max-w-5xl shadow-lg border border-indigo-300 mb-6">
//         <CardHeader className="bg-indigo-50">
//           <CardTitle className="text-xl font-semibold">Escolha a Taxa</CardTitle>
//           <p className="text-gray-600 text-sm mt-1">Selecione a taxa para gerar os dados do pagamento</p>
//         </CardHeader>

//         <CardContent className="flex flex-col md:flex-row md:space-x-6 p-6">
//           {/* Coluna 1 */}
//           <div className="flex-1 space-y-4">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="taxa">Taxa / Licença</Label>
//               <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
//                 <SelectTrigger id="taxa">
//                   <SelectValue placeholder="Selecione a taxa" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {taxas.map((t) => (
//                     <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="valor">Valor (MZN)</Label>
//               <Input id="valor" value={valor.toLocaleString()} readOnly className="font-bold text-lg text-indigo-700" />
//             </div>
//           </div>

//           {/* Coluna 2 */}
//           <div className="flex-1 space-y-4 mt-4 md:mt-0">
//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="emissao">Data de Emissão</Label>
//               <Input id="emissao" value={emissao} readOnly className="bg-indigo-50" />
//             </div>

//             <div className="grid w-full items-center gap-1.5">
//               <Label htmlFor="validade">Validade</Label>
//               <Input id="validade" value={validade} readOnly className="bg-indigo-50" />
//             </div>

//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-lg mt-2"
//               onClick={() => alert(`Pagamento de ${taxaSelecionada} (${valor} MZN) realizado!`)}
//               disabled={!taxaSelecionada}
//             >
//               Pagar
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Card da referência */}
//       {referencia && (
//         <Card className="w-full max-w-2xl shadow-lg border border-indigo-300 mb-6 bg-indigo-50">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold">Referência de Pagamento</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0">
//             <div>
//               <p className="text-gray-700"><span className="font-bold">Referência:</span> {referencia}</p>
//               <p className="text-gray-700"><span className="font-bold">Taxa / Licença:</span> {taxaSelecionada}</p>
//               <p className="text-gray-700"><span className="font-bold">Valor:</span> {valor.toLocaleString()} MZN</p>
//               <p className="text-gray-700"><span className="font-bold">Data de Emissão:</span> {emissao}</p>
//               <p className="text-gray-700"><span className="font-bold">Validade:</span> {validade}</p>
//             </div>
//             <Button
//               className="bg-green-600 hover:bg-green-700 text-white"
//               onClick={gerarPDF}
//             >
//               Exportar PDF
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//      </ContentLayout>

//   );
// }




"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import jsPDF from "jspdf";
import { ContentLayout } from "@/components/admin-panel/content-layout";

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

  // Atualiza os campos visíveis sempre que seleciona a taxa
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
    setReferencia(`REF-${Math.floor(Math.random() * 1000000)}`);
    setReferenciaGerada(true);
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
    <ContentLayout title="All Posts">

      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">

        {/* Card de seleção e campos visíveis */}
        <Card className="w-full max-w-5xl shadow-lg border border-indigo-300 dark:border-indigo-700 mb-6 bg-white dark:bg-gray-800">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Escolha a Taxa</CardTitle>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Selecione a taxa para gerar a referência</p>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:space-x-6 p-6">
            {/* Coluna 1 */}
            <div className="flex-1 space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="taxa" className="text-gray-800 dark:text-gray-200">Taxa / Licença</Label>
                <Select value={taxaSelecionada} onValueChange={setTaxaSelecionada}>
                  <SelectTrigger id="taxa" className="dark:bg-gray-700 dark:text-gray-100">
                    <SelectValue placeholder="Selecione a taxa" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:text-gray-100">
                    {taxas.map((t) => (
                      <SelectItem key={t.nome} value={t.nome}>{t.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="valor" className="text-gray-800 dark:text-gray-200">Valor (MZN)</Label>
                <Input id="valor" value={valor ? valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300 dark:bg-gray-700" />
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="flex-1 space-y-4 mt-4 md:mt-0">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="emissao" className="text-gray-800 dark:text-gray-200">Data de Emissão</Label>
                <Input id="emissao" value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="validade" className="text-gray-800 dark:text-gray-200">Validade</Label>
                <Input id="validade" value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100" />
              </div>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 text-lg mt-2"
                onClick={gerarReferencia}
                disabled={!taxaSelecionada}
              >
                Gerar Referência
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card da referência (aparece somente após clicar) */}
        {referenciaGerada && (
          <Card className="w-full max-w-2xl shadow-lg border border-indigo-300 dark:border-indigo-700 mb-6 bg-indigo-50 dark:bg-indigo-900">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">Referência de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0">
              <div className="text-gray-800 dark:text-gray-100">
                <p><span className="font-bold">Referência:</span> {referencia}</p>
                <p><span className="font-bold">Taxa / Licença:</span> {taxaSelecionada}</p>
                <p><span className="font-bold">Valor:</span> {valor.toLocaleString()} MZN</p>
                <p><span className="font-bold">Data de Emissão:</span> {emissao}</p>
                <p><span className="font-bold">Validade:</span> {validade}</p>
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
                onClick={exportarPDF}
              >
                Exportar PDF
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ContentLayout>
  );
}
