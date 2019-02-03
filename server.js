const express = require('express');
const expressGraphQL = require('express-graphql')
const schema = require('./schema');

const app = express();

const PORT = process.env.PORT || 5001;

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log('server listening on port', PORT);
})