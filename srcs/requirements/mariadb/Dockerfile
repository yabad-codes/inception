FROM alpine:3.18

RUN apk update && \
	apk upgrade && \
	apk add mariadb \
			mariadb-client

COPY ./conf/mariadb_conf.sh /tmp/mariadb_conf.sh

ENTRYPOINT [ "sh", "/tmp/mariadb_conf.sh" ]