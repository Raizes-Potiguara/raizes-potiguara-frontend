// src/components/home/Hero.tsx
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import HoneycombBackground from '../general/HoneycombBackground';
import { CORES, TAMANHO, RADIUS_PADRAO_BOTAO } from '../../util/constants';

interface HeroProps {
  aoClicarConhecerArtesanato?: () => void;
}

const Hero = ({ aoClicarConhecerArtesanato }: HeroProps) => {
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
            O Artesanato Potiguara contado pelas mãos que o criam.
          </Text>

          <Button
            onClick={aoClicarConhecerArtesanato}
            bg={CORES.VERMELHO_MEDIO}
            color={CORES.BRANCO}
            fontWeight="semibold"
            borderRadius="full"
            px={7}
            py={6}
            gap={2}
            fontSize={`${TAMANHO.TEXTO_BOTAO}px`}
            _hover={{ bg: CORES.VERMELHO_ESCURO }}
            _active={{ bg: CORES.VERMELHO_ESCURO }}
          >
            Conhecer o artesanato
            <ArrowRight size={20} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Hero;