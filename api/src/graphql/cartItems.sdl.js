export const schema = gql`
  type CartItem {
    id: Int!
    productId: Int!
    product: Product!
    quantity: Int!
    userId: Int!
    user: User!
    createdAt: DateTime!
  }

  type Query {
    cartItems: [CartItem!]! @requireAuth
    cartItem(id: Int!): CartItem @requireAuth
  }

  input CreateCartItemInput {
    productId: Int!
    quantity: Int!
    userId: Int!
  }

  input UpdateCartItemInput {
    productId: Int
    quantity: Int
    userId: Int
  }

  type Mutation {
    createCartItem(input: CreateCartItemInput!): CartItem! @requireAuth
    updateCartItem(id: Int!, input: UpdateCartItemInput!): CartItem!
      @requireAuth
    deleteCartItem(id: Int!): CartItem! @requireAuth
  }
`
