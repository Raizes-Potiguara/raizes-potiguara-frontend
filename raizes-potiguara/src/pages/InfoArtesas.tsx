import MicButton from "@/components/general/MicButton";
import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, Circle, Flex, Icon, IconButton, SkeletonCircle, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const InfoArtesas = () => {
    
const navigate = useNavigate();
const userId = 1

  return (
    <>
    <Box >
      <Box p={8} bgColor={CORES.CREME} color={CORES.PRETO}>
        <Flex mb={8} alignItems={"center"} placeContent={"space-between"}>
            <Text lineHeight={1.1} fontWeight={"bold"} fontSize={TAMANHO.TITULO_PAGINA}>
                Minhas Informações
            </Text>
            <IconButton 
            bgColor={CORES.PRETO} 
            color={CORES.BRANCO} 
            size={"xl"} 
            rounded={"full"}
            onClick={()=>navigate(`/perfil/${userId}`)}
            >
                <ArrowLeft/>
            </IconButton>
        </Flex>
        <Flex flexDir={"column"} alignItems={"center"}>
          <Circle
              size={"150px"}
              bgColor={CORES.CINZA_CLARO}
              borderColor={CORES.CREME}
              color={CORES.PRETO}
              zIndex={2}
          >
          <SkeletonCircle
              size={"full"}
          />
          </Circle>
        </Flex>
      </Box>
    </Box>
       <MicButton />
    </>
  );
};

export default InfoArtesas;
