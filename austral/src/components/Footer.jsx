import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Información de contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <p><FaMapMarkerAlt /> Av. Principal 123, Ciudad</p>
          <p><FaPhoneAlt /> +54 11 2345-6789</p>
          <p><FaEnvelope /> contacto@restaurante.com</p>
        </div>

        {/* Redes Sociales */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Derechos reservados */}
        <div className="footer-section">
          <p>&copy; 2025 Bar Ana Paula. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
