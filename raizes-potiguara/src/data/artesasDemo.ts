import fotoIvanildaRocha from "@/assets/artesa-ivanilda-rocha.jpeg";
import fotoTalitaBrito from "@/assets/artesa-talita-brito.jpeg";

export interface ArtesaDemo {
	id: number;
	uuid: string;
	nome: string;
	aldeia: string;
	descricao: string;
	producao: string;
	materiais: string[];
	chave_pix: string;
	tipo_conta: "ARTESA";
	foto: string;
	posicaoFoto: string;
	zoomFoto: number;
	produtos: number;
}

export const ARTESAS_DEMO: ArtesaDemo[] = [
	{
		id: 1,
		uuid: "01",
		nome: "Talita Brito",
		aldeia: "Zona Urbana Baia da Traição",
		descricao: "Produz joias com miçangas de vidro. Insta: tara_arteindigena",
		producao: "joias com miçangas de vidro",
		materiais: ["miçangas de vidro", "joias", "fios"],
		chave_pix: "simulado01",
		tipo_conta: "ARTESA",
		foto: fotoTalitaBrito,
		posicaoFoto: "center 32%",
		zoomFoto: 1.35,
		produtos: 0,
	},
	{
		id: 2,
		uuid: "02",
		nome: "Ivanilda Rocha",
		aldeia: "Aldeia Alto do Tambá",
		descricao: "Produz biojoias, joias com miçangas e costura criativa",
		producao: "biojoias, joias com miçangas e costura criativa",
		materiais: ["biojoias", "miçangas", "costura criativa"],
		chave_pix: "simulado02",
		tipo_conta: "ARTESA",
		foto: fotoIvanildaRocha,
		posicaoFoto: "center 42%",
		zoomFoto: 1.25,
		produtos: 0,
	},
];
