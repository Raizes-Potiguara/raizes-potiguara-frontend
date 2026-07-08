import { useRef, useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  Box,
  Textarea,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { ImagePlus, Mic, SendHorizonal, X } from "lucide-react";
import { CORES, RADIUS_PADRAO_CARD, TAMANHO } from "@/util/constants";
import type { MensagemChat } from "./Conversa";

interface InputsProps {
  setMensagens: Dispatch<SetStateAction<MensagemChat[]>>;
  onEnviarMensagem: (texto: string, imagem?: File | null, audio?: Blob | null) => Promise<void>;
}

const Inputs = ({ setMensagens, onEnviarMensagem }: InputsProps) => {
  const [mensagem, setMensagem] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState("");
  const imagemInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioStreamRef = useRef<MediaStream | null>(null);

  const usarMicrofone = mensagem.trim().length === 0;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMensagem(e.target.value);
  };

  const handleImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
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

  const limparImagem = () => {
    setImagem(null);
    setImagemPreview("");
    if (imagemInputRef.current) {
      imagemInputRef.current.value = "";
    }
  };

  const limparImagemEnviada = () => {
    setImagem(null);
    setImagemPreview("");
    if (imagemInputRef.current) {
      imagemInputRef.current.value = "";
    }
  };

  const enviarMensagem = async (audio?: Blob | null) => {
    const texto = mensagem.trim();
    if (!texto && !imagemPreview && !audio) return;
    const imagemEnviada = imagem;
    const textoExibido = texto || (audio ? "Áudio enviado" : "");

    setMensagens((mensagens) => [
      ...mensagens,
      {
        id: `msg_user_${Date.now()}`,
        texto: textoExibido,
        autor: "user",
        imagemUrl: imagemPreview || undefined,
      },
    ]);
    setMensagem("");
    setEnviando(true);
    limparImagemEnviada();

    try {
      await onEnviarMensagem(texto, imagemEnviada, audio);
    } finally {
      setEnviando(false);
    }
  };

  const adicionarErroMicrofone = (texto: string) => {
    setMensagens((mensagens) => [
      ...mensagens,
      {
        id: `msg_bot_mic_${Date.now()}`,
        texto,
        autor: "bot",
      },
    ]);
  };

  const iniciarGravacao = async () => {
    if (enviando || isRecording) return;

    if (!window.isSecureContext && window.location.hostname !== "localhost") {
      adicionarErroMicrofone(
        "O navegador bloqueou o microfone porque esta página está em HTTP. Para gravar áudio no celular, use HTTPS ou teste primeiro pelo computador em localhost.",
      );
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      adicionarErroMicrofone("Este navegador não liberou a gravação de áudio agora.");
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
        const audio = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        audioStreamRef.current?.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
        mediaRecorderRef.current = null;
        setIsRecording(false);

        if (audio.size > 0) {
          void enviarMensagem(audio);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      setIsRecording(false);
      const detalhe = error instanceof Error && error.message ? ` Detalhe: ${error.message}` : "";
      adicionarErroMicrofone(`Não consegui acessar o microfone. Verifique a permissão do navegador.${detalhe}`);
    }
  };

  const pararGravacao = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder?.state === "recording") {
      recorder.stop();
    }
  };

  return (
    <Flex px={2} gap={3} align="stretch" direction="column">
      {imagemPreview && (
        <Flex
          align="center"
          gap={2}
          bg={CORES.CREME + "/10"}
          borderRadius={RADIUS_PADRAO_CARD}
          p={2}
        >
          <Image
            src={imagemPreview}
            alt={imagem?.name || "Imagem anexada"}
            boxSize="44px"
            objectFit="cover"
            rounded="md"
          />
          <Box flex={1} minW={0}>
            <Text fontSize={TAMANHO.TEXTO_PEQUENO} color={CORES.BRANCO} truncate>
              {imagem?.name || "Imagem anexada"}
            </Text>
          </Box>
          <IconButton
            aria-label="Remover imagem anexada"
            size="sm"
            rounded="full"
            variant="ghost"
            color={CORES.BRANCO}
            onClick={limparImagem}
          >
            <X size={16} />
          </IconButton>
        </Flex>
      )}

      <Flex gap={3} align="center">
        <Textarea
          value={isRecording ? "Gravando..." : mensagem}
          onChange={handleChange}
          fontSize={TAMANHO.TEXTO_PEQUENO}
          placeholder="Digite ou fale aqui..."
          bg={CORES.CREME+"/5"}
          borderRadius={RADIUS_PADRAO_CARD}
          resize="none"
          maxH="16vh"
          overflowY="auto"
          border={"none"}
          disabled={isRecording}
          cursor={isRecording ? "not-allowed" : "text"}
          alignContent={"center"}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 200) + "px";
          }}
        />

        <input
          ref={imagemInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImagemChange}
        />

        <IconButton
          rounded="full"
          size={"xl"}
          aria-label="Anexar imagem"
          bgColor={CORES.CREME + "/10"}
          color={CORES.BRANCO}
          onClick={() => imagemInputRef.current?.click()}
        >
          <ImagePlus />
        </IconButton>

        <IconButton
          rounded="full"
          size={"xl"}
          aria-label={usarMicrofone ? "Usar microfone" : "Enviar mensagem"}
          bgColor={CORES.VERMELHO_MEDIO}
          color={CORES.BRANCO}
          disabled={enviando}
          transform={isRecording ? "scale(1.2)" : "scale(1)"}
          transition="all 0.2s ease"
          animation={isRecording ?"pulse":"none"}
          onClick={() => {
            if (!usarMicrofone && !enviando) {
              enviarMensagem();
              return;
            }

            if (isRecording) {
              pararGravacao();
              return;
            }

            void iniciarGravacao();
          }}
        >
          {usarMicrofone ? <Mic /> : <SendHorizonal />}
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Inputs;
