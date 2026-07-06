import ChangePassword from "@/components/general/ChangePassword";
import MicButton from "@/components/general/MicButton";
import { CORES, RADIUS_PADRAO_BOTAO, TAMANHO } from "@/util/constants";
import { Box, Button, Circle, Flex, Icon, IconButton, Input, InputGroup, SkeletonCircle, Text, Textarea } from "@chakra-ui/react";
import { ArrowLeft, Mail, Pencil } from "lucide-react";
import { LuAtSign, LuCoins, LuHouse, LuMail, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router";

const InfoArtesas = () => {
    
const navigate = useNavigate();
const userId = 1

  return (
    <>
    <Box >
      <Box p={8} bgColor={CORES.BRANCO} color={CORES.CINZA_ESCURO}>
        <Flex mb={8} alignItems={"center"} placeContent={"space-between"}>
            <Text color={CORES.PRETO} className="hashira" lineHeight={1.1} fontWeight={"bold"} fontSize={TAMANHO.TITULO_SECAO}>
                Minhas <br/> Informações
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
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
            <Box mb={4} position="relative" w="150px" h="150px">
              <Circle
                size="150px"
                bgColor={CORES.CINZA_CLARO}
                borderColor={CORES.CREME}
                color={CORES.PRETO}
                overflow="hidden"
                boxShadow={"md"}
              >
                <SkeletonCircle size="full" />
              </Circle>

              <Box
                position="absolute"
                inset={0}
                bg="blackAlpha.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                cursor="pointer"
                transition="background 0.2s"
                _hover={{
                  bg: "blackAlpha.600",
                }}
              >
                <Pencil color="white" size={28} />
              </Box>
            </Box>

              <InputGroup startElement={<LuUser />}>
                <Input boxShadow={"xs"} rounded={"md"} placeholder="Seu nome completo..." />
              </InputGroup>
              <InputGroup  endElement={<LuCoins />}>
                <Input boxShadow={"xs"} px={4} rounded={"md"} placeholder="Sua chave pix..." />
              </InputGroup>
              <InputGroup startElement={<LuMail />}>
                <Input boxShadow={"xs"} rounded={"md"} placeholder="Seu endereço de email..." />
              </InputGroup>
              <InputGroup  endElement={<LuHouse />}>
                <Input boxShadow={"xs"} px={4} rounded={"md"} placeholder="De que aldeia você é?" />
              </InputGroup>
              <Flex gap={2}>
                <InputGroup startElement={<LuAtSign />}>
                  <Input boxShadow={"xs"} rounded={"md"} placeholder="Instagram" />
                </InputGroup>
                <InputGroup startElement={<LuAtSign />}>
                  <Input boxShadow={"xs"} rounded={"md"} placeholder="Facebook" />
                </InputGroup>
              </Flex>
              <Textarea boxShadow={"xs"} placeholder="Sobre mim..." minH={"20vh"} maxH={"40vh"}/>

              <Button 
              fontSize={TAMANHO.TEXTO_BOTAO} 
              mt={4} 
              w={"full"} 
              bgColor={CORES.VERMELHO_MEDIO} 
              rounded={"full"}>
                Salvar alterações
              </Button>

              <ChangePassword/>
        </Flex>
      </Box>
    </Box>
       <MicButton />
    </>
  );
};

export default InfoArtesas;
