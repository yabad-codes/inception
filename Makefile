LOGIN = yabad
DOMAIN = ${LOGIN}.42.fr
DATA_PATH = /home/${LOGIN}/data
ENV = LOGIN=${LOGIN} DATA_PATH=${DATA_PATH} DOMAIN=${LOGIN}.42.fr

all: up

up: setup
	docker-compose -f ./srcs/docker-compose.yml up -d

down:
	docker-compose -f ./srcs/docker-compose.yml down

start:
	docker-compose -f ./srcs/docker-compose.yml start

stop:
	docker-compose -f ./srcs/docker-compose.yml stop

build:
	docker-compose -f ./srcs/docker-compose.yml build

status:
	docker-compose -f ./srcs/docker-compose.yml ps

logs:
	docker-compose -f ./srcs/docker-compose.yml logs

ps:
	docker-compose -f ./srcs/docker-compose.yml ps

setup:
	sudo mkdir -p /home/${LOGIN}/
	sudo mkdir -p ${DATA_PATH}
	sudo mkdir -p ${DATA_PATH}/mariadb-data
	sudo mkdir -p ${DATA_PATH}/wordpress-data