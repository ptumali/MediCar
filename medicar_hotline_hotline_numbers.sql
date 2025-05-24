CREATE DATABASE  IF NOT EXISTS `medicar_hotline` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `medicar_hotline`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: medicar_hotline
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hotline_numbers`
--

DROP TABLE IF EXISTS `hotline_numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotline_numbers` (
  `make` varchar(255) DEFAULT NULL,
  `numbers` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotline_numbers`
--

LOCK TABLES `hotline_numbers` WRITE;
/*!40000 ALTER TABLE `hotline_numbers` DISABLE KEYS */;
INSERT INTO `hotline_numbers` VALUES ('Acura','800-382-2238'),('Alfa Romeo','844-253-2872'),('Audi','800-822-2834'),('BMW','800-831-1117'),('Buick','800-521-7300'),('Cadillac','800-458-8006'),('Chevrolet','800-222-1020'),('Chrysler','800-247-9753'),('Dodge','800-423-6343'),('Ferrari','201-816-2600'),('Fiat','888-242-6342'),('Ford','800-392-3673'),('Genesis','800-633-5151'),('GMC','800-462-8782'),('Honda','800-999-1009'),('Hummer','800-732-5493'),('Hyundai','800-633-5151'),('Infiniti','800-662-6200'),('Isuzu','800-255-6727'),('Jaguar','800-452-4827'),('Jeep','877-426-5337'),('Kia','800-333-4542'),('Land Rover','800-637-6837'),('Lexus','800-255-3987'),('Lincoln','800-392-3673'),('Maserati','201-816-2600 '),('Mazda','800-222-5500'),('Mercedes-Benz','800-367-6372'),('MINI','800-275-6464'),('Mitsubishi','800-222-0037'),('Nissan','800-647-7261'),('Oldsmobile','800-442-6537'),('Plymouth','800-247-9753'),('Pontiac','800-762-2737'),('Porsche','800-767-7243'),('Ram','866-726-4636'),('Rolls-Royce','877 671 3039'),('smart','800-762-7887'),('Subaru','800-782-2783'),('Suzuki','800-934-0934'),('Tesla','877-798-3752'),('Toyota','800-331-4331'),('Volkswagen','800-822-8987'),('Volvo','800-550-5658');
/*!40000 ALTER TABLE `hotline_numbers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-24  5:34:29
