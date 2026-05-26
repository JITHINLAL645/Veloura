import Navbar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";

import HeroSection from "../../components/User/About/HeroSection";
import AboutContent from "../../components/User/About/AboutContent";
import PhilosophySection from "../../components/User/About/PhilosophySection";
import StorySection from "../../components/User/About/StorySection";
import HeritageSection from "../../components/User/About/HeritageSection";
import UniqueSection from "../../components/User/About/UniqueSection";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <HeroSection />
      <AboutContent />
      <PhilosophySection />
      <StorySection />
      <HeritageSection />
      <UniqueSection />

      <Footer />
    </div>
  );
};

export default About;