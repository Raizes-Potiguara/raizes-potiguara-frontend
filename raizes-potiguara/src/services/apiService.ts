import { toaster } from "@/components/ui/toaster";

export class ApiService {
	private static readonly URL = "API_URL";

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

	private static handleError(error: Error) {
		console.error("Erro na ApiService:", error);
		toaster.create({
			title: "Erro de comunicação",
			description: error.message || "Não foi possível processar sua solicitação.",
			type: "error",
			duration: 5000,
		});
	}
}
