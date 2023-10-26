LOGIN = yabad
DATA_PATH = /home/${LOGIN}/data

all: up

up: setup
	sudo docker-compose -f ./srcs/docker-compose.yml up -d

down:
	sudo docker-compose -f ./srcs/docker-compose.yml down

start:
	sudo docker-compose -f ./srcs/docker-compose.yml start

stop:
	sudo docker-compose -f ./srcs/docker-compose.yml stop

restart:
	sudo docker-compose -f ./srcs/docker-compose.yml restart

build:
	sudo docker-compose -f ./srcs/docker-compose.yml build

status:
	sudo docker-compose -f ./srcs/docker-compose.yml ps

logs:
	sudo docker-compose -f ./srcs/docker-compose.yml logs

ps:
	sudo docker-compose -f ./srcs/docker-compose.yml ps

setup:
	sudo mkdir -p ${DATA_PATH}
	sudo mkdir -p ${DATA_PATH}/db-data
	sudo mkdir -p ${DATA_PATH}/wp-data