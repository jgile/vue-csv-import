#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build:demo

# navigate into the build output directory
cd dist/demo
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:jgile/vue-csv-import.git master:gh-pages

cd -
