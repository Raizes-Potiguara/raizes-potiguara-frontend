import { CORES } from "@/util/constants";
import { Box, Flex } from "@chakra-ui/react";

const TypingIndicator = () => {
  return (
    <Box
      bg={CORES.CINZA_CLARINHO}
      px={4}
      py={4}
      borderRadius="2xl"
      w="fit-content"
    >
      <Flex gap={1}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            w="6px"
            h="6px"
            borderRadius="full"
            bg={CORES.CINZA_CLARO}
            animation={`bounce 1.2s infinite ${i * 0.2}s`}
          />
        ))}
      </Flex>

      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default TypingIndicator;