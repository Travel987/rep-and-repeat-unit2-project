CREATE DATABASE IF NOT EXISTS rep_and_repeat;
USE rep_and_repeat;

DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS workout;

CREATE TABLE workout (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         workout_type VARCHAR(100),
                         duration INT NOT NULL DEFAULT 45,
                         mood_before INT NOT NULL DEFAULT 0,
                         mood_after INT NOT NULL DEFAULT 0
);

CREATE TABLE exercise (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          sets INT NOT NULL,
                          reps INT NOT NULL,
                          weight DOUBLE NOT NULL,
                          workout_id BIGINT,
                          CONSTRAINT fk_exercise_workout
                              FOREIGN KEY (workout_id)
                                  REFERENCES workout(id)
                                  ON DELETE CASCADE
);

INSERT INTO workout (
    name,
    workout_type,
    duration,
    mood_before,
    mood_after
)
VALUES (
           'Upper Body Strength',
           'Strength',
           45,
           3,
           5
       );

INSERT INTO exercise (
    name,
    sets,
    reps,
    weight,
    workout_id
)
VALUES
    ('Bicep Curl', 3, 10, 15.0, 1),
    ('Shoulder Press', 3, 10, 20.0, 1),
    ('Skull Crushers', 3, 12, 15.0, 1);
