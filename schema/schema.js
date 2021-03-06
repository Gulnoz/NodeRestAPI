const graphql = require('graphql');
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;
const books = [{
        id: '1',
        name: 'Vampires',
        genre: 'Fantasy',
        authorId: '1'
    },
    {
        id: '2',
        name: 'Warewolves',
        genre: 'Fantasy',
        authorId: '1'
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
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
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
            type: new GraphQLList(BookType),
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