import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { aplicarMascaraCnpj, aplicarMascaraTelefone } from "@/util/mascaras";
import { Avatar, Box, Button, Card, Center, Circle, CloseButton, Dialog, Field, Flex, HStack, Icon, Image, Input, InputGroup, Stack, Text } from "@chakra-ui/react";
import { Badge, Building2, Eye, EyeOff, LucidePlusCircle, Plus, Settings, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { LuBuilding2, LuBadgeInfo, LuPhone, LuMail } from "react-icons/lu";

const PerfilFundacao = () => {
	const navigate = useNavigate();

	const [modalAberto, setModalAberto] = useState(false);
	const [mostrarSenha, setMostrarSenha] = useState(false);

	const [dados, setDados] = useState({
		nome: "Fundação Raízes",
		cnpj: "99.999.999/9999-99",
		telefone: "(83) 99999-9999",
		email: "contato@fundacaoraizes.org",
		senha: "123456"
	});

	const [draft, setDraft] = useState(dados);

	const artesasMock = [
		{
			id: 1,
			nome: "Emile Silva",
			aldeia: "Aldeia Jacaré",
			produtos: 12,
			foto: "https://i.pravatar.cc/150?u=emile"
		},
		{
			id: 2,
			nome: "João Souza",
			aldeia: "Aldeia Alto",
			produtos: 5,
			foto: "https://i.pravatar.cc/150?u=joao"
		},
		{
			id: 3,
			nome: "Leo Santos",
			aldeia: "Aldeia Jacaré",
			produtos: 8,
			foto: "https://i.pravatar.cc/150?u=leo"
		},
	];

	const abrirModal = () => {
		setDraft(dados);
		setModalAberto(true);
		setMostrarSenha(false);
	};

	const handleChange = (campo: keyof typeof dados, valor: string) => {
		setDraft({ ...draft, [campo]: valor });
	};

	const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange("cnpj", aplicarMascaraCnpj(e.target.value));
	};

	const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange("telefone", aplicarMascaraTelefone(e.target.value));
	};

	const handleSalvarEdicao = () => {
		if (!draft.nome || !draft.cnpj || !draft.telefone || !draft.email) {
			toaster.create({
				title: "Campos obrigatórios",
				description: "Preencha todos os campos com asterisco (*).",
				type: "error",
				duration: 4000,
			});
			return;
		}

		setDados(draft);
		setModalAberto(false);

		toaster.create({
			title: "Sucesso!",
			description: "Dados atualizados com sucesso.",
			type: "success",
			duration: 3000,
		});
	};

	return (
		<>
			<Box w={"full"} bgColor={CORES.PRETO} pt={16}>
				<Box position="relative" w="full" pt="72px">
					<Circle
						size={"150px"}
						bgColor={CORES.CINZA_CLARO}
						position="absolute"
						top={0}
						left="50%"
						transform="translateX(-50%)"
						borderWidth={10}
						borderColor={CORES.BRANCO}
						zIndex={2}
					>
						<Building2 size={60} color={CORES.PRETO} />
					</Circle>

					<Card.Root
						bg={CORES.BRANCO}
						blur={"lg"}
						boxShadow={"md"}
						borderTopRadius={24}
						borderBottomRadius={0}
						pt="60px"
						pb="50px"
						zIndex={1}
						minH={"85vh"}
						color={CORES.PRETO}
					>
						<Card.Body>
							<Flex flexDir="column" align="center" mb={6}>
								<Center>
									<Text 
									fontSize={TAMANHO.SUBTITULO_PAGINA}
									fontWeight={"bold"}
									textAlign={"center"}
									lineHeight={1}
									bgColor={CORES.VERMELHO_CLARINHO}
									color={CORES.CINZA_ESCURO}
									w={"fit"}
									className="hashira"
									letterSpacing={"wide"}
									px={4}
									py={1}
									rounded={2}
									>
									{dados.nome}
									</Text>
								</Center>
								<Text
									fontSize={TAMANHO.SUBTITULO_SECAO}
									fontWeight={700}
									textAlign="center"
									mb={1}
								>
								</Text>
								<Text
									fontSize={TAMANHO.TEXTO_PEQUENO}
									color={CORES.CINZA_ESCURO}
									fontWeight={700}
								>
									CNPJ: {dados.cnpj}
								</Text>
								<Text
									fontSize={TAMANHO.TEXTO_PEQUENO}
									color={CORES.CINZA_ESCURO}
									fontWeight={500}
								>
									{dados.email}
								</Text>
								<Text
									fontSize={TAMANHO.TEXTO_PEQUENO}
									color={CORES.CINZA_ESCURO}
									fontWeight={500}
								>
									{dados.telefone}
								</Text>

								<Button
									mt={4}
									rounded="full"
									variant="outline"
									borderColor={CORES.CINZA_CLARO}
									color={CORES.PRETO}
									size="sm"
									onClick={abrirModal}
									boxShadow={"sm"}
								>
									<Settings size={16} />
									Editar Informações
								</Button>
							</Flex>

							<Card.Root
								bg={CORES.VERMELHO_CLARINHO}
								color={CORES.CINZA_ESCURO}
								boxShadow={"sm"}
								border={"none"}
								rounded={"lg"}
								mb={8}
							>
								<Card.Body>
									<Flex align="center" gap={4}>
										<Users size={32} />
										<Box>
											<Text fontSize={TAMANHO.TEXTO_PEQUENO} opacity={0.9}>
												Total de Artesãs
											</Text>
											<Text
												fontSize={TAMANHO.SUBTITULO_SECAO}
												fontWeight={900}
											>
												{artesasMock.length} cadastradas
											</Text>
										</Box>
									</Flex>
								</Card.Body>
							</Card.Root>

							<Flex
								flexDir={"column"}
								mb={4}
							>
								<Text fontSize={TAMANHO.SUBTITULO_SECAO} fontWeight={700}>
									Gerenciar Artesãs
								</Text>
							</Flex>

							<Stack gap={3}>
								<Card.Root
								flexDirection="row" 
								boxShadow={"sm"}
								bgColor={"white/40"}
								overflow="hidden" 
								w={"full"}
								h={"10vh"}
								alignItems={"center"}
								color={CORES.CINZA_ESCURO}
								border={0}
								onClick={() => navigate("/admin/cadastro")}
								>
									<Card.Body>
									<Flex alignItems={"center"} gap={4}>
										<Icon><LucidePlusCircle/></Icon>
										<Text fontSize={TAMANHO.CORPO_TEXTO}>Cadastrar nova artesã</Text>
									</Flex>
									</Card.Body>
								</Card.Root>
								{artesasMock.map((artesa) => (
									<Card.Root 
									flexDirection="row" 
									boxShadow={"sm"}
									bgColor={"white/40"}
									overflow="hidden" 
									w={"full"}
									h={"10vh"}
									alignItems={"center"}
									border={0}
									>
										<Card.Body p={4}  >
										<Flex w={"full"} gap={4} placeContent={"space-between"}>
										
										<Flex gap={4}>
										
										<Avatar.Root>
											<Avatar.Image src={artesa.foto} />
											<Avatar.Fallback name={artesa.nome} />
										</Avatar.Root>
											<Flex flexDir={"column"}>
												<Text fontSize={TAMANHO.CORPO_TEXTO}>{artesa.nome}</Text>
												<Text
														fontSize={TAMANHO.TEXTO_PEQUENO}
														color={CORES.CINZA_ESCURO}>
															{artesa.aldeia} •{" "}
															{artesa.produtos} produtos
												</Text>
											</Flex>
										</Flex>
												<Button alignSelf={"end"} 
												rounded={"full"}
												boxShadow={"sm"}
												variant={"outline"}
												color={CORES.CINZA_ESCURO}
												borderColor={CORES.CINZA_CLARO}
												onClick={() => navigate(`/perfil/${artesa.id}/info`)}
												>
													Abrir
												</Button>
											</Flex>
										</Card.Body>
									</Card.Root>
								))}
							</Stack>
						</Card.Body>
					</Card.Root>
				</Box>
			</Box>

			<Dialog.Root
				open={modalAberto}
				onOpenChange={(e) => setModalAberto(e.open)}
				placement="center"
			>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content
						bg={CORES.BRANCO}
						rounded={RADIUS_PADRAO_CARD}
						p={4}
						m={4}
					>
						<Dialog.Body py={4}>
							<Text fontSize={TAMANHO.SUBTITULO_SECAO} fontWeight={700} mb={4}>
								Editar Perfil
							</Text>

						<Stack pt={4} gap={4}>
						<Field.Root required>
							<Field.Label>
							Nome da Fundação <Field.RequiredIndicator />
							</Field.Label>
							<InputGroup startElement={<LuBuilding2 />}>
							<Input
								value={draft.nome}
								onChange={(e) => handleChange("nome", e.target.value)}
								placeholder="Digite o nome da fundação"
								boxShadow="xs"
								rounded="md"
								bg={CORES.BRANCO}
							/>
							</InputGroup>
						</Field.Root>

						<Field.Root required>
							<Field.Label>
							CNPJ <Field.RequiredIndicator />
							</Field.Label>
							<InputGroup startElement={<LuBadgeInfo />}>
							<Input
								value={draft.cnpj}
								onChange={handleCnpjChange}
								placeholder="00.000.000/0000-00"
								maxLength={18}
								boxShadow="xs"
								rounded="md"
								bg={CORES.BRANCO}
							/>
							</InputGroup>
						</Field.Root>

						<Field.Root required>
							<Field.Label>
							Telefone <Field.RequiredIndicator />
							</Field.Label>
							<InputGroup startElement={<LuPhone />}>
							<Input
								value={draft.telefone}
								onChange={handleTelefoneChange}
								placeholder="(00) 00000-0000"
								maxLength={15}
								boxShadow="xs"
								rounded="md"
								bg={CORES.BRANCO}
							/>
							</InputGroup>
						</Field.Root>

						<Field.Root required>
							<Field.Label>
							E-mail <Field.RequiredIndicator />
							</Field.Label>
							<InputGroup startElement={<LuMail />}>
							<Input
								type="email"
								value={draft.email}
								onChange={(e) => handleChange("email", e.target.value)}
								placeholder="Digite o e-mail"
								boxShadow="xs"
								rounded="md"
								bg={CORES.BRANCO}
							/>
							</InputGroup>
						</Field.Root>

						<Field.Root required>
							<Field.Label>
							Senha <Field.RequiredIndicator />
							</Field.Label>
							<InputGroup
							endElement={
								<Box
								role="button"
								aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
								cursor="pointer"
								color={CORES.CINZA_ESCURO}
								display="flex"
								alignItems="center"
								justifyContent="center"
								onClick={() => setMostrarSenha(!mostrarSenha)}
								>
								{mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
								</Box>
							}
							>
							<Input
								type={mostrarSenha ? "text" : "password"}
								value={draft.senha}
								onChange={(e) => handleChange("senha", e.target.value)}
								placeholder="Digite a senha"
								boxShadow="xs"
								rounded="md"
								bg={CORES.BRANCO}
							/>
							</InputGroup>
						</Field.Root>
						</Stack>

							<Flex gap={3} mt={8}>
								<Button
									flex={2}
									onClick={handleSalvarEdicao}
									bg={CORES.PRETO}
									color={CORES.BRANCO}
									fontWeight={700}
									py={6}
									rounded="full"
									_hover={{ bg: CORES.CINZA_ESCURO }}
								>
									Salvar
								</Button>
							</Flex>
						</Dialog.Body>
						<Dialog.CloseTrigger asChild>
						<CloseButton m={2} mr={4} color={CORES.PRETO} size="lg" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
};

export default PerfilFundacao;
