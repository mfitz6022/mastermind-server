-- Run only once
DROP DATABASE mastermind;

CREATE DATABASE mastermind;

\c mastermind;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE global_leaderboards (
  username VARCHAR(15) NOT NULL,
  difficulty VARCHAR(10) NOT NULL,
  time_elapsed TIME NOT NULL,
  attempts SMALLINT NOT NULL,
  hints_used SMALLINT NOT NULL,
  score SMALLINT NOT NULL
);

CREATE TABLE user_scores (
  difficulty VARCHAR(10) NOT NULL,
  time_elapsed TIME NOT NULL,
  attempts SMALLINT NOT NULL,
  hints_used SMALLINT NOT NULL,
  score SMALLINT NOT NULL
);