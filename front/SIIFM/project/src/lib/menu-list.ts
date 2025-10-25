// import {
//   Tag,
//   Users,
//   Settings,
//   Bookmark,
//   SquarePen,
//   LayoutGrid,
//   LucideIcon
// } from "lucide-react";

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
//   return [
//     {
//       groupLabel: "",
//       menus: [
//         {
//           href: "/dashboard/dashboard",
//           label: "Dashboard",
//           icon: LayoutGrid,
//           submenus: [

//              {
//               href: "/dashboard2",
//               label: "dashboard"
//             },
//               {
//               href: "/taxa",
//               label: "taxas"
//             },  {
//               href: "/usuarios",
//               label: "usuarios"
//             },
//             {
//               href: "/relatorio",
//               label: "relatorios"
//             },
    
//           ]
//         }
//       ]
//     },
//     {
//       groupLabel: "Contents",
//       menus: [
//         {
//           href: "",
//           label: "Pagamento",
//           icon: SquarePen,
//           submenus: [
//             {
//               href: "/pagamento",
//               label: "Pagamento"
//             },
//             {
//               href: "/pagamentos",
//               label: "historicos"
//             }
//           ]
//         },
      
//       ]
//     },
//     {
//       groupLabel: "Settings",
//       menus: [
      
//         {
//           href: "/account",
//           label: "Account",
//           icon: Settings
//         }
//       ]
//     }
//   ];
// }



import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";
import { parseJwt } from "@/lib/jwt"; // função para decodificar token

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const token = localStorage.getItem("token");
  const usuario = parseJwt(token);
  const isAdmin = usuario?.perfil === "ADMIN";

  return [
    {
      groupLabel: "",
      menus: [
        // Dashboard só para admin
        ...(isAdmin
          ? [
              {
                href: "/dashboard/dashboard",
                label: "Dashboard",
                icon: LayoutGrid,
                submenus: [
                  { href: "/dashboard", label: "dashboard" },
                  { href: "/taxa", label: "taxas" },
                  { href: "/usuarios", label: "usuarios" },
                  { href: "/relatorio", label: "relatorios" },
                ],
              },
            ]
          : []),
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Pagamento",
          icon: SquarePen,
          submenus: [
            { href: "/pagamento", label: "Pagamento" },
            { href: "/pagamentos", label: "historicos" },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
