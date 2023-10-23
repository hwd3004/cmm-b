const typeDefs = `#graphql
  type BoardManager {
    id: ID!

    createdAt: String!
    updatedAt: String!

    managerRole: String!

    managedBoard: Board!

    user: User!
  }
`;

export default typeDefs;
