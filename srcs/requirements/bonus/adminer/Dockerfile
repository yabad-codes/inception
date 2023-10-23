FROM alpine:3.18

RUN apk update && \
	apk upgrade && \
	apk add php \
			php-session \
			php-pdo \
			php-pdo_mysql

WORKDIR /

RUN wget "https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php" && \
	mv adminer*.php index.php

EXPOSE 8080

ENTRYPOINT [ "php", "-S", "0.0.0.0:8080" ]