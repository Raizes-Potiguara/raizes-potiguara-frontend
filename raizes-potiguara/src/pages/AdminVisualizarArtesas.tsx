import HoneycombBackgroundBlack from "@/components/general/HoneycombBackgroundBlack";
import HoneycombBackgroundRed from "@/components/general/HoneycombBackgroundRed";
import { ARTESAS_DEMO } from "@/data/artesasDemo";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Badge, Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import { MapPin, UsersRound } from "lucide-react";

const AdminVisualizarArtesas = () => {
	return (
		<Box bg={CORES.PRETO}>
			<Box position="relative" minH="100vh" bg={CORES.PRETO} overflow="hidden">
				<HoneycombBackgroundRed />

				<Box position="relative" zIndex={2} px={{ base: 4, md: 8 }} py={{ base: 10, md: 16 }}>
					<Box
						position="relative"
						overflow="hidden"
						maxW="container.lg"
						mx="auto"
						py={{ base: 8, md: 12 }}
						borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
						boxShadow="0 22px 48px rgba(0,0,0,0.38)"
						border={`2px solid ${CORES.PRETO}`}
					>
						<HoneycombBackgroundBlack />
						<Container maxW="container.lg" position="relative" zIndex={1} px={{ base: 5, md: 8 }}>
							<Box mb={{ base: 8, md: 12 }}>
								<Flex
									display="inline-flex"
									align="center"
									gap={2}
									bg={CORES.BRANCO}
									border={`2px solid ${CORES.PRETO}`}
									borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
									maxW="100%"
									px={{ base: 3, md: 4 }}
									py={2}
									transform="rotate(-3deg)"
								>
									<UsersRound size={16} color={CORES.VERMELHO_VIVO} />
									<Text
										as="span"
										fontStyle="italic"
										color={CORES.PRETO}
										fontSize={{ base: "13px", md: `${TAMANHO.TEXTO_PEQUENO}px` }}
									>
										Artesãs cadastradas pela Fundação
									</Text>
								</Flex>
							</Box>

							<Box>
								{ARTESAS_DEMO.map((artesa, index) => (
									<Box key={artesa.uuid} mb={{ base: 12, md: 16 }} css={{ display: "flow-root" }}>
										<Box
											float={index % 2 === 1 ? "right" : "left"}
											w={{ base: "130px", md: "210px" }}
											mr={{ base: 4, md: index % 2 === 1 ? 0 : 8 }}
											ml={{ base: 4, md: index % 2 === 1 ? 8 : 0 }}
											mb={4}
										>
											<Box
												borderRadius="full"
												overflow="hidden"
												aspectRatio="1 / 1"
												bg={CORES.PRETO}
												boxShadow={`5px 5px 0 ${CORES.VERMELHO_ESCURO}`}
											>
												<Image
													src={artesa.foto}
													alt={artesa.nome}
													w="100%"
													h="100%"
													objectFit="cover"
													objectPosition={artesa.posicaoFoto}
													transform={`scale(${artesa.zoomFoto})`}
												/>
											</Box>

											<Flex justify="center" mt={-4} position="relative" zIndex={1}>
												<Flex
													bg={CORES.CINZA_CLARINHO}
													border={`2px solid ${CORES.PRETO}`}
													borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
													maxW="92%"
													px={3}
													py={1}
													transform="rotate(-4deg)"
													boxShadow="2px 3px 0 rgba(0,0,0,.2)"
												>
													<Text
														fontWeight="800"
														color={CORES.VERMELHO_VIVO}
														fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}
														textAlign="center"
														lineHeight={1.2}
													>
														{artesa.nome}
													</Text>
												</Flex>
											</Flex>
										</Box>

										<Flex align="center" gap={2} mb={2} color={CORES.CINZA_CLARINHO}>
											<MapPin size={16} />
											<Text fontSize={`${TAMANHO.TEXTO_PEQUENO}px`} fontWeight="700">
												{artesa.aldeia}
											</Text>
										</Flex>

										<Text color={CORES.CINZA_CLARINHO} fontSize={`${TAMANHO.CORPO_TEXTO}px`} mb={4}>
											{artesa.descricao}
										</Text>

										<Text
											color={CORES.BRANCO}
											fontSize={`${TAMANHO.CORPO_TEXTO}px`}
											fontWeight="800"
											mb={3}
										>
											Produz: {artesa.producao}.
										</Text>

										<Flex gap={2} wrap="wrap" mb={5}>
											{artesa.materiais.map((material) => (
												<Badge key={material} bg={CORES.VERMELHO_CLARINHO} color={CORES.VERMELHO_ESCURO}>
													{material}
												</Badge>
											))}
											<Badge bg={CORES.CINZA_CLARINHO} color={CORES.PRETO}>
												Pix: {artesa.chave_pix}
											</Badge>
										</Flex>
									</Box>
								))}
							</Box>
						</Container>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default AdminVisualizarArtesas;
