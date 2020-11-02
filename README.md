**HOW TO RUN**:
1. cd into `backend` and `frontend` and run `yarn` in both to get the packages
2. run `yarn gen` in `frontend` to get the grphql queries/mutations
3. download redis onto your machine
4. run `redis-server`
5. in `backend` open 2 terminals. run `yarn dev` in one and `yarn watch` in the other
6. in `frontent` run `yarn watch`

project will be running on [`http://localhost:3000`]

**TASKS I ACCOMPLISHED**:
1. Drag and drop
2. Half of upload files
3. User sessions/logins
4. git

**HOW TO TEST**:
1. Hit add applicant and fill out the form, then drag and drop to different columns.
2. I got the backend set up for it but not the front end. To test this, open up postman.
  * set it to `POST` request and link to [`http://localhost:5001/graphql`]
  * click body and then form-data
  * set the first key to `operations` and the value to `{"query":"mutation AddResume($resume: Upload!) {\n  AddResume(resume: $resume)\n}"}`
  * set the second key to `map` and the value to `{ "0": ["variables.resume"] }`
  * set the third key to `0` and make the type a file. Then upload any file into the value. It will show up in the `backend/src/resumes` folder
  * check the `postman.png` for reference
3. Try registering and logging in. It will create a cookie with name `qid` and will remain there for a year. Passwords are hashed with argon2 and the hash is stored into the database
4. This is on github.

**STACK USED**:

Frontend:
React, urql, graphql, next.js, chakra ui

Backend:
node.js, express.js, apollo, type-graphql, typeorm

Database:
mysql
