

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { LogIn, UserPlus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";

// export  function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     nome: "",
//     telefone: "",
//     senha: "",
//   });

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e: any) => {
//     e.preventDefault();
//     const res = await fetch("/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         telefone: formData.telefone,
//         senha: formData.senha,
//       }),
//     });
//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       alert(`Bem-vindo, ${data.nome}!`);
//     } else {
//       alert("Telefone ou senha incorretos.");
//     }
//   };

//   const handleRegister = async (e: any) => {
//     e.preventDefault();
//     const res = await fetch("/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     alert(data.message || "Cadastro realizado com sucesso!");
//   };



//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black transition-colors">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Card className="w-[800px] shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* --- Lado esquerdo (informativo) --- */}
//             <div className="md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10 space-y-6">
//               <h1 className="text-3xl font-bold text-center">
//                 {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
//               </h1>
//               <p className="text-center opacity-90 text-sm">
//                 {isLogin
//                   ? "Acesse sua conta para continuar usando nossos serviços."
//                   : "Cadastre-se para acessar todos os recursos disponíveis."}
//               </p>

//               <div>
//                 {isLogin ? (
//                   <>
//                     <p className="text-sm mb-2">Ainda não tem conta?</p>
//                     <Button
//                       variant="secondary"
//                       onClick={() => setIsLogin(false)}
//                       className="bg-white text-blue-700 hover:bg-gray-100 font-semibold"
//                     >
//                       <UserPlus className="mr-2 h-5 w-5" /> Criar conta
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-sm mb-2">Já tem conta?</p>
//                     <Button
//                       variant="secondary"
//                       onClick={() => setIsLogin(true)}
//                       className="bg-white text-blue-700 hover:bg-gray-100 font-semibold"
//                     >
//                       <LogIn className="mr-2 h-5 w-5" /> Fazer login
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* --- Lado direito (formulário) --- */}
//             <div className="md:w-1/2 p-10 flex items-center justify-center">
//               <CardContent className="w-full">
//                 <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
//                   {isLogin ? "Entrar" : "Cadastrar"}
//                 </h2>

//                 {isLogin ? (
//                   <form onSubmit={handleLogin} className="space-y-4">
//                     <Input
//                       name="telefone"
//                       placeholder="Telefone"
//                       value={formData.telefone}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Input
//                       type="password"
//                       name="senha"
//                       placeholder="Senha"
//                       value={formData.senha}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Button type="submit" className="w-full mt-2">
//                       Entrar
//                     </Button>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleRegister} className="space-y-4">
//                     <Input
//                       name="nome"
//                       placeholder="Nome completo"
//                       value={formData.nome}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Input
//                       name="telefone"
//                       placeholder="Telefone"
//                       value={formData.telefone}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Input
//                       type="password"
//                       name="senha"
//                       placeholder="Crie uma senha"
//                       value={formData.senha}
//                       onChange={handleChange}
//                       required
//                     />
//                     <Button type="submit" className="w-full mt-2">
//                       Cadastrar
//                     </Button>
//                   </form>
//                 )}
//               </CardContent>
//             </div>
//           </div>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    senha: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telefone: formData.telefone,
        senha: formData.senha,
      }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert(`Bem-vindo, ${data.nome}!`);
    } else {
      alert("Telefone ou senha incorretos.");
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message || "Cadastro realizado com sucesso!");
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-[600px] shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden flex">
          {/* --- Lado esquerdo (informações) --- */}

          <div className="w-60 bg-blue-600 text-white flex flex-col justify-between p-6 space-y-6 min-h-[450px]">

            {/* <div className="space-y-4"> }
              <h1 className="text-xl font-bold">
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
              </h1>
              <p className="text-sm opacity-90">
                {isLogin
                  ? "Acesse sua conta para continuar usando nossos serviços."
                  : "Cadastre-se para acessar todos os recursos disponíveis."}
              </p>
            </div> */}

            <div className="flex flex-col items-center justify-center h-full  rounded-l-4xl p-9 shadow-lg space-y-4">
              <h1 className="text-xl font-bold text-center">
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
              </h1>
              <p className="text-sm opacity-90 text-center">
                {isLogin
                  ? "Acesse sua conta para continuar usando nossos serviços."
                  : "Cadastre-se para acessar todos os recursos disponíveis."}
              </p>
            </div>



            <Button
              variant="secondary"
              onClick={() => setIsLogin(!isLogin)}
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold flex items-center"
            >
              {isLogin ? (
                <>
                  <UserPlus className="mr-2 h-5 w-5" /> Criar conta
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" /> Fazer login
                </>
              )}
            </Button>
          </div>

          {/* --- Lado direito (formulário) --- */}
          <div className="flex-1 p-10 flex items-center justify-center">
            <CardContent className="w-full">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                {isLogin ? "Entrar" : "Cadastrar"}
              </h2>

              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
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
                  <Button type="submit" className="w-full mt-2">
                    Entrar
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    name="nome"
                    placeholder="Nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="password"
                    name="senha"
                    placeholder="Crie uma senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit" className="w-full mt-2">
                    Cadastrar
                  </Button>
                </form>
              )}
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
