import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { aplicarMascaraCnpj, aplicarMascaraTelefone } from "@/util/mascaras";
import { Box, Button, Card, Circle, Dialog, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Building2, Eye, EyeOff, Plus, Settings, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";

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
						borderColor={CORES.CREME}
						zIndex={2}
					>
						<Building2 size={60} color={CORES.PRETO} />
					</Circle>

					<Card.Root
						bg={CORES.CREME}
						blur={"lg"}
						boxShadow={"md"}
						borderTopRadius={24}
						borderBottomRadius={0}
						pt="60px"
						pb="50px"
						zIndex={1}
						minH={"85vh"}
					>
						<Card.Body>
							<Flex flexDir="column" align="center" mb={6}>
								<Text
									fontSize={TAMANHO.TITULO_SUBSECAO}
									fontWeight={700}
									textAlign="center"
									mb={1}
								>
									{dados.nome}
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
									borderColor={CORES.PRETO}
									color={CORES.PRETO}
									size="sm"
									onClick={abrirModal}
								>
									<Settings size={16} />
									Editar Informações
								</Button>
							</Flex>

							<Card.Root
								bg={CORES.VERMELHO_ESCURO}
								color={CORES.BRANCO}
								rounded={RADIUS_PADRAO_CARD}
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
												fontSize={TAMANHO.TITULO_SUBSECAO}
												fontWeight={900}
											>
												{artesasMock.length} cadastradas
											</Text>
										</Box>
									</Flex>
								</Card.Body>
							</Card.Root>

							<Flex
								justify="space-between"
								align="center"
								mb={4}
							>
								<Text fontSize={TAMANHO.SUBTITULO_SUBSECAO} fontWeight={700}>
									Gerenciar Artesãs
								</Text>
								<Button
									size="sm"
									rounded="full"
									bgColor={CORES.PRETO}
									color={CORES.BRANCO}
									onClick={() => navigate("/admin/cadastro")}
								>
									<Plus size={16} />
									Nova Artesã
								</Button>
							</Flex>

							<Stack gap={3}>
								{artesasMock.map((artesa) => (
									<Flex
										key={artesa.id}
										justify="space-between"
										align="center"
										p={4}
										bg={CORES.BRANCO}
										rounded={RADIUS_PADRAO_CARD}
										boxShadow="sm"
									>
										<Flex align="center" gap={3}>
											<Image
												src={artesa.foto}
												boxSize="40px"
												borderRadius="full"
												objectFit="cover"
												alt={`Foto de ${artesa.nome}`}
											/>
											<Box>
												<Text fontWeight={700}>
													{artesa.nome}
												</Text>
												<Text
													fontSize={TAMANHO.TEXTO_PEQUENO}
													color={CORES.CINZA_ESCURO}
												>
													{artesa.aldeia} •{" "}
													{artesa.produtos} produtos
												</Text>
											</Box>
										</Flex>
										<Button
											size="sm"
											rounded="full"
											bgColor={CORES.VERMELHO_MEDIO}
											color={CORES.BRANCO}
											onClick={() => navigate(`/perfil/${artesa.id}`)}
										>
											Ver
										</Button>
									</Flex>
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
						<Dialog.Body>
							<Text fontSize={TAMANHO.SUBTITULO_SUBSECAO} fontWeight={700} mb={4}>
								Editar Perfil
							</Text>

							<Stack gap={4}>
								<Box>
									<Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
										Nome da Fundação <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
									</Text>
									<Input
										value={draft.nome}
										onChange={(e) => handleChange("nome", e.target.value)}
										placeholder="Digite o nome da fundação"
										borderColor={CORES.CINZA_ESCURO}
									/>
								</Box>
								<Box>
									<Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
										CNPJ <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
									</Text>
									<Input
										value={draft.cnpj}
										onChange={handleCnpjChange}
										placeholder="00.000.000/0000-00"
										borderColor={CORES.CINZA_ESCURO}
										maxLength={18}
									/>
								</Box>
								<Box>
									<Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
										Telefone <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
									</Text>
									<Input
										value={draft.telefone}
										onChange={handleTelefoneChange}
										placeholder="(00) 00000-0000"
										borderColor={CORES.CINZA_ESCURO}
										maxLength={15}
									/>
								</Box>
								<Box>
									<Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
										E-mail <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
									</Text>
									<Input
										type="email"
										value={draft.email}
										onChange={(e) => handleChange("email", e.target.value)}
										placeholder="Digite o e-mail"
										borderColor={CORES.CINZA_ESCURO}
									/>
								</Box>
								<Box>
									<Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
										Senha
									</Text>
									<Box position="relative">
										<Input
											type={mostrarSenha ? "text" : "password"}
											value={draft.senha}
											onChange={(e) => handleChange("senha", e.target.value)}
											placeholder="Digite a senha"
											borderColor={CORES.CINZA_ESCURO}
											pr="40px"
										/>
										<Box
											role="button"
											aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
											position="absolute"
											right="3"
											top="50%"
											transform="translateY(-50%)"
											cursor="pointer"
											color={CORES.CINZA_ESCURO}
											onClick={() => setMostrarSenha(!mostrarSenha)}
											display="flex"
											alignItems="center"
											justifyContent="center"
										>
											{mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
										</Box>
									</Box>
								</Box>
							</Stack>

							<Flex gap={3} mt={6}>
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

								<Button
									flex={1}
									variant="outline"
									borderColor={CORES.VERMELHO_MEDIO}
									color={CORES.VERMELHO_MEDIO}
									fontWeight={700}
									py={6}
									rounded="full"
									onClick={() => setModalAberto(false)}
									_hover={{
										bg: `${CORES.VERMELHO_MEDIO}1A`,
									}}
								>
									Cancelar
								</Button>
							</Flex>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
};

export default PerfilFundacao;
