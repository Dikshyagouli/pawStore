import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BreedSection from "../components/BreedSection";
import PetProducts from "../components/PetProducts";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
  return (
    <>
    <Navbar />
      <HeroSection />
      <BreedSection />
      <PetProducts />
      <BlogSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
