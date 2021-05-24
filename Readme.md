## The Node.js Notepad app

NodeJS application does the following:

- Creates, Updated, Deletes Note from the database
- Returns Chart data to display in UI

## Requirements

* Node >= 14.4.8
* NPM >= 6.14.5
* Mysql

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/mushzak/notepad-server.git

cd notepad-server
```

Make sure that you have created database for notepad application

Open [http://localhost:3000](http://localhost:3000) and take a look around.

Step 1: Rename `database.example.json` into `database.json` and inject your credentials, so it looks like this

```
{
  "dev": {
    "host": "localhost",
    "driver": "mysql",
    "database": "notepad",
    "user": "user_name",
    "password": "user_password"
  }
}
```

Step 2: Install dependencies
```bash
npm install
```

Step 3: Migrate table(s)
```bash
npm install -g db-migrate && db-migrate up
```

Step 4: Seed mock data (OPTIONAL). This command will insert 5000 rows into your database
```bash
npm run seed
```

Step 3: To start the express server, run the following
```bash
npm start
```

