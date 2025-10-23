"use client";

import { useState, useEffect } from "react";
import PagamentoCard, { Taxa } from "@/components/pagamento/pagamentoCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/admin-panel/content-layout";

// Função para extrair usuárioId do token JWT
function getUsuarioIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.userId; // conforme seu token
  } catch (err) {
    console.error("Erro ao ler token", err);
    return null;
  }
}

// Interface do pagamento retornado
interface PagamentoResponse {
  success: boolean;
  message: string;
  data: any; // dados do pagamento
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
    reciboPdfUrl:string;

  };
}

export default function PagamentoPage() {
  const [taxas, setTaxas] = useState<Taxa[]>([]);
  const [pagamentoData, setPagamentoData] = useState<PagamentoResponse | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Buscar taxas do backend
  useEffect(() => {
    async function fetchTaxas() {
      try {
        const res = await fetch("/api/taxa");
        const data: Taxa[] = await res.json();
        setTaxas(data);
      } catch (err) {
        console.error("Erro ao buscar taxas", err);
      }
    }
    fetchTaxas();
  }, []);

  // Abrir modal quando pagamento é gerado
  useEffect(() => {
    if (pagamentoData) setModalAberto(true);
  }, [pagamentoData]);

  // Função para processar pagamento
  const handlePagamento = async (pagamento: { taxaId: number; valorPago: number; metodo: string }) => {
    const usuarioId = getUsuarioIdFromToken();
    if (!usuarioId) {
      alert("Usuário não autenticado");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/pagamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId,
          taxaId: pagamento.taxaId,
          valorPago: pagamento.valorPago,
          metodo: pagamento.metodo,
          status: "PAGO",
        }),
      });

      const data: PagamentoResponse = await res.json();
      if (data.success) {
        setPagamentoData(data);
      } else {
        alert("Erro ao processar pagamento: " + data.message);
      }
    } catch (err) {
      console.error("Erro ao gerar pagamento", err);
      alert("Falha na conexão com o servidor");
    }
  };

  return (
    <ContentLayout title="Pagamentos">
      <div className="max-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 space-y-8">
        <PagamentoCard
          taxas={taxas}
          onPagamentoSelecionado={(pagamento) =>
            handlePagamento({
              taxaId: pagamento.idTaxa,
              valorPago: pagamento.valor,
              metodo: pagamento.metodo,
            })
          }
        />

        {/* Modal de confirmação */}
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogContent className="max-w-lg rounded-3xl bg-white dark:bg-gray-800 p-8 relative">
            {pagamentoData && (
              <div className="space-y-3 mt-4 text-gray-800 dark:text-gray-100">
                <p><span className="font-semibold">Status:</span> {pagamentoData.recibo.statusPagamento}</p>
                <p><span className="font-semibold">Data:</span> {pagamentoData.recibo.dataPagamento}</p>
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

              {pagamentoData?.recibo && (
                <a
                  href={pagamentoData.recibo.reciboPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 flex items-center gap-2">
                    <FileCheck size={16} /> Abrir Recibo
                  </Button>
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}
