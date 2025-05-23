## Set up Angular locally

npx @angular/cli@17 new front-end --no-standalone

cd front-end

ng serve --open --configuration development

old commands:

ng serve --proxy-config proxy.conf.json

npm start

http://localhost:4200/

## Set up nest server locally

nest new nest-proxy

cd nest-proxy

npm run start

http://localhost:3000/

Enable Hot Reloading (Optional)

npm run start:dev

Test the API

Test in ThunderClient or POSTMAN

## Connect to MongoDB ,install Mongoose:

npm install @nestjs/mongoose mongoose

##  Flow Overview
User submits a form in your Angular frontend (e.g., name, email, password).

Angular sends the data to the NestJS backend via an API (POST /users).

NestJS processes the request and stores the user in MongoDB.

MongoDB stores the user in a users collection.

NestJS returns a response to Angular, confirming the user was created.

CORS is enabled (app.enableCors()) in nestjs main.ts as 4200 port is calling 3000 port to connect to mongodb

## fully switch to Jest for unit testing

uninstall jasmine-karma

npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter

then install Jest

npm install --save-dev jest jest-preset-angular @testing-library/angular @types/jest

npm install --save-dev @types/jest

npm install --save-dev @testing-library/jest-dom

run:

npm test

snapshot testing in jest (__snapshots__)  within the component folder itself

Remove all packages of jasmine karma before executing jest: npx jest

"@types/jasmine": "~5.1.0",

"jasmine-core": "~5.1.0",

## Jest snapshot testing

✅ Avoids conflicts – No mixing of render and TestBed.

✅ Uses TestBed for all tests – Consistent setup for regular and snapshot tests.

✅ Manually extracts HTML – Ensures snapshot testing without unnecessary test environments.

## VSCode marketplace
https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner

https://github.com/firsttris/vscode-jest-runner/tree/master
