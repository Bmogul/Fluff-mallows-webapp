import { Link, routes } from '@redwoodjs/router'

import CartItems from 'src/components/CartItem/CartItems'

export const QUERY = gql`
  query FindCartItems {
    cartItems {
      id
      productId
      quantity
      userId
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No cartItems yet. '}
      <Link to={routes.newCartItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ cartItems }) => {
  return <CartItems cartItems={cartItems} />
}
