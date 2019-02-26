INSERT INTO mortal (username, hash, number, email)
VALUES ($1, $2, $3, $4)
returning *;