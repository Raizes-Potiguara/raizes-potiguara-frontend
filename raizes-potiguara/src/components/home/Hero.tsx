// src/components/home/Hero.tsx
import { Box, Flex, Heading, Text} from '@chakra-ui/react';
import HoneycombBackground from '../general/HoneycombBackground';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';

const Hero = () => {
  return (
    <Box as="section" position="relative" bg={CORES.PRETO} overflow="hidden">
      <HoneycombBackground />

      <Box position="relative" zIndex={2}>

        <Flex
          direction="column"
          align="flex-start"
          gap={5}
          px={{ base: 6, md: 10 }}
          pt={16}
          pb={20}
        >
          <Box
            bg={CORES.BRANCO}
            border={`2px solid ${CORES.PRETO}`}
            borderRadius={`${RADIUS_PADRAO_BOTAO}px`}
            boxShadow="4px 4px 0px rgba(0,0,0,0.35)"
            px={{ base: 5, md: 8 }}
            py={{ base: 2, md: 3 }}
            mt={{ base: 20, md: 22  }}
            mb={{ base: 16, md: 18  }}
            css={{
              backgroundImage: `
                linear-gradient(${CORES.CINZA_CLARO}33 1px, transparent 1px),
                linear-gradient(90deg, ${CORES.CINZA_CLARO}33 1px, transparent 1px)
              `,
              backgroundSize: '14px 14px',
            }}
          >
            <Heading
              as="p"
              fontFamily="'Hashira', serif"
              fontWeight="normal"
              lineHeight={1}
              color={CORES.VERMELHO_ESCURO}
              fontSize={`${TAMANHO.TITULO_YBIRA}px`}
            >
              Ybirá
            </Heading>
          </Box>

          <Text
            color={CORES.BRANCO}
            fontWeight="bold"
            lineHeight={1.25}
            maxW="480px"
            fontSize={`${TAMANHO.SUBTITULO_SECAO}px`}
            mt={8}
          >
            O artesanato potiguara contado pelas mãos que o criam.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Hero;