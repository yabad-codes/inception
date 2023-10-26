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

clean: down
	sudo rm -rf ${DATA_PATH}

fclean: clean
	sudo docker system prune -f -a --volumes
	sudo docker volume rm srcs_db-data srcs_wp-data

setup:
	sudo mkdir -p ${DATA_PATH}
	sudo mkdir -p ${DATA_PATH}/db-data
	sudo mkdir -p ${DATA_PATH}/wp-data