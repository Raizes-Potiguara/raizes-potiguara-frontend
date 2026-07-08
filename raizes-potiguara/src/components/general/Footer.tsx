import { CORES, TAMANHO } from "@/util/constants";
import { Box, Card, Flex, Icon, Text } from "@chakra-ui/react";
import { Shrimp } from "lucide-react";

const Footer = () => {

  return (
    <>
    <Card.Root m={0} p={0} border={"none"}>
      <Card.Body m={0} p={0} border={"none"}>
        <Box px={8} py={6} bgColor={CORES.VERMELHO_MEDIO} fontWeight={600}>
            <Flex gap={8} alignItems="center" justifyContent="center">
                <Icon><Shrimp size={58} color={CORES.BRANCO}/></Icon>
                <Text fontSize={TAMANHO.TEXTO_PEQUENO} color={CORES.BRANCO}>
                  © 2026 Ybirá. Todos os direitos reservados.
                </Text>
            </Flex>
        </Box>
      </Card.Body>
    </Card.Root>
    </>
  );
};

export default Footer;
