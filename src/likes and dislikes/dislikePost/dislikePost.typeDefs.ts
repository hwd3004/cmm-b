const typeDefs = `#graphql
  type Mutation {
    dislikePost(parentPostId: ID!): MutationResponse!
  }
`;

export default typeDefs;
