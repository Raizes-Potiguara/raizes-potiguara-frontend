import { CORES, TAMANHO } from "@/util/constants";
import { Box, Flex, Icon, IconButton, Stack } from "@chakra-ui/react";
import { LogIn, Landmark, ShoppingBag, Menu, X, HomeIcon, Shrimp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const LINKS_MENU = [
  { label: "Página Inicial", href: "/", icon: HomeIcon },
  { label: "Login", href: "/login", icon: LogIn },
  { label: "Cultura Potiguara", href: "/cultura", icon: Landmark },
  { label: "Loja", href: "/artesanato", icon: ShoppingBag },
];

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <>
      <Box position="relative" zIndex={2} px={8} py={5} bgColor={CORES.PRETO}>
        <Flex alignItems="center" justifyContent="space-between">
          <Link to="/">
            <Shrimp size={35} color={CORES.VERMELHO_VIVO} />
          </Link>
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
                asChild
                alignItems="center"
                gap={3}
                color={CORES.BRANCO}
                fontWeight="700"
                fontSize={`${TAMANHO.CORPO_TEXTO}px`}
                _hover={{ color: CORES.VERMELHO_VIVO }}
              >
                <a href={href}>
                  <ItemIcon size={20} />
                  {label}
                </a>
              </Flex>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Header;