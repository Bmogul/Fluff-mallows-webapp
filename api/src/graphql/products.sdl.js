export const schema = gql`
  type Product {
    id: Int!
    title: String!
    description: String!
    price: Float!
    category: String!
    image: String!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
  }

  input CreateProductInput {
    title: String!
    description: String!
    price: Float!
    category: String!
    image: String!
  }

  input UpdateProductInput {
    title: String
    description: String
    price: Float
    category: String
    image: String
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`
