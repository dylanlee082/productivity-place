UPDATE contact
SET name = $1
    number = $2
    address = $3
WHERE
contact_id = $4