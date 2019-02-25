UPDATE appt
SET appt_time = $1,
    name = $2,
    location = $3
WHERE
appt_id = $4