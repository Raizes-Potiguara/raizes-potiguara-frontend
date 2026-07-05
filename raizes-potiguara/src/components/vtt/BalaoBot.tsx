import { CORES, TAMANHO } from "@/util/constants";
import { Box, Text } from "@chakra-ui/react";

const BalaoBot = () => {
  const msg = "Como posso ajudar?"; // mock

  return (
    <Box display="flex" justifyContent="flex-start" mb={2}>
      <Box
        position="relative"
        bg={CORES.CINZA_CLARINHO}
        color={CORES.PRETO}
        px={4}
        py={3}
        borderRadius="2xl"
        maxW="70%"
        _after={{
          content: '""',
          position: "absolute",
          left: "-6px",
          bottom: "10px",
          width: "12px",
          height: "12px",
          bg: `${CORES.CINZA_CLARINHO}`,
          transform: "rotate(45deg)",
          borderRadius: "2px",
        }}
      >
        <Text fontSize={TAMANHO.CORPO_TEXTO}>
          {msg}
        </Text>
      </Box>
    </Box>
  );
};

export default BalaoBot;