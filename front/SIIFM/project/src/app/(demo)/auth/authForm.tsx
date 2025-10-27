// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Next.js 13+ App Router
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { LogIn, UserPlus } from "lucide-react";
// import { LoginForm } from "./loginForm";
// import { RegisterForm } from "./registerForm";

// export function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [userData, setUserData] = useState<{ nome: string; perfil: string } | null>(null);
//   const router = useRouter();

//   // Verifica se o usuário já está logado ao carregar a página
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("userData");
//     if (token && user) {
//       const parsedUser = JSON.parse(user);
//       setUserData(parsedUser);
//       router.push("/pagamentos"); // ou "/dashboard" dependendo da página inicial
//     }
//   }, [router]);

//   // Callback quando login é bem-sucedido
//   const handleLoginSuccess = (data: any) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("userData", JSON.stringify(data.userData)); // salva dados do usuário
//     setUserData(data.userData);

//     alert(`Bem-vindo, ${data.userData.nome}!`);

//     router.push("/pagamentos"); // redireciona após login
//   };

//   // Callback quando registro é bem-sucedido
//   const handleRegisterSuccess = (data: any) => {
//     alert(data.message || "Cadastro realizado com sucesso!");
//     setIsLogin(true); // volta para login após registro
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black transition-colors">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
//         <Card className="w-[690px] shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden flex">

//           {/* Painel lateral */}
//           <AuthSidePanel
//             isLogin={isLogin}
//             onToggle={() => setIsLogin(!isLogin)}
//             userData={userData}
//           />

//           {/* Área de formulário */}
//           <div className="flex-1 p-10 flex items-center justify-center">
//             <CardContent className="w-full">
//               <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
//                 {isLogin ? "Entrar" : "Cadastrar"}
//               </h2>

//               {isLogin ? (
//                 <LoginForm onLoginSuccess={handleLoginSuccess} />
//               ) : (
//                 <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
//               )}
//             </CardContent>
//           </div>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

// // Painel lateral
// export function AuthSidePanel({
//   isLogin,
//   onToggle,
//   userData,
// }: {
//   isLogin: boolean;
//   onToggle: () => void;
//   userData: { nome: string; perfil: string } | null;
// }) {
//   return (
//     <div className="w-64 bg-gradient-to-br from-blue-900 to-blue-400 text-white flex flex-col justify-between p-6 space-y-6 min-h-[450px] rounded-r-[40px] shadow-md transition-all">
      
//       <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
//         <h1 className="text-xl font-bold">
//           {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
//         </h1>
//         <p className="text-sm opacity-90 leading-relaxed px-2">
//           {isLogin
//             ? "Acesse sua conta para continuar usando nossos serviços."
//             : "Cadastre-se para acessar todos os recursos disponíveis."}
//         </p>

//         {/* Label Dashboard apenas para ADMIN */}
//         {userData && userData.perfil === "ADMIN" && (
//           <p className="mt-4 font-semibold text-yellow-200">Dashboard</p>
//         )}
//       </div>

//       <Button
//         variant="secondary"
//         onClick={onToggle}
//         className="bg-white text-blue-700 hover:bg-gray-100 font-semibold flex items-center justify-center rounded-full py-2 shadow-sm"
//       >
//         {isLogin ? (
//           <>
//             <UserPlus className="mr-2 h-5 w-5" /> Criar conta
//           </>
//         ) : (
//           <>
//             <LogIn className="mr-2 h-5 w-5" /> Fazer login
//           </>
//         )}
//       </Button>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState<{ nome: string; perfil: string } | null>(null);
  const router = useRouter();

  // Verifica se o usuário já está logado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userData");
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      router.push("/dashboard"); // ou "/dashboard" dependendo da página inicial
    }
  }, [router]);

  // Callback quando login é bem-sucedido
  const handleLoginSuccess = (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userData", JSON.stringify(data.userData)); // salva dados do usuário
    setUserData(data.userData);

    alert(`Bem-vindo, ${data.userData.nome}!`);

    router.push("/home"); // redireciona após login
  };

  // Callback quando registro é bem-sucedido
  const handleRegisterSuccess = (data: any) => {
    alert(data.message || "Cadastro realizado com sucesso!");
    setIsLogin(true); // volta para login após registro
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black transition-colors">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="w-[690px] shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden flex">

          {/* Painel lateral */}
          <AuthSidePanel
            isLogin={isLogin}
            onToggle={() => setIsLogin(!isLogin)}
            userData={userData}
          />

          {/* Área de formulário */}
          <div className="flex-1 p-10 flex items-center justify-center">
            <CardContent className="w-full">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                {isLogin ? "Entrar" : "Cadastrar"}
              </h2>

              {isLogin ? (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              ) : (
                <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
              )}
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// Painel lateral
export function AuthSidePanel({
  isLogin,
  onToggle,
  userData,
}: {
  isLogin: boolean;
  onToggle: () => void;
  userData: { nome: string; perfil: string } | null;
}) {
  return (
    <div className="w-64 bg-gradient-to-br from-blue-900 to-blue-400 text-white flex flex-col justify-between p-6 space-y-6 min-h-[450px] rounded-r-[40px] shadow-md transition-all">
      
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
        <h1 className="text-xl font-bold">
          {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
        </h1>
        <p className="text-sm opacity-90 leading-relaxed px-2">
          {isLogin
            ? "Acesse sua conta para continuar usando nossos serviços."
            : "Cadastre-se para acessar todos os recursos disponíveis."}
        </p>

        {/* Label Dashboard apenas para ADMIN */}
        {userData && userData.perfil === "ADMIN" && (
          <p className="mt-4 font-semibold text-yellow-200">Dashboard</p>
        )}
      </div>

      <Button
        variant="secondary"
        onClick={onToggle}
        className="bg-white text-blue-700 hover:bg-gray-100 font-semibold flex items-center justify-center rounded-full py-2 shadow-sm"
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
  );
}
