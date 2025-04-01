-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 01, 2025 at 07:38 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banana_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE IF NOT EXISTS `scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `username`, `score`) VALUES
(70, 'pramod05', 0),
(45, 'pramod00', 0),
(65, 'pramod05', 0),
(66, 'pramod05', 0),
(64, 'pramod05', 30),
(41, 'pramod03', 0),
(34, 'pramod01', 10),
(63, 'pramod04', 10),
(29, 'pramod01', 10),
(56, 'pramod00', 0),
(55, 'pramod00', 0),
(54, 'pramod00', 0),
(53, 'pramod00', 0),
(68, 'pramod05', 0),
(67, 'pramod05', 0),
(69, 'pramod05', 0),
(71, 'pramod05', 0),
(72, 'pramod05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(9, 'pramod00', '$2y$10$wDaI3loCcJ/o8FIEDKeFy./OGlRslDOJX24ATIkwDtnrjKqVungva'),
(10, 'pramod01', '$2y$10$B1ND8M5LeG0IfMX27ykF5uX3En3la7GRHI.RpGgejQSkg7urKbISC'),
(11, 'pramod03', '$2y$10$SAZ4a2OgqA2L99sACC5JQOGJH3mYrpPH36qyM8m37s4muAGzsjwnS'),
(14, 'pramod04', '$2y$10$whsgNxn5YXm.mvCk5ZE20uBdwcGpq1240nwVTUucfyIqT8CHEIWeK'),
(19, 'pramod05', '$2y$10$yHTNq8mQ5ZR5pmV6NShHMuIxuJa1jyCIpSPk9vgwVRoeTGa99FxsG');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
