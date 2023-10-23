const typeDefs = `#graphql
  type Query {
    login(
        username: String!
        password: String!
    ): MutationResponse!
  }
`;

export default typeDefs;
