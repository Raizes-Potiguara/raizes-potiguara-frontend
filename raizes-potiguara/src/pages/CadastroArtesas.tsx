import { CORES, TAMANHO } from "@/util/constants";
import { aplicarMascaraCpf } from "@/util/mascaras";
import { Box, Button, Card, Circle, DatePicker, Field, Flex, IconButton, Image, Input, InputGroup, PinInput, Portal, Stack, Text } from "@chakra-ui/react";
import { ArrowLeft, Eye, EyeOff, Pencil, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";
import { LuUser, LuCalendar, LuBadgeInfo, LuHouse, LuCoins, LuMail } from "react-icons/lu";

const CadastroArtesas = () => {
	const navigate = useNavigate();

	const [fotoPreview, setFotoPreview] = useState("");
	const [mostrarSenha, setMostrarSenha] = useState(false);

    const [dados, setDados] = useState({
        nome: "",
        dataNascimento: "",
        cpf: "",
        aldeia: "",
        chavePix: "",
        email: "",
        senha: ""
    });

	const handleChange = (campo: keyof typeof dados, valor: string) => {
		setDados({ ...dados, [campo]: valor });
	};

	const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleChange("cpf", aplicarMascaraCpf(e.target.value));
	};

	const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const urlOpcao = URL.createObjectURL(e.target.files[0]);
			setFotoPreview(urlOpcao);
		}
	};

    const handleCadastrar = () => {
        if (!dados.nome || !dados.dataNascimento || !dados.cpf || !dados.aldeia || !dados.chavePix || !dados.senha) {
            toaster.create({
                title: "Campos obrigatórios",
                description: "Preencha todos os campos com asterisco (*) para continuar.",
                type: "error",
                duration: 4000,
            });
            return;
        }

		toaster.create({
			title: "Artesã Cadastrada!",
			description: `${dados.nome} foi adicionada.`,
			type: "success",
			duration: 3000,
		});

		setTimeout(() => {
			navigate("/admin");
		}, 1000);
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
                                    <DatePicker.Root maxWidth="20rem">
                                    <DatePicker.Control>
                                        <DatePicker.Input />
                                        <DatePicker.IndicatorGroup>
                                        <DatePicker.Trigger>
                                            <LuCalendar />
                                        </DatePicker.Trigger>
                                        </DatePicker.IndicatorGroup>
                                    </DatePicker.Control>
                                    <Portal>
                                        <DatePicker.Positioner>
                                        <DatePicker.Content bgColor={CORES.PRETO} color={CORES.BRANCO}>
                                            <DatePicker.View view="day">
                                            <DatePicker.Header />
                                            <DatePicker.DayTable />
                                            </DatePicker.View>
                                            <DatePicker.View view="month">
                                            <DatePicker.Header />
                                            <DatePicker.MonthTable />
                                            </DatePicker.View>
                                            <DatePicker.View view="year">
                                            <DatePicker.Header />
                                            <DatePicker.YearTable />
                                            </DatePicker.View>
                                        </DatePicker.Content>
                                        </DatePicker.Positioner>
                                    </Portal>
                                    </DatePicker.Root>
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
                                    value={dados.senha}
                                    onValueChange={(e) => handleChange("senha", e.value)}
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
