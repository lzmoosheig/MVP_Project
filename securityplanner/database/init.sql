-- Table: Roles
CREATE TABLE Roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: Users
CREATE TABLE Users
(
    id          SERIAL PRIMARY KEY,
    firstname   VARCHAR(50)  NOT NULL,
    lastname    VARCHAR(50)  NOT NULL,
    birthdate   DATE         NOT NULL,
    address     VARCHAR(100) NOT NULL,
    postcode    INT          NOT NULL,
    city        VARCHAR(100) NOT NULL,
    phonenumber VARCHAR(10)  NOT NULL,
    email       VARCHAR(100) NOT NULL,
    password    VARCHAR(100) NOT NULL,
    role_id     INT          NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles (id)
);

-- Table: Events
CREATE TABLE Events
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    start_date DATE         NOT NULL,
    end_date   DATE         NOT NULL
);

-- Table: Schedules
CREATE TABLE Schedules
(
    id         SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date   DATE NOT NULL,
    user_id    INT  NOT NULL,
    event_id   INT  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id),
    FOREIGN KEY (event_id) REFERENCES Events (id)
);

-- Insert into Roles
INSERT INTO Roles (name)
VALUES ('Planner'),
       ('Agent');

-- Insert into Users
INSERT INTO Users (firstname, lastname, birthdate, address, postcode, city, phonenumber, email, password, role_id)
VALUES ('Alice', 'Smith', '1990-05-10', '123 Main St', '1234', 'Springfield', '1234567890', 'alice@example.com',
        'password123', 1),
       ('Bob', 'Johnson', '1985-08-20', '456 Oak St', '2345', 'Shelbyville', '0987654321', 'bob@example.com',
        'securepass', 2),
       ('Carol', 'Davis', '1992-03-15', '789 Pine St', '3456', 'Ogdenville', '1122334455', 'carol@example.com',
        'letmein', 2);

-- Insert into Events
INSERT INTO Events (name, start_date, end_date)
VALUES ('Tech Conference', '2025-06-01', '2025-06-03'),
       ('Art Expo', '2025-07-15', '2025-07-17'),
       ('Music Festival', '2025-08-20', '2025-08-22');

-- Insert into Schedules
INSERT INTO Schedules (start_date, end_date, user_id, event_id)
VALUES ('2025-06-01', '2025-06-03', 1, 1),
       ('2025-07-15', '2025-07-17', 2, 2),
       ('2025-08-20', '2025-08-22', 3, 3);

