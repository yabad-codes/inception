FROM alpine:3.18

RUN apk update && \
	apk upgrade && \
	apk add nodejs npm && \
	mkdir -p /var/www/html/portfolio/public

WORKDIR /var/www/html/portfolio

RUN npm install express

COPY ./public/* ./public/

COPY ./server.js ./

EXPOSE 1337

ENTRYPOINT [ "node", "server.js" ]