export const schema = gql`
  type User {
    id: Int!
    username: String!
    FirstName: String!
    LastName: String!
    email: String!
    cartItems: [CartItem]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    FirstName: String!
    LastName: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    FirstName: String
    LastName: String
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
