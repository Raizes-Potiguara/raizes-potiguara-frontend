import { Navigate, type RouteObject } from "react-router";
import Layout from "./Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Cultura from "@/pages/Cultura";
import Artesas from "@/pages/Artesas";
import Loja from "@/pages/Loja";
import Produto from "@/pages/Produto";
import Perfil from "@/pages/Perfil";
import ConfigVenda from "@/pages/ConfigVenda";
import InfoArtesas from "@/pages/InfoArtesas";
import CadastroArtesas from "@/pages/CadastroArtesas";
import PerfilFundacao from "@/components/perfil/PerfilFundacao";
import ConfigVendaProduto from "@/pages/ConfigVendaProduto";
import AdminVisualizarArtesas from "@/pages/AdminVisualizarArtesas";
import ConfigVendaLoja from "@/pages/ConfigVendaLoja";

export const PublicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home/> },
            { path: '/login', element: <Login/> },
            { path: '/cultura', element: <Cultura/> },
            { path: '/artesas', element: <Artesas/> },
            { path: '/artesanato', element: <Loja/> },
            { path: '/artesanato/:idp', element: <Produto/> },
            { path: '/perfil/:id', element: <Perfil/> },
            { path: '/perfil/:id/info', element: <InfoArtesas/> },
            { path: '/perfil/:id/config', element: <ConfigVenda/> },
            { path: '/perfil/:id/config/loja', element: <ConfigVendaLoja/> },
            { path: '/perfil/:id/config/:idp', element: <ConfigVendaProduto/> },
            { path: '/perfil/:id/cadastro', element: <CadastroArtesas/> },

			// Rotas fundacao
			{ path: "/admin", element: <PerfilFundacao /> },
			{ path: "/admin/visualizar-artesas", element: <AdminVisualizarArtesas /> },
			{ path: "/admin/cadastro", element: <CadastroArtesas /> },
            { path: '*', element: <Navigate to="/" replace /> },
        ]
    }
];
