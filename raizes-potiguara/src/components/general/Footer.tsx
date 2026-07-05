import { CORES } from "@/util/constants";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { Shrimp } from "lucide-react";

const Footer = () => {

  return (
    <>
        <Box p={8} bgColor={CORES.VERMELHO_VIVO} fontWeight={600}>
            <Flex gap={8} alignItems="center" justifyContent="center">
                <Icon><Shrimp size={58} color={CORES.BRANCO}/></Icon>
                <p style={{ color: CORES.BRANCO }}>© 2026 Ybirá. Todos os direitos reservados.</p>
            </Flex>
        </Box>
    </>
  );
};

export default Footer;
