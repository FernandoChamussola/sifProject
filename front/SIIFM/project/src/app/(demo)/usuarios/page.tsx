// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
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
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2 } from "lucide-react";
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

//   // Mock de dados iniciais
//   useEffect(() => {
//     const mock: Usuario[] = [
//       {
//         id: 1,
//         nome: "Fernando Silva",
//         email: "fernandosilva@example.com",
//         telefone: "+258841234567",
//         senhaHash: "123",
//         perfil: "ADMIN",
//         morada: "Av. Eduardo Mondlane, Beira",
//         dataCriacao: "2025-10-01",
//       },
//     ];
//     setUsuarios(mock);
//   }, []);

//   // Adicionar usuário
//   function handleAddUsuario(e: React.FormEvent) {
//     e.preventDefault();
//     if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;

//     const novo: Usuario = {
//       id: usuarios.length + 1,
//       ...novoUsuario,
//       dataCriacao: new Date().toISOString().split("T")[0],
//     };

//     setUsuarios([...usuarios, novo]);
//     setNovoUsuario({
//       nome: "",
//       email: "",
//       telefone: "",
//       senhaHash: "",
//       perfil: "USUARIO",
//       morada: "",
//     });
//   }

//   // Iniciar edição
//   function handleEdit(usuario: Usuario) {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   }

//   // Salvar edição
//   function handleSave(id: number) {
//     setUsuarios(
//       usuarios.map((u) =>
//         u.id === id ? { ...u, ...usuarioEditado } : u
//       )
//     );
//     setEditando(null);
//   }

//   // Excluir usuário
//   function handleDelete(id: number) {
//     setUsuarios(usuarios.filter((u) => u.id !== id));
//   }


//   return (
//     <ContentLayout title="Gestão de Usuários">
//       <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
//         <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
//           <CardHeader className="mb-6">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
//               <Settings2 size={26} /> Gestão de Usuários
//             </CardTitle>
//           </CardHeader>

//           {/* Formulário de Novo Usuário */}
//           <CardContent>
//             <form
//               onSubmit={handleAddUsuario}
//               className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
//             >
//               <Input
//                 placeholder="Nome"
//                 value={novoUsuario.nome}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
//               />
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={novoUsuario.email}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
//               />
//               <Input
//                 placeholder="Telefone"
//                 value={novoUsuario.telefone}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })}
//               />
//               <Input
//                 type="password"
//                 placeholder="Senha"
//                 value={novoUsuario.senhaHash}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })}
//               />
//               <Input
//                 placeholder="Morada"
//                 value={novoUsuario.morada}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })}
//               />
//               <Select
//                 value={novoUsuario.perfil}
//                 onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Perfil" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="USUARIO">USUARIO</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 py-2 col-span-full"
//               >
//                 <PlusCircle size={18} /> Adicionar
//               </Button>
//             </form>

//             {/* Lista de Usuários */}
//             <div className="space-y-4">
//               {usuarios.length === 0 && (
//                 <p className="text-gray-700 dark:text-gray-200 text-center">
//                   Nenhum usuário cadastrado.
//                 </p>
//               )}

