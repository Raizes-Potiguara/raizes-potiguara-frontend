import { CORES, RADIUS_PADRAO_BOTAO, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { Box, Button, Card, Carousel, Center, Circle, Flex, HStack,Icon,IconButton,Image, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, BoxIcon, ClipboardIcon, ClipboardList, Hexagon, Mic, NotebookIcon, Package, PackageOpen, Shrimp } from "lucide-react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ImageTopCard from "../cards/ImageTopCard";
import MicButton from "../general/MicButton";
import HoneycombBackground from "../general/HoneycombBackground";

const PerfilArtesa = () => {

    const nome = "Fulana da Silva";
    
  return (
    <>
        <Box 
        w={"full"} 
        bgColor={CORES.PRETO} /* incorporar o padrão aqui depois */
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
                <SkeletonCircle
                    size={"full"}
                    border={"none"}
                />
                </Circle>

                <Card.Root
                    bg={CORES.PRETO}
                    blur={"lg"}
                    boxShadow={"md"}
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
                            {nome.split(" ")[0]}
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
                        rounded={"full"}
                        bgColor={CORES.VERMELHO_MEDIO}
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
