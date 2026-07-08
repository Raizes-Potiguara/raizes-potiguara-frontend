import { Box } from "@chakra-ui/react";
import BalaoBot from "./BalaoBot";
import BalaoUser from "./BalaoUser";
import { MessageAnimation } from "./MotionBox";
import { useRef, useEffect } from "react";

export interface MensagemChat {
	id: string;
	texto: string;
	autor: "user" | "bot";
	imagemUrl?: string;
	audioUrl?: string;
	carregandoResposta?: boolean;
	carregandoAudio?: boolean;
	erroAudio?: boolean;
	audioStatus?: "gerando" | "pronto" | "tocando" | "erro";
	audioErro?: string;
}

interface ConversaProps {
	mensagens: MensagemChat[];
}

const Conversa = ({ mensagens }: ConversaProps) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [mensagens]);

	return (
		<>
			<Box w="100%" px={4}>
				{mensagens.map((msg) => {
					const Balao = msg.autor === "bot" ? BalaoBot : BalaoUser;

					return (
						<MessageAnimation key={msg.id}>
							<Balao
								msg={msg.texto}
								imagemUrl={msg.imagemUrl}
								audioUrl={msg.audioUrl}
								carregandoResposta={msg.carregandoResposta}
								carregandoAudio={msg.carregandoAudio}
								erroAudio={msg.erroAudio}
								audioStatus={msg.audioStatus}
								audioErro={msg.audioErro}
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