//               {usuarios.map((u) => (
//                 <motion.div
//                   key={u.id}
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
//                 >
//                   {editando === u.id ? (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
//                       <Input
//                         value={usuarioEditado.nome}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })}
//                       />
//                       <Input
//                         value={usuarioEditado.email}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })}
//                       />
//                       <Input
//                         value={usuarioEditado.telefone}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })}
//                       />
//                       {/* <Input
//                         type="password"
//                         value={usuarioEditado.senhaHash}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, senhaHash: e.target.value })}
//                       /> */}
//                       <Input
//                         value={usuarioEditado.morada}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })}
//                       />
//                       <Select
//                         value={usuarioEditado.perfil}
//                         onValueChange={(v) => setUsuarioEditado({ ...usuarioEditado, perfil: v as "ADMIN" | "USUARIO" })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Perfil" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ADMIN">ADMIN</SelectItem>
//                           <SelectItem value="USUARIO">USUARIO</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-1">
//                       <p className="flex items-center gap-2">
//                         <User size={16} /> {u.nome}
//                       </p>
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
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
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
// import { Select, SelectTrigger, SelectValue,SelectContent,SelectItem,} from "@/components/ui/select";
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2 } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import {Dialog,DialogContent,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";

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

//   // Função para buscar usuários do backend
//   const fetchUsuarios = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios");
//       if (!res.ok) throw new Error("Erro ao buscar usuários");
//       const data: Usuario[] = await res.json();
//       setUsuarios(data);
//     } catch (error) {
//       console.error(error);
//       setUsuarios([]);
//     }
//   };

//   // Carregar usuários ao montar componente
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

//       fetchUsuarios(); // Atualiza lista após adicionar
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Iniciar edição
//   function handleEdit(usuario: Usuario) {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   }

//   // Salvar edição
//   const handleSave = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(usuarioEditado),
//       });
//       if (!res.ok) throw new Error("Erro ao atualizar usuário");

//       setEditando(null);
//       fetchUsuarios(); // Atualiza lista após editar
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Excluir usuário
//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Erro ao excluir usuário");

//       fetchUsuarios(); // Atualiza lista após excluir
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Buscar pagamentos do backend
//   const handleVerPagamentos = async (usuario: Usuario) => {
//     setUsuarioSelecionado(usuario);
//     setLoadingPagamentos(true);
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
//       if (!res.ok) throw new Error("Erro ao buscar pagamentos");
//       const data: Pagamento[] = await res.json();
//       setPagamentos(data);
//     } catch (error) {
//       console.error(error);
//       setPagamentos([]);
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

//           {/* Formulário de Novo Usuário */}
//           <CardContent>
//             <form
//               onSubmit={handleAddUsuario}
//               className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
//             >
//               <Input
//                 placeholder="Nome"
//                 value={novoUsuario.nome}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
//                 className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"

//               />
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={novoUsuario.email}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}

//                 className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"

//               />
//               <Input
//                 placeholder="Telefone"
//                 value={novoUsuario.telefone}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })}
//                 className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"

//               />
//               <Input
//                 type="password"
//                 placeholder="Senha"
//                 value={novoUsuario.senhaHash}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })}
//                 className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"

//               />
//               <Input
//                 placeholder="Morada"
//                 value={novoUsuario.morada}
//                 onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })}
//                 className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700"

//               />
//               <Select
//                 value={novoUsuario.perfil}
//                 onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}

//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Perfil" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="USUARIO">USUARIO</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 text-white flex items-center gap-2 px-6 py-2 col-span-full ark:bg-gray-700"
//               >
//                 <PlusCircle size={18} /> Adicionar
//               </Button>
//             </form>

//             {/* Lista de Usuários */}
//             <div className="space-y-4">
//               {usuarios.length === 0 && (
//                 <p className="text-gray-700 dark:text-gray-200 text-center">
//                   Nenhum usuário cadastrado.
//                 </p>
//               )}

//               {usuarios.map((u) => (
//                 <motion.div
//                   key={u.id}
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700"
//                 >
//                   {editando === u.id ? (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
//                       <Input
//                         value={usuarioEditado.nome}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })}
//                       />
//                       <Input
//                         value={usuarioEditado.email}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })}
//                       />
//                       <Input
//                         value={usuarioEditado.telefone}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })}
//                       />
//                       <Input
//                         value={usuarioEditado.morada}
//                         onChange={(e) => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })}
//                       />
//                       <Select
//                         value={usuarioEditado.perfil}
//                         onValueChange={(v) => setUsuarioEditado({ ...usuarioEditado, perfil: v as "ADMIN" | "USUARIO" })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Perfil" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ADMIN">ADMIN</SelectItem>
//                           <SelectItem value="USUARIO">USUARIO</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-1">
//                       <p className="flex items-center gap-2">
//                         <User size={16} /> {u.nome}
//                       </p>
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

//                         {/* Botão Ver Pagamentos */}
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button
//                               onClick={() => handleVerPagamentos(u)}
//                               className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"
//                             >
//                               <User size={16} /> Ver Pagamentos
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent>
//                             {/* <DialogHeader>
//                               <DialogTitle>Pagamentos de {usuarioSelecionado?.nome}</DialogTitle>
//                             </DialogHeader> */}
//                             <div className="mt-4 space-y-2">
//                               {loadingPagamentos ? (
//                                 <p>Carregando...</p>
//                               ) : pagamentos.length === 0 ? (
//                                 <p>Nenhum pagamento encontrado.</p>
//                               ) : (
//                                 pagamentos.map((p) => (
//                                   <div key={p.id} className="border-b pb-2">
//                                     <p>Data: {p.data}</p>
//                                     <p>Valor: {p.valor.toFixed(2)} MT</p>
//                                     <p>Descrição: {p.descricao}</p>
//                                   </div>
//                                 ))
//                               )}
//                             </div>
//                             {/* <DialogClose asChild> */}
//                               <Button className="mt-4">Fechar</Button>
//                             {/* </DialogClose> */}
//                           </DialogContent>
//                         </Dialog>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </ContentLayout>
//   );
// }


