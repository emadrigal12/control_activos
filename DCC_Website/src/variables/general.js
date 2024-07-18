// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar8 from "assets/img/avatars/avatar8.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import avatar10 from "assets/img/avatars/avatar10.png";
// Custom icons
import {
  AdobexdLogo,
  AtlassianLogo,
  InvisionLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons.js";
import { AiOutlineExclamation } from "react-icons/ai";
import { FaArrowDown, FaArrowUp, FaFilePdf } from "react-icons/fa";
import { MdDonutSmall } from "react-icons/md";

export const dashboardTableData = [
  {
    id: 1,
    logo: AdobexdLogo,
    name: "Chakra",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "1,264",
    progression: 60,
  },
  {
    id: 2,
    logo: AtlassianLogo,
    name: "Atlassian",
    members: [avatar3, avatar2],
    budget: "3,264",
    progression: 10,
  },
  {
    id: 3,
    logo: SlackLogo,
    name: "Slack",
    members: [avatar10, avatar4],
    budget: "823",
    progression: 100,
  },
  {
    id: 4,
    logo: SpotifyLogo,
    name: "Spotify",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "1,234",
    progression: 100,
  },
  {
    id: 5,
    logo: JiraLogo,
    name: "Jira",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "2,564",
    progression: 25,
  },
  {
    id: 6,
    logo: InvisionLogo,
    name: "Invision",
    members: [avatar9, avatar3, avatar2],
    budget: "344",
    progression: 40,
  },
];

export const timelineData = [
  {
    logo: MdDonutSmall,
    title: "Canasta Tipo Escalera Chastworth",
    date: "V1135353",
    color: "brand.200",
  },
  {
    logo: MdDonutSmall,
    title: "Máquina de Impresión Industrial",
    date: "V1135354",
    color: "brand.200",
  },
  {
    logo: MdDonutSmall,
    title: "Equipo de Envasado Automático",
    date: "V1135355",
    color: "brand.200",
  },
  {
    logo: MdDonutSmall,
    title: "Robot de Ensamblaje Avanzado",
    date: "V1135356",
    color: "brand.200",
  },
  {
    logo: MdDonutSmall,
    title: "Equipo de Pruebas de Laboratorio",
    date: "V1135357",
    color: "brand.200",
  },
  {
    logo: MdDonutSmall,
    title: "Máquina de Corte por Láser",
    date: "V1135358",
    color: "brand.200",
  },
];

export const tablesTableData = [
  {
    Id: 1,
    imagen: avatar1,
    Descripcion: "Abanico",
    Ubicacion: "54564",
    En_Uso: "Disponible",
    Depreciado: "Sin Depreciar",
    Responsable: "Responsable: Emiliano Madrigal",
    Activo_Num: "Activo #: 5487",
    Tipo: "Tipo: Mobiliario y Equipos",
    Marca: "Marca: Iasko",
    Id_Usuario: 5,
  },
];

export const tablesProjectData = [
  {
    logo: AdobexdLogo,
    name: "Vision UI Version",
    budget: "$14,000",
    status: "Working",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    budget: "$3,000",
    status: "Canceled",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    budget: "Not set",
    status: "Done",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    budget: "$32,000",
    status: "Done",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    budget: "$400",
    status: "Working",
    progression: 25,
  },
];

export const invoicesData = [
  {
    date: "Ubicación",
    code: "102",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "June, 25, 2019",
    code: "#QW-103578",
    price: "$120",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "March, 01, 2019",
    code: "#AR-803481",
    price: "$300",
    logo: FaFilePdf,
    format: "PDF",
  },
];

export const billingData = [
  {
    id: 1,
    ubicacion: "102",
    responsable: "Emiliano Madrigal",
    activoNum: "5487",
    tipo: "Mobiliario y Equipos",
    marca: "Iasko",
    modelo: "4916",
    descripcion: "Abanico",
    estado: "En Uso",
  },
  {
    id: 2,
    ubicacion: "68",
    responsable: "María Paula Lobo",
    activoNum: "3262",
    tipo: "Herramientas y Utensilios",
    marca: "Chastworth",
    modelo: "4916",
    descripcion: "Canasta Tipo Escalera",
    estado: "En Uso, Depreciado",
  },
];

export const newestTransactions = [
  {
    name: "Netflix",
    date: "27 March 2021, at 12:30 PM",
    price: "- $2,500",
    logo: FaArrowDown,
  },
  {
    name: "Apple",
    date: "27 March 2021, at 12:30 PM",
    price: "+ $2,500",
    logo: FaArrowUp,
  },
];

export const olderTransactions = [
  {
    name: "Stripe",
    date: "26 March 2021, at 13:45 PM",
    price: "+ $800",
    logo: FaArrowUp,
  },
  {
    name: "HubSpot",
    date: "26 March 2021, at 12:30 PM",
    price: "+ $1,700",
    logo: FaArrowUp,
  },
  {
    name: "Webflow",
    date: "26 March 2021, at 05:00 PM",
    price: "Pending",
    logo: AiOutlineExclamation,
  },
  {
    name: "Microsoft",
    date: "25 March 2021, at 16:30 PM",
    price: "- $987",
    logo: FaArrowDown,
  },
];
