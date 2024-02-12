CREATE TABLE payment (
    id VARCHAR(255) NOT NULL,
    intent VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    currency TEXT,
    price DECIMAL(10, 2) NOT NULL,
	quantity INT NOT NULL,
	create_time TIMESTAMP NOT NULL,
	links JSONB
	
);
