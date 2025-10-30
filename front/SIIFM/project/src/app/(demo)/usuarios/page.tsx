// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2, Wallet } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import api from "@/lib/api";

// interface Usuario {
//   id: number;
//   nome: string;
//   email: string;
//   telefone: string;
//   senhaHash: string;
//   perfil: "COMERCIANTE" | "ADMIN" | "CIDADAO";
//   morada: string;
//   dataCriacao: string;
// }

// interface Pagamento {
//   id: number;
//   data: string;
//   valor: number;
//   descricao: string;
// }

// export default function GestaoUsuarios() {
//   const [usuarios, setUsuarios] = useState<Usuario[]>([]);
//   const [totalUsuarios, setTotalUsuarios] = useState(0);
//   const [pagina, setPagina] = useState(1);
//   const [limit, setLimit] = useState(50);

//   const [novoUsuario, setNovoUsuario] = useState({
//     nome: "",
//     email: "",
//     telefone: "",
//     senhaHash: "",
//     perfil: "CIDADAO" as "COMERCIANTE" | "ADMIN" | "CIDADAO",
//     morada: "",
//   });

//   const [editando, setEditando] = useState<number | null>(null);
//   const [usuarioEditado, setUsuarioEditado] = useState({ ...novoUsuario });

//   const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loadingPagamentos, setLoadingPagamentos] = useState(false);

//   // Filtros e ordenação
//   const [filtroNome, setFiltroNome] = useState("");
//   const [filtroPerfil, setFiltroPerfil] = useState<"COMERCIANTE" | "ADMIN" | "CIDADAO" | "ALL">("ALL");
//   const [filtroData, setFiltroData] = useState<{ inicio?: string; fim?: string }>({});
//   const [order, setOrder] = useState<"nome" | "dataCriacao">("nome");
//   const [orderDir, setOrderDir] = useState<"asc" | "desc">("asc");

//   const fetchUsuarios = async () => {
//     try {
//       const perfilQuery = filtroPerfil === "ALL" ? "" : filtroPerfil;
//       const query = new URLSearchParams({
//         nome: filtroNome,
//         perfil: perfilQuery,
//         dataInicio: filtroData.inicio || "",
//         dataFim: filtroData.fim || "",
//         page: pagina.toString(),
//         limit: limit.toString(),
//         order,
//         orderDir
//       }).toString();

//       const { data } = await api.get<{ data: Usuario[]; total: number }>(`/usuarios?${query}`);
//       setUsuarios(Array.isArray(data.data) ? data.data : []);
//       setTotalUsuarios(data.total);
//     } catch (error) {
//       console.error("Erro ao buscar usuários:", error);
//       setUsuarios([]);
//       setTotalUsuarios(0);
//     }
//   };

//   useEffect(() => { fetchUsuarios(); }, [filtroNome, filtroPerfil, filtroData, pagina, limit, order, orderDir]);

//   const handleAddUsuario = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;
//     try {
//       await api.post("/usuarios", novoUsuario);
//       setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "CIDADAO", morada: "" });
//       setPagina(1);
//       fetchUsuarios();
//     } catch (error) {
//       console.error("Erro ao adicionar usuário:", error);
//     }
//   };

//   const handleEdit = (usuario: Usuario) => {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   };

//   const handleSave = async (id: number) => {
//     try {
//       await api.put(`/usuarios/${id}`, usuarioEditado);
//       setEditando(null);
//       fetchUsuarios();
//     } catch (error) {
//       console.error("Erro ao atualizar usuário:", error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await api.delete(`/usuarios/${id}`);
//       fetchUsuarios();
//     } catch (error) {
//       console.error("Erro ao excluir usuário:", error);
//     }
//   };

//   const handleVerPagamentos = async (usuario: Usuario) => {
//     setUsuarioSelecionado(usuario);
//     setLoadingPagamentos(true);
//     try {
//       const { data } = await api.get<Pagamento[]>(`/usuarios/${usuario.id}/pagamentos`);
//       setPagamentos(data);
//     } catch (error) {
//       console.error("Erro ao buscar pagamentos:", error);
//       setPagamentos([]);
//     } finally {
//       setLoadingPagamentos(false);
//     }
//   };

