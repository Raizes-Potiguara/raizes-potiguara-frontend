import { TAMANHO, CORES } from "@/util/constants";
import { Badge, Box, Card, Flex, HStack, Image, Button, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router";

interface ProdutoCardProps {
	dadosProduto: {
		id: string | number;
		nome: string;
		foto_url?: string;
		tags?: string[];
	};
}

const ProdutoCard = ({ dadosProduto }: ProdutoCardProps) => {
	const navigate = useNavigate();

	return (
		<>
			<Card.Root
				flexDirection="row"
				boxShadow={"sm"}
				bgColor={"white/40"}
				overflow="hidden"
				w={"full"}
				h={"20vh"}
				alignItems={"center"}
				border={0}
			>
				{dadosProduto.foto_url ? (
					<Image
						src={dadosProduto.foto_url}
						alt={dadosProduto.nome}
						objectFit="cover"
						alignSelf={"stretch"}
						w={"30vw"}
						borderRightRadius={0}
					/>
				) : (
					<Skeleton
						alignSelf={"stretch"}
						w={"30vw"}
						borderRightRadius={0}
					/>
				)}

				<Box flex={1}>
					<Card.Body p={4}>
						<Card.Title
							fontSize={TAMANHO.TEXTO_GRANDE}
							whiteSpace="nowrap"
							overflow="hidden"
							textOverflow="ellipsis"
						>
							{dadosProduto.nome}
						</Card.Title>

						<Flex flexDir={"column"} mt={1} gap={3}>
							<HStack flexWrap="wrap">
								{dadosProduto.tags && dadosProduto.tags.length > 0 ? (
									dadosProduto.tags.map((tag, index) => (
										<Badge key={index} bgColor={CORES.VERMELHO_CLARINHO}>
											{tag}
										</Badge>
									))
								) : (
									<Badge bgColor={CORES.CINZA_CLARO} color={CORES.CINZA_ESCURO}>
										Sem tags
									</Badge>
								)}
							</HStack>

							<Button
								rounded={"full"}
								boxShadow={"sm"}
								variant={"outline"}
								color={CORES.CINZA_ESCURO}
								borderColor={CORES.CINZA_CLARO}
								alignSelf="flex-start"
								onClick={() => navigate(`${dadosProduto.id}`)}
							>
								Editar
							</Button>
						</Flex>
					</Card.Body>
				</Box>
			</Card.Root>
		</>
	);
};

export default ProdutoCard;
