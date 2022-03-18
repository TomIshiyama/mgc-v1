#!/usr/bin/env bash
#wait for the MySQL Server to come up
#sleep 90s

#run the setup script to create the DB and the schema in the DB
# TODO: ほんまはDockerコンテナから立ち上げたい

mysql.server start

CURRENT=$(cd $(dirname $0);pwd)

FILE_PATH=`pwd -P`
# echo $FILE_PATH
echo "execute file :$CURRENT/init.db.sh"
echo "sql file :$CURRENT/init_mgc_db.sql"
mysqldump --defaults-extra-file=my.cnf -h localhost mgc < "$CURRENT/init_mgc_db.sql"