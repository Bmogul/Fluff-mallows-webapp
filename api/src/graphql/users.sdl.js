export const schema = gql`
  type User {
    uid: String!
    email: String!
    fname: String
    lname: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(uid: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    fname: String
    lname: String
  }

  input UpdateUserInput {
    email: String
    fname: String
    lname: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(uid: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(uid: String!): User! @requireAuth
  }
`
