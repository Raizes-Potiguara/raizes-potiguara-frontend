import ChangePassword from "@/components/general/ChangePassword";
import MicButton from "@/components/general/MicButton";
import ProdutoCard from "@/components/paginas_artesas/ProdutoCard";
import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { Box, Card, Flex, Icon, IconButton, Image, SkeletonCircle, InputGroup, Input, Text, Textarea, Button, HStack, Stat, Badge } from "@chakra-ui/react";
import { ArrowLeft, LucidePlusCircle, Pencil } from "lucide-react";
import { LuUser, LuCoins, LuMail, LuHouse, LuAtSign, LuDollarSign, LuHandCoins, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router";

const ConfigVenda = () => {
  
const navigate = useNavigate();
const userId = 1

  return (
    <>
      <Box>
          <Card.Root  
          m={0} 
          p={0} 
          mt={8}
          borderTopRadius={24}
          borderBottomRadius={0}>
              <Card.Body 
              m={0} 
              p={0}
              borderTopRadius={24}
              borderBottomRadius={0}
              bgColor={CORES.BRANCO}>
                      <Box p={8} color={CORES.CINZA_ESCURO}>
                        <Flex mb={8} alignItems={"center"} placeContent={"space-between"}>
                            <Text color={CORES.PRETO} className="hashira" lineHeight={1.1} fontWeight={"bold"} fontSize={TAMANHO.TITULO_SECAO}>
                                Meu <br/> Artesanato
                            </Text>
                            {
                            <IconButton 
                            bgColor={CORES.PRETO} 
                            color={CORES.BRANCO} 
                            size={"xl"} 
                            boxShadow={"md"}
                            rounded={"full"}
                            onClick={()=>navigate(`/perfil/${userId}`)}
                            >
                                <ArrowLeft/>
                            </IconButton>
                            }
                        </Flex>

                        <Flex gap={4}>
                        <Stat.Root 
                        borderWidth="1px" 
                        p="4" 
                        rounded="md"
                        bgColor={CORES.VERMELHO_CLARINHO}
                        color={CORES.CINZA_ESCURO}
                        boxShadow={"sm"}
                        border={0}
                        gap={3}
                        w={"fit"}
                        placeContent={"space-between"}
                        >
                          <HStack justify="space-between">
                            <Stat.Label fontSize={TAMANHO.CORPO_TEXTO}>Vendas mensais</Stat.Label>
                            <Icon color="fg.muted">
                              <LuHandCoins />
                            </Icon>
                          </HStack>
                          <Stat.ValueText fontWeight={"black"}>19</Stat.ValueText>
                        </Stat.Root>

                        <Stat.Root 
                        borderWidth="1px" 
                        p="4" 
                        rounded="md"
                        bgColor={CORES.VERMELHO_CLARINHO}
                        color={CORES.CINZA_ESCURO}
                        boxShadow={"sm"}
                        gap={3}
                        placeContent={"space-between"}
                        w={"full"}
                        border={0}
                        >
                          <HStack justify="space-between">
                            <Stat.Label fontSize={TAMANHO.CORPO_TEXTO}>Receita mensal</Stat.Label>
                            <Icon color="fg.muted">
                              <LuCoins />
                            </Icon>
                          </HStack>
                          <Stat.ValueText fontWeight={"black"}>R$622,85</Stat.ValueText>
                        </Stat.Root>
                        </Flex>


                        <Flex flexDir={"column"} gap={4} mt={8}>
                          <Text color={CORES.PRETO} fontWeight={"bold"} fontSize={TAMANHO.TITULO_SUBSECAO}>Minhas Peças</Text>

                          <Card.Root
                          flexDirection="row" 
                          boxShadow={"sm"}
                          bgColor={"white/60"}
                          overflow="hidden" 
                          w={"full"}
                          h={"10vh"}
                          alignItems={"center"}
                          color={CORES.CINZA_ESCURO}
                          border={0}
                          onClick={()=>navigate(`0`)}
                          >
                              <Card.Body>
                                <Flex alignItems={"center"} gap={4}>
                                  <Icon><LucidePlusCircle/></Icon>
                                  <Text fontSize={TAMANHO.CORPO_TEXTO}>Adicionar Peça</Text>
                                </Flex>
                              </Card.Body>
                          </Card.Root>

                          <ProdutoCard/>
                          <ProdutoCard/>
                          <ProdutoCard/>
                          <ProdutoCard/>
                        </Flex>
                        
                      </Box>
              </Card.Body>
          </Card.Root>
    
        </Box>
        <MicButton />
    </>
  );
};

export default ConfigVenda;
