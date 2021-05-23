/* Replace with your SQL commands */


CREATE TABLE notes (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    created_at date,
    updated_at date,
    PRIMARY KEY (id)
);
