-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: ספטמבר 09, 2021 בזמן 03:47 PM
-- גרסת שרת: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `third_project`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `folows`
--

CREATE TABLE `folows` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Vecation_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `folows`
--

INSERT INTO `folows` (`ID`, `User_ID`, `Vecation_ID`) VALUES
(47, 11, 10),
(51, 10, 14),
(54, 10, 15);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `User_ID` int(11) NOT NULL,
  `First_Name` varchar(150) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` int(200) NOT NULL,
  `Admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`User_ID`, `First_Name`, `Last_Name`, `username`, `password`, `Admin`) VALUES
(2, 'שלומי', 'ביי', 'ron', 123123, 1),
(10, 'שלומי', 'דויטש', 'שלומי', 1212, 0),
(11, 'אסתי', 'דויטש', 'אסתי', 1212, 0);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `vecations`
--

CREATE TABLE `vecations` (
  `Vecation_ID` int(11) NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Place` varchar(100) NOT NULL,
  `Price` int(11) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Image_Name` varchar(50) NOT NULL,
  `Folows` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `vecations`
--

INSERT INTO `vecations` (`Vecation_ID`, `Name`, `Place`, `Price`, `Start_Date`, `End_Date`, `Image_Name`, `Folows`) VALUES
(10, 'Amazing!!', 'France', 780, '2021-08-08', '2021-08-24', '10.jpg', 1),
(14, 'צביקי', 'בני ברק', 120, '2021-09-13', '2021-09-20', '14.jpg', 1),
(15, 'pppppp', 'בני ברק', 120, '2021-09-01', '2021-09-29', '728817f1-3160-45cd-a157-a918440cf68a.jpg', 1);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `folows`
--
ALTER TABLE `folows`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Vecation_ID` (`Vecation_ID`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_ID`);

--
-- אינדקסים לטבלה `vecations`
--
ALTER TABLE `vecations`
  ADD PRIMARY KEY (`Vecation_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `folows`
--
ALTER TABLE `folows`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vecations`
--
ALTER TABLE `vecations`
  MODIFY `Vecation_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `folows`
--
ALTER TABLE `folows`
  ADD CONSTRAINT `folows_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`),
  ADD CONSTRAINT `folows_ibfk_2` FOREIGN KEY (`Vecation_ID`) REFERENCES `vecations` (`Vecation_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
