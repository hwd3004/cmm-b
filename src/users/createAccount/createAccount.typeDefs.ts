const typeDefs = `#graphql
  type Mutation {
    createAccount(
        username: String!
        password: String!
        confirmPassword: String!
        email: String
    ): MutationResponse!
  }
`;

export default typeDefs;
