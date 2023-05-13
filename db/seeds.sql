-- Insert sample departments
INSERT INTO departments (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Human Resources')
    ('Operations'),
    ('Information Technology'),
    ('Customer Service');
;

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
    ('Sales Manager', 80000.00, 1),
    ('Sales Representative', 50000.00, 1),
    ('Marketing Manager', 75000.00, 2),
    ('Marketing Assistant', 40000.00, 2),
    ('Accountant', 60000.00, 3),
    ('Financial Analyst', 70000.00, 3),
    ('HR Manager', 80000.00, 4),
    ('HR Assistant', 45000.00, 4),
    ('Operations Manager', 90000.00, 5),
    ('Operations Assistant', 45000.00, 5),
    ('IT Manager', 85000.00, 6),
    ('IT Specialist', 60000.00, 6),
    ('Customer Service Manager', 75000.00, 7),
    ('Customer Service Representative', 45000.00, 7);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, 1),
    ('Emily', 'Williams', 4, 3),
    ('Sarah', 'Johnson', 1, NULL),
    ('Michael', 'Anderson', 6, 5),
    ('Jessica', 'Brown', 8, 5),
    ('Robert', 'Davis', 9, 6),
    ('Laura', 'Taylor', 11, 7);
    
