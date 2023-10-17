#!/bin/sh

if [ ! -d "/run/mysqld" ]; then
	mkdir -p /run/mysqld
	chown -R mysql:mysql /run/mysqld
fi

if [ ! -d "/var/lib/mysql/mysql" ]; then
	chown -R mysql:mysql /var/lib/mysql
	
	mysql_install_db --basedir=/usr --datadir=/var/lib/mysql --user=mysql --rpm > /dev/null

	file=/tmp/.tmp
	cat << EOF > $file
USE mysql;
FLUSH PRIVILEGES;
DELETE FROM mysql.user WHERE User='';
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_ROOT_PASS';
CREATE DATABASE $WP_DB_NAME;
CREATE USER '$WP_DB_USER'@'localhost' IDENTIFIED BY '$WP_DB_PASS';
GRANT ALL PRIVILEGES ON $WP_DB_NAME.* TO '$WP_DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF
	/usr/bin/mysqld --user=mysql --bootstrap < $file
	rm -f $file
fi

sed -i "s|skip-networking|#skip-networking|g" /etc/my.cnf.d/mariadb-server.cnf
sed -i "s|#bind-address=0.0.0.0|bind-address=0.0.0.0|g" /etc/my.cnf.d/mariadb-server.cnf

exec /usr/bin/mysqld --user=mysql --console