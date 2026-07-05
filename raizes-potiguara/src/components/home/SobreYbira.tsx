// src/components/home/SobreYbira.tsx
import { Box, Flex, Text } from '@chakra-ui/react';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';

const SobreYbira = () => {
  return (
    <Box
      as="section"
      bg={CORES.PRETO}
      px={{ base: 6, md: 10 }}
      pt={{ base: 2, md: 4 }}
      pb={{ base: 12, md: 20 }}
    >
      {/* etiqueta tipo post-it */}
      <Flex
        display="inline-flex"
        align="center"
        gap={2}
        bg={CORES.BRANCO}
        border={`2px solid ${CORES.PRETO}`}
        borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
        px={4}
        py={2}
        mb={{ base: 6, md: 8 }}
        transform="rotate(-3deg)"
      >
        <Box as="span" w="8px" h="8px" borderRadius="full" bg={CORES.VERMELHO_VIVO} />
        <Text as="span" fontStyle="italic" color={CORES.PRETO} fontSize={`${TAMANHO.TEXTO_PEQUENO}px`}>
          O que é o{' '}
          <Text as="span" color={CORES.VERMELHO_VIVO} fontWeight="bold">
            Ybirá
          </Text>
          ?
        </Text>
      </Flex>

      <Text color={CORES.BRANCO} lineHeight={1.5} maxW="640px" mb={5} fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
        <Text as="span" color={CORES.VERMELHO_VIVO} fontWeight="bold">
          Ybirá
        </Text>{' '}
        nasce para dar visibilidade ao trabalho manual das artesãs e artesãos potiguara: um saber que
        atravessa gerações e vive em cada colar, cesto e adorno.
      </Text>

      <Text color={CORES.CINZA_CLARO} lineHeight={1.5} maxW="640px" fontSize={`${TAMANHO.CORPO_TEXTO}px`}>
        Aqui, cada peça carrega uma técnica, uma história e uma comunidade por trás dela.
      </Text>
    </Box>
  );
}

export default SobreYbira;