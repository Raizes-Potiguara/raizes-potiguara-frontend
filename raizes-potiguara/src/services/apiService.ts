import { toaster } from "@/components/ui/toaster";
import { apiUrl, BACKEND_BASE_URL, NGROK_HEADERS } from "@/config/api";

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

export interface PedidoComercializacaoItem {
	id: number;
	nome_comprador: string;
	contato_comprador?: string | null;
	observacao?: string | null;
	valor_total: string | number;
	status: string;
	itens: {
		id: number;
		produto_id: number;
		quantidade: number;
		preco_unitario: string | number;
		subtotal: string | number;
	}[];
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

export interface TesteConexaoBackend {
	ok: boolean;
	url: string;
	status?: number;
	mensagem: string;
	detalhe?: string;
}

export class ApiService {
	private static readonly REQUEST_TIMEOUT_MS = 90000;

	static async request<T>(action: string, dados: any = {}, arquivo?: File | null): Promise<T> {
		console.warn("ApiService.request legado chamado sem endpoint real.", { action, dados, arquivo });
		throw new Error("Esta ação ainda não possui endpoint integrado ao backend.");
	}

	static async cadastrarArtesaAdmin(
		dados: CadastrarArtesaAdminPayload,
	): Promise<CadastrarArtesaAdminResponse> {
		try {
			const response = await this.fetchComTimeout(apiUrl("/admin/artesas"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...NGROK_HEADERS,
				},
				body: JSON.stringify(dados),
			});

			if (!response.ok) {
				await this.lancarErroHttp(response);
			}

			const data = await response.json();
			return data as CadastrarArtesaAdminResponse;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async listarArtesasAdmin(): Promise<ArtesaAdminListItem[]> {
		try {
			const response = await this.fetchComTimeout(apiUrl("/comercializacao/artesas"), {
				headers: NGROK_HEADERS,
			});

			if (!response.ok) {
				await this.lancarErroHttp(response);
			}

			const data = await response.json();
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
			const response = await this.fetchComTimeout(apiUrl("/assistente"), {
				method: "POST",
				headers: NGROK_HEADERS,
				body: formData,
			});

			if (!response.ok) {
				await this.lancarErroHttp(response);
			}

			const data = await response.json();
			return data as AssistenteResponse;
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async gerarAudioResposta(texto: string): Promise<VozRespostaResponse> {
		try {
			const response = await this.fetchComTimeout(apiUrl("/voz/resposta"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...NGROK_HEADERS,
				},
				body: JSON.stringify({ texto }),
			});

			if (!response.ok) {
				await this.lancarErroHttp(response);
			}

			const data = await response.json();
			if (!data.audio_url) {
				throw new Error("O backend não retornou a URL do áudio.");
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
			const response = await this.fetchComTimeout(apiUrl("/comercializacao/produtos"), {
				headers: NGROK_HEADERS,
			});

			if (!response.ok) {
				await this.lancarErroHttp(response);
			}

			const data = await response.json();
			return data as ProdutoComercializacaoItem[];
		} catch (error: any) {
			this.handleError(error);
			throw error;
		}
	}

	static async listarPedidosTalita(): Promise<PedidoComercializacaoItem[]> {
		try {
			const response = await this.fetchComTimeout(apiUrl("/comercializacao/pedidos/talita"), {
				headers: NGROK_HEADERS,
			});

			if (!response.ok) {
				await this.lancarErroHttp(response);
			}

			const data = await response.json();
			return data as PedidoComercializacaoItem[];
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

		return `${BACKEND_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
	}

	static async testarConexaoBackend(): Promise<TesteConexaoBackend> {
		const url = apiUrl("/health");
		try {
			const response = await this.fetchComTimeout(url, {
				headers: NGROK_HEADERS,
			}, 15000);
			const detalhe = await response.text();

			return {
				ok: response.ok,
				url,
				status: response.status,
				mensagem: response.ok
					? "Backend conectado com sucesso."
					: "Não foi possível conectar ao backend.",
				detalhe,
			};
		} catch (error) {
			const mensagem = error instanceof Error ? error.message : "Erro desconhecido.";
			console.error("Erro ao chamar backend:", error);
			return {
				ok: false,
				url,
				mensagem: "Não foi possível conectar ao backend.",
				detalhe: mensagem,
			};
		}
	}

	private static async fetchComTimeout(
		input: RequestInfo | URL,
		init: RequestInit = {},
		timeoutMs = this.REQUEST_TIMEOUT_MS,
	) {
		const controller = new AbortController();
		const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

		try {
			return await fetch(input, {
				...init,
				signal: controller.signal,
			});
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				throw new Error("O backend demorou para responder. Tente novamente em instantes.");
			}
			throw error;
		} finally {
			window.clearTimeout(timeout);
		}
	}

	private static async lancarErroHttp(response: Response): Promise<never> {
		const text = await response.text();
		throw new Error(`Erro ${response.status}: ${text || response.statusText}`);
	}
}
