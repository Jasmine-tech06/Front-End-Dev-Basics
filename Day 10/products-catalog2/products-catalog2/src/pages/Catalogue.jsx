import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import FeaturedCollections from "../components/FeaturedCollections";
import ProductCatalogue from "../components/ProductCatalogue";
import BestSellers from "../components/BestSellers";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Catalogue = ({ onCheckout }) => {
  return (
    <div className="page">

      <Navbar onCheckout={onCheckout} />

      <Hero />

      <WhyChoose />

      <FeaturedCollections />

      <ProductCatalogue />

      <BestSellers />

      <Gallery />

      <Testimonials />

      <Newsletter />

      <Footer />

    </div>
  );
};

export default Catalogue;