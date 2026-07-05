import { TAMANHO } from "@/util/constants";
import { Box, Text } from "@chakra-ui/react";

const Home = () => {

  return (
    <>
        <Box p={8}>
            <Text 
                fontSize={TAMANHO.TITULO_YBIRA} 
                className="hashira"
            >
                Ybirá
            </Text>
            <Text
                fontSize={TAMANHO.CORPO_TEXTO}
            >
                Texto de teste para a página inicial do site e definição dos tamanhos de texto
            </Text>
        </Box>
    </>
  );
};

export default Home;
