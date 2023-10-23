const typeDefs = `#graphql
  type Board {
    id: ID!
    name: String!
    slug: String!

    createdAt: String
    updatedAt: String

    categories: [Category]

    posts: [Post]

    boardManagers: [BoardManager]
  }

  type Query {
    getBoards: [Board]
  }

  type Mutation {
    createBoard(name: String!, slug: String!): MutationResponse!
  }
`;

export default typeDefs;
