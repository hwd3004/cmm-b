const typeDefs = `#graphql
  type Mutation {
    createComment(
      content: String!
      parentPostId: ID!
      parentCommentId: Int
    ): MutationResponse!
  }
`;

export default typeDefs;
