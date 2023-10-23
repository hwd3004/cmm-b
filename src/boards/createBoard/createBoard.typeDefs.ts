const typeDefs = `#graphql
  type Mutation {
    createBoard(name: String!, slug: String!): MutationResponse!
  }
`;

export default typeDefs;