//   return (
//     <ContentLayout title="Gestão de Usuários">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-6">

//         {/* Card de Cadastro */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-4 md:p-6">
//           <CardHeader className="mb-4">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <PlusCircle size={24} /> Adicionar Usuário
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               <Input placeholder="Nome" value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
//               <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
//               <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={e => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
//               <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={e => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
//               <Input placeholder="Morada" value={novoUsuario.morada} onChange={e => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
//               <Select value={novoUsuario.perfil} onValueChange={v => setNovoUsuario({ ...novoUsuario, perfil: v as "COMERCIANTE" | "ADMIN" | "CIDADAO" })}>
//                 <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="CIDADAO">CIDADAO</SelectItem>
//                   <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2 col-span-full">
//                 Adicionar
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Card de Listagem e Filtros */}
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-4 md:p-6">
//           <CardHeader className="mb-4">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <Settings2 size={24} /> Usuários Cadastrados
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {/* Filtros */}
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
//               <Input placeholder="Filtrar por nome" value={filtroNome} onChange={e => setFiltroNome(e.target.value)} />
//               <Select value={filtroPerfil} onValueChange={v => setFiltroPerfil(v as "COMERCIANTE" | "ADMIN" | "CIDADAO" | "ALL")}>
//                 <SelectTrigger><SelectValue placeholder="Filtrar por perfil" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALL">Todos</SelectItem>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="CIDADAO">CIDADAO</SelectItem>
//                   <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Input type="date" placeholder="Data início" onChange={e => setFiltroData({ ...filtroData, inicio: e.target.value })} />
//               <Input type="date" placeholder="Data fim" onChange={e => setFiltroData({ ...filtroData, fim: e.target.value })} />
//               <Select value={order} onValueChange={v => setOrder(v as "nome" | "dataCriacao")}>
//                 <SelectTrigger><SelectValue placeholder="Ordenar por" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="nome">Nome</SelectItem>
//                   <SelectItem value="dataCriacao">Data</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Lista de usuários */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {usuarios.length === 0 ? (
//                 <p className="text-gray-700 dark:text-gray-200 text-center col-span-full">Nenhum usuário encontrado.</p>
//               ) : (
//                 usuarios.map(u => (
//                   <motion.div key={u.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}
//                     className="flex flex-col justify-between bg-indigo-50 dark:bg-indigo-900 rounded-2xl p-4 shadow border border-indigo-200 dark:border-indigo-700"
//                   >
//                     {editando === u.id ? (
//                       <div className="grid grid-cols-1 gap-2">
//                         <Input value={usuarioEditado.nome} onChange={e => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })} />
//                         <Input value={usuarioEditado.email} onChange={e => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} />
//                         <Input value={usuarioEditado.telefone} onChange={e => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })} />
//                         <Input value={usuarioEditado.morada} onChange={e => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })} />
//                         <Select value={usuarioEditado.perfil} onValueChange={v => setUsuarioEditado({ ...usuarioEditado, perfil: v as "COMERCIANTE" | "ADMIN" | "CIDADAO" })}>
//                           <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="ADMIN">ADMIN</SelectItem>
//                             <SelectItem value="CIDADAO">CIDADAO</SelectItem>
//                             <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <div className="flex gap-2 mt-2">
//                           <Button onClick={() => handleSave(u.id)} className="bg-green-600 hover:bg-green-700 text-white flex-1">Salvar</Button>
//                           <Button onClick={() => setEditando(null)} variant="destructive" className="flex-1">Cancelar</Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col gap-1">
//                         <p className="flex items-center gap-2"><User size={14} /> {u.nome}</p>
//                         <p>Email: {u.email}</p>
//                         <p>Telefone: {u.telefone}</p>
//                         <p>Morada: {u.morada}</p>
//                         <p>Perfil: {u.perfil}</p>
//                         <p className="text-gray-500 dark:text-gray-400">Criado em: {u.dataCriacao}</p>
//                         <div className="flex gap-2 mt-2">
//                           <Button onClick={() => handleEdit(u)} className="bg-blue-600 hover:bg-blue-700 text-white flex-1"><Edit size={14} /> Editar</Button>
//                           <Button onClick={() => handleDelete(u.id)} variant="destructive" className="flex-1"><Trash2 size={14} /> Excluir</Button>
//                           <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"><User size={14} /> Pagamentos</Button>
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 ))
//               )}
//             </div>

