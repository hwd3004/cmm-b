const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    viewCount: Int!
    isDeleted: Boolean!

    createdAt: String!
    updatedAt: String!

    author: User!

    parentBoard: Board!

    comments: [Comment]

    likes: [Like]!
    dislikes: [Dislike]!

    category: Category!
  }
`;

export default typeDefs;
