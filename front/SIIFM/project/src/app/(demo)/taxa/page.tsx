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

  // Buscar taxas da API
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

  // Adicionar nova taxa
  async function handleAddTaxa(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!novaTaxa.nome || !novaTaxa.valor || !novaTaxa.periodicidade) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const { data } = await api.post("/taxas", {
        nome: novaTaxa.nome,
        valor: parseFloat(novaTaxa.valor),
        periodicidade: novaTaxa.periodicidade,
      });

      if (data.success) {
        const novaTaxaArray = Array.isArray(data.data) ? data.data : [data.data];
        setTaxas([...taxas, ...novaTaxaArray]);
        setNovaTaxa({ nome: "", valor: "", periodicidade: "" });
      } else {
        setErro(data.message || "Erro ao criar taxa.");
      }
    } catch (err) {
      console.error(err);
      setErro("Erro de comunicação com o servidor.");
    }
  }

  // Iniciar edição
  function handleEdit(taxa: Taxa) {
    setEditando(taxa.id);
    setTaxaEditada({
      nome: taxa.nome,
      valor: taxa.valor.toString(),
      periodicidade: taxa.periodicidade,
    });
    setErro(null);
  }

  // Salvar edição
  async function handleSave(id: number) {
    setErro(null);
    if (!taxaEditada.nome || !taxaEditada.valor || !taxaEditada.periodicidade) {
      setErro("Todos os campos são obrigatórios para edição.");
      return;
    }

    try {
      const { data } = await api.put(`/taxas/${id}`, {
        nome: taxaEditada.nome,
        valor: parseFloat(taxaEditada.valor),
        periodicidade: taxaEditada.periodicidade,
      });

      if (data.success) {
        setTaxas(taxas.map((t) => (t.id === id ? data.data : t)));
        setEditando(null);
      } else {
        setErro(data.message || "Erro ao atualizar taxa.");
      }
    } catch (err) {
      console.error(err);
      setErro("Erro de comunicação com o servidor.");
    }
  }

  // Excluir taxa
  async function handleDelete(id: number) {
    setErro(null);
    try {
      const { data } = await api.delete(`/taxas/${id}`);
      if (data.success) {
        setTaxas(taxas.filter((t) => t.id !== id));
      } else {
        setErro(data.message || "Erro ao excluir taxa.");
      }
    } catch (err) {
      console.error(err);
      setErro("Erro de comunicação com o servidor.");
    }
  }

  return (
    <ContentLayout title="Gestão de Taxas">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-5xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
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

            {/* Formulário */}
            <form
              onSubmit={handleAddTaxa}
              className="flex flex-col md:flex-row md:items-end gap-4 mb-10"
            >
              <div className="flex-1">
                <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">
                  Nome da Taxa
                </label>
                <Input
                  placeholder="Ex: Taxa de Radio"
                  value={novaTaxa.nome}
                  onChange={(e) => setNovaTaxa({ ...novaTaxa, nome: e.target.value })}
                  className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">
                  Valor (MZN)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 100"
                  value={novaTaxa.valor}
                  onChange={(e) => setNovaTaxa({ ...novaTaxa, valor: e.target.value })}
                  className="w-36 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-800 dark:text-gray-100 mb-2 font-semibold">
                  Periodicidade
                </label>
                <Select
                  onValueChange={(v) => setNovaTaxa({ ...novaTaxa, periodicidade: v })}
                  value={novaTaxa.periodicidade}
                >
                  <SelectTrigger className="w-40 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensal">Mensal</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                    <SelectItem value="Única">Única</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 flex items-center gap-2 px-6 transition-all duration-300"
              >
                <PlusCircle size={18} /> Adicionar
              </Button>
            </form>

            {/* Lista de Taxas */}
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
                  {editando === t.id ? (
                    <div className="w-full space-y-2">
                      <Input
                        value={taxaEditada.nome}
                        onChange={(e) =>
                          setTaxaEditada({ ...taxaEditada, nome: e.target.value })
                        }
                        className="dark:bg-gray-700"
                      />
                      <Input
                        type="number"
                        value={taxaEditada.valor}
                        onChange={(e) =>
                          setTaxaEditada({ ...taxaEditada, valor: e.target.value })
                        }
                        className="dark:bg-gray-700"
                      />
                      <Select
                        onValueChange={(v) =>
                          setTaxaEditada({ ...taxaEditada, periodicidade: v })
                        }
                        value={taxaEditada.periodicidade}
                      >
                        <SelectTrigger className="dark:bg-gray-700">
                          <SelectValue placeholder="Periodicidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mensal">Mensal</SelectItem>
                          <SelectItem value="Anual">Anual</SelectItem>
                          <SelectItem value="Única">Única</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                        <Settings2 size={16} /> {t.nome}
                      </p>
                      <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                        <DollarSign size={16} /> {Number(t.valor).toLocaleString()} MZN
                      </p>
                      <p className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                        <Calendar size={16} /> {t.periodicidade}
                      </p>
                      {t.data && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Criada em: {t.data}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    {editando === t.id ? (
                      <>
                        <Button
                          onClick={() => handleSave(t.id)}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        >
                          <Check size={16} /> Salvar
                        </Button>
                        <Button
                          onClick={() => setEditando(null)}
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <X size={16} /> Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEdit(t)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                        >
                          <Edit size={16} /> Editar
                        </Button>
                        <Button
                          onClick={() => handleDelete(t.id)}
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Excluir
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
