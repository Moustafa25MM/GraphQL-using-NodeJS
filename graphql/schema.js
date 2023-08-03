const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type RootQuery {
        login(email : String , password : String) : authData 
        posts(page : Int) : postData
        post(id:ID!): Post
    }

    type RootMutation {
        createUser(userInput: userInputData): User!
        createPost(postInput: postInputData): Post!
    }
    type postData {
        posts : [Post!]!
        totalPosts: Int!
    }
    input postInputData {
        title:String!
        content:String!
        imageUrl: String!
    }

    type authData {
        token: String!
        userId: String!
    }
    type Post {
                _id:ID
                title: String
                imageUrl: String
                content: String
                creator: User
                createdAt: String
                updatedAt: String
    }
    type User {
        _id: ID
        email: String!
        name: String!
        password: String!
        status: String!
        posts : [Post!]!

    }
    input userInputData {
        email: String!
        name: String!
        password: String!
    }
   
    schema {
        query: RootQuery
        mutation : RootMutation
    }
`)