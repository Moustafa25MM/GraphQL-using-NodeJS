# GraphQL application Server


## Installation

```bash
npm i
```

## Usage

```python

2. npm start -> to run the server

```
## How to use

### Register
```python
1. endpoint = http://localhost:3000/graphql   "Or any port of your choice"
2. Provide the following example json in the body :
{
  "query": "mutation { createUser(userInput: { name: \"user\", email: \"user1@gmail.com\", password: \"tester\" }) {  _id  email name } }"
}
It will return an object like this:
{
    "data": {
        "createUser": {
            "_id": "64cc312e702b7f049473e3dc",
            "email": "user1@gmail.com",
            "name": "user"
        }
    }
}
```

### Login
```python
1. endpoint = http://localhost:3000/graphql   "Or any port of your choice"
2. Provide the following example json in the body :
{
    "query": "query { login (email:\"user1@gmail.com\", password:\"tester\") { token userId  } }"
}

It will return an object like this:
{
    "data": {
        "login": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGNjMzEyZTcwMmI3ZjA0OTQ3M2UzZGMiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTY5MTEwMzc4NywiZXhwIjoxNjkxMTA3Mzg3fQ.xUCZD3_QW5Vt7fD6LrarQ4Vd3kHBvDRgnxWZfFXchPk",
            "userId": "64cc312e702b7f049473e3dc"
        }
    }
}
```

### Create post
```python
1. endpoint =  http://localhost:3000/graphql/   "Or any port of your choice"
2. you provide an Authorization token in the headres 

2. Provide the following example json in the body :
{
  "query": "mutation { createPost(postInput: { title: \"second user\", content: \"second content\", imageUrl: \"some second\" }) {  _id  title content imageUrl creator{ name } createdAt updatedAt } }"
}

It will return an object like this:
{
    "data": {
        "createPost": {
            "_id": "64cc05031541261b781a9185",
            "title": "second user",
            "content": "second content",
            "imageUrl": "some second",
            "creator": {
                "name": "test"
            },
            "createdAt": "2023-08-03T19:50:27.266Z",
            "updatedAt": "2023-08-03T19:50:27.266Z"
        }
    }
}
```
### get Posts
```python
1. endpoint =  http://localhost:3000/graphql   "Or any port of your choice"
2. you provide an Authorization token in the headres 

3. Provide the following example json in the body :
{
    "query": "query { posts (page:1) { posts { _id title content creator { name } createdAt updatedAt } totalPosts } }"
}
It will return an object like this:

{
    "data": {
        "posts": {
            "posts": [
                {
                    "_id": "64cc05031541261b781a9185",
                    "title": "second user",
                    "content": "second content",
                    "creator": {
                        "name": "test"
                    },
                    "createdAt": "2023-08-03T19:50:27.266Z",
                    "updatedAt": "2023-08-03T19:50:27.266Z"
                },
                {
                    "_id": "64cbfe5e1e31d3216474f2e6",
                    "title": "second One",
                    "content": "second content",
                    "creator": {
                        "name": "test"
                    },
                    "createdAt": "2023-08-03T19:22:06.941Z",
                    "updatedAt": "2023-08-03T19:22:06.941Z"
                }
            ],
            "totalPosts": 4
        }
    }
}
```
### get PostById
```python
1. endpoint =    http://localhost:3000/graphql   "Or any port of your choice"
2. you provide an Authorization token in the headres 

3. Provide the following example json in the body :
{
    "query": "query { post (id:\"64cbfdde36df903104968554\") { title  } }"
}
It will return an object like this:

{
    "data": {
        "post": {
            "title": "first One"
        }
    }
}
```
### update Jogging
```python
1. endpoint =    http://localhost:3000/graphql   "Or any port of your choice"
2. you provide an Authorization token in the headres 

3. Provide the following example json in the body :
{
  "query": "mutation { updatePost(id:\"64cc05031541261b781a9185\", postInput: { title: \"second modify\", content: \"second modify\", imageUrl: \"some modify\" }) {  _id  title content imageUrl creator{ name } createdAt updatedAt } }"
}
It will return an object like this:

{
    "data": {
        "updatePost": {
            "_id": "64cc05031541261b781a9185",
            "title": "second modify",
            "content": "second modify",
            "imageUrl": "some modify",
            "creator": {
                "name": "test"
            },
            "createdAt": "2023-08-03T19:50:27.266Z",
            "updatedAt": "2023-08-03T20:29:35.107Z"
        }
    }
}
```
### delete post
```python
1. endpoint =    http://localhost:3000/graphql   "Or any port of your choice"
2. you provide an Authorization token in the headres 

3. Provide the following example json in the body :
{
  "query": "mutation { deletePost(id:\"64cbfdde36df903104968554\") }"
}
It will return an object like this:

{
    "data": {
        "deletePost": true
    }
}
```
