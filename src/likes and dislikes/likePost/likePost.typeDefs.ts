const typeDefs = `#graphql
  type Mutation {
    likePost(parentPostId: ID!): MutationResponse!
  }
`;

export default typeDefs;
