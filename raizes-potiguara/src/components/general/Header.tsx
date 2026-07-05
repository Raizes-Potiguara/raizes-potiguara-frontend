import { CORES } from "@/util/constants";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <Box position="relative" zIndex={2} px={8} py={5} bgColor={CORES.PRETO}>
        <Flex alignItems="center" justifyContent="space-between">
          <Box w="10px" h="10px" borderRadius="full" bgColor={CORES.VERMELHO_VIVO} />
          <Icon cursor="pointer" onClick={() => setMenuAberto(!menuAberto)}>
            {menuAberto ? (
              <X size={26} color={CORES.BRANCO} />
            ) : (
              <Menu size={26} color={CORES.BRANCO} />
            )}
          </Icon>
        </Flex>
      </Box>

      {menuAberto && (
        <Box position="relative" zIndex={2} px={8} pb={5}>
          {/* conteúdo do menu mobile aqui */}
        </Box>
      )}
    </>
  );
};

export default Header;