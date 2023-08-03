const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery{
        hello: TestData 
    }
    type Post {
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
    type RootMutation {
        createUser(userInput: userInputData): User!
    }
    schema {
        query: RootQuery
        mutation : RootMutation
    }
`)