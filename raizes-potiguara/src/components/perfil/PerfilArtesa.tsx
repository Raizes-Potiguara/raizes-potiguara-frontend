import { CORES, RADIUS_PADRAO_BOTAO, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { Box, Button, Card, Carousel, Center, Circle, Flex, HStack,Icon,IconButton,Image, Skeleton, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, BoxIcon, ClipboardIcon, ClipboardList, Hexagon, Mic, NotebookIcon, Package, PackageOpen, Shrimp } from "lucide-react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState, useEffect } from "react";
import { ApiService } from "@/services/apiService";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";
import ImageTopCard from "../cards/ImageTopCard";
import MicButton from "../general/MicButton";
import HoneycombBackground from "../general/HoneycombBackground";
import { ARTESAS_DEMO } from "@/data/artesasDemo";

const TALITA_DEMO = ARTESAS_DEMO[0];

const PerfilArtesa = () => {

    const navigate = useNavigate();
	const [dados, setDados] = useState<any>({
		nome: TALITA_DEMO.nome,
		foto_url: TALITA_DEMO.foto,
	});

	useEffect(() => {
		const carregarPerfil = async () => {
			try {
				// Busca o perfil da artesã logada no orquestrador
				const perfil = await ApiService.request<any>("OBTER_PERFIL_ARTESA");
				if (perfil?.nome || perfil?.foto_url) {
					setDados(perfil);
				}
			} catch (error) {
				console.error("Falha ao carregar perfil.");
			}
		};

		carregarPerfil();
	}, []);

	const handleSair = async () => {
		try {
			await ApiService.request("LOGOUT");

			toaster.create({
				title: "Sessão encerrada",
				description: "Você saiu da sua conta.",
				type: "info",
				duration: 3000,
			});
			navigate("/");
		} catch (error) {
			navigate("/");
		}
	};

  return (
    <>
        <Box
        w={"full"}
        bgColor={CORES.PRETO}
        color={CORES.BRANCO}
        pt={16}
        >
            <HoneycombBackground/>
            <Box  position="relative" w="full" pt="72px">
                <Circle
                    size={"130px"}
                    bgColor={CORES.PRETO}
                    position="absolute"
                    top={0}
                    left="50%"
                    transform="translateX(-50%)"
                    borderWidth={10}
                    borderColor={CORES.PRETO}
                    color={CORES.BRANCO}
                    zIndex={2}
                >
					<Image
						src={dados.foto_url || TALITA_DEMO.foto}
						w="full"
						h="full"
						objectFit="cover"
						objectPosition={TALITA_DEMO.posicaoFoto}
						transform={`scale(${TALITA_DEMO.zoomFoto})`}
						borderRadius="full"
						alt={`Foto de ${dados?.nome || TALITA_DEMO.nome}`}
					/>
                </Circle>

                <Card.Root
                    bg={CORES.PRETO}
                    blur={"lg"}
                    borderTopRadius={24}
                    borderBottomRadius={0}
                    pt="50px"
                    zIndex={1}
                    border={"none"}
                >
                    <Card.Body
                    >
                        <Center>
                            <Text
								fontSize={TAMANHO.SUBTITULO_PAGINA}
								fontWeight={"bold"}
								textAlign={"center"}
								lineHeight={1}
								bgColor={CORES.BRANCO}
								color={CORES.CINZA_ESCURO}
								w={"fit"}
								className="hashira"
								letterSpacing={"wide"}
								px={4}
								py={1}
								rounded={2}
							>
								{(dados?.nome || TALITA_DEMO.nome).split(" ")[0]}
							</Text>
                        </Center>

                        <Flex flexDir={"column"} gap={8} my={8}>

                            <ImageTopCard
                                titulo="Alterar minhas informações"
                                imageUrl=""
                                bgColor={CORES.VERMELHO_ESCURO}
                                textColor={CORES.BRANCO}
                                iconId={ClipboardList}
                                to="info"
                            />

                            <ImageTopCard
                                titulo="Configurar meus produtos"
                                imageUrl=""
                                bgColor={CORES.MARROM}
                                textColor={CORES.BRANCO}
                                iconId={Package}
                                to="config"
                            />

                            <ImageTopCard
                                titulo="Explorar o Ybirá"
                                imageUrl=""
                                bgColor={CORES.VERMELHO_ESCURO}
                                textColor={CORES.BRANCO}
                                iconId={Shrimp}
                                to="/"
                            />
                        </Flex>

                        <Button
							onClick={handleSair}
							rounded={"full"}
							borderWidth={2}
							borderColor={CORES.CREME+"/60"}
							color={CORES.CREME}
							bgColor={CORES.PRETO}
							my={4}
							fontSize={TAMANHO.TEXTO_BOTAO}
							py={4}
							px={8}
							h={"full"}
						>
							Sair da conta
						</Button>

                        <MicButton />

                    </Card.Body>
                </Card.Root>
            </Box>
        </Box>
    </>
  );
};

export default PerfilArtesa;
