import { CORES, TAMANHO } from "@/util/constants";
import { Box, CloseButton, Dialog, Flex, IconButton, Portal } from "@chakra-ui/react";
import { Mic } from "lucide-react";
import Inputs from "../vtt/Inputs";
import { useState, useEffect } from "react";
import Conversa, { type MensagemChat } from "../vtt/Conversa";
import { useParams } from "react-router";
import { ApiService } from "@/services/apiService";

const MicButton = () => {
	const { id } = useParams<{ id: string }>();
	const [open, setOpen] = useState(false);

	const [mensagens, setMensagens] = useState<MensagemChat[]>([
		{ id: "msg_inicial", texto: "Olá! Como posso te ajudar hoje?", autor: "bot" }
	]);

	useEffect(() => {
		if (!open) {
			setMensagens([
				{ id: "msg_inicial", texto: "Olá! Como posso te ajudar hoje?", autor: "bot" }
			]);
		}
	}, [open]);

	const enviarParaAssistente = async (
		texto: string,
		imagem?: File | null,
		audio?: Blob | null,
	) => {
		try {
			const resposta = await ApiService.enviarAssistente({
				texto,
				imagem,
				audio,
				tipo_conta: "ARTESA",
				usuario_id: resolverUsuarioIdArtesa(id),
				contexto: {
					origem: "chatbot_perfil_artesa",
					tela: window.location.pathname,
				},
			});

			const mensagemResposta =
				resposta.mensagem || "Não consegui entender agora. Pode tentar de novo?";
			const mensagemBotId = `msg_bot_${Date.now()}`;

			setMensagens((mensagensAtuais) => [
				...mensagensAtuais,
				{
					id: mensagemBotId,
					texto: mensagemResposta,
					autor: "bot",
					carregandoAudio: true,
				},
			]);

			try {
				const audio = await ApiService.gerarAudioResposta(mensagemResposta);

				setMensagens((mensagensAtuais) =>
					mensagensAtuais.map((mensagem) =>
						mensagem.id === mensagemBotId
							? {
								...mensagem,
								audioUrl: audio.audio_url,
								carregandoAudio: false,
							}
							: mensagem,
					),
				);
			} catch {
				setMensagens((mensagensAtuais) =>
					mensagensAtuais.map((mensagem) =>
						mensagem.id === mensagemBotId
							? {
								...mensagem,
								carregandoAudio: false,
								erroAudio: true,
							}
							: mensagem,
					),
				);
			}
		} catch {
			setMensagens((mensagensAtuais) => [
				...mensagensAtuais,
				{
					id: `msg_bot_erro_${Date.now()}`,
					texto: "Não consegui falar com o assistente agora. Tente novamente em instantes.",
					autor: "bot",
				},
			]);
		}
	};

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
							<Mic color={CORES.BRANCO} />
						</IconButton>
					</Box>
				</Dialog.Trigger>

				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
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
										<Conversa mensagens={mensagens} />
									</Box>

									<Inputs
										setMensagens={setMensagens}
										onEnviarMensagem={enviarParaAssistente}
									/>
								</Flex>
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
};

const resolverUsuarioIdArtesa = (id?: string) => {
	if (!id) return "01";
	if (id.length === 1 && /^\d$/.test(id)) return id.padStart(2, "0");
	return id;
};

export default MicButton;
