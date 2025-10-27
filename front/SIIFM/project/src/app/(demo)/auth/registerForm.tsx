// "use client";

// import { useState } from "react";
// import api from "@/lib/api"; // instância Axios
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface RegisterFormProps {
//   onRegisterSuccess: (data: any) => void;
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
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     if (formData.senha !== formData.con_senha) {
//       setError("Erro! senha nao coincide");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await api.post("/auth/register", {
//         nome: formData.nome,
//         telefone: formData.telefone,
//         email: formData.email,
//         senhaHash: formData.senha,
//         morada: formData.morada,
//         perfil: formData.perfil,
//       });

//       setSuccessMessage("Cadastro realizado com sucesso!");
//       onRegisterSuccess(res.data);
//     } catch (err: any) {
//       console.log(err.response);  // veja se tem algo aqui
//       console.log(err.request);   // veja se a requisição foi feita
//       console.log(err.message);   // mensagem do Axios
//     }



//     //  catch (err: any) {
//     //   if (err.response && err.response.data && err.response.data.message) {
//     //     // se a API retornou uma mensagem de erro
//     //     setError(err.response.data.message);
//     //   } else {
//     //     // erro genérico
//     //     setError("Ocorreu um erro ao processar a requisição");
//     //   }
//     // }


//   };

//   return (
//     <>
//       {/* Modal de erro animado */}
//       {error && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Fundo semi-transparente com fade */}
//           <div className="absolute inset-0 bg-black transition-opacity duration-300 opacity-30"></div>

//           {/* Modal centralizado com animação */}
//           <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full text-center transition-all duration-300 transform scale-100">
//             <h3 className="text-red-600 font-semibold mb-4">Erro</h3>
//             <p className="mb-4">{error}</p>
//             <Button
//               onClick={() => setError(null)}
//               className="bg-red-600 hover:bg-red-700 text-white w-full"
//             >
//               Fechar
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Modal de sucesso */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Fundo semi-transparente */}
//           <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300"></div>

//           {/* Modal centralizado */}
//           <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full text-center transition-all duration-300 transform scale-100">
//             <h3 className="text-green-600 font-semibold mb-4">Sucesso</h3>
//             <p className="mb-4">{successMessage}</p>
//             <Button
//               onClick={() => setSuccessMessage(null)}
//               className="bg-green-600 hover:bg-green-700 text-white w-full"
//             >
//               Fechar
//             </Button>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
//         <Input
//           type="text"
//           name="nome"
//           placeholder="Nome completo"
//           value={formData.nome}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="tel"
//           name="telefone"
//           placeholder="Telefone"
//           value={formData.telefone}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="text"
//           name="morada"
//           placeholder="Morada"
//           value={formData.morada}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="password"
//           name="senha"
//           placeholder="Senha"
//           value={formData.senha}
//           onChange={handleChange}
//           required
//         />
//         <Input
//           type="password"
//           name="con_senha"
//           placeholder="Confirmar senha"
//           value={formData.con_senha}
//           onChange={handleChange}
//           required
//         />

//         <Select
//           value={formData.perfil}
//           onValueChange={(value) => setFormData(prev => ({ ...prev, perfil: value }))}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Selecione o perfil" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="COMERCIANTE">Comerciante</SelectItem>
//             <SelectItem value="CIDADÃO">Cidadão</SelectItem>
//           </SelectContent>
//         </Select>

//         {successMessage && (
//           <p className="text-green-600 dark:text-green-400 text-center font-medium">{successMessage}</p>
//         )}



//         <Button
//           type="submit"
//           disabled={loading}
//           className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
//         >
//           {loading ? "Cadastrando..." : "Cadastrar"}
//         </Button>
//       </form>
//     </>
//   );
// }



"use client";

import { useState } from "react";
import api from "@/lib/api"; // instância Axios
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

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
  const [erro, setErro] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSuccessMessage(null);

    if (formData.senha !== formData.con_senha) {
      setErro("Erro! Senha não coincide");
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
      if (err.response?.data?.message) {
        setErro(err.response.data.message);
      } else {
        setErro("ERRO!, tente mais tarde! ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Alerta de erro */}
      {erro && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <AlertCircle size={20} /> {erro}
        </div>
      )}

      {/* Alerta de sucesso */}
      {successMessage && (
        <div className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {successMessage}
        </div>
      )}

      <Input type="text" name="nome" placeholder="Nome completo" value={formData.nome} onChange={handleChange} required />
      <Input type="tel" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
      <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <Input type="text" name="morada" placeholder="Morada" value={formData.morada} onChange={handleChange} required />
      <Input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
      <Input type="password" name="con_senha" placeholder="Confirmar senha" value={formData.con_senha} onChange={handleChange} required />

      <Select value={formData.perfil} onValueChange={(value) => setFormData(prev => ({ ...prev, perfil: value }))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="COMERCIANTE">Comerciante</SelectItem>
          <SelectItem value="CIDADÃO">Cidadão</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={loading} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2">
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
