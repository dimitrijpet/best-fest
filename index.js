const { ApolloServer, gql } = require('apollo-server-express');
const sequelize = require('./sequelize');
const resolvers = require('./resolvers');
const Performer = require('./models/performer');
const Performance = require('./models/performance');
const { authenticateToken } = require('./middleware'); // Import authenticateToken middleware
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();


// Read the schema file
const schemaPath = path.join(__dirname, 'schema.graphql');
const typeDefs = gql(fs.readFileSync(schemaPath, { encoding: 'utf-8' }));

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply Apollo Server middleware to Express
// server.applyMiddleware({ app });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start(); // Make sure to await server.start()

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();

// Sync database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
