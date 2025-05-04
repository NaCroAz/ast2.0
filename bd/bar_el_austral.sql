-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.5.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bar_el_austral
CREATE DATABASE IF NOT EXISTS `bar_el_austral` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `bar_el_austral`;

-- Volcando estructura para tabla bar_el_austral.asistencias
CREATE TABLE IF NOT EXISTS `asistencias` (
  `id_asistencia` int(11) NOT NULL AUTO_INCREMENT,
  `id_empleado` int(11) DEFAULT NULL,
  `hora_entrada_real` time DEFAULT NULL,
  `hora_salida_real` time DEFAULT NULL,
  PRIMARY KEY (`id_asistencia`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `FK_asistencias_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.asistencias: ~5 rows (aproximadamente)
INSERT INTO `asistencias` (`id_asistencia`, `id_empleado`, `hora_entrada_real`, `hora_salida_real`) VALUES
	(8, 4, NULL, NULL),
	(9, 12, NULL, NULL),
	(10, 4, NULL, NULL),
	(11, 4, NULL, NULL),
	(12, 4, NULL, NULL);

-- Volcando estructura para tabla bar_el_austral.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` tinytext DEFAULT NULL,
  `apellido` tinytext DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` tinytext DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `correo_electronico` tinytext DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `contrasenia` tinytext DEFAULT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.empleados: ~7 rows (aproximadamente)
INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellido`, `fecha_nacimiento`, `direccion`, `telefono`, `correo_electronico`, `id_rol`, `contrasenia`) VALUES
	(4, 'Nahuel', 'Carrizo', '2024-11-18', 'tal1', 0, 'xxx@gmail.com', 4, '123'),
	(6, 'Diego', 'Cervera', '2024-11-18', 'tal2', 0, 'xxx@gmail.com', 4, NULL),
	(7, 'Lucas', 'Cabrera', '2024-11-18', 'tal3', 0, 'xxx@gmail.com', 1, NULL),
	(9, 'Luciano', 'Donelli', '2024-11-18', 'tal4', 0, 'xxx@gmail.com', 3, NULL),
	(10, 'Nicolas', 'Camaño', '2024-11-18', 'tal5', 0, 'xxx@gmail.com', 4, NULL),
	(11, 'Ariadna', 'Carabajal', '2024-11-18', 'tal6', 0, 'xxx@gmail.com', 2, NULL),
	(12, 'Selena', 'Osores', '2024-11-18', 'tal7', 0, 'xxx@gmail.com', 1, NULL),
	(15, 'admin', NULL, NULL, NULL, NULL, NULL, 1, 'admin');

-- Volcando estructura para tabla bar_el_austral.horarios
CREATE TABLE IF NOT EXISTS `horarios` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_empleado` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `FK_horarios_empleados` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.horarios: ~4 rows (aproximadamente)
INSERT INTO `horarios` (`id_horario`, `id_empleado`, `fecha`, `hora_entrada`, `hora_salida`) VALUES
	(11, 4, '2023-07-24', '08:00:00', '16:00:00'),
	(12, 12, '2021-09-18', '08:00:00', '16:00:00'),
	(13, 4, '2022-09-18', '00:00:00', '08:00:00'),
	(14, 4, '2022-11-17', '16:00:00', '00:00:00');

-- Volcando estructura para tabla bar_el_austral.pedidos
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) DEFAULT NULL,
  `detalle_pedido` text NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `opcionEntrega` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_venta` (`id_venta`),
  CONSTRAINT `FK_pedidos_ventas` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.pedidos: ~2 rows (aproximadamente)
INSERT INTO `pedidos` (`id_pedido`, `id_venta`, `detalle_pedido`, `total`, `opcionEntrega`) VALUES
	(64, 52, '2x Clásica de Carne', 26.00, 'Take-Away'),
	(65, 53, '2x Napolitana, 1x Estilo Austral', 46.00, 'Comer en Local'),
	(66, 54, '1x Clásica de Carne, 1x Clásica de Pollo', 25.00, 'Comer en Local');

-- Volcando estructura para tabla bar_el_austral.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_venta` int(11) DEFAULT NULL,
  `horario_comida` text DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.productos: ~76 rows (aproximadamente)
INSERT INTO `productos` (`id_producto`, `nombre_producto`, `descripcion`, `precio_venta`, `horario_comida`, `stock`) VALUES
	(1, 'Clásica de Carne', 'Carne empanada', 13, 'Almuerzo', 51),
	(2, 'Clásica de Pollo', 'Pollo empanado', 12, 'Almuerzo', 14),
	(3, 'Napolitana', 'Con salsa y queso', 15, 'Almuerzo', 11),
	(4, 'Estilo Austral', 'Sabor especial', 16, 'Almuerzo', 25),
	(5, 'Papas Fritas', 'Crocantes', 5, 'Otros', 87),
	(6, 'Papas a la Crema', 'Con queso', 6, 'Otros', 57),
	(7, 'Puré', 'De papas', 5, 'Otros', 27),
	(8, 'Salteado de Vegetales', 'Vegetales frescos', 7, 'Otros', 61),
	(9, 'Sorrentinos Jamón y Queso', 'Pasta rellena', 14, 'Almuerzo', 23),
	(10, 'Sorrentinos Verduras', 'Pasta vegetariana', 14, 'Almuerzo', 32),
	(11, 'Sorrentinos de Salmón', 'Con salmón fresco', 16, 'Almuerzo', 89),
	(12, 'Bolognesa', 'Con carne y tomate', 6, 'Otros', 48),
	(13, 'Crema', 'Salsa suave', 5, 'Otros', 73),
	(14, 'Estofado Patagónico', 'Sabor tradicional', 6, 'Otros', 22),
	(15, 'Fileto', 'Salsa de tomate', 5, 'Otros', 89),
	(16, 'Paricien', 'Estilo francés', 5, 'Otros', 78),
	(17, 'Clásica Completa', 'Con queso y huevo', 11, 'Cena', 24),
	(18, 'Cordero', 'Hamburguesa especial', 14, 'Cena', 83),
	(19, 'JR', 'Hamburguesa pequeña', 13, 'Cena', 43),
	(20, 'Mila Clásica', 'Con pan', 11, 'Cena', 66),
	(21, 'Lomito a la Pizza', 'Sabor italiano', 13, 'Cena', 100),
	(22, 'Cordero Mechado', 'Estilo gourmet', 15, 'Cena', 3),
	(23, 'Papas con Cheddar', 'Con queso cheddar', 7, 'Otros', 12),
	(24, 'Papas a la Provenzal', 'Con ajo y perejil', 7, 'Otros', 53),
	(25, 'César con Pollo', 'Ensalada clásica', 8, 'Otros', 26),
	(26, 'César con Langostinos', 'Ensalada con mariscos', 10, 'Otros', 72),
	(27, 'Clásica 5 Ingredientes', 'Variedad de vegetales', 8, 'Otros', 79),
	(28, 'Mixta Clásica', 'Ensalada básica', 6, 'Otros', 81),
	(29, 'Americana', 'Pizza americana', 13, 'Cena', 69),
	(30, 'Americana con Papas', 'Con papas fritas', 14, 'Cena', 99),
	(31, 'Ananá con Jamón', 'Dulce y salado', 13, 'Cena', 87),
	(32, 'Ananá con Jamón Crudo', 'Sabor gourmet', 15, 'Cena', 38),
	(33, 'Ananá con Roquefort', 'Sabor intenso', 15, 'Cena', 28),
	(34, 'Hamburguesa de Lentejas', 'Opción vegana', 10, 'Cena', 26),
	(35, 'Mila Vegetales', 'Con ensalada', 11, 'Cena', 47),
	(36, 'Sorrentinos de Verduras', 'Pasta saludable', 13, 'Cena', 54),
	(37, 'Crema de Calabaza', 'Sopa especial', 6, 'Otros', 29),
	(38, 'Manzanas al Malbec', 'Postre dulce', 6, 'Otros', 82),
	(39, 'Flan con Dulce de Leche', 'Tradicional', 6, 'Otros', 22),
	(40, 'Tiramisú', 'Postre italiano', 7, 'Otros', 66),
	(41, 'Ensalada de Frutas', 'Frutas frescas', 5, 'Otros', 61),
	(42, 'Copa Helada', 'Postre frío', 5, 'Otros', 9),
	(43, 'Café Expreso', 'Café clásico', 3, 'Desayuno', 60),
	(44, 'Jarrito', 'Café en jarra', 3, 'Desayuno', 71),
	(45, 'Jarrito con Crema', 'Café con crema', 4, 'Desayuno', 74),
	(46, 'Café Doble o con Leche', 'Más sabor', 3, 'Desayuno', 59),
	(47, 'Té', 'Infusión clásica', 2, 'Desayuno', 73),
	(48, 'Licuado', 'De frutas frescas', 4, 'Desayuno', 85),
	(49, 'Norton Cosecha Tardía', 'Vino dulce', 9, 'Bebidas', 6),
	(50, 'Norton Blanco Clásico 1895', 'Vino blanco', 9, 'Bebidas', 74),
	(51, 'Benjamín Cosecha Tardía', 'Sabor dulce', 10, 'Bebidas', 52),
	(52, 'Benjamín Sauvignon Blanc', 'Sabor seco', 8, 'Bebidas', 37),
	(53, 'Portillo Sauvignon Blanc', 'Toque afrutado', 8, 'Bebidas', 27),
	(54, 'Quilmes de Litro', 'Cerveza clásica', 5, 'Bebidas', 24),
	(55, 'Quilmes Stout de Litro', 'Cerveza negra', 6, 'Bebidas', 41),
	(56, 'Heineken/Stella Litro', 'Premium', 6, 'Bebidas', 32),
	(57, 'Lata Quilmes', 'Formato pequeño', 3, 'Bebidas', 34),
	(58, 'Lata Imperial', 'Sabor intenso', 3, 'Bebidas', 76),
	(59, 'Lata Heineken', 'Premium en lata', 3, 'Bebidas', 78),
	(60, 'Corona', 'Cerveza importada', 4, 'Bebidas', 62),
	(61, 'Alaris', 'Vino tinto', 10, 'Bebidas', 72),
	(62, 'Norton Clásico', 'Vino de calidad', 10, 'Bebidas', 77),
	(63, 'Finca las Moras', 'Vino afrutado', 8, 'Bebidas', 69),
	(64, 'Estancia Mendoza', 'Vino argentino', 9, 'Bebidas', 12),
	(65, 'Benjamín', 'Vino equilibrado', 8, 'Bebidas', 51),
	(66, 'Dúo Empanadas de Carne', 'Carne y especias', 6, 'Otros', 18),
	(67, 'Dúo Empanadas de Verduras', 'Opción vegetariana', 6, 'Otros', 39),
	(68, 'Crema de Calabaza', 'Sopa nutritiva', 5, 'Otros', 40),
	(69, 'Rabas con Salsas', 'Calamares fritos', 8, 'Otros', 82),
	(70, 'Langostinos con Salsas', 'Sabor del mar', 9, 'Otros', 89),
	(71, 'Pechuga Cítrica con Colchón de Coles', 'Plato gourmet', 16, 'Almuerzo', 100),
	(72, 'Bife de Chorizo con Salsa Criolla', 'Clásico argentino', 18, 'Almuerzo', 31),
	(73, 'Cazuela de Lentejas', 'Plato caliente', 12, 'Almuerzo', 57),
	(74, 'Goulash de Cordero', 'Plato europeo', 20, 'Cena', 90),
	(75, 'Sorrentinos de Salmón con Crema de Limón', 'Delicado sabor', 18, 'Cena', 80),
	(76, 'Bife de Bondiola a la Barbacoa', 'Sabor ahumado', 19, 'Cena', 30);

-- Volcando estructura para tabla bar_el_austral.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rol` int(11) NOT NULL,
  `nombre_rol` tinytext DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.roles: ~4 rows (aproximadamente)
INSERT INTO `roles` (`id`, `id_rol`, `nombre_rol`, `descripcion`) VALUES
	(1, 1, 'Gerente de bar', 'Responsable del bar'),
	(2, 2, 'Bartender', 'Prepara bebidas'),
	(3, 3, 'Ayudante de bar', 'Ayuda al bartender'),
	(4, 4, 'Cajero', 'Maneja la caja');

-- Volcando estructura para tabla bar_el_austral.ventas
CREATE TABLE IF NOT EXISTS `ventas` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT current_timestamp(),
  `total` int(11) DEFAULT NULL,
  `detalle_venta` text DEFAULT NULL,
  PRIMARY KEY (`id_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla bar_el_austral.ventas: ~2 rows (aproximadamente)
INSERT INTO `ventas` (`id_venta`, `fecha`, `total`, `detalle_venta`) VALUES
	(52, '2025-02-18 00:45:14', 26, '2x Clásica de Carne'),
	(53, '2025-02-19 00:06:08', 46, '2x Napolitana, 1x Estilo Austral'),
	(54, '2025-02-19 00:36:55', 25, '1x Clásica de Carne, 1x Clásica de Pollo');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
