#!/bin/sh

CURRENT=$(cd $(dirname $0);pwd)

echo "execute file :$CURRENT/init2.sh"

cd "$CURRENT/backend2" && npm run init & cd "$CURRENT/frontend" && npm run init
