const typeDefs = `#graphql
  type Mutation {
    updatePost(
      title: String!
      content: String!
      categoryId: ID!
      ): MutationResponse!
  }
`;

export default typeDefs;
