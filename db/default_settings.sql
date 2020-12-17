INSERT INTO contact (name, number, address, mortal_id)
VALUES ('default', 'default', 'default', $1);

INSERT INTO task (list_name, body, mortal_id)
VALUES ('default list', 'default', $1),
    ('default list', 'default', $1),
    ('default list', 'default', $1);

INSERT INTO appt (appt_time, name, location, mortal_id)
VALUES (current_timestamp, 'default', 'default', $1);