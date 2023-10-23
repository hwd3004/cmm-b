const typeDefs = `#graphql
  type Mutation {
    createCategory(name: String!, slug: String!, parentBoardId: ID!): MutationResponse!
  }
`;

export default typeDefs;
