import { CORES } from "@/util/constants";
import { Box, IconButton } from "@chakra-ui/react";
import { Mic } from "lucide-react";

const MicButton = () => {

  return (
    <>
    <Box
      position="fixed"
      bottom="24px"
      right="24px"
      zIndex="1000"
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
    </>
  );
};

export default MicButton;
