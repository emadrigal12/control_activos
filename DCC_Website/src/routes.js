// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Profile from "views/Dashboard/Profile.js";
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
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/gestion-activos",
    name: "Gestión de Activos",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/ingresar-activos",
    name: "Ingresar Activos",
    icon: <DocumentIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/sincronizar-datos",
    name: "Sincronizar Datos",
    icon: <RocketIcon color="inherit" />,
    component: Billing,
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
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/profile",
        name: "Ayuda",
        icon: <HelpIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
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