// versao sem dados mockados

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2 } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
//   const [usuarioEditado, setUsuarioEditado] = useState({ ...novoUsuario });
//   const [loadingAdd, setLoadingAdd] = useState(false);

//   const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loadingPagamentos, setLoadingPagamentos] = useState(false);

//   const fetchUsuarios = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios");
//       if (!res.ok) throw new Error("Erro ao buscar usuários");
//       const data: Usuario[] = await res.json();
//       setUsuarios(data);
//     } catch (error) {
//       console.error(error);
//       setUsuarios([]);
//     }
//   };

//   useEffect(() => { fetchUsuarios(); }, []);

//   const handleAddUsuario = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;

//     setLoadingAdd(true);
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//       });
//       if (!res.ok) throw new Error("Erro ao adicionar usuário");

//       setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
//       fetchUsuarios();
//     } catch (error) {
//       console.error(error);
//       alert("Erro ao adicionar usuário. Verifique o backend.");
//     } finally {
//       setLoadingAdd(false);
//     }
//   };

//   function handleEdit(usuario: Usuario) {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   }

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
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Erro ao excluir usuário");
//       fetchUsuarios();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleVerPagamentos = async (usuario: Usuario) => {
//     setUsuarioSelecionado(usuario);
//     setLoadingPagamentos(true);
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
//       if (!res.ok) throw new Error("Erro ao buscar pagamentos");
//       const data: Pagamento[] = await res.json();
//       setPagamentos(data);
//     } catch (error) {
//       console.error(error);
//       setPagamentos([]);
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

//           <CardContent>
//             <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//               <Input placeholder="Nome" value={novoUsuario.nome} onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700" />
//               <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700" />
//               <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700" />
//               <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700" />
//               <Input placeholder="Morada" value={novoUsuario.morada} onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:bg-gray-700" />
//               <Select value={novoUsuario.perfil} onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}>
//                 <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="USUARIO">USUARIO</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button type="submit" disabled={loadingAdd} className={`bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 text-white flex items-center gap-2 px-6 py-2 col-span-full dark:bg-gray-700 ${loadingAdd ? "opacity-50 cursor-not-allowed" : ""}`}>
//                 <PlusCircle size={18} /> {loadingAdd ? "Adicionando..." : "Adicionar"}
//               </Button>
//             </form>

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
//                           <SelectItem value="USUARIO">USUARIO</SelectItem>
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

//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1">
//                               <User size={16} /> Ver Pagamentos
//                             </Button>
//                           </DialogTrigger>

//                           <DialogContent className="max-w-lg w-full">

//                             <DialogTitle>Pagamentos de {usuarioSelecionado?.nome}</DialogTitle>

//                             {loadingPagamentos ? (
//                               <p className="mt-4 text-center">Carregando...</p>
//                             ) : pagamentos.length === 0 ? (
//                               <p className="mt-4 text-center">Nenhum pagamento encontrado.</p>
//                             ) : (
//                               <div className="mt-4 max-h-80 overflow-y-auto border rounded-md border-gray-300 dark:border-gray-700">
//                                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                                   <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
//                                     <tr>
//                                       <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Data</th>
//                                       <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Valor (MT)</th>
//                                       <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Descrição</th>
//                                     </tr>
//                                   </thead>
//                                   <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                                     {pagamentos.map((p) => (
//                                       <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                                         <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{p.data}</td>
//                                         <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{p.valor.toFixed(2)}</td>
//                                         <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">{p.descricao}</td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             )}


//                             <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white">Fechar</Button>

//                           </DialogContent>

//                         </Dialog>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </ContentLayout>
//   );
// }







// versao com dados mockados para poder ver como os componentes estao antes do back





// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { PlusCircle, User, Edit, Trash2, Check, X, Settings2 } from "lucide-react";
// import { ContentLayout } from "@/components/admin-panel/content-layout";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
//   const [usuarioEditado, setUsuarioEditado] = useState({ ...novoUsuario });
//   const [loadingAdd, setLoadingAdd] = useState(false);

//   const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
//   const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
//   const [loadingPagamentos, setLoadingPagamentos] = useState(false);