//             {/* Paginação */}
//             <div className="flex justify-between items-center mt-4">
//               <Button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>Anterior</Button>
//               <span>Página {pagina} de {Math.ceil(totalUsuarios / limit)}</span>
//               <Button onClick={() => setPagina(p => p < Math.ceil(totalUsuarios / limit) ? p + 1 : p)} disabled={pagina === Math.ceil(totalUsuarios / limit)}>Próxima</Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Modal de pagamentos */}
//         {usuarioSelecionado && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setUsuarioSelecionado(null)}></div>
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="relative bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-3xl shadow-2xl w-[550px] max-w-[90%] max-h-[70vh] overflow-y-auto flex flex-col z-10"
//             >
//               <div className="flex justify-between items-center p-4 border-b border-indigo-100 dark:border-indigo-800">
//                 <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
//                   <Wallet size={20} /> Pagamentos de {usuarioSelecionado.nome}
//                 </h3>
//                 <Button onClick={() => setUsuarioSelecionado(null)} variant="destructive" className="px-3 py-1 rounded-lg text-sm">
//                   Fechar
//                 </Button>
//               </div>
//               <div className="p-4 space-y-3">
//                 {loadingPagamentos ? (
//                   <p className="text-gray-700 dark:text-gray-200 text-sm">Carregando...</p>
//                 ) : pagamentos.length === 0 ? (
//                   <p className="text-gray-700 dark:text-gray-200 text-sm text-center">Nenhum pagamento encontrado.</p>
//                 ) : (
//                   pagamentos.map(p => (
//                     <motion.div key={p.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}
//                       className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-3 shadow-sm text-sm"
//                     >
//                       <p className="font-semibold text-gray-800 dark:text-gray-100">{p.descricao}</p>
//                       <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300"><Wallet size={14} /> Valor: {p.valor.toLocaleString()} MZN</p>
//                       <p className="text-gray-500 dark:text-gray-400">Data: {p.data}</p>
//                     </motion.div>
//                   ))
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </ContentLayout>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlusCircle, User, Edit, Trash2, Wallet, Settings2, Download } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import api from "@/lib/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senhaHash: string;
  perfil: "COMERCIANTE" | "ADMIN" | "CIDADAO";
  morada: string;
  dataCriacao: string;
}

interface Pagamento {
  id: number;
  data: string;
  valor: number;
  descricao: string;
}

