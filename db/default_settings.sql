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
WHERE mortal_id = $1