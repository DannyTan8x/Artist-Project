CREATE DATABASE  IF NOT EXISTS `artistproject` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `artistproject`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: artistproject
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `deliveryorders`
--

DROP TABLE IF EXISTS `deliveryorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryorders` (
  `delivery_number` varchar(255) NOT NULL,
  `create_date` datetime NOT NULL,
  `status` varchar(45) NOT NULL,
  `att_name` varchar(255) NOT NULL,
  `att_phone` varchar(255) NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `delivery_instrictions` varchar(255) NOT NULL,
  `delivery_fee` int NOT NULL,
  `total_amount` int NOT NULL,
  `package_staff` varchar(45) DEFAULT NULL,
  `delivery_staff` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`delivery_number`),
  KEY `staff_idx` (`package_staff`,`delivery_staff`),
  KEY `package_staff_idx` (`package_staff`),
  KEY `delivery_staff_idx` (`delivery_staff`),
  CONSTRAINT `delivery_staff` FOREIGN KEY (`delivery_staff`) REFERENCES `staff` (`staff_username`),
  CONSTRAINT `pack_staff` FOREIGN KEY (`package_staff`) REFERENCES `staff` (`staff_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryorders`
--

LOCK TABLES `deliveryorders` WRITE;
/*!40000 ALTER TABLE `deliveryorders` DISABLE KEYS */;
INSERT INTO `deliveryorders` VALUES ('DO202410220024','2024-10-22 14:01:05','待處理','John Doe','1234567890','123 Main St','Leave at the front door',50,1500,'3060301','3060301'),('DO202410220025','2024-10-22 14:03:40','待處理','John Doe','1234567890','123 Main St','Leave at the front door',50,1500,NULL,NULL),('DO202410250001','2024-10-25 16:02:26','待處理','E.K','+88622222','1010 Road, Villagetown, Country','快送來',120,2700,NULL,NULL);
/*!40000 ALTER TABLE `deliveryorders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 10:26:16
