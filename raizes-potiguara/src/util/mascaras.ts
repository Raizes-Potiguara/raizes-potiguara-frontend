export const aplicarMascaraCnpj = (valorBruto: string): string => {
	let valor = valorBruto.replace(/\D/g, "");
	valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
	valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
	valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
	valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
	return valor.substring(0, 18);
};

export const aplicarMascaraTelefone = (valorBruto: string): string => {
	let valor = valorBruto.replace(/\D/g, "");
	valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
	valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
	return valor.substring(0, 15);
};

export const aplicarMascaraCpf = (valorBruto: string): string => {
	let valor = valorBruto.replace(/\D/g, "");
	valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
	valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
	valor = valor.replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
	return valor.substring(0, 14);
};
