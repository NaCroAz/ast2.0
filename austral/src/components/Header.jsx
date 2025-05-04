// Header.js
import './Header.css';
import Cart from './Cart';

function Header({ cart, setCart }) {
  return (
    <header className="header" style={{ display: "flex", justifyContent: "space-between", padding: "20px", backgroundColor: "#333", color: "#fff" }}>
      <div className="logo">
        <h1>Bar Ana Paula</h1>
      </div>
      {/* Carrito de compras */}
      <Cart cart={cart} setCart={setCart} />
    </header>
  );
}

export default Header;
