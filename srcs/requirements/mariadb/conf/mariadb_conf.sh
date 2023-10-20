#!/bin/sh

if [ ! -d "/run/mysqld" ]; then
	echo "[ mariadb ] creating mysqld folder..."
	mkdir -p /run/mysqld
	chown -R mysql:mysql /run/mysqld
fi

echo "[ mariadb ] enabling network access to mariadb server..."
sed -i "s|skip-networking|#skip-networking|g" /etc/my.cnf.d/mariadb-server.cnf
sed -i "s|#bind-address=0.0.0.0|bind-address=0.0.0.0|g" /etc/my.cnf.d/mariadb-server.cnf

if [ ! -d "/var/lib/mysql/mysql" ]; then
	chown -R mysql:mysql /var/lib/mysql
	
	echo "[ mariadb ] mariadb installation..."
	mariadb-install-db --datadir=/var/lib/mysql --user=mysql --skip-test-db

	echo "[ mariadb ] configuring mariadb..."
	file=/tmp/.tmp
	cat << EOF > $file
USE mysql;
FLUSH PRIVILEGES;
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_ROOT_PASS';
CREATE DATABASE $WP_DB_NAME;
CREATE USER '$WP_DB_USER'@'%' IDENTIFIED BY '$WP_DB_PASS';
GRANT ALL PRIVILEGES ON $WP_DB_NAME.* TO '$WP_DB_USER'@'%';
FLUSH PRIVILEGES;
EOF
	mariadbd --user=mysql --bootstrap < $file
	rm -f $file
fi

echo "[ mariadb ] starting mariadb in the foreground..."
exec /usr/bin/mysqld --user=mysql --console &>/dev/null