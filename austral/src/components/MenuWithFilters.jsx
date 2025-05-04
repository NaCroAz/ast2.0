import { useState, useEffect } from 'react';
import './Dish.css';

const MenuWithFilters = ({ agregarAlCarrito }) => {
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const dishes = [
    { id: 1, name: 'Clásica de Carne', description: 'Carne empanada', price: 13, type: 'almuerzo' },
    { id: 2, name: 'Clásica de Pollo', description: 'Pollo empanado', price: 12, type: 'almuerzo' },
    { id: 3, name: 'Napolitana', description: 'Con salsa y queso', price: 15, type: 'almuerzo' },
    { id: 4, name: 'Estilo Austral', description: 'Sabor especial', price: 16, type: 'almuerzo' },
    { id: 5, name: 'Papas Fritas', description: 'Crocantes', price: 5, type: 'otros' },
    { id: 6, name: 'Papas a la Crema', description: 'Con queso', price: 6, type: 'otros' },
    { id: 7, name: 'Puré', description: 'De papas', price: 5, type: 'otros' },
    { id: 8, name: 'Salteado de Vegetales', description: 'Vegetales frescos', price: 7, type: 'otros' },
    { id: 9, name: 'Sorrentinos Jamón y Queso', description: 'Pasta rellena', price: 14, type: 'almuerzo' },
    { id: 10, name: 'Sorrentinos Verduras', description: 'Pasta vegetariana', price: 14, type: 'almuerzo' },
    { id: 11, name: 'Sorrentinos de Salmón', description: 'Con salmón fresco', price: 16, type: 'almuerzo' },
    { id: 12, name: 'Bolognesa', description: 'Con carne y tomate', price: 6, type: 'otros' },
    { id: 13, name: 'Crema', description: 'Salsa suave', price: 5, type: 'otros' },
    { id: 14, name: 'Estofado Patagónico', description: 'Sabor tradicional', price: 6, type: 'otros' },
    { id: 15, name: 'Fileto', description: 'Salsa de tomate', price: 5, type: 'otros' },
    { id: 16, name: 'Paricien', description: 'Estilo francés', price: 5, type: 'otros' },
    { id: 17, name: 'Clásica Completa', description: 'Con queso y huevo', price: 11, type: 'cena' },
    { id: 18, name: 'Cordero', description: 'Hamburguesa especial', price: 14, type: 'cena' },
    { id: 19, name: 'JR', description: 'Hamburguesa pequeña', price: 13, type: 'cena' },
    { id: 20, name: 'Mila Clásica', description: 'Con pan', price: 11, type: 'cena' },
    { id: 21, name: 'Lomito a la Pizza', description: 'Sabor italiano', price: 13, type: 'cena' },
    { id: 22, name: 'Cordero Mechado', description: 'Estilo gourmet', price: 15, type: 'cena' },
    { id: 23, name: 'Papas con Cheddar', description: 'Con queso cheddar', price: 7, type: 'otros' },
    { id: 24, name: 'Papas a la Provenzal', description: 'Con ajo y perejil', price: 7, type: 'otros' },
    { id: 25, name: 'César con Pollo', description: 'Ensalada clásica', price: 8, type: 'otros' },
    { id: 26, name: 'César con Langostinos', description: 'Ensalada con mariscos', price: 10, type: 'otros' },
    { id: 27, name: 'Clásica 5 Ingredientes', description: 'Variedad de vegetales', price: 8, type: 'otros' },
    { id: 28, name: 'Mixta Clásica', description: 'Ensalada básica', price: 6, type: 'otros' },
    { id: 29, name: 'Americana', description: 'Pizza americana', price: 13, type: 'cena' },
    { id: 30, name: 'Americana con Papas', description: 'Con papas fritas', price: 14, type: 'cena' },
    { id: 31, name: 'Ananá con Jamón', description: 'Dulce y salado', price: 13, type: 'cena' },
    { id: 32, name: 'Ananá con Jamón Crudo', description: 'Sabor gourmet', price: 15, type: 'cena' },
    { id: 33, name: 'Ananá con Roquefort', description: 'Sabor intenso', price: 15, type: 'cena' },
    { id: 34, name: 'Hamburguesa de Lentejas', description: 'Opción vegana', price: 10, type: 'cena' },
    { id: 35, name: 'Mila Vegetales', description: 'Con ensalada', price: 11, type: 'cena' },
    { id: 36, name: 'Sorrentinos de Verduras', description: 'Pasta saludable', price: 13, type: 'cena' },
    { id: 37, name: 'Crema de Calabaza', description: 'Sopa especial', price: 6, type: 'otros' },
    { id: 38, name: 'Manzanas al Malbec', description: 'Postre dulce', price: 6, type: 'otros' },
    { id: 39, name: 'Flan con Dulce de Leche', description: 'Tradicional', price: 6, type: 'otros' },
    { id: 40, name: 'Tiramisú', description: 'Postre italiano', price: 7, type: 'otros' },
    { id: 41, name: 'Ensalada de Frutas', description: 'Frutas frescas', price: 5, type: 'otros' },
    { id: 42, name: 'Copa Helada', description: 'Postre frío', price: 5, type: 'otros' },
    { id: 43, name: 'Café Expreso', description: 'Café clásico', price: 3, type: 'desayuno' },
    { id: 44, name: 'Jarrito', description: 'Café en jarra', price: 3, type: 'desayuno' },
    { id: 45, name: 'Jarrito con Crema', description: 'Café con crema', price: 4, type: 'desayuno' },
    { id: 46, name: 'Café Doble o con Leche', description: 'Más sabor', price: 3, type: 'desayuno' },
    { id: 47, name: 'Té', description: 'Infusión clásica', price: 2, type: 'desayuno' },
    { id: 48, name: 'Licuado', description: 'De frutas frescas', price: 4, type: 'desayuno' },
    { id: 49, name: 'Norton Cosecha Tardía', description: 'Vino dulce', price: 9, type: 'bebidas' },
    { id: 50, name: 'Norton Blanco Clásico 1895', description: 'Vino blanco', price: 9, type: 'bebidas' },
    { id: 51, name: 'Benjamín Cosecha Tardía', description: 'Sabor dulce', price: 10, type: 'bebidas' },
    { id: 52, name: 'Benjamín Sauvignon Blanc', description: 'Sabor seco', price: 8, type: 'bebidas' },
    { id: 53, name: 'Portillo Sauvignon Blanc', description: 'Toque afrutado', price: 8, type: 'bebidas' },
    { id: 54, name: 'Quilmes de Litro', description: 'Cerveza clásica', price: 5, type: 'bebidas' },
    { id: 55, name: 'Quilmes Stout de Litro', description: 'Cerveza negra', price: 6, type: 'bebidas' },
    { id: 56, name: 'Heineken/Stella Litro', description: 'Premium', price: 6, type: 'bebidas' },
    { id: 57, name: 'Lata Quilmes', description: 'Formato pequeño', price: 3, type: 'bebidas' },
    { id: 58, name: 'Lata Imperial', description: 'Sabor intenso', price: 3, type: 'bebidas' },
    { id: 59, name: 'Lata Heineken', description: 'Premium en lata', price: 3, type: 'bebidas' },
    { id: 60, name: 'Corona', description: 'Cerveza importada', price: 4, type: 'bebidas' },
    { id: 61, name: 'Alaris', description: 'Vino tinto', price: 10, type: 'bebidas' },
    { id: 62, name: 'Norton Clásico', description: 'Vino de calidad', price: 10, type: 'bebidas' },
    { id: 63, name: 'Finca las Moras', description: 'Vino afrutado', price: 8, type: 'bebidas' },
    { id: 64, name: 'Estancia Mendoza', description: 'Vino argentino', price: 9, type: 'bebidas' },
    { id: 65, name: 'Benjamín', description: 'Vino equilibrado', price: 8, type: 'bebidas' },
    { id: 66, name: 'Dúo Empanadas de Carne', description: 'Carne y especias', price: 6, type: 'otros' },
    { id: 67, name: 'Dúo Empanadas de Verduras', description: 'Opción vegetariana', price: 6, type: 'otros' },
    { id: 68, name: 'Crema de Calabaza', description: 'Sopa nutritiva', price: 5, type: 'otros' },
    { id: 69, name: 'Rabas con Salsas', description: 'Calamares fritos', price: 8, type: 'otros' },
    { id: 70, name: 'Langostinos con Salsas', description: 'Sabor del mar', price: 9, type: 'otros' },
    { id: 71, name: 'Pechuga Cítrica con Colchón de Coles', description: 'Plato gourmet', price: 16, type: 'almuerzo' },
    { id: 72, name: 'Bife de Chorizo con Salsa Criolla', description: 'Clásico argentino', price: 18, type: 'almuerzo' },
    { id: 73, name: 'Cazuela de Lentejas', description: 'Plato caliente', price: 12, type: 'almuerzo' },
    { id: 74, name: 'Goulash de Cordero', description: 'Plato europeo', price: 20, type: 'cena' },
    { id: 75, name: 'Sorrentinos de Salmón con Crema de Limón', description: 'Delicado sabor', price: 18, type: 'cena' },
    { id: 76, name: 'Bife de Bondiola a la Barbacoa', description: 'Sabor ahumado', price: 19, type: 'cena' },
  ];

  // Filtrar los platos según el filtro seleccionado
  const filteredDishes = filter === 'all' ? dishes : dishes.filter(dish => dish.type === filter);

  return (
    <div style={{ marginTop: '60px' }}>
      {/* Botón para cambiar el tema */}
      <div className="theme-switcher">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
          <span className="slider"></span>
        </label>
        <span>{darkMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
      </div>

      {/* Filtros */}
      <div className="filter-buttons" style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilter('all')}>Todos</button>
        <button onClick={() => setFilter('almuerzo')}>Almuerzo</button>
        <button onClick={() => setFilter('cena')}>Cena</button>
        <button onClick={() => setFilter('otros')}>Otros</button>
        <button onClick={() => setFilter('desayuno')}>Desayuno</button>
      </div>

      {/* Lista de platos filtrados */}
      <div className="menu-list">
        {filteredDishes.map((dish) => (
          <div className="dish" key={dish.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <span className="price">${dish.price.toFixed(2)}</span>
            <button
              onClick={() => agregarAlCarrito(dish)}
              className="add-to-cart-button"
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#d9534f',
                color: '#fff',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuWithFilters;
