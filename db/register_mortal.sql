INSERT INTO mortal (username, hash, number, email, tasktoggle, calendartoggle, contacttoggle, profile_img, birthday, country, region)
VALUES ($1, $2, $3, $4, 'true', 'true', 'true', 'https://ppgzone-39u4nsxgmu93y.netdna-ssl.com/wp-content/uploads/batman-profile-pic.jpg', '2000-01-01', ARRAY ['none', 'none', 'none'], 'none')
returning *;