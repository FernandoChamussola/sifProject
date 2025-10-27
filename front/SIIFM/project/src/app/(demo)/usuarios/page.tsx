"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlusCircle, User, Edit, Trash2, Check, X, Settings2, Wallet } from "lucide-react";
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

  // Buscar usuários
  const fetchUsuarios = async () => {
    try {
      const { data } = await api.get<Usuario[]>("/usuarios");
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsuarios([]);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  // Adicionar usuário
  const handleAddUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.telefone || !novoUsuario.senhaHash || !novoUsuario.perfil || !novoUsuario.morada) return;

    try {
      await api.post("/usuarios", novoUsuario);
      setNovoUsuario({ nome: "", email: "", telefone: "", senhaHash: "", perfil: "CIDADAO", morada: "" });
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  // Editar usuário
  const handleEdit = (usuario: Usuario) => {
    setEditando(usuario.id);
    setUsuarioEditado({ ...usuario });
  };

  const handleSave = async (id: number) => {
    try {
      await api.put(`/usuarios/${id}`, usuarioEditado);
      setEditando(null);
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  // Excluir usuário
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // Ver pagamentos
  const handleVerPagamentos = async (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setLoadingPagamentos(true);
    try {
      const { data } = await api.get<Pagamento[]>(`/usuarios/${usuario.id}/pagamentos`);
      setPagamentos(data);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error);
      setPagamentos([]);
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
              <Select value={novoUsuario.perfil} onValueChange={v => setNovoUsuario({ ...novoUsuario, perfil: v as "COMERCIANTE" | "ADMIN" | "CIDADAO" })}>
                <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="CIDADAO">CIDADAO</SelectItem>
                  <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
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
                      <Select value={usuarioEditado.perfil} onValueChange={v => setUsuarioEditado({ ...usuarioEditado, perfil: v as "COMERCIANTE" | "ADMIN" | "CIDADAO" })}>
                        <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="CIDADAO">CIDADAO</SelectItem>
                          <SelectItem value="COMERCIANTE">COMERCIANTE</SelectItem>
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

        {/* Modal de pagamentos */}
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

