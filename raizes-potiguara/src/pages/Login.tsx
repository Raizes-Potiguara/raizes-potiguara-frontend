import HoneycombBackground from "@/components/general/HoneycombBackground";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ChevronDown, Landmark, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const opcoesLogin = [
	{
		label: "Cliente",
		descricao: "Entrar para conhecer a vitrine e a cultura Potiguara.",
		rota: "/",
		icon: ShoppingBag,
	},
	{
		label: "Fundação",
		descricao: "Acessar o painel administrativo da Fundação.",
		rota: "/admin",
		icon: Landmark,
	},
	{
		label: "Artesã",
		descricao: "Entrar como Talita Brito para cadastrar peças.",
		rota: "/perfil/1",
		icon: UserRound,
	},
];

const Login = () => {
	const navigate = useNavigate();
	const [aberto, setAberto] = useState(false);

	return (
		<Box as="section" position="relative" minH="calc(100vh - 76px)" bg={CORES.PRETO} overflow="hidden">
			<HoneycombBackground />

			<Flex
				position="relative"
				zIndex={2}
				minH="calc(100vh - 76px)"
				px={{ base: 6, md: 10 }}
				py={{ base: 14, md: 20 }}
				align="center"
				justify="center"
			>
				<VStack align="stretch" gap={6} w="full" maxW="460px">
					<Box
						bg={CORES.BRANCO}
						border={`2px solid ${CORES.PRETO}`}
						borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
						boxShadow="4px 4px 0px rgba(0,0,0,0.35)"
						px={{ base: 5, md: 7 }}
						py={{ base: 3, md: 4 }}
						w="fit-content"
						css={{
							backgroundImage: `
								linear-gradient(${CORES.CINZA_CLARO}33 1px, transparent 1px),
								linear-gradient(90deg, ${CORES.CINZA_CLARO}33 1px, transparent 1px)
							`,
							backgroundSize: "14px 14px",
						}}
					>
						<Heading
							as="h1"
							className="hashira"
							fontWeight="normal"
							lineHeight={1}
							color={CORES.VERMELHO_ESCURO}
							fontSize={`${TAMANHO.TITULO_PAGINA}px`}
						>
							Login
						</Heading>
					</Box>

					<Box>
						<Text
							color={CORES.BRANCO}
							fontWeight="bold"
							fontSize={`${TAMANHO.SUBTITULO_SUBSECAO}px`}
							lineHeight={1.25}
							maxW="380px"
						>
							Escolha o perfil para continuar na experiência Ybirá.
						</Text>
					</Box>

					<Box position="relative">
						<Button
							type="button"
							w="full"
							h="58px"
							px={5}
							justifyContent="space-between"
							bg={CORES.BRANCO}
							color={CORES.PRETO}
							borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
							boxShadow="4px 4px 0px rgba(0,0,0,0.35)"
							fontWeight="800"
							fontSize={`${TAMANHO.CORPO_TEXTO}px`}
							onClick={() => setAberto((valor) => !valor)}
							_hover={{ bg: CORES.CREME }}
						>
							<Text>Escolha seu perfil</Text>
							<ChevronDown
								size={22}
								style={{
									transform: aberto ? "rotate(180deg)" : "rotate(0deg)",
									transition: "transform 160ms ease",
								}}
							/>
						</Button>

						{aberto && (
							<VStack
								align="stretch"
								gap={3}
								mt={3}
								p={3}
								bg={CORES.BRANCO}
								borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
								boxShadow="4px 4px 0px rgba(0,0,0,0.35)"
							>
								{opcoesLogin.map(({ label, descricao, rota, icon: OpcaoIcon }) => (
									<Button
										key={label}
										type="button"
										minH="70px"
										h="auto"
										px={4}
										py={3}
										justifyContent="flex-start"
										bg={CORES.VERMELHO_CLARINHO}
										color={CORES.PRETO}
										borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
										onClick={() => navigate(rota)}
										_hover={{ bg: CORES.CINZA_CLARINHO }}
									>
										<Flex align="center" gap={3} textAlign="left">
											<Icon color={CORES.VERMELHO_ESCURO}>
												<OpcaoIcon size={22} />
											</Icon>
											<Box>
												<Text fontWeight="900">{label}</Text>
												<Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} color={CORES.CINZA_ESCURO}>
													{descricao}
												</Text>
											</Box>
										</Flex>
									</Button>
								))}
							</VStack>
						)}
					</Box>
				</VStack>
			</Flex>
		</Box>
	);
};

export default Login;
