// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import {
//   PlusCircle,
//   Settings2,
//   Calendar,
//   DollarSign,
//   Edit,
//   Trash2,
//   Check,
//   X,
//   AlertCircle,
//   Search,
//   ArrowUpDown,
// } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import api from "@/lib/api";

// interface Taxa {
//   id: number;
//   nome: string;
//   valor: number;
//   periodicidade: string;
//   data?: string;
// }

// export default function GestaoTaxas() {
//   const [taxas, setTaxas] = useState<Taxa[]>([]);
//   const [novaTaxa, setNovaTaxa] = useState({ nome: "", valor: "", periodicidade: "Mensal" });
//   const [editando, setEditando] = useState<number | null>(null);
//   const [taxaEditada, setTaxaEditada] = useState({ nome: "", valor: "", periodicidade: "" });
//   const [erro, setErro] = useState<string | null>(null);
//   const [filtro, setFiltro] = useState<string>("");
//   const [ordenarPor, setOrdenarPor] = useState<"nome" | "valor" | "periodicidade">("nome");

//   useEffect(() => {
//     async function fetchTaxas() {
//       try {
//         const { data } = await api.get("/taxas");
//         const taxasArray = Array.isArray(data.data) ? data.data : [data.data];
//         setTaxas(taxasArray);
//       } catch (err) {
//         console.error(err);
//         setErro("Falha ao carregar taxas. Tente novamente mais tarde.");
//       }
//     }
//     fetchTaxas();
//   }, []);

//   const handleAddTaxa = async () => {
//     if (!novaTaxa.nome || !novaTaxa.valor || !novaTaxa.periodicidade) {
//       setErro("Preencha todos os campos.");
//       return;
//     }
//     try {
//       const { data } = await api.post("/taxas", {
//         nome: novaTaxa.nome,
//         valor: parseFloat(novaTaxa.valor),
//         periodicidade: novaTaxa.periodicidade,
//       });
//       setTaxas([...taxas, data]);
//       setNovaTaxa({ nome: "", valor: "", periodicidade: "Mensal" });
//       setErro(null);
//     } catch (err) {
//       console.error(err);
//       setErro("Erro ao cadastrar a taxa.");
//     }
//   };

//   const handleSave = async (id: number) => {
//     try {
//       const { data } = await api.put(`/taxas/${id}`, {
//         nome: taxaEditada.nome,
//         valor: parseFloat(taxaEditada.valor),
//         periodicidade: taxaEditada.periodicidade,
//       });
//       setTaxas(taxas.map((t) => (t.id === id ? data : t)));
//       setEditando(null);
//       setErro(null);
//     } catch (err) {
//       console.error(err);
//       setErro("Erro ao salvar alterações.");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await api.delete(`/taxas/${id}`);
//       setTaxas(taxas.filter((t) => t.id !== id));
//     } catch (err) {
//       console.error(err);
//       setErro("Erro ao excluir a taxa.");
//     }
//   };

//   // Filtrar e ordenar taxas
//   const taxasFiltradas = taxas
//     .filter((t) => t.nome.toLowerCase().includes(filtro.toLowerCase()))
//     .sort((a, b) => {
//       if (ordenarPor === "nome") return a.nome.localeCompare(b.nome);
//       if (ordenarPor === "valor") return a.valor - b.valor;
//       return a.periodicidade.localeCompare(b.periodicidade);
//     });

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="flex-1 p-6 md:p-10">
//         <ContentLayout title="Gestão de Taxas">
//           <div className="w-full max-w-6xl mx-auto">
//             <Card className="shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//               <CardHeader className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//                   <Settings2 size={26} /> Gestão de Taxas
//                 </CardTitle>
//                 <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
//                   <Input
//                     placeholder="Buscar taxa..."
//                     value={filtro}
//                     onChange={(e) => setFiltro(e.target.value)}
//                     className="flex-1 md:w-64"
//                     icon={<Search />}
//                   />
//                   <Select
//                     value={ordenarPor}
//                     onValueChange={(v) => setOrdenarPor(v as any)}
//                   >
//                     <SelectTrigger className="w-48">
//                       <SelectValue placeholder="Ordenar por" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="nome">Nome</SelectItem>
//                       <SelectItem value="valor">Valor</SelectItem>
//                       <SelectItem value="periodicidade">Periodicidade</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 {erro && (
//                   <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-6">
//                     <AlertCircle size={20} /> {erro}
//                   </div>
//                 )}

