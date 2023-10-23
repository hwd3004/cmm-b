const typeDefs = `#graphql
  type Mutation {
    createCategory(name: String!, parentBoardId: ID!): MutationResponse!
  }
`;

export default typeDefs;
