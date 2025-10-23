// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface RegisterFormProps {
//   onSubmit: (e: React.FormEvent) => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   formData: {
//     nome: string;
//     telefone: string;
//     senha: string;
//     morada: string;
//     perfil: string;

//   };
//   setFormData: React.Dispatch<React.SetStateAction<any>>;
// }

// export function RegisterForm({ onSubmit, onChange, formData, setFormData }: RegisterFormProps) {
//   return (
//     <form onSubmit={onSubmit} className="flex flex-col gap-4">
//       <Input
//         type="text"
//         name="nome"
//         placeholder="Nome completo"
//         value={formData.nome}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="tel"
//         name="telefone"
//         placeholder="Telefone"
//         value={formData.telefone}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <Input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.senha}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
      
//       <Input
//         type="text"
//         name="morada"
//         placeholder="morada"
//         value={formData.morada}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />


//       <Input
//         type="password"
//         name="senha"
//         placeholder="Senha"
//         value={formData.senha}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Input
//         type="password"
//         name="con_senha"
//         placeholder="confirmar senha"
//         value={formData.senha}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />


//       <Select
//         onValueChange={(value) => setFormData({ ...formData, perfil: value })}
//       >
//         <SelectTrigger className="border border-gray-300 dark:border-gray-700 rounded-md">
//           <SelectValue placeholder="Selecione o perfil" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="cliente">Comerciante</SelectItem>
//           <SelectItem value="admin">Admin</SelectItem>
//         </SelectContent>
//       </Select>

//       <Button
//         type="submit"
//         className="w-full mt-2 bg-blue-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 transition-all"
//       >
//         Cadastrar
//       </Button>
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormProps {
  onRegisterSuccess: (data: any) => void; // callback para o componente pai
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.senha !== formData.con_senha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
          senha: formData.senha,
          morada: formData.morada,
          perfil: formData.perfil,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Erro no cadastro");
      }

      const data = await res.json();
      onRegisterSuccess(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <Input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Input
        type="text"
        name="morada"
        placeholder="Morada"
        value={formData.morada}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Input
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Input
        type="password"
        name="con_senha"
        placeholder="Confirmar senha"
        value={formData.con_senha}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Select
        value={formData.perfil}
        onValueChange={(value) => setFormData(prev => ({ ...prev, perfil: value }))}
      >
        <SelectTrigger className="w-full border border-gray-300 dark:border-gray-700 rounded-md">
          <SelectValue placeholder="Selecione o perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cliente">Comerciante</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      {/* {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>} */}

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
