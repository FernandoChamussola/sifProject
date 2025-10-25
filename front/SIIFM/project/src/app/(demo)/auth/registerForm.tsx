
// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface RegisterFormProps {
//   onRegisterSuccess: (data: any) => void; // callback para o componente pai
// }

// export function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
//   const [formData, setFormData] = useState({
//     nome: "",
//     telefone: "",
//     email: "",
//     senha: "",
//     con_senha: "",
//     morada: "",
//     perfil: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (formData.senha !== formData.con_senha) {
//       setError("As senhas não coincidem.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           nome: formData.nome,
//           telefone: formData.telefone,
//           email: formData.email,
//           senha: formData.senha,
//           morada: formData.morada,
//           perfil: formData.perfil,
//         }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || "Erro no cadastro");
//       }

//       const data = await res.json();
//       onRegisterSuccess(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
//       <Input
//         type="text"
//         name="nome"
//         placeholder="Nome completo"
//         value={formData.nome}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="tel"
//         name="telefone"
//         placeholder="Telefone"
//         value={formData.telefone}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="text"
//         name="morada"
//         placeholder="Morada"
//         value={formData.morada}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="password"
//         name="senha"
//         placeholder="Senha"
//         value={formData.senha}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="password"
//         name="con_senha"
//         placeholder="Confirmar senha"
//         value={formData.con_senha}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Select
//         value={formData.perfil}
//         onValueChange={(value) => setFormData(prev => ({ ...prev, perfil: value }))}
//       >
//         <SelectTrigger className="w-full border border-gray-300 dark:border-gray-700 rounded-md">
//           <SelectValue placeholder="Selecione o perfil" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="cliente">Comerciante</SelectItem>
//           <SelectItem value="admin">Admin</SelectItem>
//         </SelectContent>
//       </Select>

//       {/* {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>} */}

//       <Button
//         type="submit"
//         disabled={loading}
//         className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
//       >
//         {loading ? "Cadastrando..." : "Cadastrar"}
//       </Button>
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import api from "@/lib/api"; // instância Axios
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormProps {
  onRegisterSuccess: (data: any) => void;
}

export function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    con_senha: "",
    morada: "",
    perfil: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (formData.senha !== formData.con_senha) {
      setError("Erro ao cadastrar");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        senhaHash: formData.senha, 
        morada: formData.morada,
        perfil: formData.perfil,
      });

      setSuccessMessage("Cadastro realizado com sucesso!");
      onRegisterSuccess(res.data);
    } catch (err: any) {
      // sempre exibe mensagem genérica
      setError("Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal de erro */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-red-600 font-semibold mb-4">Erro</h3>
            <p className="mb-4">{error}</p>
            <Button
              onClick={() => setError(null)}
              className="bg-red-600 hover:bg-red-700 text-white w-full"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
        <Input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="morada"
          placeholder="Morada"
          value={formData.morada}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="con_senha"
          placeholder="Confirmar senha"
          value={formData.con_senha}
          onChange={handleChange}
          required
        />

        <Select
          value={formData.perfil}
          onValueChange={(value) => setFormData(prev => ({ ...prev, perfil: value }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMERCIANTE">Comerciante</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="CIDADÃO">Cidadão</SelectItem>
          </SelectContent>
        </Select>

        {successMessage && (
          <p className="text-green-600 dark:text-green-400 text-center font-medium">{successMessage}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </>
  );
}
