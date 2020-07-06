# Using project

* Install docker
* Execute commands in cmd to create the containers:
```bash
docker run --name mongo -p 27017:27017 -d mongo
```

```bash
docker run --name redis -p6379:6379 -d -t redis:alpine
```

```bash
docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_USER=MyUser -e POSTGRES_DB=MyDbName -p 5432:5432 -d postgres
```
* Change .env with yours settings or get .env
* Start project "npm run dev" or "yarn dev"