//                 {/* Formulário de nova taxa */}
//                 <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
//                   <Input
//                     placeholder="Nome da taxa"
//                     value={novaTaxa.nome}
//                     onChange={(e) => setNovaTaxa({ ...novaTaxa, nome: e.target.value })}
//                     className="flex-1"
//                   />
//                   <Input
//                     placeholder="Valor"
//                     type="number"
//                     value={novaTaxa.valor}
//                     onChange={(e) => setNovaTaxa({ ...novaTaxa, valor: e.target.value })}
//                   />
//                   <Select
//                     value={novaTaxa.periodicidade}
//                     onValueChange={(v) => setNovaTaxa({ ...novaTaxa, periodicidade: v })}
//                   >
//                     <SelectTrigger className="w-48">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Diária">Diária</SelectItem>
//                       <SelectItem value="Semanal">Semanal</SelectItem>
//                       <SelectItem value="Mensal">Mensal</SelectItem>
//                       <SelectItem value="Anual">Anual</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Button
//                     className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
//                     onClick={handleAddTaxa}
//                   >
//                     <PlusCircle size={18} /> Adicionar
//                   </Button>
//                 </div>

//                 {/* Lista de taxas com animação */}
//                 <div className="space-y-4">
//                   {taxasFiltradas.length === 0 && (
//                     <p className="text-gray-700 dark:text-gray-200 text-center">
//                       Nenhuma taxa encontrada.
//                     </p>
//                   )}

//                   <AnimatePresence>
//                     {taxasFiltradas.map((t) => (
//                       <motion.div
//                         key={t.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.3 }}
//                         className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl border border-indigo-200 dark:border-indigo-700"
//                       >
//                         <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
//                           {editando === t.id ? (
//                             <>
//                               <Input
//                                 value={taxaEditada.nome}
//                                 onChange={(e) =>
//                                   setTaxaEditada({ ...taxaEditada, nome: e.target.value })
//                                 }
//                                 className="md:w-48"
//                               />
//                               <Input
//                                 type="number"
//                                 value={taxaEditada.valor}
//                                 onChange={(e) =>
//                                   setTaxaEditada({ ...taxaEditada, valor: e.target.value })
//                                 }
//                                 className="md:w-24"
//                               />
//                               <Select
//                                 value={taxaEditada.periodicidade}
//                                 onValueChange={(v) =>
//                                   setTaxaEditada({ ...taxaEditada, periodicidade: v })
//                                 }
//                               >
//                                 <SelectTrigger className="w-32">
//                                   <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="Diária">Diária</SelectItem>
//                                   <SelectItem value="Semanal">Semanal</SelectItem>
//                                   <SelectItem value="Mensal">Mensal</SelectItem>
//                                   <SelectItem value="Anual">Anual</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </>
//                           ) : (
//                             <>
//                               <span className="font-semibold text-gray-800 dark:text-gray-100">
//                                 {t.nome}
//                               </span>
//                               <span className="text-gray-700 dark:text-gray-200">
//                                 {t.valor.toLocaleString("pt-MZ", {
//                                   style: "currency",
//                                   currency: "MZN",
//                                 })}
//                               </span>
//                               <span className="text-gray-600 dark:text-gray-300">{t.periodicidade}</span>
//                             </>
//                           )}
//                         </div>

