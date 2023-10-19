FROM alpine:3.18

RUN apk update && \
	apk upgrade && \
	apk add php \
			php-fpm \
			php-cli \
			php-mysqli \
			php-json \
			php-phar \
			php-mbstring \
			php-curl \
			mariadb-client \
			curl \
			vim

RUN wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
	chmod +x wp-cli.phar && \
	mv wp-cli.phar /usr/local/bin/wp

RUN sed -i "s|listen = 127.0.0.1:9000|listen = 9000|g" /etc/php81/php-fpm.d/www.conf

COPY ./conf/wp_conf.sh /tmp/wp_conf.sh

WORKDIR /var/www/html/wordpress

ENTRYPOINT [ "sh", "/tmp/wp_conf.sh" ]