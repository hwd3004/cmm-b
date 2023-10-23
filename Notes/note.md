node version 18.18.0

타입스크립트 셋업

https://liufeier.tistory.com/330

```
npm ls -g --depth=0

npm init -y

npm i -g typescript nodemon

tsc --init

npm i -g ts-node

npm i @types/node tsconfig-paths
```

```
npm i dotenv compression morgan cors body-parser express @apollo/server graphql bcrypt jsonwebtoken email-validator

npm i @types/morgan @types/cors @types/compression @types/express @types/bcrypt @types/jsonwebtoken
```

<hr/>

https://defineall.tistory.com/858

graphql-tool 셋업

```
npm i @graphql-tools/schema @graphql-tools/merge @graphql-tools/load-files
```

https://defineall.tistory.com/872

prisma/client 셋업

```
npm i @prisma/client

npx prisma init
```

DB 셋업

```
docker pull postgres

docker run --name postgres-container -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres

postgres 슈퍼계정으로 연결
docker exec -it postgres-container psql -U postgres
```

```
db 목록 조회 명령어 - \l

유저 권한(role) 확인 - \du

select * from pg_user;

db 생성
create database cmmdb;

유저 생성
create user cmm with password '1234';

유저 암호 변경
alter user postgres password '1234';

db 권한 부여
grant all privileges on database cmmdb to cmm;
```

.env 파일에서 DATABASE_URL 수정 후, schema.prisma 파일에서 모델 작성 또는 수정 후 마이그레이션

```
npx prisma migrate dev
```