//                         <div className="flex gap-2 mt-2 md:mt-0">
//                           {editando === t.id ? (
//                             <>
//                               <Button
//                                 className="bg-green-600 hover:bg-green-700 text-white"
//                                 onClick={() => handleSave(t.id)}
//                               >
//                                 <Check size={16} />
//                               </Button>
//                               <Button
//                                 className="bg-gray-400 hover:bg-gray-500 text-white"
//                                 onClick={() => setEditando(null)}
//                               >
//                                 <X size={16} />
//                               </Button>
//                             </>
//                           ) : (
//                             <>
//                               <Button
//                                 className="bg-yellow-500 hover:bg-yellow-600 text-white"
//                                 onClick={() => {
//                                   setEditando(t.id);
//                                   setTaxaEditada({
//                                     nome: t.nome,
//                                     valor: t.valor.toString(),
//                                     periodicidade: t.periodicidade,
//                                   });
//                                 }}
//                               >
//                                 <Edit size={16} />
//                               </Button>
//                               <Button
//                                 className="bg-red-600 hover:bg-red-700 text-white"
//                                 onClick={() => handleDelete(t.id)}
//                               >
//                                 <Trash2 size={16} />
//                               </Button>
//                             </>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </ContentLayout>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Edit,
  Trash2,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { VisuallyHidden } from "@/components/ui/visually-hidden";
import api from "@/lib/api";

interface Taxa {
  id: number;
  nome?: string;
  valor?: number;
  periodicidade?: string;
}

