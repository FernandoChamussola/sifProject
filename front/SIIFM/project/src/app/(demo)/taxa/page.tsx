"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  PlusCircle,
  Settings2,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import api from "@/lib/api";

interface Taxa {
  id: number;
  nome: string;
  valor: number;
  periodicidade: string;
  data?: string;
}

export default function GestaoTaxas() {
  const [taxas, setTaxas] = useState<Taxa[]>([]);
  const [novaTaxa, setNovaTaxa] = useState({ nome: "", valor: "", periodicidade: "" });
  const [editando, setEditando] = useState<number | null>(null);
  const [taxaEditada, setTaxaEditada] = useState({ nome: "", valor: "", periodicidade: "" });
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTaxas() {
      try {
        const { data } = await api.get("/taxas");
        const taxasArray = Array.isArray(data.data) ? data.data : [data.data];
        setTaxas(taxasArray);
      } catch (err) {
        console.error(err);
        setErro("Falha ao carregar taxas. Tente novamente mais tarde.");
      }
    }
    fetchTaxas();
  }, []);

  // Funções handleAddTaxa, handleEdit, handleSave, handleDelete continuam iguais

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="flex-1 p-6">
        <ContentLayout title="Gestão de Taxas">
          <div className="w-full max-w-5xl mx-auto">
            <Card className="shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
              <CardHeader className="mb-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                  <Settings2 size={26} /> Gestão de Taxas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Banner de erro */}
                {erro && (
                  <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    <AlertCircle size={20} /> {erro}
                  </div>
                )}
                {/* Formulário de nova taxa */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // função handleAddTaxa aqui
                  }}
                  className="flex flex-col md:flex-row md:items-end gap-4 mb-10"
                >
                  {/* Inputs de nome, valor e periodicidade + botão */}
                </form>
                {/* Lista de taxas */}
                <div className="space-y-4">
                  {taxas.length === 0 && (
                    <p className="text-gray-700 dark:text-gray-200 text-center">
                      Nenhuma taxa cadastrada.
                    </p>
                  )}
                  {taxas.map((t) => (
                    <motion.div
                      key={t.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
                    >
                      {/* Conteúdo da taxa + botões de editar/excluir */}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ContentLayout>
      </div>
    </div>
  );
}
