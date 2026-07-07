import MicButton from "@/components/general/MicButton";
import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, Image, Text, Card, Flex, IconButton, Skeleton, Center, Input, InputGroup, Textarea, Field, NumberInput, HStack, Carousel, VStack, Icon } from "@chakra-ui/react";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { LuPencil, LuPlus, LuMinus, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { ApiService } from "@/services/apiService";
import { toaster } from "@/components/ui/toaster";

const ConfigVendaProduto = () => {
	const navigate = useNavigate();
	const { idProd } = useParams();
	const userId = 1;

	const isNovaPeca = !idProd || idProd === "0";

	const [dados, setDados] = useState({
		nome: "",
		nome_potiguar: "",
		preco: "",
		quantidade_estoque: 0,
		descricao: "",
	});

	const [fotoPreview, setFotoPreview] = useState("");
	const [arquivoFoto, setArquivoFoto] = useState<File | null>(null);

	const items = Array.from({ length: 5 });

	useEffect(() => {
		if (!isNovaPeca) {
			const carregarProduto = async () => {
				try {
					const produto = await ApiService.request<any>("OBTER_PRODUTO", { id: idProd });
					if (produto) {
						setDados({
							nome: produto.nome || "",
							nome_potiguar: produto.nome_potiguar || "",
							preco: produto.preco || "",
							quantidade_estoque: produto.quantidade_estoque || 0,
							descricao: produto.descricao || "",
						});
						if (produto.foto_url) {
							setFotoPreview(produto.foto_url);
						}
					}
				} catch (error) {
					console.error("Falha ao carregar a peça.");
				}
			};
			carregarProduto();
		}
	}, [idProd, isNovaPeca]);

	const handleChange = (campo: string, valor: any) => {
		setDados({ ...dados, [campo]: valor });
	};

	const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setFotoPreview(URL.createObjectURL(file));
			setArquivoFoto(file);
		}
	};

	const handleSalvar = async () => {
		if (!dados.nome || !dados.preco || !dados.descricao) {
			toaster.create({
				title: "Campos obrigatórios",
				description: "Preencha o nome, preço e descrição da peça.",
				type: "error",
			});
			return;
		}

		try {
			const action = isNovaPeca ? "CADASTRAR_PRODUTO" : "ATUALIZAR_PRODUTO";

			await ApiService.request(action, { ...dados, id: idProd }, arquivoFoto);

			toaster.create({
				title: "Sucesso!",
				description: isNovaPeca ? "Peça cadastrada com sucesso." : "Peça atualizada.",
				type: "success",
			});

			navigate(`/perfil/${userId}/config`);
		} catch (error) {

		}
	};

	return (
		<>
			<Box color={CORES.PRETO}>
				<Card.Root
					m={0}
					p={0}
					mt={8}
					borderTopRadius={24}
					borderWidth={0}
					borderBottomRadius={0}
				>
					<Card.Body
						m={0}
						p={0}
						borderTopRadius={24}
						borderWidth={0}
						borderBottomRadius={0}
						overflow={"hidden"}
						bgColor={CORES.BRANCO}
					>
						<Box as="label" position="relative" w="full" h="50vh" cursor="pointer" display="block">
							<input
								type="file"
								accept="image/*"
								style={{ display: "none" }}
								onChange={handleFotoChange}
							/>
							{fotoPreview ? (
								<Image src={fotoPreview} w="full" h="full" objectFit="cover" alt="Foto da peça" />
							) : (
								<Skeleton w="full" h="full" />
							)}
							<Center
								position="absolute"
								inset={0}
								bg="blackAlpha.500"
								color="white"
								pointerEvents="none"
							>
								<LuPencil size={40} />
							</Center>
						</Box>

						<Box p={8} color={CORES.CINZA_ESCURO}>
							<Flex mb={8} alignItems={"center"} placeContent={"space-between"}>
								<Text color={CORES.PRETO} className="hashira" lineHeight={1.1} fontWeight={"bold"} fontSize={TAMANHO.TITULO_SECAO}>
									{isNovaPeca ? "Nova" : "Editar"} Peça
								</Text>
								{
									<IconButton
										bgColor={CORES.PRETO}
										color={CORES.BRANCO}
										size={"xl"}
										boxShadow={"md"}
										rounded={"full"}
										onClick={() => navigate(`/perfil/${userId}/config`)}
									>
										<ArrowLeft/>
									</IconButton>
								}
							</Flex>

							<Flex flexDir={"column"} gap={4}>
								<Field.Root required>
									<Field.Label>
										Nome da peça <Field.RequiredIndicator />
									</Field.Label>
									<Input
										value={dados.nome}
										onChange={(e) => handleChange("nome", e.target.value)}
										boxShadow={"xs"}
										rounded={"md"}
										placeholder="Nome da peça em português..."
									/>
									<Input
										value={dados.nome_potiguar}
										onChange={(e) => handleChange("nome_potiguar", e.target.value)}
										boxShadow={"xs"}
										rounded={"md"}
										placeholder="Nome da peça em tupi potiguara..."
										mt={2}
									/>
								</Field.Root>

								<Field.Root required>
									<Field.Label>
										Preço <Field.RequiredIndicator />
									</Field.Label>
									<InputGroup startElement="R$">
										<Input
											value={dados.preco}
											onChange={(e) => handleChange("preco", e.target.value)}
											boxShadow={"xs"}
											rounded={"md"}
											placeholder="0,00"
										/>
									</InputGroup>
								</Field.Root>

								<Field.Root required>
									<Field.Label>
										Quantidade em estoque <Field.RequiredIndicator />
									</Field.Label>
									<NumberInput.Root
										value={dados.quantidade_estoque.toString()}
										onValueChange={(e) => handleChange("quantidade_estoque", Number(e.value))}
										unstyled
										spinOnPress={false}
									>
										<HStack gap="2">
											<NumberInput.DecrementTrigger asChild>
												<IconButton variant="outline" size="sm">
													<LuMinus />
												</IconButton>
											</NumberInput.DecrementTrigger>
											<NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
											<NumberInput.IncrementTrigger asChild>
												<IconButton variant="outline" size="sm">
													<LuPlus />
												</IconButton>
											</NumberInput.IncrementTrigger>
										</HStack>
									</NumberInput.Root>
								</Field.Root>

								<Field.Root required>
									<Field.Label>
										Descrição <Field.RequiredIndicator />
									</Field.Label>
									<InputGroup>
										<Textarea
											value={dados.descricao}
											onChange={(e) => handleChange("descricao", e.target.value)}
											boxShadow={"xs"}
											rounded={"md"}
											placeholder="Descreva a peça. Como foi feita? Com que materiais? Quanto tempo levou para fazer? Qual é o seu significado?"
										/>
									</InputGroup>
								</Field.Root>
							</Flex>

							<Carousel.Root
								slidesPerPage={1.7}
								slideCount={items.length}
								mx="auto"
								mt={4}
							>
								<Carousel.ItemGroup>
									<Carousel.Item py={2} pl={1} key={0} index={0}>
										<Box w="50vw" h="300px" rounded="lg" boxShadow={"sm"}>
											<Center h={"full"}>
												<VStack textAlign={"center"}>
													<Icon><PlusCircle size={48} strokeWidth={1.2}/></Icon>
													<Text fontWeight={"bold"} fontSize={TAMANHO.CORPO_TEXTO}>Adicionar<br/>Imagem ou Vídeo</Text>
												</VStack>
											</Center>
										</Box>
									</Carousel.Item>
									{items.map((_, index) => (
										<Carousel.Item p={2} key={index + 1} index={index + 1}>
											<Skeleton w="50vw" h="300px" rounded="lg"/>
										</Carousel.Item>
									))}
								</Carousel.ItemGroup>

								<Carousel.Control justifyContent="center" gap="4">
									<Carousel.PrevTrigger asChild>
										<IconButton size="xs" variant="ghost">
											<LuChevronLeft />
										</IconButton>
									</Carousel.PrevTrigger>

									<Carousel.Indicators />

									<Carousel.NextTrigger asChild>
										<IconButton size="xs" variant="ghost">
											<LuChevronRight />
										</IconButton>
									</Carousel.NextTrigger>
								</Carousel.Control>
							</Carousel.Root>

							<Button
								onClick={handleSalvar}
								fontSize={TAMANHO.TEXTO_BOTAO}
								mt={6}
								boxShadow={"sm"}
								w={"full"}
								bgColor={CORES.VERMELHO_MEDIO}
								rounded={"full"}
							>
								Salvar peça
							</Button>

						</Box>
					</Card.Body>
				</Card.Root>
			</Box>
			<MicButton />
		</>
	);
};

export default ConfigVendaProduto;
