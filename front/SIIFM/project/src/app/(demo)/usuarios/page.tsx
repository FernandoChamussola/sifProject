// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2, DollarSign } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

// interface Usuario {
//   id: number;
//   nome: string;
//   email: string;
//   telefone: string;
//   senhaHash: string;
//   perfil: "ADMIN" | "USUARIO";
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
//   const [novoUsuario, setNovoUsuario] = useState({
//     nome: "",
//     email: "",
//     telefone: "",
//     senhaHash: "",
//     perfil: "USUARIO" as "USUARIO" | "ADMIN",
//     morada: "",
//   });
//   const [editando, setEditando] = useState<number | null>(null);
//   const [usuarioEditado, setUsuarioEditado] = useState({
//     nome: "",
//     email: "",
//     telefone: "",
//     senhaHash: "",
//     perfil: "USUARIO" as "USUARIO" | "ADMIN",
//     morada: "",
//   });

//   const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loadingPagamentos, setLoadingPagamentos] = useState(false);

//   // Mock de dados iniciais
//   const mockUsuarios: Usuario[] = [
//     {
//       id: 1,
//       nome: "Fernando Silva",
//       email: "fernandosilva@example.com",
//       telefone: "+258841234567",
//       senhaHash: "123",
//       perfil: "ADMIN",
//       morada: "Av. Eduardo Mondlane, Beira",
//       dataCriacao: "2025-10-01",
//     },
//     {
//       id: 2,
//       nome: "Maria Santos",
//       email: "mariasantos@example.com",
//       telefone: "+258841234568",
//       senhaHash: "123",
//       perfil: "USUARIO",
//       morada: "Av. 25 de Setembro, Maputo",
//       dataCriacao: "2025-10-05",
//     },
//   ];

//   const mockPagamentos: Pagamento[] = [
//     { id: 1, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
//     { id: 2, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
//     { id: 3, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
//     { id: 4, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
//     { id: 5, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
//     { id: 6, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },

//     { id: 7, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
//     { id: 8, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
//   ];

//   // Buscar usuários do backend ou usar mock
//   const fetchUsuarios = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios");
//       if (!res.ok) throw new Error("Erro ao buscar usuários");
//       const data: Usuario[] = await res.json();
//       setUsuarios(data.length ? data : mockUsuarios);
//     } catch (error) {
//       console.error(error);
//       setUsuarios(mockUsuarios);
//     }
//   };

//   useEffect(() => {
//     fetchUsuarios();
//   }, []);

//   // Adicionar usuário
//   const handleAddUsuario = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;

//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//       });

//       if (!res.ok) throw new Error("Erro ao adicionar usuário");

//       setNovoUsuario({
//         nome: "",
//         email: "",
//         telefone: "",
//         senhaHash: "",
//         perfil: "USUARIO",
//         morada: "",
//       });

//       fetchUsuarios();
//     } catch (error) {
//       console.error(error);
//       // fallback: adicionar mock local
//       const novo: Usuario = {
//         id: usuarios.length + 1,
//         ...novoUsuario,
//         dataCriacao: new Date().toISOString().split("T")[0],
//       };
//       setUsuarios([...usuarios, novo]);
//       setNovoUsuario({
//         nome: "",
//         email: "",
//         telefone: "",
//         senhaHash: "",
//         perfil: "USUARIO",
//         morada: "",
//       });
//     }
//   };

//   // Edição
//   const handleEdit = (usuario: Usuario) => {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   };

//   const handleSave = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(usuarioEditado),
//       });
//       if (!res.ok) throw new Error("Erro ao atualizar usuário");
//       setEditando(null);
//       fetchUsuarios();
//     } catch (error) {
//       console.error(error);
//       // fallback: atualizar localmente
//       setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...usuarioEditado } : u));
//       setEditando(null);
//     }
//   };

