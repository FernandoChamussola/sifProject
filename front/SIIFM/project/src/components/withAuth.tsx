"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedPage = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login"); // redireciona se não estiver logado
      } else {
        setLoading(false); // libera o acesso
      }
    }, [router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen text-gray-500">
          Verificando autenticação...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedPage;
}
