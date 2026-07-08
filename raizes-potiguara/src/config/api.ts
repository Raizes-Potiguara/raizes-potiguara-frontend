const viteEnv = import.meta.env as Record<string, string | undefined>;

const resolverApiBaseUrl = () => {
	const apiUrl = viteEnv.VITE_API_BASE_URL;
	if (apiUrl) return apiUrl;

	if (typeof window !== "undefined" && window.location.hostname) {
		return `${window.location.protocol}//${window.location.hostname}:8000/api/v1`;
	}

	return "http://localhost:8000/api/v1";
};

export const API_BASE_URL = resolverApiBaseUrl().replace(/\/+$/, "");

export const getBackendOrigin = () => API_BASE_URL.replace(/\/api\/v1\/?$/, "");
export const BACKEND_BASE_URL = getBackendOrigin();

export const apiUrl = (path: string) => {
	const cleanPath = path.replace(/^\/+/, "");
	return `${API_BASE_URL}/${cleanPath}`;
};

export const resolveBackendAssetUrl = (url: string) => {
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://")) {
		return url;
	}

	const cleanPath = url.startsWith("/") ? url : `/${url}`;
	return `${getBackendOrigin()}${cleanPath}`;
};

export const NGROK_HEADERS = {
	"ngrok-skip-browser-warning": "true",
};

if (import.meta.env.DEV) {
	console.log("API_BASE_URL:", API_BASE_URL);
}

console.log("[Ybira Front] build com correção de áudio ativo", { API_BASE_URL });
