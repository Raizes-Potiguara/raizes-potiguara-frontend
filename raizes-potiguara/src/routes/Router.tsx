import { Navigate, type RouteObject } from "react-router";
import Layout from "./Layout";
import Home from "@/pages/Home";
import Cultura from "@/pages/Cultura";
import Artesas from "@/pages/Artesas";
import Loja from "@/pages/Loja";
import Produto from "@/pages/Produto";
import Perfil from "@/pages/Perfil";
import ConfigVenda from "@/pages/ConfigVenda";
import CadastroArtesas from "@/pages/CadastroArtesas";
import InfoArtesas from "@/pages/InfoArtesas";

export const PublicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home/> },
            { path: '/cultura', element: <Cultura/> },
            { path: '/artesas', element: <Artesas/> },
            { path: '/artesanato', element: <Loja/> },
            { path: '/artesanato/:idp', element: <Produto/> },
            { path: '/perfil/:id', element: <Perfil/> },
            { path: '/perfil/:id/info', element: <InfoArtesas/> },
            { path: '/perfil/:id/config', element: <ConfigVenda/> },
            { path: '/perfil/:id/cadastro', element: <CadastroArtesas/> },
            { path: '*', element: <Navigate to="/" replace /> },
        ]
    }
];