//   // Função para buscar usuários do backend
//   const fetchUsuarios = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios");
//       if (!res.ok) throw new Error("Erro ao buscar usuários");
//       const data: Usuario[] = await res.json();
//       setUsuarios(data);
//     } catch (error) {
//       console.error("Erro ao buscar do backend, usando mock", error);
//       // Mock idêntico ao backend
//       const mockUsuarios: Usuario[] = [
//         { id: 1, nome: "Fernando Silva", email: "fernando@example.com", telefone: "+258841234567", senhaHash: "123", perfil: "ADMIN", morada: "Av. Eduardo Mondlane, Beira", dataCriacao: "2025-10-01" },
//         { id: 2, nome: "Ana Pereira", email: "ana@example.com", telefone: "+258842345678", senhaHash: "456", perfil: "USUARIO", morada: "Rua do Comércio, Maputo", dataCriacao: "2025-10-05" },
//       ];
//       setUsuarios(mockUsuarios);
//     }
//   };

//   useEffect(() => {
//     fetchUsuarios();
//   }, []);

//   const handleAddUsuario = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;

//     setLoadingAdd(true);
//     try {
//       const res = await fetch("http://localhost:3000/api/usuarios", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//       });
//       if (!res.ok) throw new Error("Erro ao adicionar usuário no backend");

//       setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
//       fetchUsuarios();
//     } catch (error) {
//       console.error("Erro ao adicionar no backend, adicionando localmente", error);
//       const novo: Usuario = { id: usuarios.length + 1, ...novoUsuario, dataCriacao: new Date().toISOString().split("T")[0] };
//       setUsuarios([...usuarios, novo]);
//       setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "USUARIO", morada: "" });
//     } finally {
//       setLoadingAdd(false);
//     }
//   };

//   function handleEdit(usuario: Usuario) {
//     setEditando(usuario.id);
//     setUsuarioEditado({ ...usuario });
//   }

//   const handleSave = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(usuarioEditado),
//       });
//       if (!res.ok) throw new Error("Erro ao atualizar no backend");
//       setEditando(null);
//       fetchUsuarios();
//     } catch (error) {
//       console.error("Erro ao atualizar no backend, atualizando localmente", error);
//       setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...usuarioEditado } : u));
//       setEditando(null);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Erro ao deletar no backend");
//       fetchUsuarios();
//     } catch (error) {
//       console.error("Erro ao deletar no backend, deletando localmente", error);
//       setUsuarios(usuarios.filter(u => u.id !== id));
//     }
//   };

//   const handleVerPagamentos = async (usuario: Usuario) => {
//     setUsuarioSelecionado(usuario);
//     setLoadingPagamentos(true);

//     try {
//       const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
//       if (!res.ok) throw new Error("Erro ao buscar pagamentos do backend");
//       const data: Pagamento[] = await res.json();
//       setPagamentos(data);
//     } catch (error) {
//       console.error("Erro ao buscar pagamentos do backend, usando mock", error);
//       const mockPagamentos: Pagamento[] = [
//         { id: 1, data: "2025-10-01", valor: 1500, descricao: "Mensalidade Outubro" },
//         { id: 2, data: "2025-09-01", valor: 1500, descricao: "Mensalidade Setembro" },
//         { id: 3, data: "2025-08-01", valor: 1500, descricao: "Mensalidade Agosto" },
//       ];
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

//           <CardContent>
//             {/* Formulário de Novo Usuário */}
//             <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//               <Input placeholder="Nome" value={novoUsuario.nome} onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
//               <Input placeholder="Email" type="email" value={novoUsuario.email} onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
//               <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
//               <Input placeholder="Senha" type="password" value={novoUsuario.senhaHash} onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
//               <Input placeholder="Morada" value={novoUsuario.morada} onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
//               <Select value={novoUsuario.perfil} onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}>
//                 <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ADMIN">ADMIN</SelectItem>
//                   <SelectItem value="USUARIO">USUARIO</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button type="submit" className={`bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 py-2 col-span-full ${loadingAdd ? "opacity-70 cursor-not-allowed" : ""}`} disabled={loadingAdd}>
//                 <PlusCircle size={18} /> {loadingAdd ? "Adicionando..." : "Adicionar"}
//               </Button>
//             </form>

//             {/* Lista de Usuários */}
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
//                           <SelectItem value="USUARIO">USUARIO</SelectItem>
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


