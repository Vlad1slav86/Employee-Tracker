-- Insert sample departments
INSERT INTO departments (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Human Resources');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
    ('Sales Manager', 80000.00, 1),
    ('Sales Representative', 50000.00, 1),
    ('Marketing Manager', 75000.00, 2),
    ('Marketing Assistant', 40000.00, 2),
    ('Accountant', 60000.00, 3),
    ('Financial Analyst', 70000.00, 3),
    ('HR Manager', 80000.00, 4),
    ('HR Assistant', 45000.00, 4);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, 1),
    ('Emily', 'Williams', 4, 3);