export default function GestaoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [pagina, setPagina] = useState(1);
  const [limit] = useState(50);
  const [temMais, setTemMais] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senhaHash: "",
    perfil: "CIDADAO" as "COMERCIANTE" | "ADMIN" | "CIDADAO",
    morada: "",
  });

  const [editando, setEditando] = useState<number | null>(null);
  const [usuarioEditado, setUsuarioEditado] = useState({ ...novoUsuario });

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loadingPagamentos, setLoadingPagamentos] = useState(false);

  // Filtros e ordenação
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroPerfil, setFiltroPerfil] = useState<"COMERCIANTE" | "ADMIN" | "CIDADAO" | "ALL">("ALL");
  const [filtroData, setFiltroData] = useState<{inicio?: string; fim?: string}>({});
  const [order, setOrder] = useState<"nome" | "dataCriacao">("nome");
  const [orderDir, setOrderDir] = useState<"asc" | "desc">("asc");

  const fetchUsuarios = async (reset = false) => {
    try {
      const perfilQuery = filtroPerfil === "ALL" ? "" : filtroPerfil;
      const query = new URLSearchParams({
        nome: filtroNome || "",
        perfil: perfilQuery,
        dataInicio: filtroData.inicio || "",
        dataFim: filtroData.fim || "",
        page: pagina.toString(),
        limit: limit.toString(),
        order,
        orderDir
      }).toString();

      const { data } = await api.get<{ data: Usuario[]; total: number }>(`/usuarios?${query}`);
      const novosUsuarios = Array.isArray(data.data) ? data.data : [];
      setUsuarios(prev => reset ? novosUsuarios : [...prev, ...novosUsuarios]);
      setTemMais(novosUsuarios.length === limit);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      if (reset) setUsuarios([]);
      setTemMais(false);
    }
  };

  useEffect(() => {
    setPagina(1);
    fetchUsuarios(true);
  }, [filtroNome, filtroPerfil, filtroData, order, orderDir]);

  useEffect(() => {
    if (!temMais) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPagina(prev => prev + 1);
      }
    }, { threshold: 1 });
    if (observerRef.current) observer.observe(observerRef.current);
    return () => { if (observerRef.current) observer.disconnect(); };
  }, [temMais]);

  useEffect(() => {
    if (pagina === 1) return;
    fetchUsuarios();
  }, [pagina]);

  const handleAddUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;
    try {
      await api.post("/usuarios", novoUsuario);
      setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "CIDADAO", morada: "" });
      setPagina(1);
      fetchUsuarios(true);
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const handleEdit = (usuario: Usuario) => { setEditando(usuario.id); setUsuarioEditado({ ...usuario }); };
  const handleSave = async (id: number) => { try { await api.put(`/usuarios/${id}`, usuarioEditado); setEditando(null); fetchUsuarios(true); } catch (e) { console.error(e); } };
  const handleDelete = async (id: number) => { try { await api.delete(`/usuarios/${id}`); fetchUsuarios(true); } catch (e) { console.error(e); } };

  // Abrir modal de pagamentos
  const handleVerPagamentos = async (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setLoadingPagamentos(true);
    try {
      const { data } = await api.get<Pagamento[]>(`/usuarios/${usuario.id}/pagamentos`);
      setPagamentos(data);
    } catch (e) {
      console.error(e);
      setPagamentos([]);
    } finally {
      setLoadingPagamentos(false);
    }
  };

  // Baixar pagamentos em CSV
  const downloadCSV = () => {
    if (!pagamentos.length) return;
    const csvHeader = "ID,Descrição,Valor,Data\n";
    const csvRows = pagamentos.map(p => `${p.id},"${p.descricao}",${p.valor},${p.data}`).join("\n");
    const csv = csvHeader + csvRows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${usuarioSelecionado?.nome}_pagamentos.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ContentLayout title="Gestão de Usuários">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 space-y-6">
        {/* Card de Cadastro */}
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-4 md:p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <PlusCircle size={24} /> Adicionar Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Nome" value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
              <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
              <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={e => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
              <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={e => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
              <Input placeholder="Morada" value={novoUsuario.morada} onChange={e => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
              <Select value={novoUsuario.perfil} onValueChange={v => setNovoUsuario({ ...novoUsuario, perfil: v as "COMERCIANTE" | "ADMIN" | "CIDADAO" })}>
                <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="CIDADAO">CIDADAO</SelectItem>
                  <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2 col-span-full">
                Adicionar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Card de Listagem e Filtros */}
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-4 md:p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <Settings2 size={24} /> Usuários Cadastrados
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <Input placeholder="Filtrar por nome" value={filtroNome} onChange={e => setFiltroNome(e.target.value)} />
              <Select value={filtroPerfil} onValueChange={v => setFiltroPerfil(v as "COMERCIANTE" | "ADMIN" | "CIDADAO" | "ALL")}>
                <SelectTrigger><SelectValue placeholder="Filtrar por perfil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="CIDADAO">CIDADAO</SelectItem>
                  <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" placeholder="Data início" onChange={e => setFiltroData({...filtroData, inicio: e.target.value})} />
              <Input type="date" placeholder="Data fim" onChange={e => setFiltroData({...filtroData, fim: e.target.value})} />
              <Select value={order} onValueChange={v => setOrder(v as "nome" | "dataCriacao")}>
                <SelectTrigger><SelectValue placeholder="Ordenar por" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nome">Nome</SelectItem>
                  <SelectItem value="dataCriacao">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lista de usuários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usuarios.map(u => (
                <motion.div key={u.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}
                  className="flex flex-col justify-between bg-indigo-50 dark:bg-indigo-900 rounded-2xl p-4 shadow border border-indigo-200 dark:border-indigo-700"
                >
                  {editando === u.id ? (
                    <div className="grid grid-cols-1 gap-2">
                      <Input value={usuarioEditado.nome} onChange={e => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })} />
                      <Input value={usuarioEditado.email} onChange={e => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} />
                      <Input value={usuarioEditado.telefone} onChange={e => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })} />
                      <Input value={usuarioEditado.morada} onChange={e => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })} />
                      <Select value={usuarioEditado.perfil} onValueChange={v => setUsuarioEditado({ ...usuarioEditado, perfil: v as "COMERCIANTE" | "ADMIN" | "CIDADAO" })}>
                        <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="CIDADAO">CIDADAO</SelectItem>
                          <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2 mt-2">
                        <Button onClick={() => handleSave(u.id)} className="bg-green-600 hover:bg-green-700 text-white flex-1">Salvar</Button>
                        <Button onClick={() => setEditando(null)} variant="destructive" className="flex-1">Cancelar</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="flex items-center gap-2"><User size={14} /> {u.nome}</p>
                      <p>Email: {u.email}</p>
                      <p>Telefone: {u.telefone}</p>
                      <p>Morada: {u.morada}</p>
                      <p>Perfil: {u.perfil}</p>
                      <p className="text-gray-500 dark:text-gray-400">Criado em: {u.dataCriacao}</p>
                      <div className="flex gap-2 mt-2">
                        <Button onClick={() => handleEdit(u)} className="bg-blue-600 hover:bg-blue-700 text-white flex-1"><Edit size={14} /> Editar</Button>
                        <Button onClick={() => handleDelete(u.id)} variant="destructive" className="flex-1"><Trash2 size={14} /> Excluir</Button>
                        <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"><Wallet size={14} /> Pagamentos</Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Sentinel para infinite scroll */}
            <div ref={observerRef} className="h-6"></div>
            {!temMais && <p className="text-center text-gray-500 mt-3">Fim da lista</p>}
          </CardContent>
        </Card>

        {/* Modal de Pagamentos */}
        {usuarioSelecionado && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setUsuarioSelecionado(null)}></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-3xl shadow-2xl w-[550px] max-w-[90%] max-h-[70vh] overflow-y-auto flex flex-col z-10"
            >
              <div className="flex justify-between items-center p-4 border-b border-indigo-100 dark:border-indigo-800">
                <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Wallet size={20} /> Pagamentos de {usuarioSelecionado.nome}
                </h3>
                <Button onClick={() => setUsuarioSelecionado(null)} variant="destructive" className="px-3 py-1 rounded-lg text-sm">
                  Fechar
                </Button>
              </div>
              <div className="p-4 space-y-3">
                {loadingPagamentos ? (
                  <p className="text-gray-700 dark:text-gray-200 text-sm">Carregando...</p>
                ) : pagamentos.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-200 text-sm text-center">Nenhum pagamento encontrado.</p>
                ) : (
                  <>
                    <Button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 mb-3">
                      <Download size={16} /> Baixar CSV
                    </Button>
                    {pagamentos.map(p => (
                      <motion.div key={p.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}
                        className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-3 shadow-sm text-sm"
                      >
                        <p className="font-semibold text-gray-800 dark:text-gray-100">{p.descricao}</p>
                        <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300"><Wallet size={14} /> Valor: {p.valor.toLocaleString()} MZN</p>
                        <p className="text-gray-500 dark:text-gray-400">Data: {p.data}</p>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
