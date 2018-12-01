# Deploy on Heroku

git checkout heroku
git merge dev
## Build client
cd client
npm i
npm run build

cd ../
## make build commit
git add ./api/public/
git commit -m 'build' -n

## push sub folder
git subtree split --prefix api -b heroku-api
git push -f heroku heroku-api:master
git branch -D heroku-api

git checkout dev

