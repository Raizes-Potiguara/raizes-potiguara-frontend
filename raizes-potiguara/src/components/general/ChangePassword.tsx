import { TAMANHO, CORES } from "@/util/constants";
import { Dialog, Button, Portal, CloseButton, InputGroup, Input, Flex, PinInput, Text } from "@chakra-ui/react";
import { LuLockKeyhole } from "react-icons/lu";

const ChangePassword = () => {

  return (
    <>
    <Dialog.Root 
    scrollBehavior="inside"
    placement="center"
    motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button 
        fontSize={TAMANHO.TEXTO_BOTAO}
        w={"full"} 
        bgColor={CORES.CINZA_ESCURO} 
        rounded={"full"}>
        Alterar senha
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner >
          <Dialog.Content 
            mx={2} 
            boxShadow={"md"}
            borderRadius={"xl"}
            bgColor={CORES.CREME}
            color={CORES.PRETO}
          >
            <Dialog.Header>
              <Dialog.Title fontSize={TAMANHO.SUBTITULO_SECAO}>
                Alterar senha
            </Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton color={CORES.PRETO} mt={2} size="md" />
            </Dialog.CloseTrigger>
            <Dialog.Body>
                <Flex alignItems={"center"} flexDir={"column"} gap={8}>
                        <PinInput.Root  >
                        <Text mb={2} fontSize={TAMANHO.CORPO_TEXTO}>Sua senha anterior</Text>
                        <PinInput.HiddenInput />
                        <PinInput.Control >
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={0} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={1} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={2} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={3} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={4} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={5} />
                        </PinInput.Control>
                        </PinInput.Root>

                        <PinInput.Root  >
                        <Text mb={2} fontSize={TAMANHO.CORPO_TEXTO}>Sua nova senha</Text>
                        <PinInput.HiddenInput />
                        <PinInput.Control >
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={0} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={1} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={2} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={3} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={4} />
                            <PinInput.Input border={"none"} bgColor={CORES.BRANCO+"/15"} index={5} />
                        </PinInput.Control>
                        </PinInput.Root>
                </Flex>
                <Button 
                mt={8}
                fontSize={TAMANHO.TEXTO_BOTAO}
                w={"full"} 
                bgColor={CORES.VERMELHO_MEDIO} 
                rounded={"full"}>
                Alterar senha
                </Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </>
  );
};

export default ChangePassword;