//   // Excluir usuário
//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Erro ao excluir usuário");
//       fetchUsuarios();
//     } catch (error) {
//       console.error(error);
//       setUsuarios(usuarios.filter(u => u.id !== id));
//     }
//   };

//   // Ver pagamentos
//   const handleVerPagamentos = async (usuario: Usuario) => {
//     setUsuarioSelecionado(usuario);
//     setLoadingPagamentos(true);
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
//       if (!res.ok) throw new Error("Erro ao buscar pagamentos");
//       const data: Pagamento[] = await res.json();
//       setPagamentos(data.length ? data : mockPagamentos);
//     } catch (error) {
//       console.error(error);
//       setPagamentos(mockPagamentos);
//     } finally {
//       setLoadingPagamentos(false);
//     }
//   };

//   return (
//     <ContentLayout title="Gestão de Usuários">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <Settings2 size={26} /> Gestão de Usuários
//             </CardTitle>
//           </CardHeader>

//           {/* Formulário */}
//           <CardContent>
//             <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//               <Input placeholder="Nome" value={novoUsuario.nome} onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
//               <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
//               <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
//               <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
//               <Input placeholder="Morada" value={novoUsuario.morada} onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
//               <Select value={novoUsuario.perfil} onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}>
//                 <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="USUARIO">USUARIO</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 py-2 col-span-full">
//                 <PlusCircle size={18} /> Adicionar
//               </Button>
//             </form>

//             {/* Lista */}
//             <div className="space-y-4">
//               {usuarios.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum usuário cadastrado.</p>}

//               {usuarios.map((u) => (
//                 <motion.div key={u.id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
//                   {editando === u.id ? (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
//                       <Input value={usuarioEditado.nome} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })} />
//                       <Input value={usuarioEditado.email} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} />
//                       <Input value={usuarioEditado.telefone} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })} />
//                       <Input value={usuarioEditado.morada} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })} />
//                       <Select value={usuarioEditado.perfil} onValueChange={(v) => setUsuarioEditado({ ...usuarioEditado, perfil: v as "ADMIN" | "USUARIO" })}>
//                         <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ADMIN">ADMIN</SelectItem>
//                           <SelectItem value="comerciante">comerciante</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-1">
//                       <p className="flex items-center gap-2"><User size={16} /> {u.nome}</p>
//                       <p>Email: {u.email}</p>
//                       <p>Telefone: {u.telefone}</p>
//                       <p>Morada: {u.morada}</p>
//                       <p>Perfil: {u.perfil}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Criado em: {u.dataCriacao}</p>
//                     </div>
//                   )}

//                   <div className="flex items-center gap-3 mt-4 md:mt-0">
//                     {editando === u.id ? (
//                       <>
//                         <Button onClick={() => handleSave(u.id)} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
//                           <Check size={16} /> Salvar
//                         </Button>
//                         <Button onClick={() => setEditando(null)} variant="destructive" className="flex items-center gap-1">
//                           <X size={16} /> Cancelar
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button onClick={() => handleEdit(u)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
//                           <Edit size={16} /> Editar
//                         </Button>
//                         <Button onClick={() => handleDelete(u.id)} variant="destructive" className="flex items-center gap-1">
//                           <Trash2 size={16} /> Excluir
//                         </Button>
//                         <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1">
//                           <User size={16} /> Ver Pagamentos
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Modal de Pagamentos */}
//         {/* {usuarioSelecionado && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            
//             <div
//               className="absolute inset-0 bg-black/30 pointer-events-auto"
//               onClick={() => setUsuarioSelecionado(null)}
//             ></div>

            
//             <div className="pointer-events-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[600px] max-w-[90%] max-h-[80vh] p-6 overflow-hidden flex flex-col border border-indigo-200 dark:border-indigo-700 z-10">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
//                   Pagamentos de {usuarioSelecionado.nome}
//                 </h3>
//                 <Button
//                   onClick={() => setUsuarioSelecionado(null)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Fechar
//                 </Button>
//               </div>

