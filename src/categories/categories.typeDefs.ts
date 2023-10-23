const typeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    slug: String!

    createdAt: String!
    updatedAt: String!

    parentBoard: Board!

    posts: [Post]!
  }
`;

export default typeDefs;
