import { CORES, TAMANHO } from "@/util/constants";
import { Box, Flex, Icon, Stack } from "@chakra-ui/react";
import { LogIn, Landmark, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS_MENU = [
  { label: "Login", href: "/login", icon: LogIn },
  { label: "Cultura Potiguara", href: "/cultura-potiguara", icon: Landmark },
  { label: "Loja", href: "/loja", icon: ShoppingBag },
];

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
        <Box position="relative" zIndex={2} px={8} pb={5} bgColor={CORES.PRETO}>
          <Stack gap={5}>
            {LINKS_MENU.map(({ label, href, icon: ItemIcon }) => (
              <Flex
                key={href}
                as="a"
                href={href}
                alignItems="center"
                gap={3}
                color={CORES.BRANCO}
                fontWeight="700"
                fontSize={`${TAMANHO.CORPO_TEXTO}px`}
                _hover={{ color: CORES.VERMELHO_VIVO }}
              >
                <ItemIcon size={20} />
                {label}
              </Flex>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Header;