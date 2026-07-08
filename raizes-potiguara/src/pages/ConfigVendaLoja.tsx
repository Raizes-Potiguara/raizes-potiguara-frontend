import MicButton from "@/components/general/MicButton";
import { ApiService, type ProdutoComercializacaoItem } from "@/services/apiService";
import { CORES, TAMANHO } from "@/util/constants";
import {
	Badge,
	Box,
	Card,
	Flex,
	Icon,
	IconButton,
	Image,
	Spinner,
	Stat,
	Text,
} from "@chakra-ui/react";
import { ArrowLeft, Package, ShoppingBag, Store } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

type ProdutoLojaTalita = ProdutoComercializacaoItem & {
	vendidos: number;
};

const ARTESA_TALITA_ID = 1;

const formatarMoeda = (valor: string | number) =>
	new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(Number(valor || 0));

const montarImagem = (produto: ProdutoComercializacaoItem) => {
	const imagem = produto.foto_url || produto.imagem_url;
	if (!imagem || imagem.startsWith("upload://")) return "";
	return ApiService.montarUrlBackend(imagem);
};

const ConfigVendaLoja = () => {
	const navigate = useNavigate();
	const [produtos, setProdutos] = useState<ProdutoLojaTalita[]>([]);
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		const carregarLoja = async () => {
			try {
				const [produtosBackend, pedidosTalita] = await Promise.all([
					ApiService.listarProdutosComercializacao(),
					ApiService.listarPedidosTalita(),
				]);

				const vendidosPorProduto = new Map<number, number>();
				pedidosTalita.forEach((pedido) => {
					pedido.itens.forEach((item) => {
						vendidosPorProduto.set(
							item.produto_id,
							(vendidosPorProduto.get(item.produto_id) || 0) + item.quantidade,
						);
					});
				});

				setProdutos(
					produtosBackend
						.filter((produto) => produto.artesa_id === ARTESA_TALITA_ID)
						.map((produto) => ({
							...produto,
							vendidos: vendidosPorProduto.get(produto.id) || 0,
						})),
				);
			} finally {
				setCarregando(false);
			}
		};

		carregarLoja();
	}, []);

	const totais = useMemo(
		() => ({
			produtos: produtos.length,
			estoque: produtos.reduce((total, produto) => total + produto.quantidade_estoque, 0),
			vendidos: produtos.reduce((total, produto) => total + produto.vendidos, 0),
		}),
		[produtos],
	);

	return (
		<>
			<Box>
				<Card.Root m={0} p={0} mt={8} borderTopRadius={24} borderBottomRadius={0}>
					<Card.Body m={0} p={0} borderTopRadius={24} borderBottomRadius={0} bgColor={CORES.BRANCO}>
						<Box p={8} color={CORES.CINZA_ESCURO}>
							<Flex mb={8} alignItems="center" justifyContent="space-between">
								<Text
									color={CORES.PRETO}
									className="hashira"
									lineHeight={1.1}
									fontWeight="bold"
									fontSize={TAMANHO.TITULO_SECAO}
								>
									Minha <br /> Loja
								</Text>
								<IconButton
									bgColor={CORES.PRETO}
									color={CORES.BRANCO}
									size="xl"
									boxShadow="md"
									rounded="full"
									onClick={() => navigate("/perfil/1/config")}
								>
									<ArrowLeft />
								</IconButton>
							</Flex>

							<Flex gap={3} mb={8}>
								<ResumoLoja label="Peças" valor={totais.produtos} icon={<Store />} />
								<ResumoLoja label="Estoque" valor={totais.estoque} icon={<Package />} />
								<ResumoLoja label="Vendidas" valor={totais.vendidos} icon={<ShoppingBag />} />
							</Flex>

							<Flex flexDir="column" gap={4}>
								<Text color={CORES.PRETO} fontWeight="bold" fontSize={TAMANHO.TITULO_SUBSECAO}>
									Produtos cadastrados
								</Text>

								{carregando ? (
									<Flex justifyContent="center" py={10}>
										<Spinner color={CORES.VERMELHO_MEDIO} />
									</Flex>
								) : produtos.length > 0 ? (
									produtos.map((produto) => (
										<ProdutoLojaCard key={produto.id} produto={produto} />
									))
								) : (
									<Text color={CORES.CINZA_ESCURO} textAlign="center" mt={4}>
										Talita ainda não possui peças cadastradas na loja.
									</Text>
								)}
							</Flex>
						</Box>
					</Card.Body>
				</Card.Root>
			</Box>
			<MicButton />
		</>
	);
};

const ResumoLoja = ({
	label,
	valor,
	icon,
}: {
	label: string;
	valor: number;
	icon: React.ReactNode;
}) => (
	<Stat.Root
		p={3}
		rounded="md"
		bgColor={CORES.VERMELHO_CLARINHO}
		color={CORES.CINZA_ESCURO}
		boxShadow="sm"
		border={0}
		flex={1}
		minW={0}
	>
		<Flex alignItems="center" justifyContent="space-between" gap={2}>
			<Stat.Label fontSize={TAMANHO.TEXTO_PEQUENO}>{label}</Stat.Label>
			<Icon color="fg.muted">{icon}</Icon>
		</Flex>
		<Stat.ValueText fontWeight="black">{valor}</Stat.ValueText>
	</Stat.Root>
);

const ProdutoLojaCard = ({ produto }: { produto: ProdutoLojaTalita }) => {
	const imagem = montarImagem(produto);

	return (
		<Card.Root
			flexDirection="row"
			boxShadow="sm"
			bgColor="white/40"
			overflow="hidden"
			w="full"
			minH="148px"
			alignItems="stretch"
			color={CORES.CINZA_ESCURO}
			border={0}
		>
			{imagem ? (
				<Image
					src={imagem}
					alt={produto.nome}
					objectFit="cover"
					w="32%"
					minW="104px"
				/>
			) : (
				<Flex
					w="32%"
					minW="104px"
					bgColor={CORES.CINZA_CLARINHO}
					alignItems="center"
					justifyContent="center"
					textAlign="center"
					px={3}
				>
					<Text color={CORES.CINZA_ESCURO} fontSize={TAMANHO.TEXTO_PEQUENO} fontWeight="bold">
						foto não adicionada
					</Text>
				</Flex>
			)}

			<Card.Body p={4} gap={3}>
				<Box>
					<Card.Title
						fontSize={TAMANHO.TEXTO_GRANDE}
						color={CORES.PRETO}
						lineHeight={1.1}
					>
						{produto.nome}
					</Card.Title>
					<Text fontSize={TAMANHO.TEXTO_PEQUENO} color={CORES.CINZA_ESCURO} mt={1}>
						{formatarMoeda(produto.preco)}
					</Text>
				</Box>

				<Flex gap={2} flexWrap="wrap">
					<Badge bgColor={CORES.VERMELHO_CLARINHO} color={CORES.CINZA_ESCURO}>
						Estoque: {produto.quantidade_estoque}
					</Badge>
					<Badge bgColor={CORES.CINZA_CLARINHO} color={CORES.CINZA_ESCURO}>
						Vendidas: {produto.vendidos}
					</Badge>
				</Flex>

				<Text
					fontSize={TAMANHO.TEXTO_PEQUENO}
					color={CORES.CINZA_ESCURO}
					lineClamp={2}
				>
					{produto.descricao}
				</Text>
			</Card.Body>
		</Card.Root>
	);
};

export default ConfigVendaLoja;
