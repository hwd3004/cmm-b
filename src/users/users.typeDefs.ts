const typeDefs = `#graphql
  type User {
    id: ID
    username: String
    password: String
    confirmPassword: String
    email: String

    createdAt: String
    updatedAt: String

    role: String

    writtenPosts: [Post]
  }
`;

export default typeDefs;
