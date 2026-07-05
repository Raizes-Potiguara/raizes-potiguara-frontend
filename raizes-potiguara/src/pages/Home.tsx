import ArtesanatoAncestral from '@/components/home/ArtesanatoAncestral';
import Hero from '../components/home/Hero';
import SobreYbira from '../components/home/SobreYbira';
import SobrePovo from '@/components/home/SobrePovo';

const Home = () => {
  return (
    <>
      <Hero />
      <SobreYbira />
      <SobrePovo/>
      <ArtesanatoAncestral/>
    </>
  );
}

export default Home