function Dish({ dish, onAddToCart }) {
  return (
    <div className="dish">
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p className="price">${dish.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(dish)}
        className="add-to-cart-button"  // Aplica la clase aquí
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default Dish;
