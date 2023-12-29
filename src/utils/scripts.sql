-- awai.Conversation definition

CREATE TABLE `Conversation` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(100) NOT NULL,
  `login_id` int NOT NULL,
  `conversation_name` varchar(100) NOT NULL,
  `conversation_type_id` int NOT NULL,
  `conversation_time` timestamp NOT NULL,
  `createdTimeStamp` timestamp NOT NULL,
  `updatedTimestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`,`conversation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- awai.`user` definition

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_id` bigint NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `loginTimestamp` timestamp NOT NULL,
  `logoutTimestamp` timestamp NULL DEFAULT NULL,
  `createdTimeStamp` timestamp NOT NULL,
  `updatedTimestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UN` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3660214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;