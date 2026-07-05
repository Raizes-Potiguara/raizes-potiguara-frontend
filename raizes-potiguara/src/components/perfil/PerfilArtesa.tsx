import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { Box, Button, Card, Carousel, HStack, IconButton, SkeletonCircle, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PerfilArtesa = () => {

    const nome = "Fulana da Silva";
    const items = Array.from({ length: 5 })
    
  return (
    <>
        <Box 
        w={"full"} 
        bgColor={CORES.PRETO}
        pt={16}
        >
            <Box  position="relative" w="full" pt="72px">
                <SkeletonCircle
                    size={"150px"}
                    position="absolute"
                    top={0}
                    left="50%"
                    transform="translateX(-50%)"
                    borderWidth={10}
                    borderColor={CORES.BRANCO}
                    color={CORES.PRETO}
                    zIndex={2}
                    animation="none"
                />

                <Card.Root
                    bg={CORES.BRANCO}
                    borderTopRadius={24}
                    borderBottomRadius={0}
                    pt="60px"
                    zIndex={1}
                >
                    <Card.Body>
                        <Text 
                        fontSize={TAMANHO.TITULO_SUBSECAO}
                        fontWeight={700}
                        >
                        Bem-vinda, {nome.split(" ")[0]}!
                        </Text>
                        <Text
                        fontSize={TAMANHO.TEXTO_PEQUENO}
                        color={CORES.CINZA_ESCURO}
                        fontWeight={700}
                        >
                            Como posso te ajudar hoje?
                        </Text>

                        <Carousel.Root
                        slidesPerPage={1.5}
                        slideCount={items.length}
                        >

                            <Carousel.ItemGroup
                                py={6}
                            >
                                {items.map((_, index) => (
                                <Carousel.Item key={index} index={index}>
                                    <Box 
                                    w="50vw" 
                                    h={"35vh"} 
                                    rounded={RADIUS_PADRAO_CARD}
                                    bg={CORES.CINZA_CLARO}
                                    boxShadow="md"
                                    >
                                        
                                    </Box>
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

                    </Card.Body>
                </Card.Root>
            </Box>
        </Box>
    </>
  );
};

export default PerfilArtesa;
