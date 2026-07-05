import { CORES, TAMANHO } from "@/util/constants";
import { Box, Text } from "@chakra-ui/react";

const BalaoUser = () => {
  const msg =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet rutrum justo, sed vulputate orci convallis a. Maecenas non efficitur lectus."; // mock

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Box
        position="relative"
        bg={CORES.VERMELHO_CLARINHO}
        color={CORES.PRETO}
        px={4}
        py={3}
        borderRadius="2xl"
        maxW="70%"
        _after={{
          content: '""',
          position: "absolute",
          right: "-4px",
          bottom: "10px",
          width: "12px",
          height: "12px",
          bg: CORES.VERMELHO_CLARINHO,
          transform: "rotate(45deg)",
          borderRadius: "2px",
        }}
      >
        <Text fontSize={TAMANHO.CORPO_TEXTO}>{msg}</Text>
      </Box>
    </Box>
  );
};

export default BalaoUser;