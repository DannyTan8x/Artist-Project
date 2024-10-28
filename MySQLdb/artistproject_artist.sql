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
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `artist_id` varchar(10) NOT NULL,
  `artist_name` varchar(255) DEFAULT NULL,
  `desciption` varchar(1024) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`artist_id`),
  UNIQUE KEY `artis_name_UNIQUE` (`artist_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES ('AR0001','Giovanni Antonio Boltraffio','Giovanni Antonio Boltraffio (1467–1516) was an Italian Renaissance painter from Milan. A pupil of Leonardo da Vinci, Boltraffio is best known for his religious paintings and portraits. His works, influenced by his master, showcase delicate handling of light and shadow, as well as fine detail in his depictions of human figures. Notable works include The Madonna and Child and various portraits of Milanese nobility. Boltraffio\'s art represents a blend of Leonardo’s techniques with his own distinctive, gentle style.','https://en.wikipedia.org/wiki/Giovanni_Antonio_Boltraffio'),('AR0002','Edvard Munch','Edvard Munch (1863–1944) was a Norwegian painter and printmaker, best known for his iconic painting The Scream. Munch\'s work is associated with Symbolism and is seen as a precursor to Expressionism. His art often explored themes of anxiety, death, and existential dread, reflecting personal tragedies and struggles he experienced throughout his life. The Scream, in particular, has become a symbol of modern existential angst. Munch\'s influence on 20th-century art is profound, with his psychological depth and innovative use of color and form impacting numerous modern and contemporary artists.','https://en.wikipedia.org/wiki/Edvard_Munch'),('AR0003','Johannes Vermeer','Johannes Vermeer (1632–1675) was a Dutch Baroque painter, renowned for his masterful treatment of light and domestic interior scenes of middle-class life. Vermeer\'s most famous works include Girl with a Pearl Earring, The Milkmaid, and The Art of Painting. His use of subtle lighting, meticulous detail, and serene atmosphere in his paintings has made him one of the most celebrated artists of the Dutch Golden Age. Although Vermeer was not widely recognized during his lifetime, his work gained immense appreciation in the 19th century and is now highly regarded for its beauty and precision.','https://en.wikipedia.org/wiki/Johannes_Vermeer'),('AR0004','Katsushika Hokusai','Katsushika Hokusai (1760–1849) was a Japanese ukiyo-e painter and printmaker of the Edo period, best known for his iconic series Thirty-Six Views of Mount Fuji, which includes the world-renowned The Great Wave off Kanagawa. Hokusai\'s work spans a wide range of subjects, including landscapes, flora, fauna, and even supernatural themes. He was a prolific artist, creating thousands of works throughout his lifetime and significantly influencing Western art, particularly the Impressionist movement. Hokusai\'s innovative compositions, use of color, and dynamic portrayals of nature continue to be celebrated globally.','https://en.wikipedia.org/wiki/Hokusai'),('AR0005','Claude Monet','Claude Monet (1840–1926) was a French painter and one of the founders of the Impressionist movement, which revolutionized the art world in the late 19th century. Monet\'s approach emphasized light and color over detail, and he often painted the same scene multiple times to capture changing atmospheric conditions, such as in his famous series Water Lilies and Haystacks. His painting Impression, Sunrise gave the Impressionist movement its name. Monet\'s innovative techniques and exploration of natural light had a profound influence on modern art.','https://en.wikipedia.org/wiki/Claude_Monet'),('AR0006','Gustave Dore','Gustave Doré (1832–1883) was a French artist, printmaker, illustrator, and sculptor, widely known for his detailed and dramatic engravings. Doré\'s illustrations have adorned many classic literary works, such as Dante\'s Divine Comedy, Cervantes\' Don Quixote, and the Bible. His ability to capture grand and intricate scenes made him one of the most celebrated illustrators of the 19th century. His works are renowned for their high contrast, dramatic lighting, and dynamic compositions. Doré\'s legacy continues to influence both literary and visual arts.','https://en.wikipedia.org/wiki/Gustave_Dor%C3%A9'),('AR0007','Henri Matisse','Henri Matisse (1869–1954) was a French artist known for his use of vibrant color and innovative forms, and is considered one of the most influential figures in modern art. Matisse was a pioneer of Fauvism, a movement that emphasized bold, expressive color. Over his long career, he worked in a variety of media, including painting, sculpture, and paper cutouts. His most famous works include The Dance and The Snail. In his later years, Matisse created a series of cutouts, using colored paper to create large-scale compositions, a technique exemplified by his book Jazz. His work significantly influenced 20th-century art, and his exploration of color continues to inspire contemporary artists.','https://en.wikipedia.org/wiki/Henri_Matisse'),('AR0008','Vincent van Gogh','Vincent van Gogh (1853–1890) was a Dutch Post-Impressionist painter, renowned for his bold use of color, expressive brushwork, and emotional depth. Despite producing over 2,000 works of art, including around 900 paintings, van Gogh only achieved widespread fame posthumously. His most iconic works include The Starry Night, Sunflowers, and Wheatfield with Crows. Van Gogh struggled with mental illness throughout his life, culminating in his tragic death by suicide. Today, he is considered one of the greatest and most influential figures in Western art history.','https://en.wikipedia.org/wiki/Vincent_van_Gogh'),('AR0009','Alphonse Mucha','Alphonse Mucha (1860–1939) was a Czech painter and decorative artist, best known for his distinctive Art Nouveau style. Mucha gained fame in Paris for his elaborate posters, particularly those featuring actress Sarah Bernhardt. His style is characterized by elegant lines, soft pastel colors, and intricate details, often incorporating floral motifs, flowing hair, and stylized figures. Besides posters, Mucha created a variety of works, including jewelry designs, illustrations, and paintings. One of his most significant works is The Slav Epic, a monumental series of paintings celebrating the history of the Slavic people. Mucha\'s art continues to be influential in the realms of graphic design and decorative arts.','https://en.wikipedia.org/wiki/Alphonse_Mucha'),('AR0010','Peter Paul Rubens','Peter Paul Rubens (1577–1640) was a Flemish Baroque painter, renowned for his exuberant style, dynamic compositions, and mastery of color. Rubens is best known for his grand history paintings, portraits, landscapes, and religious scenes, often infused with vitality and emotion. He worked for European nobility, including Philip IV of Spain and Marie de\' Medici of France, and was highly influential in 17th-century art. Some of his most famous works include The Descent from the Cross, The Elevation of the Cross, and The Three Graces. Rubens was also a diplomat, combining his artistic career with political missions across Europe.','https://en.wikipedia.org/wiki/Peter_Paul_Rubens');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
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
