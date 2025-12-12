import Navbar from "../component/Navbar";
import HeroSection from "../component/HeroSection";
import BreedSection from "../component/BreedSection";
import PetProducts from "../component/PetProducts";
import BlogSection from "../component/BlogSection";
import Footer from "../component/footer";
import NewsletterSection from "../component/NewsletterSection";

export default function Home() {
  return (
    <>
    <Navbar />
      <HeroSection />
      <BreedSection />
      <PetProducts />
      <BlogSection />
      <NewsletterSection />

      {/* Your existing "Get Pawstore" section stays here */}

      <Footer />
    </>
  );
}
