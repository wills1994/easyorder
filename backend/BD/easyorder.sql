-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-03-2015 a las 13:18:18
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `easyorder`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Primeros platos'),
(2, 'Segundos platos'),
(3, 'Postres'),
(4, 'Bebidas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE IF NOT EXISTS `mesa` (
`id` int(11) NOT NULL,
  `numero_mesa` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mesa`
--

INSERT INTO `mesa` (`id`, `numero_mesa`, `estado`, `hora`) VALUES
(1, 11, 1, '2015-03-27 12:15:03'),
(2, 12, 1, '2015-03-27 12:15:03'),
(3, 13, 0, '2015-03-27 12:16:33'),
(4, 14, 1, '2015-03-27 12:15:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE IF NOT EXISTS `pedido` (
`id` int(11) NOT NULL,
  `id_mesa` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `id_mesa`) VALUES
(1, 1),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE IF NOT EXISTS `producto` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` int(45) DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `descripcion`, `foto`, `estado`, `id_categoria`) VALUES
(1, 'Macarrones con pollo y espinacas', 9, 'La pasta al dente acompañada de una salsa de ', NULL, 1, 1),
(3, ' Arroz tres delicias', 5, 'Con los huevos hacemos en otra sartén una tortilla francesa y la dejamos enfriar un poco. Una vez templada la cortamos en cuadraditos', NULL, 1, 1),
(4, 'Acelgas con patatas', 11, 'Limpiamos bien las acelgas. Cortamos la parte blanca, o penca y con un cuchillo sacamos los hilitos.', NULL, 1, 1),
(5, 'Lomo de cerdo a la cerveza', 15, 'Salpimentamos la carne y la doramos en una cazuela con un chorrito de aceite', NULL, 1, 2),
(6, 'Albondigas con champiñones', 8, 'En un recipiente mezclamos la carne de cerdo con la de ternera, los huevos, una pizca de sal.', NULL, 1, 2),
(7, 'Alcachofas rellenas de carne', 8, 'Primero en un bol grande añadimos agua muy fría, cortamos el limón a gajos, exprimimos.', NULL, 1, 2),
(8, 'Bratwurst con beicon', 8, 'Primero pelamos y cortamos las patatas en rodajas finas. Las limpiamos bien y las colocamos de fondo ', NULL, 1, 2),
(9, 'Crepes', 7, 'Echamos la harina en una fuente y añadimos poco a poco, con la batidora de varillas, la leche.', NULL, 1, 3),
(10, 'Ensalada de melón y fresas', 6, 'Lavamos el manojo de menta, deshojamos y metemos en un vaso de toormix.', NULL, 1, 3),
(11, 'Batido', 4, 'Primero pelamos y troceamos los aguacates en gajos, quitándoles el hueso central. A continuación ponemos en el vaso.', NULL, 1, 4),
(12, 'Coca-Cola', 2, 'Refresco de soda', NULL, 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_has_pedido`
--

CREATE TABLE IF NOT EXISTS `producto_has_pedido` (
`id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto_has_pedido`
--

INSERT INTO `producto_has_pedido` (`id`, `id_producto`, `id_pedido`, `cantidad`) VALUES
(1, 1, 1, 0),
(2, 3, 1, 0),
(3, 4, 2, 0),
(4, 5, 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
 ADD PRIMARY KEY (`id`), ADD KEY `id_mesa` (`id_mesa`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
 ADD PRIMARY KEY (`id`), ADD KEY `id_categoria` (`id_categoria`), ADD KEY `id_categoria_2` (`id_categoria`);

--
-- Indices de la tabla `producto_has_pedido`
--
ALTER TABLE `producto_has_pedido`
 ADD PRIMARY KEY (`id`), ADD KEY `id_producto` (`id_producto`), ADD KEY `id_pedido` (`id_pedido`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `mesa`
--
ALTER TABLE `mesa`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `producto_has_pedido`
--
ALTER TABLE `producto_has_pedido`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_mesa`) REFERENCES `mesa` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `producto_has_pedido`
--
ALTER TABLE `producto_has_pedido`
ADD CONSTRAINT `producto_has_pedido_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
ADD CONSTRAINT `producto_has_pedido_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
