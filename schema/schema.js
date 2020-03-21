const graphql = require('graphql');
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;
const books = [{
        id: '1',
        name: 'Vampires',
        genre: 'Fantasy'
    },
    {
        id: '2',
        name: 'Warewolves',
        genre: 'Fantasy'
    }
]
const authors = [{
        id: '1',
        name: 'Gulnoza',
        age: '19'
    },
    {
        id: '2',
        name: 'Muminova',
        age: '25'
    }
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },

            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },

            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }

    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
})