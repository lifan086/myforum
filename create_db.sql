use myforum;

CREATE VIEW vw_posts AS
SELECT post_id,date,text,user_id,post.topic_id,name AS topic_name
FROM post
JOIN topic
ON post.topic_id=topic.topic_id
;

CREATE USER IF NOT EXISTS 'myforumappuser'@'localhost'IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES on myforum.* TO 'myforumappuser'@'localhost';