import { CORES, TAMANHO } from "@/util/constants";
import { Box, Button, CloseButton, Dialog, Flex, IconButton, Portal, useDialogContext } from "@chakra-ui/react";
import { Mic } from "lucide-react";
import Conversa from "../vtt/Conversa";
import Inputs from "../vtt/Inputs";
import { useState } from "react";

const MicButton = () => {
    
  const [open, setOpen] = useState(false);

  return (
    <>

    <Dialog.Root 
    scrollBehavior="inside"
    placement="center"
    motionPreset="slide-in-bottom"
    open={open}
    onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
            <Box
            position="fixed"
            bottom="24px"
            right="24px"
            zIndex="1000"
            opacity={open ? 0 : 1}
            transform={open ? "scale(0.8)" : "scale(1)"}
            transition="all 0.2s ease"
            pointerEvents={open ? "none" : "auto"}
            >
                <IconButton
                    rounded={"full"}
                    size={"2xl"}
                    variant={"subtle"}
                    bgColor={CORES.VERMELHO_VIVO}
                    boxShadow={"md"}
                >
                    <Mic
                    color={CORES.BRANCO}
                    />
                </IconButton>
            </Box>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner >
          <Dialog.Content 
            mx={2} 
            boxShadow={"md"}
            borderRadius={"xl"}
            bgColor={CORES.PRETO}
            color={CORES.BRANCO}
            h={"100%"}
          >
            <Dialog.Header>
              <Dialog.Title fontSize={TAMANHO.SUBTITULO_SECAO}>
                Assistente virtual
            </Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton color={CORES.BRANCO} mt={2} size="md" />
            </Dialog.CloseTrigger>
            <Dialog.Body px={0}>
                <Flex px={2} w={"100%"} h={"full"} flexDir={"column"} justifyContent={"end"} gap={6}>
                    <Box w={"100%"} overflowY={"auto"} overflowX={"hidden"}>
                    <Conversa/>
                    </Box>
                    <Inputs/>
                </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </>
  );
};

export default MicButton;
