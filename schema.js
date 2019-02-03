const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

// hardcoded data
const customers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        age: 30
    },
    {
        id: '2',
        name: 'Steve Smith',
        email: 'stevesmith@gmail.com',
        age: 25
    },
    {
        id: '3',
        name: 'Sarah Johnson',
        email: 'sarahj@gmail.com',
        age: 32
    },
]


// customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                for (let customer of customers) {
                    if (customer.id === args.id) {
                        return customer
                    }
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});