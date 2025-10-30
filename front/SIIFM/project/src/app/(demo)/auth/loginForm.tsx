"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import api from "@/lib/api";

interface LoginFormProps {
  onLoginSuccess: (data: any) => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const { data } = await api.post("/auth/login", formData);
      onLoginSuccess(data);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErro(err.response.data.message );
        console.log(err.response);
      } else {
        setErro(err.message );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      {erro && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          <AlertCircle size={20} /> {erro}
        </div>
      )}

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
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

      <Button type="submit" disabled={loading} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