//               <div className="overflow-y-auto flex-1 space-y-4">
//                 {loadingPagamentos ? (
//                   <p className="text-gray-700 dark:text-gray-200">Carregando...</p>
//                 ) : pagamentos.length === 0 ? (
//                   <p className="text-gray-700 dark:text-gray-200">Nenhum pagamento encontrado.</p>
//                 ) : (
//                   pagamentos.map((p) => (
//                     <div
//                       key={p.id}
//                       className="border-b border-indigo-200 dark:border-indigo-700 pb-2"
//                     >
//                       <p className="text-gray-900 dark:text-gray-100"><strong>Data:</strong> {p.data}</p>
//                       <p className="text-gray-900 dark:text-gray-100"><strong>Valor:</strong> {p.valor.toFixed(2)} MT</p>
//                       <p className="text-gray-900 dark:text-gray-100"><strong>Descrição:</strong> {p.descricao}</p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )} */
//         }



//         {usuarioSelecionado && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             {/* Fundo escurecido com efeito suave */}
//             <div
//               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//               onClick={() => setUsuarioSelecionado(null)}
//             ></div>

//             {/* Card central */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="relative bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-3xl shadow-2xl w-[600px] max-w-[90%] max-h-[85vh] overflow-hidden flex flex-col z-10"
//             >
//               {/* Cabeçalho */}
//               <div className="flex justify-between items-center p-6 border-b border-indigo-100 dark:border-indigo-800">
//                 <h3 className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//                   <DollarSign size={24} />
//                   Pagamentos de {usuarioSelecionado.nome}
//                 </h3>
//                 <Button
//                   onClick={() => setUsuarioSelecionado(null)}
//                   variant="destructive"
//                   className="px-4 py-2 rounded-lg shadow-md"
//                 >
//                   Fechar
//                 </Button>
//               </div>

//               {/* Conteúdo do modal */}
//               <div className="p-6 overflow-y-auto space-y-4">
//                 {/* Exemplo de conteúdo dinâmico */}
//                 {usuarioSelecionado.pagamentos && usuarioSelecionado.pagamentos.length > 0 ? (
//                   usuarioSelecionado.pagamentos.map((p: any, i: number) => (
//                     <motion.div
//                       key={i}
//                       whileHover={{ scale: 1.02 }}
//                       transition={{ duration: 0.2 }}
//                       className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-4 shadow-sm"
//                     >
//                       <p className="text-gray-800 dark:text-gray-100 font-semibold">
//                         {p.nomeTaxa}
//                       </p>
//                       <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-1">
//                         <DollarSign size={16} />
//                         Valor: {p.valorPago.toLocaleString()} MZN
//                       </p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                         Pago em: {p.dataPagamento}
//                       </p>
//                     </motion.div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-600 dark:text-gray-300">
//                     Nenhum pagamento encontrado.
//                   </p>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}


//       </div>
//     </ContentLayout>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2, DollarSign, Banknote, CreditCard, Wallet } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";

// interface Usuario {
//   id: number;
//   nome: string;
//   email: string;
//   telefone: string;
//   senhaHash: string;
//   perfil: "ADMIN" | "USUARIO";
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
//   const [novoUsuario, setNovoUsuario] = useState({
//     nome: "",
//     email: "",
//     telefone: "",
//     senhaHash: "",
//     perfil: "USUARIO" as "USUARIO" | "ADMIN",
//     morada: "",
//   });
//   const [editando, setEditando] = useState<number | null>(null);
//   const [usuarioEditado, setUsuarioEditado] = useState(novoUsuario);

//   const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loadingPagamentos, setLoadingPagamentos] = useState(false);

