  
DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);

DROP TABLE IF EXISTS healthcomments;
CREATE TABLE healthcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);

DROP TABLE IF EXISTS sportcomments;
CREATE TABLE sportcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);

DROP TABLE IF EXISTS techcomments;
CREATE TABLE techcomments(
    id SERIAL PRIMARY KEY,
    post INT,
    comment Text
);

DROP TABLE IF EXISTS favorite;
CREATE TABLE favorite (
  id SERIAL PRIMARY KEY,
  category VARCHAR(255),
  urlToImage VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  url VARCHAR(255),
  publishedAt VARCHAR(255),
  content TEXT
  );