// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface LoginFormProps {
//   onSubmit: (e: React.FormEvent) => void;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   formData: {
//     telefone: string;
//     senha: string;
//   };
// }

// export function LoginForm({ onSubmit, onChange, formData }: LoginFormProps) {
//   return (
//     <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
//         type="password"
//         name="senha"
//         placeholder="Senha"
//         value={formData.senha}
//         onChange={onChange}
//         required
//         className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <Button
//         type="submit"
//         className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
//       >
//         Entrar
//       </Button>
//     </form>
//   );
// }



"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    telefone: string;
    senha: string;
  };
}

export function LoginForm({ onSubmit, onChange, formData }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={onChange}
        required
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Input
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={onChange}
        required
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

     

      <Button
        type="submit"
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
        >
        Entrar
      </Button>

      
       {/* Link para recuperar senha */}

       <div className="text-right">
        <a
          href="/recuperar-senha"
          className="text-sm text-blue-600 dark:text-blue-800 hover:underline"
        >
          Esqueceu a senha?
        </a>
      </div>  


        
    </form>
  );
}
