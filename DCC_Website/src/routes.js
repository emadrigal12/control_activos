// import
import Inicio from "views/Dashboard/Inicio.js";
import GestionarActivos from "views/Dashboard/GestionarActivos.js";
import IngresarActivos from "views/Dashboard/IngresarActivos.js";
import MiPerfil from "views/Dashboard/MiPerfil.js";
import SignIn from "views/Pages/SignIn.js";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  HelpIcon,
  RocketIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/inicio",
    name: "Inicio",
    icon: <HomeIcon color="inherit" />,
    component: Inicio,
    layout: "/admin",
  },
  {
    path: "/gestion-activos",
    name: "Gestión de Activos",
    icon: <StatsIcon color="inherit" />,
    component: GestionarActivos,
    layout: "/admin",
  },
  {
    path: "/ingresar-activos",
    name: "Ingresar Activos",
    icon: <DocumentIcon color="inherit" />,
    component: IngresarActivos,
    layout: "/admin",
  },
  {
    path: "/sincronizar-datos",
    name: "Sincronizar Datos",
    icon: <RocketIcon color="inherit" />,
    component: IngresarActivos,
    layout: "/admin",
  },
  {
    name: "OTRAS OPCIONES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/perfil",
        name: "Mi Perfil",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: MiPerfil,
        layout: "/admin",
      },
      {
        path: "/profile",
        name: "Ayuda",
        icon: <HelpIcon color="inherit" />,
        secondaryNavbar: true,
        component: MiPerfil,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In (Temp)",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
