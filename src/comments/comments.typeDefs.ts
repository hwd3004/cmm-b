const typeDefs = `#graphql
  type Comment {
    id: ID!
    content: String!

    createdAt: String!
    updatedAt: String!

    author: User!

    parentPost: Post!

    parentCommentId: ID!
  }

  type Mutation {
    createComment(
      content: String!
      parentPostId: ID!
      parentCommentId: Int
    ): MutationResponse!
  }
`;

export default typeDefs;
