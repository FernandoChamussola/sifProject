
// import {
//   Tag,
//   Users,
//   Settings,
//   Bookmark,
//   SquarePen,
//   LayoutGrid,
//   LucideIcon
// } from "lucide-react";
// import { parseJwt } from "@/lib/jwt"; // função para decodificar token

// type Submenu = {
//   href: string;
//   label: string;
//   active?: boolean;
// };

// type Menu = {
//   href: string;
//   label: string;
//   active?: boolean;
//   icon: LucideIcon;
//   submenus?: Submenu[];
// };

// type Group = {
//   groupLabel: string;
//   menus: Menu[];
// };

// export function getMenuList(pathname: string): Group[] {
//   const token = localStorage.getItem("token");
//   const usuario = parseJwt(token);
//   const isAdmin = usuario?.perfil === "ADMIN";

//   return [
//     {
//       groupLabel: "",
//       menus: [
//         // Dashboard só para admin
        
          
//               {
//                 href: "/dashboard/dashboard",
//                 label: "Dashboard",
//                 icon: LayoutGrid,
//                 submenus: [
//                   { href: "/dashboard", label: "dashboard" },
//                   { href: "/taxa", label: "taxas" },
//                   { href: "/usuarios", label: "usuarios" },
//                   { href: "/relatorio", label: "relatorios" },
//                 ],
//               },
                      
//       ],
//     },
//     {
//       groupLabel: "Contents",
//       menus: [
//         {
//           href: "",
//           label: "Pagamento",
//           icon: SquarePen,
//           submenus: [
//             { href: "/pagamento", label: "Pagamento" },
//             { href: "/pagamentos", label: "historicos" },
//           ],
//         },
//       ],
//     },
//     {
//       groupLabel: "Settings",
//       menus: [
//         {
//           href: "/account",
//           label: "Account",
//           icon: Settings,
//         },
//       ],
//     },
//   ];
// }



//  import {
//   Tag,
//   Users,
//   Settings,
//   Bookmark,
//   SquarePen,
//   LayoutGrid,
//   LucideIcon
// } from "lucide-react";
// import { parseJwt } from "@/lib/jwt";

// type Submenu = { href: string; label: string; active?: boolean; };
// type Menu = { href: string; label: string; active?: boolean; icon: LucideIcon; submenus?: Submenu[]; };
// type Group = { groupLabel: string; menus: Menu[]; };

// // Função segura (evita erro quando localStorage não existe)
// function getUserRole(): string | null {
//   if (typeof window === "undefined") return null;
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   try {
//     const usuario = parseJwt(token);
//     return usuario?.perfil ?? usuario?.role ?? null;
//   } catch {
//     return null;
//   }
// }

// export function getMenuList(): Group[] {
//   const role = getUserRole();
//   const isAdmin = role?.toUpperCase() === "ADMIN";

//   const groups: Group[] = [];

//   // Grupo principal
//   const mainMenus: Menu[] = [];

//   // Só adiciona Dashboard se for admin
//   if (isAdmin) {
//     mainMenus.push({
//       href: "/dashboard/dashboard",
//       label: "Dashboard",
//       icon: LayoutGrid,
//       submenus: [
//         { href: "/dashboard", label: "Dashboard" },
//         { href: "/taxa", label: "Taxas" },
//         { href: "/usuarios", label: "Usuários" },
//         { href: "/relatorio", label: "Relatórios" },
//       ],
//     });
//   }

//   groups.push({ groupLabel: "", menus: mainMenus });

//   groups.push({
//     groupLabel: "Contents",
//     menus: [
//       {
//         href: "",
//         label: "Pagamento",
//         icon: SquarePen,
//         submenus: [
//           { href: "/pagamento", label: "Pagamento" },
//           { href: "/pagamentos", label: "Históricos" },
//         ],
//       },
//     ],
//   });

//   groups.push({
//     groupLabel: "Settings",
//     menus: [
//       {
//         href: "/account",
//         label: "Account",
//         icon: Settings,
//       },
//     ],
//   });

//   return groups;
// }

import { useState, useEffect } from "react";
import {
  Tag,
  Users,
  Settings,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";
import { parseJwt } from "@/lib/jwt";

type Submenu = { href: string; label: string; active?: boolean };
type Menu = { href: string; label: string; active?: boolean; icon: LucideIcon; submenus?: Submenu[] };
type Group = { groupLabel: string; menus: Menu[] };

export function useMenuList() {
  const [menuList, setMenuList] = useState<Group[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;

    let role: string | null = null;
    try {
      const usuario = parseJwt(token);
      role = usuario?.perfil?.toUpperCase() ?? null;
    } catch {
      role = null;
    }

    const isAdmin = role === "ADMIN";
    const isComerciante = role === "COMERCIANTE";

    const groups: Group[] = [];

    // Dashboard só para admin
    if (isAdmin) {
      groups.push({
        groupLabel: "",
        menus: [
          {
            href: "/dashboard/dashboard",
            label: "Dashboard",
            icon: LayoutGrid,
            submenus: [
              { href: "/dashboard", label: "Dashboard" },
              { href: "/taxa", label: "Taxas" },
              { href: "/usuarios", label: "Usuários" },
              { href: "/relatorio", label: "Relatórios" },
            ],
          },
        ],
      });
    } else {
      groups.push({ groupLabel: "", menus: [] });
    }

    // Conteúdos visíveis para todos
    groups.push({
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Pagamento",
          icon: SquarePen,
          submenus: [
            { href: "/pagamento", label: "Pagamento" },
            { href: "/pagamentos", label: "Históricos" },
          ],
        },
      ],
    });

    // Configurações
    groups.push({
      groupLabel: "Settings",
      menus: [
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    });

    // Menus de comerciante
    if (isComerciante) {
      groups.push({
        groupLabel: "Comerciante",
        menus: [
          { href: "/meus-produtos", label: "Meus Produtos", icon: Tag },
          { href: "/clientes", label: "Clientes", icon: Users },
        ],
      });
    }

    setMenuList(groups);
  }, []);

  return menuList;
}
