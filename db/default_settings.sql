UPDATE mortal 
SET name = 'name', 
    funfact = 'funfact', 
    tasktoggle = 'true', 
    calendartoggle = 'true', 
    contacttoggle = 'true', 
    profile_img = 'https://ppgzone-39u4nsxgmu93y.netdna-ssl.com/wp-content/uploads/batman-profile-pic.jpg', 
    birthday = '2000-01-01', 
    country= ARRAY ['none','none', 'none'], 
    region = 'none'
WHERE mortal_id = $1;

INSERT INTO contact (name, number, address, mortal_id)
VALUES ('default', 'default', 'default', $1);

INSERT INTO task (list_name, body, mortal_id)
VALUES ('default list', 'default', $1),
    ('default list', 'default', $1),
    ('default list', 'default', $1);

INSERT INTO appt (appt_time, name, location, mortal_id)
VALUES (current_timestamp, 'default', 'default', $1);