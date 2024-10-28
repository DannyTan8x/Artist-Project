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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `credit_card_no` varchar(255) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `bank_balance` double DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('CU0001','Artist','Artist','09123','artistjava2024@gmail.com','Taipei','$2a$10$Pn/4IzbphR0rgmNwB8EoaukPeiUw1DZdRsaBYtbzYyjEBgjDS9HbW','1234','823 Nextbank',0),('CU0002','E.K','EK','+88622222','tiredevance.k@gmail.com','1010 Road, Villagetown, Country','$2a$10$gyIcWFt8xfun0dYmDT6X..bKJkp5fudPBI7FmUbscNAR0/nDBvyNO','1234','823 Nextbank',0),('CU0003','John Doe','Johnny','123-456-7890','test@test.comxx','123 Main St','$2a$10$QmHgGxTdfV/c0vLA1eE4..MLD1RiJN/eCv90hBmz0iDG34tlXERhi','4111111111111111','823 Nextbank',0),('CU0004','tester1','tester1','0909999999','tester1@email.comxx','no where','$2a$10$yTLSDDXOeUTPZeeMOqV4UuNRGu23cCz3A8ch5h8lFquuc3HjEtYxm',NULL,'823 Nextbank',12375),('CU0005','Allen Doe','Allen Allen','+1234567890','Allen.test@example.comxx','123  St, Cityville, Country','$2a$10$inlt/9Mh6zr1m528KpzV.OAp0K2N3MCkjTCKkqFIQF16dsBNAj2km','4111111111111111','823 Nextbank',0),('CU0006','Emily Davis','Em','+2233445566','emily.davis@example.comxx','1010 Road, Villagetown, Country','$2a$10$tP2sPWjGSq5LoXM0Ux8./ukCumt1VYbKxSbPl0n9fPZeHhiMedcHm','1234123412341234','006,合作金庫商業銀行',1860),('CU0007','kk','kk','+88622222','kkk@gmail.comxx','1010 Road, Villagetown, Country','$2a$10$gyIcWFt8xfun0dYmDT6X..bKJkp5fudPBI7FmUbscNAR0/nDBvyNO','1234','823 Nextbank',0),('CU0008','Diane','dianemurphy','+1-555-123-4567','dmurphy@gmail.comxx','123 Maple Street, Boston, MA, USA','$2a$10$dYicF9jfVEKG.MPpk.ltluzpeYtAyeUBF2QIw953IRRUgzIotbz22','4111111111111111','823 Nextbank',0),('CU0009','Mary','marypat','+1-555-234-5678','mpatterso@gmail.comxx','456 Oak Avenue, London, UK','$2a$10$4jbeL5RQk51coUFNSsUu4u.mykxj/SQuZZr8rzCJL.WVqqRCi3T6e','4222222222222222','823 Nextbank',0),('CU0010','Jeff','jeffirelli','+1-555-345-6789','jfirrelli@gmail.comxx','789 Pine Road, Berlin, Germany','$2a$10$uHhk6024rshttPeUPvGSYuIdUBSyz0H8FUsNvua.LWXctRjWUG9ym','4333333333333333','823 Nextbank',0),('CU0011','William','williampatt','+1-555-456-7890','wpatterson@gmail.comxx','101 Elm Street, Paris, France','$2a$10$hNwBfpCfCHpbfP0yTExCdurQh9Uyp3175F/Sw46M0qQ1eidjXAFG6','4444444444444444','823 Nextbank',0),('CU0012','Gerard','gerardbond','+1-555-567-8901','gbondur@gmail.comxx','202 Birch Lane, Madrid, Spain','$2a$10$dn2MeYvlzGSFhq2sj2lHo.bsKtApH8f12MlTm6EIYMXvbyjmIPRp.','4555555555555555','823 Nextbank',0),('CU0013','Anthony','anthonybow','+1-555-678-9012','abow@gmail.comxx','303 Cedar Road, Rome, Italy','$2a$10$1YOPnqq.ROnwg3d3/NmKduhyIDzYyUz1crffh6G.MaoadT19OcQwS','4666666666666666','823 Nextbank',0),('CU0014','Leslie','lesliejennings','+1-555-789-0123','ljennings@gmail.comxx','404 Pine Avenue, Dublin, Ireland','$2a$10$030sVkwP9G9k5ZP0bIZF6ewHY/Ur3plAeNn7EBbBit/jDFpALKKyK','4777777777777777','823 Nextbank',0),('CU0015','Steve','stevepat','+1-555-901-2345','spatterson@gmail.comxx','606 Maple Lane, Amsterdam, Netherlands','$2a$10$v8jpB9lxJ3exzn9OK2R8euPxcteoEUe6nCsuxYSgYDpN1Wb61NKi6','4999999999999999','823 Nextbank',0),('CU0016','Foon Yue','foonfsheng','+1-555-012-3456','ftseng@gmail.comxx','707 Birch Street, Stockholm, Sweden','$2a$10$h3sV3xK2a1KDvwyWRC310OgnLeuZEghwNrKAmIANYrawvdOsj2/8K','4000000000000000','823 Nextbank',0),('CU0017','George','georgevan','+1-555-234-5678','gvanaf@gmail.comxx','808 Cedar Avenue, Brussels, Belgium','$2a$10$A/fSOq9gWd93XzNSOU1T1OWxF/o1G7yYlVm5H8fFL4iI8r9XYX.c2','4111111111111112','823 Nextbank',0),('CU0018','Loui','louibond','+1-555-345-6789','lbondur@gmail.comxx','909 Pine Road, Oslo, Norway','$2a$10$Bbh0EkKVgbrZMg2zipZRsumCRlnB5PgSIKCaA9T6L/hnATYY9A.hi','4222222222222223','823 Nextbank',0),('CU0019','Gerard','gerardhernandez','+1-555-456-7890','ghernande@gmail.comxx','101 Elm Lane, Lisbon, Portugal','$2a$10$a8tBl3CFZRRNw0d5GdC6uOBDBFJgRYYP4ikf55SkfGeuYx6Yn5KVi','4333333333333334','823 Nextbank',0),('CU0020','Pamela','pamelacastillo','+1-555-567-8901','pcastillo@gmail.comxx','202 Birch Street, Helsinki, Finland','$2a$10$O/jhsVte45HRIkMI7IPTk.P2fXlvE6BnEvxTyAKcScCYZTCaAUNSK','4444444444444445','823 Nextbank',0),('CU0021','Larry','larrybott','+1-555-678-9012','lbott@gmail.comxx','303 Cedar Avenue, Prague, Czech Republic','$2a$10$s7lYPMV71AILpf3zLyvLleOpv7jw1GQtEwMlVVYsgJkYF9ZrG.C5S','4555555555555556','823 Nextbank',0),('CU0022','Barry','barryjones','+1-555-789-0123','bjones@gmail.comxx','404 Pine Road, Warsaw, Poland','$2a$10$a7s/EOCbfgJijt6WeCD8cuGu9xc6Rmqet5AfA6U.0LoMjrdJYsYSW','4666666666666667','823 Nextbank',0),('CU0023','Andy','andyfixter','+1-555-890-1234','afixter@gmail.comxx','505 Oak Lane, Zurich, Switzerland','$2a$10$at7Bxc7Qhf7aUvf.AciWge5Pm3LeIuWCZMg.tcqDd8z7u.dGjhbeS','4777777777777778','823 Nextbank',0),('CU0024','Peter','petermarsh','+1-555-901-2345','pmarsh@gmail.comxx','606 Maple Street, Vienna, Austria','$2a$10$2EbNhh6/JBDy4LJxXAGeseysZgKtTPJ8uxKRHOHNj54o7vZjCfb02','4888888888888889','823 Nextbank',0),('CU0025','Tom','tomking','+1-555-012-3456','tking@gmail.comxx','707 Birch Road, Budapest, Hungary','$2a$10$fmOotWeKccK9DFv5ap7CO.To9s31rqZ6h/qwCeB21vB2vU8TJ11s2','4999999999999990','823 Nextbank',0),('CU0026','Orange','OrangeChen','0937','orange@gmail.com','NewTaipeiCity','$2a$10$4qtIJ7JBWYLKt9FVUVZPdeLXqatFhLOCCEIM6MX9laJaeS8uVqk9C',NULL,'823 Nextbank',0),('CU0027','Orange','orange Chen','0908','aqaq888rtrt888@gmail.com','NewTaipeiCity','$2a$10$v57PzFiKzhGzt028aDTRX.zhlrW9d0nlyEm4W8apMAl7y9jSIwV8C','5555555555555555','008,華南商業銀行',0),('CU0028','','','','','','$2a$10$D63U/xSognvPsR/cKPnJ.uOEcV7A24/GLjtgT8RqKCNEOaSLA9gTy',NULL,'823 Nextbank',0);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
