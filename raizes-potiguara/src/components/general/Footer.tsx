import { CORES, TAMANHO } from "@/util/constants";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { Shrimp } from "lucide-react";

const Footer = () => {

  return (
    <>
        <Box px={8} py={6} bgColor={CORES.PRETO} fontWeight={600}>
            <Flex gap={8} alignItems="center" justifyContent="center">
                <Icon><Shrimp size={58} color={CORES.BRANCO}/></Icon>
                <Text fontSize={TAMANHO.TEXTO_PEQUENO} color={CORES.BRANCO}>
                  © 2026 Ybirá. Todos os direitos reservados.
                </Text>
            </Flex>
        </Box>
    </>
  );
};

export default Footer;
