import { Box } from '@chakra-ui/react';
import honeycomb from '../../assets/honeycomb_potiguara.svg';
import { CORES } from '../../util/constants';

// tamanho nativo do tile do SVG
const TILE_W = 455;
const TILE_H = 407;

// fator de escala do padrão (0.5 = hexágonos na metade do tamanho)
const SCALE = 0.25;

const TARGET_H = Math.round(TILE_H * SCALE);
const PERFECT_SCALE = TARGET_H / TILE_H; 
const maskSize = `${TILE_W * PERFECT_SCALE}px ${TARGET_H}px`;

const HoneycombBackgroundWhite = () => {
    return (
        <Box position="absolute" inset={0} overflow="hidden" zIndex={0} aria-hidden>
            <Box
                position="absolute"
                inset={0}
                bgImage={`linear-gradient(to bottom, ${CORES.CINZA_CLARINHO}, ${CORES.CINZA_CLARINHO})`}
            />
            <Box
                position="absolute"
                inset={0}
                bg={CORES.CINZA_CLARO}
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
        </Box>
    );
};

export default HoneycombBackgroundWhite;