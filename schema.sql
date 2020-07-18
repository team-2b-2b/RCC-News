  
DROP TABLE IF EXISTS comments;


CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);
