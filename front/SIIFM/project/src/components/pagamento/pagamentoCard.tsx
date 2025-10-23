// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { CreditCard, Clock, RefreshCw, Wallet } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";



// export interface Taxa {
//     id: number;
//     nome: string;
//     valor: number;
// }

// export interface PagamentoResponse {
//     status: string;
//     reciboPdfUrl: string;
//     data: string;
// }

// interface PagamentoCardProps {
//     taxas: Taxa[];
//     onPagamentoGerado: (data: PagamentoResponse) => void;
// }

// export default function PagamentoCard({ taxas, onPagamentoGerado }: PagamentoCardProps) {
//     const [taxaSelecionadaId, setTaxaSelecionadaId] = useState<number | null>(null);
//     const [valor, setValor] = useState(0);
//     const [emissao, setEmissao] = useState("");
//     const [validade, setValidade] = useState("");
//     const [metodo, setMetodo] = useState<string>("E-MOLA");
//     const metodosPagamento = ["E-MOLA", "M-PESA", "CASH"];

//     // Atualiza campos ao selecionar taxa
//     useEffect(() => {
//         const taxa = taxas.find(t => t.id === taxaSelecionadaId);
//         if (taxa) {
//             setValor(taxa.valor);
//             const hoje = new Date();
//             setEmissao(hoje.toLocaleDateString());
//             const dataValidade = new Date();
//             dataValidade.setDate(hoje.getDate() + 30);
//             setValidade(dataValidade.toLocaleDateString());
//         } else {
//             setValor(0);
//             setEmissao("");
//             setValidade("");
//         }
//     }, [taxaSelecionadaId, taxas]);

//     // POST pagamento
//     const gerarPagamento = async () => {
//         if (!taxaSelecionadaId) return;
//         try {
//             const res = await fetch("/api/pagamento", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     idTaxa: taxaSelecionadaId,
//                     valor,
//                     metodo,
//                 }),
//             });
//             const data: PagamentoResponse = await res.json();
//             onPagamentoGerado(data);
//         } catch (err) {
//             console.error("Erro ao gerar pagamento", err);
//         }
//     };

//     return (


//         <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-indigo-200 dark:border-indigo-700 max-w-4xl w-full">

//             <div className="grid md:grid-cols-2 gap-6">
//                 {/* Coluna 1: Taxa e Valor */}
//                 <div className="space-y-4">
//                     <div>
//                         <Label className="flex items-center gap-2">
//                             <CreditCard size={18} /> Taxa / Licença
//                         </Label>
//                         <Select
//                             value={taxaSelecionadaId?.toString() || ""}
//                             onValueChange={(val) => setTaxaSelecionadaId(Number(val))}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Selecione a taxa" />
//                             </SelectTrigger>
//                             <SelectContent className="max-h-60 overflow-y-auto">
//                                 {taxas.map((t) => (
//                                     <SelectItem key={t.id} value={t.id.toString()}>
//                                         {t.nome}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div>
//                         <Label className="flex items-center gap-2">
//                             <Wallet size={18} /> Valor (MZN)
//                         </Label>
//                         <Input value={valor ? valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300" />
//                     </div>
//                 </div>

//                 {/* Coluna 2: Emissão, Validade e Método */}
//                 <div className="space-y-4">
//                     <div>
//                         <Label className="flex items-center gap-2">
//                             <Clock size={18} /> Data de Emissão
//                         </Label>
//                         <Input value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
//                     </div>

//                     <div>
//                         <Label className="flex items-center gap-2">
//                             <Clock size={18} /> Validade
//                         </Label>
//                         <Input value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
//                     </div>

//                     <div>
//                         <Label className="flex items-center gap-2">
//                             <CreditCard size={18} /> Método
//                         </Label>
//                         <Select value={metodo} onValueChange={setMetodo}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Selecione o método" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {metodosPagamento.map((m) => (
//                                     <SelectItem key={m} value={m}>
//                                         {m}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>



//                 </div>
//             </div>
//             <div className="flex justify-center w-full mt-4">
//                 <Button
//                     className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 transition-colors duration-300"
//                     onClick={gerarPagamento}
//                     disabled={!taxaSelecionadaId}
//                 >
//                     <RefreshCw size={18} /> Gerar Referência
//                 </Button>
//             </div>
//         </div>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Clock, RefreshCw, Wallet } from "lucide-react";

export interface Taxa {
  id: number;
  nome: string;
  valor: number;
}

interface PagamentoCardProps {
  taxas: Taxa[];
  onPagamentoSelecionado: (pagamento: { idTaxa: number; valor: number; metodo: string }) => void;
}

export default function PagamentoCard({ taxas, onPagamentoSelecionado }: PagamentoCardProps) {
  const [taxaSelecionadaId, setTaxaSelecionadaId] = useState<number | null>(null);
  const [valor, setValor] = useState(0);
  const [emissao, setEmissao] = useState("");
  const [validade, setValidade] = useState("");
  const [metodo, setMetodo] = useState<string>("E-MOLA");
  const metodosPagamento = ["E-MOLA", "M-PESA", "CASH"];

  // Atualiza campos ao selecionar taxa
  useEffect(() => {
    const taxa = taxas.find(t => t.id === taxaSelecionadaId);
    if (taxa) {
      setValor(taxa.valor);
      const hoje = new Date();
      setEmissao(hoje.toLocaleDateString());
      const dataValidade = new Date();
      dataValidade.setDate(hoje.getDate() + 30);
      setValidade(dataValidade.toLocaleDateString());
    } else {
      setValor(0);
      setEmissao("");
      setValidade("");
    }
  }, [taxaSelecionadaId, taxas]);

  // Dispara callback ao clicar em "Gerar Referência"
  const handleGerar = () => {
    if (!taxaSelecionadaId) return;
    onPagamentoSelecionado({
      idTaxa: taxaSelecionadaId,
      valor,
      metodo,
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-indigo-200 dark:border-indigo-700 max-w-4xl w-full">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Coluna 1: Taxa e Valor */}
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              <CreditCard size={18} /> Taxa / Licença
            </Label>
            <Select
              value={taxaSelecionadaId?.toString() || ""}
              onValueChange={val => setTaxaSelecionadaId(Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a taxa" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {taxas.map(t => (
                  <SelectItem key={t.id} value={t.id.toString()}>{t.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Wallet size={18} /> Valor (MZN)
            </Label>
            <Input value={valor ? valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300" />
          </div>
        </div>

        {/* Coluna 2: Emissão, Validade e Método */}
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              <Clock size={18} /> Data de Emissão
            </Label>
            <Input value={emissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Clock size={18} /> Validade
            </Label>
            <Input value={validade} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <CreditCard size={18} /> Método
            </Label>
            <Select value={metodo} onValueChange={setMetodo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                {metodosPagamento.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mt-4">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 transition-colors duration-300"
          onClick={handleGerar}
          disabled={!taxaSelecionadaId}
        >
          <RefreshCw size={18} /> Gerar Referência
        </Button>
      </div>
    </div>
  );
}
