const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

// // hardcoded data
// const customers = [
//     {
//         id: '1',
//         name: 'John Doe',
//         email: 'johndoe@gmail.com',
//         age: 30
//     },
//     {
//         id: '2',
//         name: 'Steve Smith',
//         email: 'stevesmith@gmail.com',
//         age: 25
//     },
//     {
//         id: '3',
//         name: 'Sarah Johnson',
//         email: 'sarahj@gmail.com',
//         age: 32
//     },
// ]


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
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then( res => {
                        return res.data
                    });
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers')
                    .then(res => {
                        return res.data
                    });
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});