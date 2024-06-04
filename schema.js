// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Performer {
        id: ID!
        name: String!
        is_disabled: Boolean!
        performances: [Performance!]!
    }

    type Performance {
        id: ID!
        performance_date: String!
        performance_time: String!
        performer: Performer!
    }

    type Query {
        performers(limit: Int, offset: Int): [Performer!]!
        performances: [Performance!]!
        currentUser: User! # Define the currentUser field
    }

    type Mutation {
        addPerformer(name: String!): Performer!
        updatePerformer(id: ID!, name: String, is_disabled: Boolean): Performer!
        addPerformance(performer_id: ID!, performance_date: String!, performance_time: String!): Performance!
        refreshToken(refreshToken: String!): TokenResponse!
    }

    type TokenResponse {
        token: String!
    }

    type User {
        id: ID!
        username: String!
        # Other user fields...
    }
    
    
`;

module.exports = typeDefs;
