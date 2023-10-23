const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    password: String!
    confirmPassword: String
    email: String

    createdAt: String!
    updatedAt: String!

    role: String!

    writtenPosts: [Post]!
    writtenComments: [Comment]!

    likedPosts: [Post]!
    dislikedPosts: [Post]!

    managedBoards: [BoardManager]!
  }
`;

export default typeDefs;
