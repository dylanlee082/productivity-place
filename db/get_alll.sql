SELECT mortal.mortal_id, appt.name AS aname, contact.name AS cname, task.body FROM mortal 
JOIN appt ON appt.mortal_id = mortal.mortal_id
JOIN contact ON contact.mortal_id = mortal.mortal_id
JOIN task ON task.mortal_id = mortal.mortal_id
WHERE mortal.mortal_id = $1