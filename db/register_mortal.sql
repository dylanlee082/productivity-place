INSERT INTO mortal (username, hash, number)
VALUES ($1, $2, $3)
returning *;