//                         {/* Modal Pagamentos */}
//                         <Dialog open={!!usuarioSelecionado} onOpenChange={(open) => !open && setUsuarioSelecionado(null)}>
//                           <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//                             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">

//                               <DialogTitle className="text-xl font-bold">Pagamentos de {usuarioSelecionado?.nome}</DialogTitle>

//                               <div className="mt-4 space-y-4">
//                                 {loadingPagamentos ? (
//                                   <p>Carregando...</p>
//                                 ) : pagamentos.length === 0 ? (
//                                   <p>Nenhum pagamento encontrado.</p>
//                                 ) : (
//                                   pagamentos.map((p) => (
//                                     <div key={p.id} className="border-b pb-2">
//                                       <p><strong>Data:</strong> {p.data}</p>
//                                       <p><strong>Valor:</strong> {p.valor.toFixed(2)} MT</p>
//                                       <p><strong>Descrição:</strong> {p.descricao}</p>
//                                     </div>
//                                   ))
//                                 )}
//                               </div>

//                               <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white">Fechar</Button>

//                             </div>
//                           </DialogContent>
//                         </Dialog>

//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
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
import { PlusCircle, User, Edit, Trash2, Check, X, Settings2 } from "lucide-react";
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
  const [usuarioEditado, setUsuarioEditado] = useState({
    nome: "",
    email: "",
    telefone: "",
    senhaHash: "",
    perfil: "USUARIO" as "USUARIO" | "ADMIN",
    morada: "",
  });

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loadingPagamentos, setLoadingPagamentos] = useState(false);

  // Mock de dados iniciais
  const mockUsuarios: Usuario[] = [
    {
      id: 1,
      nome: "Fernando Silva",
      email: "fernandosilva@example.com",
      telefone: "+258841234567",
      senhaHash: "123",
      perfil: "ADMIN",
      morada: "Av. Eduardo Mondlane, Beira",
      dataCriacao: "2025-10-01",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "mariasantos@example.com",
      telefone: "+258841234568",
      senhaHash: "123",
      perfil: "USUARIO",
      morada: "Av. 25 de Setembro, Maputo",
      dataCriacao: "2025-10-05",
    },
  ];

  const mockPagamentos: Pagamento[] = [
    { id: 1, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
    { id: 2, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
    { id: 3, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
    { id: 4, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
    { id: 5, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
    { id: 6, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },

    { id: 7, data: "2025-09-01", valor: 1200, descricao: "Pagamento Mensalidade" },
    { id: 8, data: "2025-09-15", valor: 500, descricao: "Pagamento Extra" },
  ];

  // Buscar usuários do backend ou usar mock
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data: Usuario[] = await res.json();
      setUsuarios(data.length ? data : mockUsuarios);
    } catch (error) {
      console.error(error);
      setUsuarios(mockUsuarios);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Adicionar usuário
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

      setNovoUsuario({
        nome: "",
        email: "",
        telefone: "",
        senhaHash: "",
        perfil: "USUARIO",
        morada: "",
      });

      fetchUsuarios();
    } catch (error) {
      console.error(error);
      // fallback: adicionar mock local
      const novo: Usuario = {
        id: usuarios.length + 1,
        ...novoUsuario,
        dataCriacao: new Date().toISOString().split("T")[0],
      };
      setUsuarios([...usuarios, novo]);
      setNovoUsuario({
        nome: "",
        email: "",
        telefone: "",
        senhaHash: "",
        perfil: "USUARIO",
        morada: "",
      });
    }
  };

  // Edição
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
    } catch (error) {
      console.error(error);
      // fallback: atualizar localmente
      setUsuarios(usuarios.map(u => u.id === id ? { ...u, ...usuarioEditado } : u));
      setEditando(null);
    }
  };

  // Excluir usuário
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir usuário");
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  // Ver pagamentos
  const handleVerPagamentos = async (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setLoadingPagamentos(true);
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/pagamentos`);
      if (!res.ok) throw new Error("Erro ao buscar pagamentos");
      const data: Pagamento[] = await res.json();
      setPagamentos(data.length ? data : mockPagamentos);
    } catch (error) {
      console.error(error);
      setPagamentos(mockPagamentos);
    } finally {
      setLoadingPagamentos(false);
    }
  };

  return (
    <ContentLayout title="Gestão de Usuários">
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 p-6 md:p-10">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <Settings2 size={26} /> Gestão de Usuários
            </CardTitle>
          </CardHeader>

          {/* Formulário */}
          <CardContent>
            <form onSubmit={handleAddUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <Input placeholder="Nome" value={novoUsuario.nome} onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} />
              <Input type="email" placeholder="Email" value={novoUsuario.email} onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} />
              <Input placeholder="Telefone" value={novoUsuario.telefone} onChange={(e) => setNovoUsuario({ ...novoUsuario, telefone: e.target.value })} />
              <Input type="password" placeholder="Senha" value={novoUsuario.senhaHash} onChange={(e) => setNovoUsuario({ ...novoUsuario, senhaHash: e.target.value })} />
              <Input placeholder="Morada" value={novoUsuario.morada} onChange={(e) => setNovoUsuario({ ...novoUsuario, morada: e.target.value })} />
              <Select value={novoUsuario.perfil} onValueChange={(v) => setNovoUsuario({ ...novoUsuario, perfil: v as "ADMIN" | "USUARIO" })}>
                <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USUARIO">USUARIO</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-6 py-2 col-span-full">
                <PlusCircle size={18} /> Adicionar
              </Button>
            </form>

            {/* Lista */}
            <div className="space-y-4">
              {usuarios.length === 0 && <p className="text-gray-700 dark:text-gray-200 text-center">Nenhum usuário cadastrado.</p>}

              {usuarios.map((u) => (
                <motion.div key={u.id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-4 md:p-6 shadow-md border border-indigo-200 dark:border-indigo-700">
                  {editando === u.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                      <Input value={usuarioEditado.nome} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nome: e.target.value })} />
                      <Input value={usuarioEditado.email} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })} />
                      <Input value={usuarioEditado.telefone} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefone: e.target.value })} />
                      <Input value={usuarioEditado.morada} onChange={(e) => setUsuarioEditado({ ...usuarioEditado, morada: e.target.value })} />
                      <Select value={usuarioEditado.perfil} onValueChange={(v) => setUsuarioEditado({ ...usuarioEditado, perfil: v as "ADMIN" | "USUARIO" })}>
                        <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="USUARIO">USUARIO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="flex items-center gap-2"><User size={16} /> {u.nome}</p>
                      <p>Email: {u.email}</p>
                      <p>Telefone: {u.telefone}</p>
                      <p>Morada: {u.morada}</p>
                      <p>Perfil: {u.perfil}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Criado em: {u.dataCriacao}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    {editando === u.id ? (
                      <>
                        <Button onClick={() => handleSave(u.id)} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
                          <Check size={16} /> Salvar
                        </Button>
                        <Button onClick={() => setEditando(null)} variant="destructive" className="flex items-center gap-1">
                          <X size={16} /> Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(u)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                          <Edit size={16} /> Editar
                        </Button>
                        <Button onClick={() => handleDelete(u.id)} variant="destructive" className="flex items-center gap-1">
                          <Trash2 size={16} /> Excluir
                        </Button>
                        <Button onClick={() => handleVerPagamentos(u)} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1">
                          <User size={16} /> Ver Pagamentos
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal de Pagamentos */}
        {usuarioSelecionado && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            {/* Fundo escuro sem permitir interação com o conteúdo atrás */}
            <div
              className="absolute inset-0 bg-black/30 pointer-events-auto"
              onClick={() => setUsuarioSelecionado(null)}
            ></div>

            {/* Card central */}
            <div className="pointer-events-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[600px] max-w-[90%] max-h-[80vh] p-6 overflow-hidden flex flex-col border border-indigo-200 dark:border-indigo-700 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  Pagamentos de {usuarioSelecionado.nome}
                </h3>
                <Button
                  onClick={() => setUsuarioSelecionado(null)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Fechar
                </Button>
              </div>

              <div className="overflow-y-auto flex-1 space-y-4">
                {loadingPagamentos ? (
                  <p className="text-gray-700 dark:text-gray-200">Carregando...</p>
                ) : pagamentos.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-200">Nenhum pagamento encontrado.</p>
                ) : (
                  pagamentos.map((p) => (
                    <div
                      key={p.id}
                      className="border-b border-indigo-200 dark:border-indigo-700 pb-2"
                    >
                      <p className="text-gray-900 dark:text-gray-100"><strong>Data:</strong> {p.data}</p>
                      <p className="text-gray-900 dark:text-gray-100"><strong>Valor:</strong> {p.valor.toFixed(2)} MT</p>
                      <p className="text-gray-900 dark:text-gray-100"><strong>Descrição:</strong> {p.descricao}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </ContentLayout>
  );
}

