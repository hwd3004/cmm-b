const typeDefs = `#graphql
  type Mutation {
    createCategory(name: String!, slug: String!): MutationResponse!
  }
`;

export default typeDefs;
