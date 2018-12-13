CREATE TABLE car
(
    id int PRIMARY KEY,
    make char(45) NOT NULL,
    model char(45) NOT NULL,
    rent_cost float NOT NULL,
    rent_flag boolean NOT NULL
);
CREATE UNIQUE INDEX car_id_uindex ON car (id);


