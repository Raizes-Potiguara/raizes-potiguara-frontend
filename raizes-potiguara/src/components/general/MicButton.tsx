import { CORES, TAMANHO } from "@/util/constants";
import { Box, CloseButton, Dialog, Flex, IconButton, Portal, Text } from "@chakra-ui/react";
import { Mic } from "lucide-react";
import Inputs from "../vtt/Inputs";
import { useState, useEffect } from "react";
import Conversa, { type MensagemChat } from "../vtt/Conversa";
import { useLocation, useParams } from "react-router";
import { ApiService } from "@/services/apiService";

type MicButtonProps = {
	variant?: "padrao" | "home";
};

const conteudoPorVariant = {
	padrao: {
		titulo: "Assistente virtual",
		mensagemInicial: "Olá! Como posso te ajudar hoje?",
		chamada: "",
	},
	home: {
		titulo: "Conheça a cultura Potiguara",
		mensagemInicial: "Faça perguntas sobre o povo Potiguara, sua história, cultura e artesanato.",
		chamada: "Pergunte sobre a cultura Potiguara",
	},
};

const MicButton = ({ variant = "padrao" }: MicButtonProps) => {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const perfilAssistente = resolverPerfilAssistente(location.pathname, id);
	const conteudo = conteudoPorVariant[variant];

	const [mensagens, setMensagens] = useState<MensagemChat[]>([
		{ id: "msg_inicial", texto: conteudo.mensagemInicial, autor: "bot" }
	]);

	useEffect(() => {
		if (!open) {
			setMensagens([
				{ id: "msg_inicial", texto: conteudo.mensagemInicial, autor: "bot" }
			]);
		}
	}, [open, conteudo.mensagemInicial]);

	const enviarParaAssistente = async (
		texto: string,
		imagem?: File | null,
		audio?: Blob | null,
	) => {
		const mensagemBotId = `msg_bot_${Date.now()}`;

		setMensagens((mensagensAtuais) => [
			...mensagensAtuais,
			{
				id: mensagemBotId,
				texto: "Preparando resposta...",
				autor: "bot",
				carregandoResposta: true,
			},
		]);

		try {
			const resposta = await ApiService.enviarAssistente({
				texto,
				imagem,
				audio,
				tipo_conta: perfilAssistente.tipo_conta,
				usuario_id: perfilAssistente.usuario_id,
				contexto: {
					origem: perfilAssistente.origem,
					tela: window.location.pathname,
				},
			});

			const mensagemResposta =
				resposta.mensagem || "Não consegui entender agora. Pode tentar de novo?";

			setMensagens((mensagensAtuais) =>
				mensagensAtuais.map((mensagem) =>
					mensagem.id === mensagemBotId
						? {
							...mensagem,
							texto: mensagemResposta,
							carregandoResposta: false,
							carregandoAudio: true,
							erroAudio: false,
							audioUrl: undefined,
							audioStatus: "gerando",
							audioErro: undefined,
						}
						: mensagem,
				),
			);

			try {
				const audio = await ApiService.gerarAudioResposta(mensagemResposta);
				console.log("[TTS] resposta backend:", audio);
				console.log("[TTS] audioUrl final:", audio.audio_url);
				const audioTocavelUrl = await ApiService.criarUrlAudioTocavel(audio.audio_url);
				console.log("[TTS] audioUrl tocável:", audioTocavelUrl);

				let audioStatus: "pronto" | "tocando" | "erro" = "pronto";
				let audioErro: string | undefined;
				try {
					await tocarAudioImediatamente(audioTocavelUrl);
					audioStatus = "tocando";
				} catch (error) {
					audioStatus = "erro";
					audioErro = "Não foi possível tocar o áudio agora. Tente novamente.";
					console.error("[TTS] erro ao tocar áudio:", error);
				}

				setMensagens((mensagensAtuais) =>
					mensagensAtuais.map((mensagem) =>
						mensagem.id === mensagemBotId
							? {
								...mensagem,
								audioUrl: audioTocavelUrl,
								carregandoResposta: false,
								carregandoAudio: false,
								erroAudio: false,
								audioStatus,
								audioErro,
							}
							: mensagem,
					),
				);
			} catch (error) {
				console.error("Erro ao gerar áudio da resposta:", error);
				setMensagens((mensagensAtuais) =>
					mensagensAtuais.map((mensagem) =>
						mensagem.id === mensagemBotId
							? {
								...mensagem,
								carregandoAudio: false,
								erroAudio: true,
								audioStatus: "erro",
								audioErro: "Não foi possível gerar áudio agora.",
							}
							: mensagem,
					),
				);
			}
		} catch (error) {
			const detalhe =
				error instanceof Error && error.message
					? ` Detalhe: ${error.message}`
					: "";
			setMensagens((mensagensAtuais) =>
				mensagensAtuais.map((mensagem) =>
					mensagem.id === mensagemBotId
						? {
							...mensagem,
							texto: `Não consegui falar com o assistente agora. Tente novamente em instantes.${detalhe}`,
							carregandoResposta: false,
							carregandoAudio: false,
						}
						: mensagem,
				),
			);
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
						<Flex alignItems="center" gap={3}>
							{variant === "home" && (
								<Box
									bgColor={CORES.BRANCO}
									color={CORES.PRETO}
									borderRadius="full"
									px={4}
									py={2}
									boxShadow="md"
									maxW="210px"
								>
									<Text fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight="bold" lineHeight={1.15}>
										{conteudo.chamada}
									</Text>
								</Box>
							)}
							<IconButton
								rounded={"full"}
								size={"2xl"}
								variant={"subtle"}
								bgColor={variant === "home" ? CORES.PRETO : CORES.VERMELHO_VIVO}
								boxShadow={"md"}
							>
								<Mic color={CORES.BRANCO} />
							</IconButton>
						</Flex>
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
									{conteudo.titulo}
								</Dialog.Title>
								{variant === "home" && (
									<Text color={CORES.CINZA_CLARO} fontSize={TAMANHO.TEXTO_PEQUENO} mt={1}>
										Pergunte por texto ou voz.
									</Text>
								)}
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

const tocarAudioImediatamente = async (audioUrl: string) => {
	if (!audioUrl) {
		throw new Error("Resposta de voz sem audio_url.");
	}

	console.log("[TTS] tentando tocar:", audioUrl);
	const audio = new Audio(audioUrl);
	audio.preload = "auto";
	await audio.play();
};

const resolverUsuarioIdArtesa = (id?: string) => {
	if (!id) return "01";
	if (id.length === 1 && /^\d$/.test(id)) return id.padStart(2, "0");
	return id;
};

const resolverPerfilAssistente = (pathname: string, id?: string) => {
	if (pathname.startsWith("/perfil/")) {
		return {
			tipo_conta: "ARTESA",
			usuario_id: resolverUsuarioIdArtesa(id),
			origem: "chatbot_perfil_artesa",
		};
	}

	return {
		tipo_conta: "CLIENTE",
		usuario_id: "cliente-demo",
		origem: "chatbot_cliente",
	};
};

export default MicButton;