//   // --- Mock fallback ---
//   const mockUsuarios: Usuario[] = [
//     { id: 1, nome: "Fernando Silva", email: "fernandosilva@example.com", telefone: "+258841234567", senhaHash: "123", perfil: "ADMIN", morada: "Av. Eduardo Mondlane, Beira", dataCriacao: "2025-10-01" },
//     { id: 2, nome: "Maria Santos", email: "mariasantos@example.com", telefone: "+258841234568", senhaHash: "123", perfil: "USUARIO", morada: "Av. 25 de Setembro, Maputo", dataCriacao: "2025-10-05" },
//   ];

//   const mockPagamentos: Pagamento[] = [
//     { id: 1, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
//     { id: 2, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
//   ];

//   // --- Funções API / fallback ---
//   const fetchUsuarios = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios");
//       if (!res.ok) throw new Error("Erro ao buscar usuários");
//       const data: Usuario[] = await res.json();
//       setUsuarios(data.length ? data : mockUsuarios);
//     } catch {
//       setUsuarios(mockUsuarios);
//     }
//   };

//   const handleAddUsuario = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.morada) return;

//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//       });
//       if (!res.ok) throw new Error("Erro ao adicionar usuário");
//       setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
//       fetchUsuarios();
//     } catch {
//       // fallback mock local
//       const novo: Usuario = { id: usuarios.length + 1, ...novoUsuario, dataCriacao: new Date().toISOString().split("T")[0] };
//       setUsuarios([...usuarios, novo]);
//       setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
//     }
//   };

//   const handleEdit = (usuario: Usuario) => {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   };

//   const handleSave = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(usuarioEditado),
//       });
//       if (!res.ok) throw new Error("Erro ao atualizar usuário");
//       setEditando(null);
//       fetchUsuarios();
//     } catch {
//       setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...usuarioEditado } : u));
//       setEditando(null);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Erro ao excluir usuário");
//       fetchUsuarios();
//     } catch {
//       setUsuarios(usuarios.filter(u => u.id !== id));
//     }
//   };

//   const handleVerPagamentos = async (usuario: Usuario) => {
//     setUsuarioSelecionado(usuario);
//     setLoadingPagamentos(true);
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
//       if (!res.ok) throw new Error("Erro ao buscar pagamentos");
//       const data: Pagamento[] = await res.json();
//       setPagamentos(data.length ? data : mockPagamentos);
//     } catch {
//       setPagamentos(mockPagamentos);
//     } finally {
//       setLoadingPagamentos(false);
//     }
//   };

//   useEffect(() => { fetchUsuarios(); }, []);

//   return (
//     <ContentLayout title="Gestão de Usuários">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <Settings2 size={26} /> Gestão de Usuários
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             {/* Formulário */}
//             <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//               <Input placeholder="Nome" value={novoUsuario.nome} onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
//               <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
//               <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
//               <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
//               <Input placeholder="Morada" value={novoUsuario.morada} onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
//               <Select value={novoUsuario.perfil} onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}>
//                 <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="USUARIO">USUARIO</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 py-2 col-span-full">
//                 <PlusCircle size={18} /> Adicionar
//               </Button>
//             </form>

//             {/* Lista de usuários */}
//             <div className="space-y-4">
//               {usuarios.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum usuário cadastrado.</p>}
//               {usuarios.map(u => (
//                 <motion.div key={u.id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
//                   {editando === u.id ? (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
//                       <Input value={usuarioEditado.nome} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })} />
//                       <Input value={usuarioEditado.email} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} />
//                       <Input value={usuarioEditado.telefone} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })} />
//                       <Input value={usuarioEditado.morada} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })} />
//                       <Select value={usuarioEditado.perfil} onValueChange={(v) => setUsuarioEditado({ ...usuarioEditado, perfil: v as "ADMIN" | "USUARIO" })}>
//                         <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ADMIN">ADMIN</SelectItem>
//                           <SelectItem value="comerciante">comerciante</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-1">
//                       <p className="flex items-center gap-2"><User size={16} /> {u.nome}</p>
//                       <p>Email: {u.email}</p>
//                       <p>Telefone: {u.telefone}</p>
//                       <p>Morada: {u.morada}</p>
//                       <p>Perfil: {u.perfil}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Criado em: {u.dataCriacao}</p>
//                     </div>
//                   )}

