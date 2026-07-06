import { TAMANHO, CORES } from "@/util/constants";
import { Badge, Box, Card, Flex, HStack, Image, Button, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const ProdutoCard = () => {

    const navigate = useNavigate();
    const idProd = 1; //mock

  return (
    <>

        <Card.Root 
        flexDirection="row" 
        boxShadow={"sm"}
        bgColor={"white/40"}
        overflow="hidden" 
        w={"full"}
        h={"20vh"}
        alignItems={"center"}
        border={0}
        >
        <Skeleton
            objectFit="cover"
            alignSelf={"stretch"}
            w={"30vw"}
            borderRightRadius={0}
       />
        <Box>
            <Card.Body p={4}>
            <Card.Title fontSize={TAMANHO.TEXTO_GRANDE}>Nome da Peça</Card.Title>
            <Flex flexDir={"column"} mt={1} gap={3}>
            <HStack>
                <Badge bgColor={CORES.VERMELHO_CLARINHO}>Categoria 1</Badge>
                <Badge bgColor={CORES.VERMELHO_CLARINHO}>Categoria 2</Badge>
            </HStack>
            <Button 
            rounded={"full"}
            boxShadow={"sm"}
            variant={"outline"}
            color={CORES.CINZA_ESCURO}
            borderColor={CORES.CINZA_CLARO}
            onClick={()=>navigate(`${idProd}`)}
            >
                Editar
            </Button>
            </Flex>
            </Card.Body>
        </Box>
        </Card.Root>

    </>
  );
};

export default ProdutoCard;
