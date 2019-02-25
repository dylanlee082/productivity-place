UPDATE task
SET body = $1,
    list_name = $2
WHERE
task_id = $3