//                   <div className="flex items-center gap-3 mt-4 md:mt-0">
//                     {editando === u.id ? (
//                       <>
//                         <Button onClick={() => handleSave(u.id)} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"><Check size={16} /> Salvar</Button>
//                         <Button onClick={() => setEditando(null)} variant="destructive" className="flex items-center gap-1"><X size={16} /> Cancelar</Button>
//                       </>
//                     ) : (
//                       <>
//                         <Button onClick={() => handleEdit(u)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"><Edit size={16} /> Editar</Button>
//                         <Button onClick={() => handleDelete(u.id)} variant="destructive" className="flex items-center gap-1"><Trash2 size={16} /> Excluir</Button>
//                         <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"><User size={16} /> Ver Pagamentos</Button>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
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
//               className="relative bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-3xl shadow-2xl w-[600px] max-w-[90%] max-h-[85vh] overflow-hidden flex flex-col z-10"
//             >
//               <div className="flex justify-between items-center p-6 border-b border-indigo-100 dark:border-indigo-800">
//                 <h3 className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//                   <Wallet size={24} /> Pagamentos de {usuarioSelecionado.nome}
//                 </h3>
//                 <Button onClick={() => setUsuarioSelecionado(null)} variant="destructive" className="px-4 py-2 rounded-lg shadow-md">Fechar</Button>
//               </div>

