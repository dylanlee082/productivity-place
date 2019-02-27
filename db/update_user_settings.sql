UPDATE mortal 
SET tasktoggle = $1,
    calendartoggle = $2,
    contacttoggle = $3
WHERE mortal_id = $4
returning *;