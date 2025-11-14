CREATE TABLE users (
	id int PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(50) NOT NULL,
    lastname varchar(50) NOT NULL,
    email varchar(80) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    created_at datetime DEFAULT NOW(),
    is_admin boolean DEFAULT 0
);

CREATE TABLE categories (
	id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(50)
);

CREATE TABLE products(
	id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    descr varchar(255) DEFAULT 'Sin descripcion.',
    image_url varchar(255) DEFAULT '/imgs/noimage.png',
    stock int DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0.0,
    created_at datetime,
    category_id int NOT NULL,
    active BOOLEAN DEFAULT 1,
	FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE orders(
	id int PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    state varchar(40),
    created_at datetime,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE items_orders(
	product_id int NOT NULL,
    order_id int NOT NULL,
    cant int,
    real_quant int DEFAULT 0,
    price DECIMAL(10,2),
    active boolean,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
	PRIMARY KEY (product_id, order_id)
);

INSERT INTO `categories`(`id`, `name`) VALUES (1,'Por defecto');

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `is_admin`) VALUES
(1, 'Admin', ' ', 'admin@gmail.com', '$2y$10$I0EczHKBgG3bJG3GMi34E.NW5ljqZeYGq.m3HM0EekSUCA2zmzf4.', '2025-11-13 16:44:18', 1);

INSERT INTO `products` (`id`, `name`, `descr`, `image_url`, `stock`, `price`, `created_at`, `category_id`, `active`) VALUES
(1, 'alfajor', 'no se, alfajores de mentira', '691636871c037.png', 30, 350.00, '2025-11-13 16:50:31', 1, 1),
(2, 'harina', 'para pan, pan..\r\npara pan, pan..\r\npara pan..', 'noimage.png', 10, 700.00, '2025-11-13 16:52:46', 1, 1),
(3, 'Pala corazon', 'Pala con punta corazon, ideal para excavar en tierra blanda.', '69163740dd8d8.png', 5, 10000.00, '2025-11-13 16:53:36', 1, 1),
(4, 'Pala punta', 'Pala de punta, ideal para excavar en tierra dura.', '691637b320da2.png', 7, 9990.00, '2025-11-13 16:55:31', 1, 1),
(5, 'Papas', 'son papas colorinches.', '69163806df4e4.png', 50, 500.00, '2025-11-13 16:56:54', 1, 1),
(6, 'Zapallo', 'Es un zapallo', '691638205a999.png', 1, 1500.00, '2025-11-13 16:57:20', 1, 1);


