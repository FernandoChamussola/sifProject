

// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { CreditCard, Clock, Wallet } from "lucide-react";

// export interface Taxa {
//   id: number;
//   nome: string;
//   valor: number;
//   periodicidade: string;
// }

// interface PagamentoCardProps {
//   taxas: Taxa[];
//   onPagamentoSelecionado: (pagamento: { idTaxa: number; valor: number; metodo: string }) => void;
// }

// export default function PagamentoCard({ taxas, onPagamentoSelecionado }: PagamentoCardProps) {
//   const [taxaSelecionada, setTaxaSelecionada] = useState<Taxa | null>(null);
//   const [metodo, setMetodo] = useState<string>("E-MOLA");
//   const metodosPagamento = ["E-MOLA", "M-PESA", "CASH"];

//   const hoje = new Date();
//   const dataEmissao = hoje.toLocaleDateString();
//   const dataValidade = new Date();
//   dataValidade.setDate(hoje.getDate() + 30);

//   const handleGerar = () => {
//     if (!taxaSelecionada) return;
//     onPagamentoSelecionado({
//       idTaxa: taxaSelecionada.id,
//       valor: taxaSelecionada.valor,
//       metodo
//     });
//   };

//   return (
//     <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg max-w-4xl w-full">
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <Label className="flex items-center gap-2">
//               <CreditCard size={18} /> Taxa / Licença
//             </Label>
//             <Select
//               value={taxaSelecionada?.id.toString() || ""}
//               onValueChange={(val) => {
//                 const taxa = taxas.find(t => t.id === Number(val)) || null;
//                 setTaxaSelecionada(taxa);
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Selecione a taxa" />
//               </SelectTrigger>
//               <SelectContent className="max-h-60 overflow-y-auto">
//                 {taxas.map(t => (
//                   <SelectItem key={t.id} value={t.id.toString()}>
//                     {t.nome} — {t.valor.toLocaleString()} MZN — {t.periodicidade}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label className="flex items-center gap-2">
//               <Wallet size={18} /> Valor (MZN)
//             </Label>
//             <Input value={taxaSelecionada ? taxaSelecionada.valor.toLocaleString() : ""} readOnly className="font-bold text-lg text-indigo-700 dark:text-indigo-300" />
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <Label className="flex items-center gap-2">
//               <Clock size={18} /> Data de Emissão
//             </Label>
//             <Input value={dataEmissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
//           </div>

//           <div>
//             <Label className="flex items-center gap-2">
//               <Clock size={18} /> Validade
//             </Label>
//             <Input value={dataValidade.toLocaleDateString()} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium" />
//           </div>

//           <div>
//             <Label className="flex items-center gap-2">
//               <CreditCard size={18} /> Método
//             </Label>
//             <Select value={metodo} onValueChange={setMetodo}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Selecione o método" />
//               </SelectTrigger>
//               <SelectContent>
//                 {metodosPagamento.map(m => (
//                   <SelectItem key={m} value={m}>{m}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center w-full mt-4">
//         <Button
//           className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 flex items-center justify-center gap-2 transition-colors duration-300"
//           onClick={handleGerar}
//           disabled={!taxaSelecionada}
//         >
//           Gerar Referência
//         </Button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CreditCard, Clock, Wallet } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export interface Taxa {
  id: number;
  nome: string;
  valor: number;
  periodicidade: string;
}

interface PagamentoCardProps {
  taxas: Taxa[];
  onPagamentoSelecionado: (pagamento: { idTaxa: number; valor: number; metodo: string }) => void;
}

export default function PagamentoCard({ taxas, onPagamentoSelecionado }: PagamentoCardProps) {
  const [taxaSelecionada, setTaxaSelecionada] = useState<Taxa | null>(null);
  const [metodo, setMetodo] = useState<string>("E-MOLA");
  const metodosPagamento = ["E-MOLA", "M-PESA", "CASH"];

  const hoje = new Date();
  const dataEmissao = hoje.toLocaleDateString();
  const dataValidade = new Date();
  dataValidade.setDate(hoje.getDate() + 30);

  const handleGerar = () => {
    if (!taxaSelecionada) return;
    onPagamentoSelecionado({
      idTaxa: taxaSelecionada.id,
      valor: taxaSelecionada.valor,
      metodo
    });
  };

  return (

    <div className="flex flex-col w-full h-full p-8 bg-gray-50 dark:bg-gray-900 gap-8">

      <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
        {/* Coluna esquerda */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <CreditCard size={18} /> Taxa / Licença
            </Label>
            <Select value={taxaSelecionada?.id.toString() || ""} onValueChange={(val) => {
              const taxa = taxas.find(t => t.id === Number(val)) || null;
              setTaxaSelecionada(taxa);
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a taxa" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {taxas.map(t => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    {t.nome} — {t.valor.toLocaleString()} MZN — {t.periodicidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Wallet size={18} /> Valor (MZN)
            </Label>
            <Input
              value={taxaSelecionada ? taxaSelecionada.valor.toLocaleString() : ""}
              readOnly
              className="text-indigo-700 dark:text-indigo-300 font-bold text-lg w-full"
            />
          </div>
        </div>

        {/* Coluna direita */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Clock size={18} /> Data de Emissão
            </Label>
            <Input value={dataEmissao} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Clock size={18} /> Validade
            </Label>
            <Input value={dataValidade.toLocaleDateString()} readOnly className="bg-indigo-50 dark:bg-indigo-900 dark:text-gray-100 font-medium w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <CreditCard size={18} /> Método de Pagamento
            </Label>
            <Select value={metodo} onValueChange={setMetodo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {metodosPagamento.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* campos aqui */}
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-3 w-full transition-all duration-300"
          onClick={handleGerar}
          disabled={!taxaSelecionada}
        >
          Gerar Referência
        </Button>
      </div>


    </div>

  );
}
