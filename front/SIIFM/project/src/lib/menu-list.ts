import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

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
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [

             {
              href: "/dashboard2",
              label: "dashboard"
            },
              {
              href: "/taxa",
              label: "taxas"
            },  {
              href: "/usuarios",
              label: "usuarios"
            },
            {
              href: "/relatorio",
              label: "relatorios"
            },
    
          ]
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Pagamento",
          icon: SquarePen,
          submenus: [
            {
              href: "/pagamento",
              label: "Pagamento"
            },
            {
              href: "/pagamentos",
              label: "historicos"
            }
          ]
        },
        // {
        //   href: "/categories",
        //   label: "Categories",
        //   icon: Bookmark
        // },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   icon: Tag
        // }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        // {
        //   // href: "/usuarios",
        //   // label: "Users",
        //   // icon: Users
        // },
        {
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}
