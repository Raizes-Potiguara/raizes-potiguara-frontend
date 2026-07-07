import { toaster } from "@/components/ui/toaster";

const viteEnv = import.meta as ImportMeta & {
	env?: Record<string, string | undefined>;
};

export interface CadastrarArtesaAdminPayload {
	tipo_conta: string;
	nome: string;
	data_nascimento: string;
	cpf: string;
	aldeia: string;
	telefone: string;
	chave_pix: string;
	email?: string;
	senha: string;
}

export interface CadastrarArtesaAdminResponse {
	status: "sucesso" | "erro" | "nao_permitido";
	mensagem: string;
	artesa?: {
		id: string;
		nome: string;
		aldeia: string;
		telefone: string;
		email?: string | null;
		chave_pix: string;
		tipo_conta: string;
	} | null;
	acao_bloqueada?: string | null;
	tipo_conta?: string | null;
}

export interface ArtesaAdminListItem {
	id: number;
	uuid?: string | null;
	nome: string;
	aldeia?: string | null;
	foto_url?: string | null;
	tipo_conta?: string;
}

export interface ProdutoComercializacaoItem {
	id: number;
	uuid?: string | null;
	artesa_id: number;
	nome: string;
	nome_potiguar?: string | null;
	descricao: string;
	preco: string | number;
	quantidade_estoque: number;
	imagem_url?: string | null;
	foto_url?: string | null;
	tags: string[];
}

export interface AssistentePayload {
	texto: string;
	tipo_conta: string;
	usuario_id: string;
	imagem?: File | null;
	audio?: Blob | null;
	contexto?: Record<string, unknown>;
}

export interface AssistenteResponse {
	status?: string;
	tipo_fluxo?: string;
	mensagem?: string;
	[key: string]: unknown;
}

export interface VozRespostaResponse {
	status: string;
	audio_url: string;
	mime_type: string;
	modelo: string;
}

export class ApiService {
	private static readonly URL = "API_URL";
	private static readonly API_BASE_URL = (
		viteEnv.env?.VITE_API_BASE_URL || "http://localhost:8000/api/v1"
	).replace(/\/$/, "");
	private static readonly BACKEND_BASE_URL = this.API_BASE_URL.replace(/\/api\/v1$/, "");

	static async request<T>(action: string, dados: any = {}, arquivo?: File | null): Promise<T> {
		const formData = new FormData();

		formData.append("payload", JSON.stringify({ action, ...dados }));

		if (arquivo) {
			formData.append("file", arquivo);
		}

		try {
			const response = await fetch(this.URL, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Erro inesperado na comunicação");
			}

			return data as T;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async cadastrarArtesaAdmin(
		dados: CadastrarArtesaAdminPayload,
	): Promise<CadastrarArtesaAdminResponse> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/admin/artesas`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dados),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.detail || "Erro inesperado na comunicação");
			}

			return data as CadastrarArtesaAdminResponse;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async listarArtesasAdmin(): Promise<ArtesaAdminListItem[]> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/comercializacao/artesas`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.detail || "Erro inesperado na comunicação");
			}

			return data as ArtesaAdminListItem[];
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async enviarAssistente(dados: AssistentePayload): Promise<AssistenteResponse> {
		const formData = new FormData();

		formData.append("texto", dados.texto);
		formData.append("tipo_conta", dados.tipo_conta);
		formData.append("usuario_id", dados.usuario_id);

		if (dados.imagem) {
			formData.append("imagem", dados.imagem);
		}

		if (dados.audio) {
			formData.append("audio", dados.audio, "fala.webm");
		}

		if (dados.contexto) {
			formData.append("contexto", JSON.stringify(dados.contexto));
		}

		try {
			const response = await fetch(`${this.API_BASE_URL}/assistente`, {
				method: "POST",
				body: formData,
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.detail || "Erro inesperado na comunicação");
			}

			return data as AssistenteResponse;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async gerarAudioResposta(texto: string): Promise<VozRespostaResponse> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/voz/resposta`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ texto }),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.detail?.message || "Erro ao gerar áudio.");
			}

			return {
				...data,
				audio_url: this.montarUrlBackend(data.audio_url),
			} as VozRespostaResponse;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async listarProdutosComercializacao(): Promise<ProdutoComercializacaoItem[]> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/comercializacao/produtos`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || data.detail || "Erro ao buscar produtos.");
			}

			return data as ProdutoComercializacaoItem[];
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	private static handleError(error: Error) {
		console.error("Erro na ApiService:", error);
		toaster.create({
			title: "Erro de comunicação",
			description: error.message || "Não foi possível processar sua solicitação.",
			type: "error",
			duration: 5000,
		});
	}

	static montarUrlBackend(url: string) {
		if (url.startsWith("http://") || url.startsWith("https://")) {
			return url;
		}

		return `${this.BACKEND_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
	}
}
