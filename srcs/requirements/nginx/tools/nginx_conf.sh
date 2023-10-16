#!/bin/sh

# [ generating ssl certificates ]
mkdir -p /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /etc/nginx/ssl/yabad.key \
    -out /etc/nginx/ssl/yabad.crt  \
    -subj "/C=MA/L=Martil/O=42/OU=1337 MED/CN=yabad.42.fr" &>/dev/null

# [ starting nginx process ]
nginx -g "daemon off;"