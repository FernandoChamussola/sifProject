

// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Edit, Check, X } from "lucide-react";
// import { motion } from "framer-motion";
// import api from "@/lib/api";

// export default function PerfilPage() {
//   const [userData, setUserData] = useState<{
//     id: number;
//     nome: string;
//     email: string;
//     perfil: string;
//     morada: string;
//     numero?: string;
//     dataCriacao: string;
//   } | null>(null);

//   const [numero, setNumero] = useState("");
//   const [editando, setEditando] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       const parsed = JSON.parse(storedUser);
//       setUserData(parsed);
//       setNumero(parsed.numero || "");
//     }
//   }, []);

//   if (!userData) return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Carregando...</p>;

//   const handleSalvar = async () => {
//     if (!userData) return;
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Usuário não autenticado");

//       const { data } = await api.put(`/usuarios/${userData.id}`, { numero }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const updated = { ...userData, numero: data.numero || numero };
//       localStorage.setItem("userData", JSON.stringify(updated));
//       setUserData(updated);
//       setEditando(false);
//     } catch (err: any) {
//       console.error(err);
//       alert(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-start p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-[90%] md:max-w-[1200px]" // largura aumentada
//       >
//         <Card className="shadow-2xl rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
//           <CardHeader className="bg-indigo-600 dark:bg-indigo-700 text-white p-8">
//             <CardTitle className="text-3xl font-bold text-center">Meu Perfil</CardTitle>
//           </CardHeader>
//           <CardContent className="p-8 space-y-8">

//             {/* Grid horizontal */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <ProfileField label="Nome" value={userData.nome} />
//               <ProfileField label="Email" value={userData.email} />
//               <ProfileField label="Tipo de Usuário" value={userData.perfil} />
//               <ProfileField label="Morada" value={userData.morada} />
//               <ProfileField
//                 label="Número"
//                 value={numero}
//                 editable
//                 editing={editando}
//                 onChange={setNumero}
//               />
//               <ProfileField
//                 label="Data de Criação"
//                 value={new Date(userData.dataCriacao).toLocaleDateString()}
//               />
//             </div>

//             {/* Botões */}
//             {!editando ? (
//               <Button
//                 className="w-full md:w-1/3 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 text-lg"
//                 onClick={() => setEditando(true)}
//               >
//                 <Edit size={18} /> Editar número
//               </Button>
//             ) : (
//               <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2 mx-auto">
//                 <Button
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-lg"
//                   onClick={handleSalvar}
//                   disabled={loading}
//                 >
//                   <Check size={18} /> {loading ? "Salvando..." : "Salvar"}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="flex-1 flex items-center justify-center gap-2 text-lg"
//                   onClick={() => { setNumero(userData.numero || ""); setEditando(false); }}
//                 >
//                   <X size={18} /> Cancelar
//                 </Button>
//               </div>
//             )}

//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

// // Componente reutilizável para cada campo do perfil
// interface ProfileFieldProps {
//   label: string;
//   value: string;
//   editable?: boolean;
//   editing?: boolean;
//   onChange?: (value: string) => void;
// }

// function ProfileField({ label, value, editable = false, editing = false, onChange }: ProfileFieldProps) {
//   return (
//     <div className="flex flex-col">
//       <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
//       {editable && editing ? (
//         <Input value={value} onChange={e => onChange?.(e.target.value)} className="text-lg py-3" />
//       ) : (
//         <div className="px-5 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-lg">
//           {value || "-"}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Edit, Check, X } from "lucide-react";
// import { motion } from "framer-motion";
// import api from "@/lib/api";

// export default function PerfilPageMinimal() {
//   const [userData, setUserData] = useState<any>(null);
//   const [numero, setNumero] = useState("");
//   const [editando, setEditando] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userData");
//     if (storedUser) {
//       const parsed = JSON.parse(storedUser);
//       setUserData(parsed);
//       setNumero(parsed.numero || "");
//     }
//   }, []);

//   if (!userData)
//     return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Carregando...</p>;

