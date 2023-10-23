const typeDefs = `#graphql
  type MutationResponse {
    result: Boolean!
    error: String
    token: String
  }
`;

export default typeDefs;
