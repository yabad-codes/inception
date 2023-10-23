FROM alpine:3.18

RUN apk update && \
	apk upgrade && \
	apk add nodejs npm && \
	mkdir -p /var/www/html/portfolio

WORKDIR /var/www/html/portfolio

COPY ./src/* ./

EXPOSE 1337

ENTRYPOINT [ "node", "run.js" ]