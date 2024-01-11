#!/bin/bash
valc="andstop=true"
echo -en "\033[1;\033[33mКомпиляция сервера\n"
tsc --project ./server/tsconfig.json
echo -en "\033[32mКомпиляция завершина.\n"
if [ $1 = $valc ]
then
echo -en "\033[0mКонец.\n"
tput sgr0
else
echo -en "\033[34mЗапуск!\n"
tput sgr0
node ./server/out/server.js
fi