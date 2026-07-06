import MicButton from "@/components/general/MicButton";
import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, Image, Text, Card, Flex, IconButton, Skeleton, Center, Input, InputGroup, Textarea, Field, NumberInput, HStack, Carousel, VStack, Icon } from "@chakra-ui/react";
import {ArrowLeft, PlusCircle } from "lucide-react";
import { LuPencil, LuPlus, LuMinus, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useNavigate } from "react-router";

const ConfigVendaProduto = () => {

const navigate = useNavigate();
const userId = 1
const nome = "Nome da Peça"
const nomeTypi = "Nome em Tupi"
const qtd = 21
const categorias = ["Colar", "Proteção"]
const preco = 40
const desc = "Descrição, peso, tamanho, feito em X dias pelo método Y, com os materiais A, B e C, usado na situação Z."
const nova = false; //indicativo se é nova peça ou edição de peça existente
const items = Array.from({ length: 5 }) //seriam as fotos


  return (
<>
      <Box color={CORES.PRETO}>
          <Card.Root  
          m={0} 
          p={0} 
          mt={8}
          borderTopRadius={24}
          borderWidth={0}
          borderBottomRadius={0}>
              <Card.Body 
              m={0} 
              p={0}
              borderTopRadius={24}
              borderWidth={0}
              borderBottomRadius={0}
              overflow={"hidden"}
              bgColor={CORES.BRANCO}>
                        <Box position="relative" w="full" h="50vh">
                        <Skeleton w="full" h="full" />

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
                                {nova? "Nova":"Editar"} Peça
                            </Text>
                            {
                            <IconButton 
                            bgColor={CORES.PRETO} 
                            color={CORES.BRANCO} 
                            size={"xl"} 
                            boxShadow={"md"}
                            rounded={"full"}
                            onClick={()=>navigate(`/perfil/${userId}/config`)}
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
                            <Input boxShadow={"xs"} rounded={"md"} placeholder="Nome da peça em português..." />
                            <Input boxShadow={"xs"} rounded={"md"} placeholder="Nome da peça em tupi potiguara..." />
                        </Field.Root>

                        <Field.Root required>
                        <Field.Label>
                            Preço <Field.RequiredIndicator />
                        </Field.Label>

                        <InputGroup startElement="R$">
                            <Input boxShadow={"xs"} rounded={"md"} placeholder="0,00" />
                        </InputGroup>
                        </Field.Root>

                        <Field.Root required>
                        <Field.Label>
                            Quantidade em estoque <Field.RequiredIndicator />
                        </Field.Label>
                            <NumberInput.Root defaultValue="0" unstyled spinOnPress={false}>
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
                            <Textarea boxShadow={"xs"} rounded={"md"} placeholder="Descreva a peça. Como foi feita? Com que materiais? Quanto tempo levou para fazer? Qual é o seu significado?" />
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
                                <Carousel.Item p={2} key={index} index={index}>
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
                          fontSize={TAMANHO.TEXTO_BOTAO} 
                          mt={6} 
                          boxShadow={"sm"}
                          w={"full"} 
                          bgColor={CORES.VERMELHO_MEDIO} 
                          rounded={"full"}>
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
