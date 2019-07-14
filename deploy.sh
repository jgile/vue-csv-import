#!/usr/bin/env sh

# abort on errors
set -e

# build
vue-cli-service build

# navigate into the build output directory
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:jgile/vue-csv-import.git master:gh-pages

cd -
