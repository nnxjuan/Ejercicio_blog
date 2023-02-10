-- -------------------------------------------------------------
-- TablePlus 5.3.0(486)
--
-- https://tableplus.com/
--
-- Database: Blog
-- Generation Time: 2023-02-10 11:30:10.1110
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
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `articles` (`id`, `title`, `content`, `img`, `date`, `comment`, `authorId`) VALUES
(1, 'Post Ambient', 'I’ve seen the ambient wave rise over the past 5ish years. It has been a nice ride with many new personalities putting out great music. What will this somewhat ambiguous genre turn into next?\n\nI’d like to hear the community’s take on what “Ambient” might turn into or perhaps what new aesthetic preferences will be the next popular (in our community at least) form of expression.\n\nIf there are some artists doing something like this already, please post some recommendations!', 'https://f4.bcbits.com/img/a1321067222_16.jpg', '2023-02-09', 'i’ve been waiting for Minimal Grunge to catch on for years. I think the time is now.', 1),
(2, 'The Tiny Studio Corner Thread', 'I’ve got a pretty basic setup in my atelier/home - a couch, a table, a bed. I usually work on both my painting practice and my music at the same time and tend to view them as two complementary elements of my practice. I’ll sit and make some semi-generative droney thing and let it run for a while while stretching canvases or painting, then when I’m tired of that I’ll sit down and continue working on the sound work. It’s a lazily productive way of working.', 'https://llllllll.co/uploads/default/original/3X/9/4/94c9bf44790bc794036eeb878d12fe03205b982f.jpeg', '2022-07-09', 'Great! I have a similar situation in my living room. I love how my kid inspires me to be playful and how music making inspires her to create.', 2),
(3, 'Max/MSP, Max4Live, & RNBO (the thread)', 'if i would use max 8.x for coding i would have 3 packages for MAX, MSP and JIT, each with their own helpfiles in the package.\n\nwhat i often do i that i have the same helpfile for a whole group of objects.\n\nfor example for 20 different flavours of range mapping or the stereo and the mono version of a filter i will only have one.\n', 'https://llllllll.co/uploads/default/original/3X/c/a/caac212891c83451f04bba88ceab03e77206b75b.jpeg', '2023-02-09', 'Apparently this is actually coming out this month!', 1),
(4, 'Film and Alt-Process Photography', 'Saw in the Art thread some mention of starting a thread on film photography (@sonicstructure, @philmaguire) Would love to see and hear more on what folks are doing/have done in this area.\n\nI do stuff with 35mm, 120, and a dwindling stock of fuji pack film, making prints as well as cyanotypes and gum prints, though not as much as I’d like.\n\nStill very new to this forum and hope I’m not overstepping with this…!', 'https://llllllll.co/uploads/default/original/2X/1/19b1799582975a0695d5cc99e7b8e98318d48930.JPG', '2023-02-05', 'Gonna scan some prints to post. I kinda hate scanning and seriously slack on it.', 2);

INSERT INTO `authors` (`id`, `firstname`, `lastname`, `mail`) VALUES
(1, 'Marcus', 'Fisher', 'marcus@gmail.com'),
(2, 'Pedro', 'Perez', 'pedro@gmail.com');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;