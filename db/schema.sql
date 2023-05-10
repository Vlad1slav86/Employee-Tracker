CREATE TABLE IF NOT EXISTS departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);
