FROM alpine:3.18

RUN apk update && \
	apk upgrade && \
	apk add nginx \
			openssl

COPY ./tools/nginx_conf.sh /tmp/nginx_conf.sh
COPY ./conf/default.conf /etc/nginx/http.d/default.conf

EXPOSE 443

ENTRYPOINT [ "sh", "/tmp/nginx_conf.sh" ]