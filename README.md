This is university project for 'Distibuted databases' subject. The goal is to create 1 master database which replicates data to 2 slave databases, back-end application that manages dbs and simple front-end app where the basic CRUD operations can be executed.

Databases were set up in docker, using code from https://github.com/vbabak/docker-mysql-master-slave
Back-end: Spring
Front-end: ReactJS

## Running the project
run ./build.sh
execute sql queries on master database
build spring app by running mvn clean install
run spring app by executing java -jar target/app-name.jar
run from front folder: yarn start or npm start

Docker MySQL master-slave replication 
========================

MySQL master-slave replication with using Docker. 

## Run

To run this examples you will need to start containers with "docker-compose" 
and after starting setup replication. See commands inside ./build.sh. 

#### Create 2 MySQL containers with master-slave row-based replication 

```
./build.sh
```

#### Make changes to master

```
docker exec mysql_master sh -c "export MYSQL_PWD=111; mysql -u root mydb -e 'create table code(code int); insert into code values (100), (200)'"
```

#### Read changes from slave_1

```
docker exec mysql_slave_1 sh -c "export MYSQL_PWD=111; mysql -u root mydb -e 'select * from code \G'"
```

## Troubleshooting

#### Check Logs

```
docker-compose logs
```

#### Start containers in "normal" mode

> Go through "build.sh" and run command step-by-step.

#### Check running containers

```
docker-compose ps
```

#### Clean data dir

```
rm -rf ./master/data/*
rm -rf ./slave/data/*
```

#### Run command inside "mysql_master"

```
docker exec mysql_master sh -c 'mysql -u root -p111 -e "SHOW MASTER STATUS \G"'
```

#### Run command inside "mysql_slave_1"

```
docker exec mysql_slave_1 sh -c 'mysql -u root -p111 -e "SHOW SLAVE STATUS \G"'
```

#### Enter into "mysql_master"

```
docker exec -it mysql_master bash
```

#### Enter into "mysql_slave_1"

```
docker exec -it mysql_slave_1 bash
```
