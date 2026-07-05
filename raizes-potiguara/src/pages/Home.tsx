// src/pages/Home/index.tsx
import ArtesanatoAncestral from '@/components/home/ArtesanatoAncestral';
import Hero from '../components/home/Hero';
import SobreYbira from '../components/home/SobreYbira';

const Home = () => {
  return (
    <>
      <Hero />
      <SobreYbira />
      <ArtesanatoAncestral/>
    </>
  );
}

export default Home