CREATE DATABASE  IF NOT EXISTS `photoTouristBD` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `photoTouristBD`;
-- MySQL dump 10.13  Distrib 5.5.55, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: photoTouristBD
-- ------------------------------------------------------
-- Server version	5.5.55-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `camtourist`
--

DROP TABLE IF EXISTS `camtourist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `camtourist` (
  `id` int(11) NOT NULL,
  `punto_interes` varchar(45) NOT NULL,
  `categoria` varchar(40) NOT NULL,
  `ciudad` varchar(40) NOT NULL,
  `provincia` varchar(40) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_final` time NOT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `descripcion` varchar(140) NOT NULL,
  `principal` bit(1) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camtourist`
--

LOCK TABLES `camtourist` WRITE;
/*!40000 ALTER TABLE `camtourist` DISABLE KEYS */;
INSERT INTO `camtourist` VALUES (1,'Sagrada Familia','Catedral','Barcelona','Barcelona','España','08:30:00','20:00:00',41.4039,2.17386,'Catedral del famoso arquitecto Antoni Gaudi','\0','https://lh4.googleusercontent.com/-_QcZXMuJatc/WBMJP9GvWEI/AAAAAAAABcU/On9DmigoyiIqjR8Hw0ox4Igu3UU0F1QYwCLIB/s408-k-no/'),(2,'Camp Nou','Deportes','Barcelona','Barcelona','España','08:30:00','22:00:00',41.3809,2.12063,'El estadio del FCB fue inaugurado en 1957. Con casi 100 mil espectadores, es el de mas capacidad de Europa.','','http://lh6.googleusercontent.com/-hKu_rPMHyPU/VYFCW_D4kRI/AAAAAAAAAE4/LopSzhfTm6EO__SBaWP9PtK--VVoftFjACJkC/s408-k-no/\n'),(3,'Campanar Santa Maria','Iglesia','Ontinyent','Valencia','España','08:30:00','22:00:00',38.8206,-0.610453,'Segundo campanario mas alto de Espanya','','https://lh6.googleusercontent.com/-EUL8Ne9QCqQ/WFF5gV8dDBI/AAAAAAAABqo/CsLBTv4tmG82t-WwMEpq7X_5ERTQcMzCwCLIB/s408-k-no/'),(4,'Balcon del Mediterraneo','Panorama','Benidorm','Alicante','España','09:30:00','23:00:00',38.5341,-0.130908,'Probablemente el mejor mirador del Mediterraneo.','\0','https://lh5.googleusercontent.com/-Y4TBbCg9nEc/WCx_w1ps-wI/AAAAAAAAASM/wuDcRx-kDeMQjsa6N8CsAIZPtyKq2V0CACLIB/s426-k-no/'),(5,'Mezquita de Cordoba','Catedral','Cordoba','Cordoba','España','10:00:00','20:00:00',37.8793,-4.77882,'Es el monumento más importante de todo el Occidente islámico y uno de los más asombrosos del mundo.','','https://lh5.googleusercontent.com/-5iCO_RobUvE/V_Z4UfoxESI/AAAAAAAArLU/02TgmTsPd9IksayAA2XoW_YUW9M_L7hcgCLIB/s408-k-no/'),(6,'Alcazar de Cordoba','Fortaleza','Cordoba','Cordoba','España','10:00:00','18:00:00',37.876,-4.78236,'Fortaleza y palacio de sólidos muros, encierra en su interior gran parte de la evolución arquitectónica de Córdoba.','\0','https://lh6.googleusercontent.com/-YeJLaBIE4ZM/VwNaBIGhPII/AAAAAAAAHeo/lSEEvuDedmEuzmFlGvS0-qMNi8fuvkNLgCLIB/s408-k-no/'),(7,'Alhambra de Granada','','Granada','Granada','España','10:00:00','19:00:00',37.1769,-3.58988,'La Alhambra es la ciudad palatina andalusí más bella del mundo.','\0','https://lh5.googleusercontent.com/-lrgAxTdedEE/V0KfNaRmYlI/AAAAAAAALFk/1OA1jtQT11EsvNeXkRkhAVjr1r-zQGt4ACJkC/s408-k-no/'),(8,'Barrio El Realejo','Panorama','Granada','Granada','España','11:00:00','22:00:00',37.1745,-3.59732,'Es un barrio muy poblado y que tiene en el entramado de sus calles un sabor propio y una vida vecinal muy activa.','\0','https://lh4.googleusercontent.com/proxy/4_z3HPRMesDBZqcLjbVPisiF6f_hY6qYXz3x2a23eVb7uSaJpaIapS9UosEOS8M1NdvJFoK0FNPjP9GKUvfruh4Flqhx1A=w455-h256'),(9,'Gran Via','Panorama','Madrid','Madrid','España','10:00:00','21:00:00',40.4199,-3.70117,'La calle más famosa de Madrid. Los primeros bocetos datan de 1862.','','https://lh3.googleusercontent.com/proxy/GZR9OnsL3W7UbKET49hkeCQv_8m4VAg6Zhp1VzBuEbg8aas3-Eb7phQOR7Fs7YGxfJ-Hs9WR04R9s27eodXmIdz_nhAaOo8=w408-h300'),(10,'Palacio Real','Palacio','Madrid','Madrid','España','09:00:00','19:00:00',40.4185,-3.71554,'El Palacio Real de Madrid es la residencia oficial de la Familia Real Española. ','\0','https://lh5.googleusercontent.com/-N_kKQrEkUY4/VI4NcDyuo0I/AAAAAAAACJ4/IsR-6bcHtYAH8n6AwmnmH-82EgIU26jeQCJkC/s408-k-no/'),(11,'Torre del Oro','Torre','Sevilla','Sevilla','España','10:00:00','19:00:00',37.3822,-5.99635,'El emblema de Sevilla. Recibe este nombre porque antiguamente estaba revestida de azulejos dorados','\0','https://lh4.googleusercontent.com/-9A2liLjaRTI/V7dgkkT6P_I/AAAAAAAABcc/lNP1jm213Rs02J8c-jUE4fdcUvt7nVOngCLIB/s426-k-no/'),(12,'Plaza de España','Plaza','Sevilla','Sevilla','España','09:00:00','22:00:00',37.3771,-5.98656,'La plaza de España de Sevilla configura uno de los espacios más espectaculares de la arquitectura regionalista.','','https://lh3.googleusercontent.com/-rL_nfXzbRsE/V9f8cmsP-QI/AAAAAAAABio/GWMYWkTrNek3rnuQteDim8WJv5DprolBACJkC/s455-k-no/'),(13,'Triana','Panorama','Sevilla','Sevilla','España','10:00:00','19:30:00',37.3851,-6.00363,'El clásico barrio sevillano situado a otro lado del río Guadalquivir.','\0','https://lh6.googleusercontent.com/proxy/l7rRMojDzjXaOTilQK4sqYYVP3ZJ5-sWOjFSAVS_BYHNA__FVFsWwMJynQdJVMxZ8Pa1xs1FTOEJdOCbXS_QWUtfdcq1DJE=w563-h256'),(14,'Alcazar de Toledo','Fortaleza','Toledo','Toledo','España','09:30:00','18:30:00',39.8576,-4.02106,'El Alcázar de Toledo es una fortificación sobre rocas, ubicada en la parte más alta de la ciudad de Toledo.','','https://lh4.googleusercontent.com/proxy/wwemgVQV75tNVd603ZiBnob2uIQYScOlTvs2mbwV8xAcvgaIXNI3WZ2pyG1l89jJoYdZGQ07YR0j-1PWOocBHk8LJbWZMui9vhCg2hucGKWbA14lXxXGRbFU7FnTWFvy0ctmL9OaRYfnqvh8dib3cYDG1FIKd0I=');
/*!40000 ALTER TABLE `camtourist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `idPhotos` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(45) NOT NULL,
  `Path` varchar(250) NOT NULL,
  `token` varchar(250) NOT NULL,
  PRIMARY KEY (`idPhotos`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL DEFAULT '',
  `address` varchar(100) DEFAULT NULL,
  `user` varchar(50) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `activado` tinyint(4) DEFAULT NULL,
  `token` varchar(150) DEFAULT NULL,
  `id_facebook` int(25) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cp` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Pedro','','wozniak@hihi.es','','','$2y$10$.tho9j7ZPUvUxTQeii.e5.a42C/iM8QGwWWxjiTnEMca5qYhzj6Fq','https://www.gravatar.com/avatar/8445ae66763802e315dc48322656e7be8445ae66763802e315dc48322656e7be?s=400&d=identicon&r=g','client',0,'Ver6e2bfbcad3f8b70c437bc5dfec361f45',NULL,2,NULL),(NULL,NULL,'vidijds@hfjf.es',NULL,NULL,'$2a$08$bQtr2GVmcYqQDbktv4q92OMqHtCJnPnKjjfZK/nPaizhK7C1weO/C',NULL,NULL,NULL,NULL,NULL,3,NULL),(NULL,NULL,'vieslo82@gmail.com',NULL,NULL,'$2a$08$bo26iQD39WL8LjGiRN1Sx.ZVaGSsYt1Cj16wcaeaSgim1tz5zbyCG',NULL,NULL,NULL,NULL,NULL,4,NULL),('Vicent','Esparza','vieslo@hotmail.es','Av Almaig 8',NULL,'$2a$08$Z7TEINfp7MJ9rF3hzNWezOGC5yK1648qCOQm37Ulev.nCnO8v9YMK','foto-1494265499702.png',NULL,NULL,'0f2f9c132bb2a3b43b24333d79aa6286b411c615',2147483647,10,'46870');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-11 19:29:37
