USE [eRental]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[payment_id] [int] IDENTITY(1,1) NOT NULL,
	[rental_id] [int] NULL,
	[voucher_id] [int] NULL,
	[amount] [decimal](10, 2) NOT NULL,
	[payment_method] [nvarchar](50) NULL,
	[status] [nvarchar](20) NOT NULL,
	[transaction_id] [nvarchar](255) NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[payment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[transaction_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products] (
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [text] NULL,
	[category] [nvarchar](100) NULL,
	[price] [decimal](10, 2) NOT NULL,
	[status] [nvarchar](20) NOT NULL,
	[quantity] [int] NULL,
	[image_url] [nvarchar](255) NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rentals]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rentals](
	[rental_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_id] [int] NULL,
	[product_id] [int] NULL,
	[start_date] [datetime] NOT NULL,
	[end_date] [datetime] NOT NULL,
	[total_price] [decimal](10, 2) NOT NULL,
	[status] [nvarchar](20) NOT NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[rental_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[review_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[product_id] [int] NULL,
	[rating] [int] NULL,
	[comment] [text] NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[review_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[password_hash] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](15) NULL,
	[role] [nvarchar](20) NOT NULL,
	[created_at] [datetime] NULL,
	[ResetToken] [nvarchar](255) NULL,
	[ResetTokenExpiry] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserVouchers]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserVouchers](
	[user_voucher_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[voucher_id] [int] NULL,
	[rental_id] [int] NULL,
	[used_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_voucher_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[user_id] ASC,
	[voucher_id] ASC,
	[rental_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vouchers]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vouchers](
	[voucher_id] [int] IDENTITY(1,1) NOT NULL,
	[code] [nvarchar](50) NOT NULL,
	[discount_type] [nvarchar](10) NOT NULL,
	[discount_value] [decimal](10, 2) NOT NULL,
	[min_order_value] [decimal](10, 2) NULL,
	[max_uses] [int] NOT NULL,
	[used_count] [int] NULL,
	[start_date] [datetime] NOT NULL,
	[end_date] [datetime] NOT NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[voucher_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Wishlist]    Script Date: 21/03/2025 4:40:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Wishlist](
	[wishlist_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[product_id] [int] NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[wishlist_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[user_id] ASC,
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT ('available') FOR [status]
GO
ALTER TABLE [dbo].[Products] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Rentals] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[Rentals] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Reviews] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[UserVouchers] ADD  DEFAULT (getdate()) FOR [used_at]
GO
ALTER TABLE [dbo].[Vouchers] ADD  DEFAULT ((0)) FOR [min_order_value]
GO
ALTER TABLE [dbo].[Vouchers] ADD  DEFAULT ((0)) FOR [used_count]
GO
ALTER TABLE [dbo].[Vouchers] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Wishlist] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD FOREIGN KEY([rental_id])
REFERENCES [dbo].[Rentals] ([rental_id])
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD FOREIGN KEY([voucher_id])
REFERENCES [dbo].[Vouchers] ([voucher_id])
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD FOREIGN KEY([owner_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Rentals]  WITH CHECK ADD FOREIGN KEY([customer_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Rentals]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Products] ([product_id])
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Products] ([product_id])
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[UserVouchers]  WITH CHECK ADD FOREIGN KEY([rental_id])
REFERENCES [dbo].[Rentals] ([rental_id])
GO
ALTER TABLE [dbo].[UserVouchers]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserVouchers]  WITH CHECK ADD FOREIGN KEY([voucher_id])
REFERENCES [dbo].[Vouchers] ([voucher_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Wishlist]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Products] ([product_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Wishlist]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD CHECK  (([payment_method]='vnPay' OR [payment_method]='stripe' OR [payment_method]='paypal' OR [payment_method]='credit_card'))
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD CHECK  (([status]='failed' OR [status]='completed' OR [status]='pending'))
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD CHECK  (([status]='maintenance' OR [status]='rented' OR [status]='available'))
GO
ALTER TABLE [dbo].[Rentals]  WITH CHECK ADD CHECK  (([status]='canceled' OR [status]='completed' OR [status]='active' OR [status]='pending'))
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD CHECK  (([rating]>=(1) AND [rating]<=(5)))
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD CHECK  (([role]='admin' OR [role]='owner' OR [role]='customer'))
GO
ALTER TABLE [dbo].[Vouchers]  WITH CHECK ADD CHECK  (([discount_type]='percent' OR [discount_type]='amount'))
GO


DELETE FROM Products;


INSERT INTO Products (product_id, name, description, category, price, image_url, created_at, status, quantity)
VALUES
(1, N'Áo choàng tắm', N'Áo choàng tắm mềm mại, dùng trong phòng tắm', N'Tiện ích cá nhân', 100000.00, NULL, GETDATE(), N'available', 5),
(2, N'Máy sấy tóc', N'Máy sấy tóc chuyên dụng trong khách sạn', N'Thiết bị cá nhân', 150000.00, NULL, GETDATE(), N'available', 5),
(3, N'Ô (dù)', N'Ô che nắng mưa cho khách thuê', N'Tiện ích ngoài trời', 50000.00, NULL, GETDATE(), N'available', 10),
(4, N'Thảm yoga', N'Thảm yoga mềm dùng tập luyện trong phòng', N'Thể thao', 80000.00, NULL, GETDATE(), N'available', 3),
(5, N'Xe đạp', N'Xe đạp cho khách mượn đi dạo quanh khách sạn', N'Giải trí', 200000.00, NULL, GETDATE(), N'available', 4),
(6, N'Nôi em bé', N'Nôi cho trẻ em đi cùng gia đình', N'Dành cho trẻ em', 300000.00, NULL, GETDATE(), N'available', 2),
(7, N'Bàn ủi hơi nước', N'Thiết bị làm phẳng quần áo cho khách thuê', N'Thiết bị cá nhân', 120000.00, NULL, GETDATE(), N'available', 4),
(8, N'Laptop', N'Laptop phục vụ công việc hoặc giải trí', N'Thiết bị điện tử', 1000000.00, NULL, GETDATE(), N'available', 1),
(9, N'Máy in mini', N'Máy in tài liệu di động cho doanh nhân', N'Thiết bị điện tử', 700000.00, NULL, GETDATE(), N'available', 1),
(10, N'Xe đẩy em bé', N'Xe đẩy tiện dụng cho trẻ em', N'Dành cho trẻ em', 250000.00, NULL, GETDATE(), N'available', 2),
(11, N'Ghế sofa', N'Ghế sofa mềm cho phòng khách sạn', N'Nội thất', 500000.00, NULL, GETDATE(), N'available', 3),
(12, N'Tủ lạnh mini', N'Tủ lạnh mini dùng để bảo quản đồ ăn uống', N'Thiết bị điện tử', 750000.00, NULL, GETDATE(), N'available', 2),
(13, N'TV Smart 43 inch', N'TV thông minh kết nối internet', N'Thiết bị điện tử', 2000000.00, NULL, GETDATE(), N'available', 1),
(14, N'Loa bluetooth', N'Loa nghe nhạc mini cho khách', N'Thiết bị điện tử', 300000.00, NULL, GETDATE(), N'available', 3),
(15, N'Máy pha cà phê', N'Máy pha cà phê cá nhân trong phòng', N'Thiết bị cá nhân', 900000.00, NULL, GETDATE(), N'available', 1),
(16, N'Gương soi toàn thân', N'Gương đứng soi toàn thân cho khách', N'Nội thất', 200000.00, NULL, GETDATE(), N'available', 2),
(17, N'Bàn làm việc', N'Bàn làm việc nhỏ gọn trong phòng', N'Nội thất', 600000.00, NULL, GETDATE(), N'available', 2),
(18, N'Máy lọc không khí', N'Máy lọc giúp làm sạch không khí trong phòng', N'Thiết bị điện tử', 1200000.00, NULL, GETDATE(), N'available', 1),
(19, N'Tủ đựng đồ mini', N'Tủ mini để vật dụng cá nhân', N'Nội thất', 300000.00, NULL, GETDATE(), N'available', 3),
(20, N'Chăn lông cừu', N'Chăn cao cấp cho mùa đông lạnh', N'Tiện ích cá nhân', 250000.00, NULL, GETDATE(), N'available', 5);
SET IDENTITY_INSERT [eRental].[dbo].[Products] ON;


ALTER TABLE Products
DROP COLUMN status;

SELECT name 
FROM sys.foreign_keys 
WHERE parent_object_id = OBJECT_ID('Products');
ALTER TABLE Products DROP CONSTRAINT FK__Products__owner___4F7CD00D;

SELECT name 
FROM sys.default_constraints 
WHERE parent_object_id = OBJECT_ID('Products');
ALTER TABLE Products DROP CONSTRAINT DF__Products__status__5165187F;

ALTER TABLE Rentals
DROP CONSTRAINT FK_Rentals_Products;

SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Rentals');


ALTER TABLE Rentals
ADD CONSTRAINT FK_Rentals_Orders
FOREIGN KEY (order_id)
REFERENCES Orders(order_id);

ALTER TABLE Rentals
DROP CONSTRAINT FK__Rentals__product__5629CD9C;

SELECT 
    f.name AS ForeignKey,
    OBJECT_NAME(f.parent_object_id) AS TableName,
    COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName,
    OBJECT_NAME(f.referenced_object_id) AS ReferenceTableName,
    COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferenceColumnName
FROM 
    sys.foreign_keys AS f
INNER JOIN 
    sys.foreign_key_columns AS fc 
    ON f.object_id = fc.constraint_object_id
WHERE 
    f.parent_object_id = OBJECT_ID('Orders');

	ALTER TABLE Orders
DROP COLUMN owner_id, name, description, category, price, status, image_url;

CREATE TABLE OrderProduct (
    order_product_id INT PRIMARY KEY IDENTITY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,

    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
ALTER TABLE Orders
ADD user_id INT;

ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Users_user_id
FOREIGN KEY (user_id) REFERENCES Users(user_id);

ALTER TABLE Orders
DROP COLUMN owner_id;

ALTER TABLE Orders
DROP CONSTRAINT FK_Orders_Users_owner_id;
DELETE FROM UserVouchers;
DELETE FROM Payments;
DELETE FROM Rentals;
DELETE FROM OrderProduct;
DELETE FROM Orders;

ALTER TABLE [Users]
ADD Room NVARCHAR(100);

ALTER TABLE Products
ADD Status NVARCHAR(50) NOT NULL DEFAULT 'available';

CREATE TABLE ProductStatus (
    StatusCode NVARCHAR(50) PRIMARY KEY,
    StatusName NVARCHAR(100)
);

INSERT INTO ProductStatuses (status_code, status_name)
VALUES 
('renting', 'Đồ đang thuê')


ALTER TABLE Products
ADD CONSTRAINT FK_Product_Status
FOREIGN KEY (Status) REFERENCES ProductStatus(StatusCode);

ALTER TABLE Products
ADD Quantity INT NOT NULL DEFAULT 0;


USE [eRental]
GO


ALTER TABLE Payments
DROP CONSTRAINT CK__Payments__paymen__75A278F5;

SELECT * 
FROM sys.tables 
WHERE name = 'Payments';

ALTER TABLE Payments
ADD CONSTRAINT CK_Payments_PaymentMethod CHECK (payment_method IN ('Credit Card', 'Cash', 'Paypal'));

SELECT schema_name(schema_id) AS schema_name, name
FROM sys.tables
WHERE name = 'Payments';

SELECT * 
FROM sys.tables;

SELECT DB_NAME() AS current_database;