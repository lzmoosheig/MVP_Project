DROP TABLE IF EXISTS schedules, events, users, roles CASCADE;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    birthdate DATE,
    address VARCHAR(100),
    postalcode VARCHAR(10),
    city VARCHAR(50),
    phonenumber VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT REFERENCES roles(id)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    date DATE NOT NULL
);

CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

-- Peuple la table roles
INSERT INTO roles (name) VALUES ('ADMIN'), ('PLANNER'), ('AGENT');

-- Exemple utilisateur (mdp à rehasher ensuite en prod)
INSERT INTO users (firstname, lastname, email, password, role_id)
VALUES ('Admin', 'User', 'admin@example.com', 'plaintextpassword', 1);