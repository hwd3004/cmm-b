const typeDefs = `#graphql
  type Mutation {
    createPost(
      title: String!
      content: String!
      categoryId: ID!
      parentBoardId: ID!
      ): MutationResponse!
  }
`;

export default typeDefs;
