import PerfilArtesa from "@/components/perfil/PerfilArtesa";
import PerfilCliente from "@/components/perfil/PerfilCliente";
import PerfilFundacao from "@/components/perfil/PerfilFundacao";

const Perfil = () => {

  const tipoUserMock = 2; 
  //1 = cliente, 2 = artesã e 3 = fundação só por enquanto pra dividir as telas

  return (
    <>
      {
        tipoUserMock === 2 ?
          <PerfilCliente />
        : tipoUserMock === 2 ?
          <PerfilArtesa />
        :
          <PerfilFundacao />
      }
    </>
  );
};

export default Perfil;
