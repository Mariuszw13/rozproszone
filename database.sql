CREATE TABLE car
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    make varchar(45) NOT NULL,
    model varchar(45) NOT NULL,
    rent_cost float NOT NULL,
    rent_flag boolean NOT NULL
);
CREATE UNIQUE INDEX car_id_uindex ON car (id);

/

CREATE TABLE user_type
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(45) NOT NULL
);
CREATE UNIQUE INDEX user_type_id_uindex ON user_type (id);

/

CREATE TABLE user
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(45) NOT NULL,
    surname varchar(45) NOT NULL,
    address varchar(100),
    email varchar(45) NOT NULL,
    password varchar(45) NOT NULL,
    user_type_id int NOT NULL,
    CONSTRAINT user_type_fk FOREIGN KEY (user_type_id) REFERENCES user_type (id)
);
CREATE UNIQUE INDEX user_id_uindex ON user (id);


