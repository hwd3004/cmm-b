const typeDefs = `#graphql
  type Query {
    getPostsOnBoard(parentBoardId: ID!): [Post]
  }
`;

export default typeDefs;
