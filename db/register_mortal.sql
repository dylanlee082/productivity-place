INSERT INTO mortal (username, hash)
VALUES ($1, $2)
returning *;