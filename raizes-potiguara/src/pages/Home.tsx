import ArtesanatoAncestral from '@/components/home/ArtesanatoAncestral';
import Hero from '../components/home/Hero';
import SobreYbira from '../components/home/SobreYbira';
import SobrePovo from '@/components/home/SobrePovo';
import SeloIndigena from '@/components/home/SeloIndigena';
import MicButton from '@/components/general/MicButton';

const Home = () => {
  return (
    <>
      <Hero />
      <SobreYbira />
      <SobrePovo/>
      <ArtesanatoAncestral/>
      <SeloIndigena/>
      <MicButton variant="home" />
    </>
  );
}

export default Home
