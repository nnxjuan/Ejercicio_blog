-- -------------------------------------------------------------
-- TablePlus 5.3.0(486)
--
-- https://tableplus.com/
--
-- Database: Blog
-- Generation Time: 2023-02-13 14:42:15.8820
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date DEFAULT NULL,
  `commentId` int DEFAULT NULL,
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_commentId_foreign_idx` (`commentId`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `articles_ibfk_197` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `articles_ibfk_198` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `articleId` int DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_articleId_foreign_idx` (`articleId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `articles` (`id`, `title`, `content`, `img`, `date`, `commentId`, `authorId`) VALUES
(1, 'Post Ambient', 'I’ve seen the ambient wave rise over the past 5ish years. It has been a nice ride with many new personalities putting out great music. What will this somewhat ambiguous genre turn into next?\n\nI’d like to hear the community’s take on what “Ambient” might turn into or perhaps what new aesthetic preferences will be the next popular (in our community at least) form of expression.\n\nIf there are some artists doing something like this already, please post some recommendations!', '1.jpg', '2023-02-09', 9, 1),
(2, 'The Tiny Studio Corner Thread', 'I’ve got a pretty basic setup in my atelier/home - a couch, a table, a bed. I usually work on both my painting practice and my music at the same time and tend to view them as two complementary elements of my practice. I’ll sit and make some semi-generative droney thing and let it run for a while while stretching canvases or painting, then when I’m tired of that I’ll sit down and continue working on the sound work. It’s a lazily productive way of working.', '1.jpg', '2022-07-09', 9, 2),
(3, 'Max/MSP, Max4Live, & RNBO (the thread)', 'if i would use max 8.x for coding i would have 3 packages for MAX, MSP and JIT, each with their own helpfiles in the package.\n\nwhat i often do i that i have the same helpfile for a whole group of objects.\n\nfor example for 20 different flavours of range mapping or the stereo and the mono version of a filter i will only have one.\n', '1.jpg', '2023-02-09', 9, 1),
(4, 'Film and Alt-Process Photography', 'Saw in the Art thread some mention of starting a thread on film photography (@sonicstructure, @philmaguire) Would love to see and hear more on what folks are doing/have done in this area.\n\nI do stuff with 35mm, 120, and a dwindling stock of fuji pack film, making prints as well as cyanotypes and gum prints, though not as much as I’d like.\n\nStill very new to this forum and hope I’m not overstepping with this…!', '1.jpg', '2023-02-05', 9, 1),
(14, 'Hola!', 'Articulo nuevo', '10f04a45685dfc257065f2100.jpeg', '2023-02-13', NULL, 1),
(15, 'Ejemplo', 'I’ve seen the ambient wave rise over the past 5ish years. It has been a nice ride with many new personalities putting out great music. What will this somewhat ambiguous genre turn into next?I’d like to hear the community’s take on what “Ambient” might turn into or perhaps what new aesthetic preferences will be the next popular (in our community at least) form of expression.If there are some artists doing something like this already, please post some recommendations!', 'a672f3d73df36072cd6532e00.jpeg', '2023-02-13', NULL, 1),
(16, 'Joselo', 'I’ve seen the ambient wave rise over the past 5ish years. It has been a nice ride with many new personalities putting out great music. What will this somewhat ambiguous genre turn into next?I’d like to hear the community’s take on what “Ambient” might turn into or perhaps what new aesthetic preferences will be the next popular (in our community at least) form of expression.If there are some artists doing something like this already, please post some recommendations!', 'd06b2d9c10baa4d1f7b2d1200.jpeg', '2023-02-13', NULL, 1),
(17, 'Nuevo Herni', 'Articulo nuevo', 'ddbc9e2d4d7dfc3458b197a00.jpeg', '2023-02-13', NULL, 1);

INSERT INTO `authors` (`id`, `firstname`, `lastname`, `mail`) VALUES
(1, 'Marcus', 'Fisher', 'marcus@gmail.com'),
(2, 'Pedro', 'Perez', 'pedro@gmail.com');

INSERT INTO `comments` (`id`, `text`, `name`, `articleId`, `date`) VALUES
(9, 'Hola!', 'Juan Francisco Nanio', 1, '2023-02-11'),
(10, 'ghghjfjgfjgfjgfjg', 'jose', 1, '2023-02-12'),
(11, 'Muy bueno!', 'Juan', NULL, '2023-02-13'),
(12, 'Hola!', 'Juan Francisco Nanio', 14, '2023-02-13'),
(13, 'Muy bueno!', 'Jose', 14, '2023-02-13');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;