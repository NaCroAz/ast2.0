const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MariaDB (HeidiSQL)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'usuario1',
  password: '',
  database: 'bar_el_austral',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MariaDB:', err);
  } else {
    console.log('Conectado a MariaDB');
  }
});

// Función para agrupar los platos repetidos
function agruparPlatos(cart) {
  const platosAgrupados = {};

  cart.forEach(item => {
    if (platosAgrupados[item.name]) {
      platosAgrupados[item.name] += item.quantity;
    } else {
      platosAgrupados[item.name] = item.quantity;
    }
  });

  // Crear el detalle del pedido con nombre y cantidad
  const detalle = Object.entries(platosAgrupados)
    .map(([name, quantity]) => `${quantity}x ${name}`)
    .join(', '); // Une los elementos en una cadena separada por coma

  return detalle;
}

// Ruta para guardar un pedido
app.post('/api/pedidos', (req, res) => {
  const { id_venta, cart, selectedOption } = req.body;

  if (!id_venta || !cart || cart.length === 0 || !selectedOption) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  // Verificar si el id_venta existe en la tabla ventas
  const queryVenta = "SELECT * FROM ventas WHERE id_venta = ?";
  db.query(queryVenta, [id_venta], (err, results) => {
    if (err) {
      console.error('Error al verificar venta:', err);
      return res.status(500).json({ error: 'Error al verificar la venta.' });
    }

    if (results.length === 0) {
      // Si no existe la venta, crear una nueva venta con la hora actual
      const queryInsertVenta = "INSERT INTO ventas (fecha, total, detalle_venta) VALUES (NOW(), ?, ?)";
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
      
      // Crear el detalle de la venta con nombre y cantidad de productos
      const detalleVenta = agruparPlatos(cart);

      db.query(queryInsertVenta, [total, detalleVenta], (error, result) => {
        if (error) {
          console.error('Error al insertar la venta:', error);
          return res.status(500).json({ error: 'Error al crear la venta.' });
        }

        // Usar el nuevo id_venta generado
        const nuevoIdVenta = result.insertId;
        insertarPedido(nuevoIdVenta);
      });
    } else {
      // Si la venta existe, proceder con la inserción del pedido
      insertarPedido(id_venta);
    }
  });

  function insertarPedido(id_venta) {
    // Crear el detalle del pedido con nombre y cantidad de productos
    const detallePedido = agruparPlatos(cart);

    // Calcular el total del pedido
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    const query = "INSERT INTO pedidos (id_venta, detalle_pedido, total, opcionEntrega) VALUES (?, ?, ?, ?)";
    db.query(query, [id_venta, detallePedido, total, selectedOption], (error, result) => {
      if (error) {
        console.error('Error al guardar el pedido:', error);
        return res.status(500).json({ error: 'Error al guardar el pedido.' });
      }

      // Aquí debes actualizar el stock de los productos
      actualizarStock(cart);

      res.status(201).json({ message: 'Pedido enviado exitosamente', id_pedido: result.insertId });
    });
  }

  // Función para actualizar el stock de los productos
  function actualizarStock(cart) {
    cart.forEach(item => {
      // Reducir el stock en la tabla de productos
      const queryStock = "UPDATE productos SET stock = stock - ? WHERE nombre_producto = ?";
      db.query(queryStock, [item.quantity, item.name], (err, result) => {
        if (err) {
          console.error('Error al actualizar el stock:', err);
        } else {
        }
      });
    });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
