import MicButton from "@/components/general/MicButton";
import { CORES, TAMANHO } from "@/util/constants";
import { Box, Image, Text, Card, Flex, IconButton, Skeleton, Center } from "@chakra-ui/react";
import {ArrowLeft } from "lucide-react";
import { LuPencil } from "react-icons/lu";
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


  return (
<>
      <Box>
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

                        
                      </Box>
              </Card.Body>
          </Card.Root>
    
        </Box>
        <MicButton />
    </>
  );
};

export default ConfigVendaProduto;
