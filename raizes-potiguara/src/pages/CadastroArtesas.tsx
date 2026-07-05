import { CORES, TAMANHO } from "@/util/constants";
import { aplicarMascaraCpf } from "@/util/mascaras";
import { Box, Button, Card, Circle, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Eye, EyeOff, Pencil, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toaster } from "@/components/ui/toaster";

const CadastroArtesas = () => {
    const navigate = useNavigate();

    const [fotoPreview, setFotoPreview] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [dados, setDados] = useState({
        nome: "",
        idade: "",
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
        if (!dados.nome || !dados.idade || !dados.cpf || !dados.aldeia || !dados.chavePix || !dados.senha) {
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
                            size={"150px"}
                            bgColor={CORES.CINZA_CLARO}
                            borderWidth={10}
                            borderColor={CORES.CREME}
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
                                <UserPlus size={60} color={CORES.PRETO} />
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
                            <Flex flexDir="column" align="center" mb={6} mt={4}>
                                <Text
                                    fontSize={TAMANHO.TITULO_SUBSECAO}
                                    fontWeight={700}
                                    textAlign="center"
                                    mb={1}
                                >
                                    Nova Artesã
                                </Text>
                                <Text
                                    fontSize={TAMANHO.TEXTO_PEQUENO}
                                    color={CORES.CINZA_ESCURO}
                                    fontWeight={500}
                                    textAlign="center"
                                >
                                    Preencha os dados para gerar o acesso
                                </Text>
                            </Flex>

                            <Stack gap="4">
                                <Box>
                                    <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                        Nome Completo <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
                                    </Text>
                                    <Input
                                        value={dados.nome}
                                        onChange={(e) => handleChange("nome", e.target.value)}
                                        placeholder="Nome da artesã"
                                        borderColor={CORES.CINZA_ESCURO}
                                        bg={CORES.BRANCO}
                                    />
                                </Box>

                                <Flex gap={4}>
                                    <Box flex={1}>
                                        <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                            Idade <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
                                        </Text>
                                        <Input
                                            type="number"
                                            value={dados.idade}
                                            onChange={(e) => handleChange("idade", e.target.value)}
                                            placeholder="Ex: 35"
                                            borderColor={CORES.CINZA_ESCURO}
                                            bg={CORES.BRANCO}
                                        />
                                    </Box>
                                    <Box flex={2}>
                                        <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                            CPF <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
                                        </Text>
                                        <Input
                                            value={dados.cpf}
                                            onChange={handleCpfChange}
                                            placeholder="000.000.000-00"
                                            borderColor={CORES.CINZA_ESCURO}
                                            bg={CORES.BRANCO}
                                            maxLength={14}
                                        />
                                    </Box>
                                </Flex>

                                <Box>
                                    <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                        Aldeia / Comunidade <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
                                    </Text>
                                    <Input
                                        value={dados.aldeia}
                                        onChange={(e) => handleChange("aldeia", e.target.value)}
                                        placeholder="Ex: Aldeia Jacaré"
                                        borderColor={CORES.CINZA_ESCURO}
                                        bg={CORES.BRANCO}
                                    />
                                </Box>

                                <Box>
                                    <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                        Chave PIX <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
                                    </Text>
                                    <Input
                                        value={dados.chavePix}
                                        onChange={(e) => handleChange("chavePix", e.target.value)}
                                        placeholder="Celular, CPF ou E-mail"
                                        borderColor={CORES.CINZA_ESCURO}
                                        bg={CORES.BRANCO}
                                    />
                                </Box>

                                <Box>
                                    <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                        E-mail (Opcional)
                                    </Text>
                                    <Input
                                        type="email"
                                        value={dados.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="artesa@email.com"
                                        borderColor={CORES.CINZA_ESCURO}
                                        bg={CORES.BRANCO}
                                    />
                                </Box>

                                <Box>
                                    <Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight={700} mb={1}>
                                        Senha de Acesso (PIN) <Text as="span" color={CORES.VERMELHO_MEDIO}>*</Text>
                                    </Text>
                                    <Box position="relative">
                                        <Input
                                            type={mostrarSenha ? "text" : "password"}
                                            value={dados.senha}
                                            onChange={(e) => handleChange("senha", e.target.value)}
                                            placeholder="Crie uma senha simples"
                                            borderColor={CORES.CINZA_ESCURO}
                                            bg={CORES.BRANCO}
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

                                <Flex gap={3} mt={6}>
                                    <Button
                                        flex={2}
                                        onClick={handleCadastrar}
                                        bg={CORES.PRETO}
                                        color={CORES.BRANCO}
                                        fontWeight={700}
                                        py={6}
                                        rounded="full"
                                        _hover={{ bg: CORES.CINZA_ESCURO }}
                                    >
                                        Concluir Cadastro
                                    </Button>

                                    <Button
                                        flex={1}
                                        variant="outline"
                                        borderColor={CORES.VERMELHO_MEDIO}
                                        color={CORES.VERMELHO_MEDIO}
                                        fontWeight={700}
                                        py={6}
                                        rounded="full"
                                        onClick={() => navigate("/admin")}
                                        _hover={{
                                            bg: `${CORES.VERMELHO_MEDIO}1A`,
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Flex>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                </Box>
            </Box>
        </>
    );
};

export default CadastroArtesas;
