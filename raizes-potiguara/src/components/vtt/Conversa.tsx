import { Box } from "@chakra-ui/react";
import BalaoBot from "./BalaoBot";
import BalaoUser from "./BalaoUser";
import { MessageAnimation } from "./MotionBox";
import { useRef, useEffect } from "react";

const mensagens = [
  {
    id: "1",
    texto: "Olá! Gostaria de aprender sobre as crenças do povo Potiguara.",
    autor: "user",
  },
  {
    id: "2",
    texto: "Claro! O povo Potiguara possui uma espiritualidade profundamente ligada à natureza e aos seus territórios tradicionais no litoral do Nordeste do Brasil.",
    autor: "bot",
  },
  {
    id: "3",
    texto: "Quais elementos da natureza são mais importantes nas crenças deles?",
    autor: "user",
  },
  {
    id: "4",
    texto: "Elementos como o mar, os rios, as florestas e os animais têm grande importância espiritual. Eles são vistos como parte de um sistema vivo e sagrado.",
    autor: "bot",
  },
  {
    id: "5",
    texto: "Existem rituais ou práticas espirituais específicas?",
    autor: "user",
  },
  {
    id: "6",
    texto: "Sim. Entre as práticas culturais e espirituais estão os torés, que são rituais coletivos com canto, dança e conexão espiritual com os ancestrais e a natureza.",
    autor: "bot",
  },
  {
    id: "7",
    texto: "Os Potiguaras ainda preservam essas tradições hoje?",
    autor: "user",
  },
  {
    id: "8",
    texto: "Sim, muitas aldeias Potiguaras mantêm vivas suas tradições, mesmo com influências externas ao longo da história. Há um forte esforço de preservação cultural.",
    autor: "bot",
  },
];

const Conversa = () => {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  return (
    <>
      <Box w="100%" px={4}>
        {mensagens.map((msg, index) => {

          const Balao = msg.autor === "bot" ? BalaoBot : BalaoUser;

          return (
            <MessageAnimation key={index}>
              <Balao
                key={msg.id}
                msg={msg.texto}
              />
            </MessageAnimation>
          );
        })}
      </Box>
      <Box ref={bottomRef} />
    </>
  );
};
export default Conversa;