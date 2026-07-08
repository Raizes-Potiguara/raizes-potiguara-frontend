import { toaster } from "@/components/ui/toaster";
import { ApiService } from "@/services/apiService";
import { CORES, TAMANHO } from "@/util/constants";
import {
	Box,
	Button,
	Card,
	Center,
	Flex,
	IconButton,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ArrowLeft, Camera, CheckCircle2, ImagePlus, Mic, RefreshCw, SendHorizonal, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";

const ConfigVendaProduto = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id?: string }>();
	const perfilId = id || "1";

	const [imagem, setImagem] = useState<File | null>(null);
	const [imagemPreview, setImagemPreview] = useState("");
	const [audio, setAudio] = useState<Blob | null>(null);
	const [audioPreviewUrl, setAudioPreviewUrl] = useState("");
	const [gravando, setGravando] = useState(false);
	const [enviando, setEnviando] = useState(false);

	const imagemInputRef = useRef<HTMLInputElement>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const audioStreamRef = useRef<MediaStream | null>(null);
	const audioPreviewUrlRef = useRef("");

	useEffect(() => {
		return () => {
			audioStreamRef.current?.getTracks().forEach((track) => track.stop());

			if (audioPreviewUrlRef.current) {
				URL.revokeObjectURL(audioPreviewUrlRef.current);
			}
		};
	}, []);

	const definirAudioPreviewUrl = (url: string) => {
		if (audioPreviewUrlRef.current) {
			URL.revokeObjectURL(audioPreviewUrlRef.current);
		}

		audioPreviewUrlRef.current = url;
		setAudioPreviewUrl(url);
	};

	const handleImagemChange = (event: ChangeEvent<HTMLInputElement>) => {
		const arquivo = event.target.files?.[0];
		if (!arquivo) return;

		setImagem(arquivo);

		const leitor = new FileReader();
		leitor.onload = () => {
			if (typeof leitor.result === "string") {
				setImagemPreview(leitor.result);
			}
		};
		leitor.readAsDataURL(arquivo);
	};

	const iniciarGravacao = async () => {
		if (gravando || enviando) return;

		if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
			toaster.create({
				title: "Microfone indisponível",
				description: "Este navegador não permitiu gravar áudio agora.",
				type: "error",
				duration: 4000,
			});
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
			const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

			audioChunksRef.current = [];
			audioStreamRef.current = stream;
			mediaRecorderRef.current = recorder;

			recorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data);
				}
			};

			recorder.onstop = () => {
				const audioGravado = new Blob(audioChunksRef.current, {
					type: recorder.mimeType || "audio/webm",
				});

				audioStreamRef.current?.getTracks().forEach((track) => track.stop());
				audioStreamRef.current = null;
				mediaRecorderRef.current = null;
				setGravando(false);

				if (audioGravado.size === 0) {
					toaster.create({
						title: "Áudio vazio",
						description: "Grave novamente descrevendo a peça.",
						type: "error",
						duration: 3000,
					});
					return;
				}

				setAudio(audioGravado);
				definirAudioPreviewUrl(URL.createObjectURL(audioGravado));
			};

			recorder.start();
			setGravando(true);
		} catch {
			setGravando(false);
			toaster.create({
				title: "Permissão de microfone",
				description: "Autorize o uso do microfone para gravar a descrição da peça.",
				type: "error",
				duration: 4000,
			});
		}
	};

	const pararGravacao = () => {
		const recorder = mediaRecorderRef.current;
		if (recorder?.state === "recording") {
			recorder.stop();
		}
	};

	const limparAudio = () => {
		setAudio(null);
		definirAudioPreviewUrl("");
	};

	const enviarPeca = async () => {
		if (!imagem) {
			toaster.create({
				title: "Foto obrigatória",
				description: "Tire ou selecione uma foto da peça para continuar.",
				type: "error",
				duration: 3500,
			});
			return;
		}

		if (!audio) {
			toaster.create({
				title: "Áudio obrigatório",
				description: "Grave um áudio dizendo o que é a peça e quantas unidades existem.",
				type: "error",
				duration: 3500,
			});
			return;
		}

		try {
			setEnviando(true);
			const resposta = await ApiService.enviarAssistente({
				texto: "",
				imagem,
				audio,
				tipo_conta: "ARTESA",
				usuario_id: resolverUsuarioIdArtesa(perfilId),
				contexto: {
					origem: "nova_peca",
					tela: window.location.pathname,
					fluxo: "cadastro_produto_audio_imagem",
				},
			});

			if (resposta.status === "erro" || resposta.status === "nao_permitido") {
				toaster.create({
					title: "Não foi possível cadastrar",
					description: resposta.mensagem || "Tente novamente em instantes.",
					type: "error",
					duration: 4500,
				});
				return;
			}

			toaster.create({
				title: "Peça enviada",
				description: resposta.mensagem || "A peça foi enviada para cadastro.",
				type: "success",
				duration: 4500,
			});

			navigate(`/perfil/${perfilId}/config`);
		} catch {
			// O ApiService já exibe o erro de comunicação no toaster.
		} finally {
			setEnviando(false);
		}
	};

	return (
		<Box color={CORES.PRETO}>
			<Card.Root
				m={0}
				p={0}
				mt={8}
				borderTopRadius={24}
				borderWidth={0}
				borderBottomRadius={0}
			>
				<Card.Body
					m={0}
					p={0}
					borderTopRadius={24}
					borderWidth={0}
					borderBottomRadius={0}
					overflow="hidden"
					bgColor={CORES.BRANCO}
					minH="calc(100vh - 32px)"
				>
					<Box p={{ base: 6, md: 8 }} color={CORES.CINZA_ESCURO}>
						<Flex mb={8} alignItems="center" justifyContent="space-between" gap={4}>
							<Text
								color={CORES.PRETO}
								className="hashira"
								lineHeight={1.1}
								fontWeight="bold"
								fontSize={TAMANHO.TITULO_SECAO}
							>
								Nova Peça
							</Text>

							<IconButton
								aria-label="Voltar"
								bgColor={CORES.PRETO}
								color={CORES.BRANCO}
								size="xl"
								boxShadow="md"
								rounded="full"
								onClick={() => navigate(`/perfil/${perfilId}/config`)}
							>
								<ArrowLeft />
							</IconButton>
						</Flex>

						<VStack align="stretch" gap={6}>
							<Box>
								<Text color={CORES.PRETO} fontWeight="bold" fontSize={TAMANHO.CORPO_TEXTO}>
									1. Tire uma foto da peça
								</Text>
								<Text mt={1} fontSize={TAMANHO.TEXTO_PEQUENO} lineHeight={1.35}>
									Use boa luz, deixe a peça inteira aparecer e evite fundo muito bagunçado.
								</Text>

								<input
									ref={imagemInputRef}
									type="file"
									accept="image/*"
									capture="environment"
									hidden
									onChange={handleImagemChange}
								/>

								<Center
									mt={4}
									minH={{ base: "240px", md: "320px" }}
									aspectRatio={1}
									borderWidth={imagemPreview ? 0 : "1px"}
									borderStyle="dashed"
									borderColor={CORES.CINZA_CLARO}
									bgColor={CORES.VERMELHO_CLARINHO}
									rounded="2xl"
									overflow="hidden"
									position="relative"
								>
									{imagemPreview ? (
										<Image
											src={imagemPreview}
											alt={imagem?.name || "Foto da peça"}
											w="full"
											h="full"
											objectFit="cover"
										/>
									) : (
										<VStack gap={3} textAlign="center" px={5}>
											<ImagePlus size={44} strokeWidth={1.4} color={CORES.MARROM} />
											<Text fontWeight="bold" color={CORES.PRETO}>
												Nenhuma foto adicionada
											</Text>
										</VStack>
									)}
								</Center>

								<Button
									mt={4}
									w="full"
									bgColor={CORES.PRETO}
									color={CORES.BRANCO}
									rounded="full"
									fontSize={TAMANHO.TEXTO_BOTAO}
									onClick={() => imagemInputRef.current?.click()}
								>
									<Camera size={18} />
									{imagem ? "Trocar foto" : "Abrir câmera"}
								</Button>
							</Box>

							<Box>
								<Text color={CORES.PRETO} fontWeight="bold" fontSize={TAMANHO.CORPO_TEXTO}>
									2. Grave um áudio descrevendo
								</Text>
								<Text mt={1} fontSize={TAMANHO.TEXTO_PEQUENO} lineHeight={1.35}>
									Diga o nome da peça, a quantidade pronta, os materiais e o preço, se já souber.
								</Text>

								<Flex
									mt={4}
									p={4}
									gap={4}
									align="center"
									bgColor={CORES.VERMELHO_CLARINHO}
									rounded="2xl"
								>
									<IconButton
										aria-label={gravando ? "Parar gravação" : "Gravar áudio"}
										size="xl"
										rounded="full"
										bgColor={gravando ? CORES.PRETO : CORES.VERMELHO_VIVO}
										color={CORES.BRANCO}
										disabled={enviando}
										onClick={gravando ? pararGravacao : iniciarGravacao}
									>
										{gravando ? <Square size={20} /> : <Mic size={22} />}
									</IconButton>

									<Box flex={1} minW={0}>
										<Text color={CORES.PRETO} fontWeight="bold">
											{gravando ? "Gravando..." : audio ? "Áudio gravado" : "Toque para gravar"}
										</Text>
										<Text fontSize={TAMANHO.TEXTO_PEQUENO}>
											{gravando
												? "Toque no botão novamente quando terminar."
												: audio
													? "Você pode ouvir ou gravar outra vez."
													: "Fale de forma calma, como se estivesse explicando para uma cliente."}
										</Text>
									</Box>

									{audio && !gravando && (
										<IconButton
											aria-label="Gravar novamente"
											size="sm"
											rounded="full"
											variant="ghost"
											color={CORES.PRETO}
											onClick={limparAudio}
										>
											<RefreshCw size={18} />
										</IconButton>
									)}
								</Flex>

								{audioPreviewUrl && (
									<audio
										controls
										src={audioPreviewUrl}
										style={{ width: "100%", marginTop: 12 }}
									/>
								)}
							</Box>

							<Button
								onClick={enviarPeca}
								disabled={!imagem || !audio || gravando}
								loading={enviando}
								fontSize={TAMANHO.TEXTO_BOTAO}
								mt={2}
								boxShadow="sm"
								w="full"
								bgColor={CORES.VERMELHO_MEDIO}
								color={CORES.BRANCO}
								rounded="full"
							>
								{enviando ? (
									"Enviando peça..."
								) : (
									<>
										<SendHorizonal size={18} />
										Cadastrar peça
									</>
								)}
							</Button>

							<Flex align="center" gap={2} color={CORES.CINZA_ESCURO}>
								<CheckCircle2 size={16} />
								<Text fontSize={TAMANHO.TEXTO_PEQUENO}>
									A descrição, preço e estoque serão organizados pelo assistente a partir da foto e do áudio.
								</Text>
							</Flex>
						</VStack>
					</Box>
				</Card.Body>
			</Card.Root>
		</Box>
	);
};

const resolverUsuarioIdArtesa = (id?: string) => {
	if (!id) return "01";
	if (id.length === 1 && /^\d$/.test(id)) return id.padStart(2, "0");
	return id;
};

export default ConfigVendaProduto;
