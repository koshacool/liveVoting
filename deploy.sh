# Deploy on Heroku

git checkout heroku
git merge master
## Build client
cd app/client
npm i
npm run build

cd ../../
## make build commit
git add ./app/api/public/
git commit -m 'build' -n

## push sub folder
git subtree split --prefix app/api -b heroku-api
git push -f heroku heroku-api:master
git branch -D heroku-api

git checkout master

