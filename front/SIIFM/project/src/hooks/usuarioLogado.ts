// hooks/useUsuarioLogado.ts
import { useEffect, useState } from "react";
import { parseJwt } from "@/lib/jwt";

export function useUsuarioLogado() {
  const [usuario, setUsuario] = useState<{ perfil: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    setUsuario(decoded);
  }, []);

  return usuario;
}
