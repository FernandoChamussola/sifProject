"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function PerfilPage() {
  const [userData, setUserData] = useState<any>(null);
  const [numero, setNumero] = useState("");
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserData(parsed);
      setNumero(parsed.numero || "");
    }
  }, []);

  if (!userData)
    return <p className="text-center mt-10 text-gray-700 dark:text-gray-300">Carregando...</p>;

  const handleSalvar = async () => {
    if (!userData) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error();

      const { data } = await api.put(`/usuarios/${userData.id}`, { numero }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = { ...userData, numero: data.numero || numero };
      localStorage.setItem("userData", JSON.stringify(updated));
      setUserData(updated);
      setEditando(false);

      showToast("success", "Número atualizado com sucesso!");
    } catch (err: any) {
      console.error(err);
      showToast("error", "Falha ao atualizar número");
    } finally {
      setLoading(false);
    }
  };

  return (

     <ContentLayout title="Home"> 
    <div className="min-h-screen flex justify-center items-start p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[95%] md:max-w-[1100px]"
      >
        <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="bg-blue-600 dark:bg-indigo-700 text-white p-5">
            <CardTitle className="text-2xl font-semibold text-center">Meu Perfil</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">

            <div className="flex flex-col gap-4 md:gap-5">
              <ProfileRow label="Nome" value={userData.nome} />
              <ProfileRow label="Email" value={userData.email} />
              <ProfileRow label="Tipo de Usuário" value={userData.perfil} />
              <ProfileRow label="Morada" value={userData.morada} />
              <ProfileRow
                label="Número"
                value={numero}
                editable
                editing={editando}
                onChange={setNumero}
              />
              <ProfileRow label="Data de Criação" value={new Date(userData.dataCriacao).toLocaleDateString()} />
            </div>

            {!editando ? (
              <Button
                className="w-full md:w-1/3 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 text-base"
                onClick={() => setEditando(true)}
              >
                <Edit size={18} /> Editar número
              </Button>
            ) : (
              <div className="flex flex-col md:flex-row gap-3 w-full md:w-1/2 mx-auto">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-base"
                  onClick={handleSalvar}
                  disabled={loading}
                >
                  <Check size={18} /> {loading ? "Salvando..." : "Salvar"}
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 flex items-center justify-center gap-2 text-base"
                  onClick={() => { setNumero(userData.numero || ""); setEditando(false); }}
                >
                  <X size={18} /> Cancelar
                </Button>
              </div>
            )}

          </CardContent>
        </Card>
      </motion.div>
    </div>
</ContentLayout>
  );
}

interface ProfileRowProps {
  label: string;
  value: string;
  editable?: boolean;
  editing?: boolean;
  onChange?: (value: string) => void;
}

function ProfileRow({ label, value, editable = false, editing = false, onChange }: ProfileRowProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full md:w-1/3">{label}</span>
      {editable && editing ? (
        <Input
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="text-base py-2 w-full md:w-2/3"
        />
      ) : (
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100 text-base w-full md:w-2/3">
          {value || "-"}
        </div>
      )}
    </div>
  );
}
