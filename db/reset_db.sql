-- This file is purely for individual development purposes
DROP TABLE task; 
DROP TABLE appt; 
DROP TABLE contact;
DROP TABLE mortal;

CREATE TABLE mortal (
    mortal_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    name VARCHAR(50),
    funFact VARCHAR(200),
    hash VARCHAR(512),
    email VARCHAR(100),
    number VARCHAR(20),
    taskToggle BOOLEAN,
    calendarToggle BOOLEAN,
    contactToggle BOOLEAN,
    profile_img VARCHAR(512),
    birthday VARCHAR(50),
    country TEXT [],
    region VARCHAR(50)
);

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    list_name VARCHAR(50),
    body VARCHAR(512),
    time_created TIMESTAMPTZ, 
    time_checked TIMESTAMPTZ,
    mortal_id INTEGER REFERENCES mortal(mortal_id) ON DELETE CASCADE
);

CREATE TABLE appt (
    appt_id SERIAL PRIMARY KEY,
    appt_time TIMESTAMPTZ,
    name VARCHAR(24),
    location VARCHAR(100),
    mortal_id INTEGER REFERENCES mortal(mortal_id) ON DELETE CASCADE
);

CREATE TABLE contact (
    contact_id SERIAL PRIMARY KEY,
    name VARCHAR(24),
    number VARCHAR(20),
    address VARCHAR(100),
    mortal_id INTEGER REFERENCES mortal(mortal_id) ON DELETE CASCADE
)