//               <div className="p-6 overflow-y-auto space-y-4">
//                 {loadingPagamentos ? (
//                   <p className="text-gray-700 dark:text-gray-200">Carregando...</p>
//                 ) : pagamentos.length === 0 ? (
//                   <p className="text-center text-gray-600 dark:text-gray-300">Nenhum pagamento encontrado.</p>
//                 ) : (
//                   pagamentos.map((p) => (
//                     <motion.div key={p.id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-4 shadow-sm">
//                       <p className="text-gray-800 dark:text-gray-100 font-semibold">{p.descricao}</p>
//                       <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-1"><Wallet size={16} /> Valor: {p.valor.toLocaleString()} MZN</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pago em: {p.data}</p>
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

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlusCircle, User, Edit, Trash2, Check, X, Settings2, DollarSign, Wallet } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senhaHash: string;
  perfil: "ADMIN" | "USUARIO";
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
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senhaHash: "",
    perfil: "USUARIO" as "USUARIO" | "ADMIN",
    morada: "",
  });
  const [editando, setEditando] = useState<number | null>(null);
  const [usuarioEditado, setUsuarioEditado] = useState({ ...novoUsuario });

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loadingPagamentos, setLoadingPagamentos] = useState(false);

  // Mock fallback
  const mockUsuarios: Usuario[] = [
    { id: 1, nome: "Fernando Silva", email: "fernandosilva@example.com", telefone: "+258841234567", senhaHash: "123", perfil: "ADMIN", morada: "Av. Eduardo Mondlane, Beira", dataCriacao: "2025-10-01" },
    { id: 2, nome: "Maria Santos", email: "mariasantos@example.com", telefone: "+258841234568", senhaHash: "123", perfil: "USUARIO", morada: "Av. 25 de Setembro, Maputo", dataCriacao: "2025-10-05" },
  ];

  const mockPagamentos: Pagamento[] = [
    { id: 1, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
    { id: 2, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
  ];

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data: Usuario[] = await res.json();
      setUsuarios(data.length ? data : mockUsuarios);
    } catch {
      setUsuarios(mockUsuarios);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleAddUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });
      if (!res.ok) throw new Error("Erro ao adicionar usuário");
      setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
      fetchUsuarios();
    } catch {
      const novo: Usuario = { id: usuarios.length + 1, ...novoUsuario, dataCriacao: new Date().toISOString().split("T")[0] };
      setUsuarios([...usuarios, novo]);
      setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditando(usuario.id);
    setUsuarioEditado({ ...usuario });
  };

  const handleSave = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditado),
      });
      if (!res.ok) throw new Error("Erro ao atualizar usuário");
      setEditando(null);
      fetchUsuarios();
    } catch {
      setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...usuarioEditado } : u));
      setEditando(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir usuário");
      fetchUsuarios();
    } catch {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const handleVerPagamentos = async (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setLoadingPagamentos(true);
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
      if (!res.ok) throw new Error("Erro ao buscar pagamentos");
      const data: Pagamento[] = await res.json();
      setPagamentos(data.length ? data : mockPagamentos);
    } catch {
      setPagamentos(mockPagamentos);
    } finally {
      setLoadingPagamentos(false);
    }
  };

  return (
    <ContentLayout title="Gestão de Usuários">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-4 md:p-6">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <Settings2 size={24} /> Gestão de Usuários
            </CardTitle>
          </CardHeader>

          {/* Formulário */}
          <CardContent>
            <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <Input placeholder="Nome" value={novoUsuario.nome} onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
              <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
              <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={e => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
              <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={e => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
              <Input placeholder="Morada" value={novoUsuario.morada} onChange={e => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
              <Select value={novoUsuario.perfil} onValueChange={v => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}>
                <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USUARIO">USUARIO</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2 col-span-full">
                <PlusCircle size={16} /> Adicionar
              </Button>
            </form>

            {/* Lista de usuários */}
            <div className="space-y-3">
              {usuarios.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum usuário cadastrado.</p>}

              {usuarios.map(u => (
                <motion.div key={u.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}
                  className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-2xl p-3 md:p-4 shadow border border-indigo-200 dark:border-indigo-700"
                >
                  {editando === u.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                      <Input value={usuarioEditado.nome} onChange={e => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })} />
                      <Input value={usuarioEditado.email} onChange={e => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} />
                      <Input value={usuarioEditado.telefone} onChange={e => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })} />
                      <Input value={usuarioEditado.morada} onChange={e => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })} />
                      <Select value={usuarioEditado.perfil} onValueChange={v => setUsuarioEditado({ ...usuarioEditado, perfil: v as "ADMIN" | "USUARIO" })}>
                        <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="USUARIO">USUARIO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="flex items-center gap-2"><User size={14} /> {u.nome}</p>
                      <p>Email: {u.email}</p>
                      <p>Telefone: {u.telefone}</p>
                      <p>Morada: {u.morada}</p>
                      <p>Perfil: {u.perfil}</p>
                      <p className="text-gray-500 dark:text-gray-400">Criado em: {u.dataCriacao}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3 md:mt-0">
                    {editando === u.id ? (
                      <>
                        <Button onClick={() => handleSave(u.id)} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 px-3 py-1">
                          <Check size={14} /> Salvar
                        </Button>
                        <Button onClick={() => setEditando(null)} variant="destructive" className="flex items-center gap-1 px-3 py-1">
                          <X size={14} /> Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(u)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 px-3 py-1">
                          <Edit size={14} /> Editar
                        </Button>
                        <Button onClick={() => handleDelete(u.id)} variant="destructive" className="flex items-center gap-1 px-3 py-1">
                          <Trash2 size={14} /> Excluir
                        </Button>
                        <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 px-3 py-1">
                          <User size={14} /> Pagamentos
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal de pagamentos mais compacto */}
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
                  pagamentos.map(p => (
                    <motion.div key={p.id} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}
                      className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-3 shadow-sm text-sm"
                    >
                      <p className="font-semibold text-gray-800 dark:text-gray-100">{p.descricao}</p>
                      <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300"><Wallet size={14} /> Valor: {p.valor.toLocaleString()} MZN</p>
                      <p className="text-gray-500 dark:text-gray-400">Data: {p.data}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
