import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { Box, Button, Card, Carousel, Circle, Flex, HStack,Icon,IconButton,Image, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, BoxIcon, ClipboardIcon, ClipboardList, Hexagon, Mic, NotebookIcon, Package, PackageOpen, Shrimp } from "lucide-react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ImageTopCard from "../cards/ImageTopCard";
import MicButton from "../general/MicButton";

const PerfilArtesa = () => {

    const nome = "Fulana da Silva";
    
  return (
    <>
        <Box 
        w={"full"} 
        bgColor={CORES.PRETO} /* incorporar o padrão aqui depois */
        color={CORES.PRETO}
        pt={16}
        >
            <Box  position="relative" w="full" pt="72px">
                <Circle
                    size={"150px"}
                    bgColor={CORES.CINZA_CLARO}
                    position="absolute"
                    top={0}
                    left="50%"
                    transform="translateX(-50%)"
                    borderWidth={10}
                    borderColor={CORES.CREME}
                    color={CORES.PRETO}
                    zIndex={2}
                >
                <SkeletonCircle
                    size={"full"}
                />
                </Circle>

                <Card.Root
                    bg={CORES.CREME}
                    blur={"lg"}
                    boxShadow={"md"}
                    borderTopRadius={24}
                    borderBottomRadius={0}
                    pt="60px"
                    zIndex={1}
                >
                    <Card.Body>
                        <Text 
                        fontSize={TAMANHO.TITULO_SECAO}
                        fontWeight={700}
                        textAlign={"center"}
                        >
                        Bem-vinda, {nome.split(" ")[0]}!
                        </Text>

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
                                bgColor={CORES.PRETO}
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
