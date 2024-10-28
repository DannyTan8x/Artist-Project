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
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(45) NOT NULL,
  `staff_department` varchar(45) DEFAULT NULL,
  `staff_username` varchar(45) DEFAULT NULL,
  `staff_password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `staff_username_UNIQUE` (`staff_username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Orange Chen','Managerment','3060301','$2a$10$yAJ4D12r7MnESOTEhjifsu1U9WadkO5C2SFcEGBBZKyZ7ibRn4Uzi',1),(2,'Danny','Managerment','3060302','$2a$10$OwODKw8k26cLqKcdZyCeJeel74m3xhv95n3svD9tTqIpgB4p0c0z2',1),(3,'Evance','Managerment','3060303','$2a$10$SYkIUwyal5Bb3UkqCK5KGuLSwdQ1D.CCRmFS5hlEsYs1xnoH8NXN2',1),(4,'Jack','Managerment','3060304','$2a$10$1rGo0QeFcnqSPiGuVMwFL.844OQRI6yALICubuvyNHNy/gaOS41vm',1),(5,'Wenyang','Managerment','3060305','$2a$10$LJWPDiAvnO5v9tzsZgcQ5.BJZ3V5io1WNMicwjxKVNR6K1q3yVW92',1),(6,'Marry','Packing','3060306','$2a$10$LpsGkuIDH4lFCARHqLSCMOIbH.WF7I5jSQFYLdIMA39PK03J4P7De',2),(7,'John','Packing','3060307','$2a$10$ZhOfbRxh1BlIlHWe3Ea3vOCJT.OvhwO572yL57Mbi/DYXSgXbgIT6',2),(8,'Vicky','Packing','3060308','$2a$10$Ojfgky0ETJEVzzh4YmmzquSQSJJnSHKQMJX8aLU3/yxFHYVwGFcu6',2),(9,'Allen','Delivery','3060309','$2a$10$DUiQYJNnoluF.bQ2QwbGkePzn1x11fWffsbMsuo2N1/J/47.v420.',3),(10,'Tom','Delivery','3060310','$2a$10$NUb2.fUK2eNI/AsN4be5WeH6G9i6pE28nCqY3zUF4XxY9qqfUeprm',3);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
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
