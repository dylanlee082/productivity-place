DROP TABLE task; 
DROP TABLE appt; 
DROP TABLE list;
DROP TABLE mortal;


CREATE TABLE mortal (
    mortal_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    hash VARCHAR(144),
    email VARCHAR(100)
);

CREATE TABLE list (
    list_id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    mortal_id INTEGER REFERENCES mortal(mortal_id)
);

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    body VARCHAR(512),
    time_created TIMESTAMPTZ, 
    time_checked TIMESTAMPTZ,
    mortal_id INTEGER REFERENCES mortal(mortal_id),
    list_id INTEGER REFERENCES list(list_id)
);

CREATE TABLE appt (
    appt_id SERIAL PRIMARY KEY,
    appt_time TIMESTAMP,
    name VARCHAR(24),
    location VARCHAR(100),
    mortal_id INTEGER REFERENCES mortal(mortal_id)
);

INSERT INTO mortal (username, email)
VALUES('DylanLee', 'email@email.net'),
        ('Jacobi', 'yahoo@yahoo.com'),
        ('Jefferson', 'mail@verizon.org');

INSERT INTO list (name, mortal_id) VALUES ('work', 1), ('family', 1),('family', 2),('buisness', 3),('kids', 3);