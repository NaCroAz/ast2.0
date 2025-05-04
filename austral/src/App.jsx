import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import Header from './components/Header';
import Footer from './components/Footer';
import MenuWithFilters from './components/MenuWithFilters';
import LandingPage from './components/LandingPage';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showHeader, setShowHeader] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCart((prevCart) => [...prevCart, producto]);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="App">
        {showHeader && <Header cart={cart} setCart={setCart} />}

        <Routes>
          <Route path="/" element={
            <>
              {showLanding && <LandingPage setShowHeader={setShowHeader} setShowLanding={setShowLanding} />}
              {!showLanding && (
                <div id="menu-section">
                  <MenuWithFilters agregarAlCarrito={agregarAlCarrito} />
                </div>
              )}
            </>
          } />
        </Routes>

        <Footer />

        {showButton && (
          <button className="back-to-top" onClick={scrollToTop}>
            🔝
          </button>
        )}

        {/* Agregar el ToastContainer aquí */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
