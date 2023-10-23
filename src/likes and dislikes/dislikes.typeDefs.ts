const typeDefs = `#graphql
  type Dislike {
    id: ID!

    createdAt: String!
    updatedAt: String!

    parentPost: Post!

    dislikedUser: User!
  }

  type Mutation {
    dislikePost(parentPostId: ID!): MutationResponse!
  }
`;

export default typeDefs;
