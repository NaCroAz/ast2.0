import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const cartRef = useRef(null);
  const cartIconRef = useRef(null);

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const enviarProductos = async () => {
    if (cart.length === 0) {
      toast.error("❌ No tienes productos en el carrito.", { position: "top-center", autoClose: 3000 });
      return;
    }

    if (!selectedOption) {
      toast.warn("⚠️ Selecciona Take-Away o Comer en Local.", { position: "top-center", autoClose: 3000 });
      return;
    }

    const productos = cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: 1,
    }));

    const pedido = {
      id_venta: 1,
      cart: productos,
      selectedOption,
    };

    try {
      const response = await fetch("http://localhost:3000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        toast.success("✅ ¡Pedido enviado exitosamente!", { position: "top-center", autoClose: 3000 });
        setCart([]);
        setSelectedOption(null);
      } else {
        toast.error("❌ Error al enviar el pedido.", { position: "top-center", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      toast.error("❌ No se pudo conectar con el servidor.", { position: "top-center", autoClose: 3000 });
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && !cartIconRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const eliminarProducto = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div ref={cartIconRef} className={`cart-icon ${isCartOpen ? "hidden" : ""}`} onClick={toggleCart}>
        <img src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="Carrito" width="30" height="30" />
        {cart.length > 0 && <span className="cart-counter">{cart.length}</span>}
      </div>

      {isCartOpen && (
        <div ref={cartRef} className={`cart ${document.body.classList.contains("dark-mode") ? "dark-mode" : ""}`}>
          <h3>{cart.length === 0 ? "Tu carrito está vacío" : "Carrito de Compras"}</h3>
          <ul>
            {cart.length === 0 ? (
              <li>No tienes productos en tu carrito</li>
            ) : (
              cart.map((item, index) => (
                <li key={index} className="cart-item">
                  {item.name} - <span className="price">${item.price.toFixed(2)}</span>
                  <button onClick={(e) => { e.stopPropagation(); eliminarProducto(index); }} className="remove-item">
                    X
                  </button>
                </li>
              ))
            )}
          </ul>
          {cart.length > 0 && (
            <div>
              <div className="cart-total">Total a pagar: ${calcularTotal()}</div>
              <div className="options">
                <label>
                  <input type="checkbox" checked={selectedOption === "Take-Away"} onChange={() => handleOptionChange("Take-Away")} />
                  Take-Away
                </label>
                <label>
                  <input type="checkbox" checked={selectedOption === "Comer en Local"} onChange={() => handleOptionChange("Comer en Local")} />
                  Comer en Local
                </label>
              </div>
              <button onClick={enviarProductos}>Enviar pedido</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
