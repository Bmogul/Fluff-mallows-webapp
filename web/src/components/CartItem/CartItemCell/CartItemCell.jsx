import CartItem from 'src/components/CartItem/CartItem'

export const QUERY = gql`
  query FindCartItemById($id: Int!) {
    cartItem: cartItem(id: $id) {
      id
      productId
      quantity
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CartItem not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ cartItem }) => {
  return <CartItem cartItem={cartItem} />
}
