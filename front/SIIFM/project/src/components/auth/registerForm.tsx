"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    nome: string;
    telefone: string;
    senha: string;
    perfil: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export function RegisterForm({ onSubmit, onChange, formData, setFormData }: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
        onChange={onChange}
        required
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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

      <Select
        onValueChange={(value) => setFormData({ ...formData, perfil: value })}
      >
        <SelectTrigger className="border border-gray-300 dark:border-gray-700 rounded-md">
          <SelectValue placeholder="Selecione o perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cliente">Cliente</SelectItem>
          <SelectItem value="admin">Administrador</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="submit"
        className="w-full mt-2 bg-blue-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 transition-all"
      >
        Cadastrar
      </Button>
    </form>
  );
}
