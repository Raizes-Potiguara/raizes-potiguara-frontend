import { Box } from '@chakra-ui/react';
import honeycomb from '../../assets/honeycomb_potiguara.svg';
import { CORES } from '../../util/constants';

// tamanho nativo do tile do SVG
const TILE_W = 455;
const TILE_H = 407;

// fator de escala do padrão (0.5 = hexágonos na metade do tamanho)
const SCALE = 0.5;

const maskSize = `${TILE_W * SCALE}px ${TILE_H * SCALE}px`;

const HoneycombBackground = () => {
    return (
        <Box position="absolute" inset={0} overflow="hidden" zIndex={0} aria-hidden>
            <Box
                position="absolute"
                inset={0}
                bgImage={`linear-gradient(to bottom, ${CORES.VERMELHO_MEDIO}, ${CORES.VERMELHO_ESCURO})`}
            />
            <Box
                position="absolute"
                inset={0}
                bg={CORES.PRETO}
                opacity={1}
                css={{
                    maskImage: `url(${honeycomb})`,
                    maskRepeat: 'repeat',
                    maskSize,
                    WebkitMaskImage: `url(${honeycomb})`,
                    WebkitMaskRepeat: 'repeat',
                    WebkitMaskSize: maskSize,
                }}
            />

            {/* fade pro preto, só no final */}
            <Box
                position="absolute"
                inset={0}
                bgImage={`linear-gradient(to bottom, transparent 85%, ${CORES.PRETO} 100%)`}
            />
        </Box>
    );
};

export default HoneycombBackground;