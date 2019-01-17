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
  password varchar(100) NOT NULL,
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
insert into car(make, model, rent_cost, rent_flag)
values ('BMW', 'E36', 20.5, 0);
/
insert into car(make, model, rent_cost, rent_flag)
values ('Fiat', 'Punto', 10, 0);
/
insert into user_type(name)
VALUES ('client');
/
insert into user_type(name)
VALUES ('employee');
/
insert into user(name, surname, email, password, user_type_id)
values ('John', 'Doe', 'jdoe@email.com', '$2a$10$a0iIJOneZKOkrrFl6bOWBuB8T5vNi6nniUNdCdlByc3rwkYBCKn6y', 1);
/
insert into user(name, surname, email, password, user_type_id)
values ('Rick', 'Sanchez', 'rsanchez@email.com', '$2a$10$a0iIJOneZKOkrrFl6bOWBuB8T5vNi6nniUNdCdlByc3rwkYBCKn6y', 2);
/
insert into rental(client_id, date_start, date_end, car_id)
VALUES (2, '20190101', '20190120', 1);
/
insert into rental(client_id, date_start, date_end, car_id)
VALUES (1, '20190101', '20190120', 2);

/

select * from rental;



