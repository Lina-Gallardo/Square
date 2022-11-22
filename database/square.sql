-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2022 a las 08:45:28
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `square`
--
CREATE DATABASE IF NOT EXISTS `square` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `square`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(10) NOT NULL,
  `id_sala` int(10) NOT NULL,
  `disponibilidad_equipo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `id_sala`, `disponibilidad_equipo`) VALUES
(76, 236, 1),
(77, 236, 1),
(78, 236, 1),
(79, 236, 1),
(80, 236, 1),
(91, 2319, 1),
(92, 2319, 1),
(93, 2319, 1),
(94, 2319, 1),
(95, 2319, 1),
(106, 124402, 1),
(107, 124402, 1),
(108, 124402, 1),
(109, 124402, 1),
(110, 124402, 1),
(111, 124402, 1),
(112, 124402, 1),
(113, 124402, 1),
(114, 124402, 1),
(115, 124402, 1),
(131, 8316, 1),
(132, 8316, 1),
(133, 8316, 1),
(134, 8316, 1),
(135, 8316, 1),
(136, 8316, 1),
(137, 8316, 1),
(138, 8316, 1),
(139, 8316, 1),
(140, 8316, 1),
(141, 8319, 1),
(142, 8319, 1),
(143, 8319, 1),
(144, 8319, 1),
(145, 8319, 1),
(146, 8319, 1),
(147, 8319, 1),
(148, 8319, 1),
(149, 8319, 1),
(150, 8319, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id_horario` int(80) NOT NULL,
  `id_sala` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `dia_semana` int(80) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id_horario`, `id_sala`, `id_user`, `dia_semana`, `hora_inicio`, `hora_fin`) VALUES
(4, 236, 18929301, 1, '07:30:00', '09:30:00'),
(5, 236, 18929301, 1, '14:30:00', '17:30:00'),
(13, 2319, 18929301, 3, '06:30:00', '07:30:00'),
(15, 236, 18929301, 6, '06:30:00', '07:30:00'),
(16, 236, 18929301, 2, '06:30:00', '09:30:00'),
(21, 236, 18929301, 5, '06:30:00', '09:30:00'),
(22, 236, 18929301, 5, '12:30:00', '15:30:00'),
(24, 124402, 18929301, 6, '06:30:00', '09:30:00'),
(25, 124402, 18929301, 6, '14:30:00', '18:30:00'),
(26, 124402, 18929301, 6, '10:30:00', '13:30:00'),
(27, 236, 18929301, 3, '06:30:00', '09:30:00'),
(29, 236, 18929301, 1, '09:30:00', '12:30:00'),
(30, 236, 18929301, 1, '18:00:00', '21:00:00'),
(31, 236, 18929301, 1, '06:00:00', '07:00:00'),
(32, 2319, 18929301, 1, '16:30:00', '17:30:00'),
(33, 124402, 18929301, 1, '18:30:00', '20:30:00'),
(34, 236, 18929301, 2, '10:30:00', '13:30:00'),
(35, 8316, 18929301, 2, '14:30:00', '17:30:00'),
(36, 124402, 18929301, 2, '08:30:00', '11:30:00'),
(37, 2319, 18929301, 2, '18:30:00', '21:30:00'),
(38, 236, 18929301, 2, '14:30:00', '16:30:00'),
(39, 8319, 18929301, 2, '10:30:00', '13:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(80) NOT NULL,
  `id_user` int(10) NOT NULL,
  `id_sala` int(10) NOT NULL,
  `id_equipo` int(10) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_reserva` time NOT NULL,
  `hora_final` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_user`, `id_sala`, `id_equipo`, `fecha_reserva`, `hora_reserva`, `hora_final`) VALUES
(6, 1104678765, 8316, 131, '2022-11-22', '09:30:00', '10:00:00'),
(8, 1043029541, 236, 76, '2022-11-22', '18:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id_sala` int(10) NOT NULL,
  `bloque_sala` int(10) NOT NULL,
  `piso_sala` int(10) NOT NULL,
  `aula_sala` int(10) NOT NULL,
  `cantidad_equipos_sala` int(10) NOT NULL,
  `total_equipos_reservados` int(80) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id_sala`, `bloque_sala`, `piso_sala`, `aula_sala`, `cantidad_equipos_sala`, `total_equipos_reservados`) VALUES
(236, 2, 3, 6, 5, 0),
(2319, 2, 3, 19, 5, 0),
(8316, 8, 3, 16, 10, 0),
(8319, 8, 3, 19, 10, 0),
(124402, 12, 4, 402, 10, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Ws-Mvk4jR-kJbI_hPjr8aANkeVoVzf4Y', 1669188912, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"jrllinas@gmail.com\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(10) NOT NULL,
  `name_user` varchar(80) NOT NULL,
  `email_user` varchar(80) NOT NULL,
  `password_user` varchar(80) NOT NULL,
  `role_user` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `name_user`, `email_user`, `password_user`, `role_user`) VALUES
(18929301, 'Elid Gallardo', 'egallardo@cuc.edu.co', '$2a$10$ZvffcIcKvpONFoPuqC5L8OGQAEwN07KQQ/dbdRf4D9S1..s1aL2Re', 'Docente'),
(36502164, 'Juana Maria', 'juana@cuc.edu.co', '$2a$10$NBzSMY5GR.FGqdrOdB1k8.AXV1xHrr/DHL36QFcOuJcGJu4co2VQu', 'Estudiante'),
(1001867142, 'José Llinás Peña ', 'jrllinas@gmail.com', '$2a$10$p8dXnUUZv7hRmlk2eBYnk.UahwyahTBYHKa6EuNsZ4WcpA8xis9/.', 'Administrativo'),
(1043023222, 'Carolina Gallardo Corrales', 'cdoc@cuc.edu.co', '$2a$10$96epeTCsJwnNmHSgtTLVeONnPM5vBYiZcu2oVN4oUdjenc/uc2sYi', 'Administrativo'),
(1043029541, 'Lina Gallardo', 'lgallard3@cuc.edu.co', '$2a$10$rmYG8FSBJtMC3u1H7Bq/JuOVSSmby9u0f8mb8rWLz49kwfoi7E4ee', 'Estudiante'),
(1104678765, 'Daniel Pizarro', 'dpizarro3@cuc.edu.co', '$2a$10$gky63ckMnLXPfBmpLJvuj.hEav9bF2JnvKCGPh0gL.useTiW9nPwq', 'Estudiante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD KEY `equipos_ibfk_1` (`id_sala`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `horario_ibfk_1` (`id_sala`),
  ADD KEY `horario_ibfk_2` (`id_user`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `reservas_ibfk_1` (`id_user`),
  ADD KEY `reservas_ibfk_2` (`id_sala`),
  ADD KEY `reservas_ibfk_3` (`id_equipo`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id_sala`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email_user` (`email_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id_horario` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`) ON DELETE CASCADE;

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`) ON DELETE CASCADE,
  ADD CONSTRAINT `horario_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