export default function GestaoTaxa() {
  const [taxas, setTaxas] = useState<Taxa[]>([]);
  const [novaTaxa, setNovaTaxa] = useState({ nome: "", valor: "", periodicidade: "Mensal" });
  const [editando, setEditando] = useState<number | null>(null);
  const [taxaEditada, setTaxaEditada] = useState({ nome: "", valor: "", periodicidade: "" });
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("");
  const [ordenarPor, setOrdenarPor] = useState<"nome" | "valor" | "periodicidade">("nome");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [taxaExcluir, setTaxaExcluir] = useState<Taxa | null>(null);

  const page = useRef(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadTaxas(true);
  }, []);

  const loadTaxas = async (reset = false) => {
    if (!hasMore && !reset) return;
    try {
      setLoading(true);
      const { data } = await api.get("/taxas", { params: { page: reset ? 1 : page.current, limit } });
      const taxasArray = Array.isArray(data.data) ? data.data : [data.data];
      setTaxas((prev) => (reset ? taxasArray : [...prev, ...taxasArray]));
      setHasMore(taxasArray.length === limit);
      page.current = reset ? 2 : page.current + 1;
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar taxas.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTaxa = async () => {
    if (!novaTaxa.nome || !novaTaxa.valor || !novaTaxa.periodicidade) {
      setErro("Preencha todos os campos.");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/taxas", {
        nome: novaTaxa.nome,
        valor: parseFloat(novaTaxa.valor),
        periodicidade: novaTaxa.periodicidade,
      });
      setTaxas([data, ...taxas]);
      setNovaTaxa({ nome: "", valor: "", periodicidade: "Mensal" });
      setErro(null);
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar taxa.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await api.put(`/taxas/${id}`, {
        nome: taxaEditada.nome,
        valor: parseFloat(taxaEditada.valor),
        periodicidade: taxaEditada.periodicidade,
      });
      setTaxas(taxas.map((t) => (t.id === id ? data : t)));
      setEditando(null);
      setErro(null);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar alterações.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!taxaExcluir) return;
    try {
      setLoading(true);
      await api.delete(`/taxas/${taxaExcluir.id}`);
      setTaxas(taxas.filter((t) => t.id !== taxaExcluir.id));
      setModalOpen(false);
      setTaxaExcluir(null);
    } catch (err) {
      console.error(err);
      setErro("Erro ao excluir taxa.");
    } finally {
      setLoading(false);
    }
  };

  const taxasFiltradas = taxas
    .filter((t) => t.nome?.toLowerCase().includes(filtro.toLowerCase()) ?? false)
    .sort((a, b) => {
      if (ordenarPor === "nome") return (a.nome ?? "").localeCompare(b.nome ?? "");
      if (ordenarPor === "valor") return (a.valor ?? 0) - (b.valor ?? 0);
      return (a.periodicidade ?? "").localeCompare(b.periodicidade ?? "");
    });

  return (
    <ContentLayout title="Gestão de Taxas Premium">
      {/* Card de cadastro */}
      <Card className="shadow-xl rounded-2xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 mb-6 p-6 md:p-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <PlusCircle size={22} /> Nova Taxa
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Nome da Taxa</label>
            <Input
              placeholder="Nome da taxa"
              value={novaTaxa.nome}
              onChange={(e) => setNovaTaxa({ ...novaTaxa, nome: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Valor</label>
            <Input
              type="number"
              placeholder="Valor"
              value={novaTaxa.valor}
              onChange={(e) => setNovaTaxa({ ...novaTaxa, valor: e.target.value })}
              className="w-32"
            />
          </div>
          <Select value={novaTaxa.periodicidade} onValueChange={(v) => setNovaTaxa({ ...novaTaxa, periodicidade: v })}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Diária">Diária</SelectItem>
              <SelectItem value="Semanal">Semanal</SelectItem>
              <SelectItem value="Mensal">Mensal</SelectItem>
              <SelectItem value="Anual">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-2" onClick={handleAddTaxa}>
            Adicionar
          </Button>
        </CardContent>
      </Card>

      {/* Filtro e ordenação */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 p-4 md:p-6 mb-4 rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Input
          placeholder="Buscar taxa..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="flex-1 md:w-64"
        />
        <Select value={ordenarPor} onValueChange={(v) => setOrdenarPor(v as any)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nome">Nome</SelectItem>
            <SelectItem value="valor">Valor</SelectItem>
            <SelectItem value="periodicidade">Periodicidade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de taxas */}
      <div className="space-y-4 max-h-[60vh] overflow-auto pr-2">
        {taxasFiltradas.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-200 text-center">Nenhuma taxa encontrada.</p>
        ) : (
          <AnimatePresence>
            {taxasFiltradas.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl border border-indigo-200 dark:border-indigo-700"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                  {editando === t.id ? (
                    <>
                      <Input value={taxaEditada.nome} onChange={(e) => setTaxaEditada({ ...taxaEditada, nome: e.target.value })} className="md:w-48" />
                      <Input type="number" value={taxaEditada.valor} onChange={(e) => setTaxaEditada({ ...taxaEditada, valor: e.target.value })} className="md:w-24" />
                      <Select value={taxaEditada.periodicidade} onValueChange={(v) => setTaxaEditada({ ...taxaEditada, periodicidade: v })}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Diária">Diária</SelectItem>
                          <SelectItem value="Semanal">Semanal</SelectItem>
                          <SelectItem value="Mensal">Mensal</SelectItem>
                          <SelectItem value="Anual">Anual</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">{t.nome ?? "-"}</span>
                      <span className="text-gray-700 dark:text-gray-200">
                        {t.valor?.toLocaleString("pt-MZ", { style: "currency", currency: "MZN" }) ?? "-"}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{t.periodicidade ?? "-"}</span>
                    </>
                  )}
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  {editando === t.id ? (
                    <>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleSave(t.id)}>
                        <Check size={16} />
                      </Button>
                      <Button className="bg-gray-400 hover:bg-gray-500 text-white" onClick={() => setEditando(null)}>
                        <X size={16} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { setEditando(t.id); setTaxaEditada({ nome: t.nome ?? "", valor: t.valor?.toString() ?? "", periodicidade: t.periodicidade ?? "Mensal" }); }}>
                        <Edit size={16} />
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { setTaxaExcluir(t); setModalOpen(true); }}>
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {loading && (
          <div className="flex justify-center mt-4">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
          </div>
        )}
      </div>

      {/* Modal de exclusão bloqueante */}
      <Dialog open={modalOpen} modal onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogTitle>
            <span className="text-lg font-semibold">Confirmar exclusão</span>
          </DialogTitle>
          <p className="mb-4">Deseja realmente excluir a taxa "{taxaExcluir?.nome}"?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
}


