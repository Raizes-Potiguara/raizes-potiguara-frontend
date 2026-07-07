import { Box } from "@chakra-ui/react";
import BalaoBot from "./BalaoBot";
import BalaoUser from "./BalaoUser";
import { MessageAnimation } from "./MotionBox";
import { useRef, useEffect } from "react";

export interface MensagemChat {
	id: string;
	texto: string;
	autor: "user" | "bot";
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
