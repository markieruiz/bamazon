CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(11,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Shampoo', 'Cosmetics', 5.75, 500),
		('Conditioner', 'Cosmetics', 6.25, 500),
		('Trash Bags', 'Grocery', 6.00, 500),
		('Paper Towels', 'Grocery', 3.00, 500),
        ('Orange Juice', 'Grocery', 4.45, 100),
		('Milk', 'Grocery', 4.50, 200),
        ('Granny Smith Apples', 'Produce', 0.35, 800),
		('Banana', 'Produce', 0.44, 800),
		('Tylenol', 'Pharmacy', 4.95, 100),
		('Band Aid', 'Pharmacy', 3.25, 100);