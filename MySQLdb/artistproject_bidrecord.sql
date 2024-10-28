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
-- Table structure for table `bidrecord`
--

DROP TABLE IF EXISTS `bidrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bidrecord` (
  `bid_id` bigint NOT NULL AUTO_INCREMENT,
  `painting_id` varchar(45) NOT NULL,
  `bidder_id` varchar(45) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `bid_time` datetime NOT NULL,
  `bid_amount` double NOT NULL,
  `is_winning_bid` bit(1) NOT NULL,
  `deposit` double DEFAULT NULL,
  `deposit_status` varchar(255) DEFAULT NULL,
  `refund_date` datetime DEFAULT NULL,
  `refund_amount` double DEFAULT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `fk_painting_idx` (`painting_id`),
  KEY `fk_customer_idx` (`bidder_id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`bidder_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `fk_painting` FOREIGN KEY (`painting_id`) REFERENCES `paintings` (`painting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bidrecord`
--

LOCK TABLES `bidrecord` WRITE;
/*!40000 ALTER TABLE `bidrecord` DISABLE KEYS */;
INSERT INTO `bidrecord` VALUES (1,'PT0001','CU0004','Auction closed','2024-10-13 00:03:08',1100,_binary '\0',110,'refunded','2024-10-13 00:04:24',110),(2,'PT0002','CU0004','Auction closed','2024-10-13 00:03:13',1100,_binary '\0',110,'refunded','2024-10-13 00:04:27',110),(3,'PT0005','CU0004','Auction closed','2024-10-13 00:03:19',1500,_binary '\0',150,'refunded','2024-10-13 00:04:38',150),(6,'PT0003','CU0006','Auction closed','2024-10-13 00:04:20',2000,_binary '',200,'pending',NULL,0),(7,'PT0001','CU0006','Auction closed','2024-10-13 00:04:24',2000,_binary '\0',200,'refunded','2024-10-13 00:06:45',200),(8,'PT0002','CU0006','Auction closed','2024-10-13 00:04:27',2000,_binary '',200,'pending',NULL,0),(9,'PT0004','CU0006','Auction closed','2024-10-13 00:04:29',2000,_binary '',200,'pending',NULL,0),(10,'PT0005','CU0006','Auction closed','2024-10-13 00:04:38',2000,_binary '\0',200,'refunded','2024-10-13 00:04:59',200),(11,'PT0005','CU0006','Auction closed','2024-10-13 00:04:59',2200,_binary '',220,'pending',NULL,0),(13,'PT0001','CU0006','Auction closed','2024-10-13 00:07:08',2400,_binary '\0',240,'refunded','2024-10-13 00:08:09',240),(15,'PT0001','CU0006','Auction closed','2024-10-13 00:15:25',3500,_binary '',350,'pending',NULL,0),(32,'PT0011','CU0004','Auction closed','2024-10-13 21:23:20',2000,_binary '\0',200,'refunded','2024-10-15 22:51:08',200),(33,'PT0012','CU0004','Auction closed','2024-10-13 22:45:44',2000,_binary '\0',200,'refunded','2024-10-15 11:31:07',200),(34,'PT0013','CU0004','Auction closed','2024-10-13 22:49:20',2000,_binary '',200,'pending',NULL,0),(35,'PT0014','CU0004','Auction closed','2024-10-13 22:49:43',2000,_binary '',200,'pending',NULL,0),(36,'PT0062','CU0004','Auction closed','2024-10-15 10:07:45',2000,_binary '',200,'pending',NULL,0),(37,'PT0012','CU0004','Auction closed','2024-10-15 11:31:07',3000,_binary '\0',300,'refunded','2024-10-15 11:31:51',300),(38,'PT0012','CU0004','Auction closed','2024-10-15 11:31:51',10000,_binary '\0',1000,'refunded','2024-10-15 11:40:18',1000),(39,'PT0012','CU0004','Auction closed','2024-10-15 11:40:18',10100,_binary '\0',1010,'refunded','2024-10-15 11:41:04',1010),(40,'PT0012','CU0004','Auction closed','2024-10-15 11:41:04',10200,_binary '\0',1020,'refunded','2024-10-15 11:41:18',1020),(41,'PT0012','CU0004','Auction closed','2024-10-15 11:41:18',10300,_binary '\0',1030,'refunded','2024-10-15 11:53:20',1030),(42,'PT0012','CU0004','Auction closed','2024-10-15 11:53:20',10350,_binary '\0',1035,'refunded','2024-10-15 13:07:12',1035),(43,'PT0015','CU0004','Auction closed','2024-10-15 12:51:07',50,_binary '\0',5,'refunded','2024-10-15 12:51:50',5),(44,'PT0015','CU0004','Auction closed','2024-10-15 12:51:50',100,_binary '\0',10,'refunded','2024-10-15 12:52:15',10),(45,'PT0015','CU0004','Auction closed','2024-10-15 12:52:15',150,_binary '\0',15,'refunded','2024-10-15 12:52:37',15),(46,'PT0015','CU0004','Auction closed','2024-10-15 12:52:37',200,_binary '\0',20,'refunded','2024-10-15 12:58:10',20),(47,'PT0015','CU0004','Auction closed','2024-10-15 12:58:10',250,_binary '\0',25,'refunded','2024-10-15 13:00:18',25),(48,'PT0015','CU0004','Auction closed','2024-10-15 13:00:18',300,_binary '\0',30,'refunded','2024-10-15 13:00:32',30),(49,'PT0015','CU0004','Auction closed','2024-10-15 13:00:32',350,_binary '\0',35,'refunded','2024-10-15 13:52:32',35),(50,'PT0012','CU0004','Auction closed','2024-10-15 13:07:12',10400,_binary '\0',1040,'refunded','2024-10-15 13:07:23',1040),(51,'PT0012','CU0004','Auction closed','2024-10-15 13:07:23',10450,_binary '\0',1045,'refunded','2024-10-15 13:08:20',1045),(52,'PT0012','CU0004','Auction closed','2024-10-15 13:08:20',10500,_binary '\0',1050,'refunded','2024-10-15 13:08:38',1050),(53,'PT0012','CU0004','Auction closed','2024-10-15 13:08:38',10550,_binary '\0',1055,'refunded','2024-10-15 13:09:19',1055),(54,'PT0012','CU0004','Auction closed','2024-10-15 13:09:19',10600,_binary '\0',1060,'refunded','2024-10-15 13:51:35',1060),(55,'PT0012','CU0007','Auction closed','2024-10-15 13:51:35',11000,_binary '',1100,'pending',NULL,0),(56,'PT0015','CU0007','Auction closed','2024-10-15 13:52:32',1500,_binary '',150,'pending',NULL,0),(57,'PT0011','CU0007','Auction closed','2024-10-15 22:51:08',2200,_binary '',220,'pending',NULL,0),(58,'PT0010','CU0002','Auction closed','2024-10-17 00:15:24',3000,_binary '',300,'pending',NULL,0),(59,'PT0017','CU0006','In Bidding','2024-10-18 17:56:38',6050,_binary '\0',605,'refunded','2024-10-18 18:10:16',605),(60,'PT0017','CU0006','In Bidding','2024-10-18 18:10:16',6150,_binary '\0',615,'refunded','2024-10-27 11:43:15',615),(61,'PT0027','CU0002','In Bidding','2024-10-27 11:39:50',20150,_binary '',2015,'pending',NULL,0),(62,'PT0017','CU0002','In Bidding','2024-10-27 11:43:15',6300,_binary '',630,'pending',NULL,0);
/*!40000 ALTER TABLE `bidrecord` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 10:26:17
