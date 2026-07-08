import { CORES, TAMANHO } from "@/util/constants";
import { aplicarMascaraCpf } from "@/util/mascaras";
import { ApiService } from "@/services/apiService";
import { Box, Button, Card, Circle, Field, Flex, IconButton, Image, Input, InputGroup, PinInput, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, Pencil, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { LuUser, LuCalendar, LuBadgeInfo, LuHouse, LuCoins, LuMail, LuPhone } from "react-icons/lu";

const CadastroArtesas = () => {
	const navigate = useNavigate();

	const [fotoPreview, setFotoPreview] = useState("");
	const [carregando, setCarregando] = useState(false);

    const [dados, setDados] = useState({
        nome: "",
        dataNascimento: "",
        cpf: "",
        aldeia: "",
        telefone: "",
        chavePix: "",
        email: "",
        senha: ""
    });
	const senhaPin = dados.senha.split("").slice(0, 6);

	const handleChange = (campo: keyof typeof dados, valor: string) => {
		setDados({ ...dados, [campo]: valor });
	};

	const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange("cpf", aplicarMascaraCpf(e.target.value));
	};

	const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const urlOpcao = URL.createObjectURL(file);
			setFotoPreview(urlOpcao);
		}
	};

	const handleCadastrar = async () => {
		if (!dados.nome || !dados.dataNascimento || !dados.cpf || !dados.aldeia || !dados.telefone || !dados.chavePix || !dados.senha) {
			toaster.create({
				title: "Campos obrigatórios",
				description: "Preencha todos os campos com asterisco (*) para continuar.",
				type: "error",
				duration: 4000,
			});
			return;
		}

		try {
			setCarregando(true);
			const resposta = await ApiService.cadastrarArtesaAdmin({
				tipo_conta: "ADMIN",
				nome: dados.nome.trim(),
				data_nascimento: dados.dataNascimento,
				cpf: dados.cpf.trim(),
				aldeia: dados.aldeia.trim(),
				telefone: dados.telefone.trim(),
				chave_pix: dados.chavePix.trim(),
				email: dados.email.trim() || undefined,
				senha: dados.senha.trim(),
			});

			if (resposta.status !== "sucesso") {
				toaster.create({
					title: "Não foi possível cadastrar",
					description: resposta.mensagem,
					type: "error",
					duration: 4000,
				});
				return;
			}

			toaster.create({
				title: "Artesã Cadastrada!",
				description: resposta.mensagem,
				type: "success",
				duration: 3000,
			});

			setTimeout(() => {
				navigate("/admin");
			}, 1000);
		} catch (error) {
			const detalhe = error instanceof Error && error.message
				? error.message
				: "Não foi possível falar com o backend agora.";
			toaster.create({
				title: "Erro ao salvar",
				description: detalhe,
				type: "error",
				duration: 5000,
			});
		} finally {
			setCarregando(false);
		}
	};

    return (
        <>
            <Box w={"full"} bgColor={CORES.PRETO} pt={16}>
                <Box position="relative" w="full" pt="72px">
                    <Box
                        position="absolute"
                        top={0}
                        left="50%"
                        transform="translateX(-50%)"
                        zIndex={2}
                    >
                        <Circle
                            as="label"
                            cursor="pointer"
                            size={"130px"}
                            bgColor={CORES.CINZA_CLARO}
                            borderWidth={10}
                            borderColor={CORES.BRANCO}
                            overflow="hidden"
                            position="relative"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFotoChange}
                            />
                            {fotoPreview ? (
                                <Image
                                    src={fotoPreview}
                                    w="full"
                                    h="full"
                                    objectFit="cover"
                                    alt="Preview"
                                />
                            ) : (
                                <UserPlus size={36} color={CORES.PRETO} />
                            )}

							<Box
								position="absolute"
								bottom={0}
								w="full"
								h="35px"
								bg="rgba(0, 0, 0, 0.5)"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Pencil size={18} color={CORES.BRANCO} />
							</Box>
						</Circle>
					</Box>

                    <Card.Root
                        bg={CORES.BRANCO}
                        blur={"lg"}
                        boxShadow={"md"}
                        borderTopRadius={24}
                        borderBottomRadius={0}
                        pt="60px"
                        zIndex={1}
                        minH={"85vh"}
                        px={2}
                    >
                        <Card.Body color={CORES.CINZA_ESCURO}>
                            <Flex mb={2} alignItems={"center"} placeContent={"space-between"}>
                                <Text color={CORES.PRETO} className="hashira" lineHeight={1.1} fontWeight={"bold"} fontSize={TAMANHO.TITULO_SECAO}>
                                    Cadastrar <br/> Artesã
                                </Text>
                                {
                                <IconButton
                                bgColor={CORES.PRETO}
                                color={CORES.BRANCO}
                                size={"xl"}
                                boxShadow={"md"}
                                rounded={"full"}
                                onClick={()=>navigate(`/admin`)}
                                >
                                    <ArrowLeft/>
                                </IconButton>
                                }
                            </Flex>
                            <Text
                                mb={8}
                                fontSize={TAMANHO.CORPO_TEXTO}
                                color={CORES.CINZA_ESCURO}
                                fontWeight={500}
                            >
                                Preencha os dados para gerar o acesso
                            </Text>

                            <Stack gap="4">
                                <Field.Root required>
                                <Field.Label>
                                    Nome Completo <Field.RequiredIndicator />
                                </Field.Label>
                                <InputGroup startElement={<LuUser />}>
                                    <Input
                                    value={dados.nome}
                                    onChange={(e) => handleChange("nome", e.target.value)}
                                    placeholder="Nome da artesã"
                                    boxShadow="xs"
                                    rounded="md"
                                    bg={CORES.BRANCO}
                                    />
                                </InputGroup>
                                </Field.Root>

                                <Flex gap={4}>
                                    <Field.Root w={"45%"} required flex={1}>
                                    <Field.Label>
                                        Data de Nascimento <Field.RequiredIndicator />
                                    </Field.Label>
                                    <InputGroup startElement={<LuCalendar />}>
                                    <Input
                                        type="date"
                                        value={dados.dataNascimento}
                                        onChange={(e) => handleChange("dataNascimento", e.target.value)}
                                        boxShadow="xs"
                                        rounded="md"
                                        bg={CORES.BRANCO}
                                    />
                                    </InputGroup>
                                    </Field.Root>

                                <Field.Root required flex={2}>
                                    <Field.Label>
                                    CPF <Field.RequiredIndicator />
                                    </Field.Label>
                                    <InputGroup startElement={<LuBadgeInfo />}>
                                    <Input
                                        value={dados.cpf}
                                        onChange={handleCpfChange}
                                        placeholder="000.000.000-00"

                                        maxLength={14}
                                        boxShadow="xs"
                                        rounded="md"
                                        bg={CORES.BRANCO}
                                    />
                                    </InputGroup>
                                </Field.Root>
                                </Flex>

                                <Field.Root required>
                                <Field.Label>
                                    Aldeia / Comunidade <Field.RequiredIndicator />
                                </Field.Label>
                                <InputGroup endElement={<LuHouse />}>
                                    <Input
                                    value={dados.aldeia}
                                    onChange={(e) => handleChange("aldeia", e.target.value)}
                                    placeholder="Ex: Aldeia São Francisco"
                                    boxShadow="xs"
                                    rounded="md"
                                    px={4}
                                    bg={CORES.BRANCO}
                                    />
                                </InputGroup>
                                </Field.Root>

                                <Field.Root required>
                                <Field.Label>
                                    Número para contato <Field.RequiredIndicator />
                                </Field.Label>
                                <InputGroup startElement={<LuPhone />}>
                                    <Input
                                    value={dados.telefone}
                                    onChange={(e) => handleChange("telefone", e.target.value)}
                                    placeholder="(99) 99999-9999"
                                    boxShadow="xs"
                                    rounded="md"
                                    px={4}
                                    bg={CORES.BRANCO}
                                    />
                                </InputGroup>
                                </Field.Root>

                                <Field.Root required>
                                <Field.Label>
                                    Chave PIX <Field.RequiredIndicator />
                                </Field.Label>
                                <InputGroup endElement={<LuCoins />}>
                                    <Input
                                    value={dados.chavePix}
                                    onChange={(e) => handleChange("chavePix", e.target.value)}
                                    placeholder="Celular, CPF ou E-mail"
                                    boxShadow="xs"
                                    rounded="md"
                                    px={4}
                                    bg={CORES.BRANCO}
                                    />
                                </InputGroup>
                                </Field.Root>

                                <Field.Root>
                                <Field.Label>E-mail (Opcional)</Field.Label>
                                <InputGroup startElement={<LuMail />}>
                                    <Input
                                    type="email"
                                    value={dados.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    placeholder="artesa@email.com"
                                    boxShadow="xs"
                                    rounded="md"
                                    bg={CORES.BRANCO}
                                    />
                                </InputGroup>
                                </Field.Root>

                                <Field.Root required>
                                <Field.Label>
                                    Senha de Acesso (PIN) <Field.RequiredIndicator />
                                </Field.Label>
                                  <PinInput.Root
                                    value={senhaPin}
                                    onValueChange={(e) => handleChange("senha", e.value.join(""))}
                                    otp
                                >
                                    <PinInput.HiddenInput />
                                    <PinInput.Control>
                                    <PinInput.Input index={0} />
                                    <PinInput.Input index={1} />
                                    <PinInput.Input index={2} />
                                    <PinInput.Input index={3} />
                                    <PinInput.Input index={4} />
                                    <PinInput.Input index={5} />
                                    </PinInput.Control>
                                </PinInput.Root>
                                </Field.Root>

                                    <Button
                                    fontSize={TAMANHO.TEXTO_BOTAO}
                                    onClick={handleCadastrar}
                                    loading={carregando}
                                    mt={6}
                                    mb={2}
                                    boxShadow={"sm"}
                                    bgColor={CORES.VERMELHO_MEDIO}
                                    rounded={"full"}>
                                        Salvar alterações
                                    </Button>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Box>
        </>
    );
};

export default CadastroArtesas;
