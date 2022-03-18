#!/bin/sh

CURRENT=$(cd $(dirname $0);pwd)

echo "execute file :$CURRENT/init.sh"

cd "$CURRENT/backend" && npm run init & cd "$CURRENT/frontend" && npm run init
