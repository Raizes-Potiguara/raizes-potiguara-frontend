import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import { Card, Flex, Icon, Skeleton, Text } from "@chakra-ui/react";
import { type LucideIcon } from "lucide-react";

interface ImageTopCardProps {
    titulo: string;
    imageUrl: string;
    bgColor: (typeof CORES)[keyof typeof CORES];
    textColor: (typeof CORES)[keyof typeof CORES];
    iconId: LucideIcon;
}


const ImageTopCard = (
    {
        titulo,
        imageUrl,
        bgColor,
        textColor,
        iconId
    }: ImageTopCardProps
) => {
    
  return (
    <>          
        <Card.Root
            bg={bgColor}
            color={textColor}
            borderRadius={RADIUS_PADRAO_CARD}
            boxShadow="md"
            w={"full"}
            h={"24%"}
            overflow={"hidden"}
        >
            <Skeleton 
                h={"12vh"} 
                w={"full"}
            >

            </Skeleton>
            <Card.Body>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text
                    lineHeight={1}
                    fontSize={TAMANHO.TEXTO_BOTAO}
                    >
                        {titulo}
                    </Text>
                    <Icon as={iconId} />
                </Flex>
            </Card.Body>
        </Card.Root>
    </>
  );
};

export default ImageTopCard;