//   const handleSalvar = async () => {
//     if (!userData) return;
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Usuário não autenticado");

//       const { data } = await api.put(`/usuarios/${userData.id}`, { numero }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const updated = { ...userData, numero: data.numero || numero };
//       localStorage.setItem("userData", JSON.stringify(updated));
//       setUserData(updated);
//       setEditando(false);
//     } catch (err: any) {
//       console.error(err);
//       alert(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-start p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="w-full max-w-[95%] md:max-w-[1100px]"
//       >
//         <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
//           <CardHeader className="bg-indigo-600 dark:bg-indigo-700 text-white p-4">
//             <CardTitle className="text-xl font-semibold text-center">Meu Perfil</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 space-y-4">

//             {/* Campos horizontais */}
//             <div className="flex flex-col gap-3 md:gap-4">
//               <ProfileRow label="Nome" value={userData.nome} />
//               <ProfileRow label="Email" value={userData.email} />
//               <ProfileRow label="Tipo de Usuário" value={userData.perfil} />
//               <ProfileRow label="Morada" value={userData.morada} />
//               <ProfileRow
//                 label="Número"
//                 value={numero}
//                 editable
//                 editing={editando}
//                 onChange={setNumero}
//               />
//               <ProfileRow label="Data de Criação" value={new Date(userData.dataCriacao).toLocaleDateString()} />
//             </div>

//             {/* Botões */}
//             {!editando ? (
//               <Button
//                 className="w-full md:w-1/3 mx-auto bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 text-sm"
//                 onClick={() => setEditando(true)}
//               >
//                 <Edit size={16} /> Editar número
//               </Button>
//             ) : (
//               <div className="flex flex-col md:flex-row gap-3 w-full md:w-1/2 mx-auto">
//                 <Button
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-sm"
//                   onClick={handleSalvar}
//                   disabled={loading}
//                 >
//                   <Check size={16} /> {loading ? "Salvando..." : "Salvar"}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="flex-1 flex items-center justify-center gap-2 text-sm"
//                   onClick={() => { setNumero(userData.numero || ""); setEditando(false); }}
//                 >
//                   <X size={16} /> Cancelar
//                 </Button>
//               </div>
//             )}

//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

// interface ProfileRowProps {
//   label: string;
//   value: string;
//   editable?: boolean;
//   editing?: boolean;
//   onChange?: (value: string) => void;
// }

// function ProfileRow({ label, value, editable = false, editing = false, onChange }: ProfileRowProps) {
//   return (
//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
//       <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-full md:w-1/3">{label}</span>
//       {editable && editing ? (
//         <Input
//           value={value}
//           onChange={e => onChange?.(e.target.value)}
//           className="text-sm py-1 w-full md:w-2/3"
//         />
//       ) : (
//         <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100 text-sm w-full md:w-2/3">
//           {value || "-"}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  useToast
} from "@/components/ui/toast";

export default function PerfilPage() {
  const [userData, setUserData] = useState<any>(null);
  const [numero, setNumero] = useState("");
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
      if (!token) throw new Error("Usuário não autenticado");

      const { data } = await api.put(`/usuarios/${userData.id}`, { numero }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = { ...userData, numero: data.numero || numero };
      localStorage.setItem("userData", JSON.stringify(updated));
      setUserData(updated);
      setEditando(false);

      // Toast sucesso
      toast({
        title: "Sucesso",
        description: "Número atualizado com sucesso!",
        variant: "success",
      });
    } catch (err: any) {
      console.error(err);

      // Toast erro
      toast({
        title: "Erro",
        description: err.response?.data?.message || err.message || "Falha ao atualizar número",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex justify-center items-start p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[95%] md:max-w-[1100px]"
        >
          <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
            <CardHeader className="bg-indigo-600 dark:bg-indigo-700 text-white p-5">
              <CardTitle className="text-2xl font-semibold text-center">Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-5">

              {/* Campos horizontais */}
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

              {/* Botões */}
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
      <ToastViewport />
    </ToastProvider>
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
