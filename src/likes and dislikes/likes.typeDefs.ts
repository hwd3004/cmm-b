const typeDefs = `#graphql
  type Like {
    id: ID!

    createdAt: String!
    updatedAt: String!

    parentPost: Post!

    likedUser: User!
  }

  type Mutation {
    likePost(parentPostId: ID!): MutationResponse!
  }
`;

export default typeDefs;
