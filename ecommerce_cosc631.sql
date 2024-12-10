-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 10, 2024 at 11:47 PM
-- Server version: 8.0.40-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_cosc631`
--
CREATE DATABASE IF NOT EXISTS `ecommerce_cosc631` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ecommerce_cosc631`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `emailaddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `verification_token` varchar(255) DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `account_order`
--

CREATE TABLE `account_order` (
  `id` int NOT NULL,
  `account_id` int NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `order_total` decimal(10,2) NOT NULL,
  `order_number` varchar(100) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shipment_id` int DEFAULT NULL,
  `order_commission` decimal(10,2) GENERATED ALWAYS AS ((`order_total` * 0.15)) VIRTUAL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int NOT NULL,
  `account_id` int DEFAULT NULL,
  `recipient_name` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip` varchar(50) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `metrics`
-- (See below for the actual view)
--
CREATE TABLE `metrics` (
`account_count` bigint
,`order_count` bigint
,`product_count` bigint
,`seller_count` bigint
);

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int NOT NULL,
  `account_id` int NOT NULL,
  `card_number` varchar(50) NOT NULL,
  `expiration_date` varchar(50) NOT NULL,
  `security_code` varchar(50) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `seller_account_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `brand` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(300) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_percent` decimal(10,2) NOT NULL,
  `stock_on_hand` int NOT NULL,
  `category_id` int NOT NULL,
  `tags` varchar(500) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sale_price` decimal(10,2) GENERATED ALWAYS AS ((`price` - (`price` * (`sale_percent` / 100)))) VIRTUAL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_order`
--

CREATE TABLE `product_order` (
  `id` int NOT NULL,
  `account_order_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `line_total` decimal(10,2) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `revenue`
-- (See below for the actual view)
--
CREATE TABLE `revenue` (
`revenue` decimal(35,4)
,`sold_count` decimal(32,0)
,`total_revenue` decimal(32,2)
);

-- --------------------------------------------------------

--
-- Table structure for table `seller_account`
--

CREATE TABLE `seller_account` (
  `id` int NOT NULL,
  `account_id` int DEFAULT NULL,
  `company_name` varchar(50) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `id` int NOT NULL,
  `address_id` int NOT NULL,
  `shipping_method_id` int NOT NULL,
  `shipment_status` varchar(50) NOT NULL,
  `shipment_date` date NOT NULL,
  `tracking_number` varchar(50) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_method`
--

CREATE TABLE `shipping_method` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure for view `metrics`
--
DROP TABLE IF EXISTS `metrics`;

CREATE ALGORITHM=UNDEFINED DEFINER=`kingnathanal`@`%` SQL SECURITY DEFINER VIEW `metrics`  AS SELECT (select count(0) from `account`) AS `account_count`, (select count(0) from `account_order`) AS `order_count`, (select count(0) from `product`) AS `product_count`, (select count(0) from `seller_account`) AS `seller_count` ;

-- --------------------------------------------------------

--
-- Structure for view `revenue`
--
DROP TABLE IF EXISTS `revenue`;

CREATE ALGORITHM=UNDEFINED DEFINER=`kingnathanal`@`%` SQL SECURITY DEFINER VIEW `revenue`  AS SELECT (select sum(`p`.`quantity`) from (`product_order` `p` join `account_order` `a` on((`a`.`id` = `p`.`account_order_id`))) where (`a`.`order_status` = 'COMPLETED')) AS `sold_count`, (select sum(`account_order`.`order_total`) from `account_order` where (`account_order`.`order_status` = 'COMPLETED')) AS `total_revenue`, (select (sum(`account_order`.`order_total`) * 0.15) from `account_order` where (`account_order`.`order_status` = 'COMPLETED')) AS `revenue` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account_order`
--
ALTER TABLE `account_order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK8gut7w40fiiota2rpyr63s7bv` (`shipment_id`),
  ADD KEY `FKrwakkftq9hw5bgj495jja09a6` (`account_id`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKascogpq8x3gfx04oy2fr6l3i5` (`account_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  ADD KEY `FKjc4xsep1socwm8bn352ei7cxh` (`seller_account_id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6oo0cvcdtb6qmwsga468uuukk` (`product_id`);

--
-- Indexes for table `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKh73acsd9s5wp6l0e55td6jr1m` (`product_id`) USING BTREE,
  ADD KEY `FK79qcspv3fg54kaoap8c17p15l` (`account_order_id`);

--
-- Indexes for table `seller_account`
--
ALTER TABLE `seller_account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK30nmr1y8gc1crqw2b08uscs42` (`account_id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgno01bvlqw27n5jq46s50s0ys` (`address_id`),
  ADD KEY `FK2q3rguby4p1yb59ehnelhxooq` (`shipping_method_id`);

--
-- Indexes for table `shipping_method`
--
ALTER TABLE `shipping_method`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `account_order`
--
ALTER TABLE `account_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_order`
--
ALTER TABLE `product_order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller_account`
--
ALTER TABLE `seller_account`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipment`
--
ALTER TABLE `shipment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_method`
--
ALTER TABLE `shipping_method`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_order`
--
ALTER TABLE `account_order`
  ADD CONSTRAINT `FKmi5gcwumamm3isbr9nydmk2sm` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`),
  ADD CONSTRAINT `FKrwakkftq9hw5bgj495jja09a6` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FKascogpq8x3gfx04oy2fr6l3i5` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKjc4xsep1socwm8bn352ei7cxh` FOREIGN KEY (`seller_account_id`) REFERENCES `seller_account` (`id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK6oo0cvcdtb6qmwsga468uuukk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product_order`
--
ALTER TABLE `product_order`
  ADD CONSTRAINT `FK79qcspv3fg54kaoap8c17p15l` FOREIGN KEY (`account_order_id`) REFERENCES `account_order` (`id`),
  ADD CONSTRAINT `FKh73acsd9s5wp6l0e55td6jr1m` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `seller_account`
--
ALTER TABLE `seller_account`
  ADD CONSTRAINT `FK30nmr1y8gc1crqw2b08uscs42` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `FK2q3rguby4p1yb59ehnelhxooq` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_method` (`id`),
  ADD CONSTRAINT `FKgno01bvlqw27n5jq46s50s0ys` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
