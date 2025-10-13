"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redireciona para dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 rounded-lg shadow-lg bg-card dark:bg-gray-900 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded-md bg-background dark:bg-gray-800 border-border text-foreground"
        />

        <input
          type="password"
          placeholder="Senha"
          required
          className="w-full px-3 py-2 border rounded-md bg-background dark:bg-gray-800 border-border text-foreground"
        />

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
