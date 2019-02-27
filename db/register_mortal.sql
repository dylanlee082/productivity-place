INSERT INTO mortal (username, hash, number, email, tasktoggle, calendartoggle, contacttoggle)
VALUES ($1, $2, $3, $4, 'true', 'true', 'true')
returning *;