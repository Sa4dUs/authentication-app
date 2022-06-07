# Authentication APP

- Download this source into a working directory:

```
git clone https://github.io/sa4dus/authentication-app-server
```

## Client

### Setup

- Install the requirements using npm:

```
cd authentication-app-server
npm install
```

#### Enviroment setup

- Create a `.env` file including the following variables:

```
NODE_ENV = <env>
PORT = <port>
DB_URI = <mongodb_uri>
DB_USER = <mongodb_user>
DB_PASS = <mongodb_password>
DB_NAME = <mongodb_database_name>
DB_NAME_TEST = <mongodb_test_database_name>
```

#### Database setup

- You will have to create a mongodb cluster with two databases: <DB_NAME> and <DB_NAME_TEST>.
- Each of them, will have two collections: "users" and "books".

### Deployment

- Deploy the server locally:

```
npm start
```

### Features

| Endpoint      | Method | Feature            |
| :------------ | :----: | :----------------- |
| /             |  GET   | Check if API is up |
| /auth/signup  |  POST  | Create a new user  |
| /auth/login   |  POST  | Log in as a user   |
| /admin        |  POST   | Show data          |
| /admin/update |  POST  | Set data           |
| /admin/upload |  POST  | Upload an image    |

#### POST /auth/signup

##### HEADERS

```json
{
  Content-Type: "application/json"
}
```

##### BODY

```json
{
  "email": String,
  "password": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
	"message": "Missing data"
}
```

409 Conflict

```json
{
	"message": "There's already an account registered with that email"
}
```

200 OK

```json
```

#### POST /auth/login

##### HEADERS

```json
{
  Content-Type: "application/json"
}
```

##### BODY

```json
{
  "email": String,
  "password": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
	"message": "Missing data"
}
```

401 Unauthorized

```json
{
	"message": "Invalid credentials"
}
```

200 OK

```json
{
  "userId": <uuid identifier>,
  "token": <JWT Authentication token>
}
```

#### POST /admin

##### HEADERS

```json
{
  Content-Type: "application/json",
}
```

##### BODY

```json
{
  "userId": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
	"message": "Missing data"
}
```

404 Not found

```json
{
	"message": "No user found"
}
```

200 OK

```json
{
  "data" : Object,
}
```

#### POST /admin/update

##### HEADERS

```json
{
  Content-Type: "application/json",
}
```

##### BODY

```json
{
  "userId": String,
  "data": Object
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
	"message": "Missing data"
}
```

200 OK

```json
{
  "data": Object
}
```

#### POST /admin/upload

##### HEADERS

```json
{
  Content-Type: "application/json",
}
```

##### BODY

```json
{
  "userId": String,
  "file": File
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
	"message": "Missing data"
}
```

200 OK

```json
{
  "path" : String,
}
```
