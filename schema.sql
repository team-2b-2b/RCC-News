  
DROP TABLE IF EXISTS comments;


CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);

CREATE TABLE healthcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);

CREATE TABLE sportcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);
