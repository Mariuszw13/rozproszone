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

CREATE TABLE rental
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    client_id int NOT NULL,
    date_start date NOT NULL,
    date_end date NOT NULL,
    car_id int NOT NULL,
    CONSTRAINT rental_user_fk FOREIGN KEY (client_id) REFERENCES user (id),
    CONSTRAINT rental_car_fk FOREIGN KEY (car_id) REFERENCES car (id)
);
CREATE UNIQUE INDEX rental_id_uindex ON rental (id);

/
----------------------------------------------------------------------------
/
insert into car(id, make, model, rent_cost, rent_flag)
values (1, 'BMW', 'E36', 20.5, 0);
/
select * from car;
/
insert into user_type(id, name)
VALUES (1, 'client');
/
insert into user_type(id, name)
VALUES (2, 'employee');
/
insert into user(name, surname, email, password, user_type_id)
values ('John', 'Doe', 'jdoe@email.com', 'abcd', 1);
/
insert into user(name, surname, email, password, user_type_id)
values ('Rick', 'Sanchez', 'rsanchez@email.com', 'bcda', 1);
/
select * from user;

/
insert into rental(client_id, date_start, date_end, car_id)
VALUES (2, '20190101', '20190120', 1)

/

select * from rental;



