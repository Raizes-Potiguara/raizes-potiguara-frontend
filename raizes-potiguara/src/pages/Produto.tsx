import { useParams } from 'react-router';
import ProdutoSecao from '@/components/produto/ProdutoSecao';

const ProdutoPage = () => {
  const { idp } = useParams<{ idp: string }>();

  if (!idp) return null;

  return <ProdutoSecao produtoId={idp} />;
};

export default ProdutoPage;