import "./landingpage.css";
import { useEffect } from "react";

const LandingPage = ({ setShowHeader, setShowLanding }) => {
  useEffect(() => {
    setShowHeader(false);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [setShowHeader]);

  const scrollToMenu = () => {
    setShowHeader(true);
    document.body.style.overflow = "auto";
    setShowLanding(false);

    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container">
      <header className="hero">
        <img src="/anapuimage.jpg" alt="Bar Ana Paula" className="hero-image" />
        <h1>Bienvenido a Bar Ana Paula</h1>
        <p>Disfruta de los mejores sabores en un ambiente único</p>
        <button onClick={scrollToMenu}>Ver Menú</button>
      </header>
    </div>
  );
};

export default LandingPage;
