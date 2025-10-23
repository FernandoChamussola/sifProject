"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onLoginSuccess: (data: any) => void; // callback para enviar token e userData ao pai
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text(); // captura HTML de erro se não for JSON
        throw new Error(text || "Erro no login");
      }

      const data = await res.json();
      // envia token e userData para o componente pai
      onLoginSuccess(data);
    } catch (err: any) {
      setError(err.message || "Erro ao logar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
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
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-all"
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}

