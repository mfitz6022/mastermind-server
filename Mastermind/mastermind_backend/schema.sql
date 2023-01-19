-- Run only once
DROP DATABASE mastermind;

CREATE DATABASE mastermind;

\c mastermind;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE private_rooms (
  room_id SERIAL PRIMARY KEY,
  owner VARCHAR(15) NOT NULL,
  room_name VARCHAR(15) NOT NULL,
  room_password VARCHAR(255) NOT NULL
);

CREATE TABLE user_scores (
  username VARCHAR(15) NOT NULL,
  time VARCHAR(10) NOT NULL,
  difficulty VARCHAR(10) NOT NULL,
  attempts SMALLINT NOT NULL,
  score SMALLINT NOT NULL
);